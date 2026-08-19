import pino from "pino";
import fs from "node:fs";
import path from "node:path";

const today = new Date().toLocaleDateString("pt-BR").replace(/\//g, "-");
const infoPath = path.resolve(process.cwd(), "logs", "info", `info-${today}.log`);
const errorPath = path.resolve(process.cwd(), "logs", "error", `error-${today}.log`);

fs.mkdirSync(path.dirname(infoPath), { recursive: true });
fs.mkdirSync(path.dirname(errorPath), { recursive: true });

const infoStream = pino.destination({ dest: infoPath, sync: false });

const errorStream = pino.destination({ dest: errorPath, sync: false });

export const logger = pino(
  { level: "info" },
  pino.multistream([
    { level: "info", stream: infoStream },
    { level: "error", stream: errorStream },
    { level: "info", stream: process.stdout },
  ])
);