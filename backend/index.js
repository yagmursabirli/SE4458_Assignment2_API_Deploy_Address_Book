//index.js
import express from "express";
import contactsRoutes from './routes/contacts.js';

//swagger imports
import swaggerUi from 'swagger-ui-express';
import YAML from 'yamljs';

const swaggerDocument = YAML.load('./swagger.yaml');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.use('/contacts', contactsRoutes);

//routers

app.get("/", (req, res) => {
res.send("Hello from home page. Swagger API docs: /api-docs");
});

app.listen(PORT, () => {
  console.log(`server running on port: http://localhost:${PORT}`);
});
