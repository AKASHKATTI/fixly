
import React, { useState } from "react";
import axios from "axios";

import CodeReviewDisplay from "../components/CodeReviewDisplay";

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
      const response = await axios.post("http://localhost:4000/ai/get-review", {
        code,
      });

      const data = response.data;
      setReviewData(data);
    } catch (error) {
      setErrorMsg(
        `Failed to get review. Please check your backend (http://localhost:4000) and console for errors. Error: ${error.message}`
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="flex flex-col items-center bg-gray-200 min-h-screen p-8">
      <div className="bg-white w-3/4 m-5 p-5 rounded-lg shadow-lg relative">
        <textarea
          placeholder="Paste code here..."
          value={code}
          onChange={(e) => setCode(e.target.value)}
          className="w-full h-64 p-2 rounded-md text-sm text-slate-700 placeholder-slate-400 focus:outline-none resize-none border border-gray-300"
          style={{ paddingBottom: "3.5rem" }}
        />
        <div className="absolute bottom-4 right-4">
          <button
            onClick={reviewCode}
            disabled={!code.trim() || loading}
            className={`px-4 py-2 text-sm font-medium text-white rounded-md ${
              loading ? "bg-gray-400" : "bg-blue-600 hover:bg-blue-700"
            }`}
          >
            {loading ? "Analyzing..." : "Review Code"}
          </button>
        </div>
      </div>

      <div className="bg-white w-3/4 m-5 p-5 rounded-lg shadow-lg overflow-auto max-h-[500px]">
        <h3 className="text-lg font-semibold mb-4">Code Review:</h3>
        {errorMsg && <p className="text-red-600 mb-2">{errorMsg}</p>}
        {!reviewData ? (
          <p className="text-gray-500">
            Review results will appear here after you click "Review Code".
          </p>
        ) : (
          <CodeReviewDisplay reviewData={reviewData} />
        )}
      </div>
    </main>
  );
}

export default HomePage;
