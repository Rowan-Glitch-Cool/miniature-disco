import fs from "fs";

const FILE = "./memory.json";

function load() {
    if (!fs.existsSync(FILE)) return {};
    return JSON.parse(fs.readFileSync(FILE));
}

export function getMemory(userId) {
    const db = load();
    return db[userId] || [];
}

export function saveMemory(userId, message) {
    const db = load();

    if (!db[userId]) db[userId] = [];

    db[userId].push(message);

    // keep last 20 memories
    db[userId] = db[userId].slice(-20);

    fs.writeFileSync(FILE, JSON.stringify(db, null, 2));
}
