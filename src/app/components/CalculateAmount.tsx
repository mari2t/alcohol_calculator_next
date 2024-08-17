"use client";
import React from "react";

type CalculateAmountProps = {
  targetAlcohol: number;
  setTargetAlcohol: (value: number) => void;
  calculateVolumesForTargetAlcohol: () => Array<{
    percentage: number;
    volume: string;
  }>;
};

const CalculateAmount: React.FC<CalculateAmountProps> = ({
  targetAlcohol,
  setTargetAlcohol,
  calculateVolumesForTargetAlcohol,
}) => {
  return (
    <div>
      <h2 className="text-lg font-semibold mb-4 text-blue-800">
        制限アルコール量を入力してください:
      </h2>
      <div className="flex items-center mb-6">
        <input
          type="number"
          placeholder="Target Alcohol Amount"
          value={targetAlcohol}
          onChange={(e) => setTargetAlcohol(parseFloat(e.target.value))}
          className="border p-2 w-24 rounded mr-2"
        />
        <span className="text-blue-700">g</span>
      </div>
      <div className="mt-4">
        <h3 className="text-lg font-semibold text-blue-800">呑める量は…</h3>
        <ul className="mt-2">
          {calculateVolumesForTargetAlcohol().map((result, index) => (
            <li key={index} className="mb-1 text-blue-800">
              アルコール度数：　{result.percentage}%　なら呑める量は：
              {result.volume} ml
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default CalculateAmount;
