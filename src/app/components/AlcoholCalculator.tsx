"use client";
import { useState } from "react";

type CalculationType = "type1" | "type2";

const AlcoholCalculator = () => {
  const [calculationType, setCalculationType] =
    useState<CalculationType>("type1");
  const [volumes, setVolumes] = useState<number[]>([0, 0, 0, 0, 0]);
  const [percentages, setPercentages] = useState<number[]>([0, 0, 0, 0, 0]);
  const [targetAlcohol, setTargetAlcohol] = useState<number>(0);

  const calculateAlcoholAmount = () => {
    return volumes.reduce(
      (total, volume, index) => total + volume * (percentages[index] / 100),
      0
    );
  };

  const calculateVolumesForTargetAlcohol = () => {
    const results = [];
    for (let i = 3; i <= 12; i++) {
      results.push({
        percentage: i,
        volume: (targetAlcohol / (i / 100)).toFixed(2),
      });
    }
    return results;
  };

  return (
    <div className="p-8 bg-white rounded-lg shadow-lg max-w-lg mx-auto">
      <h1 className="text-2xl font-bold mb-6 text-center text-gray-800">
        Alcohol Calculator
      </h1>
      <div className="mb-6 text-center">
        <button
          className={`px-6 py-2 rounded-full mr-2 ${
            calculationType === "type1"
              ? "bg-blue-500 text-white"
              : "bg-gray-200 text-gray-800"
          }`}
          onClick={() => setCalculationType("type1")}
        >
          Type 1
        </button>
        <button
          className={`px-6 py-2 rounded-full ${
            calculationType === "type2"
              ? "bg-blue-500 text-white"
              : "bg-gray-200 text-gray-800"
          }`}
          onClick={() => setCalculationType("type2")}
        >
          Type 2
        </button>
      </div>

      {calculationType === "type1" ? (
        <div>
          <h2 className="text-lg font-semibold mb-4 text-gray-700">
            飲んだ量とアルコール度数を入力してください:
          </h2>
          {volumes.map((volume, index) => (
            <div key={index} className="mb-4 flex items-center">
              <input
                type="number"
                placeholder={`Volume (ml) ${index + 1}`}
                value={volume}
                onChange={(e) => {
                  const newVolumes = [...volumes];
                  newVolumes[index] = parseFloat(e.target.value);
                  setVolumes(newVolumes);
                }}
                className="border p-2 mr-2 w-24 rounded"
              />
              <span className="mr-4 text-gray-600">ml</span>
              <input
                type="number"
                placeholder={`Percentage (%) ${index + 1}`}
                value={percentages[index]}
                onChange={(e) => {
                  const newPercentages = [...percentages];
                  newPercentages[index] = parseFloat(e.target.value);
                  setPercentages(newPercentages);
                }}
                className="border p-2 mr-2 w-24 rounded"
              />
              <span className="text-gray-600">%</span>
            </div>
          ))}
          <div className="mt-6 text-center">
            <p className="text-xl font-semibold text-gray-800">
              Total Alcohol Amount: {calculateAlcoholAmount()} ml
            </p>
          </div>
        </div>
      ) : (
        <div>
          <h2 className="text-lg font-semibold mb-4 text-gray-700">
            目標アルコール量を入力してください:
          </h2>
          <div className="flex items-center mb-6">
            <input
              type="number"
              placeholder="Target Alcohol Amount"
              value={targetAlcohol}
              onChange={(e) => setTargetAlcohol(parseFloat(e.target.value))}
              className="border p-2 w-24 rounded mr-2"
            />
            <span className="text-gray-600">ml</span>
          </div>
          <div className="mt-4">
            <h3 className="text-lg font-semibold text-gray-700">Results:</h3>
            <ul className="mt-2">
              {calculateVolumesForTargetAlcohol().map((result, index) => (
                <li key={index} className="mb-1 text-gray-700">
                  {result.percentage}%: {result.volume} ml
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </div>
  );
};

export default AlcoholCalculator;
