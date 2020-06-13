// déclaration des variables globales 
// déclaration des variables globales 
// déclaration des variables globales 

const boutonViderPanier = document.querySelector(".boutons-panier__vider-panier")
const boutonContinuerAchats = document.querySelector(".boutons-panier__continuer-achats")
const boutonCommander = document.querySelector(".commande__bouton")
const app = document.querySelector(".panier")
const nom = document.querySelector(".commande-formulaire__nom")
const prenom = document.querySelector(".commande-formulaire__prenom")
const adresse = document.querySelector(".commande-formulaire__adresse")
const ville = document.querySelector(".commande-formulaire__ville")
const email = document.querySelector(".commande-formulaire__email")
const important = document.querySelector(".commande__important")
const total = document.querySelector(".commande__total")
let totalEuros = 0

// boucle pour calculer le total des articles du panier 
// boucle pour calculer le total des articles du panier 
// boucle pour calculer le total des articles du panier 

for (let i = 0; i < panier.length; i++) {
  totalEuros += panier[i].quantite*panier[i].price
  if (panier.length > 0) {
    total.innerHTML = `Total de votre commande : ${totalEuros} €`

  }
}


// Si le panier n'est pas vide, on créer les éléments qu'il contient 
// Si le panier n'est pas vide, on créer les éléments qu'il contient 
// Si le panier n'est pas vide, on créer les éléments qu'il contient 

if (totalPanier !== 0) {

  const html = panier.map(produit => {
    return `
      <article class="ligne-panier" >
                          <img class="ligne-panier__image" src="${produit.urlImage}" alt="image" class="produit__image">
                          <div class="ligne-panier-description">
                          <h3 class="ligne-panier-description__titre">${produit.titre}</h3>
                          <strong class="ligne-panier-description__quantitee">quantitée : (${produit.quantite})</strong>
                          <strong class="ligne-panier-description__prix">Total : ${produit.price*produit.quantite} €</strong>
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

// logique des boutons pour modifier ou supprimer un article de facon isolé et boutons pour vider le panier et continuer ses achats 
// logique des boutons pour modifier ou supprimer un article de facon isolé et boutons pour vider le panier et continuer ses achats 
// logique des boutons pour modifier ou supprimer un article de facon isolé et boutons pour vider le panier et continuer ses achats 

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


//Ici la logique du bonton commander 
// Ici la logique du bonton commander 
// Ici la logique du bonton commander 


boutonCommander.addEventListener("click", function (e) {

  // Si une des valeurs du formulaire n'est pas défini on affiche un message indiquant de remplir le formulaire 
// Si une des valeurs du formulaire n'est pas défini on affiche un message indiquant de remplir le formulaire 
// Si une des valeurs du formulaire n'est pas défini on affiche un message indiquant de remplir le formulaire 

  if (!nom.value || !prenom.value || !adresse.value || !ville.value || !email.value) {
    important.innerHTML = "Veuillez renseigner tous les champs"
// Si le formulaire est bien rempli mais le panier vide on affiche un message d'erreur 
// Si le formulaire est bien rempli mais le panier vide on affiche un message d'erreur 
// Si le formulaire est bien rempli mais le panier vide on affiche un message d'erreur 

  } else if (panier.length == 0) {
    important.innerHTML = "Votre panier est bien vide pour passer une commande "
  }

  // Si le formulaire est bien rempli et le panier plein on récupere les valeurs du formulaire en créant l'objet newContact et les ids des articles du panier pour envoyer la commande bien formaté au serveur 
// Si le formulaire est bien rempli et le panier plein on récupere les valeurs du formulaire en créant l'objet newContact et les ids des articles du panier pour envoyer la commande bien formaté au serveur 
// Si le formulaire est bien rempli et le panier plein on récupere les valeurs du formulaire en créant l'objet newContact et les ids des articles du panier pour envoyer la commande bien formaté au serveur 
   else {

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





    const newContact = new Contact(prenom.value, nom.value, adresse.value, ville.value, email.value)


    const tableauOrderTeddies = []
    const tableauOrderCameras = []
    const tableauOrderFurniture = []
    const orderTeddy = new Order(newContact, tableauOrderTeddies)
    const orderCamera = new Order(newContact, tableauOrderCameras)
    const orderFurniture = new Order(newContact, tableauOrderFurniture)

    const commande = async function (data, id) {
      try {

        let response = await fetch(`http://localhost:3000/api/${id}/order`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify(data)


        })
        let responseData = await response.json()
        localStorage.setItem(`confirmation ${id}`, JSON.stringify(responseData))
        await responseData
        window.location = "confirmation.html"


      } catch (e) {
        console.error(e)
      }

    }

    // boucles pour parcourir les éléments du panier afin de savoir à quelle api il faut envoyer la réponse puis on stock cette réponse dans le localStorage 
// boucles pour parcourir les éléments du panier afin de savoir à quelle api il faut envoyer la réponse puis on stock cette réponse dans le localStorage 
// boucles pour parcourir les éléments du panier afin de savoir à quelle api il faut envoyer la réponse puis on stock cette réponse dans le localStorage 
    panier.map(element => {


      if (element.produit == "teddies") {
        tableauOrderTeddies.push(element.id)
        localStorage.removeItem(element.id)
        commande(orderTeddy, "teddies")




      } else if (element.produit == "cameras") {
        tableauOrderCameras.push(element.id)
        localStorage.removeItem(element.id)
        commande(orderCamera, "cameras")



      } else if (element.produit == "furniture") {
        tableauOrderFurniture.push(element.id)
        localStorage.removeItem(element.id)
        commande(orderFurniture, "furniture")

      }



    })
  }


  e.preventDefault()



})