const boutonViderPanier = document.querySelector(".boutons-panier__vider-panier")
const boutonContinuerAchats = document.querySelector(".boutons-panier__continuer-achats")
const app = document.querySelector(".panier")
const lienPanier = document.querySelector(".header__panier")
const panier = []
let totalPanier = 0


 
for (let i = 0; i < localStorage.length;i++) {

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

boutonSupprimerArticle.forEach(bouton => bouton.addEventListener("click", function(e) {
  const id = bouton.getAttribute("data-key")
       localStorage.removeItem(id)
       window.location = "panier.html"
}))

boutonModifierArticle.forEach(bouton => bouton.addEventListener("click", function(e) {
       const id = bouton.getAttribute("data-key")
       const produit = bouton.getAttribute("data-produit")
       window.location = `produit.html?produit=${produit}&id=${id}`

}))



boutonViderPanier.addEventListener("click", function(e) {
    localStorage.clear()
    window.location = "panier.html"
})
   
boutonContinuerAchats.addEventListener("click" , function(e) {
  window.location = "index.html"

})