window.dataLayer = window.dataLayer || [];

/* PRICING_VIEW */
(function () {
  if (window.location.pathname.indexOf('pricing') !== -1) {
    window.dataLayer.push({ event: 'pricing_view', page_path: window.location.pathname });
  }
})();

/* CTA_CLICK */
document.addEventListener('DOMContentLoaded', function () {
  ['cta-main', 'cta-secondary', 'nav-pricing'].forEach(function (id) {
    var el = document.getElementById(id);
    if (el) {
      el.addEventListener('click', function () {
        window.dataLayer.push({
          event: 'cta_click',
          cta_id: id,
          page_path: window.location.pathname
        });
      });
    }
  });
});

/* FORM_SUBMIT */
document.addEventListener('DOMContentLoaded', function () {
  var form = document.getElementById('signup-form');
  if (!form) return;

  form.addEventListener('submit', function (e) {
    e.preventDefault();

    var email = document.getElementById('email');
    var role = document.getElementById('role');
    var consent = document.getElementById('consent');

    if (!email.value || !email.value.includes('@')) { email.focus(); return; }
    if (!role.value) { role.focus(); return; }
    if (!consent.checked) { return; }

    window.dataLayer.push({
      event: 'form_submit',
      page_path: window.location.pathname,
      role: role.value,
      consent: 1,
      has_email: 1
    });

    form.style.display = 'none';
    document.getElementById('form-success').classList.remove('hidden');
  });
});
