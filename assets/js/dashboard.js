/**
 * LUMINA BRIDAL STUDIO — BRIDE & ADMIN DASHBOARD CONTROLLER (dashboard.js)
 * Powers all 8 Bride Portal pages (pages/dashboard/*.html) and all 8 Studio
 * Admin Portal pages (pages/dashboard/admin/*.html) with interactive demo data.
 */

(function () {
  'use strict';

  function initSidebarToggle() {
    const shell = document.querySelector('.dash-shell');
    const sidebar = document.querySelector('.dash-sidebar');
    const toggleBtns = document.querySelectorAll('[data-dash-toggle]');
    const collapseBtns = document.querySelectorAll('[data-dash-collapse]');

    toggleBtns.forEach((btn) => {
      btn.addEventListener('click', () => {
        if (sidebar) sidebar.classList.toggle('is-open');
      });
    });

    collapseBtns.forEach((btn) => {
      btn.addEventListener('click', () => {
        if (window.innerWidth <= 1024) {
          if (sidebar) sidebar.classList.remove('is-open');
          return;
        }
        if (shell) shell.classList.toggle('is-collapsed');
      });
    });
  }

  function initProgressRings() {
    document.querySelectorAll('.progress-ring-value[data-progress]').forEach((circle) => {
      const pct = parseFloat(circle.getAttribute('data-progress') || '75');
      const circumference = 339.29;
      const offset = circumference - (pct / 100) * circumference;
      setTimeout(() => {
        circle.style.setProperty('--ring-offset', offset.toFixed(2));
      }, 200);
    });
  }

  function initChatMessaging() {
    const chatForm = document.getElementById('dashChatForm');
    const chatInput = document.getElementById('dashChatInput');
    const chatList = document.getElementById('dashChatMessages');
    if (!chatForm || !chatInput || !chatList) return;

    chatForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const text = chatInput.value.trim();
      if (!text) return;

      const bubble = document.createElement('div');
      bubble.className = 'chat-bubble chat-bubble--outgoing';
      bubble.innerHTML = `<p>${text.replace(/</g, '&lt;')}</p><span class="chat-meta">Just now • Delivered</span>`;
      chatList.appendChild(bubble);
      chatInput.value = '';
      chatList.scrollTop = chatList.scrollHeight;

      setTimeout(() => {
        const reply = document.createElement('div');
        reply.className = 'chat-bubble chat-bubble--incoming';
        reply.innerHTML = `<p>Thank you! Aurelia Vance's bridal concierge has noted this on your look sheet and updated your suite dossier.</p><span class="chat-meta">Lumina Concierge • Just now</span>`;
        chatList.appendChild(reply);
        chatList.scrollTop = chatList.scrollHeight;
      }, 900);
    });
  }

  function initMoodboardAndTrials() {
    /* Select / Lock Look buttons on my-looks.html */
    document.querySelectorAll('[data-lock-look]').forEach((btn) => {
      btn.addEventListener('click', () => {
        const lookName = btn.getAttribute('data-lock-look');
        document.querySelectorAll('[data-lock-look]').forEach((b) => {
          b.textContent = 'Select as Primary Look';
          b.classList.remove('btn--gold');
          b.classList.add('btn--outline');
        });
        btn.textContent = 'Locked for Ceremony';
        btn.classList.remove('btn--outline');
        btn.classList.add('btn--gold');
        if (window.AurelleToast) {
          window.AurelleToast(`"${lookName}" locked as your Primary Wedding Day Look!`);
        }
      });
    });

    /* Invoice Download buttons on payments.html */
    document.querySelectorAll('[data-download-invoice]').forEach((btn) => {
      btn.addEventListener('click', () => {
        const invId = btn.getAttribute('data-download-invoice');
        const content = [
          '====================================================',
          '          LUMINA BRIDAL STUDIO — INVOICE           ',
          '====================================================',
          `Invoice Number : ${invId}`,
          'Client Bride   : Priya Sharma',
          'Package        : Royal Airbrush & HD Bridal Couture Suite',
          'Lead Artist    : Aurelia Vance',
          'Status         : PAID / VERIFIED',
          '===================================================='
        ].join('\r\n');
        const blob = new Blob([content], { type: 'text/plain;charset=utf-8' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `${invId}-Lumina-Bridal-Studio.txt`;
        document.body.appendChild(a);
        a.click();
        a.remove();
        URL.revokeObjectURL(url);
        if (window.AurelleToast) window.AurelleToast(`Invoice ${invId} downloaded.`);
      });
    });

    /* Admin Booking Status Filters & Status Toggle */
    const statusFilter = document.getElementById('adminBookingFilter');
    if (statusFilter) {
      statusFilter.addEventListener('change', () => {
        const val = statusFilter.value;
        document.querySelectorAll('[data-booking-row]').forEach((row) => {
          const st = row.getAttribute('data-booking-row');
          row.style.display = val === 'all' || st === val ? '' : 'none';
        });
      });
    }

    document.querySelectorAll('[data-cycle-status]').forEach((btn) => {
      btn.addEventListener('click', () => {
        const current = btn.textContent.trim();
        const next =
          current === 'Pending Trial'
            ? 'Confirmed'
            : current === 'Confirmed'
            ? 'Deposit Paid'
            : 'Confirmed';
        btn.textContent = next;
        if (window.AurelleToast) window.AurelleToast(`Booking status updated to: ${next}`);
      });
    });
  }

  function initAdminCharts() {
    if (!window.AurelleCharts) return;
    window.AurelleCharts.renderBarChart('adminRevenueChart', [
      { label: 'Jul', value: 18400, display: '$18.4k' },
      { label: 'Aug', value: 22900, display: '$22.9k' },
      { label: 'Sep', value: 27500, display: '$27.5k' },
      { label: 'Oct', value: 34200, display: '$34.2k' },
      { label: 'Nov', value: 41800, display: '$41.8k' },
      { label: 'Dec', value: 46500, display: '$46.5k' }
    ]);

    window.AurelleCharts.renderBarChart('adminLookPopularityChart', [
      { label: 'Classic Red', value: 94, display: '94%' },
      { label: 'Soft Glam', value: 88, display: '88%' },
      { label: 'Royal Gold', value: 82, display: '82%' },
      { label: 'Dewy Glass', value: 76, display: '76%' },
      { label: 'Cathedral', value: 71, display: '71%' }
    ]);
  }

  document.addEventListener('DOMContentLoaded', () => {
    initSidebarToggle();
    initProgressRings();
    initChatMessaging();
    initMoodboardAndTrials();
    initAdminCharts();
  });
})();
