    const urlParams = new URLSearchParams(window.location.search);

    const orderNr = urlParams.get('bestellnr');
    const name = urlParams.get('nachname');
    const firstname = urlParams.get('vorname');

    document.getElementById('name-span').innerHTML = firstname + ' ' + name;
    document.getElementById('order-nr-span').innerHTML = orderNr;