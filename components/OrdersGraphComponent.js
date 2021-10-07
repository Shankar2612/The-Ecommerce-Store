import React, {useEffect} from 'react';
import styles from "../styles/OrdersGraphComponent.module.scss";
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

export default function OrdersGraphComponent(props) {
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
                    label: 'Number of Orders',
                    data: props.data,
                }]
            },
            options: {
                datasets: {
                    line: {
                        pointBackgroundColor: "#00EAD3" ,
                        backgroundColor: "rgba(0,234,211,0.3)",
                        borderCapStyle: "butt",
                        borderColor: "#00EAD3",
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
