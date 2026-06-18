"use client";

import Sidebar from "../../components/Sidebar1";
import FoodAnalyzer from "../../components/FoodInput";

export default function FoodPage() {
  return (
    <div className="flex min-h-screen bg-slate-900 text-white">
      <Sidebar />

      <div className="flex-1 md:ml-64 p-6 space-y-6">

        {/* HERO SECTION */}
        <div className="relative overflow-hidden bg-gradient-to-r from-emerald-900/40 to-slate-900 border border-slate-700 rounded-3xl p-8">
          <h1 className="text-4xl font-bold mb-3">
            🍎 AI Food Analyzer
          </h1>
          <p className="text-slate-300 max-w-2xl">
            Instantly analyze your meals using AI. Get calories, protein, carbs,
            fats, and nutrition insights to maintain a healthy lifestyle.
          </p>

          {/* small highlight badges */}
          <div className="flex flex-wrap gap-3 mt-5">
            <span className="px-3 py-1 bg-emerald-500/10 border border-emerald-500/30 rounded-full text-sm">
              🔥 Calorie Detection
            </span>
            <span className="px-3 py-1 bg-blue-500/10 border border-blue-500/30 rounded-full text-sm">
              🧠 AI Nutrition Engine
            </span>
            <span className="px-3 py-1 bg-purple-500/10 border border-purple-500/30 rounded-full text-sm">
              📊 Macro Breakdown
            </span>
          </div>
        </div>

        {/* FEATURE CARDS */}
        <div className="grid md:grid-cols-3 gap-5">

          <div className="bg-slate-800/60 border border-slate-700 rounded-2xl p-5 hover:scale-[1.02] transition">
            <h2 className="text-lg font-semibold mb-2">🍽️ Food Analysis</h2>
            <p className="text-slate-400 text-sm">
              Upload image or describe your meal to get instant nutrition details.
            </p>
          </div>

          <div className="bg-slate-800/60 border border-slate-700 rounded-2xl p-5 hover:scale-[1.02] transition">
            <h2 className="text-lg font-semibold mb-2">🔥 Calorie Tracking</h2>
            <p className="text-slate-400 text-sm">
              Track daily calorie intake and maintain your fitness goals easily.
            </p>
          </div>

          <div className="bg-slate-800/60 border border-slate-700 rounded-2xl p-5 hover:scale-[1.02] transition">
            <h2 className="text-lg font-semibold mb-2">💪 Health Insights</h2>
            <p className="text-slate-400 text-sm">
              Get AI-powered suggestions to improve your diet and lifestyle.
            </p>
          </div>

        </div>

        {/* INPUT SECTION */}
        <div className="bg-slate-900/60 border border-slate-700 rounded-3xl p-6">
          <FoodAnalyzer />
        </div>

      </div>
    </div>
  );
}