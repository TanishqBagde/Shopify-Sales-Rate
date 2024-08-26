import React, { useEffect, useState } from "react";
import { Line } from "react-chartjs-2";
import { Chart as ChartJS, LineElement, PointElement, CategoryScale, LinearScale, Title, Tooltip, Legend } from 'chart.js';

ChartJS.register(LineElement, PointElement, CategoryScale, LinearScale, Title, Tooltip, Legend);

const NewCustomers = () => {
    const [chartData, setChartData] = useState(null);
    const [timeFrame, setTimeFrame] = useState('monthly'); 
    var baseUrl = process.env.SERVER_BASE_URL;

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(`${baseUrl}new-customers-over-time?timeFrame=${timeFrame}`);
                const data = await response.json();
                console.log(data);
                const labels = data.map(item => item._id); 
                const datasets = [
                    {
                        label: 'New Customers',
                        data: data.map(item => item.new_customers), //number of new customers
                        borderColor: 'rgba(75, 192, 192, 1)',
                        backgroundColor: 'rgba(75, 192, 192, 0.2)',
                        fill: true,
                    },
                ];
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
            legend: {
                position: 'top',
            },
            title: {
                display: true,
                text: 'New Customers Over Time',
            },
        },
        scales: {
            x: {
                title: {
                    display: true,
                    text: 'Date',
                },
            },
            y: {
                title: {
                    display: true,
                    text: 'Number of New Customers',
                },
            },
        },
    };

    return (
        <div>
            <h2>New Customers Over Time</h2>
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

export default NewCustomers;
