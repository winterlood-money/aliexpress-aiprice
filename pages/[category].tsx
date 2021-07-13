import { GET_CATEGORY_DATA, GET_CATEGORY_PAGES } from "lib/data";
import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useState, useEffect } from "react";
import shareImage from "public/share.png";
const ProductItem = (props) => {
    return (
        <Link href={`${props.category_id}/${props.product_id}`}>
            <div className="ProductItem">
                <div
                    className="product_thumbnail"
                    style={{ backgroundImage: `url('${props.product_main_image_url}')` }}
                ></div>
                <div className="product_info">
                    <div className="title_box">
                        <h5>{props.product_title}</h5>
                    </div>
                    <div className="info_box">
                        <div className="order_box">
                            <span className="order">{props.lastest_volume.toLocaleString()} order</span>
                        </div>
                        <div className="price_box">
                            <div>
                                <span className="origin_price">{props.original_price}$</span>
                                <span className="discount">{props.discount} OFF</span>
                            </div>
                            <div>
                                <span className="cur_price">
                                    {props.sale_price}
                                    <span className="dollar">$</span>
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Link>
    );
};

const ProductGrid = ({ cur_category_data }) => {
    const router = useRouter();

    const [filter, setFilter] = useState("Recommend");

    useEffect(() => {
        setFilter("Recommend");
    }, [router]);

    const getSortedProductList = () => {
        const data = cur_category_data.product_list.slice();
        switch (filter) {
            case "Latest": {
                return data.sort(function (a, b) {
                    return parseInt(b.last_modify) - parseInt(a.last_modify);
                });
            }
            case "Discount": {
                return data.sort(function (a, b) {
                    return parseFloat(b.discount) - parseFloat(a.discount);
                });
            }
            case "Recommend": {
                return data.sort(function (a, b) {
                    return parseFloat(b.hot_product_commission_rate) - parseFloat(a.hot_product_commission_rate);
                });
            }
            case "Popular": {
                return data.sort(function (a, b) {
                    return b.lastest_volume - a.lastest_volume;
                });
            }
            default:
                return data.sort(function (a, b) {
                    return parseFloat(b.hot_product_commission_rate) - parseFloat(a.hot_product_commission_rate);
                });
        }
    };

    return (
        <div className="ProductGrid">
            <div className="breadcumb">
                <Link href={"/"}>
                    <span className="linkcumb">Home</span>
                </Link>
                <span className="sep">{">"}</span>
                <Link href={"/category"}>
                    <span className="linkcumb">Categories</span>
                </Link>
                <span className="sep">{">"}</span>
                <span>{cur_category_data.category_name}</span>
            </div>
            <div className="filter">
                <div className="filter_main">
                    <span
                        onClick={() => setFilter("Recommend")}
                        className={`filter_item ${filter === "Recommend" ? "on" : "off"}`}
                    >
                        Recommend
                    </span>
                    <span className="divider">|</span>

                    <span
                        onClick={() => setFilter("Latest")}
                        className={`filter_item ${filter === "Latest" ? "on" : "off"}`}
                    >
                        Latest
                    </span>
                    <span className="divider">|</span>
                    <span
                        onClick={() => setFilter("Discount")}
                        className={`filter_item ${filter === "Discount" ? "on" : "off"}`}
                    >
                        Discount
                    </span>
                    <span className="divider">|</span>
                    <span
                        onClick={() => setFilter("Popular")}
                        className={`filter_item ${filter === "Popular" ? "on" : "off"}`}
                    >
                        Popular
                    </span>
                </div>
            </div>
            <div className="product_grid_container">
                {getSortedProductList().map((it, idx) => (
                    <ProductItem key={`PRODUCT_ITEM::${idx}`} {...it} category_id={cur_category_data.category_id} />
                ))}
            </div>
        </div>
    );
};

// MOBILE ONLY
const CategoryAside = ({ cur_category_id, category_list }) => {
    const [isOpen, setIsOpen] = useState(false);
    const toggle = () => setIsOpen(!isOpen);
    const PREVIEW_NUM = 10;
    const previewCategoryList = category_list.slice(0, PREVIEW_NUM);
    const fullCategoryList = category_list.slice(PREVIEW_NUM);

    const CategoryItem = (props) => {
        return (
            <Link href={`/${props.category_id}`}>
                <div
                    className={`category_box ${cur_category_id === props.category_id ? "category_on" : "catgory_off"}`}
                >
                    <span className="category_icon">{props.icon}</span>
                    <span className="category_name">{props.category_name}</span>
                </div>
            </Link>
        );
    };
    return (
        <div className="pc_only CategoryAside">
            <h4>Categories</h4>
            {previewCategoryList.map((it, idx) => (
                <CategoryItem key={`CATEGORY_PREVIEW::${idx}`} {...it} />
            ))}
            {isOpen && (
                <>
                    {fullCategoryList.map((it, idx) => (
                        <CategoryItem key={`CATEGORY_FULL::${idx}`} {...it} />
                    ))}
                </>
            )}
            {!isOpen && <div className="ellipse">...</div>}
            <div onClick={() => toggle()} className="viewmore">
                {!isOpen ? "View More" : "Shrink"}
            </div>
        </div>
    );
};

type Props = {};
const CategoryPage = ({ data }) => {
    const { cur_category_data, category_list } = data;

    const metaObj = {
        domain: "https://aliall.shop/",
        title: `${cur_category_data.category_name} 👉 All About AliExpress - AliAll`,
        url: `https://aliall.shop/${cur_category_data.category_id}`,
        image: `${shareImage.src}`,
        description: `${cur_category_data.category_name} - ${cur_category_data.product_list.map(
            (it) => it.product_title
        )}`,
    };
    return (
        <div className="CategoryPage">
            <Head>
                <title>{metaObj.title}</title>
                <meta name="description" content={metaObj.description} />
                <meta property="og:type" content="website" />
                <meta property="og:title" content={metaObj.title}></meta>
                <meta property="og:image" content={metaObj.image} />
                <meta property="og:url" content={metaObj.url}></meta>
                <meta property="og:description" content={metaObj.description} />
            </Head>
            <CategoryAside cur_category_id={cur_category_data.category_id} category_list={category_list} />
            <ProductGrid cur_category_data={cur_category_data} />
        </div>
    );
};
export async function getStaticProps({ params }) {
    const data = GET_CATEGORY_DATA(params.category);
    return {
        props: {
            data: data,
        },
    };
}
export async function getStaticPaths() {
    const paths = GET_CATEGORY_PAGES();
    return { paths, fallback: false };
}

export default CategoryPage;
