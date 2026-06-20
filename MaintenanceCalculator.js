"use client";

import { useState } from "react";

export default function MaintenanceCalculator({
    calories,      // ← add this
    protein,       // ← add this
    workout,       // ← add this
    setCalories,
    setProtein,
    setWorkout
}) {
    const [weight, setWeight] = useState("");
    const [height, setHeight] = useState("");
    const [age, setAge] = useState("");
    const [goal, setGoal] = useState("");
    const [loading, setLoading] = useState(false);
    const [result, setResult] = useState("");

    async function calculateCalories() {
        try {
            setLoading(true);

            const res = await fetch(
                `${process.env.NEXT_PUBLIC_API_URL}/maintenance-calories`,
                {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({
                        name: "User",
                        weight,
                        height,
                        age,
                        goal
                    })
                }
            );

            const data = await res.json();
            setLoading(false);

            setResult(data.reply);

            // ✅ UPDATE DASHBOARD STATE
            const calculatedCalories = data.calories;
            const calculatedProtein = data.protein;
            const generatedWorkout = data.workout;

            setCalories(calculatedCalories);
            setProtein(calculatedProtein);
            setWorkout(generatedWorkout);

            // Save according to logged-in user email
            const userEmail = localStorage.getItem("userEmail");

            console.log("Saving for:", userEmail);

            if (userEmail) {
                const dashboardKey = `dashboard_${userEmail}`;

                localStorage.setItem(
                    dashboardKey,
                    JSON.stringify({
                        calories: calculatedCalories,
                        protein: calculatedProtein,
                        workout: generatedWorkout
                    })
                );
            }

        } catch (err) {
            setLoading(false);
            setResult("Backend Error");
        }
    }

    return (
        <div className="bg-slate-900/60 backdrop-blur-lg border border-slate-700 p-6 rounded-3xl shadow-xl">

            <h2 className="text-2xl font-bold mb-4">
                🔥 AI Maintenance Calculator
            </h2>

            <div className="grid md:grid-cols-2 gap-4">

                <input placeholder="Weight"
                    className="w-full bg-slate-800 border border-slate-700 text-white p-4 rounded-xl outline-none focus:border-blue-500"
                    onChange={(e) => setWeight(e.target.value)}
                />

                <input placeholder="Height"
                    className="w-full bg-slate-800 border border-slate-700 text-white p-4 rounded-xl outline-none focus:border-blue-500"
                    onChange={(e) => setHeight(e.target.value)}
                />

                <input placeholder="Age"
                    className="w-full bg-slate-800 border border-slate-700 text-white p-4 rounded-xl outline-none focus:border-blue-500"
                    onChange={(e) => setAge(e.target.value)}
                />

                <input placeholder="Goal"
                    className="w-full bg-slate-800 border border-slate-700 text-white p-4 rounded-xl outline-none focus:border-blue-500"
                    onChange={(e) => setGoal(e.target.value)}
                />

            </div>

            <button
                onClick={calculateCalories}
                className="mt-5 bg-orange-600 hover:bg-orange-700 px-8 py-3 rounded-xl text-white font-semibold transition-all"
                >
                Calculate
            </button>
        <div className="mt-6">  
            {loading && <p className="bg-slate-800 border border-slate-700 text-white p-4 rounded-2xl w-fit">🧠 Calculating...</p>}



            {result && (
                <div className="bg-slate-950 border border-slate-700 text-slate-200 p-5 rounded-2xl whitespace-pre-line leading-7">

                    {result}
                </div>
            )}
            </div>

        </div>
    );
}