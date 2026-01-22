// Arreglo de productos
let productos = [
    {
        nombre: "Laptop",
        precio: 850,
        descripcion: "Laptop para trabajo y estudio"
    },
    {
        nombre: "Mouse",
        precio: 20,
        descripcion: "Mouse inalámbrico"
    },
    {
        nombre: "Teclado",
        precio: 35,
        descripcion: "Teclado mecánico básico"
    }
];

// Referencias a elementos del DOM
const listaProductos = document.getElementById("lista-productos");
const botonAgregar = document.getElementById("btn-agregar");

// Función para renderizar productos
function renderizarProductos() {
    listaProductos.innerHTML = "";

    productos.forEach(producto => {
        const item = document.createElement("li");
        item.innerHTML = `
            <strong>${producto.nombre}</strong><br>
            Precio: $${producto.precio}<br>
            ${producto.descripcion}
        `;
        listaProductos.appendChild(item);
    });
}

// Evento para agregar un producto
botonAgregar.addEventListener("click", () => {
    const nuevoProducto = {
        nombre: "Nuevo Producto",
        precio: 50,
        descripcion: "Producto agregado dinámicamente"
    };

    productos.push(nuevoProducto);
    renderizarProductos();
});

// Renderizar al cargar la página
renderizarProductos();
