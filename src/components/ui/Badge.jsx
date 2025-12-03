import React from 'react';

// Важно: export default
export default function Badge({ children, color = 'gray' }) {
  const colors = {
    gray: "bg-gray-800 text-gray-300 border-gray-600",
    green: "bg-green-900/30 text-green-400 border-green-500/50",
    purple: "bg-purple-900/30 text-purple-400 border-purple-500/50",
  };

  return (
    <span className={`px-2 py-0.5 rounded text-xs font-mono border ${colors[color]} backdrop-blur-sm`}>
      {children}
    </span>
  );
}