import { NextRequest, NextResponse } from "next/server";
import { promises as fs } from "fs";
import path from "path";
import csv from "csv-parser";
import { Readable } from "stream";

type CouncilPercentages = Record<string, number>;
interface CouncilPercentage {
  active: number;
  inactive: number;
  redistributed: Record<string, number>;
  originalPercentages: Record<string, number>;
}

interface DateRange {
  start_date: string;
  end_date: string;
  HCC: Set<string>;
}

const dateRanges: DateRange[] = [
  {
    start_date: "2022-05-26",
    end_date: "2023-01-25",
    HCC: new Set(["th_vp", "ch_vp_r2"]),
  },
  {
    start_date: "2023-01-26",
    end_date: "2023-06-07",
    HCC: new Set(["th_vp", "ch_vp_r2", "gc_vp_s3"]),
  },
  {
    start_date: "2023-06-08",
    end_date: "2023-10-13",
    HCC: new Set(["th_vp", "ch_vp_r2", "gc_vp_s4"]),
  },
  {
    start_date: "2023-10-14",
    end_date: "2024-01-03",
    HCC: new Set(["th_vp", "ch_vp_r3", "gc_vp_s4"]),
  },
  {
    start_date: "2024-01-04",
    end_date: "2024-06-02",
    HCC: new Set([
      "th_vp",
      "ch_vp_r3",
      "gc_vp_s5",
      "gc_vp_mm_s5",
      "sc_vp_s5",
      "coc_vp_s5",
      "dab_vp_s5",
    ]),
  },
  {
    start_date: "2024-06-03",
    end_date: "2024-06-26",
    HCC: new Set([
      "th_vp",
      "ch_vp_r4",
      "gc_vp_s5",
      "gc_vp_mm_s5",
      "sc_vp_s5",
      "coc_vp_s5",
      "dab_vp_s5",
    ]),
  },
  {
    start_date: "2024-06-27",
    end_date: "2024-12-11",
    HCC: new Set([
      "th_vp",
      "ch_vp_r4",
      "gc_vp_s6",
      "gc_vp_mm_s6",
      "sc_vp_s6",
      "coc_vp_s6",
      "dab_vp_s6",
    ]),
  },
];

const allCouncils = new Set([
  "th_vp",
  "ch_vp_r2",
  "ch_vp_r3",
  "ch_vp_r4",
  "gc_vp_s3",
  "gc_vp_s4",
  "gc_vp_s5",
  "gc_vp_s6",
  "gc_vp_mm_s5",
  "gc_vp_mm_s6",
  "sc_vp_s5",
  "sc_vp_s6",
  "coc_vp_s5",
  "coc_vp_s6",
  "dab_vp_s5",
  "dab_vp_s6",
]);

interface CouncilMapping {
  displayName: string;
  keys: string[];
}

const councilMappings: CouncilMapping[] = [
  {
    displayName: "Token House",
    keys: ["th_vp"],
  },
  {
    displayName: "Citizen House",
    keys: ["ch_vp_r2", "ch_vp_r3", "ch_vp_r4"],
  },
  {
    displayName: "Grants Council",
    keys: ["gc_vp_s3", "gc_vp_s4", "gc_vp_s5", "gc_vp_s6"],
  },
  {
    displayName: "Grants Council (Milestone & Metrics Sub-committee)",
    keys: ["gc_vp_mm_s5", "gc_vp_mm_s6"],
  },
  {
    displayName: "Security Council",
    keys: ["sc_vp_s5", "sc_vp_s6"],
  },
  {
    displayName: "Code of Conduct Council",
    keys: ["coc_vp_s5", "coc_vp_s6"],
  },
  {
    displayName: "Developer Advisory Board",
    keys: ["dab_vp_s5", "dab_vp_s6"],
  },
];

async function parseCSV(filePath: string): Promise<any[]> {
  const results: any[] = [];
  const fileContent = await fs.readFile(filePath, "utf-8");
  const readableStream = Readable.from(fileContent);

  return new Promise((resolve, reject) => {
    readableStream
      .pipe(csv())
      .on("data", (data) => results.push(data))
      .on("end", () => resolve(results))
      .on("error", (error) => reject(error));
  });
}

