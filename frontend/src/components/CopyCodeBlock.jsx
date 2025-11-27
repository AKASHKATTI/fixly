import React, { useState } from "react";
import { Copy, Check } from "lucide-react";



function CopyCodeBlock({ code }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Copy failed", err);
    }
  };

  return (
    <div className="relative flex items-start bg-gray-800 p-4 rounded-lg border border-gray-700 mb-4">
      <pre className="font-mono text-sm overflow-x-auto whitespace-pre-wrap w-full text-white">
        <code>{code}</code>
      </pre>
      <button
        onClick={handleCopy}
        disabled={copied}
        className={`ml-4 p-2 rounded-md transition-all duration-200 border border-gray-600 ${
          copied
            ? "bg-green-500/30 text-green-400 border-green-500/50"
            : "bg-gray-700 hover:bg-gray-600 hover:text-white"
        }`}
      >
        {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
      </button>
      {copied && (
        <span className="absolute -top-6 right-0 text-green-400 text-xs font-semibold">
          Copied!
        </span>
      )}
    </div>
  );
}


export default CopyCodeBlock;