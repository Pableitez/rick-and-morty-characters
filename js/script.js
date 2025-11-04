
// Pescamos el HTML 

const characterList = document.getElementById('character-list');
const prevButton = document.getElementById('prev-page');
const nextButton = document.getElementById('next-page');

// Establezco primera pagina

let currentPage = 1;

// Función para cargar personajes desde la API

function loadCharacters(page) {
fetch(`https://rickandmortyapi.com/api/character/?page=${page}`)
    .then(response => {
        // Si la respuesta no es buena que nos diga que da error
    if (!response.ok) {
        throw new Error('Error al obtener personajes');
    }
    //   Si la respuesta es buena, la convertimos a JSON
    return response.json();
    })
    .then(data => {
    // Borramos el contenido previo
    characterList.innerHTML = ''; 
    // Recorremos con bucle  y creamos un li por cada uno de ellos creando su estructura interna dandole class
        data.results.forEach(character => {
        const li = document.createElement('li');
        li.classList.add('character-card'); 
        // Aqui metemos el HTML interno del li
        li.innerHTML = `
        <img src="${character.image}" alt="${character.name}">
        <h3>${character.name}</h3>
        <p>${character.species}</p>
        `;
    // Añadimos el personaje a la lista 
    characterList.appendChild(li);
    });

//Activamos o desactivamos botones segun pagina
prevButton.disabled = page === 1;
nextButton.disabled = !data.info.next;
})
}

// Paginación

prevButton.addEventListener('click', () => {
if (currentPage > 1) {
    currentPage--;
    loadCharacters(currentPage);
}
});

nextButton.addEventListener('click', () => {
currentPage++;
loadCharacters(currentPage);
});

// Carga inicial

loadCharacters(currentPage);
