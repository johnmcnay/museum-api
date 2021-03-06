const form = document.querySelector("#search");
const input = document.querySelector("#search-text");
const target = document.querySelector("#target");
const previous = document.querySelector("#previous-page");
const next = document.querySelector("#next-page");
const nav = document.querySelector("#nav");
const page = document.querySelector("#page");

let currentPage = 1;
let query;
let totalPages;

form.addEventListener("submit", e => {
    e.preventDefault();

    //reset values
    pages = [];
    currentPage = 1;
    query = input.value;

    getData(input.value);

});

previous.addEventListener("click", () => {
    hideImages();

    currentPage--;

    showImages();
    checkButtons();
    updatePageNumber();

});


next.addEventListener("click", () => {
    hideImages();
    
    currentPage++;

    showImages();
    checkButtons();
    updatePageNumber();

});

function checkButtons() {

    next.disabled = false;
    previous.disabled = false;

    if (currentPage === 1) {
        previous.disabled = true;
    }
    if (currentPage >= totalPages) {
        next.disabled = true;
    }
}

function showImages() {

    if (pages[currentPage - 1]) {
        let reveal = document.querySelectorAll(".page" + currentPage);
        for (let element of reveal) {
            element.style.display = "inline-block";
        }
    } else {
        getData();
    }
}

function hideImages() {
    let elements = document.querySelectorAll(".page" + currentPage);

    for (let element of elements) {
        element.style.display = "none";
    }
}

function updatePageNumber() {
    page.textContent = "Page " + currentPage;
}

function getData() {
    fetch("https://api.harvardartmuseums.org/image?apikey=6c51ae5f-b2b0-4be1-8d80-6225c80ec75c&q=description:" + query + "&page=" + currentPage)
        .then(response => response.json())
        .then(data => {
            console.log(data);
            totalPages = data.info.pages;
            if (currentPage === 1) {
                target.innerHTML = "";
            }
            nav.style["visibility"] = "visible";
            pages[currentPage - 1] = true;

            if (totalPages === 1) {
                next.disabled = true;
                previous.disabled = true;
            }


            for (let record of data.records) {
                let container = document.createElement("div");
                let img = document.createElement("img");
                let p = document.createElement("div");
                container.classList.add("page" + currentPage);

                container.style.display = "inline-block";

                img.src = record.baseimageurl;
                //p.textContent = record.description;

                container.appendChild(img);

                target.appendChild(container);
            }

        });
}