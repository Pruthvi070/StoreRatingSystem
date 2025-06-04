export const loginUser = async (email, password) => {
    const response = await fetch("http://localhost:5000/api/users/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });
    return response.json();
  };
  
//   export const signupUser = async (name, email, password,address) => {
//     await fetch("http://localhost:5000/api/users/signup", {
//       method: "POST",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify({ name, email, password ,address}),
//     }).then((res)=>{
//         console.log("res",res.json());
//         return res.json();
//     }).catch((err)=>{
//         console.log(err);
//     })
    
//   };
export const signupUser = async (name, email, password, address) => {
    try {
        const res = await fetch("http://localhost:5000/api/users/signup", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ name, email, password, address }),
        });

        const data = await res.json(); // Read response body once

        if (!res.ok) {
            throw new Error(data.message || "Signup failed");
        }

        console.log("res", data.user);
        return data;  // Return the parsed JSON response
    } catch (err) {
        console.error("Signup error:", err);
        throw err;  // Re-throw for handling in the calling function
    }
};
