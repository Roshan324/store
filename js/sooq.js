let products = [
  "./assets/296e5cc7-7acb-40f1-b440-877c49db1cb3.jpeg",
  "./assets/1db3ef0d-29b1-4e06-af4f-63040c8e6262.jpeg",
  "./assets/788b9ce6-d285-44ee-b81d-dc7eaae9b1a1 (1).jpeg",
  "./assets/b50e4fc6-038d-469a-868c-4f17914b88e4 (1).jpeg",
  "./assets/867f1695-a79c-4eb2-ac66-3f28a07fd78b.jpeg",
  "./assets/87087f62-fa06-4601-be4f-c45750b0176f.jpeg",
  "./assets/924a7e33-d6f1-4783-aa2e-bc748a17accb.jpeg",
  "./assets/9869db30-3826-455b-b933-3eb2755337d6.jpeg",
  "./assets/a0e781be-ffe5-42d7-9894-256d2a8d7853.jpeg",
  "./assets/b0a643e9-9a1b-4023-8a7e-3afa65ac953a.jpeg",
]
let cards = document.getElementById("cards");
const imgUrl = "https://localhost:7042/Imgs/";


// backend
function fetchData() {
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
fetchData()
    .then(data => {
      console.log(data);
      Display(data);
    })
    .catch(error => {
        console.error('Error fetching data:', error);
    });

function Display(data) {
  cards.innerHTML = "";
  if (data == null || data.length === 0) {
    for (let i = 0; i < products.length; i++){
      cards.innerHTML += `<div class="product">
        <img class="prodImg" src="${products[i]}" />
        <button class="btn">اشترى الان</button>
      </div>`
    }
  } else
  {
    for (let i = 0; i < data.length; i++){
      cards.innerHTML += `<div class="product">
        <img class="prodImg" src="${imgUrl}${data[i].img}" />
        <button class="btn" id="${data[i].id}" onclick="buy(${data[i].id})">اشترى الان</button>
        
      </div>`
    }
    
  }
}

function buy(id) {
  console.log(id);
  let ordersArr = JSON.parse(localStorage.getItem("orders")) || [];
  let index = ordersArr.indexOf(id);
  if (index !== -1) {
    ordersArr.splice(index, 1);
    localStorage.setItem("orders", JSON.stringify(ordersArr));
    let clickedButton = document.getElementById(id);
    if (clickedButton) {
      clickedButton.classList.remove("clickedButton");
    }
    return;
  }
  ordersArr.push(id);
  localStorage.setItem("orders", JSON.stringify(ordersArr));
  for (let i = 0; i < ordersArr.length; i++){
    let item = document.getElementById(ordersArr[i])
    item.classList.add("clickedButton");
  }
}

let Order = new FormData();
let submit = document.getElementById("submit");
submit.addEventListener("click", function (e) {
  e.preventDefault();
  let ordersArr = JSON.parse(localStorage.getItem("orders")) || [];
  if (ordersArr.length < 3 || ordersArr.length > 3) {
    alert("Please Select Three Products");
    return;
  }
  console.log(ordersArr);
  let Name = document.getElementById("name");
  let Address = document.getElementById("address");
  let PhoneNo = document.getElementById("phone");
  Order.append('Name', Name.value);
  Order.append('Address', Address.value);
  Order.append('PhoneNo', PhoneNo.value);
  Order.append('prdId', ordersArr);
  console.log("prdId:", ordersArr);
  SetData();
})


function SetData() {
  // backend
  function fetchData() {
    // Make a GET request using fetch
    return fetch(`https://localhost:7042/Purchases/Add`, {
      method: 'POST',
      body: Order
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
      localStorage.removeItem("orders")
    })
    .catch(error => {
      console.error('Error fetching data:', error);
    });
}

























// let sliderImages = document.querySelectorAll(".slide"),
//   arrowLeft = document.querySelector("#arrow-left"),
//   arrowRight = document.querySelector("#arrow-right"),
//   current = 0;

// // Clear all images
// function reset() {
//   for (let i = 0; i < sliderImages.length; i++) {
//     sliderImages[i].style.display = "none";
//   }
// }

// // Init slider
// function startSlide() {
//   reset();
//   sliderImages[0].style.display = "block";
// }

// // Show prev
// function slideLeft() {
//   reset();
//   sliderImages[current - 1].style.display = "block";
//   current--;
// }

// // Show next
// function slideRight() {
//   reset();
//   sliderImages[current + 1].style.display = "block";
//   current++;
// }

// // Left arrow click
// arrowLeft.addEventListener("click", function() {
//   if (current === 0) {
//     current = sliderImages.length;
//   }
//   slideLeft();
// });

// // Right arrow click
// arrowRight.addEventListener("click", function() {
//   if (current === sliderImages.length - 1) {
//     current = -1;
//   }
//   slideRight();
// });

// startSlide();
