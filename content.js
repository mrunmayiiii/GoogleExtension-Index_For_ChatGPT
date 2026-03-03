
console.log("EXTENSION LOADED");

// ===== get user messages =====
function getUserMessages() {
    const msgs = document.querySelectorAll('[data-message-author-role="user"]');
    const arr = [];

    msgs.forEach((msg, i) => {
        const id = "ext-msg-" + i;
        msg.setAttribute("data-ext-id", id);

        arr.push({
            id,
            text: msg.innerText.trim()
        });
    });

    return arr;
}

// ===== scroll =====
function scrollToMessage(id) {
    const el = document.querySelector(`[data-ext-id="${id}"]`);
    if (!el) return;

    el.scrollIntoView({ behavior: "smooth", block: "center" });

    el.style.outline = "3px solid #4f46e5";
    setTimeout(() => (el.style.outline = ""), 1200);
}

// ===== create tiny button =====
function createWidget() {
    if (document.getElementById("ext-widget")) return;

    // main box
    const box = document.createElement("div");
    box.id = "ext-widget";

    Object.assign(box.style, {
        position: "fixed",
        top: "80px",
        left: "8px",
        zIndex: "999999",
        fontFamily: "Arial, sans-serif"
    });

    // button (always visible)
    const btn = document.createElement("div");
    btn.innerText = "📌";
    Object.assign(btn.style, {
        width: "36px",
        height: "36px",
        background: "#4f46e5",
        color: "white",
        borderRadius: "50%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        cursor: "pointer",
        boxShadow: "0 4px 10px rgba(0,0,0,0.2)",
        fontSize: "18px"
    });

    // panel (hidden initially)
    const panel = document.createElement("div");
    panel.id = "ext-panel";

    Object.assign(panel.style, {
        display: "none",
        marginTop: "8px",
        width: "220px",
        maxHeight: "300px",
        overflowY: "auto",
        background: "white",
        border: "1px solid rgba(0,0,0,0.15)",
        borderRadius: "10px",
        padding: "6px",
        boxShadow: "0 8px 20px rgba(0,0,0,0.15)"
    });

    // toggle
    btn.onclick = () => {
        panel.style.display =
            panel.style.display === "none" ? "block" : "none";
        populate(panel);
    };

    box.appendChild(btn);
    box.appendChild(panel);
    document.body.appendChild(box);
}

// ===== populate list =====
function populate(panel) {
    const data = getUserMessages();
    panel.innerHTML = "";

    data.forEach(m => {
        const item = document.createElement("div");
        item.innerText = m.text.substring(0, 60);

        Object.assign(item.style, {
            padding: "6px",
            marginBottom: "4px",
            background: "#f8fafc",
            borderRadius: "6px",
            cursor: "pointer",
            fontSize: "12px",
            border: "1px solid #e5e7eb",
            color: "#111827"
        });

        item.onclick = () => scrollToMessage(m.id);

        panel.appendChild(item);
    });
}

// ===== init (safe delay for ChatGPT SPA) =====
setTimeout(createWidget, 3000);