"use client";
import { text } from "aws-sdk/clients/customerprofiles";
import React from "react";

type CalculateAlcoholProps = {
  volumes: number[];
  percentages: number[];
  resultMessage: string;
  setVolumes: (volumes: number[]) => void;
  setPercentages: (percentages: number[]) => void;
  setResultMessage: (message: string) => void;
  calculateAlcoholAmount: () => number;
};

const CalculateAlcohol: React.FC<CalculateAlcoholProps> = ({
  volumes,
  percentages,
  resultMessage,
  setVolumes,
  setPercentages,
  setResultMessage,
  calculateAlcoholAmount,
}) => {
  return (
    <div>
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
            {[3, 4, 5, 6, 7, 9, 12, 15, 25, 40].map((percentage) => (
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
          className="px-6 py-2 rounded bg-blue-600 text-white font-semibold"
          onClick={() => {
            const totalAlcohol = calculateAlcoholAmount();
            setResultMessage(`総アルコール量: ${totalAlcohol.toFixed(1)} g`);
          }}
        >
          計算する
        </button>
      </div>
      {resultMessage && (
        <div className="mt-6 text-center">
          <p className="text-xl font-semibold text-blue-900">{resultMessage}</p>
        </div>
      )}
    </div>
  );
};

export default CalculateAlcohol;
