import { NextRequest, NextResponse } from 'next/server';
import { promises as fs } from 'fs';
import path from 'path';
import csv from 'csv-parser';
import { Readable } from 'stream';

type CouncilPercentages = Record<string, number>;

async function parseCSV(filePath: string): Promise<any[]> {
  const results: any[] = [];
  const fileContent = await fs.readFile(filePath, 'utf-8');
  const readableStream = Readable.from(fileContent);

  return new Promise((resolve, reject) => {
    readableStream
      .pipe(csv())
      .on('data', (data) => results.push(data))
      .on('end', () => resolve(results))
      .on('error', (error) => reject(error));
  });
}

function calculateCPI(data: any[], percentages: CouncilPercentages): number {
  return data.reduce((sum, delegate) => {
    const influence = 
      (parseFloat(delegate.th_vp) || 0) * (percentages['Token House'] / 100) +
      (parseFloat(delegate.ch_vp_r4) || 0) * (percentages['Citizen House'] / 100) +
      (parseFloat(delegate.gc_vp_s6) || 0) * (percentages['Grants Council'] / 100) +
      (parseFloat(delegate.gc_vp_mm_s6) || 0) * (percentages['Grants Council (Milestone & Metrics Sub-committee)'] / 100) +
      (parseFloat(delegate.sc_vp_s6) || 0) * (percentages['Security Council'] / 100) +
      (parseFloat(delegate.coc_vp_s6) || 0) * (percentages['Code of Conduct Council'] / 100) +
      (parseFloat(delegate.dab_vp_s6) || 0) * (percentages['Developer Advisory Board'] / 100);

    return sum + Math.pow(influence, 2);
  }, 0);
}

export async function POST(request: NextRequest) {
  try {
    const percentages = await request.json() as CouncilPercentages;

    // Read and parse CSV files
    const csvFiles = ['file1.csv', 'file2.csv', 'file3.csv'];
    const results = [];

    for (const file of csvFiles) {
      const filePath = path.join(process.cwd(), 'public', file);
      const data = await parseCSV(filePath);
      const cpi = calculateCPI(data, percentages);
      results.push({ filename: file, cpi });
    }

    return NextResponse.json({ results });
  } catch (error) {
    console.error('Error calculating CPI:', error);
    return NextResponse.json({ error: 'Failed to calculate CPI' }, { status: 500 });
  }
}