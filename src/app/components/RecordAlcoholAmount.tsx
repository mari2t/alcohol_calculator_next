"use client";
import React, { useState, useEffect } from "react";

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
  const [copiedText, setCopiedText] = useState("");

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

  // メモのコピー関数
  const handleCopy = () => {
    const textToCopy = `摂取アルコール量: ${calculateAlcoholAmount()} g
制限アルコール量: ${limitAlcohol} g
制限に対する摂取アルコールの割合: ${(
      (calculateAlcoholAmount() / limitAlcohol) *
      100
    ).toFixed(0)}%
${volumes
  .map((volume, index) =>
    percentages[index] !== 0 && volume !== 0
      ? `アルコール${index + 1}本目: ${drinkNames[index]} ${
          percentages[index]
        }% ${volume} ml ${notes[index]}\n`
      : ""
  )
  .join("")}`;
    navigator.clipboard
      .writeText(textToCopy)
      .then(() => {
        setCopiedText("コピーしました!");
        setTimeout(() => setCopiedText(""), 1500); // 1.5秒後にメッセージを消去
      })
      .catch((err) => console.error("コピーに失敗しました: ", err));
  };

  return (
    <div className="flex flex-col items-center justify-center px-4 sm:px-6 lg:px-8">
      <div className="w-full max-w-3xl">
        <h2 className="text-lg sm:text-xl font-semibold mb-4 text-blue-800">
          アルコール度数、飲酒量を入力してください:
        </h2>
        {volumes.map((volume, index) => (
          <div
            key={index}
            className="mb-4 flex flex-col sm:flex-row items-center mt-10 border border-gray-300 p-4 rounded-lg"
          >
            <input
              type="text"
              placeholder={`アルコール${index + 1}本目　名前`}
              value={drinkNames[index] || ""}
              onChange={(e) => {
                const newDrinkNames = [...drinkNames];
                newDrinkNames[index] = e.target.value;
                setDrinkNames(newDrinkNames);
              }}
              className="border p-2 mb-2 sm:mb-0 sm:mr-2 w-full sm:w-48 rounded"
            />
            <span className="text-blue-700 mr-2">アルコール度数</span>
            <select
              value={percentages[index]}
              onChange={(e) => {
                const newPercentages = [...percentages];
                newPercentages[index] = parseFloat(e.target.value);
                setPercentages(newPercentages);
              }}
              className="border p-2 mb-2 sm:mb-0 sm:mr-2 w-full sm:w-24 rounded"
            >
              <option value="">-選択-</option>
              {ShowAlcoholPercentages.map((percentage) => (
                <option key={percentage} value={percentage}>
                  {percentage}%
                </option>
              ))}
            </select>
            <span className="text-blue-700 mr-2">飲酒量</span>
            <select
              value={volume}
              onChange={(e) => {
                const newVolumes = [...volumes];
                newVolumes[index] = parseFloat(e.target.value);
                setVolumes(newVolumes);
              }}
              className="border p-2 mb-2 sm:mb-0 sm:mr-2 w-full sm:w-24 rounded"
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
              className="border p-2 w-full sm:w-48 rounded"
            />
          </div>
        ))}
        <h2 className="text-lg sm:text-xl font-semibold mb-4 text-blue-800">
          制限アルコール量を入力してください:
        </h2>
        <div className="flex items-center">
          <input
            type="number"
            placeholder="Limit Alcohol Amount"
            value={limitAlcohol}
            onChange={(e) => setLimitAlcohol(parseFloat(e.target.value))}
            className="border p-2 w-full sm:w-24 rounded mr-2"
          />
          <span className="text-blue-700">g</span>
        </div>
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
              {((calculateAlcoholAmount() / limitAlcohol) * 100).toFixed(0)}%
              <br />
            </span>
            <div className="mt-6">
              {volumes.map(
                (volume, index) =>
                  percentages[index] !== 0 &&
                  volume !== 0 && (
                    <span
                      key={index}
                      className="text-xl text-blue-900 block sm:inline-block sm:mr-4"
                    >
                      <span className="font-bold">
                        アルコール{index + 1}本目:
                      </span>
                      <span className="font-bold">　</span> {drinkNames[index]}
                      <span className="font-bold">　</span> {percentages[index]}
                      %<span className="font-bold">　</span> {volume} ml
                      <span className="font-bold">　</span> {notes[index]}
                      <br />
                    </span>
                  )
              )}
            </div>
            <button
              onClick={handleCopy}
              className="px-6 py-2 rounded mt-4 bg-blue-600 text-white font-semibold mr-4 shadow-md transition duration-300 ease-in-out transform hover:scale-105 hover:bg-blue-300 hover:text-blue-900"
            >
              テキストをコピー
            </button>
            {copiedText && (
              <div className="mt-2 text-gray-500 ">{copiedText}</div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default RecordAlcoholAmount;
