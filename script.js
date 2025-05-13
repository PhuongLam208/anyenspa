// Tự động load header và footer
function loadLayout() {
  fetch("header.html")
    .then(res => res.text())
    .then(data => {
      document.getElementById("header").innerHTML = data;
      setActiveLink(); // gọi sau khi header được load
    });

  fetch("footer.html")
    .then(res => res.text())
    .then(data => {
      document.getElementById("footer").innerHTML = data;
    });
}

// Gán class active cho link trong header
function setActiveLink() {
  const currentPath = window.location.pathname.split("/").pop() || "index.html";
  document.querySelectorAll("a[data-link]").forEach(link => {
    const href = link.getAttribute("href");
    link.classList.toggle("active", href === currentPath);
  });
}

// Scroll to top
function initBackToTopButton() {
  const btn = document.getElementById("backToTop");
  if (!btn || btn.dataset.bound) return;

  btn.addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  });
  btn.dataset.bound = "true";
}

// Hiện nút khi cuộn xuống
window.onscroll = () => {
  const btn = document.getElementById("backToTop");
  if (btn) {
    btn.style.display = window.scrollY > 200 ? "block" : "none";
  }
};

// Gọi widget Calendly nếu có
function loadCalendly() {
  const calendlyEl = document.querySelector(".calendly-inline-widget");
  if (calendlyEl && typeof Calendly !== "undefined") {
    Calendly.initInlineWidget({
      url: "https://calendly.com/anyenspa?hide_gdpr_banner=1",
      parentElement: calendlyEl,
      prefill: {},
      utm: {}
    });
  }
}

// Khi trang được tải
window.addEventListener("DOMContentLoaded", () => {
  loadLayout();
  initBackToTopButton();

  // Chỉ gọi Calendly nếu có trên trang
  setTimeout(loadCalendly, 300);
});

