"use client";
import React from "react";
type RiskLevels = {
  [key: string]: { male: number; female: number };
};
type RiskResult = {
  male: Array<{ disease: string; risk: string }>;
  female: Array<{ disease: string; risk: string }>;
};

type CalculateAlcoholProps = {
  volumes: number[];
  percentages: number[];
  resultMessage: string;
  ShowAlcoholPercentages: number[];
  AlcoholRiskLevels: RiskLevels;
  riskResults: RiskResult;
  setVolumes: (volumes: number[]) => void;
  setPercentages: (percentages: number[]) => void;
  setResultMessage: (message: string) => void;
  calculateAlcoholAmount: () => number;
  evaluateRisk: (totalAlcohol: number, gender: "male" | "female") => any[];
  setRiskResults: React.Dispatch<React.SetStateAction<RiskResult>>;
  resetAll: () => void;
};

const CalculateAlcohol: React.FC<CalculateAlcoholProps> = ({
  volumes,
  percentages,
  resultMessage,
  ShowAlcoholPercentages,
  AlcoholRiskLevels,
  riskResults,
  setVolumes,
  setPercentages,
  setResultMessage,
  calculateAlcoholAmount,
  evaluateRisk,
  setRiskResults,
  resetAll,
}) => {
  const handleCalculate = () => {
    const totalAlcohol = calculateAlcoholAmount();
    setResultMessage(`摂取総アルコール量: ${totalAlcohol.toFixed(1)} g`);
    const maleRisk = evaluateRisk(totalAlcohol, "male");
    const femaleRisk = evaluateRisk(totalAlcohol, "female");
    setRiskResults({ male: maleRisk, female: femaleRisk });
  };
  return (
    <div className="flex flex-col items-center justify-center">
      <div className="">
        <h2 className="text-lg font-semibold mb-4 text-blue-800">
          アルコール度数と飲酒量を入力してください:
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
                  ? [350, 500].map((size) => (
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
        <div className="mt-6 text-center">
          <button
            className="px-6 py-2 rounded bg-blue-600 text-white font-semibold mr-4 shadow-md transition duration-300 ease-in-out transform hover:scale-105 hover:bg-blue-300 hover:text-blue-900"
            onClick={() => {
              const totalAlcohol = calculateAlcoholAmount();
              setResultMessage(
                `摂取総アルコール量: ${totalAlcohol.toFixed(1)} g`
              );
              handleCalculate();
            }}
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
        {resultMessage && (
          <div className="mt-6 text-center">
            <p className="text-xl font-semibold text-blue-900">
              {resultMessage}
            </p>
          </div>
        )}

        {riskResults.male.length > 0 && riskResults.female.length > 0 && (
          <div className="mt-6">
            <table className="min-w-full table-auto">
              <thead>
                <tr className="bg-blue-500 text-white">
                  <th className="px-4 py-2 text-center">疾患</th>
                  <th className="px-4 py-2 text-center">男性</th>
                  <th className="px-4 py-2 text-center">女性</th>
                </tr>
              </thead>
              <tbody>
                {Object.keys(AlcoholRiskLevels).map((disease, index) => {
                  const maleRisk = riskResults.male.find(
                    (r) => r.disease === disease
                  )?.risk;
                  const femaleRisk = riskResults.female.find(
                    (r) => r.disease === disease
                  )?.risk;
                  return (
                    <tr
                      key={index}
                      className={`${
                        index % 2 === 0 ? "bg-blue-100" : "bg-white"
                      }`}
                    >
                      <td className="border px-4 py-2 text-center text-blue-800">
                        {disease}
                      </td>
                      <td
                        className={`border px-4 py-2 text-center ${
                          maleRisk === "高リスク"
                            ? "text-red-600"
                            : "text-blue-800"
                        }`}
                      >
                        {maleRisk || "データなし"}
                      </td>
                      <td
                        className={`border px-4 py-2 text-center ${
                          femaleRisk === "高リスク"
                            ? "text-red-600"
                            : "text-blue-800"
                        }`}
                      >
                        {femaleRisk || "データなし"}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
            <p className="mt-4 text-xl font-semibold text-gray-900 text-center">
              参考
            </p>
            <div className="mt-6">
              <table className="min-w-full table-auto">
                <thead>
                  <tr className="bg-gray-500 text-white">
                    <th className="px-4 py-2 text-center">疾患</th>
                    <th className="px-4 py-2 text-center">男性</th>
                    <th className="px-4 py-2 text-center">女性</th>
                  </tr>
                </thead>
                <tbody>
                  {Object.entries(AlcoholRiskLevels).map(
                    ([disease, levels], index) => (
                      <tr
                        key={index}
                        className={`${
                          index % 2 === 0 ? "bg-gray-100" : "bg-white"
                        }`}
                      >
                        <td className="border px-4 py-2 text-center text-gray-800">
                          {disease}
                        </td>
                        <td className="border px-4 py-2 text-center text-gray-800">
                          {levels.male}g
                        </td>
                        <td className="border px-4 py-2 text-center text-gray-800">
                          {levels.female}g
                        </td>
                      </tr>
                    )
                  )}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>{" "}
    </div>
  );
};

export default CalculateAlcohol;
