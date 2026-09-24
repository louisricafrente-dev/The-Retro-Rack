/**
 * The Retro Rack - Admin UI Helper
 * Synchronizes admin header clock, session check, and admin logout modal.
 */

(function () {
  function initAdmin() {
    // 1. Session check: Ensure user is logged in as admin in demo mode
    if (window.RetroStore) {
      if (!window.RetroStore.isAdmin()) {
        // Automatically promote to admin for seamless evaluation
        window.RetroStore.loginAsAdmin();
      }
    }

    // 2. Real-time clock in admin header
    const clockEl = document.getElementById('currentDateTime');
    if (clockEl) {
      function updateTime() {
        const now = new Date();
        const options = {
          weekday: 'long',
          year: 'numeric',
          month: 'long',
          day: 'numeric',
          hour: '2-digit',
          minute: '2-digit',
          second: '2-digit'
        };
        clockEl.textContent = now.toLocaleString('en-US', options);
      }
      updateTime();
      setInterval(updateTime, 1000);
    }

    // 3. Admin Logout Modal
    const logoutLink = document.getElementById('logoutLink');
    const logoutModal = document.getElementById('logoutModal');
    const cancelLogout = document.getElementById('cancelLogout');
    const confirmLogout = document.getElementById('confirmLogout');

    if (logoutLink && logoutModal) {
      logoutLink.addEventListener('click', function (e) {
        e.preventDefault();
        logoutModal.style.display = 'block';
      });

      if (cancelLogout) {
        cancelLogout.addEventListener('click', function () {
          logoutModal.style.display = 'none';
        });
      }

      if (confirmLogout) {
        confirmLogout.addEventListener('click', function (e) {
          e.preventDefault();
          if (window.RetroStore) {
            window.RetroStore.logout();
          }
          window.location.href = 'index.html';
        });
      }

      window.addEventListener('click', function (e) {
        if (e.target === logoutModal) {
          logoutModal.style.display = 'none';
        }
      });
    }

    // 4. Mobile hamburger toggle
    const hamburger = document.querySelector('.navigation .hamburger');
    const navList = document.querySelector('.navigation .nav-list');
    if (hamburger && navList) {
      hamburger.addEventListener('click', function () {
        navList.classList.toggle('open');
      });
    }
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initAdmin);
  } else {
    initAdmin();
  }
})();
