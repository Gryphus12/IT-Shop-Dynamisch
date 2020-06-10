// JSON Objecte aus den eingegeben Daten an die API übergeben

function postAddress(){
    const contact = {
        name: document.getElementById('name').value,
        absender: document.getElementById('email').value,
        nachricht: document.getElementById('nachricht').value
    };

    //Adressdaten übertragen

    fetch(baseApiUrl + 'formular',{
        method: 'POST',
        headers: {
            'Content-Type' : 'application/json',
        },
        body: JSON.stringify(contact),
    })
    .then((response) => {
        response.json().then((json) => {
            if (json.fehler) console.error('Error im backend: ' + json.nachricht);
            else{
                contact.adresse = {id: json.daten.id};
                postAddition(contact);
            }
        });
    })
    .catch((err) => {
        console.error('Error while API-Call: ' + err);
    });
}