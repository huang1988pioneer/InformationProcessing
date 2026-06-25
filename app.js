const targetButtons = document.querySelectorAll("[data-target]");

targetButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const target = document.getElementById(button.dataset.target);
    if (target) {
      target.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  });
});

document.querySelectorAll(".copy-button").forEach((button) => {
  button.addEventListener("click", async () => {
    const source = document.getElementById(button.dataset.copy);
    const text = source ? source.innerText.trim() : "";

    try {
      await navigator.clipboard.writeText(text);
      button.textContent = "已複製";
      setTimeout(() => {
        button.textContent = "複製 SQL";
      }, 1400);
    } catch {
      button.textContent = "請手動複製";
      setTimeout(() => {
        button.textContent = "複製 SQL";
      }, 1800);
    }
  });
});

const sections = [...document.querySelectorAll(".question")];
const tocButtons = [...document.querySelectorAll(".toc button")];

const observer = new IntersectionObserver(
  (entries) => {
    const visible = entries
      .filter((entry) => entry.isIntersecting)
      .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];

    if (!visible) return;

    tocButtons.forEach((button) => {
      button.classList.toggle("active", button.dataset.target === visible.target.id);
    });
  },
  { rootMargin: "-20% 0px -55% 0px", threshold: [0.2, 0.5, 0.8] },
);

sections.forEach((section) => observer.observe(section));
