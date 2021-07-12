const fs = require("fs");
const path = require("path");
const dataDirectory = path.join(process.cwd(), "_data");
const writeDirectory = path.join(process.cwd(), "_processed_data");

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

function getTotalProductList() {
    var total_product_list = [];
    const fileNames = fs.readdirSync(dataDirectory);

    fileNames.forEach((fileName) => {
        const fileContent = JSON.parse(fs.readFileSync(`${dataDirectory}/${fileName}`, "utf8"));
        total_product_list = total_product_list.concat(fileContent.product_list);
    });

    return total_product_list;
}

function getTotalCategoryList() {
    var total_category_list = [];
    const fileNames = fs.readdirSync(dataDirectory);

    fileNames.forEach((fileName) => {
        const fileContent = JSON.parse(fs.readFileSync(`${dataDirectory}/${fileName}`, "utf8"));
        total_category_list.push({
            category_id: fileContent.category_id,
            category_name: fileContent.category_name,
            category_product_count: fileContent.product_list.length,
            category_last_modify: fileContent.last_modify,
        });
    });

    return total_category_list;
}

function getSotedList(type, totalProductList, limit) {
    const resultProductList = totalProductList.slice();
    switch (type) {
        case "POPULAR": {
            // 주문 많은 순
            resultProductList.sort((a, b) => {
                return b.lastest_volume - a.lastest_volume;
            });
            break;
        }
        case "RECOMMEND": {
            // 커미션 높은 순
            resultProductList.sort((a, b) => {
                return parseFloat(b.hot_product_commission_rate) - parseFloat(a.hot_product_commission_rate);
            });
            break;
        }
        case "DISCOUNT": {
            // 할인률 높은 순
            resultProductList.sort((a, b) => {
                return parseFloat(b.discount) - parseFloat(a.discount);
            });
            break;
        }
        case "LATEST": {
            // 수정일 현재 기준 빠른 순
            resultProductList.sort((a, b) => {
                return parseInt(b.last_modify) - parseInt(a.last_modify);
            });
            break;
        }
        default:
            break;
    }
    return resultProductList.slice(0, limit);
}

function createIndexData(totalProductList) {
    const INDEX_LIMIT = 20;
    const LAST_MODIFY = getCurrentDate();

    const TOTAL_PRODUCT_COUNT = totalProductList.length;
    const CATEOGRY_LIST = getTotalCategoryList();
    const POPULAR_PRODUCT_LIST = getSotedList("POPULAR", totalProductList, INDEX_LIMIT);
    const RECOMMEND_PRODUCT_LIST = getSotedList("RECOMMEND", totalProductList, INDEX_LIMIT);
    const DISCOUNT_PRODUCT_LIST = getSotedList("DISCOUNT", totalProductList, INDEX_LIMIT);
    const LATEST_PRODUCT_LIST = getSotedList("LATEST", totalProductList, INDEX_LIMIT);

    console.log("\n===========================================================");
    console.log("CHECK INDEX STATUS\n");
    console.log("0. TOTAL PRODUCT COUNT");
    console.log(`${TOTAL_PRODUCT_COUNT}\n`);

    console.log("1. SORT BY VOLUME");
    console.log(`${POPULAR_PRODUCT_LIST.map((it) => it.lastest_volume).join("/  ")}\n`);

    console.log("2. SORT BY COMMISION RATE");
    console.log(`${RECOMMEND_PRODUCT_LIST.map((it) => it.hot_product_commission_rate).join("/  ")}\n`);

    console.log("3. SORT BY DISCOUNT RATE");
    console.log(`${DISCOUNT_PRODUCT_LIST.map((it) => it.discount).join("/  ")}\n`);

    console.log("4. SORT BY MODIFY DATE");
    console.log(`${LATEST_PRODUCT_LIST.map((it) => it.last_modify).join("/  ")}\n`);

    console.log("===========================================================\n");

    const result_obj = {
        total_product_count: TOTAL_PRODUCT_COUNT,
        product_list_limit: INDEX_LIMIT,
        last_modify: LAST_MODIFY,
        category_list: CATEOGRY_LIST,
        popular_product_list: POPULAR_PRODUCT_LIST,
        recommend_product_list: RECOMMEND_PRODUCT_LIST,
        discount_product_list: DISCOUNT_PRODUCT_LIST,
        latest_product_list: LATEST_PRODUCT_LIST,
    };
    fs.writeFileSync(path.join(writeDirectory, `index_data.json`), JSON.stringify(result_obj));
}

function main() {
    const totalProductList = getTotalProductList();
    createIndexData(totalProductList);
}

main();
