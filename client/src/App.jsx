
import { useState } from "react";
import "./App.css";

function App() {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);

  async function sendMessage() {
    if (!message.trim() || loading) return;

    const currentMessage = message.trim();

    // Save previous conversation before adding the new message
    const history = messages.map(({ role, text }) => ({
      role,
      text,
    }));

    const userMessage = {
      role: "user",
      text: currentMessage,
    };

    setMessages((prev) => [...prev, userMessage]);
    setMessage("");
    setLoading(true);

    try {
      const response = await fetch("http://localhost:5000/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          message: currentMessage,
          history,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Request failed");
      }

      setMessages((prev) => [
        ...prev,
        { role: "ai", text: data.reply },
      ]);
    } catch (error) {
      console.error("Chat error:", error);

      setMessages((prev) => [
        ...prev,
        { role: "ai", text: "Something went wrong! Please try again." },
      ]);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="container">
      <h1>🤖 AI Chatbot</h1>

      <div className="chat-box">
        {messages.map((msg, index) => (
          <div
            key={index}
            className={msg.role === "user" ? "user" : "ai"}
          >
            <strong>{msg.role === "user" ? "You" : "AI"}:</strong>
            <p>{msg.text}</p>
          </div>
        ))}

        {loading && <p>🤖 Thinking...</p>}
      </div>

      <input
        type="text"
        placeholder="Ask anything..."
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === "Enter") sendMessage();
        }}
        disabled={loading}
      />

      <button onClick={sendMessage} disabled={loading || !message.trim()}>
        {loading ? "Sending..." : "Send"}
      </button>
    </div>
  );
}

export default App;
