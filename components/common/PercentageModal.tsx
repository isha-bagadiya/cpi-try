"use client";
import { useEffect, useState } from "react";

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

  useEffect(() => {
    const total = Object.values(councilPercentages).reduce(
      (sum, value) => sum + (parseFloat(value) || 0),
      0
    );
    setTotalPercentage(total);
  }, [councilPercentages]);

  const handlePercentageChange = (field: string, value: string) => {
    setCouncilPercentages((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  // const handleSubmit = async (e: React.FormEvent) => {
  //   e.preventDefault();
  //   setLoading(true);
  //   setError(null);
  //   setSuccess(null);
  //   console.log(councilPercentages);
  //   try {
  //     const response = await fetch("/api/council-percentages", {
  //       method: "POST",
  //       headers: {
  //         "Content-Type": "application/json",
  //       },
  //       body: JSON.stringify(councilPercentages),
  //     });

  //     if (!response.ok) {
  //       throw new Error("Failed to submit the form");
  //     }

  //     setSuccess("Percentages submitted successfully!");
  //     // Optionally reset form fields here
  //   } catch (err: any) {
  //     console.error("Failed to submit the form:", err);
  //     setError(err.message || "Failed to submit the form");
  //   } finally {
  //     setLoading(false);
  //   }
  // };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(null);
    setCpiResults([]);

    try {
      // Submit percentages
      const percentagesResponse = await fetch("/api/council-percentages", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(councilPercentages),
      });

      if (!percentagesResponse.ok) {
        throw new Error("Failed to submit percentages");
      }

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

  const remaining = 100 - totalPercentage;
  const isButtonDisabled = remaining < 0 || loading;

  const getRemainingText = () => {
    if (remaining < 0) {
      return "Total percentage division between all HCCs must be 100%!";
    } else {
      return `Remaining: ${remaining}%`;
    }
  };

  return (
    <>
      <div className="text-white w-full p-8 relative flex justify-center items-center flex-col">
        {/* Details Form */}
        <h2 className="text-2.5xl mb-4 font-mori font-semibold mx-auto text-[#FEC5FB]">
          Add Percentage for HCCs{" "}
        </h2>
        <form className="flex flex-col font-mori" onSubmit={handleSubmit}>
          <div className="flex flex-wrap items-center gap-[40px] my-[50px]">
            {councilFields.map((field) => (
              <div key={field} className="flex flex-col items-start space-x-2 mb-2 w-[30%]">
                <label className=" font-mori font-normal tracking-tighter">
                  {field}
                </label>
                <div className="w-full relative">
                  <input
                    className="w-full font-semibold p-4 bg-[#222222] rounded-lg outline-none border-none focus:ring-1 focus:ring-[#FEC5FB]"
                    value={councilPercentages[field] || ""}
                    onChange={(e) =>
                      handlePercentageChange(field, e.target.value)
                    }
                    min="0"
                    max="100"
                    placeholder="00"
                    required
                  />
                  <p className="absolute right-2 top-1/2 transform -translate-y-1/2 font-extralight text-xs text-[#FFD366]">
                    %
                  </p>
                </div>
              </div>
            ))}
          </div>
          <p className="text-xs text-center mb-4 text-[#FEC5FB]">{getRemainingText()}</p>
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

          {error && <p className="text-red-500 mt-4">{error}</p>}
          {success && <p className="text-green-500 mt-4">{success}</p>}
          {cpiResults.length > 0 && (
            <div className="mt-1">
              <h3 className="text-lg font-semibold mb-2">CPI Results:</h3>
              {cpiResults.map((result, index) => (
                <p key={index} className="text-blue-500">
                  {result.filename}: {result.cpi.toFixed(4)}
                </p>
              ))}
            </div>
          )}
        </form>
      </div>
    </>
  );
};

export default PercentageModal;
