/**
 * The Retro Rack - Storefront UI Helper
 * Synchronizes cart counts, search popup, auth header state, and modals.
 */

(function () {
  function initStorefront() {
    // 1. Update Cart Count
    function updateCartBadge() {
      const counters = document.querySelectorAll('.cart-count, #cart-counter, .icons .icon .bx-cart + span');
      if (window.RetroStore) {
        const count = window.RetroStore.getCartCount();
        counters.forEach(el => {
          el.textContent = count;
        });
      }
    }

    updateCartBadge();
    window.addEventListener('cartUpdated', updateCartBadge);

    // 2. Auth state in Header
    if (window.RetroStore) {
      const auth = window.RetroStore.getAuth();
      const welcomeContainer = document.getElementById('welcome-user-container');
      const userProfileLink = document.getElementById('userProfileLink');

      if (welcomeContainer) {
        if (auth.isLoggedIn && auth.user) {
          welcomeContainer.innerHTML = `
            <a href="profile.html" class="nav-link" style="color: var(--orange); font-weight: 600;">
              Hello, ${auth.user.username || 'Friend'}!
            </a>
          `;
          welcomeContainer.style.display = 'list-item';
        } else {
          welcomeContainer.innerHTML = '';
          welcomeContainer.style.display = 'none';
        }
      }

      if (userProfileLink) {
        userProfileLink.href = auth.isLoggedIn ? 'profile.html' : 'loginview.html';
      }
    }

    // 3. Search Popup Toggle
    const searchIcon = document.getElementById('searchIcon');
    const searchContainer = document.querySelector('.search-container');
    const searchPopup = document.getElementById('searchPopup');

    if (searchIcon && searchContainer) {
      searchIcon.addEventListener('click', function (e) {
        e.preventDefault();
        searchContainer.classList.toggle('active');
        const input = searchContainer.querySelector('input[name="search_query"]');
        if (input && searchContainer.classList.contains('active')) {
          input.focus();
        }
      });

      document.addEventListener('click', function (e) {
        if (!searchContainer.contains(e.target) && searchContainer.classList.contains('active')) {
          searchContainer.classList.remove('active');
        }
      });
    }

    // 4. Admin Login Modal
    const adminLink = document.getElementById('adminLink');
    const adminModal = document.getElementById('adminLoginModal');
    const closeBtn = adminModal ? adminModal.querySelector('.close-button') : null;
    const adminLoginForm = document.getElementById('adminLoginForm');
    const oneClickAdminBtn = document.getElementById('oneClickAdminBtn');

    if (adminLink && adminModal) {
      adminLink.addEventListener('click', function (e) {
        e.preventDefault();
        adminModal.style.display = 'block';
      });

      if (closeBtn) {
        closeBtn.addEventListener('click', function () {
          adminModal.style.display = 'none';
        });
      }

      window.addEventListener('click', function (e) {
        if (e.target === adminModal) {
          adminModal.style.display = 'none';
        }
      });

      if (oneClickAdminBtn) {
        oneClickAdminBtn.addEventListener('click', function () {
          if (window.RetroStore) {
            window.RetroStore.loginAsAdmin();
          }
          window.location.href = 'admin_dashboard.html';
        });
      }

      if (adminLoginForm) {
        adminLoginForm.addEventListener('submit', function (e) {
          e.preventDefault();
          if (window.RetroStore) {
            window.RetroStore.loginAsAdmin();
          }
          window.location.href = 'admin_dashboard.html';
        });
      }
    }

    // 5. Mobile Hamburger Menu
    const hamburger = document.querySelector('.hamburger');
    const navList = document.querySelector('.nav-list');
    if (hamburger && navList) {
      hamburger.addEventListener('click', function () {
        navList.classList.toggle('open');
      });
    }

    // 6. Logout confirmation
    const logoutIcon = document.getElementById('logoutIcon');
    const logoutModal = document.getElementById('logoutModal');
    const cancelLogout = document.getElementById('cancelLogout');
    const confirmLogout = document.getElementById('confirmLogout');

    if (logoutIcon && logoutModal) {
      logoutIcon.addEventListener('click', function (e) {
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
          window.location.href = 'loginview.html';
        });
      }
    }
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initStorefront);
  } else {
    initStorefront();
  }
})();
