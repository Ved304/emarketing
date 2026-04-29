// ============================================================
// A/B TEST — Lab 7
// Testowany element: Formularz rejestracji
//   Wariant A (kontrolny): 3 pola (email, rola, cel)
//   Wariant B (testowy):   2 pola (email, rola) + przypomnienie wartości
// ============================================================

// --- 1. Losowanie wariantu przy każdym załadowaniu strony ---
// (localStorage pominięty celowo — mała próba testowa, losowanie ręczne)
var abVariant = Math.random() < 0.5 ? 'A' : 'B';

// --- 2. Wyślij event ab_impression z parametrem variant ---
window.dataLayer = window.dataLayer || [];
window.dataLayer.push({
  event: 'ab_impression',
  variant: abVariant
});

// --- 3. Zastosuj wariant B w DOM ---
if (abVariant === 'B') {
  // Pokaż przypomnienie wartości nad formularzem
  var reminder = document.getElementById('ab-reminder');
  if (reminder) reminder.style.display = 'block';

  // Ukryj i wyłącz pole "cel" (disabled = nie jedzie w submit)
  var goalField = document.getElementById('goal-field');
  if (goalField) goalField.style.display = 'none';

  var goalInput = document.getElementById('goal');
  if (goalInput) goalInput.disabled = true;
}

// --- 4. Śledzenie cta_click z parametrem variant ---
document.querySelectorAll('#cta-main, #cta-secondary').forEach(function (el) {
  el.addEventListener('click', function () {
    window.dataLayer.push({
      event: 'cta_click',
      variant: abVariant
    });
  });
});

// --- 5. Śledzenie form_submit z parametrem variant ---
var form = document.getElementById('signup-form');
if (form) {
  form.addEventListener('submit', function (e) {
    e.preventDefault();

    window.dataLayer.push({
      event: 'form_submit',
      variant: abVariant
    });

    // Pokaż komunikat sukcesu
    form.style.display = 'none';
    var success = document.getElementById('form-success');
    if (success) success.style.display = 'block';
  });
}
