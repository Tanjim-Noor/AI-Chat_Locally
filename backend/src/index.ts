import express from "express";
import { Request, Response } from "express";
import cors from "cors";

const app = express();
const port = 5000;

// Middleware
app.use(cors());
app.use(express.json());

// In-memory storage for messages
let messages: string[] = [];

// Root endpoint for health check
app.get("/", (req: Request, res: Response) => {
  res.send("Chat backend is running");
});

// POST endpoint to handle form submissions
app.post("/api/submit", (req: Request, res: Response) => {
  const { message } = req.body;

  if (!message) {
    res.status(400).send("Message is required");
    return;
  }

  // Store the message in memory
  messages.push(message);

  res.json({
    success: true,
    message: "Message received successfully",
    receivedMessage: message,
  });
});

// Start the server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});