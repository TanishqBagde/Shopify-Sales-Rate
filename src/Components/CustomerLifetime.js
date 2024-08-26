import React, { useEffect, useState } from "react";
import { Bar } from "react-chartjs-2";
import { Chart as ChartJS, BarElement, CategoryScale, LinearScale, Title, Tooltip, Legend } from 'chart.js';

ChartJS.register(BarElement, CategoryScale, LinearScale, Title, Tooltip, Legend);

const CustomerLifetimeValue = () => {
    const [chartData, setChartData] = useState(null);
    const [timeFrame, setTimeFrame] = useState('monthly'); //Monthly is being set for default 
    var baseUrl = 'https://shopify-sales-rate-api.onrender.com/api/';
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(`${baseUrl}customer-lifetime-value?timeFrame=${timeFrame}`);
                const data = await response.json();
                // iterating to the item through the id fetched 
                const labels = data.map(item => item._id);
                const datasets = [
                    {
                        label: 'Customer Lifetime Value',
                        data: data.map(item => item.avg_lifetime_value),
                        backgroundColor: 'rgba(75, 192, 192, 0.5)',
                    },
                ];
                setChartData({ labels, datasets });
            } catch (error) {
                console.error("Error fetching data: ", error);
            }
        };

        fetchData();
    }, [timeFrame,baseUrl]); // Refetching the data when time frame changes

    const handleTimeFrameChange = (event) => {
        setTimeFrame(event.target.value);
    };

    const options = {
        responsive: true,
        plugins: {
            legend: {
                position: 'top',
            },
            title: {
                display: true,
                text: 'Customer Lifetime Value by  ',
            },
        },
        scales: {
            x: {
                stacked: true,
            },
            y: {
                stacked: true,
            },
        },
    };

    return (
        <div>
            <h2>Customer Lifetime Value by  </h2>
            <select value={timeFrame} onChange={handleTimeFrameChange}>
                <option value="daily">Daily</option>
                <option value="monthly">Monthly</option>
                <option value="yearly">Yearly</option>
            </select>
            {chartData ? (
                <Bar data={chartData} options={options} />
            ) : (
                <p>Loading...</p>
            )}
        </div>
    );
};

export default CustomerLifetimeValue;
