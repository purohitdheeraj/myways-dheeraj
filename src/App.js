import React, { useState, useEffect } from "react";
import "./styles.css";

export default function App() {
  const [userData, setUserData] = useState({
    name: "",
    email: "",
    phone: ""
  });
  const [userStatus, setUserStatus] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData((prevData) => {
      return {
        ...prevData,
        [name]: value
      };
    });
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    // console.log(userData);

    try {
      const checkEmail = await fetch(
        `https://test-api-v3.myways.ai/user?email=${userData.email}`
      );
      const parseResponse = await checkEmail.json();
      console.log(parseResponse);

      if (parseResponse.error === "User Not Found") {
        setUserStatus(false);

        const reqBody = {
          method: "Post",
          body: JSON.stringify(userData)
        };

        fetch(`https://test-api-v3.myways.ai/user`, reqBody)
          .then((data) => data.json())
          .then((res) => setUserStatus(true))
          .catch((err) => setUserStatus(false));

        setUserData({
          name: "",
          email: "",
          phone: ""
        });

        window.alert("user created successfully");
      } else {
        window.alert("user found");
        setUserStatus(true);
      }
    } catch (error) {
      console.log("error", error);
    }
  };

  return (
    <div className="App">
      <form onSubmit={submitHandler}>
        Username:
        <input
          onChange={handleChange}
          type="text"
          name="name"
          required
          aria-label="name"
        />
        <div></div>
        Email:
        <input
          onChange={handleChange}
          type="email"
          name="email"
          required
          aria-label="email"
        />
        <div></div>
        Phone:
        <input
          onChange={handleChange}
          type="number"
          name="phone"
          required
          aria-label="phone"
        />
        <div></div>
        <button>Submit Form</button>
      </form>
    </div>
  );
}
