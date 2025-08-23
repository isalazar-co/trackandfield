// 🌐 Language setup
const translations = {
  es: {
    title: "🏃 TrackClub Finder Perú",
    tagline: "Encuentra tu club. Dale vida a tus sueños, haz amigos y diviértete.",
    federated: "Federado",
    yes: "✅ Sí",
    no: "❌ No",
    events: "Eventos",
    address: "Dirección",
    contact: "Contacto",
    darkMode: "🌙 Cambiar modo",
    language: "🌐 Cambiar idioma",
    searchPlaceholder: "Buscar club o evento...",
    federationLabel: "Mostrar solo clubes federados",
    mapTitle: "📍 Mapa de Clubes",
    testimonialsTitle: "💬 Historias de Atletas",
    addClubTitle: "➕ Agrega tu club",
    formFields: {
      name: "Nombre del club",
      events: "Eventos (100m, salto, etc.)",
      address: "Dirección",
      email: "Email de contacto",
      submit: "Enviar"
    },
    footer: "Hecho con ❤️ por Ivan Jesus para la comunidad atlética peruana."
  },
  en: {
    title: "🏃 TrackClub Finder Peru",
    tagline: "Find your club. Bring your dreams to life, make friends, and have fun.",
    federated: "Federated",
    yes: "✅ Yes",
    no: "❌ No",
    events: "Events",
    address: "Address",
    contact: "Contact",
    darkMode: "🌙 Toggle mode",
    language: "🌐 Switch language",
    searchPlaceholder: "Search club or event...",
    federationLabel: "Show only federated clubs",
    mapTitle: "📍 Club Map",
    testimonialsTitle: "💬 Athlete Stories",
    addClubTitle: "➕ Add Your Club",
    formFields: {
      name: "Club Name",
      events: "Events (100m, long jump, etc.)",
      address: "Address",
      email: "Contact Email",
      submit: "Submit"
    },
    footer: "Made with ❤️ by Ivan Jesus for the Peruvian athletic community."
  }
};

//Event Translations
const eventTranslations = {
  // Sprints
  "100m": { es: "100 metros", en: "100m" },
  "200m": { es: "200 metros", en: "200m" },
  "400m": { es: "400 metros", en: "400m" },

  // Middle Distance
  "800m": { es: "800 metros", en: "800m" },
  "1500m": { es: "1500 metros", en: "1500m" },

  // Long Distance
  "3000m": { es: "3000 metros", en: "3000m" },
  "5000m": { es: "5000 metros", en: "5000m" },
  "10000m": { es: "10000 metros", en: "10000m" },

  // Hurdles
  "100m Hurdles": { es: "100 metros con vallas", en: "100m Hurdles" },
  "110m Hurdles": { es: "110 metros con vallas", en: "110m Hurdles" },
  "400m Hurdles": { es: "400 metros con vallas", en: "400m Hurdles" },

  // Steeplechase
  "3000m Steeplechase": { es: "3000 metros con obstáculos", en: "3000m Steeplechase" },

  // Relays
  "4x100m Relay": { es: "Relevo 4x100m", en: "4x100m Relay" },
  "4x400m Relay": { es: "Relevo 4x400m", en: "4x400m Relay" },
  "Medley Relay": { es: "Relevo combinado", en: "Medley Relay" },

  // Jumps
  "Long Jump": { es: "Salto largo", en: "Long Jump" },
  "Triple Jump": { es: "Salto triple", en: "Triple Jump" },
  "High Jump": { es: "Salto alto", en: "High Jump" },
  "Pole Vault": { es: "Salto con pértiga", en: "Pole Vault" },

  // Throws
  "Shot Put": { es: "Lanzamiento de bala", en: "Shot Put" },
  "Discus Throw": { es: "Lanzamiento de disco", en: "Discus Throw" },
  "Javelin Throw": { es: "Lanzamiento de jabalina", en: "Javelin Throw" },
  "Hammer Throw": { es: "Lanzamiento de martillo", en: "Hammer Throw" },

  // Combined Events
  "Decathlon": { es: "Decatlón", en: "Decathlon" },
  "Heptathlon": { es: "Heptatlón", en: "Heptathlon" },

  // Race Walk
  "20km Race Walk": { es: "Marcha 20km", en: "20km Race Walk" },
  "50km Race Walk": { es: "Marcha 50km", en: "50km Race Walk" },

  // Road Events
  "Marathon": { es: "Maratón", en: "Marathon" },
  "Half Marathon": { es: "Media maratón", en: "Half Marathon" },

  //Special Custom non-official events
  "Kids Sprint": { es: "Carrera infantil", en: "Kids Sprint" },
  "Masters 60+": { es: "Masters 60+", en: "Masters 60+" }

};

