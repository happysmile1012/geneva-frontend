"use client"

import HighchartsReact from "highcharts-react-official";
import Highcharts from "highcharts";
import useIsMobile from "@/components/useIsMobile";
import {useEffect, useState} from "react";

function Dashboard() {
    const [data, setData] = useState({
        "token_count": 0,
        "chat_count": 0,
        "product_count": 0,
        "monthly_active": 0,
        "total_input_tokens": 0,
        "total_output_tokens": 0,
        "cost_to_date": 0
    })
    useEffect(() => {
        fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/dashboard/`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            }
        }).then((response) => {
            if (!response.ok) {
                // throw new Error('error');
                return false;
            }
            return response.json();
        }).then((response) => {
            if (!response) return;
            setData(response);
        }).catch((error) => {
            console.error(error);
        });
    }, []);
    const isMobile = useIsMobile();
    const BAR_NEW_OPTIONS = {
        chart: {

            type: "column"
        },
        title: {
            /**The chart's main title.*/
            text: "Search Engine Usage",
            align: "left", //align to left of the container
            style: {
                fontWeight: "bold"
            }
        },
        xAxis: {
            /**this is the horizontal axis */
            categories: ["Search Engine", "Marketplace"],
            lineColor: "#156082", // Color of the axis line
            lineWidth: 2,

        },
        yAxis: {
            /** this is the vertical axis */
            min: 0,
            max: 100,
            lineColor: "#156082",
            gridLineWidth: 0,
            lineWidth: 2,
            title: {
                text: ""
            }
        },
        credits: {
            enabled: false
        },
        legend: {
            /**The legend is a box containing a symbol and name for each series item or point item in the chart  */
            enabled: false
        },
        plotOptions: {
            series: {
                stacking: "normal",
                borderRadius: 10,
                borderColor: "#0f2d3c", // Border color
                borderWidth: 2,          // Border width in pixels
                pointWidth: 60
            },
            column: {
                borderColor: 'black',
                borderWidth: 2,
                borderRadius: 5
            }
        },
        tooltip: {
            // Using a formatter function for custom content
            formatter: function() {
                return `` +
                    `${this.y.toFixed(2)}%`;
            },
            // Or using pointFormat for simple templating
            // pointFormat: '<b>{series.name}</b>: {point.y:.2f}%'
        },
        series: [
            {
                data: [
                    { y: data.chat_count / (data.chat_count + data.product_count) * 100, name: "Search Engine", color: "#00b050" },
                    { y: data.product_count / (data.chat_count + data.product_count) * 100, name: "MarketPlace", color: "#00b0f0" },
                ]
            }
        ]
    };

    return <div className="w-[90%] m-auto pt-[30px]">
        <div align="center" className="text-[40px] font-bold">Dashboard</div>
        <div className="grid grid-cols-4 mt-[35px] gap-4">
            <Item title="Total Users" value={data.token_count}/>
            <Item title="Monthly Active" value={data.monthly_active}/>
            <Item title="Total Input Tokens" value={data.total_input_tokens}/>
            <Item title="Total Output Tokens" value={data.total_output_tokens}/>
        </div>
        <div className="grid grid-cols-4 mt-[35px] gap-4">
            <div className="col-span-3" align="center">
                <div
                    style={{
                        width: !isMobile ? "50%" : "100%",
                        margin: "auto"
                    }}
                >
                    <HighchartsReact highcharts={Highcharts} options={BAR_NEW_OPTIONS}
                    />
                </div>
            </div>
            <Item title="Cost/Month" value={data.cost_to_date}/>
        </div>
    </div>
}

function Item({title, value}) {
    return <div className="rounded-[20px] border-[2px] border-[#0f2d3c] h-[160px]">
        <div className="border-b border-gray pt-[15px] pb-[15px] text-[20px] font-bold" align="center">{title}</div>
        <div className="pt-[25px] pb-[25px]  text-[25px] font-bold" align="center">{value}</div>
    </div>
}

export default  Dashboard;