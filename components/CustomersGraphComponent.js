import React, {useEffect} from 'react';
import styles from "../styles/CustomersGraphComponent.module.scss";
import {Chart,
    ArcElement,
    LineElement,
    BarElement,
    PointElement,
    BarController,
    BubbleController,
    DoughnutController,
    LineController,
    PieController,
    PolarAreaController,
    RadarController,
    ScatterController,
    CategoryScale,
    LinearScale,
    LogarithmicScale,
    RadialLinearScale,
    TimeScale,
    TimeSeriesScale,
    Decimation,
    Filler,
    Legend,
    Title,
    Tooltip,
    SubTitle} from "chart.js";

export default function CustomersGraphComponent(props) {
    Chart.register(
        ArcElement,
        LineElement,
        BarElement,
        PointElement,
        BarController,
        BubbleController,
        DoughnutController,
        LineController,
        PieController,
        PolarAreaController,
        RadarController,
        ScatterController,
        CategoryScale,
        LinearScale,
        LogarithmicScale,
        RadialLinearScale,
        TimeScale,
        TimeSeriesScale,
        Decimation,
        Filler,
        Legend,
        Title,
        Tooltip,
        SubTitle
      );

    useEffect(() => {

        const ctx = document.getElementById('myChart');
        const myChart = new Chart(ctx, {
            type: 'line',
            data: {
                labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
                datasets: [{
                    label: 'Number of Customers',
                    data: props.data,
                }]
            },
            options: {
                datasets: {
                    line: {
                        pointBackgroundColor: "#005F99" ,
                        backgroundColor: "rgba(0,95,153,0.3)",
                        borderCapStyle: "butt",
                        borderColor: "#005F99",
                        borderWidth: 3,  
                        fill: true,
                        pointBorderWidth: 1
                                  
                    }
                },
                scales: {
                    y: {
                        suggestedMin: 0,
                        suggestedMax: 10
                    },
                    x: {
                        grid: {
                            display: false,
                            color: "#EBEBEB"
                        }
                    }
                }
            }
        });
        
        return () => {
            myChart.destroy();
        }
    }, [])

    return (
        <div className={styles.graph}>
            <p className={styles.heading}>Orders placed in 1 Year</p>
            <canvas id="myChart" className={styles.chart} ></canvas>
        </div>
    )
}
