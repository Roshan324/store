

//
// backend
const imgUrl = "https://localhost:7042/Imgs/";
function fetchData() {
    // Make a GET request using fetch
    return fetch(`https://localhost:7042/Purchases/Get`)
        .then(response => {
            console.log(response)
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            // Parse the JSON data in the response and return it
            return response.json();
        });
}
fetchData()
    .then(data => {
        console.log(data);
        Display(data);
    })
    .catch(error => {
        console.error('Error fetching data:', error);
    });

const dashOrders = document.getElementById("dashOrders");
function Display(data) {
    dashOrders.innerHTML = "";
    if (data != null || data.length !== 0) {
        for (let i = 0; i < data.length; i++){
            dashOrders.innerHTML += `<div class="item1">
                            <h3 class="t-op-nextlvl">${data[i].name}</h3>
                            <h3 class="t-op-nextlvl">${data[i].address}</h3>
                            <h3 class="t-op-nextlvl">${data[i].phoneNumber}</h3>
                            <h3 class="t-op-nextlvl prod"><img src="${imgUrl}${data[i].products[0].img}" width="150px" height="150px"><span>${data[i].products[0].id}</span></h3>
                            <h3 class="t-op-nextlvl prod"><img src="${imgUrl}${data[i].products[1].img}" width="150px" height="150px"><span>${data[i].products[1].id}</span></h3>
                            <h3 class="t-op-nextlvl prod"><img src="${imgUrl}${data[i].products[2].img}" width="150px" height="150px"><span>${data[i].products[2].id}</span></h3>
                            <button class="t-op-nextlvl label-tag" onclick="Delete(${data[i].id})">Delete</button>
                        </div>`
        }
    }
}

function Delete(id) {
    console.log(id);
    function fetchData() {
        return fetch(`https://localhost:7042/Purchases/Delete?id=${id}`, {
            method:"Delete",
        })
            .then(response => {
                console.log(response)
                if (!response.ok) {
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }
                // Parse the JSON data in the response and return it
                return response.json();
            });
    }
    fetchData()
        .then(data => {
            console.log(data);
            Display(data);
        })
        .catch(error => {
            console.error('Error fetching data:', error);
        });
}

// prds//
function ProductsData() {
    // Make a GET request using fetch
    return fetch(`https://localhost:7042/Product/GetAll`)
        .then(response => {
            console.log(response)
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            // Parse the JSON data in the response and return it
            return response.json();
        });
}
ProductsData()
    .then(data => {
        console.log(data);
        DisplayProducts(data);
    })
    .catch(error => {
        console.error('Error fetching data:', error);
    });

const dashProds = document.getElementById("dashProds");
function DisplayProducts(data) {
    dashProds.innerHTML = "";
    for (let i = 0; i < data.length; i++){
        dashProds.innerHTML += `<div class="serv__card">
                <div class="serv__card__img">
                    <img src="${imgUrl}${data[i].img}" alt="">
                </div>
                <div class="serv__card__title">
                    <p>
                        ${data[i].id}
                    </p>
                </div>
            </div>`
    }
}


//add
const imgData = new FormData();

function upload(img) {

    if (img.files[0]) {
        imgData.append("imgUrl", img.files[0]);
        function fetchData() {
            // Make a GET request using fetch
            return fetch(`https://localhost:7042/Product/Add`, {
                method: 'POST',
                body: imgData
            })
                .then(response => {
                    console.log(response)

                    if (!response.ok) {
                        throw new Error(`HTTP error! Status: ${response.status}`);
                    }
                    // Parse the JSON data in the response and return it
                    return response.json();
                });
        }
        fetchData()
            .then(data => {
                console.log(data);
                alert(data);
                
            })
            .catch(error => {
                console.error('Error fetching data:', error);
                
            });
    }

        // imgData.append('img', img.files[0])
    }
    


