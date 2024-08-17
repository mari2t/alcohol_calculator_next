"use client";
import React, { useState } from "react";
import CalculateAlcohol from "./CalculateAlcohol";
import CalculateAmount from "./CalculateAmount";
import CalculateRemaining from "./CalculateRemaining";

type CalculationType = "type1" | "type2" | "type3";
const ALCOHOL_COEFFICIENT = 0.8; // アルコール係数を定数として定義

const AlcoholCalculator = () => {
  const [calculationType, setCalculationType] =
    useState<CalculationType>("type1");
  const [volumes, setVolumes] = useState<number[]>(new Array(5).fill(0));
  const [percentages, setPercentages] = useState<number[]>(
    new Array(5).fill(0)
  );
  const [targetAlcohol, setTargetAlcohol] = useState<number>(0);
  const [limitAlcohol, setLimitAlcohol] = useState<number>(0);
  const [resultMessage, setResultMessage] = useState<string>("");

  const calculateAlcoholAmount = (): number => {
    return parseFloat(
      volumes
        .reduce(
          (total, volume, index) =>
            total + volume * (percentages[index] / 100) * ALCOHOL_COEFFICIENT,
          0
        )
        .toFixed(1)
    );
  };

  const calculateVolumesForTargetAlcohol = (): {
    percentage: number;
    volume: string;
  }[] => {
    const results = [];
    for (let i = 3; i <= 12; i++) {
      results.push({
        percentage: i,
        volume: (targetAlcohol / (i / 100) / ALCOHOL_COEFFICIENT).toFixed(0),
      });
    }
    return results;
  };

  const calculateRemainingAlcohol = (): number => {
    const consumedAlcohol = calculateAlcoholAmount();
    return parseFloat((limitAlcohol - consumedAlcohol).toFixed(1));
  };

  const calculateAdditionalVolumes = (): {
    percentage: number;
    volume: string;
  }[] => {
    const remainingAlcohol = calculateRemainingAlcohol();
    const results = [];
    for (let i = 3; i <= 12; i++) {
      results.push({
        percentage: i,
        volume: (remainingAlcohol / (i / 100) / ALCOHOL_COEFFICIENT).toFixed(0),
      });
    }
    return results;
  };

  return (
    <div className="p-8 bg-blue-50 rounded-lg shadow-lg max-w-lg mx-auto">
      <div className="flex flex-col md:flex-row items-center space-y-4 md:space-y-0 md:space-x-4 mb-6">
        <button
          className={`w-64 px-6 py-3 rounded-full shadow-lg transition duration-300 ease-in-out transform hover:scale-105 ${
            calculationType === "type1"
              ? "bg-blue-600 text-white hover:bg-blue-700"
              : "bg-blue-200 text-blue-900 hover:bg-blue-300"
          }`}
          onClick={() => setCalculationType("type1")}
        >
          飲酒量からアルコール量を計算する
        </button>
        <button
          className={`w-64 px-6 py-3 rounded-full shadow-lg transition duration-300 ease-in-out transform hover:scale-105 ${
            calculationType === "type2"
              ? "bg-blue-600 text-white hover:bg-blue-700"
              : "bg-blue-200 text-blue-900 hover:bg-blue-300"
          }`}
          onClick={() => setCalculationType("type2")}
        >
          アルコール量から呑める量を計算する
        </button>
        <button
          className={`w-64 px-6 py-3 rounded-full shadow-lg transition duration-300 ease-in-out transform hover:scale-105 ${
            calculationType === "type3"
              ? "bg-blue-600 text-white hover:bg-blue-700"
              : "bg-blue-200 text-blue-900 hover:bg-blue-300"
          }`}
          onClick={() => setCalculationType("type3")}
        >
          あとどれくらい呑めるか計算する
        </button>
      </div>

      {calculationType === "type1" && (
        <CalculateAlcohol
          volumes={volumes}
          percentages={percentages}
          resultMessage={resultMessage}
          setVolumes={setVolumes}
          setPercentages={setPercentages}
          setResultMessage={setResultMessage}
          calculateAlcoholAmount={calculateAlcoholAmount}
        />
      )}
      {calculationType === "type2" && (
        <CalculateAmount
          targetAlcohol={targetAlcohol}
          setTargetAlcohol={setTargetAlcohol}
          calculateVolumesForTargetAlcohol={calculateVolumesForTargetAlcohol}
        />
      )}
      {calculationType === "type3" && (
        <CalculateRemaining
          volumes={volumes}
          percentages={percentages}
          limitAlcohol={limitAlcohol}
          setLimitAlcohol={setLimitAlcohol}
          calculateAlcoholAmount={calculateAlcoholAmount}
          calculateRemainingAlcohol={calculateRemainingAlcohol}
          calculateAdditionalVolumes={calculateAdditionalVolumes}
        />
      )}
    </div>
  );
};

export default AlcoholCalculator;
