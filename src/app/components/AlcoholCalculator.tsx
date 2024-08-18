"use client";
import React, { useState } from "react";
import CalculateAlcohol from "./CalculateAlcohol";
import CalculateAmount from "./CalculateAmount";
import CalculateRemaining from "./CalculateRemaining";
import RecordAlcoholAmount from "./RecordAlcoholAmount";

type CalculationType = "type1" | "type2" | "type3" | "type4";
type RiskLevels = {
  [key: string]: { male: number; female: number };
};
type RiskResult = {
  male: Array<{ disease: string; risk: string }>;
  female: Array<{ disease: string; risk: string }>;
};

// 定数定義
const ALCOHOL_COEFFICIENT = 0.8;
const ShowAlcoholPercentages = [3, 4, 5, 6, 7, 9, 11, 12, 15, 20, 25, 40];
const AlcoholRiskLevels: RiskLevels = {
  生活習慣病: { male: 40, female: 20 },
  "脳卒中（脳梗塞）": { male: 40, female: 11 },
  大腸がん: { male: 20, female: 20 },
  肝がん: { male: 60, female: 20 },
};

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
  const [showAmountResults, setShowAmountResults] = useState(false);
  const [showRemainingResults, setShowRemainingResults] = useState(false);
  const [riskResults, setRiskResults] = useState<RiskResult>({
    male: [],
    female: [],
  });
  const [drinkNames, setDrinkNames] = useState<string[]>(
    new Array(volumes.length).fill("")
  );
  const [notes, setNotes] = useState<string[]>(
    new Array(volumes.length).fill("")
  );

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
    for (const percentage of ShowAlcoholPercentages) {
      results.push({
        percentage: percentage,
        volume: (
          targetAlcohol /
          (percentage / 100) /
          ALCOHOL_COEFFICIENT
        ).toFixed(1),
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
    for (const percentage of ShowAlcoholPercentages) {
      results.push({
        percentage: percentage,
        volume: (
          remainingAlcohol /
          (percentage / 100) /
          ALCOHOL_COEFFICIENT
        ).toFixed(1),
      });
    }
    return results;
  };

  const evaluateRisk = (
    totalAlcohol: number,
    gender: "male" | "female"
  ): Array<{ disease: string; risk: string }> => {
    return Object.keys(AlcoholRiskLevels).map((disease) => ({
      disease,
      risk:
        totalAlcohol > AlcoholRiskLevels[disease][gender]
          ? "高リスク"
          : "低リスク",
    }));
  };

  // 全てのステートをリセットする関数
  const resetAllValues = () => {
    setVolumes(new Array(5).fill(0));
    setPercentages(new Array(5).fill(0));
    setTargetAlcohol(0);
    setLimitAlcohol(0);
    setResultMessage("");
    setShowAmountResults(false);
    setShowRemainingResults(false);
    setRiskResults({ male: [], female: [] });
    setDrinkNames([]);
    setNotes([]);
  };

  return (
    <div className="p-8 bg-blue-50 rounded-lg shadow-lg max-w-4xl mx-auto">
      <div className="flex flex-col md:flex-row items-center md:justify-between space-y-4 md:space-y-0 mb-6 w-full">
        {["type1", "type2", "type3", "type4"].map((type, index) => (
          <button
            key={index}
            className={`flex-grow-0 flex-shrink-0 basis-1/5 px-6 py-3 mx-2 rounded-full shadow-lg transition duration-300 ease-in-out transform hover:scale-105 ${
              calculationType === type
                ? "bg-blue-600 text-white hover:bg-blue-700"
                : "bg-blue-200 text-blue-900 hover:bg-blue-300"
            }`}
            onClick={() => setCalculationType(type as CalculationType)}
          >
            {type === "type1" && "飲酒量からアルコール量を計算する"}
            {type === "type2" && "アルコール量から飲める量を計算する"}
            {type === "type3" && "あとどれくらい飲めるか計算する"}
            {type === "type4" && "飲酒量とアルコール量のメモをとる"}
          </button>
        ))}
      </div>

      {calculationType === "type1" && (
        <CalculateAlcohol
          volumes={volumes}
          percentages={percentages}
          resultMessage={resultMessage}
          ShowAlcoholPercentages={ShowAlcoholPercentages}
          AlcoholRiskLevels={AlcoholRiskLevels}
          riskResults={riskResults}
          setVolumes={setVolumes}
          setPercentages={setPercentages}
          setResultMessage={setResultMessage}
          calculateAlcoholAmount={calculateAlcoholAmount}
          evaluateRisk={evaluateRisk}
          setRiskResults={setRiskResults}
          resetAll={resetAllValues}
        />
      )}
      {calculationType === "type2" && (
        <CalculateAmount
          targetAlcohol={targetAlcohol}
          showAmountResults={showAmountResults}
          ShowAlcoholPercentages={ShowAlcoholPercentages}
          setShowAmountResults={setShowAmountResults}
          setTargetAlcohol={setTargetAlcohol}
          calculateVolumesForTargetAlcohol={calculateVolumesForTargetAlcohol}
          resetAll={resetAllValues}
        />
      )}
      {calculationType === "type3" && (
        <CalculateRemaining
          volumes={volumes}
          percentages={percentages}
          limitAlcohol={limitAlcohol}
          ShowAlcoholPercentages={ShowAlcoholPercentages}
          showRemainingResults={showRemainingResults}
          setVolumes={setVolumes}
          setPercentages={setPercentages}
          setLimitAlcohol={setLimitAlcohol}
          calculateAlcoholAmount={calculateAlcoholAmount}
          calculateRemainingAlcohol={calculateRemainingAlcohol}
          calculateAdditionalVolumes={calculateAdditionalVolumes}
          setShowRemainingResults={setShowRemainingResults}
          resetAll={resetAllValues}
        />
      )}
      {calculationType === "type4" && (
        <RecordAlcoholAmount
          volumes={volumes}
          percentages={percentages}
          limitAlcohol={limitAlcohol}
          ShowAlcoholPercentages={ShowAlcoholPercentages}
          showRemainingResults={showRemainingResults}
          drinkNames={drinkNames}
          notes={notes}
          setVolumes={setVolumes}
          setPercentages={setPercentages}
          setLimitAlcohol={setLimitAlcohol}
          calculateAlcoholAmount={calculateAlcoholAmount}
          setShowRemainingResults={setShowRemainingResults}
          setDrinkNames={setDrinkNames}
          setNotes={setNotes}
          resetAll={resetAllValues}
        />
      )}
    </div>
  );
};

export default AlcoholCalculator;
