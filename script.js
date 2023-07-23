const API_KEY = "dd15e0294dc0400d9dd793917376b4b9";
const url = "https://newsapi.org/v2/everything?q=";

const notFound = document.getElementById("notFound");
const cardsContainer = document.getElementById("cardsContainer");
const newsCardTemplate = document.getElementById("templateNewsCard");

window.addEventListener('load', () => fetchNews("India"));

// Fetch News from API 
const fetchNews = async (query) => {
    const res = await fetch(`${url}${query}&apikey=${API_KEY}`);
    const data = await res.json();
    console.log(data.articles.length);
    if (data.articles.length === 0) {
        cardsContainer.style.display = 'none';
        notFound.classList.add('error');
        return;
    }
    cardsContainer.style.display = 'flex';
    notFound.classList.remove('error');
    console.log(notFound);
    bindData(data.articles);
}

// Bind Cards with Container 
function bindData(articles) {
    // console.log(cardsContainer);
    // console.log(newsCardTemplate)

    cardsContainer.innerHTML = "";

    articles.forEach((article) => {
        if (!article.urlToImage) {
            return;
        }

        const cardClone = newsCardTemplate.content.cloneNode(true);
        fillDataInCard(cardClone, article);
        cardsContainer.appendChild(cardClone);
    })

}

// Add Data In Card 
function fillDataInCard(cardClone, article) {
    const newsImg = cardClone.querySelector("#newsImg");
    const newsTitle = cardClone.querySelector("#newsTitle");
    const newsSource = cardClone.querySelector("#newsSource");
    const newsDescription = cardClone.querySelector("#newsDescription");

    newsImg.src = article?.urlToImage;
    newsTitle.innerText = article?.title;
    newsDescription.innerText = article?.description;

    const date = new Date(article?.publishedAt).toLocaleString("en-US", {
        timeZone: "Asia/Jakarta"
    });

    newsSource.innerHTML = `${article.source.name} . ${date}`

    cardClone.firstElementChild.addEventListener('click', () => {
        window.open(article.url, "_blank");
    });
}

// Nav Bar Searching News
let curSelectedNav = null;
const onNavItemClick = (id) => {
    fetchNews(id);
    const navItem = document.getElementById(id);
    curSelectedNav?.classList.remove('active');
    curSelectedNav = navItem
    curSelectedNav.classList.add('active');
}

// Search Facility 
const newsInput = document.getElementById('newsInput');
const searchBtn = document.getElementById('searchBtn');

newsInput.addEventListener("keyup", function (event) {
    if (event.keyCode === 13) {
        searchInput();
    }
});

searchBtn.addEventListener('click', () => {
    searchInput()
})

function searchInput() {
    const query = newsInput.value;
    if (!query) return;
    fetchNews(query);
    newsInput.value = "";
    curSelectedNav.classList.remove('active');
    curSelectedNav = null;
}

// Toggle 

const toggleBtn = document.getElementById("toggleBtn");
const closeBtn = document.getElementById("closeBtn");
const navLinks = document.getElementById("navLinks");
const mobileSearch = document.getElementById("mobileSearch");

toggleBtn.addEventListener("click", () => {
    console.log("Event Clicked on Bar");
    navLinks.classList.add("active");
    closeBtn.style.display = "block";
    toggleBtn.style.display = "none";
});

closeBtn.addEventListener("click", () => {
    console.log("Event Clicked on Close");
    navLinks.classList.remove("active");
    closeBtn.style.display = "none";
    toggleBtn.style.display = "block";
});