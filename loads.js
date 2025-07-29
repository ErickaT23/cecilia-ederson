const guests = [
    { id: 1, name: "Familia Wonderland", passes: 3 },
    { id: 2, name: "Rodrigo", passes: 1 },
];

document.addEventListener("DOMContentLoaded", function () {
    function getQueryParams() {
        const params = {};
        const queryString = window.location.search.substring(1);
        const pairs = queryString.split("&");
        for (const pair of pairs) {
            const [key, value] = pair.split("=");
            params[decodeURIComponent(key)] = decodeURIComponent(value.replace(/\+/g, ' '));
        }
        return params;
    }

    const queryParams = getQueryParams();
    const guestId = parseInt(queryParams.id);
    const guest = guests.find(g => g.id === guestId) || { name: "Invitado", passes: 0 };

    const guestName = guest.name;
    const passes = guest.passes;

    // Mostrar el nombre del invitado con la condición de 1 pase o más
    if (passes === 1) {
        document.getElementById('guest-name').textContent = `¡${guestName}, estás invitado!`;
    } else if (passes > 1) {
        document.getElementById('guest-name').textContent = `¡${guestName}, están invitados!`;
    } else {
        document.getElementById('guest-name').textContent = `¡${guestName}!`;
    }

    // Mostrar la cantidad de pases con "pase" o "pases" dependiendo de la cantidad
    if (passes > 0) {
        document.getElementById('passes').textContent = `${passes} ${passes === 1 ? 'pase' : 'pases'}`;
    } else {
        document.querySelector('.invitation-info-section').style.display = 'none';
    }
});

