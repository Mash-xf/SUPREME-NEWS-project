//variable
const API_KEY = "f14f836054c9449fac35521410817c4b";
const button = document.getElementById("fetch-news");
const display = document.getElementById("news-container");
const searchInput = document.getElementById("search");
const categorySelect = document.getElementById("category-select");
const categoryList = document.getElementById("category-list");
const statusText = document.getElementById("news-status");


let currentCategory = "general";
let allArticles = [];

function buildApiUrl(category) {
    return `https://newsapi.org/v2/top-headlines?country=us&category=${category}&pageSize=12&apiKey=${API_KEY}`;
}
function updateActiveCategory(category) {
    currentCategory = category;

    if (categorySelect) {
        categorySelect.value = category;
    }

    if (categoryList) {
        const chips = categoryList.querySelectorAll(".category-chip");
        chips.forEach((chip) => {
            chip.classList.toggle("active", chip.dataset.category === category);
        });
    }
}
function formatCategory(category) {
    return category.charAt(0).toUpperCase() + category.slice(1);
}

