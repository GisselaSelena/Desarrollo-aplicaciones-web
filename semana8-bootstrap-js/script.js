// Botón de alerta
const btnAlerta = document.getElementById("btnAlerta");
btnAlerta.addEventListener("click", () => {
  alert("¡Hola! Esta es una alerta personalizada creada con JavaScript ✅");
});

// Validación de formulario
const form = document.getElementById("contactForm");
const nombre = document.getElementById("nombre");
const correo = document.getElementById("correo");
const mensaje = document.getElementById("mensaje");
const formStatus = document.getElementById("formStatus");

function esEmailValido(value) {
  // Validación simple (suficiente para la tarea)
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(value.trim());
}

function setError(input, isValid) {
  if (isValid) {
    input.classList.remove("is-invalid");
    input.classList.add("is-valid");
  } else {
    input.classList.remove("is-valid");
    input.classList.add("is-invalid");
  }
}

function validarCampos() {
  const nombreOk = nombre.value.trim().length >= 2;
  const correoOk = esEmailValido(correo.value);
  const mensajeOk = mensaje.value.trim().length >= 10;

  setError(nombre, nombreOk);
  setError(correo, correoOk);
  setError(mensaje, mensajeOk);

  return nombreOk && correoOk && mensajeOk;
}

// Validación en tiempo real (dinámica)
[nombre, correo, mensaje].forEach((input) => {
  input.addEventListener("input", () => {
    validarCampos();
    formStatus.innerHTML = "";
  });
});

form.addEventListener("submit", (e) => {
  e.preventDefault();

  const ok = validarCampos();

  if (!ok) {
    formStatus.innerHTML = `<div class="alert alert-danger mb-0" role="alert">
      Revisa los campos marcados en rojo antes de enviar.
    </div>`;
    return;
  }

  // Simulación de envío exitoso (sin servidor)
  formStatus.innerHTML = `<div class="alert alert-success mb-0" role="alert">
    ¡Mensaje enviado correctamente! (Simulación)
  </div>`;

  form.reset();
  [nombre, correo, mensaje].forEach((i) => i.classList.remove("is-valid"));
});
