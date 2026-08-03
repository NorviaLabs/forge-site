const installCommands = {
  unix: "curl --proto '=https' --tlsv1.2 -LsSf https://raw.githubusercontent.com/NorviaLabs/forge/main/install/forge-installer.sh | sh",
  windows: "irm https://raw.githubusercontent.com/NorviaLabs/forge/main/install/forge-installer.ps1 | iex",
  source: "git clone https://github.com/NorviaLabs/forge.git && cd forge && cargo build --release --locked --package forge-cli",
};

const command = document.querySelector("#install-command");
const copyButton = document.querySelector(".copy-button");

document.querySelectorAll(".install-tab").forEach((tab) => {
  tab.addEventListener("click", () => {
    document.querySelectorAll(".install-tab").forEach((item) => {
      const isActive = item === tab;
      item.classList.toggle("active", isActive);
      item.setAttribute("aria-selected", String(isActive));
    });
    command.textContent = installCommands[tab.dataset.platform];
    copyButton.querySelector("span").textContent = "Copy";
  });
});

copyButton.addEventListener("click", async () => {
  try {
    await navigator.clipboard.writeText(command.textContent);
    copyButton.querySelector("span").textContent = "Copied";
  } catch {
    const selection = window.getSelection();
    const range = document.createRange();
    range.selectNodeContents(command);
    selection.removeAllRanges();
    selection.addRange(range);
  }
});

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        observer.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.12 },
);

document.querySelectorAll(".reveal").forEach((element) => observer.observe(element));
document.querySelector("#year").textContent = new Date().getFullYear();
