const API_KEY = "f14f836054c9449fac35521410817c4b";
const display = document.getElementById("news-container");
const search = document.getElementById("search");
const categorySelect = document.getElementById("category-select");
const button = document.getElementById("fetch-news");

let category = "general";
let articles = [];

async function fetchNews(cat) {
    category = cat;
    try {
        const url = `https://newsapi.org/v2/top-headlines?country=us&category=${cat}&pageSize=12&apiKey=${API_KEY}`;
        const res = await fetch(url);
        const data = await res.json();
        articles = data.articles || [];
        render(articles);
    } catch (e) {
        display.innerHTML = "<p>Error loading news</p>";
    }
}

function render(items) {
    display.innerHTML = items.map(a => `
        <article class="news-article">
            <img src="${a.urlToImage}" alt="">
            <div class="news-content">
                <small>${a.source.name}</small>
               <h3>${a.title}</h3>
                <p>${a.description}</p>
                <a href="${a.url}" target="_blank">Read More</a>
            </div>
        </article>
    `).join("");
}

button?.addEventListener("click", () => fetchNews(category));

categorySelect?.addEventListener("change", (e) => {
    categorySelect.value = e.target.value;
    fetchNews(e.target.value);
});

search?.addEventListener("input", (e) => {
    const term = e.target.value.toLowerCase();
    render(articles.filter(a => 
        a.title.toLowerCase().includes(term) || 
        a.description?.toLowerCase().includes(term)
    ));
});

fetchNews(category);