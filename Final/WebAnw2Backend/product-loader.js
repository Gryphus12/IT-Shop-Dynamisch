/* Produkt-Übersicht */

// Kategorie aus dem queryString filtern 
let selectedCategory;
try{
    selectedCategory = parseInt(queryString.slice(-1));
}catch(ex){
    console.error('Error parsing queryString: ');
}

//Alle Produkte abrufen 
fetch(baseApiUrl + 'produkt/alle')
    .then((response) => {
        response.json().then((json) => {
            if(json.fehler) 
                console.error('Error im backend: ' + json.nachricht);
            else{
                addProductsToPage(json);
            }
        });
    })
    .catch((err) => {
        console.log('Error while fetching products: ' +err);
    });

function addProductsToPage(allProducts){
    const productsContainer = document.getElementById('product-container');

        allProducts.daten.forEach((product) => {
            if (product.kategorie.id === selectedCategory){
                htmlTemplate = `
                    <div class="col-md-3">
                        <div class="product-top">
                            <img src="${product.bilder[0].bildpfad}" class="Bild1">
                        </div>

                        <div class="product-bottom text-center">
                            <h4>${product.bezeichnung}</h4>
                        </div>
                    </div>
                `;
                productsContainer.appendChild(htmlToElement(htmlTemplate));
            }
        });
    }