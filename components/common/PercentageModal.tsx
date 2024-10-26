"use client";
import { useEffect, useRef, useState } from "react";
import CPILineGraph from "./CpiLineGraph";
import sidebg from "@/public/influencepagesideimage.svg";
import Image from "next/image";

const councilFields = [
  "Token House",
  "Citizen House",
  "Grants Council",
  "Grants Council (Milestone & Metrics Sub-committee)",
  "Security Council",
  "Code of Conduct Council",
  "Developer Advisory Board",
];

type CPIResult = {
  filename: string;
  cpi: number;
};

const PercentageModal: React.FC = () => {
  const [councilPercentages, setCouncilPercentages] = useState<
    Record<string, string>
  >({});
  const [totalPercentage, setTotalPercentage] = useState(0);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [cpiResults, setCpiResults] = useState<CPIResult[]>([]);
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  useEffect(() => {
    // Initialize the refs array
    inputRefs.current = councilFields.map(() => null);
    // Focus the first input on mount
    if (inputRefs.current[0]) {
      inputRefs.current[0].focus();
    }
  }, []);

  useEffect(() => {
    const total = Object.values(councilPercentages).reduce(
      (sum, value) => sum + (parseFloat(value) || 0),
      0
    );
    setTotalPercentage(Number(total.toFixed(2)));
  }, [councilPercentages]);

  const adjustLastEmptyField = () => {
    const currentTotal = Object.values(councilPercentages).reduce(
      (sum, val) => sum + (parseFloat(val) || 0),
      0
    );

    if (currentTotal >= 100) return false;

    const emptyFields = councilFields.filter(
      (field) => !councilPercentages[field] || councilPercentages[field] === ""
    );

    if (emptyFields.length === 1) {
      const remainingValue = (100 - currentTotal).toFixed(2);
      setCouncilPercentages((prev) => ({
        ...prev,
        [emptyFields[0]]: remainingValue,
      }));
      return true;
    }
    return false;
  };

  const handleKeyDown = (
    e: React.KeyboardEvent<HTMLInputElement>,
    currentIndex: number
  ) => {
    // Allow only numeric keys, backspace, delete, tab, enter, decimal point, and arrow keys
    const allowedKeys = [
      "Backspace",
      "Delete",
      "Tab",
      "Enter",
      "ArrowLeft",
      "ArrowRight",
      ".",
    ];
    const isNumericKey = /^[0-9]$/.test(e.key);

    if (!isNumericKey && !allowedKeys.includes(e.key)) {
      e.preventDefault();
      return;
    }

    if (e.key === "Enter") {
      e.preventDefault();
      const wasAdjusted = adjustLastEmptyField();

      if (wasAdjusted) {
        // If adjustment was made and it's the last field, try to submit
        if (currentIndex === councilFields.length - 1) {
          if (!isButtonDisabled) {
            handleSubmit(e as unknown as React.FormEvent);
          }
        }
      } else {
        // If no adjustment was made, move to next field
        if (currentIndex < councilFields.length - 1) {
          inputRefs.current[currentIndex + 1]?.focus();
        } else if (!isButtonDisabled) {
          handleSubmit(e as unknown as React.FormEvent);
        }
      }
    }
  };

  const handlePercentageChange = (field: string, value: string) => {
    setCouncilPercentages((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(null);
    setCpiResults([]);

    try {
      // Calculate CPI
      const cpiResponse = await fetch("/api/calculate-cpi", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(councilPercentages),
      });

      if (!cpiResponse.ok) {
        throw new Error("Failed to calculate CPI");
      }

      const { results } = await cpiResponse.json();
      setCpiResults(results);
      setSuccess("Percentages submitted and CPI calculated successfully!");
    } catch (err: any) {
      console.error("Error:", err);
      setError(err.message || "An error occurred");
    } finally {
      setLoading(false);
    }
  };

  const isButtonDisabled = totalPercentage !== 100 || loading;

  return (
    <>
      <div className="text-white w-full h-max p-8 pt-0 relative flex justify-center items-center flex-col bg-dark-gray min-h-[100vh] overflow-x-hidden overflow-y-hidden">
        {/* Details Form */}
        <h1 className="font-mori font-semibold text-[#FEC5FB] text-2xl md:text-4xl lg:text-6xl tracking-tight text-center mb-6 md:mb-12">
          Add Percentage for HCCs
        </h1>
        <form className="flex flex-col font-mori" onSubmit={handleSubmit}>
          <div className="flex flex-wrap items-center justify-between space-y-4">
            {councilFields.map((field, index) => (
              <div
                key={field}
                className="flex flex-col items-start justify-evenly space-y-2 lg:w-[30%] md:w-[28%] sm:w-[42%] w-full"
              >
                <label className=" font-mori text-md font-bold tracking-tighter">
                  {field}
                </label>
                <div className="w-full relative">
                  <input
                    ref={(el) => {
                      inputRefs.current[index] = el;
                    }}
                    className="w-full font-semibold p-4 bg-[#222222] rounded-lg outline-none border-none focus:ring-1 focus:ring-[#FEC5FB]"
                    value={councilPercentages[field] || ""}
                    onChange={(e) =>
                      handlePercentageChange(field, e.target.value)
                    }
                    onKeyDown={(e) => handleKeyDown(e, index)}
                    inputMode="decimal"
                    min="0"
                    max="100"
                    placeholder="Enter Percentage"
                    required
                  />
                  <p className="absolute right-3 top-1/3 transform -translate-y-1/2 font-extralight text-[16px] text-[#FFD366] my-3">
                    %
                  </p>
                </div>
              </div>
            ))}
          </div>
          {totalPercentage > 100 && (
          <p className="text-xs text-center my-4 text-[#FEC5FB] mt-10">
            Total exceeds 100%. Please adjust{" "}
            {(totalPercentage - 100).toFixed(2)}%.
          </p>
          )}
          <button
            type="submit"
            aria-label="simulate"
            className={`button-50 max-w-max self-center px-10 py-1 font-redhat font-semibold ${
              isButtonDisabled ? "cursor-not-allowed opacity-50" : ""
            }`}
            disabled={isButtonDisabled}
          >
            {loading ? "Simulating..." : "Simulate"}
          </button>

          <div className="absolute -right-[100px] top-[380px] h-[300px] w-[300px] overflow-hidden hidden sm:flex items-center justify-center">
            <Image src={sidebg} alt="sidebg" className="w-full h-auto"></Image>
          </div>
          {error && (
            <p className="text-red-500 mt-4 text-center mx-auto">{error}</p>
          )}

          {cpiResults.length > 0 && (
            <div className="mt-8 w-[90%] mx-auto flex items-center justify-center">
              <CPILineGraph cpiResults={cpiResults} />
            </div>
          )}
        </form>
      </div>
    </>
  );
};

export default PercentageModal;