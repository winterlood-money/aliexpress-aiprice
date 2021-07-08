const fs = require("fs");
const path = require("path");
const dataDirectory = path.join(process.cwd(), "_data");

ApiClient = require("ali-topsdk/index").ApiClient;
var client = new ApiClient({
    appkey: "32834908",
    appsecret: "a82776329db1bebab5288249ccfb93be",
    REST_URL: "http://gw.api.taobao.com/router/rest",
});
const app_signature = "winterlood";

function getCurrentDate() {
    var date = new Date();
    var year = date.getFullYear().toString();

    var month = date.getMonth() + 1;
    month = month < 10 ? "0" + month.toString() : month.toString();

    var day = date.getDate();
    day = day < 10 ? "0" + day.toString() : day.toString();

    var hour = date.getHours();
    hour = hour < 10 ? "0" + hour.toString() : hour.toString();

    var minites = date.getMinutes();
    minites = minites < 10 ? "0" + minites.toString() : minites.toString();

    var seconds = date.getSeconds();
    seconds = seconds < 10 ? "0" + seconds.toString() : seconds.toString();

    return year + month + day + hour + minites + seconds;
}

const getHotproductByCategory = (categoryItem) => {
    client.execute(
        "aliexpress.affiliate.hotproduct.query",
        {
            app_signature: app_signature,
            category_ids: categoryItem.category_id,
            fields: "app_sale_price,shop_id",
            page_no: "1",
            page_size: "50",
            platform_product_type: "ALL",
            sort: "LAST_VOLUME_DESC",
            target_currency: "USD",
            target_language: "EN",
            tracking_id: "autoali",
        },
        function (error, response) {
            if (!error) {
                if (!response.resp_result.result) {
                    console.log(`해당 카테고리에는 아이템이 없습니다.`);
                    console.log(`카테고리 이름 : ${categoryItem.category_name}`);
                    console.log(`카테고리 번호 : ${categoryItem.category_id}`);
                    return;
                }
                const newProductList = response.resp_result.result.products.product;

                const curFileName = path.join(dataDirectory, `${categoryItem.category_id}.json`);
                var originFileData = {
                    category_name: `${categoryItem.category_name}`,
                    category_id: `${categoryItem.category_id}`,
                    last_modify: `${getCurrentDate()}`,
                    product_count: 0,
                    product_list: [],
                };

                try {
                    originFileData = {
                        ...originFileData,
                        ...JSON.parse(fs.readFileSync(curFileName)),
                    };
                } catch (exception) {
                    console.log(`${curFileName} is not exists`);
                }

                var resultProductList = originFileData.product_list.slice();
                var modifyItemCount = 0;

                newProductList.forEach((newProduct) => {
                    const matchIdx = originFileData.product_list.findIndex((originProduct) => {
                        return parseInt(originProduct.product_id) === parseInt(newProduct.product_id);
                    });
                    const isExistProduct = matchIdx === -1 ? false : true;

                    if (isExistProduct) {
                        // 존재
                        resultProductList[matchIdx] = {
                            // ...resultProductList[matchIdx],
                            ...newProduct,
                            last_modify: getCurrentDate(),
                        };
                        modifyItemCount += 1;
                    } else {
                        // 비 존재
                        resultProductList.push({
                            ...newProduct,
                            last_modify: getCurrentDate(),
                            created_date: getCurrentDate(),
                        });
                    }
                });

                resultProductList.sort(function (a, b) {
                    return b.last_modify - a.last_modify;
                });

                const resultFileData = {
                    ...originFileData,
                    last_modify: `${getCurrentDate()}`,
                    product_count: resultProductList.length,
                    product_list: resultProductList,
                };

                console.log("====================================================================");
                console.log(`현재 수집 카테고리 : ${categoryItem.category_name}`);
                console.log(`현재 수집 카테고리 ID : ${categoryItem.category_id}`);
                console.log(
                    `추가된 ITEM 개수 : ${resultFileData.product_list.length - originFileData.product_list.length}`
                );
                console.log(`수정된 ITEM 개수 : ${modifyItemCount}`);
                console.log("====================================================================");
                fs.writeFileSync(
                    path.join(dataDirectory, `${categoryItem.category_id}.json`),
                    JSON.stringify(resultFileData)
                );
            } else {
                console.log(error);
            }
        }
    );
};

const getCategory = () => {
    const fs = require("fs");
    client.execute(
        "aliexpress.affiliate.category.get",
        {
            app_signature: app_signature,
        },
        function (error, response) {
            if (!error) {
                var result_category_list = [];
                var childrenIdx = 0;
                const raw_category_list = response.resp_result.result.categories.category;
                raw_category_list.forEach((item) => {
                    const isParent = item.parent_category_id ? false : true;
                    if (isParent) {
                        // 부모 노드
                        result_category_list.push({ ...item, children: [] });
                    } else {
                        // 자식노드
                        const targetIdx = result_category_list.findIndex(
                            (it) => it.category_id === item.parent_category_id
                        );
                        if (targetIdx !== -1) {
                            const newChildrenList = result_category_list[targetIdx].children.slice();
                            newChildrenList.push({ ...item });

                            result_category_list[targetIdx] = {
                                ...result_category_list[targetIdx],
                                children: newChildrenList,
                            };
                            childrenIdx += 1;
                        }
                    }
                });

                console.log("부모 카테고리 개수 : ", result_category_list.length);
                console.log("자식 카테고리 개수 : ", childrenIdx);

                fs.writeFileSync(
                    "CATEOGRY_PARENT.json",
                    JSON.stringify(
                        result_category_list.map((it) => {
                            return {
                                category_id: it.category_id,
                                category_name: it.category_name,
                                children_length: it.children.length,
                            };
                        })
                    )
                );

                fs.writeFileSync("RESULTCATEGORY.json", JSON.stringify(result_category_list));
            } else console.log(error);
        }
    );
};

const categoryItemList = JSON.parse(fs.readFileSync(path.join(dataDirectory, `parent_category.json`)));
categoryItemList.forEach((item, index) => {
    console.log(`[${parseInt(index) + 1} / ${categoryItemList.length}] : ${item.category_name} 수집 시작 ...`);
    getHotproductByCategory(item);
});
