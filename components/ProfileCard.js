"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

export default function ProfileCard() {
  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const [weight, setWeight] = useState("");
  const [height, setHeight] = useState("");
  const [gender, setGender] = useState("");
  const [goal, setGoal] = useState("");
  const [image, setImage] = useState("");
  const [email, setEmail] = useState("");
  const router = useRouter();

  // Load saved profile
  useEffect(() => {
    if (!localStorage.getItem("loggedIn")) {
      router.push("/login");
      return;
    }

    const userEmail = localStorage.getItem("userEmail");
    
    if (!userEmail) {
      router.push("/login");
      return;
    }

    setEmail(userEmail);

    // ✅ Email-based profile key
    const profileKey = `profile_${userEmail}`;
    const savedProfile = localStorage.getItem(profileKey);

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

  // Save profile
  function saveProfile() {
    // ✅ FIXED: Only validate required fields (gender required, image optional)
    if (!email) {
      alert("Email not found! Please login again.");
      return;
    }

    if (!gender) {
      alert("Please select gender");
      return;
    }

    const profileData = {
      email: email,
      name,
      age: age ? parseInt(age) : 0,
      weight: weight ? parseFloat(weight) : 0,
      height: height ? parseFloat(height) : 0,
      gender,
      goal,
      // ✅ FIXED: Allow null/empty image
      profile_image: image || null
    };

    // ✅ FIXED: Use email-based key
    const profileKey = `profile_${email}`;
    localStorage.setItem(profileKey, JSON.stringify(profileData));

    alert("Profile Saved Successfully 🚀");
  }

  return (
    <div className="bg-white p-10 rounded-2xl shadow-lg mt-10 max-w-2xl">
      <h2 className="text-3xl font-bold mb-8">
        User Profile
        {email && <span className="text-sm text-gray-500 ml-2">({email})</span>}
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

      {/* Gender */}
      <select
        value={gender}
        onChange={(e) => setGender(e.target.value)}
        className="w-full border p-4 rounded-lg mb-5 outline-none focus:ring-2 focus:ring-black"
      >
        <option value="">Select Gender</option>
        <option value="Male">Male</option>
        <option value="Female">Female</option>
      </select>

      {/* Goal */}
      <input
        type="text"
        placeholder="Goal (Fat Loss / Muscle Gain)"
        value={goal}
        onChange={(e) => setGoal(e.target.value)}
        className="w-full border p-4 rounded-lg mb-5 outline-none focus:ring-2 focus:ring-black"
      />

      {/* Image (Optional) */}
      <input
        type="text"
        placeholder="Profile Image URL (Optional)"
        value={image}
        onChange={(e) => setImage(e.target.value)}
        className="w-full border p-4 rounded-lg mb-5 outline-none focus:ring-2 focus:ring-black"
      />

      {/* Save Button */}
      <button
        onClick={saveProfile}
        className="bg-black text-white px-8 py-3 rounded-lg hover:bg-gray-800 transition"
      >
        Save Profile (Photo Optional)
      </button>
    </div>
  );
}