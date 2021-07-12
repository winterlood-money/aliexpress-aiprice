import React, { useState, useEffect, useRef } from "react";
import AliceCarousel from "react-alice-carousel";

type Props = {};
const responsive = {
    0: {
        items: 3,
    },
    600: {
        items: 4,
    },
    800: {
        items: 5,
    },
    1024: {
        items: 6,
    },
    1449: {
        items: 10,
    },
};

const CategoryItem = (props) => {
    var hexValues = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "a", "b", "c", "d", "e"];
    function populate(a) {
        for (var i = 0; i < 6; i++) {
            var x = Math.round(Math.random() * 14);
            var y = hexValues[x];
            a += y;
        }
        return a;
    }
    var newColor1 = populate("#");
    var newColor2 = populate("#");
    var angle = Math.round(Math.random() * 360);
    var gradient = "linear-gradient(" + angle + "deg, " + newColor1 + ", " + newColor2 + ")";
    return (
        <div className="CategoryItem">
            <div className="item_wrapper" style={{ background: gradient }}>
                {props.category_name}
            </div>
        </div>
    );
};

const CategorySlide = ({ category_item_list }) => {
    const slideRef = useRef(null);

    return (
        <div className="CategorySlide">
            <h4>Categories</h4>
            <div className="slide_wrapper">
                <AliceCarousel
                    ref={slideRef}
                    // @ts-ignore
                    duration={400}
                    infinite={true}
                    autoPlay={true}
                    startIndex={1}
                    fadeOutAnimation={true}
                    mouseDragEnabled={true}
                    playButtonEnabled={false}
                    disableDotsControls={false}
                    disableButtonsControls={true}
                    responsive={responsive}
                    autoPlayInterval={2000}
                    autoPlayDirection="rtl"
                    autoPlayActionDisabled={true}
                    swipeDelta={10}
                >
                    {category_item_list.map((it, idx) => (
                        <CategoryItem key={`CATEGORY_ITEM::${idx}`} {...it} />
                    ))}
                </AliceCarousel>
            </div>
        </div>
    );
};

export default CategorySlide;
