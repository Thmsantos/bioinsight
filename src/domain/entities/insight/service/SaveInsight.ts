import fs from "node:fs/promises";
import path from "node:path";
import { PDFParse } from "pdf-parse";
import { RepositoryShape } from "../../../../lib/mongoose/interface.ts";
import { InsightData, UploadInsightParams } from "../entity/InsightData.ts";
import { Service } from "../../../interfaces/Service.ts";

class SaveInsightService implements Service<InsightData> {
  private readonly uploadsDir = path.join(process.cwd(), "uploads");

  constructor(
    private readonly repository: RepositoryShape<InsightData>
  ) {}

  public async execute(params: UploadInsightParams): Promise<InsightData | null> {
    const extractedData = await this.extractPdfData(params.buffer);
    if (!extractedData) { throw new Error("extract pdf error") }
    await this.saveFileToDisk(params.filename, params.buffer);

    const insightToCreate: Omit<InsightData, "_id" | "createdAt" | "updatedAt"> = {
      userId: params.userId,
      filename: params.filename,
      ...extractedData,
    };

    const created = await this.repository.create(insightToCreate as InsightData);
    return created;
  }

  private async saveFileToDisk(originalFilename: string, buffer: Buffer): Promise<void> {
    await fs.mkdir(this.uploadsDir, { recursive: true });
    const filePath = path.join(this.uploadsDir, originalFilename);
    await fs.writeFile(filePath, buffer);
  }

  private async extractPdfData(buffer: Buffer) {
    const parser = new PDFParse({ data: buffer });
    const result = await parser.getText();
    const rawText = result.text;
    const text = rawText.replace(/\s+/g, " ");

    const getValue = (regex: RegExp) => {
      const match = text.match(regex);
      if (!match) return null;
      return parseFloat(match[1].replace(",", "."));
    };

    const getBlock = (start: string, end: string) => {
      const regex = new RegExp(`${start}([\\s\\S]*?)${end}`);
      return rawText.match(regex)?.[1] ?? null;
    };

    const extractRealValue = (block: string | null) => {
      if (!block) return null;
      const lines = block.split("\n").map((l) => l.trim()).filter(Boolean);
      const numericLines = lines.filter((l) => /^[\d.]+$/.test(l));
      if (numericLines.length === 0) return null;
      return parseFloat(numericLines[Math.floor(numericLines.length / 2)]);
    };

    const imcBlock = getBlock("IMC \\(kg\\/m²\\)", "PGC");
    const pgcBlock = getBlock("PGC \\(\\%\\)", "Análise da Massa");

    const dateMatch = text.match(/Data\/Hora\s+([\d\/]{10})/)?.[1] ?? null;
    const water = getValue(/Água corporal total \(L\)\s+([\d.]+)/);
    const protein = getValue(/Proteína \(kg\)\s+([\d.]+)/);
    const fatMass = getValue(/Massa de gordura \(kg\)\s+([\d.]+)/);
    const weight = getValue(/Peso \(kg\)\s+([\d.]+)/);
    const imc = extractRealValue(imcBlock);
    const fatPercentage = extractRealValue(pgcBlock);
    const basalRate = getValue(/Taxa metabólica basal\s+([\d.]+)/);
    const visceralFat = getValue(/Nível de Gordura Visceral\s+([\d.]+)/);
    const waistAndHips = getValue(/Relação Cintura-Quadril\s+([\d.]+)/);

    await parser.destroy();

    if (!dateMatch || water === null || weight === null) {
      return null;
    }

    return {
      date: dateMatch,
      water,
      protein: protein ?? 0,
      fatMass: fatMass ?? 0,
      weight,
      bmi: imc ?? 0,
      fatPercentage: fatPercentage ?? 0,
      basalRate: basalRate ?? 0,
      visceralFat: visceralFat ?? 0,
      waistAndHips: waistAndHips ?? 0,
    };
  }
}

export { SaveInsightService };