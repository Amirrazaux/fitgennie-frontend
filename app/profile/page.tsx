"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

export default function ProfilePage() {
  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const [weight, setWeight] = useState("");
  const [height, setHeight] = useState("");
  const [gender, setGender] = useState("");
  const [goal, setGoal] = useState("");
  const [image, setImage] = useState("");
  const router = useRouter();
  const [isEditing, setIsEditing] = useState(false);
  const [email, setEmail] = useState("");

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
    } else {
      const defaultProfile = {
        email: userEmail,
        name: "",
        age: "",
        weight: "",
        height: "",
        gender: "",
        goal: "",
        profile_image: ""
      };

      localStorage.setItem(profileKey, JSON.stringify(defaultProfile));
    }
  }, []);

  async function saveProfile() {
    if (!email) {
      alert("Email not found! Please login again.");
      return;
    }

    if (!name || name.trim() === "") {
      alert("Please enter your name");
      return;
    }

    if (!age || age === "") {
      alert("Please enter your age");
      return;
    }

    if (!weight || weight === "") {
      alert("Please enter your weight");
      return;
    }

    if (!height || height === "") {
      alert("Please enter your height");
      return;
    }

    if (!gender) {
      alert("Please select gender");
      return;
    }

    if (!goal || goal.trim() === "") {
      alert("Please enter your fitness goal");
      return;
    }

    const payload = {
      email: email,
      name: name.trim(),
      age: parseInt(age),
      weight: parseFloat(weight),
      height: parseFloat(height),
      gender,
      goal: goal.trim(),
      // ✅ Image is OPTIONAL (can be null/empty)
      profile_image: image || null
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

      const profileKey = `profile_${email}`;
      localStorage.setItem(profileKey, JSON.stringify({
        email: email,
        name: name.trim(),
        age: parseInt(age),
        weight: parseFloat(weight),
        height: parseFloat(height),
        gender,
        goal: goal.trim(),
        profile_image: image || null
      }));
    } catch (error) {
      console.error(error);
      alert("Profile Save Error");
    }
  }

  function removeProfilePicture() {
    setImage("");
    alert("✅ Profile picture removed!");
  }

  return (
    <div className="relative min-h-screen overflow-hidden bg-slate-950 px-4 py-6 md:px-8 md:py-10">
      <div className="absolute inset-0">
        <div className="absolute -top-24 -left-24 h-72 w-72 rounded-full bg-blue-600/20 blur-3xl" />
        <div className="absolute top-1/3 -right-24 h-80 w-80 rounded-full bg-purple-600/20 blur-3xl" />
        <div className="absolute bottom-0 left-1/3 h-72 w-72 rounded-full bg-cyan-500/10 blur-3xl" />
      </div>

      <div className="relative mx-auto max-w-6xl">
        <div className="overflow-hidden rounded-[2rem] border border-white/10 bg-white/5 shadow-2xl backdrop-blur-xl">
          <div className="relative h-56 bg-gradient-to-r from-blue-600 via-purple-600 to-cyan-500">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(255,255,255,0.35),transparent_30%),radial-gradient(circle_at_left,rgba(255,255,255,0.18),transparent_28%)]" />
            <div className="absolute inset-0 bg-black/10" />

            <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-slate-950/70 to-transparent" />
            <div className="absolute bottom-6 left-6 md:bottom-8 md:left-8">
              <div className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/15 px-3 py-1 text-xs font-medium text-white/90 backdrop-blur-md">
                <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
                Profile Settings
              </div>
            </div>
          </div>

          <div className="relative -mt-16 px-5 pb-8 md:px-8">
            <div className="rounded-[2rem] border border-white/10 bg-slate-900/85 p-6 shadow-xl backdrop-blur-xl md:p-8">
              <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
                <div className="flex items-center gap-5">
                  <div className="relative shrink-0">
                    {image ? (
                      <>
                        <img
                          src={image}
                          alt="Profile"
                          className="h-28 w-28 rounded-full border-4 border-slate-900 object-cover shadow-lg ring-4 ring-white/10 md:h-32 md:w-32"
                        />
                        <button
                          onClick={removeProfilePicture}
                          className="absolute bottom-1 right-1 flex h-10 w-10 items-center justify-center rounded-full border border-white/20 bg-red-600 text-sm shadow-lg transition hover:scale-110 hover:bg-red-700"
                        >
                          🗑️
                        </button>
                      </>
                    ) : (
                      <div className="flex h-28 w-28 items-center justify-center rounded-full border-4 border-slate-900 bg-gradient-to-br from-blue-500 to-cyan-500 text-5xl font-bold text-white shadow-lg ring-4 ring-white/10 md:h-32 md:w-32">
                        {name?.charAt(0) || "U"}
                      </div>
                    )}

                    {isEditing && (
                      <label
                        htmlFor="profileImage"
                        className="absolute bottom-1 right-1 flex h-10 w-10 cursor-pointer items-center justify-center rounded-full border border-white/20 bg-blue-600 text-sm shadow-lg transition hover:scale-110 hover:bg-blue-700"
                      >
                        📷
                      </label>
                    )}

                    <input
                      id="profileImage"
                      type="file"
                      accept="image/*"
                      onChange={handleImage}
                      className="hidden"
                    />
                  </div>

                  <div>
                    <div className="inline-flex items-center gap-2 rounded-full border border-cyan-400/20 bg-cyan-400/10 px-3 py-1 text-cyan-300 text-sm">
                      <span className="h-2 w-2 rounded-full bg-cyan-400" />
                      AI Powered Fitness Profile
                    </div>

                    <h1 className="mt-3 text-3xl font-extrabold tracking-tight text-white md:text-5xl">
                      {name || "FitGennie User"}
                    </h1>

                    <p className="mt-2 max-w-xl text-sm leading-6 text-slate-400 md:text-base">
                      Track your body stats, update your goal, and keep your fitness profile ready for your dashboard.
                      {email && <span className="block text-xs mt-1 text-slate-500">Email: {email}</span>}
                    </p>
                  </div>
                </div>

                <div className="flex flex-wrap gap-3 lg:justify-end">
                  <button
                    onClick={() => setIsEditing(!isEditing)}
                    className="rounded-xl border border-white/10 bg-violet-600 hover:bg-violet-500 px-5 py-3 font-semibold text-white transition duration-300 hover:scale-[1.02] hover:border-white/20"
                  >
                    {isEditing ? "Cancel" : "Edit Profile"}
                  </button>

                  <button
                    onClick={() => router.push("/dashboard")}
                    className="rounded-xl bg-red-500/90 px-5 py-3 font-semibold text-white shadow-lg shadow-red-500/20 transition duration-300 hover:scale-[1.02] hover:bg-red-500"
                  >
                    Close
                  </button>
                </div>
              </div>

              <div className="mt-8 grid grid-cols-2 gap-4 lg:grid-cols-4">
                <div className="rounded-2xl border border-white/10 bg-gradient-to-br from-white/8 to-white/4 p-4">
                  <p className="text-xs uppercase tracking-wider text-slate-400">Age</p>
                  <h2 className="mt-2 text-2xl font-bold text-white">{age || "--"}</h2>
                </div>

                <div className="rounded-2xl border border-white/10 bg-gradient-to-br from-white/8 to-white/4 p-4">
                  <p className="text-xs uppercase tracking-wider text-slate-400">Weight</p>
                  <h2 className="mt-2 text-2xl font-bold text-white">{weight || "--"} kg</h2>
                </div>

                <div className="rounded-2xl border border-white/10 bg-gradient-to-br from-white/8 to-white/4 p-4">
                  <p className="text-xs uppercase tracking-wider text-slate-400">Height</p>
                  <h2 className="mt-2 text-2xl font-bold text-white">{height || "--"} cm</h2>
                </div>

                <div className="rounded-2xl border border-white/10 bg-gradient-to-br from-white/8 to-white/4 p-4">
                  <p className="text-xs uppercase tracking-wider text-slate-400">Goal</p>
                  <h2 className="mt-2 text-lg font-bold text-white">{goal || "--"}</h2>
                </div>
              </div>

              <div className="mt-8 grid gap-5 md:grid-cols-2">
                <input
                  type="text"
                  placeholder="Full Name *"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  disabled={!isEditing}
                  className="w-full rounded-xl border border-white/10 bg-slate-800/80 px-4 py-4 text-white placeholder:text-slate-500 outline-none transition focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/20 disabled:cursor-not-allowed disabled:opacity-50"
                />

                <input
                  type="number"
                  placeholder="Age *"
                  value={age}
                  onChange={(e) => setAge(e.target.value)}
                  disabled={!isEditing}
                  className="w-full rounded-xl border border-white/10 bg-slate-800/80 px-4 py-4 text-white placeholder:text-slate-500 outline-none transition focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/20 disabled:cursor-not-allowed disabled:opacity-50"
                />

                <input
                  type="number"
                  placeholder="Weight (kg) *"
                  value={weight}
                  onChange={(e) => setWeight(e.target.value)}
                  disabled={!isEditing}
                  className="w-full rounded-xl border border-white/10 bg-slate-800/80 px-4 py-4 text-white placeholder:text-slate-500 outline-none transition focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/20 disabled:cursor-not-allowed disabled:opacity-50"
                />

                <input
                  type="number"
                  placeholder="Height (cm) *"
                  value={height}
                  onChange={(e) => setHeight(e.target.value)}
                  disabled={!isEditing}
                  className="w-full rounded-xl border border-white/10 bg-slate-800/80 px-4 py-4 text-white placeholder:text-slate-500 outline-none transition focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/20 disabled:cursor-not-allowed disabled:opacity-50"
                />

                <select
                  value={gender}
                  onChange={(e) => setGender(e.target.value)}
                  disabled={!isEditing}
                  className="w-full rounded-xl border border-white/10 bg-slate-800/80 px-4 py-4 text-white outline-none transition focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/20 disabled:cursor-not-allowed disabled:opacity-50"
                >
                  <option value="">Select Gender *</option>
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                </select>

                <select
                  value={goal}
                  onChange={(e) => setGoal(e.target.value)}
                  disabled={!isEditing}
                  className="w-full rounded-xl border border-white/10 bg-slate-800/80 px-4 py-4 text-white outline-none transition focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/20 disabled:cursor-not-allowed disabled:opacity-50"
                >
                  <option value="">Select Goal *</option>
                  <option value="Fat Loss">Fat Loss</option>
                  <option value="Muscle Gain">Muscle Gain</option>
                  <option value="Maintenance">Maintenance</option>
                  <option value="Weight Gain">Weight Gain</option>
                  <option value="Lean Bulk">Lean Bulk</option>
                </select>

                {/* ✅ Image is OPTIONAL - No asterisk */}
                
              </div>

              {isEditing && (
                <button
                  onClick={saveProfile}
                  className="mt-8 w-full rounded-xl bg-gradient-to-r from-blue-600 to-purple-600 py-4 text-lg font-semibold text-white shadow-lg shadow-blue-500/20 transition hover:opacity-95 hover:scale-[1.01]"
                >
                  ✅ Save Profile (Photo Optional)
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}