//

let currentLang = 'es';
let allClubs = [];

const clubList = document.getElementById('clubList');
const searchInput = document.getElementById('searchInput');
const federationToggle = document.getElementById('federationToggle');
const darkModeToggle = document.getElementById('darkModeToggle');
const languageToggle = document.getElementById('languageToggle');

// 🧠 Update static UI text based on language
function updateLanguageUI() {
  const t = translations[currentLang];

  document.getElementById('pageTitle').textContent = t.title;
  document.getElementById('headerTitle').textContent = t.title;
  document.getElementById('headerTagline').textContent = t.tagline;
  searchInput.placeholder = t.searchPlaceholder;

  document.getElementById('federationLabel').innerHTML = `
    <input type="checkbox" id="federationToggle" />
    ${t.federationLabel}
  `;
  document.getElementById('mapTitle').textContent = t.mapTitle;
  document.getElementById('testimonialsTitle').textContent = t.testimonialsTitle;
  document.getElementById('addClubTitle').textContent = t.addClubTitle;

  document.getElementById('formName').placeholder = t.formFields.name;
  document.getElementById('formEvents').placeholder = t.formFields.events;
  document.getElementById('formAddress').placeholder = t.formFields.address;
  document.getElementById('formEmail').placeholder = t.formFields.email;
  document.getElementById('formSubmit').textContent = t.formFields.submit;

  document.getElementById('footerText').textContent = t.footer;
  darkModeToggle.textContent = t.darkMode;
  languageToggle.textContent = t.language;

  // Reattach federation toggle listener after replacing label
  document.getElementById('federationToggle').addEventListener('change', applyFilters);

  // Translate testimonials
  document.querySelectorAll('.testimonial').forEach(el => {
    el.textContent = el.dataset[currentLang];
  });
}

// 🏃 Render club cards
function renderClubs(clubs) {
  const t = translations[currentLang];
  clubList.innerHTML = '';
  clubs.forEach(club => {
    const card = document.createElement('div');
    card.className = 'club-card';
    //making it nicer the federated badge (visual cue)
    if (club.affiliated) {
    card.classList.add('federated');
    }

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

// 🔍 Apply filters (search + federation)
function applyFilters() {
  const query = searchInput.value.toLowerCase();
  const showOnlyFederated = document.getElementById('federationToggle').checked;

  const filtered = allClubs.filter(club => {
    const matchesSearch =
      club.name.toLowerCase().includes(query) ||
      club.events.some(event => event.toLowerCase().includes(query));
    const matchesFederation = showOnlyFederated ? club.affiliated : true;
    return matchesSearch && matchesFederation;
  });

  renderClubs(filtered);
}

// 🌍 Initialize map with Leaflet
function initMap(clubs) {
  const map = L.map('mapContainer').setView([-12.0464, -77.0428], 12); // Lima center

  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '© OpenStreetMap contributors'
  }).addTo(map);

  clubs.forEach(club => {
    if (club.lat && club.lng) {
      L.marker([club.lat, club.lng])
        .addTo(map)
        .bindPopup(`<strong>${club.name}</strong><br>${club.address}`);
    }
  });
}

// 🚀 Load data and initialize
fetch('clubs.json')
  .then(response => response.json())
  .then(data => {
    allClubs = data;
    renderClubs(allClubs);
    initMap(allClubs);
    updateLanguageUI();
  });

// 🎛️ Event listeners
searchInput.addEventListener('input', applyFilters);
darkModeToggle.addEventListener('click', () => {
  document.body.classList.toggle('dark-mode');
});
languageToggle.addEventListener('click', () => {
  currentLang = currentLang === 'es' ? 'en' : 'es';
  updateLanguageUI();
  applyFilters(); // re-render with new language
});


