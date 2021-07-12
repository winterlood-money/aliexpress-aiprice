import React, { useState, useEffect } from "react";
import AliceCarousel from "react-alice-carousel";
import Link from "next/link";
import { useRouter } from "next/router";
type Props = {};

const CategoryBox = ({ category_item_list }) => {
    const router = useRouter();
    console.log(router);
    return (
        <div className="CategoryBox pc_only">
            <div className="grid_container">
                {category_item_list.map((it, idx) => (
                    <Link href={`/${it.category_id}`}>
                        <div key={`CATEGORY_BOX:${idx}`} className="category_item">
                            <span className="category_icon">{it.icon}</span>
                            <span className="category_name">{it.category_name}</span>
                        </div>
                    </Link>
                ))}
            </div>
        </div>
    );
};

export default CategoryBox;
