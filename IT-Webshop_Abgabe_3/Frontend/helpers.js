const queryString = window.location.search.substr(1);
const baseApiUrl = 'http://localhost:8000/api/';

// Funktion um ein HTML-String in ein DOM-Element umzuwandeln

function htmlToElement(htmlString){
    var template = document.createElement('template');
    htmlString = htmlString.trim(); //whitespaces entfernen
    template.innerHTML = htmlString;
    return template.content.firstChild;
}