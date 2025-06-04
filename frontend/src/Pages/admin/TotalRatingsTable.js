// import React ,{useState,useEffect}from "react";
// import { fetchRatings } from "../../api/adminApi";
// const TotalRatingsTable = () => {
//     const [ratings, setRatings] = useState([]);
//     const [loading, setLoading] = useState(true);
//     const [error, setError] = useState(null);

//     useEffect(() => {
//         const getRatings = async () => {
//             try {
//                 const data = await fetchRatings();
//                 setRatings(data);
//                 setLoading(false);
//             } catch (err) {
//                 setError("Failed to fetch ratings.");
//                 setLoading(false);
//             }
//         };

//         getRatings();
//     }, []);

//     if (loading) return <p>Loading...</p>;
//     if (error) return <p>{error}</p>;

//     return (
//         <div>
//             <h2>Total Ratings</h2>
//             <table border="1">
//                 <thead>
//                     <tr>
//                         <th>Rating ID</th>
//                         <th>Store Name</th>
//                         <th>User Name</th>
//                         <th>Rating Value</th>
//                         <th>Comment</th>
//                     </tr>
//                 </thead>
//                 <tbody>
//                     {ratings.length > 0 ? (
//                         ratings.map((rating) => (
//                             <tr key={rating.id}>
//                                 <td>{rating.id}</td>
//                                 <td>{rating.store_name}</td>
//                                 <td>{rating.user_name}</td>
//                                 <td>{rating.rating_value}</td>
//                                 <td>{rating.comment}</td>
//                             </tr>
//                         ))
//                     ) : (
//                         <tr>
//                             <td colSpan="5">No ratings found</td>
//                         </tr>
//                     )}
//                 </tbody>
//             </table>
//         </div>
//     );
// };

// export default TotalRatingsTable;
import React, { useState, useEffect } from "react";
import { fetchRatings } from "../../api/adminApi";
import './styles/TTable.css'
const TotalRatingsTable = () => {
    const [ratings, setRatings] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const getRatings = async () => {
            try {
                const data = await fetchRatings();
                setRatings(data);
                setLoading(false);
            } catch (err) {
                setError("Failed to fetch ratings.");
                setLoading(false);
            }
        };

        getRatings();
    }, []);

    if (loading) return <p>Loading...</p>;
    if (error) return <p>{error}</p>;
    
    return (
        <div>
            <h2>Total Ratings</h2>
            <table border="1">
                <thead>
                    <tr>
                        <th>Store Name</th>
                        <th>User ID</th>
                        <th>Rating Value</th>
                        <th>Created At</th>
                    </tr>
                </thead>
                <tbody>
                    {ratings.length > 0 ? (
                        ratings.map((store, index) => (
                            store.ratings.map((rat, i) => (
                                <tr key={`${index}-${i}`}>
                                    <td>{store.store_name}</td>
                                    <td>{store.store_email}</td>
                                    <td>{rat.rating}</td>
                                    <td>{new Date(rat.created_at).toLocaleString()}</td>
                                </tr>
                            ))
                        ))
                    )
                     : (
                    <tr>
                        <td colSpan="4">No ratings found</td>
                    </tr>
                    )}
                </tbody>
            </table>
        </div>
    );
};

export default TotalRatingsTable;
