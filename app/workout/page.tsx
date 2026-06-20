"use client";

import Sidebar from "../../components/Sidebar1";
import WorkoutPlanner from "../../components/WorkoutPlanner";

export default function WorkoutPage() {
  return (
    <div className="flex min-h-screen bg-slate-900 text-white">
      <Sidebar />

      <div className="flex-1 md:ml-64 p-6 space-y-6">

        {/* HERO SECTION */}
        <div className="bg-gradient-to-r from-blue-900/40 to-slate-900 border border-slate-700 rounded-3xl p-8">
          <h1 className="text-4xl font-bold mb-3">
            💪 AI Workout Planner
          </h1>
          <p className="text-slate-300 max-w-2xl">
            Generate personalized workout routines based on your fitness level,
            goals, and maintenance calories using AI intelligence.
          </p>

          <div className="flex flex-wrap gap-3 mt-5">
            <span className="px-3 py-1 bg-blue-500/10 border border-blue-500/30 rounded-full text-sm">
              🏋️ Strength Training
            </span>
            <span className="px-3 py-1 bg-purple-500/10 border border-purple-500/30 rounded-full text-sm">
              ⚡ AI Generated Plan
            </span>
            <span className="px-3 py-1 bg-green-500/10 border border-green-500/30 rounded-full text-sm">
              📈 Goal Based Split
            </span>
          </div>
        </div>

        {/* FEATURE CARDS */}
        <div className="grid md:grid-cols-3 gap-5">

          <div className="bg-slate-800/60 border border-slate-700 rounded-2xl p-5 hover:scale-[1.02] transition">
            <h2 className="text-lg font-semibold mb-2">
              🏋️ Muscle Building
            </h2>
            <p className="text-slate-400 text-sm">
              AI-designed hypertrophy focused workouts for fast muscle growth.
            </p>
          </div>

          <div className="bg-slate-800/60 border border-slate-700 rounded-2xl p-5 hover:scale-[1.02] transition">
            <h2 className="text-lg font-semibold mb-2">
              🔥 Fat Loss Plan
            </h2>
            <p className="text-slate-400 text-sm">
              Burn calories efficiently with structured fat loss routines.
            </p>
          </div>

          <div className="bg-slate-800/60 border border-slate-700 rounded-2xl p-5 hover:scale-[1.02] transition">
            <h2 className="text-lg font-semibold mb-2">
              📊 Smart Progression
            </h2>
            <p className="text-slate-400 text-sm">
              Progressive overload tracking for continuous improvement.
            </p>
          </div>

        </div>

        {/* MAIN COMPONENT */}
        <div className="bg-slate-900/60 border border-slate-700 rounded-3xl p-6">
          <WorkoutPlanner />
        </div>

      </div>
    </div>
  );
}