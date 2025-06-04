// import React, { useEffect, useState } from "react";
// import { useParams } from "react-router-dom";
// import { submitRating, getAllStores } from "../../api/userApi";

// const StoreDetails = () => {
//     const { storeId } = useParams();
//     const [store, setStore] = useState(null);
//     const [rating, setRating] = useState(0);
//     const userId = "loggedUser123"; // Replace with actual logged-in user ID

//     useEffect(() => {
//         fetchStoreDetails();
//     }, []);

//     // Fetch store details from the store list
//     const fetchStoreDetails = async () => {
//         const stores = await getAllStores();
//         const selectedStore = stores.find((store) => store.id === storeId);
//         setStore(selectedStore);
//     };

//     // Submit rating
//     const handleRatingSubmit = async () => {
//         if (rating < 1 || rating > 5) {
//             alert("Rating must be between 1 and 5");
//             return;
//         }

//         const response = await submitRating(userId, storeId, rating);
//         if (response) {
//             alert("Rating submitted successfully!");
//             fetchStoreDetails(); // Refresh details after rating
//         }
//     };

//     if (!store) return <p>Loading...</p>;

//     return (
//         <div>
//             <h2>{store.name}</h2>
//             <p><strong>Address:</strong> {store.address}</p>
//             <p><strong>Owner:</strong> {store.owner_name}</p>
//             <p><strong>Email:</strong> {store.email}</p>
//             <p><strong>Average Rating:</strong> {store.averageRating}</p>

//             <div>
//                 <h3>Rate this store:</h3>
//                 <input
//                     type="number"
//                     min="1"
//                     max="5"
//                     value={rating}
//                     onChange={(e) => setRating(parseInt(e.target.value))}
//                 />
//                 <button onClick={handleRatingSubmit}>Submit Rating</button>
//             </div>
//         </div>
//     );
// };

// export default StoreDetails;
// import React, { useEffect, useState } from "react";
// import { useParams } from "react-router-dom";
// import { submitRating, getAllStores } from "../../api/userApi";
// import axios from "axios";
// import { useSelector } from "react-redux";

// const StoreDetails = () => {
//     const { storeId } = useParams();
//     const [store, setStore] = useState(null);
//     const [rating, setRating] = useState(0);
//     const [userRating, setUserRating] = useState(null);
//     const userId = useSelector((state) => state?.auth?.user?.id); // Replace with actual logged-in user ID

//     useEffect(() => {
//         fetchStoreDetails();
//         checkUserRating();
//     }, []);

//     // Fetch store details
//     const fetchStoreDetails = async () => {
//         const stores = await getAllStores();
//         const selectedStore = stores.find((store) => store.id === storeId);
//         setStore(selectedStore);
//     };

//     // Check if the user has already rated this store
//     const checkUserRating = async () => {
//         try {
//             const response = await axios.get(`http://localhost:5000/api/users/ratings/user/${userId}/${storeId}`);
//             console.log(response);
//             if (response.data.userRating) {
//                 setUserRating(response.data.userRating);
//                 console.log(response.data);
//                 setRating(response.data.userRating.rating);
//             }
//         } catch (error) {
//             console.error("Error fetching user rating:", error);
//         }
//     };

//     // Submit or modify rating
//     const handleRatingSubmit = async () => {
//         if (rating < 1 || rating > 5) {
//             alert("Rating must be between 1 and 5");
//             return;
//         }

//         const response = await submitRating(userId, storeId, rating);
//         if (response) {
//             console.log("response", response.data);
//             alert("Rating submitted successfully!");
//             checkUserRating(); // Refresh rating
//             fetchStoreDetails();
//         }
//     };

//     if (!store) return <p>Loading...</p>;

//     return (
//         <div className="store-details">
//             <div className="store-info">

