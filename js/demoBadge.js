/**
 * The Retro Rack - Interactive Portfolio Live Demo Badge
 * Allows visitors to instantly switch between Admin Dashboard and Storefront,
 * toggle roles, and reset demo data.
 */

(function () {
  function renderBadge() {
    if (document.getElementById('retro-demo-badge')) return;

    const isAdminPage = window.location.pathname.includes('admin') || window.location.href.includes('admin_');
    const auth = window.RetroStore ? window.RetroStore.getAuth() : { role: 'guest', user: null };
    const roleName = auth.role === 'admin' ? 'Admin (' + (auth.user ? auth.user.username : 'Louis') + ')' : (auth.isLoggedIn ? 'Customer (' + (auth.user ? auth.user.username : 'Alex') + ')' : 'Guest');

    const badge = document.createElement('div');
    badge.id = 'retro-demo-badge';
    badge.innerHTML = `
      <style>
        #retro-demo-badge {
          position: fixed;
          bottom: 20px;
          right: 20px;
          z-index: 999999;
          font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
          font-size: 13px;
        }
        .retro-badge-card {
          background: #1e1e24;
          color: #f4f1ea;
          border: 1px solid rgba(255, 119, 0, 0.4);
          border-radius: 12px;
          padding: 12px 16px;
          box-shadow: 0 10px 30px rgba(0, 0, 0, 0.45);
          display: flex;
          flex-direction: column;
          gap: 8px;
          min-width: 250px;
          backdrop-filter: blur(10px);
          transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
        }
        .retro-badge-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          font-weight: 700;
          font-size: 12px;
          letter-spacing: 0.5px;
          text-transform: uppercase;
          color: #ff7700;
          border-bottom: 1px solid rgba(255, 255, 255, 0.1);
          padding-bottom: 6px;
        }
        .retro-badge-header span {
          display: flex;
          align-items: center;
          gap: 5px;
        }
        .retro-badge-role {
          display: flex;
          align-items: center;
          justify-content: space-between;
          font-size: 11px;
          color: #c9c7bf;
        }
        .retro-role-pill {
          background: rgba(255, 119, 0, 0.15);
          color: #ff8811;
          padding: 2px 8px;
          border-radius: 99px;
          font-weight: 600;
          border: 1px solid rgba(255, 119, 0, 0.3);
        }
        .retro-badge-actions {
          display: flex;
          flex-direction: column;
          gap: 6px;
          margin-top: 4px;
        }
        .retro-badge-btn {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          padding: 7px 12px;
          border-radius: 6px;
          font-size: 12px;
          font-weight: 600;
          cursor: pointer;
          text-decoration: none;
          border: none;
          transition: all 0.2s ease;
        }
        .retro-badge-btn-primary {
          background: #ff7700;
          color: #ffffff;
        }
        .retro-badge-btn-primary:hover {
          background: #e06600;
          transform: translateY(-1px);
        }
        .retro-badge-btn-secondary {
          background: rgba(255, 255, 255, 0.1);
          color: #ffffff;
        }
        .retro-badge-btn-secondary:hover {
          background: rgba(255, 255, 255, 0.2);
        }
        .retro-badge-btn-reset {
          background: transparent;
          color: #a09f98;
          font-size: 11px;
          padding: 4px;
        }
        .retro-badge-btn-reset:hover {
          color: #ff5555;
        }
        .retro-toggle-btn {
          background: none;
          border: none;
          color: #888;
          cursor: pointer;
          font-size: 16px;
          line-height: 1;
          padding: 0 4px;
        }
        .retro-badge-collapsed .retro-badge-body {
          display: none;
        }
        .retro-toast {
          position: fixed;
          top: 24px;
          right: 24px;
          background: #1e1e24;
          color: #fff;
          border-left: 4px solid #ff7700;
          padding: 12px 20px;
          border-radius: 6px;
          box-shadow: 0 8px 24px rgba(0,0,0,0.3);
          z-index: 1000000;
          font-size: 13px;
          animation: slideIn 0.3s ease;
        }
        @keyframes slideIn {
          from { transform: translateX(100%); opacity: 0; }
          to { transform: translateX(0); opacity: 1; }
        }
      </style>
      <div class="retro-badge-card" id="retro-badge-card">
        <div class="retro-badge-header">
          <span>⚡ Live Portfolio Demo</span>
          <button class="retro-toggle-btn" id="retro-collapse-btn" title="Toggle Demo Panel">−</button>
        </div>
        <div class="retro-badge-body" id="retro-badge-body">
          <div class="retro-badge-role">
            <span>Current View:</span>
            <span class="retro-role-pill">${roleName}</span>
          </div>
          <div class="retro-badge-actions">
            ${isAdminPage ? `
              <a href="index.html" class="retro-badge-btn retro-badge-btn-primary">
                🛍️ View Customer Storefront
              </a>
            ` : `
              <button id="retro-jump-admin-btn" class="retro-badge-btn retro-badge-btn-primary">
                ⚡ 1-Click Admin Dashboard
              </button>
            `}
            ${!isAdminPage ? `
              <button id="retro-jump-customer-btn" class="retro-badge-btn retro-badge-btn-secondary">
                👤 Log In as Demo Customer
              </button>
            ` : ''}
            <button id="retro-reset-btn" class="retro-badge-btn retro-badge-btn-reset">
              🔄 Reset Demo Data to Default
            </button>
          </div>
        </div>
      </div>
    `;

    document.body.appendChild(badge);

    // Event listeners
    const collapseBtn = document.getElementById('retro-collapse-btn');
    const badgeBody = document.getElementById('retro-badge-body');
    collapseBtn.addEventListener('click', function () {
      if (badgeBody.style.display === 'none') {
        badgeBody.style.display = 'block';
        collapseBtn.textContent = '−';
      } else {
        badgeBody.style.display = 'none';
        collapseBtn.textContent = '+';
      }
    });

    const jumpAdminBtn = document.getElementById('retro-jump-admin-btn');
    if (jumpAdminBtn) {
      jumpAdminBtn.addEventListener('click', function () {
        if (window.RetroStore) {
          window.RetroStore.loginAsAdmin();
        }
        window.location.href = 'admin_dashboard.html';
      });
    }

    const jumpCustomerBtn = document.getElementById('retro-jump-customer-btn');
    if (jumpCustomerBtn) {
      jumpCustomerBtn.addEventListener('click', function () {
        if (window.RetroStore) {
          window.RetroStore.loginAsCustomer();
        }
        showToast('Logged in as Demo Customer (Alex Mercer)');
        setTimeout(() => window.location.reload(), 600);
      });
    }

    const resetBtn = document.getElementById('retro-reset-btn');
    if (resetBtn) {
      resetBtn.addEventListener('click', function () {
        if (confirm('Reset all demo data (products, orders, cart) back to clean initial state?')) {
          if (window.RetroStore) {
            window.RetroStore.resetDemoData();
          }
          showToast('Demo data reset successfully!');
          setTimeout(() => window.location.reload(), 800);
        }
      });
    }
  }

  function showToast(message) {
    const toast = document.createElement('div');
    toast.className = 'retro-toast';
    toast.textContent = message;
    document.body.appendChild(toast);
    setTimeout(() => {
      toast.style.opacity = '0';
      toast.style.transition = 'opacity 0.4s ease';
      setTimeout(() => toast.remove(), 400);
    }, 2500);
  }

  window.showRetroToast = showToast;

  // Initialize once DOM is ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', renderBadge);
  } else {
    renderBadge();
  }
})();
