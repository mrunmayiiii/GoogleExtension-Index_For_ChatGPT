# 📌 ChatGPT Query Index — Chrome Extension

A lightweight Chrome extension that creates a **quick index of your prompts** inside any ChatGPT conversation.
It adds a small floating button on the top-left of the page that expands into a clickable list of your queries for fast navigation.

---

## ✨ Features

* 🔍 Automatically detects your prompts in the current chat
* 📌 Floating top-left widget (non-intrusive)
* ⚡ Smooth scroll to selected query
* 🎯 Temporary highlight of the target message
* 🪶 Lightweight and SPA-safe (works reliably on ChatGPT)
* 🔄 Refreshes list whenever opened
* 🎨 Clean minimal UI

---

## 🧠 How It Works

1. The extension injects a **content script** into ChatGPT pages.
2. After the page loads, a small 📌 button appears in the top-left corner.
3. When clicked:

   * The script scans all user messages.
   * Builds an index list.
4. Clicking any item:

   * Smoothly scrolls to that message.
   * Highlights it briefly.

---

## 📁 Project Structure

```
chatgpt-query-index/
│
├── manifest.json      # Extension configuration
├── content.js         # Core logic + floating widget
├── popup.html         # (Optional) popup UI
├── popup.js           # (Optional) popup logic
└── README.md
```

> Note: The floating index works entirely via `content.js`.

---

## 🚀 Installation (Load Unpacked)

### Step 1 — Download / Clone

Clone this repository or download the ZIP.

```
git clone <your-repo-url>
```

---

### Step 2 — Open Chrome Extensions

Go to:

```
chrome://extensions
```

Enable:

✅ **Developer mode** (top right)

---

### Step 3 — Load Extension

1. Click **Load unpacked**
2. Select the project folder
3. Done ✅

---

### Step 4 — Use It

1. Open any ChatGPT conversation
2. Wait ~3 seconds
3. Look at **top-left corner**
4. Click the 📌 button
5. Select any query → auto scroll 🎉

---

## 🖥️ Supported Sites

* ✅ https://chatgpt.com
* ✅ https://chat.openai.com

---

## ⚙️ Core Implementation

### 🔹 Message Detection

The extension finds user prompts using:

```js
document.querySelectorAll('[data-message-author-role="user"]')
```

Each message is assigned a unique internal ID for navigation.

---

### 🔹 Smooth Scrolling

Navigation uses:

```js
element.scrollIntoView({
  behavior: "smooth",
  block: "center"
});
```

---

### 🔹 SPA Handling

ChatGPT is a Single Page Application, so the extension:

* waits before rendering UI
* builds list on demand
* avoids heavy observers

This keeps it fast and reliable.

---

## 🎨 Customization

### Change widget position

In `content.js`:

```js
top: "80px",
left: "8px",
```

---

### Change text color

Inside the item style:

```js
color: "#111827"
```

---

### Change widget size

Modify:

```js
width: "36px",
height: "36px",
```

---
