const boutonViderPanier = document.querySelector(".boutons-panier__vider-panier")
const boutonContinuerAchats = document.querySelector(".boutons-panier__continuer-achats")
const boutonCommander = document.querySelector(".commande__bouton")
const app = document.querySelector(".panier")
const lienPanier = document.querySelector(".header__panier")
const panier = []
let totalPanier = 0



for (let i = 0; i < localStorage.length; i++) {

  panier.push(JSON.parse(localStorage.getItem(localStorage.key(i))))

}

for (let i = 0; i < panier.length; i++) {
  totalPanier += panier[i].quantite
}



lienPanier.innerHTML = `Mon Panier(${totalPanier})`

if (totalPanier !== 0) {

  const html = panier.map(produit => {
    return `
      <article class="ligne-panier" >
                          <img class="ligne-panier__image" src="${produit.urlImage}" alt="image" class="produit__image">
                          <div class="ligne-panier-description">
                          <h3 class="ligne-panier-description__titre">${produit.titre}</h3>
                          <strong class="ligne-panier-description__quantitee">quantitée : (${produit.quantite})</strong>
                          <strong class="ligne-panier-description__prix">Total : ${(produit.price)*produit.quantite} €</strong>
                          </div>
                          <div class="ligne-panier-boutons">
                          <input class="ligne-panier-boutons__vider-panier" type="button" data-key="${produit.id}" value="Supprimer l'article du panier">
                          <input class="ligne-panier-boutons__modifier" type="button" data-key="${produit.id}" data-produit="${produit.produit}"value="Modifier la séléction">
                          </div>
                      </article>
      `
  }).join("")

  app.innerHTML = html





}
const boutonSupprimerArticle = document.querySelectorAll(".ligne-panier-boutons__vider-panier")
const boutonModifierArticle = document.querySelectorAll(".ligne-panier-boutons__modifier")

boutonSupprimerArticle.forEach(bouton => bouton.addEventListener("click", function (e) {
  const id = bouton.getAttribute("data-key")
  localStorage.removeItem(id)
  window.location = "panier.html"
}))

boutonModifierArticle.forEach(bouton => bouton.addEventListener("click", function (e) {
  const id = bouton.getAttribute("data-key")
  const produit = bouton.getAttribute("data-produit")
  window.location = `produit.html?produit=${produit}&id=${id}`

}))

boutonViderPanier.addEventListener("click", function (e) {
  localStorage.clear()
  window.location = "panier.html"
})

boutonContinuerAchats.addEventListener("click", function (e) {
  window.location = "index.html"

})



boutonCommander.addEventListener("click", function (e) {

  const nom = document.querySelector(".commande-formulaire__nom")
  const prenom = document.querySelector(".commande-formulaire__prenom")
  const adresse = document.querySelector(".commande-formulaire__adresse")
  const ville = document.querySelector(".commande-formulaire__ville")
  const email = document.querySelector(".commande-formulaire__email")
  class Contact {
    constructor(firstName, lastName, address, city, email) {
      this.firstName = firstName
      this.lastName = lastName
      this.address = address
      this.city = city
      this.email = email

    }
  }
  class Order {
    constructor(contact, products) {
      this.contact = contact
      this.products = products
    }
  }
  e.preventDefault()
  const newContact = new Contact(prenom.value, nom.value, adresse.value, ville.value, email.value)
  console.log(newContact)

  const tableauOrderTeddies = []
  const tableauOrderCameras = []
  const tableauOrderFurniture = []
  const orderTeddy = new Order(newContact, tableauOrderTeddies)
  const orderCamera = new Order(newContact, tableauOrderCameras)
  const orderFurniture = new Order(newContact, tableauOrderFurniture)

  panier.map(element => {
    if (element.produit == "teddies") {
      tableauOrderTeddies.push(element.id)
      fetch("http://localhost:3000/api/teddies/order", {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify(orderTeddy)


        })
        .then(blobTeddy => blobTeddy.json())
        .then(dataTeddy => localStorage.setItem("confimation Teddy", JSON.stringify(dataTeddy)))




    } else if (element.produit == "cameras") {
      tableauOrderCameras.push(element.id)
      fetch("http://localhost:3000/api/cameras/order", {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify(orderCamera)


        })
        .then(blobCamera => blobCamera.json())
        .then(dataCamera => localStorage.setItem("confimation Camera", JSON.stringify(dataCamera)))


    } else if (element.produit == "furniture") {
      tableauOrderFurniture.push(element.id)
      fetch("http://localhost:3000/api/furniture/order", {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify(orderFurniture)


        })
        .then(blobFurniture => blobFurniture.json())
        .then(dataFurniture => localStorage.setItem("confimation Furniture", JSON.stringify(dataFurniture)))



    }

  })

  setTimeout(function(){ window.location = "confirmation.html" }, 1000);


})