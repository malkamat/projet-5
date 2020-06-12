const params = (new URL(document.location)).searchParams;
const produit = params.get('produit');
const id = params.get('id');
const categorie = params.get("produit")
const app = document.querySelector(".preview-produit")



const api = `http://localhost:3000/api/${produit}/${id}`



fetch(api)
  .then(blob => blob.json())
  .then(data => afficher(data))



function afficher(data) {
  const article = `        

<img class="preview-produit__image" src="${data.imageUrl}" alt="image" class="produit__image">
    <div class="preview-produit-description">
        <h3 class="preview-produit-description__titre">${data.name}</h3>
        <p class="preview-produit-description__description">${data.description}</p>
        <strong class="preview-produit-description__prix"> Total :${data.price/100} €</strong>
        <label for="preview-produit-description__quantite">choisir une quantitée:</label>
        <select class="preview-produit-description__quantite">
        <option value="1" selected>1</option> 
        <option value="2" >2</option>
        <option value="3">3</option>
        <option value="4">4</option> 
        <option value="5" >5</option>
        <option value="6">6</option>
        <option value="7">7</option> 
        <option value="8" >8</option>
        <option value="9">9</option>
        <option value="10">10</option> 
      </select>
      <input class="preview-produit-description__panier" type="button" value="Ajouter la séléction au panier">
    </div>
    `

  app.innerHTML = article
  const panierBouton = document.querySelector(".preview-produit-description__panier")
  const boutonQuantite = document.querySelector(".preview-produit-description__quantite")

  boutonQuantite.addEventListener('input', function (e) {
    const prix = document.querySelector(".preview-produit-description__prix")
    const total = (data.price / 100) * (boutonQuantite.options.selectedIndex + 1)
    prix.innerHTML = `${total} €`

  })
  panierBouton.addEventListener("click", function (e) {
    const nb = boutonQuantite.options.selectedIndex + 1

    class ObjetPanier {
      constructor(id, quantite,urlImage,price,titre) {
        this.id = id;
        this.quantite = quantite;
        this.urlImage = urlImage;
        this.price = price;
        this.titre = titre;
        this.produit = produit;

      }
    }
    let objetPanier = new ObjetPanier(id, nb,data.imageUrl,data.price/100,data.name,produit)
    localStorage.setItem(id, JSON.stringify(objetPanier))

    window.location = "panier.html"

  })

}