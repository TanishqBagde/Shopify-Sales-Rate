import React, { useState } from 'react';
import './style.css'; // Ensure the path is correct
import TotalSales from '../Components/TotalSales';
import SalesGrowthRate from '../Components/SalesGrowth';
import NumberOfRepeat from '../Components/NumberOfRepeat';
import NewCustomers from '../Components/NewCustomers';
import GeographicalDistribution from '../Components/GeographicalDistribution';
import CustomerLifetimeValue from '../Components/CustomerLifetime';
import Dashboard from '../Components/Dashboard';

const Homepage = () => {
  const [activeComponent, setActiveComponent] = useState(<TotalSales />);

  return (
    <div className="homepage w-100">
      <div className='row'>
      <div className="sidebar col-4">
        <ul className="sidebar-list">
          {/* <li className="sidebar-item" onClick={() => setActiveComponent(<Dashboard />)}>
            Dashboard
          </li> */}
          <li className="sidebar-item" onClick={() => setActiveComponent(<TotalSales />)}>
            Total Sales Over Time
          </li>
          <li className="sidebar-item" onClick={() => setActiveComponent(<SalesGrowthRate />)}>
            Sales Growth Rate Over Time
          </li>
          <li className="sidebar-item" onClick={() => setActiveComponent(<NewCustomers />)}>
            New Customers Added Over Time
          </li>
          <li className="sidebar-item" onClick={() => setActiveComponent(<NumberOfRepeat />)}>
            Number of Repeat Customers
          </li>
          <li className="sidebar-item" onClick={() => setActiveComponent(<GeographicalDistribution />)}>
            Geographical Distribution of Customers
          </li>
          <li className="sidebar-item" onClick={() => setActiveComponent(<CustomerLifetimeValue />)}>
            Customer Lifetime Value by  
          </li>
        </ul>
      </div>
      <div className="content col-8">
        {activeComponent}
      </div>
      </div>
    </div>
  );
}

export default Homepage;
