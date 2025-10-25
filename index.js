import express from "express";
import contactsRoutes from "./routes/contacts.js";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());

// API routes
app.use("/contacts", contactsRoutes);

// Swagger redirect (fix included)
app.get("/api-docs", (req, res) => {
  const protocol = req.protocol === "http" ? "https" : req.protocol; // mixed content fix
  res.redirect(
    "https://petstore.swagger.io/?url=" +
      protocol +
      "://" +
      req.get("host") +
      "/swagger.yaml"
  );
});

// Serve swagger.yaml
app.get("/swagger.yaml", (req, res) => {
  res.sendFile(path.join(__dirname, "swagger.yaml"));
});

// Root route
app.get("/", (req, res) => {
  res.send("Hello from home page. Swagger API docs: /api-docs");
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
