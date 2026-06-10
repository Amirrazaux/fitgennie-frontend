"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Sidebar from "../../components/Sidebar1";
import ChatBox from "../../components/ChatBox1";
import FoodInput from "../../components/FoodInput";
import MaintenanceCalculator from "../../components/MaintenanceCalculator";
import WorkoutPlanner from "../../components/WorkoutPlanner";
import CalorieCard from "../../components/CalorieCard";
import ProteinCard from "../../components/ProteinCard";
import WorkoutCard from "../../components/WorkoutCard";

export default function Dashboard() {
    const router = useRouter();
    const [name, setName] = useState("User");
    const [calories, setCalories] = useState(2200);
    const [protein, setProtein] = useState(120);
    const [workout, setWorkout] = useState("Pushups 10 X 3\nSquats 12 X 3\nRunning 10 Mins");

    // PROFILE STATE
    const [profile, setProfile] = useState({
        goal: "",
        weight: "",
        streak: 1,
        profile_image: ""
    });

    // =========================
    // LOAD PROFILE
    // =========================
    async function loadProfile() {
        try {
            const email = localStorage.getItem("userEmail");

            if (!email) return;

            let response = await fetch(`https://fitgennie.onrender.com/get-profile/${email}`);
            let data = await response.json();

            setProfile({
                goal: data.goal || "",
                weight: data.weight || "",
                streak: data.streak || 1,
                profile_image: data.profile_image || ""
            });
        } catch (error) {
            console.log(error);
        }
    }

    // =========================
    // USE EFFECT
    // =========================
    useEffect(() => {
        loadProfile();

        let loggedIn = localStorage.getItem("loggedIn");
        if (!loggedIn) {
            router.push("/login");
        }

        let savedProfile = localStorage.getItem("profile");
        if (savedProfile) {
            let data = JSON.parse(savedProfile);
            setName(data.name || "User");
        }
    }, []);

    return (
    <div className="flex min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-800 text-white">

        <Sidebar />

        <div className="flex-1 p-4 sm:p-6 lg:p-8 lg:ml-64 overflow-x-hidden">

            {/* HEADER */}

            <div className="flex items-center justify-between mb-10">
                

                <div className="flex flex-col md:flex-row items-center gap-5">
                    {profile?.profile_image ? (

                        <img
                            src={profile.profile_image}
                            alt="Profile"
                            className="w-24 h-24 rounded-full object-cover border-4 border-blue-500 shadow-lg"
                        />

                    ) : (

                        <div className="w-24 h-24 rounded-full bg-gradient-to-r from-blue-500 to-cyan-400 text-white flex items-center justify-center text-4xl font-bold shadow-lg">

                            {name?.charAt(0)}
                            

                        </div>
                        

                    )}
                    

                    <div>

                        <h1 className="text-3xl md:text-5xl font-bold text-center md:text-left">
                            Welcome Back 
                        </h1>

                        <p className="text-slate-400 mt-2 text-lg">
                            {name}'s AI Fitness Dashboard
                        </p>

                    </div>
                    

                </div>
                <div className="bg-green-500/20 border border-green-500/ px-4 py-2 rounded-full text-green-400 text-sm font-semibold">
                🤖AI Online</div>

            </div>

            {/* DYNAMIC CARDS */}

            <div
                id="workout-section"
                className="grid grid-cols-1 md:grid-cols-3 gap-5"
            >

                <CalorieCard calories={calories} />

                <ProteinCard protein={protein} />

                <WorkoutCard workout={workout} />

            </div>

            {/* PROFILE CARDS */}

            <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mt-8">

                <div className="bg-slate-900/60 backdrop-blur-lg border border-slate-700 p-6 rounded-3xl shadow-lg hover:scale-105 hover:border-blue-500 transition-all duration-300">

                    <h2 className="text-slate-400 text-lg">
                        🎯 Goal
                    </h2>

                    <p className="text-4xl font-bold mt-3">
                        {profile.goal || "Not Set"}
                    </p>

                </div>

                <div className="bg-slate-900/60 backdrop-blur-lg border border-slate-700 p-6 rounded-3xl shadow-lg hover:scale-105 hover:border-blue-500 transition-all duration-300">

                    <h2 className="text-slate-400 text-lg">
                        ⚖ Weight
                    </h2>

                    <p className="text-4xl font-bold mt-3">
                        {profile.weight || 0} kg
                    </p>

                </div>

                <div className="bg-slate-900/60 backdrop-blur-lg border border-slate-700 p-6 rounded-3xl shadow-lg hover:scale-105 hover:border-blue-500 transition-all duration-300">

                    <h2 className="text-slate-400 text-lg">
                        🔥 Fitness Streak
                    </h2>

                    <p className="text-5xl font-bold mt-3">
                        {profile.streak || 1}
                    </p>

                    <p className="text-slate-400 mt-2">
                        Keep the momentum going 🚀
                    </p>

                </div>

            </div>

            {/* CHAT */}

            <div
                id="chat-section"
                className="mt-10"
            >
                <ChatBox />

            </div>

            {/* FOOD */}

            <div
                id="food-section"
                className="mt-10"
            >
                <FoodInput />

            </div>

            {/* MAINTENANCE */}

            <div
                id="maintenance-section"
                className="mt-10"
            >
            <MaintenanceCalculator
                    setCalories={setCalories}
                    setProtein={setProtein}
                    setWorkout={setWorkout}
                />

            </div>

            {/* WORKOUT */}

            <div
                id="workout-planner-section"
                className="mt-10"
            >

                <WorkoutPlanner />

            </div>

        </div>

    </div>
);
}