import React, { useEffect, useState } from "react";
import { fetchStores } from "../../api/adminApi";
import './styles/TTable.css';
const TotalStoresTable = () => {
    const [stores, setStores] = useState([]);

    useEffect(() => {
        const getData = async () => {
            try {
                const data = await fetchStores();
                setStores(data);
            } catch (error) {
                console.error("Error fetching stores", error);
            }
        };
        getData();
    }, []);
    const [sortColumn, setSortColumn] = useState(null);
    const [sortOrder, setSortOrder] = useState("asc");
    const handleSort = (column) => {
        let order = sortOrder === "asc" ? "desc" : "asc";
        setSortColumn(column);
        setSortOrder(order);

        const sortedStores = [...stores].sort((a, b) => {
            if (typeof a[column] === "string") {
                return order === "asc"
                    ? a[column].localeCompare(b[column])
                    : b[column].localeCompare(a[column]);
            } else {
                return order === "asc" ? (a[column] || 0) - (b[column] || 0) : (b[column] || 0) - (a[column] || 0);
            }
        });

        setStores(sortedStores);
    };
    return (
        <div>
            <h2>All Stores</h2>
            <table border="1">
                <thead>
                    <tr>
                    <th onClick={() => handleSort("id")}>ID</th>
                        <th onClick={() => handleSort("name")}>Name</th>
                        <th onClick={() => handleSort("email")}>Email</th>
                        <th onClick={() => handleSort("address")}>Address</th>
                        <th onClick={() => handleSort("owner_name")}>Owner Name</th>
                        <th onClick={() => handleSort("rating")}>Avg Rating</th>
                    </tr>
                </thead>
                <tbody>
                    {stores.map((store) => (
                        <tr key={store.id}>
                            <td>{store.id}</td>
                            <td>{store.name}</td>
                            <td>{store.email}</td>
                            <td>{store.address}</td>
                            <td>{store.owner_name}</td>
                            <td>{store.rating || "N/A"}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default TotalStoresTable;
