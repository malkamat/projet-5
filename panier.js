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


    const html = panier.map(produit => {
      return `
      <article class="ligne-panier" >
                          <img class="ligne-panier__image" src="${produit.urlImage}" alt="image" class="produit__image">
                          <div class="ligne-panier-description">
                          <h3 class="ligne-panier-description__titre">${produit.titre}</h3>
                          <strong class="ligne-panier-description__prix">${(produit.price)*produit.quantite} €</strong>
                          </div>
                      </article>
      `
    }).join("")
  
    app.innerHTML = html
  
