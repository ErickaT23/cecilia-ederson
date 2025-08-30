const guests = [
    { id: 1, name: "Amarilis Gaitán", passes: 3 },
    { id: 2, name: "Amilcar, Flori y familia", passes: 5 },
    { id: 3, name: "Angel Tagre y Valentina", passes: 2 },
    { id: 4, name: "Braulio Navarro y Marco Navarro", passes: 2 },
    { id: 5, name: "Carmelita Lemus", passes: 1 },
    { id: 6, name: "Cender Tagre y Olga Ordóñez", passes: 2 },
    { id: 7, name: "Dillan Menendez y familia", passes: 5 },
    { id: 8, name: "Dora Hernández y familia", passes: 3 },
    { id: 9, name: "Ebelia Tunchez y familia", passes: 3 },
    { id: 10, name: "Eduardo Ortega y familia", passes: 3 },
    { id: 11, name: "Eduardo y Nathali", passes: 2 },
    { id: 12, name: "Edwin García y Esposa", passes: 2 },
    { id: 13, name: "Edwin Rodriguez", passes: 4 },
    { id: 14, name: "Eloísa Avendaño", passes: 1 },
    { id: 15, name: "Erwin Orantes", passes: 1 },
    { id: 16, name: "Evelyn Marroquín", passes: 3 },
    { id: 17, name: "Familia Corado Carrillo", passes: 3 },
    { id: 18, name: "Gerardo García", passes: 1 },
    { id: 19, name: "Hector Palacios y Brenda", passes: 2 },
    { id: 20, name: "Hubelino y familia", passes: 3 },
    { id: 21, name: "Ingrid Sandoval y familia", passes: 6 },
    { id: 22, name: "Jacqueline López", passes: 1 },
    { id: 23, name: "Jaime Corado y familia", passes: 4 },
    { id: 24, name: "Jaime Hernández", passes: 1 },
    { id: 25, name: "Javier Noguera", passes: 1 },
    { id: 26, name: "Jerónimo Solís y familia", passes: 3 },
    { id: 27, name: "José Luis Solís", passes: 1 },
    { id: 28, name: "José Porras y esposa", passes: 2 },
    { id: 29, name: "Julio Solís y Nidia Tunchez", passes: 2 },
    { id: 30, name: "Karin Alebon", passes: 3 },
    { id: 31, name: "Leonel Monterroso y Amparo Pineda", passes: 2 },
    { id: 32, name: "Lourdes de Tejada", passes: 1 },
    { id: 33, name: "Lourdes y Fátima", passes: 2 },
    { id: 34, name: "Lucia Tagre y Damián Girón", passes: 2 },
    { id: 35, name: "Luis García", passes: 1 },
    { id: 36, name: "Mario Anavisca y familia", passes: 3 },
    { id: 37, name: "Maynor Sandoval y esposa", passes: 2 },
    { id: 38, name: "Noel Sandoval y esposa", passes: 2 },
    { id: 39, name: "Otilia Velasquez", passes: 1 },
    { id: 40, name: "Raúl y Stefania", passes: 2 },
    { id: 41, name: "Ricardo Ortíz y Cristy", passes: 2 },
    { id: 42, name: "Rony y Dorian", passes: 2 },
    { id: 43, name: "Vale Silvestre y familia", passes: 3 },
    { id: 44, name: "Víctor Pineda y familia", passes: 4 },
    { id: 45, name: "Víctor Taquez", passes: 1 },
    { id: 46, name: "Wesley Buch", passes: 1 },
    { id: 47, name: "Yani Hernández y familia", passes: 3 },
    { id: 48, name: "Yesenia García", passes: 1 },
    { id: 49, name: "Gabriel Morgan y Novia", passes: 2 },
    { id: 50, name: "Víctor León y Fam.", passes: 3 },
    { id: 51, name: "Odilia Tunchez", passes: 1 },
    { id: 52, name: "Víctor y Aura", passes: 2 },
    { id: 53, name: "Sandra Tunchez", passes: 1 }
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
        document.getElementById('passes').textContent = `${passes} ${passes === 1 ? 'lugar' : 'lugares'}`;
    } else {
        document.querySelector('.invitation-info-section').style.display = 'none';
    }
});

