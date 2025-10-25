import express from "express";
import contactsRoutes from "./routes/contacts.js";
import path from "path";
import { fileURLToPath } from "url";
import YAML from "yamljs";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const swaggerDocumentPath = path.join(__dirname, "swagger.yaml");

const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());

app.use("/contacts", contactsRoutes);

app.get("/api-docs", (req, res) => {
  res.redirect(
    "https://petstore.swagger.io/?url=" +
      req.protocol +
      "://" +
      req.get("host") +
      "/swagger.yaml"
  );
});

app.get("/swagger.yaml", (req, res) => {
  res.sendFile(swaggerDocumentPath);
});

app.get("/", (req, res) => {
  res.send("Hello from home page. Swagger API docs: /api-docs");
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
