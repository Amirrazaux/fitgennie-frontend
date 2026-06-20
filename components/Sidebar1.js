"use client";

import Link from "next/link";
import { useRouter,usePathname } from "next/navigation";
import { useState } from "react";

export default function Sidebar() {

    const router = useRouter();
    const pathname= usePathname();
    const [isOpen, setIsOpen] = useState(false);

    function logout() {

        localStorage.removeItem("loggedIn");

        router.push("/login");
    }

    return (
    <div
    className={`fixed top-0 left-0 h-screen w-64 bg-slate-950 border-r border-slate-800 text-white flex flex-col z-40 transform transition-transform duration-300
    ${isOpen ? "translate-x-0" : "-translate-x-full"}
    lg:translate-x-0`}
>

        {/* LOGO */}

        <div className="p-8 border-b border-slate-800">

            <h1 className=" text-3xl font-extrabold bg-gradient-to-r from-blue-500 via-cyan-400 to-purple-500 bg-clip-text text-transparent">
                FitGennie
            </h1>

                

            <p className="text-slate-400 text-sm mt-2">
                AI Fitness Assistant
            </p>

        <button 
            onClick={()=> setIsOpen(!isOpen)}
            className="md:hidden fixed top-4 left-4 z-50 bg-slate-900 text-white p-3 rounded-xl">
                ≡
        
        </button>
            <div className="mt-4 flex items-center gap-2 text-green-400 text-sm">
                <span className="w-2 h-2 rounded-full bg-green-400"></span>
                AI Online
            </div>

        </div>

        {/* MENU */}

        <div className="flex-1 px-4 py-6 space-y-3">

            <Link href="/dashboard">
                <div className={`flex items-center gap-3 p-3 rounded-xl cursor-pointer transition-all duration-300 hover:translate-x-1 ${
                   pathname === "/dashboard"
                    ? "bg-blue-500/10 border border-blue-500/30 text-blue-400"
                    : "hover:bg-slate-800 hover:text-blue-400"
                 }`}>
                   <span>🏠</span>
                   <span>Dashboard</span>
                </div>
            </Link>

            <Link href="/profile">
                 <div className={`flex items-center gap-3 p-3 rounded-xl cursor-pointer transition-all duration-300 hover:translate-x-1 ${
                     pathname === "/profile"
                       ? "bg-blue-500/10 border border-blue-500/30 text-blue-400"
                       : "hover:bg-slate-800 hover:text-blue-400"
                 }`}>
                    <span>👤</span>
                    <span>Profile</span>
                 </div>
            </Link>

            <Link href="/dashboard">
                <div className={`flex items-center gap-3 p-3 rounded-xl cursor-pointer transition-all duration-300 hover:translate-x-1 ${
                    pathname === "/dashboard"
                       ? "bg-blue-500/10 border border-blue-500/30 text-blue-400"
                       : "hover:bg-slate-800 hover:text-blue-400"
                }`}>
                  <span>🤖</span>
                  <span>AI Chat</span>
                </div>
            </Link>

            <Link href="/analyzer">
                 <div className={`flex items-center gap-3 p-3 rounded-xl cursor-pointer transition-all duration-300 hover:translate-x-1 ${
                     pathname === "/analyzer"
                        ? "bg-blue-500/10 border border-blue-500/30 text-blue-400"
                        : "hover:bg-slate-800 hover:text-blue-400"
                  }`}>
                     <span>🍎</span>
                     <span>Food Analyzer</span>
                 </div>
            </Link>

            <Link href="/maintain">
                <div className={`flex items-center gap-3 p-3 rounded-xl cursor-pointer transition-all duration-300 hover:translate-x-1 ${
                    pathname === "/maintain"
                     ? "bg-blue-500/10 border border-blue-500/30 text-blue-400"
                     : "hover:bg-slate-800 hover:text-blue-400"
                }`}>
                   <span>🔥</span>
                   <span>Maintenance</span>
                </div>
            </Link>

            <Link href="/workout">
               <div className={`flex items-center gap-3 p-3 rounded-xl cursor-pointer transition-all duration-300 hover:translate-x-1 ${
                   pathname === "/workout"
                      ? "bg-blue-500/10 border border-blue-500/30 text-blue-400"
                      : "hover:bg-slate-800 hover:text-blue-400"
                }`}>
                   <span>💪</span>
                   <span>Workout Planner</span>
                </div>
            </Link>

        </div>

        {/* FOOTER */}

        <div className="p-4 border-t border-slate-800">

            <button
                onClick={logout}
                className="w-full bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 py-3 rounded-xl font-semibold shadow-lg transition-all duration-300 hover:scale-105"
            >
                Logout
            </button>

        </div>

    </div>
);
}