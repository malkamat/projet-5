const recap = document.querySelector(".confirmation-recap")
const recapTableau = []

for (let i = 0; i < localStorage.length; i++) {

    recapTableau.push(JSON.parse(localStorage.getItem(localStorage.key(i))))
  
  }

  const html = recapTableau.map(recapProduit => {
    return `
      <strong class="confirmation-recap__id">id de commande : ${recapProduit.orderId}</strong>
      `
  }).join("")

  recap.innerHTML = html


  localStorage.clear()