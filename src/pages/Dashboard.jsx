import React from "react";
import { Outlet } from "react-router-dom";
import styles from "../Style/Dashboard.module.css";
import Header from "./../components/Layout/Header";
import Sidebar from "./../components/Layout/SideBar";
import Footer from "./../components/Layout/Footer";

const Dashboard = () => {
  return (
    <div className={styles.dashboardContainer}>
      <Sidebar />
      <div className={styles.mainContent}>
        <Header />
        <div className={styles.contentArea}>
          <Outlet />
        </div>
        <Footer />
      </div>
    </div>
  );
};

export default Dashboard;
