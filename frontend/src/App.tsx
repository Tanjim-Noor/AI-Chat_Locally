import { useState } from "react";
import "./App.css";

interface SubmittedData {
  userMessage: string;
  aiResponse: string;
}

function App() {
  const [inputText, setInputText] = useState<string>("");
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [submittedData, setSubmittedData] = useState<SubmittedData | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Replace with your actual backend API endpoint
      const response = await fetch("http://localhost:5000/api/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ message: inputText }),
      });

      if (!response.ok) throw new Error("Submission failed");
      
      // Parse the response which now includes the AI's response
      const data = await response.json();
      console.log("Response from server:", data);
      console.log("Received AI response:", data.aiResponse);

      setSubmittedData({ userMessage: inputText, aiResponse: data.aiResponse });
      setInputText("");
    } catch (error) {
      console.error("Error submitting form:", error);
      alert("Error submitting form");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="app-container">
      <h1>AI Chat Form</h1>
      <form onSubmit={handleSubmit} className="chat-form">
        <textarea
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          placeholder="Type your message..."
          required
          disabled={isSubmitting}
          className="message-input"
        />
        <button
          type="submit"
          disabled={isSubmitting || !inputText}
          className="submit-button"
        >
          {isSubmitting ? "Sending..." : "Send Message"}
        </button>
      </form>

      {submittedData && (
        <div className="submission-result">
          <h3>Last Submitted Message:</h3>
          <p>{submittedData.userMessage}</p>
          <h3>AI Response:</h3>
          <p>{submittedData.aiResponse}</p>
        </div>
      )}
    </div>
  );
}

export default App;
