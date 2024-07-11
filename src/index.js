import express from "express";
import swaggerConfig from "./utils/swaggerConfig.js";

const app = express();

// Use the swagger config function
swaggerConfig(app);

// Example route
app.get("/example", (req, res) => {
  res.send("Example response");
});

// Dummy route 1
app.get("/dummy1", (req, res) => {
  res.send("Dummy 1 response");
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
  console.log(`Swagger docs available at http://localhost:${PORT}/api-docs`);
});
