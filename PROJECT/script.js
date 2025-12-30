console.log("JS loaded!");

document.addEventListener('DOMContentLoaded', () => {
  const menuToggle = document.getElementById('menu-toggle');
  const navLinks = document.getElementById('nav-links');
  const closeMenu = document.getElementById('close-menu');
  const overlay = document.getElementById('nav-overlay');

  // Open mobile nav
  menuToggle?.addEventListener('click', () => {
    navLinks.classList.add('open');
    menuToggle.classList.add('open');
    menuToggle.setAttribute('aria-expanded', 'true');
    overlay?.classList.add('show');
  });

  // Close mobile nav
  closeMenu?.addEventListener('click', () => {
    navLinks.classList.remove('open');
    menuToggle.classList.remove('open');
    menuToggle.setAttribute('aria-expanded', 'false');
    overlay?.classList.remove('show');
  });

  // Click on overlay to close menu
  overlay?.addEventListener('click', () => {
    navLinks.classList.remove('open');
    menuToggle.classList.remove('open');
    menuToggle.setAttribute('aria-expanded', 'false');
    overlay?.classList.remove('show');
  });

  // Close nav when clicking outside (mobile only)
  document.addEventListener('click', (e) => {
    if (
      window.innerWidth <= 900 &&
      navLinks.classList.contains('open') &&
      !navLinks.contains(e.target) &&
      e.target !== menuToggle &&
      !menuToggle.contains(e.target)
    ) {
      navLinks.classList.remove('open');
      menuToggle.classList.remove('open');
      menuToggle.setAttribute('aria-expanded', 'false');
      overlay?.classList.remove('show');
    }
  });

  // On resize: reset nav on desktop, close on mobile
  window.addEventListener('resize', () => {
    if (window.innerWidth > 900) {
      navLinks.classList.remove('open');
      menuToggle.classList.remove('open');
      menuToggle.setAttribute('aria-expanded', 'false');
      overlay?.classList.remove('show');
    }
  });

  // Project popup "Coming soon" logic
  document.querySelectorAll('.project-card').forEach(card => {
    const title = card.querySelector('h3');
    if (!title) return;
    const projectName = title.textContent.trim();
    if (projectName === 'RozgaarSetu' || projectName === 'CureSense AI') {
      card.style.cursor = "pointer";
      card.addEventListener('click', function(e) {
        e.stopPropagation();
        if (document.getElementById('custom-popup')) return;

        let overlay = document.createElement('div');
        overlay.id = 'custom-popup-overlay';
        overlay.style.position = 'fixed';
        overlay.style.top = '0';
        overlay.style.left = '0';
        overlay.style.width = '100vw';
        overlay.style.height = '100vh';
        overlay.style.background = 'rgba(34,34,59,0.25)';
        overlay.style.zIndex = '9998';
        overlay.style.display = 'flex';
        overlay.style.alignItems = 'center';
        overlay.style.justifyContent = 'center';

        let popup = document.createElement('div');
        popup.id = 'custom-popup';
        popup.innerHTML = `
          <div style="
            display: flex;
            flex-direction: column;
            align-items: center;
            padding: 1.5rem 2.2rem;
            background: linear-gradient(135deg, #fbbf24 0%, #38bdf8 100%);
            border-radius: 18px;
            box-shadow: 0 8px 32px #6366f180;
            font-size: 1.15rem;
            color: #232946;
            max-width: 90vw;
            min-width: 220px;
            position: relative;
            animation: popup-bounce 0.5s cubic-bezier(.68,-0.55,.27,1.55);
          ">
            <span style="font-size:2.2rem; margin-bottom:0.5rem;">🚧</span>
            <div style="margin-bottom: 0.7rem; font-weight: 600;">
              Sorry, This Project will be available soon.
            </div>
            <button id="popup-close-btn" style="
              background: #232946;
              color: #fff;
              border: none;
              border-radius: 8px;
              padding: 0.4rem 1.2rem;
              font-size: 1rem;
              cursor: pointer;
              margin-top: 0.5rem;
              transition: background 0.2s;
            ">OK</button>
          </div>
        `;

        if (!document.getElementById('popup-bounce-style')) {
          const style = document.createElement('style');
          style.id = 'popup-bounce-style';
          style.innerHTML = `
            @keyframes popup-bounce {
              0% { transform: scale(0.7); opacity: 0; }
              60% { transform: scale(1.1); opacity: 1; }
              80% { transform: scale(0.95); }
              100% { transform: scale(1); }
            }
          `;
          document.head.appendChild(style);
        }

        overlay.appendChild(popup);
        document.body.appendChild(overlay);

        const closePopup = () => {
          overlay.style.opacity = '1';
          overlay.style.transition = 'opacity 0.3s';
          overlay.style.opacity = '0';
          setTimeout(() => {
            if (overlay.parentNode) overlay.parentNode.removeChild(overlay);
          }, 300);
        };

        document.getElementById('popup-close-btn').onclick = closePopup;
        overlay.addEventListener('click', function(ev) {
          if (ev.target === overlay) closePopup();
        });

        setTimeout(closePopup, 2000);
      });
    }
  });
});
