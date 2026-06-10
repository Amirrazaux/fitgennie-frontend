"use client";

import React, { useState , useEffect} from "react";

export default function FoodAnalyzer() {

    const [food, setFood] = useState("");

    const [result, setResult] = useState("");

    const [image, setImage]= useState("");
    
    const [loading, setLoading] = useState(false);

    async function analyzeFood() {

        try {

            setLoading(true);
            let response = await fetch(
                "https://fitgennie.onrender.com/analyze-food",
                {
                    method: "POST",

                    headers: {
                        "Content-Type":
                        "application/json"
                    },

                    body: JSON.stringify({

                        food: food || "",
                        image: image || "",
                        email: localStorage.getItem("userEmail") || ""
                    }
                
                )
                }
            );

            let data = await response.json();

            setResult(data.result);
            setLoading(false)

        } catch (error) {
            setLoading(false)
            alert("Food Analyzer Error");
        }
    }


function handleImage(e) {

    const file = e.target.files?.[0];

    if (!file) return;

    const reader = new FileReader();

    reader.onloadend = () => {

        const base64 = reader.result.split(",")[1];

        console.log("Base64 length:", base64.length);

        setImage(base64);
    };

    reader.readAsDataURL(file);
}

    useEffect(() => {
        console.log("Current image state:", image);
    }, [image]);


    return (

    <div className="bg-slate-900/60 backdrop-blur-lg border border-slate-700 p-6 rounded-3xl shadow-xl">

        {/* HEADER */}

        <div className="mb-5">

            <h1 className="text-2xl font-bold text-white">

                🍎 AI Food Analyzer

            </h1>

            <p className="text-slate-400 mt-2">

                Get instant nutrition insights based on your fitness goal

            </p>

        </div>

        {/* INPUT */}

        <div className="flex flex-col md:flex-row gap-3">

            <input
                type="text"
                placeholder="Example: 2 eggs, banana, milk..."
                value={food}
                onChange={(e) =>
                    setFood(e.target.value)
                }
                onKeyDown={(e) => {
                    if (e.key === "Enter") {
                        analyzeFood();
                    }
                }}
                className="flex-1 bg-slate-800 border border-slate-700 text-white p-4 rounded-xl outline-none focus:border-blue-500"
            />
            <input
                id="foodImage"
                type="file"
                accept="image/*"
                onChange={handleImage}
                className="bg-slate-800 border border-slate-700 text-white p-4 rounded-xl outline-none focus:border-blue-500"
            />
            {image && (
                <span className="text-green-500 font-semibold">
                    Image Selected
                </span>
            )}

            {
                !image && (
                    <span className="text-red-500 font-semibold">
                        No Image
                    </span>
                )
            }
            {
                image && (
                    <img
                        src={`data:image/jpeg;base64,${image}`}
                        alt="Selected Food"
                        className="w-16 h-16 object-cover rounded-lg border border-green-500"
                    />
                )
            }
           
            <button
                onClick={analyzeFood}
                className="bg-green-600 hover:bg-green-700 px-8 rounded-xl text-white font-semibold transition-all"
            >
                Analyze
            </button>

        </div>

        {/* RESULT */}

        <div className="mt-6">

            {loading && (

                <div className="bg-slate-800 border border-slate-700 text-white p-4 rounded-2xl w-fit">

                    🧠 AI is analyzing your meal...

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