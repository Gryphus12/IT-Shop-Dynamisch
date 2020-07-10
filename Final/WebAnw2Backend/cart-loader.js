/* Warenkorb befüllen */
let total = 0;
let totalTaxes = 0;

// Warenkorb laden
const cart = getCart();
cart.items.forEach((cartItem) => {
    getItemFromApi(cartItem);
});

function getItemFromApi(cartItem){
  fetch(baseApiUrl + 'produkt/gib/' + cartItem.pid)
  .then((response) => {
    response.json().then((json) => {
    if(json.fehler) console.error('Error in Backend ' + data.nachricht);
    else{
      cartItem.data = json.daten;
      addCartItemToView(cartItem);
    }
  });
})
.catch((err) => {
  console.log('Error while fetching product: ' + err);
});
}

function addCartItemToView(cartItem){
  //Preis und Steuern aufaddieren
  total += cartItem.data.bruttopreis * cartItem.amount;
  totalTaxes += cartItem.data.mehrwertsteueranteil * cartItem.amount;

  const tableRowTemplate = `
    <tr>
      <td><a class="deletebutton" href="Warenkorb_neu.html" onClick="removeFromCart(${cartItem.pid})">X</a></td>
      <td>${cartItem.data.bezeichnung}</td>
      <td>${cartItem.amount}</td>
      <td>${(cartItem.data.bruttopreis * cartItem.amount).toFixed(2)} € </td>
    </tr>
  `;
  document.getElementById('row-container').appendChild(htmlToElement(tableRowTemplate));

  fillPriceArea();
}

function fillPriceArea(){
  const priceTemplate = `
    <table class="endprice">
      <thead>
        <tr>
          <th>Gesamtsumme</th>
          <th>${total.toFixed(2)} €</th>
        </tr>
      </thead>

      <tbody>
      <tr>
        <td>19% MwsT</td>
        <td>${totalTaxes.toFixed(2)} €</td>
      </tr>
      </tbody>
    </table>
  `;

  document.getElementById('price-container').innerHTML = priceTemplate;
}
