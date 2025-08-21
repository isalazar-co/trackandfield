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
