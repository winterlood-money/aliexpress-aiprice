import { GET_CATEGORY_LIST, GET_INDEX_PAGE } from "lib/data";
import React, { useState, useEffect } from "react";

import ProductSlide from "component/ProductSlide";
import CategorySlide from "component/CategorySlide";
import CategoryBox from "component/CategoryBox";
import Head from "next/head";
import shareImage from "public/share.png";

type Props = {};

const Index = ({ data }) => {
    return (
        <div>
            <Head>
                <meta property="og:type" content="website" />
                <meta property="og:title" content="All About AliExpress - AliAll"></meta>
                <meta property="og:image" content={shareImage.src} />
                <meta property="og:url" content="https://ali.aiprice.shop/"></meta>
                <meta
                    property="og:description"
                    content="The cheapest, fastest and most efficient way to buy aliexpress"
                />
            </Head>
            <a href="https://s.click.aliexpress.com/e/_ASEOe8" target="_blank">
                <div
                    className="wide_banner"
                    style={{ backgroundImage: `url('//ae01.alicdn.com/kf/H1e303fdae72d4e4e9e7eafdcc327314ci.png')` }}
                ></div>
            </a>

            <CategoryBox category_item_list={data.categoryData} />
            <ProductSlide slide_title={"💥 Popular"} product_item_list={data.popular_product_list} />
            <ProductSlide slide_title={"🚩 Recommend"} product_item_list={data.recommend_product_list} />
            <ProductSlide slide_title={"🔥 Hot deals"} product_item_list={data.discount_product_list} />
            <ProductSlide slide_title={"🌍 latest"} product_item_list={data.latest_product_list} />
        </div>
    );
};

export async function getStaticProps({ params }) {
    const data = GET_INDEX_PAGE();
    const categoryData = GET_CATEGORY_LIST();
    return {
        props: {
            data: { ...data, categoryData: categoryData },
        },
    };
}
export default Index;
