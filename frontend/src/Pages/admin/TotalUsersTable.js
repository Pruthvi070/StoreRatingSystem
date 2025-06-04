import React, { useEffect, useState } from "react";
import { fetchUsers } from "../../api/adminApi";
import './styles/TTable.css'
const TotalUsersTable = () => {
    const [users, setUsers] = useState([]);

    useEffect(() => {
        const getData = async () => {
            try {
                const data = await fetchUsers();
                setUsers(data);
            } catch (error) {
                console.error("Error fetching users", error);
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
    
            const sortedUsers = [...users].sort((a, b) => {
                if (typeof a[column] === "string") {
                    return order === "asc"
                        ? a[column].localeCompare(b[column])
                        : b[column].localeCompare(a[column]);
                } else {
                    return order === "asc" ? (a[column] || 0) - (b[column] || 0) : (b[column] || 0) - (a[column] || 0);
                }
            });
    
            setUsers(sortedUsers);
        };
    return (
        <div>
            <h2>All Users</h2>
            <table border="1">
                <thead>
                    <tr>
                    <th onClick={() => handleSort("id")}>ID</th>
                        <th onClick={() => handleSort("name")}>Name</th>
                        <th onClick={() => handleSort("email")}>Email</th>
                        <th onClick={() => handleSort("role")}>Role</th>
                        <th onClick={() => handleSort("avg_rating")}>Avg Rating</th>
                    </tr>
                </thead>
                <tbody>
                    {users.map((user) => (
                        <tr key={user.id}>
                            <td>{user.id}</td>
                            <td>{user.name}</td>
                            <td>{user.email}</td>
                            <td>{user.role}</td>
                            <td>{user.avg_rating || "N/A"}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default TotalUsersTable;
