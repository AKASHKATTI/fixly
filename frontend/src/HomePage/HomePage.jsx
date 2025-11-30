import React, { useState } from "react";
import axios from "axios";
import "../index.css";

import CodeReviewDisplay from "../components/CodeReviewDisplay";
import { LuSparkles } from "react-icons/lu";

const baseUrl = import.meta.env.VITE_BASE_URL;


const api = axios.create({
  baseURL: baseUrl,
  timeout: 15000,
  headers: {
    "Content-Type": "application/json",
  },
});

function HomePage() {
  const [code, setCode] = useState("");
  const [reviewData, setReviewData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  async function reviewCode() {
    if (!code.trim()) {
      setErrorMsg("Please paste code before reviewing.");
      setReviewData(null);
      return;
    }

    setLoading(true);
    setErrorMsg("");
    setReviewData(null);

    try {
      const response = await api.post("/get-review", { code });
      
      setReviewData(response.data);
    } catch (error) {
      console.error("Error fetching code review:", error);

      
      if (error.response) {
        
        setErrorMsg(
          `Server error: ${error.response.status} ${error.response.statusText}`
        );
      } else if (error.request) {
        // No response received
        setErrorMsg(
          "No response from backend. Is the server running and CORS allowed?"
        );
      } else {
        // Something else happened
        setErrorMsg(`Request failed: ${error.message}`);
      }
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="min-h-screen bg-black pt-8 bg-dot-pattern">
      <div className="mx-auto max-w-7xl flex flex-col items-center justify-between md:flex-row gap-6">
        {/* log0 */}
        <img src="" alt="" />
        <section className="md:w-1/2 bg-transparent text-white rounded-lg shadow-lg p-4">
          {/* Header */}
          <header className="mb-6">
            <h1 className="text-5xl text-white font-medium mb-6 leading-tight">
              Review Code with{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00E5FF] via-[#6EE7FF] to-[#B3ECFF] animate-text-shine font-semibold">
                AI-Powered Insights
              </span>
            </h1>

            <div className="inline-flex items-center gap-3 text-sm font-semibold bg-black px-3 py-1 rounded-full border border-white/50 text-[#D1D5DB]">
              <LuSparkles className="w-5 h-5 text-[#D1D5DB]" />
              AI Powered Code Fixer
            </div>
          </header>

          {/* Input  */}
          <div className="mt-6">
            <label htmlFor="code" className="sr-only">
              Paste your code
            </label>
            <textarea
              id="code"
              placeholder="Paste code here..."
              value={code}
              onChange={(e) => setCode(e.target.value)}
              className="w-full h-72 p-3 rounded-md text-sm bg-gray-900 text-white placeholder-gray-400 focus:outline-none resize-none border border-gray-700"
              style={{ paddingBottom: "3.5rem" }}
            />

            <div className="flex items-center justify-between mt-4">
              <div className="text-xs text-gray-300">
                Tip: paste the file or snippet you want reviewed.
              </div>

              <button
                onClick={reviewCode}
                disabled={!code.trim() || loading}
                className={`px-4 py-2 text-sm font-medium text-black rounded-md
                    bg-gray-200 hover:bg-gray-300
                    disabled:bg-gray-500 disabled:text-gray-300
                  `}
              >
                {loading ? "Analyzing..." : "Review Code"}
              </button>
            </div>

            {errorMsg && <p className="text-red-500 mt-3">{errorMsg}</p>}
          </div>

          
        </section>

        {/* Output  */}
        <section
          className="
                md:w-1/2 
                bg-gray-800/60 backdrop-blur-sm 
                rounded-lg shadow-lg 
                p-6 
                overflow-y-auto 
                h-[calc(100vh-4rem)]
                "
        >
          <h3 className="text-lg font-semibold mb-4 text-white ">Code Review</h3>

          {!reviewData ? (
            <div className="text-gray-300">
              <p>Review results will appear here after you click "Review Code".</p>
            </div>
          ) : (
            <CodeReviewDisplay reviewData={reviewData} />
          )}
        </section>
      </div>

      <div className="mt-20 text-center pb-10">
            <p className="text-gray-700 pt-10"> 2025 @AKASH KATTI <span>All rights reserved</span> </p>
          </div>
    </main>
  );
}

export default HomePage;
