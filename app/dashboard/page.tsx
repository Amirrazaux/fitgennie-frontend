"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Sidebar from "../../components/Sidebar1";
import ChatBox from "../../components/ChatBox1";
import CalorieCard from "../../components/CalorieCard";
import ProteinCard from "../../components/ProteinCard";
import WorkoutCard from "../../components/WorkoutCard";

export default function Dashboard() {
  const router = useRouter();

  const [loading, setLoading] = useState(true);

  const [name, setName] = useState("User");
  const [email, setEmail] = useState("");

  const [calories, setCalories] = useState(2200);
  const [protein, setProtein] = useState(120);
  const [workout, setWorkout] = useState(
    "Pushups 10 X 3\nSquats 12 X 3\nRunning 10 Mins"
  );

  const [profile, setProfile] = useState({
    goal: "",
    weight: "",
    streak: 1,
    profile_image: "",
    email: "",
  });

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
    const dashboardKey = `dashboard_${userEmail}`;

    const savedProfile = localStorage.getItem(profileKey);

    if (savedProfile) {
      const profileData = JSON.parse(savedProfile);

      setName(profileData.name || "User");

      setProfile({
        goal: profileData.goal || "",
        weight: profileData.weight || "",
        streak: profileData.streak,
        profile_image: profileData.profile_image || "",
        email: userEmail,
      });
    } else {
      setProfile({
        goal: "",
        weight: "",
        streak: 1,
        profile_image: "",
        email: userEmail,
      });
    }

    const dashboardData = localStorage.getItem(dashboardKey);

    if (dashboardData) {
      const data = JSON.parse(dashboardData);

      setCalories(data.calories || 2200);
      setProtein(data.protein || 120);
      setWorkout(
        data.workout ||
          "Pushups 10 X 3\nSquats 12 X 3\nRunning 10 Mins"
      );
    }

    setLoading(false);
  }, [router]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-slate-950 text-white">
        Loading dashboard...
      </div>
    );
  }

  const saveDashboardData = (data:{
    calories:number;
    protein: number;
    workout: string;
  }) => {
    const dashboardKey = `dashboard_${email}`;

    localStorage.setItem(dashboardKey, JSON.stringify(data));

    setCalories(data.calories);
    setProtein(data.protein);
    setWorkout(data.workout);
  };

  


  return (
    <div className="flex min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 text-white">
      <Sidebar />

      <div className="flex-1 lg:ml-64 p-6 space-y-8">
        {/* HEADER - DYNAMIC WITH USER EMAIL */}
        <div className="flex items-center justify-between p-6 rounded-3xl border border-slate-700 bg-gradient-to-r from-slate-900/70 to-slate-800/40 backdrop-blur-xl shadow-lg">
          <div className="flex items-center gap-5">
            {profile.profile_image ? (
              <img
                src={profile.profile_image}
                className="w-20 h-20 rounded-full border-2 border-cyan-400 shadow-lg object-cover"
                alt="Profile"
              />
            ) : (
              <div className="w-20 h-20 rounded-full bg-gradient-to-br from-cyan-500 to-blue-600 flex items-center justify-center text-2xl font-bold shadow-lg">
                {name.charAt(0)}
              </div>
            )}

            <div>
              <h1 className="text-3xl font-bold bg-gradient-to-r from-cyan-400 to-blue-500 text-transparent bg-clip-text">
                Welcome {name}
              </h1>
              <p className="text-slate-400">
                {name}'s AI Fitness Dashboard
                {email && <span className="text-xs ml-2 text-slate-500">({email})</span>}
              </p>
            </div>
          </div>

          <div className="px-4 py-2 rounded-full text-sm font-medium text-cyan-300 bg-cyan-500/10 border border-cyan-500/30 shadow-md">
            🤖 AI Online
          </div>
        </div>

        {/* CARDS SECTION - DYNAMIC DATA */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-stretch">
          <div className="group relative h-full rounded-3xl overflow-hidden border border-white/10 bg-slate-900/40 p-[1px] transition-all duration-300 hover:-translate-y-1 hover:ring-2 hover:ring-orange-400/30 hover:shadow-[0_0_30px_rgba(249,115,22,0.25)]">
            <div className="absolute inset-0 rounded-3xl bg-gradient-to-r from-orange-500 via-red-500 to-yellow-400 opacity-0 blur-2xl transition-opacity duration-500 group-hover:opacity-25"></div>
            <div className="relative z-10 h-full">
              <CalorieCard calories={calories} />
            </div>
          </div>

          <div className="group relative h-full rounded-3xl overflow-hidden border border-white/10 bg-slate-900/40 p-[1px] transition-all duration-300 hover:-translate-y-1 hover:ring-2 hover:ring-emerald-400/30 hover:shadow-[0_0_30px_rgba(16,185,129,0.25)]">
            <div className="absolute inset-0 rounded-3xl bg-gradient-to-r from-emerald-500 via-green-500 to-lime-400 opacity-0 blur-2xl transition-opacity duration-500 group-hover:opacity-25"></div>
            <div className="relative z-10 h-full">
              <ProteinCard protein={protein} />
            </div>
          </div>

          <div className="group relative h-full rounded-3xl overflow-hidden border border-white/10 bg-slate-900/40 p-[1px] transition-all duration-300 hover:-translate-y-1 hover:ring-2 hover:ring-violet-400/30 hover:shadow-[0_0_30px_rgba(139,92,246,0.25)]">
            <div className="absolute inset-0 rounded-3xl bg-gradient-to-r from-blue-500 via-purple-500 to-violet-400 opacity-0 blur-2xl transition-opacity duration-500 group-hover:opacity-25"></div>
            <div className="relative z-10 h-full">
              <WorkoutCard workout={workout} />
            </div>
          </div>
        </div>

        {/* PROFILE SECTION - DYNAMIC WITH USER EMAIL */}
        <div className="grid md:grid-cols-3 gap-6">
          <div className="bg-gradient-to-br from-cyan-900/30 to-slate-800/20 border border-cyan-700/50 rounded-2xl p-6 shadow-md hover:shadow-cyan-500/15 hover:border-cyan-400/50 transition-all duration-300">
            <p className="text-slate-400 mb-2">🎯 Goal</p>
            <h2 className="text-2xl font-bold text-cyan-400">
              {profile.goal || "Not Set"}
            </h2>
          </div>

          <div className="bg-gradient-to-br from-green-900/30 to-slate-800/20 border border-green-700/50 rounded-2xl p-6 shadow-md hover:shadow-green-500/15 hover:border-green-400/50 transition-all duration-300">
            <p className="text-slate-400 mb-2">⚖ Weight</p>
            <h2 className="text-2xl font-bold text-green-400">
              {profile.weight || 0} kg
            </h2>
          </div>

          <div className="bg-gradient-to-br from-orange-900/30 to-slate-800/20 border border-orange-700/50 rounded-2xl p-6 shadow-md hover:shadow-orange-500/15 hover:border-orange-400/50 transition-all duration-300">
            <p className="text-slate-400 mb-2">🔥 Streak</p>
            <h2 className="text-3xl font-bold text-orange-400">
              {profile.streak}
            </h2>
          </div>
        </div>

        {/* CHAT SECTION - DYNAMIC WITH USER EMAIL */}
        <div className="bg-gradient-to-br from-slate-900/60 to-slate-800/20 border border-slate-700 rounded-3xl p-6 shadow-lg hover:shadow-cyan-500/10 transition-all duration-300">
          <div className="mb-4">
            <h2 className="text-2xl font-semibold text-cyan-300">
              💬 AI Fitness Coach for {name}
            </h2>
            <p className="text-slate-400 text-sm">
              Ask anything about diet, workout or progress. Chat history saved for: {email}
            </p>
          </div>

          {/* Pass email to ChatBox via custom event or localStorage */}
          <ChatBox userEmail={email} />
        </div>
      </div>
    </div>
  );
}