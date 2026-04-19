const API_KEY = "c79fa6ef1f8d0221e4921d394cfde40e";
const display = document.getElementById("news-container");
const search = document.getElementById("search");
const categorySelect = document.getElementById("category-select");
const button = document.getElementById("fetch-news");

let category = "general";
let articles = [];

async function fetchNews(cat) {
    category = cat;
    display.innerHTML = `<p style="color:var(--muted)">Loading news...</p>`;
    try {
        const url = `https://gnews.io/api/v4/top-headlines?category=${cat}&lang=en&max=10&apikey=${API_KEY}`;
        const res = await fetch(url);
        if (!res.ok) {
            const err = await res.json().catch(() => ({}));
            throw new Error(err.errors?.[0] || `HTTP ${res.status}`);
        }
        const data = await res.json();
        articles = data.articles || [];
        render(articles);
    } catch (e) {
        display.innerHTML = `
            <div class="error-box">
                <strong>Could not load news</strong>
                <p>${e.message}</p>
            </div>`;
    }
}

function formatDate(dateStr) {
    if (!dateStr) return "";
    return new Date(dateStr).toLocaleDateString(undefined, {
        month: "short", day: "numeric", year: "numeric"
    });
}

function render(items) {
    if (!items.length) {
        display.innerHTML = "<p>No articles found.</p>";
        return;
    }
    display.innerHTML = items.map(a => `
        <article class="news-article">
            <img
                src="${a.image || ""}"
                alt="${a.title || "News image"}"
                loading="lazy"
                onerror="this.style.display='none'"
            >
            <div class="news-content">
                <small>${a.source?.name || "Unknown source"} &bull; ${formatDate(a.publishedAt)}</small>
                <h3>${a.title || "No title"}</h3>
                <p>${a.description || "No description available."}</p>
                <a href="${a.url}" target="_blank" rel="noopener noreferrer">Read more &rarr;</a>
            </div>
        </article>
    `).join("");
}

button?.addEventListener("click", () => fetchNews(category));
categorySelect?.addEventListener("change", e => fetchNews(e.target.value));
search?.addEventListener("input", e => {
    const term = e.target.value.toLowerCase();
    render(articles.filter(a =>
        a.title?.toLowerCase().includes(term) ||
        a.description?.toLowerCase().includes(term)
    ));
});

fetchNews(category);