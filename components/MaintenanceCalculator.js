"use client";

import { useState } from "react";

export default function MaintenanceCalculator({

    setCalories,
    setProtein,
    setWorkout

}) {

    const [weight, setWeight] = useState("");
    const [height, setHeight] = useState("");
    const [age, setAge] = useState("");
    const [goal, setGoal] = useState("");
    const [loading, setLoading]= useState(false)

    const [result, setResult] = useState("");

    async function calculateCalories() {

        try {
            setLoading(true)
            let response = await fetch(
                `${process.env.NEXT_PUBLIC_API_URL}/maintenance-calories`,
                {
                    method: "POST",

                    headers: {
                        "Content-Type": "application/json"
                    },

                    body: JSON.stringify({
                        name: "User",
                        weight,
                        height,
                        age,
                        goal
                    })
                }
            );

            let data = await response.json();

            setLoading(false)

            setResult(data.reply);

            // Dynamic cards update

            setCalories(data.calories);

            setProtein(data.protein);

            setWorkout(data.workout);

            
        } catch (error) {
            setLoading(false)
            setResult("Backend Error");
        }
    }

    return (

    <div className="bg-slate-900/60 backdrop-blur-lg border border-slate-700 p-6 rounded-3xl shadow-xl">

        {/* HEADER */}

        <div className="mb-6">

            <h2 className="text-2xl font-bold text-white">

                🔥 AI Maintenance Calculator

            </h2>

            <p className="text-slate-400 mt-2">

                Calculate calories, protein and workout recommendations

            </p>

        </div>

        {/* INPUTS */}

        <div className="grid md:grid-cols-2 gap-4">

            <input
                type="text"
                placeholder="Weight (kg)"
                className="bg-slate-800 border border-slate-700 text-white p-4 rounded-xl outline-none focus:border-blue-500"
                onChange={(e) => setWeight(e.target.value)}
            />

            <input
                type="text"
                placeholder="Height (cm)"
                className="bg-slate-800 border border-slate-700 text-white p-4 rounded-xl outline-none focus:border-blue-500"
                onChange={(e) => setHeight(e.target.value)}
            />

            <input
                type="text"
                placeholder="Age"
                className="bg-slate-800 border border-slate-700 text-white p-4 rounded-xl outline-none focus:border-blue-500"
                onChange={(e) => setAge(e.target.value)}
            />

            <input
                type="text"
                placeholder="Goal (Fat Loss / Muscle Gain)"
                className="bg-slate-800 border border-slate-700 text-white p-4 rounded-xl outline-none focus:border-blue-500"
                onChange={(e) => setGoal(e.target.value)}
            />

        </div>

        {/* BUTTON */}

        <button
            onClick={calculateCalories}
            className="mt-5 bg-orange-500 hover:bg-orange-600 px-8 py-3 rounded-xl text-white font-semibold transition-all"
        >
            Calculate
        </button>

        {/* RESULT */}

        <div className="mt-6">

            {loading && (

                <div className="bg-slate-800 border border-slate-700 text-white p-4 rounded-2xl w-fit">

                    🧠 AI is calculating...

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