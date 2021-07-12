import { GET_CATEGORY_LIST } from "lib/data";
import Link from "next/link";
import React, { useState, useEffect } from "react";
type Props = {};

const CategoryGridItem = (props) => {
    return (
        <Link href={`/${props.category_id}`}>
            <div className="CategoryGridItem">
                <div className="category">
                    <span className="category_icon">{props.icon}</span>
                    <div className="category_info">
                        <span className="category_name">{props.category_name}</span>
                        <span className="category_product_count">{props.category_product_count} items</span>
                    </div>
                </div>
            </div>
        </Link>
    );
};

const Category = ({ category_list }) => {
    // THIS PAGE NEED FOR MOBILE CATEGORY SEARCH & SELECT
    return (
        <div className="Category">
            <h2>Categories</h2>
            <span className="page_label">There are {category_list.length} categories</span>
            <div className="grid_container">
                {category_list.map((it, idx) => (
                    <CategoryGridItem key={`CATEGORY_ITEM::${idx}`} {...it} />
                ))}
            </div>
        </div>
    );
};

export async function getStaticProps({ params }) {
    const category_list = GET_CATEGORY_LIST();
    return {
        props: {
            category_list: category_list,
        },
    };
}

export default Category;
