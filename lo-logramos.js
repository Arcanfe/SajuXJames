// ============================================================
// lo-logramos.js — Landing post 100% firmas
// Misma integración con Apps Script + Omnisend que la landing
// original (tag 'landing-namecheap' en Omnisend, pestaña 'Firmas').
// ============================================================

const APPS_SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbx-QUBI_uXwRHuzTtf-YS_9EJuSUeWHPEiM8RlydGErQnU0-cELGmf2Aad1Pmo2WTbz/exec';

const COUNTDOWN_PREVENTA = new Date('2026-06-04T10:00:00-05:00').getTime();
const COUNTDOWN_GENERAL  = new Date('2026-06-04T14:00:00-05:00').getTime();

// Lista de indicativos: misma que en index.html.
const COUNTRY_CODES = [
  ['+57', '🇨🇴', 'Colombia', true],
  ['+93', '🇦🇫', 'Afganistán'],
  ['+355', '🇦🇱', 'Albania'],
  ['+49', '🇩🇪', 'Alemania'],
  ['+376', '🇦🇩', 'Andorra'],
  ['+244', '🇦🇴', 'Angola'],
  ['+1264', '🇦🇮', 'Anguila'],
  ['+672', '🇦🇶', 'Antártida'],
  ['+1268', '🇦🇬', 'Antigua y Barbuda'],
  ['+966', '🇸🇦', 'Arabia Saudita'],
  ['+213', '🇩🇿', 'Argelia'],
  ['+54', '🇦🇷', 'Argentina'],
  ['+374', '🇦🇲', 'Armenia'],
  ['+297', '🇦🇼', 'Aruba'],
  ['+61', '🇦🇺', 'Australia'],
  ['+43', '🇦🇹', 'Austria'],
  ['+994', '🇦🇿', 'Azerbaiyán'],
  ['+1242', '🇧🇸', 'Bahamas'],
  ['+880', '🇧🇩', 'Bangladés'],
  ['+1246', '🇧🇧', 'Barbados'],
  ['+973', '🇧🇭', 'Baréin'],
  ['+32', '🇧🇪', 'Bélgica'],
  ['+501', '🇧🇿', 'Belice'],
  ['+229', '🇧🇯', 'Benín'],
  ['+1441', '🇧🇲', 'Bermudas'],
  ['+375', '🇧🇾', 'Bielorrusia'],
  ['+591', '🇧🇴', 'Bolivia'],
  ['+387', '🇧🇦', 'Bosnia y Herzegovina'],
  ['+267', '🇧🇼', 'Botsuana'],
  ['+55', '🇧🇷', 'Brasil'],
  ['+673', '🇧🇳', 'Brunéi'],
  ['+359', '🇧🇬', 'Bulgaria'],
  ['+226', '🇧🇫', 'Burkina Faso'],
  ['+257', '🇧🇮', 'Burundi'],
  ['+975', '🇧🇹', 'Bután'],
  ['+238', '🇨🇻', 'Cabo Verde'],
  ['+855', '🇰🇭', 'Camboya'],
  ['+237', '🇨🇲', 'Camerún'],
  ['+1', '🇨🇦', 'Canadá'],
  ['+974', '🇶🇦', 'Catar'],
  ['+235', '🇹🇩', 'Chad'],
  ['+56', '🇨🇱', 'Chile'],
  ['+86', '🇨🇳', 'China'],
  ['+357', '🇨🇾', 'Chipre'],
  ['+269', '🇰🇲', 'Comoras'],
  ['+850', '🇰🇵', 'Corea del Norte'],
  ['+82', '🇰🇷', 'Corea del Sur'],
  ['+225', '🇨🇮', 'Costa de Marfil'],
  ['+506', '🇨🇷', 'Costa Rica'],
  ['+385', '🇭🇷', 'Croacia'],
  ['+53', '🇨🇺', 'Cuba'],
  ['+599', '🇨🇼', 'Curazao'],
  ['+45', '🇩🇰', 'Dinamarca'],
  ['+1767', '🇩🇲', 'Dominica'],
  ['+593', '🇪🇨', 'Ecuador'],
  ['+20', '🇪🇬', 'Egipto'],
  ['+503', '🇸🇻', 'El Salvador'],
  ['+971', '🇦🇪', 'Emiratos Árabes Unidos'],
  ['+291', '🇪🇷', 'Eritrea'],
  ['+421', '🇸🇰', 'Eslovaquia'],
  ['+386', '🇸🇮', 'Eslovenia'],
  ['+34', '🇪🇸', 'España'],
  ['+1', '🇺🇸', 'Estados Unidos'],
  ['+372', '🇪🇪', 'Estonia'],
  ['+251', '🇪🇹', 'Etiopía'],
  ['+63', '🇵🇭', 'Filipinas'],
  ['+358', '🇫🇮', 'Finlandia'],
  ['+679', '🇫🇯', 'Fiyi'],
  ['+33', '🇫🇷', 'Francia'],
  ['+241', '🇬🇦', 'Gabón'],
  ['+220', '🇬🇲', 'Gambia'],
  ['+995', '🇬🇪', 'Georgia'],
  ['+233', '🇬🇭', 'Ghana'],
  ['+350', '🇬🇮', 'Gibraltar'],
  ['+1473', '🇬🇩', 'Granada'],
  ['+30', '🇬🇷', 'Grecia'],
  ['+299', '🇬🇱', 'Groenlandia'],
  ['+590', '🇬🇵', 'Guadalupe'],
  ['+1671', '🇬🇺', 'Guam'],
  ['+502', '🇬🇹', 'Guatemala'],
  ['+594', '🇬🇫', 'Guayana Francesa'],
  ['+44', '🇬🇬', 'Guernsey'],
  ['+224', '🇬🇳', 'Guinea'],
  ['+245', '🇬🇼', 'Guinea-Bisáu'],
  ['+240', '🇬🇶', 'Guinea Ecuatorial'],
  ['+592', '🇬🇾', 'Guyana'],
  ['+509', '🇭🇹', 'Haití'],
  ['+504', '🇭🇳', 'Honduras'],
  ['+852', '🇭🇰', 'Hong Kong'],
  ['+36', '🇭🇺', 'Hungría'],
  ['+91', '🇮🇳', 'India'],
  ['+62', '🇮🇩', 'Indonesia'],
  ['+98', '🇮🇷', 'Irán'],
  ['+964', '🇮🇶', 'Irak'],
  ['+353', '🇮🇪', 'Irlanda'],
  ['+354', '🇮🇸', 'Islandia'],
  ['+44', '🇮🇲', 'Isla de Man'],
  ['+972', '🇮🇱', 'Israel'],
  ['+39', '🇮🇹', 'Italia'],
  ['+1876', '🇯🇲', 'Jamaica'],
  ['+81', '🇯🇵', 'Japón'],
  ['+44', '🇯🇪', 'Jersey'],
  ['+962', '🇯🇴', 'Jordania'],
  ['+7', '🇰🇿', 'Kazajistán'],
  ['+254', '🇰🇪', 'Kenia'],
  ['+996', '🇰🇬', 'Kirguistán'],
  ['+686', '🇰🇮', 'Kiribati'],
  ['+383', '🇽🇰', 'Kosovo'],
  ['+965', '🇰🇼', 'Kuwait'],
  ['+856', '🇱🇦', 'Laos'],
  ['+266', '🇱🇸', 'Lesoto'],
  ['+371', '🇱🇻', 'Letonia'],
  ['+961', '🇱🇧', 'Líbano'],
  ['+231', '🇱🇷', 'Liberia'],
  ['+218', '🇱🇾', 'Libia'],
  ['+423', '🇱🇮', 'Liechtenstein'],
  ['+370', '🇱🇹', 'Lituania'],
  ['+352', '🇱🇺', 'Luxemburgo'],
  ['+853', '🇲🇴', 'Macao'],
  ['+389', '🇲🇰', 'Macedonia del Norte'],
  ['+261', '🇲🇬', 'Madagascar'],
  ['+60', '🇲🇾', 'Malasia'],
  ['+265', '🇲🇼', 'Malaui'],
  ['+960', '🇲🇻', 'Maldivas'],
  ['+223', '🇲🇱', 'Malí'],
  ['+356', '🇲🇹', 'Malta'],
  ['+212', '🇲🇦', 'Marruecos'],
  ['+692', '🇲🇭', 'Islas Marshall'],
  ['+596', '🇲🇶', 'Martinica'],
  ['+230', '🇲🇺', 'Mauricio'],
  ['+222', '🇲🇷', 'Mauritania'],
  ['+262', '🇾🇹', 'Mayotte'],
  ['+52', '🇲🇽', 'México'],
  ['+691', '🇫🇲', 'Micronesia'],
  ['+373', '🇲🇩', 'Moldavia'],
  ['+377', '🇲🇨', 'Mónaco'],
  ['+976', '🇲🇳', 'Mongolia'],
  ['+382', '🇲🇪', 'Montenegro'],
  ['+1664', '🇲🇸', 'Montserrat'],
  ['+258', '🇲🇿', 'Mozambique'],
  ['+95', '🇲🇲', 'Birmania'],
  ['+264', '🇳🇦', 'Namibia'],
  ['+674', '🇳🇷', 'Nauru'],
  ['+977', '🇳🇵', 'Nepal'],
  ['+505', '🇳🇮', 'Nicaragua'],
  ['+227', '🇳🇪', 'Níger'],
  ['+234', '🇳🇬', 'Nigeria'],
  ['+683', '🇳🇺', 'Niue'],
  ['+47', '🇳🇴', 'Noruega'],
  ['+687', '🇳🇨', 'Nueva Caledonia'],
  ['+64', '🇳🇿', 'Nueva Zelanda'],
  ['+31', '🇳🇱', 'Países Bajos'],
  ['+968', '🇴🇲', 'Omán'],
  ['+92', '🇵🇰', 'Pakistán'],
  ['+680', '🇵🇼', 'Palaos'],
  ['+970', '🇵🇸', 'Palestina'],
  ['+507', '🇵🇦', 'Panamá'],
  ['+675', '🇵🇬', 'Papúa Nueva Guinea'],
  ['+595', '🇵🇾', 'Paraguay'],
  ['+51', '🇵🇪', 'Perú'],
  ['+689', '🇵🇫', 'Polinesia Francesa'],
  ['+48', '🇵🇱', 'Polonia'],
  ['+351', '🇵🇹', 'Portugal'],
  ['+1787', '🇵🇷', 'Puerto Rico'],
  ['+44', '🇬🇧', 'Reino Unido'],
  ['+236', '🇨🇫', 'República Centroafricana'],
  ['+420', '🇨🇿', 'República Checa'],
  ['+243', '🇨🇩', 'República Democrática del Congo'],
  ['+1809', '🇩🇴', 'República Dominicana'],
  ['+242', '🇨🇬', 'República del Congo'],
  ['+250', '🇷🇼', 'Ruanda'],
  ['+40', '🇷🇴', 'Rumanía'],
  ['+7', '🇷🇺', 'Rusia'],
  ['+212', '🇪🇭', 'Sáhara Occidental'],
  ['+1684', '🇦🇸', 'Samoa Americana'],
  ['+685', '🇼🇸', 'Samoa'],
  ['+1869', '🇰🇳', 'San Cristóbal y Nieves'],
  ['+378', '🇸🇲', 'San Marino'],
  ['+508', '🇵🇲', 'San Pedro y Miquelón'],
  ['+1784', '🇻🇨', 'San Vicente y las Granadinas'],
  ['+290', '🇸🇭', 'Santa Elena'],
  ['+1758', '🇱🇨', 'Santa Lucía'],
  ['+239', '🇸🇹', 'Santo Tomé y Príncipe'],
  ['+221', '🇸🇳', 'Senegal'],
  ['+381', '🇷🇸', 'Serbia'],
  ['+248', '🇸🇨', 'Seychelles'],
  ['+232', '🇸🇱', 'Sierra Leona'],
  ['+65', '🇸🇬', 'Singapur'],
  ['+963', '🇸🇾', 'Siria'],
  ['+252', '🇸🇴', 'Somalia'],
  ['+94', '🇱🇰', 'Sri Lanka'],
  ['+27', '🇿🇦', 'Sudáfrica'],
  ['+249', '🇸🇩', 'Sudán'],
  ['+211', '🇸🇸', 'Sudán del Sur'],
  ['+46', '🇸🇪', 'Suecia'],
  ['+41', '🇨🇭', 'Suiza'],
  ['+597', '🇸🇷', 'Surinam'],
  ['+268', '🇸🇿', 'Suazilandia'],
  ['+66', '🇹🇭', 'Tailandia'],
  ['+886', '🇹🇼', 'Taiwán'],
  ['+255', '🇹🇿', 'Tanzania'],
  ['+992', '🇹🇯', 'Tayikistán'],
  ['+253', '🇩🇯', 'Yibuti'],
  ['+228', '🇹🇬', 'Togo'],
  ['+676', '🇹🇴', 'Tonga'],
  ['+1868', '🇹🇹', 'Trinidad y Tobago'],
  ['+216', '🇹🇳', 'Túnez'],
  ['+993', '🇹🇲', 'Turkmenistán'],
  ['+90', '🇹🇷', 'Turquía'],
  ['+688', '🇹🇻', 'Tuvalu'],
  ['+380', '🇺🇦', 'Ucrania'],
  ['+256', '🇺🇬', 'Uganda'],
  ['+598', '🇺🇾', 'Uruguay'],
  ['+998', '🇺🇿', 'Uzbekistán'],
  ['+678', '🇻🇺', 'Vanuatu'],
  ['+379', '🇻🇦', 'Vaticano'],
  ['+58', '🇻🇪', 'Venezuela'],
  ['+84', '🇻🇳', 'Vietnam'],
  ['+1284', '🇻🇬', 'Islas Vírgenes Británicas'],
  ['+1340', '🇻🇮', 'Islas Vírgenes de EE. UU.'],
  ['+967', '🇾🇪', 'Yemen'],
  ['+260', '🇿🇲', 'Zambia'],
  ['+263', '🇿🇼', 'Zimbabue']
];

