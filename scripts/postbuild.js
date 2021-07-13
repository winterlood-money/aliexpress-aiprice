//@ts-ignore
const fs = require("fs");
const path = require("path");
const fetch = require("node-fetch");
const dataDirectory = path.join(process.cwd(), "_data");

const HOSTNAME = "https://aliall.shop/";

function formatDate(date) {
    var d = new Date(date),
        month = "" + (d.getMonth() + 1),
        day = "" + d.getDate(),
        year = d.getFullYear();

    if (month.length < 2) month = "0" + month;
    if (day.length < 2) day = "0" + day;

    return [year, month, day].join("-");
}
function get_date_by_string(date_string) {
    const res = new Date(
        date_string.slice(0, 4),
        date_string.slice(4, 6) - 1,
        date_string.slice(6, 8),
        date_string.slice(8, 10),
        date_string.slice(10, 12),
        date_string.slice(12, 14)
    );
    return res;
}

const writeRobotsTxt = () => {
    const robot = `
    User-agent: *
    Allow: /
    Sitemap: ${HOSTNAME}sitemap.xml
    `;
    fs.writeFileSync(path.join("./.next/static", "robots.txt"), robot);
};

const getCategoryPages = () => {
    const pathList = [];
    const fileNames = fs.readdirSync(dataDirectory);
    const categoryList = fileNames.map((it) => it.split(".")[0]);
    categoryList.forEach((category) => {
        const cur_object = {
            url: `${HOSTNAME}${category}`,
            date: formatDate(new Date()),
        };
        pathList.push(cur_object);
        // console.log(cur_object);
    });
    return pathList;
};

const getDetailPages = () => {
    function getPathListByCategory(category) {
        const targetFilePath = path.join(dataDirectory, `${category}.json`);
        const fileContent = JSON.parse(fs.readFileSync(targetFilePath, "utf8"));
        const res_list = fileContent.product_list.map((it) => {
            return { url: it.product_id, date: formatDate(get_date_by_string(it.last_modify)) };
        });
        return res_list;
    }

    const pathList = [];
    const fileNames = fs.readdirSync(dataDirectory);
    const categoryList = fileNames.map((it) => it.split(".")[0]);
    categoryList.forEach((category) => {
        const paths = getPathListByCategory(category);
        paths.forEach((it) => {
            const cur_object = {
                url: `${HOSTNAME}${category}/${it.url}`,
                date: it.date,
            };
            pathList.push(cur_object);
            // console.log(cur_object);
        });
    });

    return pathList;
};

function main() {
    writeRobotsTxt();
    const categoryPages = getCategoryPages();
    const detailPages = getDetailPages();

    categoryPages.sort((a, b) => {
        function getInteger(str) {
            return parseInt(str.split("-").join(""));
        }
        return getInteger(b.date) - getInteger(a.date);
    });
    detailPages.sort((a, b) => {
        function getInteger(str) {
            return parseInt(str.split("-").join(""));
        }
        return getInteger(b.date) - getInteger(a.date);
    });

    const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
    <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
     xmlns:news="http://www.google.com/schemas/sitemap-news/0.9"
      xmlns:xhtml="http://www.w3.org/1999/xhtml"
       xmlns:mobile="http://www.google.com/schemas/sitemap-mobile/1.0"
        xmlns:image="http://www.google.com/schemas/sitemap-image/1.1"
     xmlns:video="http://www.google.com/schemas/sitemap-video/1.1">
     ${detailPages
         .map((item) => {
             return `<url>
         <loc>${item.url}</loc>
         <lastmod>${item.date}</lastmod>
         <changefreq>daily</changefreq>
         <priority>1.0</priority>
         </url>
         `;
         })
         .join("")}
     ${categoryPages
         .map((item) => {
             return `<url>
        <loc>${item.url}</loc>
        <lastmod>${item.date}</lastmod>
        <changefreq>daily</changefreq>
        <priority>0.5</priority>
        </url>
        `;
         })
         .join("")}
        </urlset>
      `;
    console.log("SITEMAP GENERATED!!!");
    fs.writeFileSync(path.join("./.next/static", "sitemap.xml"), sitemap);

    fetch(`http://www.google.com/ping?sitemap=${HOSTNAME}sitemap.xml`).then(() => console.log("SUCCESS TO PING"));
}

main();
// getDetailPages();
