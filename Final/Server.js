/* Detailansicht */

var selectedAmount = 1;

// ProduktID aus dem queryString filtern
let selectedProduct;
try {
    selectedProduct = parseInt(queryString.slice(-1));
} catch (ex) {
    console.error('Error parsing querystring:' + ex);
}

// Produkt von API abrufen
fetch(baseApiUrl + 'produkt/gib/4') 
    .then((response) => {
        response.json().then((data) => {
            if (data.fehler) console.error('Error in backend: ' + data.nachricht);
            else {
                const product = data.daten;
                addProductToPage(product);
            }
        });
    })
    .catch((err) => {
        console.log('Error while fetching products: ' + err);
    });

function addProductToPage(product) {
    const htmlTemplate = `
        <div class="box">
        <div class="imgBx">
            <img src="${product.bilder[0].bildpfad}" class="bild1">
            </div>

            <div class="content">
                <h2 class="bez">${product.bezeichnung}</h2>
                <p class="id">Art-Nr: 1540000${product.id}</p>
                <p class="preis">${product.bruttopreis}</p>
                <p class="besch">${product.beschreibung}</p>
                <p class="details">${product.details}</p>
                <select id="amount-select"></select>
                <a class="inwkbutton" href="#" onClick="addProductToCart(${product.id})">In den Warenkorb</a>
            </div>
        </div>
            `;
    const productContainer = document.getElementById('product-container');
    productContainer.appendChild(htmlToElement(htmlTemplate));

    addSelectEventHandler();
}

function addSelectEventHandler() {
    let selectElement = document.getElementById('amount-select');
    for (let i = 1; i <= 10; i++) {
        let opt = document.createElement('option'); 
        opt.value = i;
        opt.innerHTML = i;
        selectElement.appendChild(opt);
    }
    selectElement.onchange = (event) => {
        console.log(event);
        selectedAmount = event.target.options[event.target.selectedIndex].value; 
    };
}

// Produkt an den Warenkorb übergeben
function addProductToCart(pid) {
    // Benachrichtigung einblenden -> https://greensock.com/docs/
    gsap.to('#notification', {
        opacity: 1,
        duration: 1.2,
        y: 100,
    });
    setTimeout(() => {
        gsap.to('#notification', {
            opacity: 0,
            duration: 1.2,
            y: -100,
        });
    }, 1300);

    addToCart(pid, parseInt(selectedAmount));
}