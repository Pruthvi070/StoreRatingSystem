import React, { useEffect, useState } from "react";
import { fetchAdminDashboard } from "../../api/adminApi";
import { useNavigate } from "react-router-dom";
import './styles/Dashboard.css';
const Dashboard = () => {
    const [dashboardData, setDashboardData] = useState({ total_users: 0, total_stores: 0, total_ratings: 0 });
    const navigate = useNavigate();

    useEffect(() => {
        const getData = async () => {
            try {
                const data = await fetchAdminDashboard();
                setDashboardData(data);
            } catch (error) {
                console.error("Error fetching dashboard data", error);
            }
        };
        getData();
    }, []);

    return (
        <div>
            <h2>Admin Dashboard</h2>
            <div style={{ display: "flex", gap: "20px" }}>
                <div className="card" onClick={() => navigate("/admin/users")}>
                    <h3>Total Users</h3>
                    <p>{dashboardData.total_users}</p>
                </div>
                <div className="card" onClick={() => navigate("/admin/stores")}>
                    <h3>Total Stores</h3>
                    <p>{dashboardData.total_stores}</p>
                </div>
                <div className="card" onClick={() => navigate("/admin/ratings")}>
                    <h3>Total Ratings</h3>
                    <p>{dashboardData.total_ratings}</p>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
