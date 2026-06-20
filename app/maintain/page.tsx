"use client";

import { useEffect, useState } from "react";
import Sidebar from "../../components/Sidebar1";
import MaintenanceCalculator from "../../components/MaintenanceCalculator";

export default function MaintenancePage() {
    const [calories, setCalories] = useState(2200);
    const [protein, setProtein] = useState(120);
    const [workout, setWorkout] = useState(
        "Pushups 10 X 3\nSquats 12 X 3\nRunning 10 Mins"
    );

    useEffect(() => {
        const userEmail = localStorage.getItem("userEmail");

        if (!userEmail) return;

        const dashboardKey = `dashboard_${userEmail}`;

        const savedData = localStorage.getItem(dashboardKey);

        if (savedData) {
            const data = JSON.parse(savedData);

            setCalories(data.calories || 2200);
            setProtein(data.protein || 120);
            setWorkout(
                data.workout ||
                    "Pushups 10 X 3\nSquats 12 X 3\nRunning 10 Mins"
            );
        }
        console.log(calories)
    }, []);

    return (
        <div className="flex min-h-screen bg-slate-900 text-white">
            <Sidebar />

            <div className="flex-1 md:ml-64 p-6 space-y-6">

                {/* HERO SECTION */}
                <div className="bg-gradient-to-r from-orange-900/40 to-slate-900 border border-slate-700 rounded-3xl p-8">
                    <h1 className="text-4xl font-bold mb-3">
                        🔥 Maintenance Calculator
                    </h1>
                    <p className="text-slate-300 max-w-2xl">
                        Calculate your daily calorie maintenance, protein requirements
                        and AI-generated workout plan based on your body goals.
                    </p>

                    <div className="flex flex-wrap gap-3 mt-5">
                        <span className="px-3 py-1 bg-orange-500/10 border border-orange-500/30 rounded-full text-sm">
                            ⚡ Calorie Estimation
                        </span>
                        <span className="px-3 py-1 bg-green-500/10 border border-green-500/30 rounded-full text-sm">
                            💪 Protein Goal
                        </span>
                        <span className="px-3 py-1 bg-blue-500/10 border border-blue-500/30 rounded-full text-sm">
                            🏋️ Workout Plan
                        </span>
                    </div>
                </div>

                {/* FEATURE CARDS */}
                <div className="grid md:grid-cols-3 gap-5">

                    <div className="bg-slate-800/60 border border-slate-700 rounded-2xl p-5 hover:scale-[1.02] transition">
                        <h2 className="text-lg font-semibold mb-2">
                            🔥 Maintenance Calories
                        </h2>
                        <p className="text-slate-400 text-sm">
                            Find exact calories needed to maintain your current body weight.
                        </p>
                    </div>

                    <div className="bg-slate-800/60 border border-slate-700 rounded-2xl p-5 hover:scale-[1.02] transition">
                        <h2 className="text-lg font-semibold mb-2">
                            💪 Protein Optimization
                        </h2>
                        <p className="text-slate-400 text-sm">
                            Get daily protein target based on your fitness goal.
                        </p>
                    </div>

                    <div className="bg-slate-800/60 border border-slate-700 rounded-2xl p-5 hover:scale-[1.02] transition">
                        <h2 className="text-lg font-semibold mb-2">
                            🏋️ AI Workout Suggestion
                        </h2>
                        <p className="text-slate-400 text-sm">
                            Auto-generated workout routine based on your calorie goal.
                        </p>
                    </div>

                </div>

                
            {/* MAIN COMPONENT */}
                <div className="bg-slate-900/60 border border-slate-700 rounded-3xl p-6">
                    <MaintenanceCalculator
                        calories={calories}
                        protein={protein}
                        workout={workout}
                        setCalories={setCalories}
                        setProtein={setProtein}
                        setWorkout={setWorkout}
                    />
                </div>
            </div>
        </div>
    );
}