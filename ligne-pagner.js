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