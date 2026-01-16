// ====== Referencias ======
const form = document.getElementById("form");
const btnEnviar = document.getElementById("btnEnviar");

const nombre = document.getElementById("nombre");
const correo = document.getElementById("correo");
const password = document.getElementById("password");
const confirmPassword = document.getElementById("confirmPassword");
const edad = document.getElementById("edad");

// errores (small)
const errNombre = document.getElementById("error-nombre");
const errCorreo = document.getElementById("error-correo");
const errPassword = document.getElementById("error-password");
const errConfirm = document.getElementById("error-confirmPassword");
const errEdad = document.getElementById("error-edad");

// ====== Reglas (regex) ======
// Email simple y suficiente para tarea
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

// Contraseña: mínimo 8, al menos 1 número y 1 caracter especial
// (permite letras, números y símbolos comunes)
const passRegex = /^(?=.*\d)(?=.*[!@#$%^&*()_\-+=\[\]{};:'",.<>/?\\|`~]).{8,}$/;

// ====== Helpers UI ======
function setValid(input, errorEl) {
  input.classList.remove("is-invalid");
  input.classList.add("is-valid");
  errorEl.textContent = "";
}

function setInvalid(input, errorEl, message) {
  input.classList.remove("is-valid");
  input.classList.add("is-invalid");
  errorEl.textContent = message;
}

// Habilita/deshabilita enviar según estado general
function updateSubmitButton() {
  const allValid =
    validateNombre(false) &&
    validateCorreo(false) &&
    validatePassword(false) &&
    validateConfirmPassword(false) &&
    validateEdad(false);

  btnEnviar.disabled = !allValid;
}

// ====== Validaciones (showError = true/false) ======
function validateNombre(showError = true) {
  const value = nombre.value.trim();

  if (value.length === 0) {
    if (showError) setInvalid(nombre, errNombre, "El nombre es obligatorio.");
    return false;
  }

  if (value.length < 3) {
    if (showError) setInvalid(nombre, errNombre, "Mínimo 3 caracteres.");
    return false;
  }

  setValid(nombre, errNombre);
  return true;
}

function validateCorreo(showError = true) {
  const value = correo.value.trim();

  if (value.length === 0) {
    if (showError) setInvalid(correo, errCorreo, "El correo es obligatorio.");
    return false;
  }

  if (!emailRegex.test(value)) {
    if (showError) setInvalid(correo, errCorreo, "Formato de correo inválido. Ej: correo@ejemplo.com");
    return false;
  }

  setValid(correo, errCorreo);
  return true;
}

function validatePassword(showError = true) {
  const value = password.value;

  if (value.length === 0) {
    if (showError) setInvalid(password, errPassword, "La contraseña es obligatoria.");
    return false;
  }

  if (!passRegex.test(value)) {
    if (showError) {
      setInvalid(
        password,
        errPassword,
        "Debe tener mínimo 8 caracteres, al menos 1 número y 1 carácter especial."
      );
    }
    return false;
  }

  setValid(password, errPassword);
  return true;
}

function validateConfirmPassword(showError = true) {
  const value = confirmPassword.value;

  if (value.length === 0) {
    if (showError) setInvalid(confirmPassword, errConfirm, "Confirma tu contraseña.");
    return false;
  }

  if (value !== password.value) {
    if (showError) setInvalid(confirmPassword, errConfirm, "Las contraseñas no coinciden.");
    return false;
  }

  // Si password está vacío o inválido, también debe reflejarse
  if (!validatePassword(false)) {
    if (showError) setInvalid(confirmPassword, errConfirm, "Primero ingresa una contraseña válida.");
    return false;
  }

  setValid(confirmPassword, errConfirm);
  return true;
}

function validateEdad(showError = true) {
  const value = edad.value.trim();

  if (value.length === 0) {
    if (showError) setInvalid(edad, errEdad, "La edad es obligatoria.");
    return false;
  }

  const n = Number(value);

  if (!Number.isFinite(n) || Number.isNaN(n)) {
    if (showError) setInvalid(edad, errEdad, "Ingresa una edad válida.");
    return false;
  }

  if (n < 18) {
    if (showError) setInvalid(edad, errEdad, "Debes ser mayor o igual a 18 años.");
    return false;
  }

  setValid(edad, errEdad);
  return true;
}

// ====== Eventos (tiempo real) ======
nombre.addEventListener("input", () => { validateNombre(true); updateSubmitButton(); });
correo.addEventListener("input", () => { validateCorreo(true); updateSubmitButton(); });

password.addEventListener("input", () => {
  validatePassword(true);
  // Revalida confirmación si ya escribió algo
  if (confirmPassword.value.length > 0) validateConfirmPassword(true);
  updateSubmitButton();
});

confirmPassword.addEventListener("input", () => { validateConfirmPassword(true); updateSubmitButton(); });
edad.addEventListener("input", () => { validateEdad(true); updateSubmitButton(); });

// Reset: limpia clases y mensajes
form.addEventListener("reset", () => {
  const inputs = [nombre, correo, password, confirmPassword, edad];
  const errors = [errNombre, errCorreo, errPassword, errConfirm, errEdad];

  inputs.forEach(i => i.classList.remove("is-valid", "is-invalid"));
  errors.forEach(e => (e.textContent = ""));

  // reset es instantáneo, entonces actualiza luego
  setTimeout(() => updateSubmitButton(), 0);
});

// Envío: confirma éxito
form.addEventListener("submit", (e) => {
  e.preventDefault();

  const ok =
    validateNombre(true) &&
    validateCorreo(true) &&
    validatePassword(true) &&
    validateConfirmPassword(true) &&
    validateEdad(true);

  updateSubmitButton();

  if (ok) {
    alert("✅ Formulario validado con éxito. ¡Todo correcto!");
    form.reset();
  }
});

// Estado inicial
updateSubmitButton();
