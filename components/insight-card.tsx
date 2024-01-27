import React from "react";

export interface Insights {
  name: string;
  uv: number;
  pv: number;
  amt: number;
}
interface InsightCardProps {
  insights: Insights[];
}
export default function InsightCard({ insights }: InsightCardProps) {
  return (
    <div className="fixed top-1/2 transform -translate-y-1/2 left-20 p-4">
      {insights.map((i) => (
        <div
          key={i.name}
          className="max-w-xs mx-auto bg-gray-200 rounded-md overflow-hidden shadow-lg z-50"
        >
          <div className="p-6">
            <h2 className="text-sm font-bold mb-2">{i.name}</h2>
            <p className="text-gray-700">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis
              fringilla nisl a ex ultrices, eget accumsan orci viverra.
            </p>
          </div>
        </div>
      ))}
    </div>
  );
}
