import fs from "fs";
import path from "path";

const projectPath = process.cwd();

function createPath(filePath) {
  fs.mkdirSync(filePath, { recursive: true }, (err) => {
    if (err) throw err;
  });
}

export function readFile(filePath, name) {
  try {
    const fullPath = path.join(projectPath, filePath);
    if (!fs.existsSync(fullPath)) {
      createPath(fullPath);
      fs.writeFileSync(fullPath + name, JSON.stringify({}));
      return {};
    }
    return JSON.parse(fs.readFileSync(fullPath + name));
  } catch {
    throw new Error("Dump file is not readed");
  }
}

export function writeFile(filePath, name, data) {
  try {
    const fullPath = path.join(projectPath, filePath);
    if (!fs.existsSync(fullPath)) {
      createPath(fullPath);
    }

    fs.writeFileSync(fullPath + name, JSON.stringify(data));
  } catch {
    throw new Error("Dump file is not wroted");
  }
}
