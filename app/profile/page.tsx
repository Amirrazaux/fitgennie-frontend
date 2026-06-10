"use client";

import React, { useState, useEffect } from "react";

export default function ProfilePage() {
  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const [weight, setWeight] = useState("");
  const [height, setHeight] = useState("");
  const [gender, setGender] = useState("");
  const [goal, setGoal] = useState("");
  const [image, setImage] = useState("");

  function handleImage(event: React.ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = () => {
      setImage(reader.result as string);
    };
    reader.readAsDataURL(file);
  }

  useEffect(() => {
    const savedProfile = localStorage.getItem("profile");
    if (savedProfile) {
      const data = JSON.parse(savedProfile);
      setName(data.name || "");
      setAge(data.age || "");
      setWeight(data.weight || "");
      setHeight(data.height || "");
      setGender(data.gender || "");
      setGoal(data.goal || "");
      setImage(data.profile_image || "");
    }
  }, []);

  async function saveProfile() {
    const email = localStorage.getItem("userEmail");

    // Validation
    if (!email) {
      alert("Email not found! Please login again.");
      return;
    }
    if (!gender) {
      alert("Please select gender");
      return;
    }

    const payload = {
      email: email,
      name: name || "",
      age: age ? parseInt(age) : 0,
      weight: weight ? parseFloat(weight) : 0,
      height: height ? parseFloat(height) : 0,
      gender: gender,
      goal: goal || "",
      profile_image: image || null, // null if empty
    };

    console.log("Sending payload:", payload);

    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/save-profile`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      const responseText = await response.text();
      console.log("Response:", response.status, responseText);

      if (!response.ok) {
        try {
          const errorData = JSON.parse(responseText);
          alert("Error: " + JSON.stringify(errorData.detail));
        } catch {
          alert("Error: " + responseText);
        }
        return;
      }

      const data = JSON.parse(responseText);
      alert(data.message);

      localStorage.setItem("profile", JSON.stringify({
        name, age, weight, height, gender, goal, profile_image: image
      }));
    } catch (error) {
      console.error(error);
      alert("Profile Save Error");
    }
  }

  return (

<div className="min-h-screen bg-slate-950 p-8">

    <div className="max-w-5xl mx-auto bg-slate-900 border border-slate-800 rounded-3xl shadow-2xl overflow-hidden">

        {/* TOP BANNER */}

        <div className="h-40 bg-gradient-to-r from-blue-600 via-purple-600 to-cyan-500"></div>

        {/* PROFILE */}

        <div className="px-8 pb-8">

            <div className="flex flex-col md:flex-row md:justify-between md:items-end -mt-16">

                <div className="flex items-center gap-5">

                    <div className="relative">

                        {image ? (

                            <img
                                src={image}
                                alt="Profile"
                                className="w-32 h-32 rounded-full border-4 border-slate-900 object-cover"
                            />

                        ) : (

                            <div className="w-32 h-32 rounded-full bg-blue-600 flex items-center justify-center text-5xl font-bold text-white border-4 border-slate-900">

                                {name?.charAt(0) || "U"}

                            </div>

                        )}

                        <label
                            htmlFor="profileImage"
                            className="absolute bottom-1 right-1 bg-blue-600 hover:bg-blue-700 p-2 rounded-full cursor-pointer"
                        >
                            📷
                        </label>

                        <input
                            id="profileImage"
                            type="file"
                            accept="image/*"
                            onChange={handleImage}
                            className="hidden"
                        />

                    </div>

                    <div>

                        <h1 className="text-4xl font-bold text-white">

                            {name || "FitGenie User"}

                        </h1>

                        <p className="text-slate-400 mt-2">

                            AI Powered Fitness Profile

                        </p>

                    </div>

                </div>

            </div>

            {/* STATS */}

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8">

                <div className="bg-slate-800 p-4 rounded-2xl">

                    <p className="text-slate-400">Age</p>

                    <h2 className="text-white text-2xl font-bold">

                        {age || "--"}

                    </h2>

                </div>

                <div className="bg-slate-800 p-4 rounded-2xl">

                    <p className="text-slate-400">Weight</p>

                    <h2 className="text-white text-2xl font-bold">

                        {weight || "--"} kg

                    </h2>

                </div>

                <div className="bg-slate-800 p-4 rounded-2xl">

                    <p className="text-slate-400">Height</p>

                    <h2 className="text-white text-2xl font-bold">

                        {height || "--"} cm

                    </h2>

                </div>

                <div className="bg-slate-800 p-4 rounded-2xl">

                    <p className="text-slate-400">Goal</p>

                    <h2 className="text-white text-xl font-bold">

                        {goal || "--"}

                    </h2>

                </div>

            </div>

            {/* FORM */}

            <div className="grid md:grid-cols-2 gap-5 mt-8">

                <input
                    type="text"
                    placeholder="Full Name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="bg-slate-800 text-white p-4 rounded-xl border border-slate-700"
                />

                <input
                    type="number"
                    placeholder="Age"
                    value={age}
                    onChange={(e) => setAge(e.target.value)}
                    className="bg-slate-800 text-white p-4 rounded-xl border border-slate-700"
                />

                <input
                    type="number"
                    placeholder="Weight (kg)"
                    value={weight}
                    onChange={(e) => setWeight(e.target.value)}
                    className="bg-slate-800 text-white p-4 rounded-xl border border-slate-700"
                />

                <input
                    type="number"
                    placeholder="Height (cm)"
                    value={height}
                    onChange={(e) => setHeight(e.target.value)}
                    className="bg-slate-800 text-white p-4 rounded-xl border border-slate-700"
                />

                <select
                    value={gender}
                    onChange={(e) => setGender(e.target.value)}
                    className="bg-slate-800 text-white p-4 rounded-xl border border-slate-700"
                >
                    <option value="">Select Gender</option>
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                </select>

                <select
                    value={goal}
                    onChange={(e) => setGoal(e.target.value)}
                    className="bg-slate-800 text-white p-4 rounded-xl border border-slate-700"
                >
                    <option value="">Select Goal</option>
                    <option value="Fat Loss">Fat Loss</option>
                    <option value="Muscle Gain">Muscle Gain</option>
                    <option value="Maintenance">Maintenance</option>
                    <option value="Weight Gain">Weight Gain</option>
                    <option value="Lean Bulk">Lean Bulk</option>
                </select>

            </div>

            <button
                onClick={saveProfile}
                className="w-full mt-8 bg-gradient-to-r from-blue-600 to-purple-600 text-white py-4 rounded-xl text-lg font-semibold hover:opacity-90 transition"
            >
                Save Profile
            </button>

        </div>

    </div>

</div>

);
}