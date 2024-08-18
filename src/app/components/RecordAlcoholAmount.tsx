"use client";
import React, { useEffect } from "react";

type RecordAlcoholAmountProps = {
  volumes: number[];
  percentages: number[];
  limitAlcohol: number;
  ShowAlcoholPercentages: number[];
  drinkNames: string[];
  notes: string[];
  setVolumes: (volumes: number[]) => void;
  setPercentages: (percentages: number[]) => void;
  setDrinkNames: (drinkNames: string[]) => void;
  setNotes: (notes: string[]) => void;
  setLimitAlcohol: (value: number) => void;
  calculateAlcoholAmount: () => number;
  showRemainingResults: boolean;
  setShowRemainingResults: (value: boolean) => void;
  resetAll: () => void;
};

const RecordAlcoholAmount: React.FC<RecordAlcoholAmountProps> = ({
  volumes,
  percentages,
  limitAlcohol,
  drinkNames,
  notes,
  ShowAlcoholPercentages,
  showRemainingResults,
  setVolumes,
  setPercentages,
  setDrinkNames,
  setNotes,
  setLimitAlcohol,
  calculateAlcoholAmount,
  setShowRemainingResults,
  resetAll,
}) => {
  useEffect(() => {
    // リセット後にプレースホルダーが確実に表示されるように状態を監視
  }, [drinkNames, notes, volumes, percentages, limitAlcohol]);
  const handleCalculate = () => {
    if (limitAlcohol === 0) {
      alert("制限アルコール量を入力してください");
    } else {
      const totalAlcohol = calculateAlcoholAmount();
      const consumptionPercentage = (
        (totalAlcohol / limitAlcohol) *
        100
      ).toFixed(1);
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
            <input
              type="text"
              placeholder="酒名"
              value={drinkNames[index] || ""}
              onChange={(e) => {
                const newDrinkNames = [...drinkNames];
                newDrinkNames[index] = e.target.value;
                setDrinkNames(newDrinkNames);
              }}
              className="border p-2 mr-2 w-48 rounded"
            />
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
            <input
              type="text"
              placeholder="備考"
              value={notes[index] || ""}
              onChange={(e) => {
                const newNotes = [...notes];
                newNotes[index] = e.target.value;
                setNotes(newNotes);
              }}
              className="border p-2 ml-2 w-48 rounded"
            />
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
            <span className="text-xl font-semibold text-blue-900">
              摂取アルコール量…　{calculateAlcoholAmount()} g
              <br />
            </span>
            <span className="text-xl font-semibold text-blue-900">
              制限アルコール量…　{limitAlcohol} g
              <br />
            </span>
            <span className="text-xl font-semibold text-blue-900">
              制限に対する摂取アルコールの割合…　
              {((calculateAlcoholAmount() / limitAlcohol) * 100).toFixed(1)}%
              <br />
            </span>
            {showRemainingResults && (
              <div className="mt-6">
                {volumes.map(
                  (volume, index) =>
                    percentages[index] !== 0 &&
                    volume !== 0 && (
                      <span key={index} className="text-xl text-blue-900">
                        <span className="font-bold">
                          アルコール{index + 1}本目:
                        </span>
                        <span className="font-bold">　</span>{" "}
                        {drinkNames[index]}
                        <span className="font-bold">　</span>{" "}
                        {percentages[index]}%
                        <span className="font-bold">　</span> {volume} ml
                        <span className="font-bold">　</span> {notes[index]}
                        <br />
                      </span>
                    )
                )}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default RecordAlcoholAmount;
