import { gtypes } from "@global_types";
import path from "path";
import fs from "fs";
const dataDirectory = path.join(process.cwd(), "_data");
const indexDataDirectory = path.join(process.cwd(),"_processed_data")

// UTILS
function get_date_by_string(date_string){
    console.log(date_string);
    
    const res = new Date(date_string.slice(0, 4), date_string.slice(4, 6) - 1, date_string.slice(6, 8),
    date_string.slice(8, 10), date_string.slice(10, 12), date_string.slice(12, 14))
    return res;
}

// index.tsx
export function GET_INDEX_PAGE(){
    const index_data_path = path.join(indexDataDirectory,'index_data.json');
    const fileContent = JSON.parse(fs.readFileSync(`${index_data_path}`, "utf8"));
    return fileContent
}


// _app.tsx 
export function GET_CATEGORY_LIST(){
    const category_data_path = path.join(indexDataDirectory,'category.json');
    const fileContent = JSON.parse(fs.readFileSync(`${category_data_path}`, "utf8"));
    return fileContent.category_list || [];
}


// [category].tsx
export function GET_CATEGORY_DATA(category_id){
    const fileContent = JSON.parse(fs.readFileSync(`${dataDirectory}/${category_id}.json`, "utf8"));

    const CategoryListFileContent = GET_CATEGORY_LIST();
    const targetCategoryItem = CategoryListFileContent.find((it)=>it.category_id === category_id);

    const icon = targetCategoryItem ? targetCategoryItem.icon : null
    return {
        cur_category_data:{
            ...fileContent, icon:icon,
        },
        category_list:CategoryListFileContent
    }
}
export function GET_CATEGORY_PAGES(){
    const pathList = [];
    const fileNames = fs.readdirSync(dataDirectory);
    
    fileNames.forEach((fileName) => {
        pathList.push({params:{category:fileName.split('.')[0].toString()}})
    });

    return pathList;
}


// [category]/[product_id].tsx
export function GET_DETAIL_DATA(category,product_id){
    const fileContent = JSON.parse(fs.readFileSync(`${dataDirectory}/${category}.json`, "utf8"));

    const product_list = fileContent.product_list.slice();
    const shuffled = product_list.sort(() => 0.5 - Math.random());
    const related_product_list  = shuffled.slice(0,5)

    const target_product_item = fileContent.product_list.find((it)=>parseInt(it.product_id) === parseInt(product_id));


    const last_modify = get_date_by_string(target_product_item.last_modify);
    return {
        ...target_product_item,
        last_modify : last_modify.toString(),
        related_product_list : related_product_list
    }
}
export function GET_DETAIL_PAGES(){
    const pathList = [];
    const fileNames = fs.readdirSync(dataDirectory);
    
    fileNames.forEach((fileName) => {
        const dataPath = path.join(dataDirectory,fileName)
        const fileContent = JSON.parse(fs.readFileSync(dataPath, "utf8"));
        if(fileContent.product_list){

      
        fileContent.product_list.forEach(productItem => {
            pathList.push({params:{category:fileContent.category_id,  product_id:productItem.product_id.toString()}})
        })  }
    });

    
    return pathList;
}
