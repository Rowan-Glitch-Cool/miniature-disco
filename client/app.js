const userId = "user1";

async function send() {
    const input = document.getElementById("input");
    const msg = input.value;

    add("You: " + msg);

    const res = await fetch("http://localhost:3000/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: msg, userId })
    });

    const data = await res.json();

    add("Bot: " + data.reply);

    input.value = "";
}

function add(text) {
    const div = document.getElementById("messages");
    div.innerHTML += "<div>" + text + "</div>";
}
