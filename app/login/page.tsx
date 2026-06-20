"use client";

import { useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

// ✅ DATE HELPER
const formatDate = (date = new Date()) =>
  date.toISOString().split("T")[0];

export default function LoginPage() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = useCallback(
    async (e) => {
      e.preventDefault();

      if (!email.trim() || !password.trim()) {
        alert("Please fill all fields");
        return;
      }

      try {
        setLoading(true);

        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/login`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ email, password }),
            signal: AbortSignal.timeout(10000),
          }
        );

        const data = await response.json();

        if (data.message === "Login Successful") {
          const today = formatDate();

          const profileKey = `profile_${email}`;

          const savedProfileRaw = localStorage.getItem(profileKey);

          const savedProfile = savedProfileRaw
            ? JSON.parse(savedProfileRaw)
            : {};

          // ✅ FINAL PROFILE OBJECT (SAFE + CLEAN)
          const updatedProfile = {
            name: data.name || savedProfile.name || "",
            age: data.age ?? savedProfile.age ?? "",
            weight: data.weight ?? savedProfile.weight ?? "",
            height: data.height ?? savedProfile.height ?? "",
            gender: data.gender || savedProfile.gender || "",
            goal: data.goal || savedProfile.goal || "",
            profile_image:
              data.profile_image ||
              savedProfile.profile_image ||
              "",

            // 🔥 backend streak only
            streak: data.streak ?? savedProfile.streak ?? 1,

            // 🔥 backend email
            email: data.email || email,

            lastLoginDate: today,
          };

          // ✅ GLOBAL LOGIN FLAGS
          localStorage.setItem("loggedIn", "true");
          localStorage.setItem(
            "userEmail",
            updatedProfile.email
          );

          // ✅ SAVE PROFILE
          localStorage.setItem(
            profileKey,
            JSON.stringify(updatedProfile)
          );

          router.push("/dashboard");
        } else {
          alert(data.message || "Login Failed");
        }
      } catch (error) {
        if (
          error instanceof DOMException &&
          error.name === "AbortError"
        ) {
          alert("Connection timeout. Please try again.");
        } else {
          alert("Login Failed");
        }
      } finally {
        setLoading(false);
      }
    },
    [email, password, router]
  );

  
  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-800 text-white">
      <form
        onSubmit={handleLogin}
        className="bg-slate-900/60 backdrop-blur-lg border border-slate-700 p-10 rounded-3xl shadow-xl w-[90%] max-w-[400px] hover:border-blue-500 transition-all duration-300"
      >
        <h1 className="text-4xl font-bold mb-8 text-center bg-gradient-to-r from-blue-500 to-cyan-400 bg-clip-text text-transparent">
          Login
        </h1>

        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full bg-slate-800/50 border border-slate-600 p-4 rounded-xl mb-5 text-white placeholder-slate-400 focus:outline-none focus:border-blue-500"
          autoComplete="email"
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full bg-slate-800/50 border border-slate-600 p-4 rounded-xl mb-5 text-white placeholder-slate-400 focus:outline-none focus:border-blue-500"
          autoComplete="current-password"
        />

        <button
          type="submit"
          disabled={loading}
          className="bg-gradient-to-r from-blue-500 to-cyan-400 text-white w-full py-4 rounded-xl font-semibold hover:scale-105 transition-all duration-300 disabled:opacity-70 disabled:cursor-not-allowed"
        >
          {loading ? "Signing in..." : "Login"}
        </button>

        <p className="mt-5 text-center text-slate-400">
          Didn’t have an account?{" "}
          <Link href="/signup" className="text-blue-400 ml-2 font-semibold">
            Signup
          </Link>
        </p>
      </form>
    </div>
  );
}