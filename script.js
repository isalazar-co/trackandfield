// 🌐 Language setup
const translations = {
  es: {
    title: "TrackClub Finder Perú",
    tagline: "Encuentra tu club. Dale vida a tus sueños, haz amigos y diviértete.",
    federated: "Federado",
    yes: "✅ Sí",
    no: "❌ No",
    events: "Eventos",
    address: "Dirección",
    contact: "Contacto",
    darkMode: "🌙 Cambiar modo",
    language: "🌐 Cambiar idioma"
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
    language: "🌐 Switch language"
  }
};

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
  document.querySelector('header h1').textContent = t.title;
  document.querySelector('header p').textContent = t.tagline;
  darkModeToggle.textContent = t.darkMode;
  languageToggle.textContent = t.language;
}

// 🏃 Render club cards
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

// 🔍 Apply filters (search + federation)
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
federationToggle.addEventListener('change', applyFilters);

darkModeToggle.addEventListener('click', () => {
  document.body.classList.toggle('dark-mode');
});

languageToggle.addEventListener('click', () => {
  currentLang = currentLang === 'es' ? 'en' : 'es';
  updateLanguageUI();
  applyFilters(); // re-render with new language
});


