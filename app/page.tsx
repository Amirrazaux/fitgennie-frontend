"use client";

import { useRouter } from "next/navigation";

export default function Home() {

    const router = useRouter();

    return (

        <div
            className="relative min-h-screen flex items-center justify-center overflow-hidden"
            style={{
                backgroundImage: "url('/fitness-bg.jpg')",
                backgroundSize: "cover",
                backgroundPosition: "center",
            }}
        >

            {/* Dark Overlay */}

            <div className="absolute inset-0 bg-black/80 backdrop-blur-sm"></div>
            <div className="absolute top-20 left-20 w-72 h-72 bg-blue-500/20 rounded-full blur-3xl"></div>
            <div className="absolute bottom-20 right-20 w-72 h-72 bg-cyan-500/20 rounded-full blur-3xl"></div>
            {/* Logo */}

            <div className="absolute top-8 left-10 z-10">

                <h1 className=" text-3xl font-extrabold bg-gradient-to-r from-blue-500 via-cyan-400 to-purple-500 bg-clip-text text-transparent ">
                    FitGennie
                </h1>

            </div>

            {/* Hero Content */}

            <div className="relative z-10 text-center max-w-5xl px-10 py-14 rounded-[40px] border border-white/10 bg-white/5 backdrop-blur-xl shadow-2xl">

                <h1 className="text-6xl md:text-8xl font-black leading-tight">
                    Welcome to
                    <br /><span className=" bg-gradient-to-r from-blue-400 via-cyan-400 to-purple-500 bg-clip-text text-transparent">
                    FitGennie
                    </span>
                </h1>

                <h2 className="mt-6 text-xl md:text-3xl font-semibold text-cyan-300">

                    Your Personal AI Fitness Assistant

                </h2>

                <p className="mt-6 text-lg md:text-1xl text-gray-300 leading-9 max-w-4xl mx-auto">

                    FitGennie is an AI-powered fitness companion
                    designed to help you achieve your health and
                    fitness goals. Track calories, analyze food,
                    calculate BMI, generate personalized workout
                    plans, monitor progress, and receive intelligent
                    fitness guidance — all in one place.

                </p>

                <button

                    onClick={() => router.push("/signup")}

                    className="mt-10 px-12 py-5 bg-gradient-to-r from-blue-600 to-cyan-500 text-white text-xl font-bold rounded-2xl shadow-[0_0_40px_rgba(59,130,246,0.4)] hover:scale-105 transition-all duration-300 "
                >

                    Get Started

                </button>
                <div className="grid grid-cols-3 gap-6 mt-14">

    <div className="bg-white/5 border border-white/10 backdrop-blur-xl p-5 rounded-2xl">
        <h3 className="text-cyan-400 font-bold text-xl">
            AI Chat
        </h3>
        <p className="text-gray-300 mt-2">
            Personal fitness guidance
        </p>
    </div>

    <div className="bg-white/5 border border-white/10 backdrop-blur-xl p-5 rounded-2xl">
        <h3 className="text-cyan-400 font-bold text-xl">
            Food Analysis
        </h3>
        <p className="text-gray-300 mt-2">
            Smart calorie tracking
        </p>
    </div>

    <div className="bg-white/5 border border-white/10 backdrop-blur-xl p-5 rounded-2xl">
        <h3 className="text-cyan-400 font-bold text-xl">
            Workout Plans
        </h3>
        <p className="text-gray-300 mt-2">
            Personalized routines
        </p>
    </div>

</div>

            </div>

        </div>

    );
}