const auth = "563492ad6f9170000100000126065727c25d4fd6b3d9510a02fa1c6c";
const gallery = document.querySelector(".gallery");
const mainElement = document.querySelector('main');
const searchInput = document.querySelector(".search-input");
const form = document.querySelector(".search-form");
const more = document.querySelector(".more");
let searchValue;
let page = 1;
let fetchLink;
let currentSearch;

//========================EVENT LISTENERS=============================
// searchInput.addEventListener('input', updateInput);
form.addEventListener('submit', (e) => {
    e.preventDefault();
    searchValue = searchInput.value;
    currentSearch = searchValue;
    searchPhotots(searchValue);
    searchInput.value = "";
});

more.addEventListener("click", loadMore)

//============FUNCTIONS======================
// function updateInput(e) {
//     searchValue = e.target.value;
//     console.log(searchValue)

// }

async function fetchApi(url) {
    const dataFetch = await fetch(url, {
        medthod: "GET",
        headers: {
            Accept: "appliaction/json",
            Authorization: auth
        }
    });
    const data = await dataFetch.json();
    return data
}

function generatePitures(data) {
    data.photos.forEach((photo, index) => {
        console.log(photo);
        const gallerImg = document.createElement('div');
        gallerImg.classList.add('gallery-img');

        gallerImg.innerHTML =
            `<div class="gallery-info">
        <p> ${photo.photographer}</P>
        <a href=${photo.photographer_url} target="_blank">Link</a>
        <a href=${photo.src.original} target="_blank">Dowload</a>
        </div>
        <img src=${photo.src.large}></img>
        <div class="">${index}</div>`;
        gallery.appendChild(gallerImg);

        const gallerdecor = document.createElement('div');
        gallerdecor.classList.add('decor');
        gallerdecor.innerText = index;
        // mainElement.appendChild(gallerdecor);



    });
}
async function curatePhotos() {
    const fetchLink = "https://api.pexels.com/v1/curated?per-page=15&page=1";
    const data = await fetchApi(fetchLink);
    generatePitures(data);

}

async function searchPhotots(query) {
    clear();
    const fetchLink = `https://api.pexels.com/v1/search?query=${query}+query&per_page=15&page=1`;
    const data = await fetchApi(fetchLink);
    generatePitures(data);
}

function clear() {
    gallery.innerHTML = '';
}

async function loadMore() {
    page++;
    if (currentSearch) {
        fetchLink = `https://api.pexels.com/v1/search?query=${currentSearch}+query&per_page=15&page=${page}`
    } else {
        fetchLink = `https://api.pexels.com/v1/curated?per-page=15&page=${page}`;
    }
    const data = await fetchApi(fetchLink)
    generatePitures(data);
}

curatePhotos();

