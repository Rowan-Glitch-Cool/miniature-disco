import express from "express";
import cors from "cors";
import { searchWeb } from "./search.js";
import { getMemory, saveMemory } from "./memory.js";

const app = express();
app.use(cors());
app.use(express.json());

app.post("/chat", async (req, res) => {
    const { message, userId } = req.body;

    // 1. get stored memory
    const memory = getMemory(userId);

    // 2. search web
    const results = await searchWeb(message);

    // 3. build response (simple summarizer)
    const summary = `
Topic: ${message}

What I found:
${results.map(r => "- " + r).join("\n")}

Memory from past chats:
${memory.join("\n") || "No prior memory."}
    `;

    // 4. save memory ("learning")
    saveMemory(userId, message);

    res.json({ reply: summary });
});

app.listen(3000, () => console.log("Server running on http://localhost:3000"));
