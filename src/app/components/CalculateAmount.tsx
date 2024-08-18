"use client";
import React from "react";

type CalculateAmountProps = {
  targetAlcohol: number;
  ShowAlcoholPercentages: number[];
  setTargetAlcohol: (value: number) => void;
  calculateVolumesForTargetAlcohol: () => Array<{
    percentage: number;
    volume: string;
  }>;
  resetAll: () => void;
  showAmountResults: boolean;
  setShowAmountResults: (value: boolean) => void;
};

const CalculateAmount: React.FC<CalculateAmountProps> = ({
  targetAlcohol,
  showAmountResults,
  ShowAlcoholPercentages,
  setTargetAlcohol,
  calculateVolumesForTargetAlcohol,
  setShowAmountResults,
  resetAll,
}) => {
  const handleCalculateClick = () => {
    if (targetAlcohol === 0) {
      alert("目標の制限アルコール量を入力してください");
    } else {
      setShowAmountResults(true);
    }
  };
  return (
    <div>
      <h2 className="text-lg font-semibold mb-4 text-blue-800">
        目標の制限アルコール量を入力してください:
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
        <button
          onClick={handleCalculateClick}
          className="px-6 py-2 rounded bg-blue-600 text-white font-semibold mr-4 shadow-md transition duration-300 ease-in-out transform hover:scale-105 hover:bg-blue-300 hover:text-blue-900"
        >
          計算する
        </button>
        <button
          className="px-6 py-2 rounded bg-gray-200 text-blue-600 font-semibold shadow-md transition duration-300 ease-in-out transform hover:scale-105 hover:bg-blue-300 hover:text-blue-900"
          onClick={resetAll}
        >
          リセット
        </button>
        {showAmountResults && (
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
        )}
      </div>
    </div>
  );
};

export default CalculateAmount;
