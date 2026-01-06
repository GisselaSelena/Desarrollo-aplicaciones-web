// 1. Traemos los elementos del HTML
const input = document.getElementById("urlImagen");
const btnAgregar = document.getElementById("btnAgregar");
const btnEliminar = document.getElementById("btnEliminar");
const galeria = document.getElementById("galeria");

let imagenSeleccionada = null;

// 2. Agregar imagen
btnAgregar.addEventListener("click", () => {
  const url = input.value;

  if (url === "") {
    alert("Por favor pega una URL");
    return;
  }

  const img = document.createElement("img");
  img.src = url;

  img.addEventListener("click", () => {
    if (imagenSeleccionada) {
      imagenSeleccionada.classList.remove("seleccionada");
    }
    img.classList.add("seleccionada");
    imagenSeleccionada = img;
  });

  galeria.appendChild(img);
  input.value = "";
});

// 3. Eliminar imagen seleccionada
btnEliminar.addEventListener("click", () => {
  if (imagenSeleccionada) {
    galeria.removeChild(imagenSeleccionada);
    imagenSeleccionada = null;
  } else {
    alert("Selecciona una imagen primero");
  }
});
