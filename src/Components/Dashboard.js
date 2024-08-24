import React from "react";
import CustomerLifetimeValue from "./CustomerLifetime";
import GeographicalDistribution from "./GeographicalDistribution";
import NewCustomers from "./NewCustomers";
import NumberOfRepeat from "./NumberOfRepeat";
import SalesGrowthRate from "./SalesGrowth";
import TotalSalesOverTime from "./TotalSales";

const Dashboard = () => {
    return (
        <>
            <div className="row">
                <div className="col-md-4"><CustomerLifetimeValue/></div>
                <div className="col-md-4"><GeographicalDistribution/></div>
                <div className="col-md-4"><NewCustomers/></div>
            </div>
            <div className="row">
                <div className="col-md-4"><NumberOfRepeat/></div>
                <div className="col-md-4"><SalesGrowthRate/></div>
                <div className="col-md-4"><TotalSalesOverTime/></div>
            </div>
        </>
    );
};

export default Dashboard;
