const app = document.querySelector(".produits")
const boutonTeddy = document.querySelector(".liste-selection__btn-teddy")
const boutonCamera = document.querySelector(".liste-selection__btn-camera")
const boutonFurniture = document.querySelector(".liste-selection__btn-furniture")


const tabTeddy = []
const tabCamera = []
const tabFurniture = []


const apiTeddy = "http://localhost:3000/api/teddies"
const apiCamera = "http://localhost:3000/api/cameras"
const apiFurniture = "http://localhost:3000/api/furniture"


fetch(apiTeddy)
  .then(blob => blob.json())
  .then(data => tabTeddy.push(...data))

fetch(apiCamera)
  .then(blob => blob.json())
  .then(data => tabCamera.push(...data))

fetch(apiFurniture)
  .then(blob => blob.json())
  .then(data => tabFurniture.push(...data))

function afficher(tableau) {

  const html = tableau.map(produit => {
    return `
    <article class="produit" data-key="${produit._id}">
                        <img class="produit__image" src="${produit.imageUrl}" alt="image" class="produit__image">
                        <div class="produit-description">
                        <h3 class="produit-description__titre">${produit.name}</h3>
                        <p class="produit-description__description">${produit.description}</p>
                        <strong class="produit-description__prix">${produit.price/100} €</strong>
                        </div>
                    </article>
    `
  }).join("")

  app.innerHTML = html

}

function remove() {
  while (app.firstChild) {
    app.removeChild(app.firstChild);
  }
}

boutonTeddy.addEventListener("click", function (e) {
  boutonTeddy.classList.toggle("liste-selection__btn-teddy--actif")
  boutonCamera.classList.remove("liste-selection__btn-camera--actif")
  boutonFurniture.classList.remove("liste-selection__btn-furniture--actif")
  if (boutonTeddy.getAttribute("class") == "liste-selection__btn-teddy") {
    remove()
  } else {
    afficher(tabTeddy)
    const produits = document.getElementsByClassName("produit")
    console.log(produits)
    //    let produit = document.getElementsByClassName("produit")
    //let p = [...produit]
    //p.map(element => console.log(element.getAttribute("data-key")));
  }
})

boutonCamera.addEventListener("click", function (e) {
  boutonCamera.classList.toggle("liste-selection__btn-camera--actif")
  boutonTeddy.classList.remove("liste-selection__btn-teddy--actif")
  boutonFurniture.classList.remove("liste-selection__btn-furniture--actif")
  if (boutonCamera.getAttribute("class") == "liste-selection__btn-camera") {
    remove()
  } else {
    afficher(tabCamera)
    const produits = document.getElementsByClassName("produit")
    console.log(produits)
    //    let produit = document.getElementsByClassName("produit")
    //let p = [...produit]
    //p.map(element => console.log(element.getAttribute("data-key")));
  }
})

boutonFurniture.addEventListener("click", function (e) {
  boutonFurniture.classList.toggle("liste-selection__btn-furniture--actif")
  boutonTeddy.classList.remove("liste-selection__btn-teddy--actif")
  boutonCamera.classList.remove("liste-selection__btn-camera--actif")
  if (boutonFurniture.getAttribute("class") == "liste-selection__btn-furniture") {
    remove()
  } else {
    afficher(tabFurniture)
    const produits = document.getElementsByClassName("produit")
    console.log(produits)
    //    let produit = document.getElementsByClassName("produit")
    //let p = [...produit]
    //p.map(element => console.log(element.getAttribute("data-key")));
  }
})




//let produit = document.getElementsByClassName("produit")
//let p = [...produit]






















// const app = document.querySelector(".produits")
// const boutons = document.querySelector(".liste-selection__btn-teddy")


// const tabTeddy = []
// const tabCamera = []
// const tabFurniture = []


// const apiTeddy = "http://localhost:3000/api/teddies"
// const apiCamera = "http://localhost:3000/api/cameras"
// const apiFurniture = "http://localhost:3000/api/furniture"


// fetch(apiTeddy)
//   .then(blob => blob.json())
//   .then(data => tabTeddy.push(...data))

// fetch(apiCamera)
//   .then(blob => blob.json())
//   .then(data => tabCamera.push(...data))

// fetch(apiFurniture)
//   .then(blob => blob.json())
//   .then(data => tabFurniture.push(...data))

// function afficher(tableau) {

//   const html = tableau.map(produit => {
//     return `
//     <article class="produit" data-key="${produit._id}">
//                         <img class="produit__image" src="${produit.imageUrl}" alt="image" class="produit__image">
//                         <div class="produit-description">
//                         <h3 class="produit-description__titre">${produit.name}</h3>
//                         <p class="produit-description__description">${produit.description}</p>
//                         <strong class="produit-description__prix">${produit.price/100} €</strong>
//                         </div>
//                     </article>
//     `
//   }).join("")

//   app.innerHTML = html

// }

// function remove() {
//   while (app.firstChild) {
//     app.removeChild(app.firstChild);
//   }
// }

// boutons.addEventListener("click", function (e) {
//   boutons.classList.toggle("liste-selection__btn-teddy--actif")
//   if (boutons.getAttribute("class") == "liste-selection__btn-teddy") {
//     remove()
//   } else {
//     afficher(tabTeddy)
//     const produits = document.getElementsByClassName("produit")
//     console.log(produits)
//     //    let produit = document.getElementsByClassName("produit")
//     //let p = [...produit]
//     //p.map(element => console.log(element.getAttribute("data-key")));
//   }
// })

// //let produit = document.getElementsByClassName("produit")
// //let p = [...produit]