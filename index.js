// déclaration des variables globales 
// déclaration des variables globales 
// déclaration des variables globales 

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


// On appelle la fonction getProduits pour récupérer le catalogue de chaque type de produit puis on les stoks dans un tableau pour les traiter 
// On appelle la fonction getProduits pour récupérer le catalogue de chaque type de produit puis on les stoks dans un tableau pour les traiter 
// On appelle la fonction getProduits pour récupérer le catalogue de chaque type de produit puis on les stoks dans un tableau pour les traiter 


const getProduits = async function (api,tableau) {
  try {
    let response = await fetch(api)
    if(response.ok) {
      let data = await response.json()
      tableau.push(...data)
    } else {
      console.error(response.status)
    }
  } catch (e) {
    console.log(e)

  }
}

getProduits(apiTeddy,tabTeddy)
getProduits(apiCamera,tabCamera)
getProduits(apiFurniture,tabFurniture)

  // fonction pour créer le code html et afficher les produits sur la section (on lui passe en parametre le tableau d'objet à traiter) 
// fonction pour créer le code html et afficher les produits sur la section (on lui passe en parametre le tableau d'objet à traiter) 
// fonction pour créer le code html et afficher les produits sur la section (on lui passe en parametre le tableau d'objet à traiter)

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

// Fonction qui retire les produits du code html
// Fonction qui retire les produits du code html 
// Fonction qui retire les produits du code html

function remove() {
  while (app.firstChild) {
    app.removeChild(app.firstChild);
  }
}


// Logique de la page index si on clique sur une gamme de produit et que le bouton est actif on charge les éléments du tableau pour les afficher et si l'élément est inactif on applique la fonction remove() pour enlever les éléments 
// Logique de la page index si on clique sur une gamme de produit et que le bouton est actif on charge les éléments du tableau pour les afficher et si l'élément est inactif on applique la fonction remove() pour enlever les éléments 
// Logique de la page index si on clique sur une gamme de produit et que le bouton est actif on charge les éléments du tableau pour les afficher et si l'élément est inactif on applique la fonction remove() pour enlever les éléments

boutonTeddy.addEventListener("click", function (e) {
  boutonTeddy.classList.toggle("liste-selection__btn-teddy--actif")
  boutonCamera.classList.remove("liste-selection__btn-camera--actif")
  boutonFurniture.classList.remove("liste-selection__btn-furniture--actif")
  if (boutonTeddy.getAttribute("class") == "liste-selection__btn-teddy") {
    remove()
  } else {
    afficher(tabTeddy)
    const produits = document.getElementsByClassName("produit")
    const produitSinglePage = [...produits]
    produitSinglePage.forEach(element => element.addEventListener("click", function(e) {
      const adresse = element.getAttribute("data-key")

      window.location = `produit.html?produit=teddies&id=${adresse}`
    }));
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
    const produitSinglePage = [...produits]
    produitSinglePage.forEach(element => element.addEventListener("click", function(e) {
      const adresse = element.getAttribute("data-key")

      window.location = `produit.html?produit=cameras&id=${adresse}`
    }));
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
    const produitSinglePage = [...produits]
    produitSinglePage.forEach(element => element.addEventListener("click", function(e) {
      const adresse = element.getAttribute("data-key")

      window.location = `produit.html?produit=furniture&id=${adresse}`
    }));

  }
})
