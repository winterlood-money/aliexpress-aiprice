import { GET_DETAIL_DATA, GET_DETAIL_PAGES } from "lib/data";
import React, { useState, useEffect } from "react";
import dynamic from "next/dynamic";
import { AiFillStar } from "react-icons/ai";
import Link from "next/link";
import Head from "next/head";

type Props = {};

const DetailPage = ({ data }) => {
    const DynamicPriceHistroyChart = dynamic(() => import("../../component/PriceHistoryChart"));
    const DynamicAmazonAds = dynamic(() => import("../../component/AmazonWideAds"));
    const metaObj = {
        domain: "https://aliall.shop/",
        title: `${data.product_title} 👉 All About AliExpress - AliAll`,
        url: `https://aliall.shop/${data.first_level_category_id}/${data.product_id}`,
        image: `${data.product_main_image_url}`,
        description: `${data.product_title}, ${data.first_level_category_name}, ${
            data.second_level_category_name
        }, ${data.related_product_list.map((it) => it.product_title)}`,
        price_amount: `${data.sale_price}`,
    };

    const last_update = new Date(data.last_modify).toLocaleDateString("en-US", {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric",
    });

    return (
        <div className="ProductDetail">
            <Head>
                <title>{metaObj.title}</title>
                <meta name="description" content={metaObj.description} />
                <meta property="og:type" content="product" />
                <meta property="product:price:currency" content="USD"></meta>
                <meta property="product:price:amount" content={metaObj.price_amount}></meta>
                <meta property="og:title" content={metaObj.title}></meta>
                <meta property="og:url" content={metaObj.url}></meta>
                <meta property="og:image" content={metaObj.image} />
                <meta property="og:description" content={metaObj.description} />
            </Head>
            <div className="left_col">
                <div className="section_item">
                    <div className="item_header">
                        <h4>🔖 CATEGORY INFO</h4>
                    </div>
                    <div className="item_main category_info">
                        <Link href={`/${data.first_level_category_id}`}>
                            <span className="category_item">{data.first_level_category_name}</span>
                        </Link>
                        <Link href={`/${data.first_level_category_id}`}>
                            <span className="category_item">{data.second_level_category_name}</span>
                        </Link>
                    </div>
                </div>
                <div className="section_item">
                    <div className="item_header">
                        <h4>🕓 LAST UPDATE</h4>
                    </div>
                    <div className="item_main last_update">
                        <time dateTime={data.last_modify}>{last_update}</time>
                    </div>
                </div>
                <div className="section_item">
                    <div className="item_header">
                        <h4>🖼️ PRODUCT IMAGE</h4>
                    </div>
                    <div className="item_main">
                        <div className="product_main_image">
                            <img src={data.product_main_image_url} alt={data.product_title} />
                        </div>
                    </div>
                </div>

                {data.product_video_url && (
                    <div className="section_item pc_only">
                        <div className="item_header">
                            <h4>🎞️ PRODUCT VIDEO</h4>
                        </div>
                        <div className="item_main product_video">
                            <video controls src={data.product_video_url} />
                        </div>
                    </div>
                )}
            </div>
            <div className="right_col" id="right_col">
                <div className="section_item">
                    <div className="item_header">
                        <h4>📝 PRODUCT INFO</h4>
                    </div>
                    <div className="item_main product_detail_info">
                        <div className="grid_wrapper">
                            <div className="product_content">
                                <h4>{data.product_title}</h4>
                                <div className="order_box">
                                    <span className="star">
                                        <AiFillStar />
                                        <AiFillStar />
                                        <AiFillStar />
                                        <AiFillStar />
                                        <AiFillStar />
                                    </span>
                                    <br />
                                    <span>{data.lastest_volume.toLocaleString()} order</span>
                                </div>
                            </div>
                            <div className="product_stat">
                                <div className="stat_wrapper">
                                    <span className="discount badge">{data.discount} OFF</span>
                                    <br />
                                    <span className="cur_price">{data.sale_price} $</span>
                                    <br />
                                    <span className="origin_price">{data.original_price}</span>
                                </div>
                            </div>
                        </div>
                        <div className="item_footer">
                            <a href={`${data.promotion_link}`} target="_blank">
                                <div className="shop_button">Open on Aliexpress</div>
                            </a>
                        </div>
                    </div>
                </div>
                <DynamicPriceHistroyChart product_id={data.product_id} />
                <DynamicAmazonAds />
                {data.product_video_url && (
                    <div className="section_item mobile_only">
                        <div className="item_header">
                            <h4>🎞️ PRODUCT VIDEO</h4>
                        </div>
                        <div className="item_main product_video">
                            <video controls src={data.product_video_url} />
                        </div>
                    </div>
                )}
                <div className="section_item">
                    <div className="item_header">
                        <h4>🖼️ EXTRA PRODUCT IMAGES</h4>
                    </div>
                    <div className="item_main product_image_grid">
                        {data.product_small_image_urls.string.map((it, idx) => (
                            <a className="link_image" href={`${data.promotion_link}`} target="_blank">
                                <div className="mask">
                                    <span>View detail</span>
                                </div>
                                <img key={`PRODUCT_SMALL_IMAGE::${idx}`} src={it} />
                            </a>
                        ))}
                    </div>
                </div>
                <div className="section_item">
                    <div className="item_header">
                        <h4>💡 RELATED ITEMS</h4>
                    </div>
                    <div className="item_main related_product_grid">
                        {data.related_product_list.map((it, idx) => (
                            <Link href={`/${data.first_level_category_id}/${it.product_id}`}>
                                <div key={`RELPRODUCT::${idx}`} className="related_product_item">
                                    <img alt={it.product_title} src={it.product_main_image_url} />
                                </div>
                            </Link>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export async function getStaticProps({ params }) {
    const data = GET_DETAIL_DATA(params.category, params.product_id);

    return {
        props: {
            data: { ...data },
        },
    };
}

export async function getStaticPaths() {
    const paths = GET_DETAIL_PAGES();
    return { paths, fallback: false };
}

export default DetailPage;
