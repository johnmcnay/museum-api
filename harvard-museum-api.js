const form = document.querySelector("#search");
const input = document.querySelector("#search-text");
const target = document.querySelector("#target");

form.addEventListener("submit", e => {
    e.preventDefault();

    fetch("https://api.harvardartmuseums.org/image?apikey=6c51ae5f-b2b0-4be1-8d80-6225c80ec75c&q=" + input.value)
        .then(response => response.json())
        .then(data => {
            for (let record of data.records) {
                console.log(record);
                let container = document.createElement("div");
                let img = document.createElement("img");
               
                container.style.display = "inline-block";
                /*container.style.width = "200px";
                container.style.height = "500px";*/

                img.src = record.baseimageurl;
               
                container.appendChild(img);

                target.appendChild(container);
            }

        });

});