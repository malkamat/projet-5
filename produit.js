const params = (new URL(document.location)).searchParams;
const produit = params.get('produit'); 
const id = params.get('id'); 
const app = document.querySelector(".preview-produit")

const api = `http://localhost:3000/api/${produit}/${id}`



fetch(api)
  .then(blob => blob.json())
  .then(data => afficher(data))
  
    

    function afficher (data) {
const article = `        

<img class="preview-produit__image" src="${data.imageUrl}" alt="image" class="produit__image">
    <div class="preview-produit-description">
        <h3 class="preview-produit-description__titre">${data.name}</h3>
        <p class="preview-produit-description__description">${data.description}</p>
        <strong class="preview-produit-description__prix">${data.price/100} €</strong>
    </div>
    `
    
    app.innerHTML = article
    }