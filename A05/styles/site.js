function toggleTheme() {
    const html = document.documentElement;
    const btn = document.getElementById("modeBtn");
    const isDark = html.getAttribute("data-bs-theme") === "dark";
    html.setAttribute("data-bs-theme", isDark ? "light" : "dark");
    btn.innerHTML = isDark
        ? '<i class="bi bi-moon-stars me-1"></i>Dark Mode'
        : '<i class="bi bi-sun-fill me-1"></i>Light Mode';
}

const BUCKET_LIST_KEY = "a05-bucket-list";

function getBucketList() {
    try {
        return JSON.parse(localStorage.getItem(BUCKET_LIST_KEY)) || [];
    } catch {
        return [];
    }
}

function setBucketList(list) {
    localStorage.setItem(BUCKET_LIST_KEY, JSON.stringify(list));
}

function isSaved(id) {
    return getBucketList().includes(id);
}

function toggleSaved(id) {
    const list = getBucketList();
    const index = list.indexOf(id);
    if (index === -1) {
        list.push(id);
    } else {
        list.splice(index, 1);
    }
    setBucketList(list);
    updateSavedBadge();
    return list.includes(id);
}

function updateSavedBadge() {
    const badge = document.getElementById("savedCount");
    if (badge) {
        badge.textContent = getBucketList().length;
    }
}

function initRevealAnimations() {
    const targets = document.querySelectorAll(".reveal");
    if (!targets.length) return;
    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                entry.target.classList.add("is-visible");
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.15 });
    targets.forEach((el) => observer.observe(el));
}

function initSaveHearts() {
    document.querySelectorAll("[data-save-id]").forEach((btn) => {
        const id = btn.dataset.saveId;
        const applyState = () => {
            const saved = isSaved(id);
            btn.classList.toggle("saved", saved);
            if (btn.classList.contains("btn-save")) {
                btn.innerHTML = saved
                    ? '<i class="bi bi-heart-fill me-1"></i>Saved to Bucket List'
                    : '<i class="bi bi-heart me-1"></i>Save to Bucket List';
            } else {
                btn.innerHTML = saved ? '<i class="bi bi-heart-fill"></i>' : '<i class="bi bi-heart"></i>';
            }
        };
        applyState();
        btn.addEventListener("click", (e) => {
            e.preventDefault();
            e.stopPropagation();
            toggleSaved(id);
            applyState();
        });
    });
    updateSavedBadge();
}

function initSearchFilter() {
    const input = document.getElementById("destinationSearch");
    if (!input) return;
    const cards = document.querySelectorAll("[data-destination-name]");
    const noResults = document.getElementById("noResults");

    input.addEventListener("input", () => {
        const query = input.value.trim().toLowerCase();
        let visibleCount = 0;
        cards.forEach((card) => {
            const name = card.dataset.destinationName.toLowerCase();
            const match = name.includes(query);
            card.closest(".col-lg-4, .col-md-6").classList.toggle("d-none", !match);
            if (match) visibleCount++;
        });
        if (noResults) noResults.classList.toggle("show", visibleCount === 0);
    });
}

document.addEventListener("DOMContentLoaded", () => {
    initRevealAnimations();
    initSaveHearts();
    initSearchFilter();
});
