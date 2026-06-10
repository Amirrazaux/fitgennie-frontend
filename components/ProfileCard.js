"use client";

import { useState, useEffect } from "react";

export default function ProfileCard() {

    const [name, setName] = useState("");
    const [age, setAge] = useState("");
    const [weight, setWeight] = useState("");
    const [height, setHeight] = useState("");
    const [goal, setGoal] = useState("");

    // Load saved profile

    useEffect(() => {

        const savedProfile = localStorage.getItem("profile");

        if (savedProfile) {

            const data = JSON.parse(savedProfile);

            setName(data.name || "");
            setAge(data.age || "");
            setWeight(data.weight || "");
            setHeight(data.height || "");
            setGoal(data.goal || "");
        }

    }, []);

    // Save profile

    function saveProfile() {

        const profileData = {

            name,
            age,
            weight,
            height,
            goal,
            gender

        };

        localStorage.setItem(
            "profile",
            JSON.stringify(profileData)
        );

        alert("Profile Saved Successfully 🚀");
    }

    return (

        <div className="bg-white p-10 rounded-2xl shadow-lg mt-10 max-w-2xl">

            <h2 className="text-3xl font-bold mb-8">
                User Profile
            </h2>

            {/* Name */}

            <input
                type="text"
                placeholder="Enter Your Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full border p-4 rounded-lg mb-5 outline-none focus:ring-2 focus:ring-black"
            />

            {/* Age */}

            <input
                type="number"
                placeholder="Enter Age"
                value={age}
                onChange={(e) => setAge(e.target.value)}
                className="w-full border p-4 rounded-lg mb-5 outline-none focus:ring-2 focus:ring-black"
            />

            {/* Weight */}

            <input
                type="number"
                placeholder="Enter Weight (kg)"
                value={weight}
                onChange={(e) => setWeight(e.target.value)}
                className="w-full border p-4 rounded-lg mb-5 outline-none focus:ring-2 focus:ring-black"
            />

            {/* Height */}

            <input
                type="number"
                placeholder="Enter Height (cm)"
                value={height}
                onChange={(e) => setHeight(e.target.value)}
                className="w-full border p-4 rounded-lg mb-5 outline-none focus:ring-2 focus:ring-black"
            />

            {/* Goal */}

            <input
                type="text"
                placeholder="Goal (Fat Loss / Muscle Gain)"
                value={goal}
                onChange={(e) => setGoal(e.target.value)}
                className="w-full border p-4 rounded-lg mb-5 outline-none focus:ring-2 focus:ring-black"
            />

            {/* Save Button */}

            <button
                onClick={saveProfile}
                className="bg-black text-white px-8 py-3 rounded-lg hover:bg-gray-800 transition"
            >
                Save Profile
            </button>

        </div>
    );
}