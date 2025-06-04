import React, { useState, useEffect } from "react";
import { getAllStores, searchStores } from "../../api/userApi";
import { useNavigate } from "react-router-dom";
import './styles/Homepage.css';
const HomePage = () => {
    const [stores, setStores] = useState([]);
    const [searchQuery, setSearchQuery] = useState("");
    const navigate = useNavigate();

    useEffect(() => {
        fetchStores();
    }, []);

    // Fetch all stores
    const fetchStores = async () => {
        const data = await getAllStores();
        setStores(data);
    };

    // Handle search
    const handleSearch = async () => {
        if (searchQuery.trim() === "") {
            fetchStores(); // Show all stores if search is empty
        } else {
            const data = await searchStores(searchQuery);
            setStores(data);
        }
    };

    // Navigate to store details page
    const handleStoreClick = (storeId) => {
        navigate(`/store/${storeId}`);
    };
    // const [stores, setStores] = useState([]);
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
                return order === "asc" ? a[column] - b[column] : b[column] - a[column];
            }
        });

        setStores(sortedStores);
    };
    return (
        <div className="container">
            <h2>Store Listing</h2>
            
            {/* Search Bar */}
            <div className="search-container">
                <input
                    type="text"
                    placeholder="Search stores..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                />
                <button onClick={handleSearch}>Search</button>
            </div>

            {/* Store List Table */}
            <table>
                <thead>
                    <tr>
                    <th onClick={() => handleSort("name")}>Name</th>
                        <th onClick={() => handleSort("address")}>Address</th>
                        <th onClick={() => handleSort("owner_name")}>Owner</th>
                        <th onClick={() => handleSort("email")}>Email</th>
                        <th onClick={() => handleSort("averageRating")}>Rating</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {stores.length > 0 ? (
                        stores.map((store) => (
                            <tr key={store.id}>
                                <td>{store.name}</td>
                                <td>{store.address}</td>
                                <td>{store.owner_name}</td>
                                <td>{store.email}</td>
                                <td>{store.averageRating}</td>
                                <td>
                                    <button onClick={() => handleStoreClick(store.id)} className="view-button">
                                        View Details
                                    </button>
                                </td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan="6">No stores found.</td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    );
};

export default HomePage;
