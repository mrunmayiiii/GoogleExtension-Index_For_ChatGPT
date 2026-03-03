let currentTabId = null;

chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
    currentTabId = tabs[0].id;

    chrome.tabs.sendMessage(
        currentTabId,
        { type: "GET_MSGS" },
        function (res) {
            if (chrome.runtime.lastError) {
                showError("Open a ChatGPT conversation first.");
                return;
            }

            let ul = document.getElementById("list");
            ul.innerHTML = "";

            if (!res || res.length === 0) {
                showError("No queries found.");
                return;
            }

            res.forEach(msg => {
                let li = document.createElement("li");
                li.className = "query-item";
                li.innerText = msg.text.substring(0, 70);

                // ⭐ click handler
                li.onclick = () => {
                    chrome.tabs.sendMessage(currentTabId, {
                        type: "SCROLL_TO",
                        id: msg.id
                    });
                };

                ul.appendChild(li);
            });
        }
    );
});

function showError(text) {
    let ul = document.getElementById("list");
    ul.innerHTML = "";
    let li = document.createElement("li");
    li.innerText = text;
    ul.appendChild(li);
}