function pad(n) {
  return String(n).padStart(2, '0');
}

function tickCountdown(prefix, target) {
  const diff = target - Date.now();
  const safe = Math.max(diff, 0);
  document.getElementById(prefix + '-days').textContent    = pad(Math.floor(safe / 86400000));
  document.getElementById(prefix + '-hours').textContent   = pad(Math.floor((safe % 86400000) / 3600000));
  document.getElementById(prefix + '-minutes').textContent = pad(Math.floor((safe % 3600000)  / 60000));
  document.getElementById(prefix + '-seconds').textContent = pad(Math.floor((safe % 60000)    / 1000));
}

function buildIndicativoSelect() {
  const select = document.getElementById('indicativo');
  if (!select) return;
  const frag = document.createDocumentFragment();
  COUNTRY_CODES.forEach(function(c) {
    const opt = document.createElement('option');
    opt.value = c[0];
    opt.textContent = c[1] + ' ' + c[2] + ' ' + c[0];
    if (c[3]) opt.selected = true;
    frag.appendChild(opt);
  });
  select.appendChild(frag);
}

document.addEventListener('DOMContentLoaded', function() {
  buildIndicativoSelect();

  function tickAll() {
    tickCountdown('cd1', COUNTDOWN_PREVENTA);
    tickCountdown('cd2', COUNTDOWN_GENERAL);
  }
  tickAll();
  setInterval(tickAll, 1000);

  initForm();
});

