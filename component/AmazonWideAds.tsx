import React, { useState, useEffect } from "react";
type Props = {};
const AmazonWideAds = () => {
    const [width, setWidth] = useState(null);
    useEffect(() => {
        const width = document.getElementById("right_col")?.offsetWidth;
        setWidth(width);
        console.log(width);
    }, []);

    return (
        <div className="section_item">
            <div className="item_header">
                <h4>🧡 ADS</h4>
            </div>
            <div className="item_main ads">
                {width && (
                    <>
                        {width >= 728 ? (
                            <iframe
                                src={
                                    "//rcm-na.amazon-adsystem.com/e/cm?o=1&p=48&l=ez&f=ifr&linkID=0d2f0506cc99ef7ee34ff078bb77ef00&t=winterlood-20&tracking_id=winterlood-20"
                                }
                                width="728"
                                height="90"
                                scrolling="no"
                                frameBorder="0"
                            ></iframe>
                        ) : width >= 468 ? (
                            <iframe
                                src={
                                    "//rcm-na.amazon-adsystem.com/e/cm?o=1&p=13&l=ez&f=ifr&linkID=96b5ad64afe105278b36dbd1cec21518&t=winterlood-20&tracking_id=winterlood-20"
                                }
                                width="468"
                                height="60"
                                scrolling="no"
                                frameBorder="0"
                            ></iframe>
                        ) : (
                            <iframe
                                src={
                                    "//rcm-na.amazon-adsystem.com/e/cm?o=1&p=12&l=ez&f=ifr&linkID=c94c3cd949a602b4d104aad3717c04af&t=winterlood-20&tracking_id=winterlood-20"
                                }
                                width="300"
                                height="250"
                                scrolling="no"
                                frameBorder="0"
                            ></iframe>
                        )}
                    </>
                )}
            </div>
        </div>
    );
};

export default AmazonWideAds;
