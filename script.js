// Replace this with your Google Apps Script deployment URL after setup
const APPS_SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbzxQ9qukREDtn5pvuF8esgQ9Z3F3Grxh8kR5vhA08Tda_nuDV-lpV7ZXPQRKkGmhNtI3w/exec';

// Countdown to FIFA World Cup 2026 opening match: June 11, 2026
document.addEventListener('DOMContentLoaded', function() {
  const target = new Date('2026-06-11T00:00:00').getTime();

  function pad(n) { return String(n).padStart(2, '0'); }

  function tick() {
    const diff = target - Date.now();

    if (diff <= 0) {
      ['cd-days','cd-hours','cd-minutes','cd-seconds'].forEach(function(id) {
        document.getElementById(id).textContent = '00';
      });
      return;
    }

    document.getElementById('cd-days').textContent    = pad(Math.floor(diff / 86400000));
    document.getElementById('cd-hours').textContent   = pad(Math.floor((diff % 86400000) / 3600000));
    document.getElementById('cd-minutes').textContent = pad(Math.floor((diff % 3600000)  / 60000));
    document.getElementById('cd-seconds').textContent = pad(Math.floor((diff % 60000)    / 1000));
  }

  tick();
  setInterval(tick, 1000);

  // SVG fill: global progress — same for all users based on hardcoded start time
  const FILL_START       = new Date('2026-05-19T05:00:00Z').getTime();
  const FILL_DURATION_MS = 42 * 24 * 60 * 60 * 1000; // 42 días (19 → 30 junio)
  const SVG_HEIGHT       = 500;
  const LINE_SPACING     = 8;
  const STROKE_BOTTOM    = 8;
  const STROKE_TOP       = 0.5;
  const SVG_NS           = 'http://www.w3.org/2000/svg';

  function updateSVGFill() {
    const elapsed  = Date.now() - FILL_START;
    const progress = Math.min(Math.max(elapsed / FILL_DURATION_MS, 0), 1);
    const fillHeight = progress * SVG_HEIGHT;
    const fillY      = SVG_HEIGHT - fillHeight;

    const pctEl = document.getElementById('logrado-pct');
    if (pctEl) pctEl.textContent = 'Logrado: ' + Math.round(progress * 100) + '%';

    const group = document.getElementById('fill-lines');
    if (!group) return;

    while (group.firstChild) group.removeChild(group.firstChild);

    for (let y = SVG_HEIGHT - LINE_SPACING / 2; y >= fillY; y -= LINE_SPACING) {
      const t  = y / SVG_HEIGHT;
      const sw = STROKE_TOP + t * (STROKE_BOTTOM - STROKE_TOP);
      const line = document.createElementNS(SVG_NS, 'line');
      line.setAttribute('x1', '0');
      line.setAttribute('y1', y.toFixed(1));
      line.setAttribute('x2', '500');
      line.setAttribute('y2', y.toFixed(1));
      line.setAttribute('stroke', '#901913');
      line.setAttribute('stroke-width', sw.toFixed(2));
      group.appendChild(line);
    }
  }

  updateSVGFill();
  setInterval(updateSVGFill, 1000);
});

const form        = document.getElementById('firma-form');
const nombreInput = document.getElementById('nombre');
const correoInput = document.getElementById('correo');
const aceptaInput = document.getElementById('acepta');
const submitBtn   = document.getElementById('submit-btn');
const formStatus  = document.getElementById('form-status');

function validateForm() {
  let isValid = true;
  clearErrors();

  if (!nombreInput.value.trim()) {
    showFieldError('nombre', 'Por favor ingresa tu nombre.');
    isValid = false;
  } else if (nombreInput.value.trim().length < 2) {
    showFieldError('nombre', 'El nombre debe tener al menos 2 caracteres.');
    isValid = false;
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!correoInput.value.trim()) {
    showFieldError('correo', 'Por favor ingresa tu correo electrónico.');
    isValid = false;
  } else if (!emailRegex.test(correoInput.value.trim())) {
    showFieldError('correo', 'Por favor ingresa un correo válido (ej: nombre@dominio.com).');
    isValid = false;
  }

  if (!aceptaInput.checked) {
    showFieldError('acepta', 'Debes aceptar los términos para continuar.');
    isValid = false;
  }

  return isValid;
}

function showFieldError(fieldName, message) {
  const input = document.getElementById(fieldName);
  const errorSpan = document.getElementById('error-' + fieldName);
  if (input && input.type !== 'checkbox') {
    input.classList.add('has-error');
  }
  if (errorSpan) {
    errorSpan.textContent = message;
  }
}

function clearErrors() {
  ['nombre', 'correo', 'acepta'].forEach(function(name) {
    const input = document.getElementById(name);
    const errorSpan = document.getElementById('error-' + name);
    if (input) input.classList.remove('has-error');
    if (errorSpan) errorSpan.textContent = '';
  });
}

function setLoadingState() {
  submitBtn.disabled = true;
  submitBtn.textContent = 'Enviando...';
}

function resetButtonState() {
  submitBtn.disabled = false;
  submitBtn.textContent = 'Firmar ahora';
}

function showSuccess() {
  const modal = document.getElementById('success-modal');
  if (modal) {
    modal.hidden = false;
    document.getElementById('modal-close').focus();
  }
}

function showError(message) {
  formStatus.className = 'form-status error';
  formStatus.textContent = message || 'Ocurrió un error. Por favor intenta de nuevo.';
}

function hideStatus() {
  formStatus.className = 'form-status';
  formStatus.textContent = '';
}

form.addEventListener('submit', async function(e) {
  e.preventDefault();
  hideStatus();

  if (!validateForm()) return;

  setLoadingState();

  const payload = {
    nombre:          nombreInput.value.trim(),
    correo:          correoInput.value.trim(),
    acepta_terminos: aceptaInput.checked ? 'yes' : 'no'
  };

  try {
    const response = await fetch(APPS_SCRIPT_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'text/plain' },
      body: JSON.stringify(payload)
    });

    if (!response.ok) {
      throw new Error('Server responded with status ' + response.status);
    }

    const result = await response.json();

    if (result.status === 'success') {
      showSuccess();
      form.reset();
      clearErrors();
    } else {
      showError(result.message || 'El servidor reportó un error inesperado.');
    }

  } catch (error) {
    console.error('Submission error:', error);
    showError('No se pudo conectar con el servidor. Verifica tu conexión e intenta de nuevo.');
  } finally {
    resetButtonState();
  }
});

document.getElementById('modal-close').addEventListener('click', function() {
  document.getElementById('success-modal').hidden = true;
});

[nombreInput, correoInput].forEach(function(input) {
  input.addEventListener('input', function() {
    this.classList.remove('has-error');
    const errorSpan = document.getElementById('error-' + this.id);
    if (errorSpan) errorSpan.textContent = '';
  });
});
