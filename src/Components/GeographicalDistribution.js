import React, { useEffect, useState } from "react";
import { Bar } from "react-chartjs-2";
import { Chart as ChartJS, BarElement, CategoryScale, LinearScale, Title, Tooltip, Legend } from 'chart.js';

ChartJS.register(BarElement, CategoryScale, LinearScale, Title, Tooltip, Legend);

const GeographicalDistribution = () => {
    const [chartData, setChartData] = useState(null);
    const [timeFrame, setTimeFrame] = useState('monthly'); 

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(`http://localhost:3002/api/geographical-distribution?timeFrame=${timeFrame}`);
                const data = await response.json();

               
                // Extracting city names
                const datasets = data.map(cityData => ({
                    label: cityData._id,
                    data: cityData.data.map(record => record.customer_count),
                    backgroundColor: 'rgba(255, 159, 64, 0.5)',
                    stack: cityData._id 
                }));

                const labels = data[0]?.data.map(record => record.timeFrame) || []; // Mapping with the timeframe

                setChartData({ labels, datasets });
            } catch (error) {
                console.error("Error fetching data: ", error);
            }
        };

        fetchData();
    }, [timeFrame]); 

    const handleTimeFrameChange = (event) => {
        setTimeFrame(event.target.value);
    };

    const options = {
        responsive: true,
        plugins: {
            legend: { position: 'top' },
            title: {
                display: true,
                text: 'Geographical Distribution of Customers',
            },
        },
        scales: {
            x: {
                title: {
                    display: true,
                    text: 'Time Frame',
                },
            },
            y: {
                title: {
                    display: true,
                    text: 'Number of Customers',
                },
                beginAtZero: true,
            },
        },
    };

    return (
        <div>
            <h2>Geographical Distribution of Customers</h2>
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

export default GeographicalDistribution;
