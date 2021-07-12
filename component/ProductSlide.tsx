import React, { useState, useEffect, useRef } from "react";
import AliceCarousel from "react-alice-carousel";

import LeftArrow from "public/left-arrow.svg";
import Link from "next/link";

const ProductItem = (props) => {
    const ProductStat = () => {
        switch (props.slide_title) {
            case "💥 Popular": {
                return {
                    label: "order",
                    value: props.lastest_volume.toLocaleString(),
                };
            }
            case "🔥 Hot deals": {
                return {
                    label: "off",
                    value: props.discount,
                };
            }
            default:
                return false;
        }
    };
    const extraStat = ProductStat();
    return (
        <Link href={`${props.first_level_category_id}/${props.product_id}`}>
            <div className="ProductItem">
                <div className="item_wrapper">
                    <div
                        className="thumbnail_box"
                        style={{ backgroundImage: `url('${props.product_main_image_url}')` }}
                    >
                        {extraStat && (
                            <div className="extra_stat_box">
                                <span className="value">{extraStat.value}</span>&nbsp;
                                <span className="label">{extraStat.label}</span>
                            </div>
                        )}
                    </div>
                    <div className="info_box">
                        <h5 className="title">{props.product_title}</h5>
                        <div className="price">
                            US {/* {props.sale_price_currency}&nbsp; */}
                            {props.sale_price}
                            {"$"}
                        </div>

                        {extraStat && (
                            <div className="extra_box">
                                <span className="value">{extraStat.value}</span>
                                <span className="label">{extraStat.label}</span>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </Link>
    );
};

type Props = {};
const ProductSlide = ({ slide_title, product_item_list }) => {
    const slideRef = useRef(null);
    const responsive = {
        0: {
            items: 2.3,
        },
        600: {
            items: 3,
        },
        1024: {
            items: 5,
        },
    };

    return (
        <div className="ProductSlide">
            <h4>{slide_title}</h4>
            <div className="slide_wrapper">
                <AliceCarousel
                    ref={slideRef}
                    // @ts-ignore
                    duration={400}
                    autoPlay={true}
                    startIndex={1}
                    fadeOutAnimation={true}
                    mouseDragEnabled={true}
                    playButtonEnabled={true}
                    disableDotsControls={true}
                    disableButtonsControls={true}
                    responsive={responsive}
                    autoPlayInterval={2000}
                    autoPlayDirection="rtl"
                    autoPlayActionDisabled={true}
                    swipeDelta={10}
                >
                    {product_item_list.map((it, idx) => (
                        <ProductItem key={`PRODUCT_ITEM::${idx}`} {...it} slide_title={slide_title} />
                    ))}
                </AliceCarousel>
                <div
                    onClick={() => {
                        if (slideRef.current) {
                            slideRef.current.slidePrev();
                        }
                    }}
                    className="slide_btn prev_button"
                >
                    {"<"}
                    {/* <img src={"left-arrow.svg"} /> */}
                </div>
                <div
                    onClick={() => {
                        if (slideRef.current) {
                            slideRef.current.slideNext();
                        }
                    }}
                    className="slide_btn next_button"
                >
                    {">"}
                </div>
            </div>
        </div>
    );
};

export default ProductSlide;
