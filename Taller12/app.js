const API_URL = 'https://jsonplaceholder.typicode.com/users';
const userListSection = document.getElementById('user-list');
const searchInput = document.getElementById('searchInput'); 
let allUsers = [];

function renderUserCard(user) {
 
    const name = user.name;
    const username = user.username;
    const email = user.email;
    const city = user.address.city; 
    
  
    const phone = user.phone.split(' ')[0];
    const company = user.company.name;
    const website = user.website;

    const cardWrapper = document.createElement('div');
    cardWrapper.classList.add('user-card-wrapper');

    const card = document.createElement('div');
    card.classList.add('user-card');


    const frontFace = document.createElement('div');
    frontFace.classList.add('user-card-face', 'user-card-front');
    frontFace.innerHTML = `
        <h2>${name}</h2>
        <div class="user-info">
            <p><strong>Alias:</strong> ${username}</p>
            <p><strong>Correo:</strong> <a href="mailto:${email}">${email}</a></p>
            <p><strong>Ciudad:</strong> ${city}</p>
        </div>
    `;

    const backFace = document.createElement('div');
    backFace.classList.add('user-card-face', 'user-card-back');
    backFace.innerHTML = `
        <h3>Más Detalles</h3>
        <ul>
            <li><strong>Telefono:</strong> ${phone}</li>
            <li><strong>CompañIa:</strong> ${company}</li>
            <li><strong>Sitio:</strong> <a href="http://${website}" target="_blank">${website}</a></li>
        </ul>
    `;
    
    card.appendChild(frontFace);
    card.appendChild(backFace);
    cardWrapper.appendChild(card);
    userListSection.appendChild(cardWrapper);
}

async function fetchAndRenderUsers() {
    userListSection.innerHTML = '<p class="loading-message">Cargando datos de usuarios...</p>';

    try {
        const response = await fetch(API_URL);

        if (!response.ok) {
            throw new Error(`Error HTTP: ${response.status}`);
        }

        const users = await response.json();
        allUsers = users; 

        userListSection.innerHTML = ''; 
        
        allUsers.forEach(user => {
            renderUserCard(user);
        });

    } catch (error) {
        console.error('Error al obtener los datos:', error);
        userListSection.innerHTML = `
            <p class="error-message">
                Ha ocurrido un error al cargar la información.
            </p>
        `;
    }
}

function filterUsers() {
    const searchTerm = searchInput.value.toLowerCase();
    
    const filteredUsers = allUsers.filter(user => {
        const userData = 
            user.name.toLowerCase() + 
            user.username.toLowerCase() + 
            user.email.toLowerCase() + 
            user.address.city.toLowerCase();
            
        return userData.includes(searchTerm);
    });

    userListSection.innerHTML = '';

    if (filteredUsers.length > 0) {
        filteredUsers.forEach(user => {
            renderUserCard(user);
        });
    } else {
        userListSection.innerHTML = `<p class="error-message">No se encontraron usuarios que coincidan con "${searchTerm}".</p>`;
    }
}

searchInput.addEventListener('input', filterUsers);

document.addEventListener('DOMContentLoaded', fetchAndRenderUsers);