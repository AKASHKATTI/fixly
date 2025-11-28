import React from "react";
import CopyCodeBlock from "./CopyCodeBlock";

function CodeReviewDisplay({ reviewData }) {
  if (!reviewData || !reviewData.review) {
    return <p className="text-gray-400 italic">No review data available.</p>;
  }

  const { mistakes, improvements, correctedCode } = reviewData.review;

  const errorLines = mistakes
    ? mistakes.map((m) => m.line).filter((l) => l !== null)
    : [];

  return (
    <div className="space-y-8 text-white">
      
      {/* SECTION 1: ORIGINAL CODE */}

      <div>
        <h4 className="text-lg font-bold  mb-2">
          Original Code
        </h4>
        <CopyCodeBlock 
          code={reviewData.originalCode} 
          errorLines={errorLines}
        />
      </div>

      {/* SECTION 2: MISTAKES */}

      <div>
        <h4 className="text-lg font-bold text-white mb-2">
          Mistakes Found
        </h4>

        {mistakes && mistakes.length > 0 ? (
          <ul className="list-disc list-inside space-y-1">
            {mistakes.map((m, idx) => (
              <li key={idx} className="text-white">
                <span className="font-semibold text-red-400">
                  {m.line !== null ? `Line ${m.line}: ` : ""}
                </span>
                {m.message}
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-green-400 font-medium">No mistakes found!</p>
        )}
      </div>

      {/* SECTION 3: IMPROVEMENTS */}
      <div>
        <h4 className="text-lg font-bold text-white mb-2">Suggestions</h4>

        {improvements && improvements.length > 0 ? (
          <ul className="list-disc list-inside space-y-1">
            {improvements.map((imp, idx) => (
              <li key={idx} className="text-white">
                <span className="font-semibold text-blue-300">
                  {imp.line !== null ? `Line ${imp.line}: ` : ""}
                </span>
                {imp.suggestion}
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-gray-400">No specific suggestions.</p>
        )}
      </div>

      {/* SECTION 4: CORRECTED CODE */}
      <div>
        <h4 className="text-lg font-bold text-green-400 mb-2">
          Corrected Code
        </h4>
        <CopyCodeBlock code={correctedCode} />
      </div>

    </div>
  );
}

export default CodeReviewDisplay;
