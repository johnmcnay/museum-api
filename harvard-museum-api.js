const form = document.querySelector("#search");
const input = document.querySelector("#search-text");
const target = document.querySelector("#target");

form.addEventListener("submit", e => {
    e.preventDefault();

    fetch("https://api.harvardartmuseums.org/image?apikey=6c51ae5f-b2b0-4be1-8d80-6225c80ec75c&q=" + input.value)
        .then(response => response.json())
        .then(data => {

            target.innerHTML = "";

            for (let record of data.records) {
                console.log(record);
                let container = document.createElement("div");
                let img = document.createElement("img");
                let p = document.createElement("div");
               
                container.style.display = "inline-block";

                img.src = record.baseimageurl;
                //p.textContent = record.description;
               
                container.appendChild(img);

                target.appendChild(container);
            }

        });

});