import express from "express";
import cors from "cors";
import contactsRoutes from "./routes/contacts.js";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());

app.use(cors());


app.use("/contacts", contactsRoutes);

// Swagger redirect 
app.get("/api-docs", (req, res) => {
  const protocol = req.protocol === "http" ? "https" : req.protocol; 
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
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET,OPTIONS");
  res.sendFile(path.join(__dirname, "swagger.yaml"));
});

app.get("/", (req, res) => {
  res.send("Hello from home page. Swagger API docs: /api-docs");
});


app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
