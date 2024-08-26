import React, { useEffect, useState } from "react";
import { Line } from "react-chartjs-2";
import { Chart as ChartJS, LineElement, CategoryScale, LinearScale, Title, Tooltip, Legend } from 'chart.js';

ChartJS.register(LineElement, CategoryScale, LinearScale, Title, Tooltip, Legend);

const TotalSalesOverTime = () => {
    const [chartData, setChartData] = useState(null);
    const [timeFrame, setTimeFrame] = useState('monthly'); 
    var baseUrl = process.env.SERVER_BASE_URL;

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(`${baseUrl}sales-over-time?timeFrame=${timeFrame}`);
                const data = await response.json();
                const labels = data.map(item => item._id); 
                const dataset = {
                    label: 'Total Sales',
                    data: data.map(item => item.total_sales),
                    borderColor: 'rgba(75, 192, 192, 1)',
                    backgroundColor: 'rgba(75, 192, 192, 0.2)',
                };
                setChartData({ labels, datasets: [dataset] });
            } catch (error) {
                console.error("Error fetching data: ", error);
            }
        };

        fetchData();
    }, [timeFrame,baseUrl]); 

    const handleTimeFrameChange = (event) => {
        setTimeFrame(event.target.value);
    };

    const options = {
        responsive: true,
        plugins: {
            legend: { position: 'top' },
            title: {
                display: true,
                text: 'Total Sales Over Time',
            },
        },
    };

    return (
        <div>
            <h2>Total Sales Over Time</h2>
            <select value={timeFrame} onChange={handleTimeFrameChange}>
                <option value="daily">Daily</option>
                <option value="monthly">Monthly</option>
                <option value="yearly">Yearly</option>
            </select>
            {chartData ? (
                <Line data={chartData} options={options} />
            ) : (
                <p>Loading...</p>
            )}
        </div>
    );
};

export default TotalSalesOverTime;
