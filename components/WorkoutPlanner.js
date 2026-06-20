"use client";

import React, { useState } from "react";

// import Sidebar from "../components/Sidebar1";

export default function WorkoutPlannerPage() {

    const [goal, setGoal] = useState("");

    const [result, setResult] = useState("");

    const [loading, setLoading]= useState(false)

    async function generateWorkout() {

        try {
            setLoading(true)
            let response = await fetch(
                `${process.env.NEXT_PUBLIC_API_URL}/workout-plan`,
                {
                    method: "POST",

                    headers: {
                        "Content-Type":
                        "application/json"
                    },

                    body: JSON.stringify({

                        goal: goal
                    })
                }
            );

            let data = await response.json();
            setLoading(false)
            setResult(data.result);

        } catch (error) {
            setLoading(false)
            alert("Workout Planner Error");
        }
    }

    return (

    <div className="bg-slate-900/60 backdrop-blur-lg border border-slate-700 p-6 rounded-3xl shadow-xl">

        {/* HEADER */}

        <div className="mb-6">

            <h1 className="text-2xl font-bold text-white">

                💪 AI Workout Planner

            </h1>

            <p className="text-slate-400 mt-2">

                Generate a personalized workout plan based on your goal

            </p>

        </div>

        {/* GOAL SELECT */}

        <select
            value={goal}
            onChange={(e) => setGoal(e.target.value)}
            className="w-full bg-slate-800 border border-slate-700 text-white p-4 rounded-xl outline-none focus:border-blue-500"
        >

            <option value="">
                Select Goal
            </option>

            <option value="Fat Loss">
                Fat Loss
            </option>

            <option value="Muscle Gain">
                Muscle Gain
            </option>

            <option value="Maintenance">
                Maintenance
            </option>

            <option value="Lean Bulk">
                Lean Bulk
            </option>

        </select>

        {/* BUTTON */}

        <button
            onClick={generateWorkout}
            className="mt-5 bg-purple-600 hover:bg-purple-700 px-8 py-3 rounded-xl text-white font-semibold transition-all"
        >
            Generate Plan
        </button>

        {/* RESULT */}

        <div className="mt-6">

            {loading && (

                <div className="bg-slate-800 border border-slate-700 text-white p-4 rounded-2xl w-fit">

                    🧠 AI is generating your workout...

                </div>

            )}

            {!loading && result && (

                <div className="bg-slate-950 border border-slate-700 text-slate-200 p-5 rounded-2xl whitespace-pre-line leading-7">

                    {result}

                </div>

            )}

        </div>

    </div>

);
}