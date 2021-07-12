import React, { useState, useEffect } from "react";
import { Line } from "react-chartjs-2";
type Props = {};

const PriceHistoryChart = ({ product_id }) => {
    const [priceHistory, setPriceHistory] = useState(null);

    const [state, setState] = useState(null);

    const getData = () => {
        fetch(`/api/get/${product_id}`)
            .then((res) => res.json())
            .then((res) => {
                console.log(res);
                console.log(res.slice(-7));
                setPriceHistory(res.slice(-7));
            });
    };
    useEffect(() => {
        if (priceHistory) {
            console.log("SET STATE");
            setState({
                data: {
                    labels: priceHistory && priceHistory.map((it) => it.x.slice(-5)),
                    datasets: [
                        //원소 1
                        {
                            label: "PRICE ($)",
                            data: priceHistory && priceHistory.map((it) => it.y),
                            lineTension: 0.5,
                            backgroundColor: "rgb(255, 217, 217,0.5)",
                            borderWidth: 1.5,
                            borderColor: "#ff4747",
                            fill: true,
                        },
                    ],
                },
                options: {},
            });
        }
    }, [priceHistory]);
    useEffect(() => {
        console.log("SET DATA");

        getData();
    }, []);

    const options = {
        responsive: true,
        maintainAspectRatio: false,
        //tooltips 사용시
        tooltips: {
            enabled: true,
            mode: "nearest",
            position: "average",
            intersect: false,
        },
        scales: {
            xAxes: [
                {
                    //   position: "top", //default는 bottom
                    display: true,
                    scaleLabel: {
                        display: true,
                        labelString: "Step",
                        fontFamily: "Montserrat",
                        fontColor: "black",
                    },
                    ticks: {
                        // beginAtZero: true,
                        maxTicksLimit: 10, //x축에 표시할 최대 눈금 수
                    },
                },
            ],
            yAxes: [
                {
                    display: false,
                    //   padding: 10,
                    scaleLabel: {
                        display: false,
                        labelString: "Coverage",
                        fontFamily: "Montserrat",
                        fontColor: "black",
                    },
                    ticks: {
                        beginAtZero: true,
                        stepSize: 20,
                        min: 0,
                        max: 100,
                        //y축 scale 값에 % 붙이기 위해 사용
                        callback: function (value) {
                            return value + "%";
                        },
                    },
                },
            ],
        },
    };
    const legend = {
        display: true,
        labels: {
            fontColor: "black",
        },
        position: "top", //label를 넣어주지 않으면 position이 먹히지 않음
    };
    return (
        // @ts-ignore
        <>
            {state && (
                <div className="section_item">
                    <div className="item_header">
                        <h4>💰 PRICE TRACKER</h4>
                    </div>
                    <div className="item_main">
                        <Line
                            data={state.data}
                            //@ts-ignore
                            legend={legend}
                            options={options}
                        />
                    </div>
                </div>
            )}
        </>
    );
};

export default PriceHistoryChart;