//                 <h2>{store.name}</h2>
//                 <p><strong>Address:</strong> {store.address}</p>
//                 <p><strong>Owner:</strong> {store.owner_name}</p>
//                 <p><strong>Email:</strong> {store.email}</p>
//                 <p><strong>Average Rating:</strong> {store.averageRating}</p>
//             </div>

//             <div className="rating-section">
//                 <h3>Rate this store:</h3>
//                 {rating ? (
//                     <p className="previous-rating">You previously rated this store: <strong>{userRating.rating}</strong></p>
//                 ) : (
//                     <p>You haven't rated this store yet. You can rate it now.</p>
//                 )}
//                 <div className="rating-input">
//                     <input
//                         type="number"
//                         min="1"
//                         max="5"
//                         value={rating}
//                         onChange={(e) => setRating(parseInt(e.target.value))}
//                     />
//                     <button onClick={handleRatingSubmit}>
//                         {userRating ? "Modify Rating" : "Submit Rating"}
//                     </button>
//                 </div>
//             </div>
//         </div>
//     );
// };

// export default StoreDetails;
//v2
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { submitRating, getAllStores } from "../../api/userApi";
import axios from "axios";
import { useSelector } from "react-redux";
import { Star } from "lucide-react";
import "./styles/StoreDetails.css";

const StoreDetails = () => {
    const { storeId } = useParams();
    const [store, setStore] = useState(null);
    const [rating, setRating] = useState(0);
    const [hoveredRating, setHoveredRating] = useState(0);
    const [userRating, setUserRating] = useState(null);
    const userId = useSelector((state) => state?.auth?.user?.id);

    useEffect(() => {
        fetchStoreDetails();
        checkUserRating();
    }, []);

    const fetchStoreDetails = async () => {
        const stores = await getAllStores();
        const selectedStore = stores.find((store) => store.id === storeId);
        setStore(selectedStore);
    };

    const checkUserRating = async () => {
        try {
            const response = await axios.get(`http://localhost:5000/api/users/ratings/user/${userId}/${storeId}`);
            if (response.data.userRating) {
                setUserRating(response.data.userRating);
                setRating(response.data.userRating.rating);
            }
        } catch (error) {
            console.error("Error fetching user rating:", error);
        }
    };

    const handleRatingSubmit = async () => {
        if (rating < 1 || rating > 5) {
            alert("Please select a rating");
            return;
        }

        const response = await submitRating(userId, storeId, rating);
        if (response) {
            alert("Rating submitted successfully!");
            checkUserRating();
            fetchStoreDetails();
        }
    };

    const handleStarClick = (value) => {
        setRating(value);
    };

    const handleStarHover = (value) => {
        setHoveredRating(value);
    };

    const handleStarLeave = () => {
        setHoveredRating(0);
    };

    if (!store) return <div className="loading">Loading...</div>;

    return (
        <div className="store-details">
            <div className="store-info">
                <h2>{store.name}</h2>
                <p><strong>Address:</strong> {store.address}</p>
                <p><strong>Owner:</strong> {store.owner_name}</p>
                <p><strong>Email:</strong> {store.email}</p>
                <p><strong>Average Rating:</strong> {store.averageRating}</p>
            </div>

            <div className="rating-section">
                <h3>Rate this store</h3>
                
                {userRating && (
                    <div className="previous-rating">
                        <p>You previously rated this store: <strong>{userRating.rating} stars</strong></p>
                    </div>
                )}

                <div className="star-rating" onMouseLeave={handleStarLeave}>
                    {[1, 2, 3, 4, 5].map((value) => (
                        <Star
                            key={value}
                            size={32}
                            className={`star ${
                                value <= (hoveredRating || rating) ? "filled" : ""
                            }`}
                            onClick={() => handleStarClick(value)}
                            onMouseEnter={() => handleStarHover(value)}
                        />
                    ))}
                </div>

                <div className="rating-input">
                    <button onClick={handleRatingSubmit}>
                        {userRating ? "Modify Rating" : "Submit Rating"}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default StoreDetails;