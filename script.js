fetch('clubs.json')
  .then(response => response.json())
  .then(data => {
    const clubList = document.getElementById('clubList');
    const searchInput = document.getElementById('searchInput');

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

    renderClubs(data);

    searchInput.addEventListener('input', () => {
      const query = searchInput.value.toLowerCase();
      const filtered = data.filter(club =>
        club.name.toLowerCase().includes(query) ||
        club.events.some(event => event.toLowerCase().includes(query))
      );
      renderClubs(filtered);
    });
  });

// Federation filter PHASE 2
const federationToggle = document.getElementById('federationToggle');
federationToggle.addEventListener('change', () => {
  const showOnlyFederated = federationToggle.checked;
  fetch('clubs.json')
    .then(res => res.json())
    .then(data => {
      const filtered = showOnlyFederated ? data.filter(c => c.affiliated) : data;
      renderClubs(filtered);
    });
});

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


