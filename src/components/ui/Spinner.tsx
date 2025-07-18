import React from "react";
import "./Spinner.css";
import RandomRelease from "../RandomRelease";

export default function Spinner() {
  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-transparent"
      aria-label="Loading"
    >
      <div className="relative w-32 h-32">
        <div className="absolute inset-0 bg-black rounded-full shadow-lg"></div>
        <div className="absolute inset-2 rounded-full overflow-hidden">
          {
            <RandomRelease />
          }
        </div>
        <div className="absolute inset-10 bg-white rounded-full flex items-center justify-center">
          <div className="w-4 h-4 bg-red-500 rounded-full"></div>
        </div>
      </div>
    </div>
  );
}