function calculateCPI(
  data: any[],
  percentages: CouncilPercentages,
  redistributedPercentages: Record<string, number>,
  activeCouncils: Set<string> // Add activeCouncils parameter
): number {
  return data.reduce((sum, delegate) => {
    // Get the redistributed percentage for each council, falling back to 0 if council is inactive
    const tokenHousePercentage = redistributedPercentages["Token House"] || 0;
    const citizenHousePercentage =
      redistributedPercentages["Citizen House"] || 0;
    const grantsCouncilPercentage =
      redistributedPercentages["Grants Council"] || 0;
    const grantsMMPercentage =
      redistributedPercentages[
        "Grants Council (Milestone & Metrics Sub-committee)"
      ] || 0;
    const securityCouncilPercentage =
      redistributedPercentages["Security Council"] || 0;
    const cocPercentage =
      redistributedPercentages["Code of Conduct Council"] || 0;
    const dabPercentage =
      redistributedPercentages["Developer Advisory Board"] || 0;

    // Helper function to get the correct council value based on active councils
    const getCouncilValue = (councilKeys: string[]): number => {
      const activeKey = councilKeys.find((key) => activeCouncils.has(key));
      return activeKey ? parseFloat(delegate[activeKey]) || 0 : 0;
    };

    const influence =
      // Token House is always th_vp
      (parseFloat(delegate.th_vp) || 0) * (tokenHousePercentage / 100) +
      // Citizen House - check which round is active
      getCouncilValue(["ch_vp_r2", "ch_vp_r3", "ch_vp_r4"]) *
        (citizenHousePercentage / 100) +
      // Grants Council - check which season is active
      getCouncilValue(["gc_vp_s3", "gc_vp_s4", "gc_vp_s5", "gc_vp_s6"]) *
        (grantsCouncilPercentage / 100) +
      // Grants Council MM - check which season is active
      getCouncilValue(["gc_vp_mm_s5", "gc_vp_mm_s6"]) *
        (grantsMMPercentage / 100) +
      // Security Council - check which season is active
      getCouncilValue(["sc_vp_s5", "sc_vp_s6"]) *
        (securityCouncilPercentage / 100) +
      // Code of Conduct Council - check which season is active
      getCouncilValue(["coc_vp_s5", "coc_vp_s6"]) * (cocPercentage / 100) +
      // Developer Advisory Board - check which season is active
      getCouncilValue(["dab_vp_s5", "dab_vp_s6"]) * (dabPercentage / 100);

    return sum + Math.pow(influence, 2);
  }, 0);
}

function getActiveCouncils(filename: string): Set<string> {
  const date = filename.split(".")[0];
  for (const range of dateRanges) {
    if (date >= range.start_date && date <= range.end_date) {
      return range.HCC;
    }
  }
  return new Set();
}

function calculateCouncilPercentages(
  activeCouncils: Set<string>,
  percentages: Record<string, number>
): CouncilPercentage {
  let activeTotal = 0;
  let inactiveTotal = 0;
  const activeCouncilsMap: Record<string, number> = {};
  const originalPercentages: Record<string, number> = {};

  // First pass: separate active and inactive councils
  for (const [council, percentage] of Object.entries(percentages)) {
    const percentageValue = Number(percentage);
    const mapping = councilMappings.find((m) => m.displayName === council);

    if (!mapping) continue;

    // Store original percentage
    originalPercentages[council] = percentageValue;

    // Check if any of the council's keys are in the active set
    const isActive = mapping.keys.some((key) => activeCouncils.has(key));

    if (isActive) {
      activeTotal += percentageValue;
      activeCouncilsMap[council] = percentageValue;
    } else {
      inactiveTotal += percentageValue;
    }
  }

  // Calculate redistribution amount per active council
  const numberOfActiveCouncils = Object.keys(activeCouncilsMap).length;
  const redistributionPerCouncil =
    numberOfActiveCouncils > 0 ? inactiveTotal / numberOfActiveCouncils : 0;

  // Create redistributed percentages
  const redistributed: Record<string, number> = {};
  for (const [council, originalPercentage] of Object.entries(
    activeCouncilsMap
  )) {
    redistributed[council] = Number(
      (originalPercentage + redistributionPerCouncil).toFixed(2)
    );
  }

  return {
    active: Number(activeTotal.toFixed(2)),
    inactive: Number(inactiveTotal.toFixed(2)),
    redistributed,
    originalPercentages,
  };
}

export async function POST(request: NextRequest) {
  try {
    const percentages = (await request.json()) as CouncilPercentages;

    // Read and parse CSV files
    const csvFiles = [
      "2022-06-08.csv",
      "2023-03-01.csv",
      "2023-06-19.csv",
      "2023-12-04.csv",
      "2024-10-14.csv",
      "2024-10-15.csv",
      "2024-10-16.csv",
    ];
    const results = [];

    for (const file of csvFiles) {
      const activeCouncils = getActiveCouncils(file);
      const filePath = path.join(process.cwd(), "public", file);
      const data = await parseCSV(filePath);
      const councilPercentages = calculateCouncilPercentages(
        activeCouncils,
        percentages
      );
      const cpi = calculateCPI(
        data,
        percentages,
        councilPercentages.redistributed,
        activeCouncils
      );

      console.log(`\nFile: ${file}`);
      console.log("Active councils:", Array.from(activeCouncils));
      console.log(
        "Original percentages:",
        councilPercentages.originalPercentages
      );
      console.log("Inactive total:", councilPercentages.inactive);
      console.log("Active total:", councilPercentages.active);

      console.log(
        "Redistributed percentages:",
        councilPercentages.redistributed
      );
      const redistributedTotal = Object.values(
        councilPercentages.redistributed
      ).reduce((sum, value) => sum + value, 0);

      console.log(
        "Total after redistribution:",
        redistributedTotal.toFixed(2) + "%"
      );
      console.log("---");
      results.push({ filename: file, cpi });
    }
    return NextResponse.json({ results });
  } catch (error) {
    console.error("Error calculating CPI:", error);
    return NextResponse.json(
      { error: "Failed to calculate CPI" },
      { status: 500 }
    );
  }
}
