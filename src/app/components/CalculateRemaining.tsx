"use client";
import React from "react";

type CalculateRemainingProps = {
  volumes: number[];
  percentages: number[];
  limitAlcohol: number;
  ShowAlcoholPercentages: number[];
  setVolumes: (volumes: number[]) => void;
  setPercentages: (percentages: number[]) => void;
  setLimitAlcohol: (value: number) => void;
  calculateAlcoholAmount: () => number;
  calculateRemainingAlcohol: () => number;
  calculateAdditionalVolumes: () => Array<{
    percentage: number;
    volume: string;
  }>;
  showRemainingResults: boolean;
  setShowRemainingResults: (value: boolean) => void;
  resetAll: () => void;
};

const CalculateRemaining: React.FC<CalculateRemainingProps> = ({
  volumes,
  percentages,
  limitAlcohol,
  ShowAlcoholPercentages,
  showRemainingResults,
  setVolumes,
  setPercentages,
  setLimitAlcohol,
  calculateAlcoholAmount,
  calculateRemainingAlcohol,
  calculateAdditionalVolumes,
  setShowRemainingResults,
  resetAll,
}) => {
  const handleCalculate = () => {
    if (limitAlcohol === 0) {
      alert("制限アルコール量を入力してください");
    } else {
      setShowRemainingResults(true);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center">
      <div className="">
        <h2 className="text-lg font-semibold mb-4 text-blue-800">
          アルコール度数、飲酒量を入力してください:
        </h2>
        {volumes.map((volume, index) => (
          <div key={index} className="mb-4 flex items-center">
            <span className="text-blue-700">アルコール度数</span>
            <select
              value={percentages[index]}
              onChange={(e) => {
                const newPercentages = [...percentages];
                newPercentages[index] = parseFloat(e.target.value);
                setPercentages(newPercentages);
              }}
              className="border p-2 mr-2 w-24 rounded"
            >
              <option value="">-選択-</option>
              {ShowAlcoholPercentages.map((percentage) => (
                <option key={percentage} value={percentage}>
                  {percentage}%
                </option>
              ))}
            </select>
            <span className="text-blue-700">飲酒量</span>
            <select
              value={volume}
              onChange={(e) => {
                const newVolumes = [...volumes];
                newVolumes[index] = parseFloat(e.target.value);
                setVolumes(newVolumes);
              }}
              className="border p-2 mr-2 w-24 rounded"
            >
              <option value="">-選択-</option>
              {percentages[index] &&
                (percentages[index] <= 9
                  ? [330, 350, 500, 630].map((size) => (
                      <option key={size} value={size}>
                        {size} ml
                      </option>
                    ))
                  : Array.from({ length: 10 }, (_, i) => 20 * (i + 1)).map(
                      (size) => (
                        <option key={size} value={size}>
                          {size} ml
                        </option>
                      )
                    ))}
            </select>
            <span className="mr-4 text-blue-700">ml</span>
          </div>
        ))}
        <h2 className="text-lg font-semibold mb-4 text-blue-800">
          制限アルコール量を入力してください:
        </h2>
        <input
          type="number"
          placeholder="Limit Alcohol Amount"
          value={limitAlcohol}
          onChange={(e) => setLimitAlcohol(parseFloat(e.target.value))}
          className="border p-2 w-24 rounded mr-2"
        />
        <span className="text-blue-700">g</span>
        <div className="mt-6 text-center">
          <button
            onClick={handleCalculate}
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
        </div>
        {showRemainingResults && (
          <div className="mt-6">
            <p className="text-xl font-semibold text-blue-900">
              摂取アルコール量…　{calculateAlcoholAmount()} g
            </p>
            <p className="text-xl font-semibold text-blue-900">
              制限アルコール量まであと…　{calculateRemainingAlcohol()} g
            </p>
          </div>
        )}

        {showRemainingResults ? (
          calculateRemainingAlcohol() > 0.4 ? (
            <div className="mt-4">
              <h3 className="text-lg font-semibold text-blue-800">
                あと飲めるの量は…
              </h3>
              <div className="mt-4 overflow-x-auto">
                <table className="min-w-full table-auto">
                  <thead>
                    <tr className="bg-blue-500 text-white">
                      <th className="px-4 py-2">アルコール度数 (%)</th>
                      <th className="px-4 py-2">飲める量 (ml)</th>
                    </tr>
                  </thead>
                  <tbody>
                    {calculateAdditionalVolumes().map((result, index) => (
                      <tr
                        key={index}
                        className={`${
                          index % 2 === 0 ? "bg-blue-100" : "bg-white"
                        }`}
                      >
                        <td className="border px-4 py-2 text-center text-blue-800">
                          {result.percentage}%
                        </td>
                        <td className="border px-4 py-2 text-center text-blue-800">
                          {result.volume} ml
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          ) : (
            <p className="text-lg text-red-600">もう飲めません！</p>
          )
        ) : null}
      </div>
    </div>
  );
};

export default CalculateRemaining;
