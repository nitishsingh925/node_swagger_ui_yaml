import swaggerUi from "swagger-ui-express";
import YAML from "yamljs";
import { fileURLToPath } from "url";
import path from "path";
import fs from "fs";

// Get __dirname equivalent
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Recursive function to get all YAML files from a directory and its subdirectories
const getAllYamlFiles = (dir) => {
  let yamlFiles = [];

  const files = fs.readdirSync(dir);

  files.forEach((file) => {
    const fullPath = path.join(dir, file);
    if (fs.statSync(fullPath).isDirectory()) {
      yamlFiles = yamlFiles.concat(getAllYamlFiles(fullPath));
    } else if (file.endsWith(".yaml")) {
      yamlFiles.push(fullPath);
    }
  });

  return yamlFiles;
};

// Load and merge all YAML files
const loadYamlFiles = (dir) => {
  const yamlFiles = getAllYamlFiles(dir);
  let mergedDoc = YAML.load(path.join(dir, "./swagger.yaml"));

  yamlFiles.forEach((file) => {
    if (
      file !== path.join(dir, "base.yaml") &&
      file !== path.join(dir, "swagger.yaml")
    ) {
      const doc = YAML.load(file);
      mergedDoc.paths = { ...mergedDoc.paths, ...doc.paths };
    }
  });

  return mergedDoc;
};

// Load and merge all YAML files
const swaggerDocument = loadYamlFiles(path.join(__dirname, "../../"));

// Setup the Swagger UI
const swaggerConfig = (app) => {
  app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));
};

export default swaggerConfig;