// ---------- Form handling ----------
function initForm() {
  const form         = document.getElementById('firma-form');
  const nombreInput  = document.getElementById('nombre');
  const correoInput  = document.getElementById('correo');
  const celularInput = document.getElementById('celular');
  const aceptaInput  = document.getElementById('acepta');
  const submitBtn    = document.getElementById('submit-btn');
  const formStatus   = document.getElementById('form-status');

  function showFieldError(name, message) {
    const input = document.getElementById(name);
    const errorSpan = document.getElementById('error-' + name);
    if (input && input.type !== 'checkbox') input.classList.add('has-error');
    if (errorSpan) errorSpan.textContent = message;
  }

  function clearErrors() {
    ['nombre', 'correo', 'celular', 'acepta'].forEach(function(name) {
      const input = document.getElementById(name);
      const errorSpan = document.getElementById('error-' + name);
      if (input) input.classList.remove('has-error');
      if (errorSpan) errorSpan.textContent = '';
    });
  }

  function validate() {
    clearErrors();
    let ok = true;

    if (!nombreInput.value.trim()) {
      showFieldError('nombre', 'Por favor ingresa tu nombre.');
      ok = false;
    } else if (nombreInput.value.trim().length < 2) {
      showFieldError('nombre', 'El nombre debe tener al menos 2 caracteres.');
      ok = false;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!correoInput.value.trim()) {
      showFieldError('correo', 'Por favor ingresa tu correo electrónico.');
      ok = false;
    } else if (!emailRegex.test(correoInput.value.trim())) {
      showFieldError('correo', 'Por favor ingresa un correo válido (ej: nombre@dominio.com).');
      ok = false;
    }

    const celularRegex = /^[0-9]{7,15}$/;
    if (!celularInput.value.trim()) {
      showFieldError('celular', 'Por favor ingresa tu número de celular.');
      ok = false;
    } else if (!celularRegex.test(celularInput.value.trim())) {
      showFieldError('celular', 'Ingresa solo dígitos (entre 7 y 15 caracteres).');
      ok = false;
    }

    if (!aceptaInput.checked) {
      showFieldError('acepta', 'Debes aceptar los términos para continuar.');
      ok = false;
    }

    return ok;
  }

  function setLoading() {
    submitBtn.disabled = true;
    submitBtn.textContent = 'Enviando...';
  }

  function resetButton() {
    submitBtn.disabled = false;
    submitBtn.textContent = '¡Asegurar mi cupo!';
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
    if (!validate()) return;

    setLoading();

    const payload = {
      nombre:          nombreInput.value.trim(),
      correo:          correoInput.value.trim(),
      celular:         document.getElementById('indicativo').value + ' ' + celularInput.value.trim(),
      acepta_terminos: aceptaInput.checked ? 'yes' : 'no'
    };

    try {
      const response = await fetch(APPS_SCRIPT_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'text/plain' },
        body: JSON.stringify(payload)
      });

      if (!response.ok) throw new Error('Server responded with status ' + response.status);

      const result = await response.json();

      if (result.status === 'success') {
        showSuccess();
        form.reset();
        clearErrors();
        document.getElementById('indicativo').value = '+57';
      } else {
        showError(result.message || 'El servidor reportó un error inesperado.');
      }
    } catch (err) {
      console.error('Submission error:', err);
      showError('No se pudo conectar con el servidor. Verifica tu conexión e intenta de nuevo.');
    } finally {
      resetButton();
    }
  });

  document.getElementById('modal-close').addEventListener('click', function() {
    document.getElementById('success-modal').hidden = true;
  });

  [nombreInput, correoInput, celularInput].forEach(function(input) {
    input.addEventListener('input', function() {
      this.classList.remove('has-error');
      const errorSpan = document.getElementById('error-' + this.id);
      if (errorSpan) errorSpan.textContent = '';
    });
  });
}
