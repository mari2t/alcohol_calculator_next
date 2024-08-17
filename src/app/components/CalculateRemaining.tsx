"use client";
import React from "react";

type CalculateRemainingProps = {
  volumes: number[];
  percentages: number[];
  limitAlcohol: number;
  setLimitAlcohol: (value: number) => void;
  calculateAlcoholAmount: () => number;
  calculateRemainingAlcohol: () => number;
  calculateAdditionalVolumes: () => Array<{
    percentage: number;
    volume: string;
  }>;
};

const CalculateRemaining: React.FC<CalculateRemainingProps> = ({
  volumes,
  percentages,
  limitAlcohol,
  setLimitAlcohol,
  calculateAlcoholAmount,
  calculateRemainingAlcohol,
  calculateAdditionalVolumes,
}) => {
  return (
    <div>
      <h2 className="text-lg font-semibold mb-4 text-blue-800">
        アルコール度数、飲酒量を入力してください:
      </h2>
      {volumes.map((volume, index) => (
        <div key={index} className="mb-4 flex items-center">
          <span className="text-blue-700">アルコール度数</span>
          <input
            type="number"
            placeholder={`Percentage (%) ${index + 1}`}
            value={percentages[index]}
            onChange={(e) => {
              const newPercentages = [...percentages];
              newPercentages[index] = parseFloat(e.target.value);
              percentages[index] = newPercentages[index];
            }}
            className="border p-2 mr-2 w-24 rounded"
          />
          <span className="text-blue-700">%</span>
          <span className="text-blue-700">　飲酒量</span>
          <input
            type="number"
            placeholder={`Volume (ml) ${index + 1}`}
            value={volume}
            onChange={(e) => {
              const newVolumes = [...volumes];
              newVolumes[index] = parseFloat(e.target.value);
              volumes[index] = newVolumes[index];
            }}
            className="border p-2 mr-2 w-24 rounded"
          />
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
      <div className="mt-6">
        <p className="text-xl font-semibold text-blue-900">
          摂取アルコール量…　{calculateAlcoholAmount()} g
        </p>
        <p className="text-xl font-semibold text-blue-900">
          制限アルコール量まであと…　{calculateRemainingAlcohol()} g
        </p>
      </div>
      <div className="mt-4">
        <h3 className="text-lg font-semibold text-blue-800">
          あと吞めるのは量は…
        </h3>
        {calculateRemainingAlcohol() >= 0 ? (
          <ul className="mt-2">
            {calculateAdditionalVolumes().map((result, index) => (
              <li key={index} className="mb-1 text-blue-800">
                アルコール度数：　{result.percentage}%　 なら呑める量は：　
                {result.volume} ml
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-lg text-red-600">もう呑めません！</p>
        )}
      </div>
    </div>
  );
};

export default CalculateRemaining;
