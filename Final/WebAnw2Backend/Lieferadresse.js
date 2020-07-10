// JSON Objecte aus den eingegeben Daten an die API übergeben

function WarenkorbAdresse(){
    const addresse = {
        hausnummer: document.getElementById('vorname').value,
        adresszusatz: document.getElementById('nachname').value,
        strasse: document.getElementById('straße').value,
        ort: document.getElementById('wohnort').value,
        
        plz: '88512',
        land: { "id": 3,
                "kennzeichnung": "AL",
                "bezeichnung" : "Albanien"
              }
        
    };

    //Adressdaten übertragen

    fetch(baseApiUrl + 'adresse',{
        method: 'POST',
        headers: {
            'Content-Type' : 'application/json',
        },
        body: JSON.stringify(addresse),
    })
    .then((response) => {
        response.json().then((json) => {
            if (json.fehler) console.error('Error im backend: ' + json.nachricht);
            else{
                addresse.adresse = {id: json.daten.id};
                postAddition(addresse);
            }
        })
    })
    .catch((err) => {
        console.error('Error while API-Call: ' + err);
    });
}