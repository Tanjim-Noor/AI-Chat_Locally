import express from "express";
import { Request, Response } from "express";
import cors from "cors";
import axios from "axios";  // Changed from node-fetch

const app = express();
const port = 5000;

app.use(cors());
app.use(express.json());

app.get("/", (req: Request, res: Response) => {
  res.send("Chat backend is running");
});

app.post("/api/submit", async (req: Request, res: Response) => {
  const { message } = req.body;

  if (!message) {
    res.status(400).send("Message is required");
  }

  try {
    // Axios request to Ollama
    const response = await axios.post("http://127.0.0.1:11434/api/generate", {
      model: "deepseek-r1:latest",
      prompt: message,
      stream: false
    });

    res.json({
      success: true,
      userMessage: message,
      aiResponse: response.data.response
    });

  } catch (error: any) {
    console.error("Backend error:", error);
    const status = error.response?.status || 500;
    const message = error.response?.data?.error || "Failed to get AI response";
    res.status(status).json({ success: false, error: message });

  }
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});