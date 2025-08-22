//translations
const translations = {
  es: {
    title: "🏃 TrackFinder Perú",
    tagline: "Encuentra tu club. Mejora tu marca.",
    federated: "Federado",
    yes: "✅ Sí",
    no: "❌ No",
    events: "Eventos",
    address: "Dirección",
    contact: "Contacto",
    rating: "Calificación",
    reviews: "Reseñas de atletas",
    darkMode: "🌙 Cambiar modo",
    language: "🌐 Cambiar idioma"
  },
  en: {
    title: "🏃 TrackFinder Peru",
    tagline: "Find your club. Improve your time.",
    federated: "Federated",
    yes: "✅ Yes",
    no: "❌ No",
    events: "Events",
    address: "Address",
    contact: "Contact",
    rating: "Rating",
    reviews: "Athlete Reviews",
    darkMode: "🌙 Toggle mode",
    language: "🌐 Switch language"
  }
};

let currentLang = 'es'; // Default language

// translations on top

// update static text dinamically
function updateLanguageUI() {
  const t = translations[currentLang];
  document.querySelector('header h1').textContent = t.title;
  document.querySelector('header p').textContent = t.tagline;
  document.getElementById('languageToggle').textContent = t.language;
  document.getElementById('darkModeToggle').textContent = t.darkMode;
}
//
let allClubs = []; // Global store

fetch('clubs.json')
  .then(response => response.json())
  .then(data => {
    allClubs = data;

    const clubList = document.getElementById('clubList');
    const searchInput = document.getElementById('searchInput');
    const federationToggle = document.getElementById('federationToggle');

  /*  previous version
  
  function renderClubs(clubs) {
      clubList.innerHTML = '';
      clubs.forEach(club => {
        const card = document.createElement('div');
        card.className = 'club-card';
        card.innerHTML = `
          <h3>${club.name}</h3>
          <p><strong>Eventos:</strong> ${club.events.join(', ')}</p>
          <p><strong>Dirección:</strong> ${club.address}</p>
          <p><strong>Federado:</strong> ${club.affiliated ? '✅ Sí' : '❌ No'}</p>
          <p><strong>Contacto:</strong> ${club.contact.email}<br>${club.contact.instagram}</p>
        `;
        clubList.appendChild(card);
      });
    }
        */

    ////new version
    function renderClubs(clubs) {
  const t = translations[currentLang];
  clubList.innerHTML = '';
  clubs.forEach(club => {
    const card = document.createElement('div');
    card.className = 'club-card';
    card.innerHTML = `
      <h3>${club.name}</h3>
      <p><strong>${t.events}:</strong> ${club.events.join(', ')}</p>
      <p><strong>${t.address}:</strong> ${club.address}</p>
      <p><strong>${t.federated}:</strong> ${club.affiliated ? t.yes : t.no}</p>
      <p><strong>${t.contact}:</strong> ${club.contact.email}<br>${club.contact.instagram}</p>
    `;
    clubList.appendChild(card);
  });
}
///// new version 

    function applyFilters() {
      const query = searchInput.value.toLowerCase();
      const showOnlyFederated = federationToggle.checked;

      const filtered = allClubs.filter(club => {
        const matchesSearch =
          club.name.toLowerCase().includes(query) ||
          club.events.some(event => event.toLowerCase().includes(query));
        const matchesFederation = showOnlyFederated ? club.affiliated : true;
        return matchesSearch && matchesFederation;
      });

      renderClubs(filtered);
    }

    // Initial render
    renderClubs(allClubs);

    //call it after initial render
    updateLanguageUI();
//

    //re render
    document.getElementById('languageToggle').addEventListener('click', () => {
  currentLang = currentLang === 'es' ? 'en' : 'es';
  updateLanguageUI();
  applyFilters(); // re-render clubs with new language
});


    // Event listeners
    searchInput.addEventListener('input', applyFilters);
    federationToggle.addEventListener('change', applyFilters);
  });


// Federation filter PHASE 2
function setupFederationFilter() {
  const federationToggle = document.getElementById('federationToggle');
  federationToggle.addEventListener('change', () => {
    const showOnlyFederated = federationToggle.checked;
    const filtered = showOnlyFederated
      ? allClubs.filter(club => club.affiliated)
      : allClubs;
    renderClubs(filtered);
  });
}


// Dark mode toggle
document.getElementById('darkModeToggle').addEventListener('click', () => {
  document.body.classList.toggle('dark-mode');
});

// Club form (mock submission)
document.getElementById('clubForm').addEventListener('submit', (e) => {
  e.preventDefault();
  alert('Gracias por enviar tu club. Será revisado pronto.');
});

//////////// club addition phase 2 MAPS
const map = L.map('mapContainer').setView([-12.0464, -77.0428], 12); // Lima center

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  attribution: '© OpenStreetMap contributors'
}).addTo(map);

fetch('clubs.json')
  .then(res => res.json())
  .then(clubs => {
    clubs.forEach(club => {
      if (club.lat && club.lng) {
        L.marker([club.lat, club.lng])
          .addTo(map)
          .bindPopup(`<strong>${club.name}</strong><br>${club.address}`);
      }
    });
  });

///




