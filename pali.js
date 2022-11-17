

class Producto {
    constructor(id, nombre, pais, precio, img) {
        this.id = id;
        this.nombre = nombre; 
        this.pais = pais;
        this.precio = precio;
        this.img = img;
        this.cantidad = 1; 
    }
}

const dimaria = new Producto(1, "Angel Di Maria", "Argentina", 1500, "img/dimaria.png");
const papu = new Producto(2, "Papu Gomez","Argentina", 1000, "img/papugomez.png");
const messi = new Producto(3, "Leonel Messi", "Argentina", 3500, "img/messi.jpg");
const cuty = new Producto(4, "Cristian Romero","Argentina", 1000, "img/cuty.png");
const neymar = new Producto(5, "Neymar JR","Brasil", 2500, "img/neymar.png");
const vinicius = new Producto(6, "Vinicius JR","Brasil", 1500, "img/vinijr.png");
const militao = new Producto(7, "Militao","Brasil", 500, "img/militao.png");
const antony = new Producto(8, "Antony","Brasil", 1000, "img/antony.png");
const kante = new Producto(9, "Ngolo Kante","Francia",2000, "img/kante.png");
const griezman = new Producto(10, "Antoine Griezman","Francia", 1500, "img/griezman.png");
const benzema = new Producto(11, "Karim Benzema","Francia", 2400, "img/benzema.png");
const pogba = new Producto(12, "Paul Pogba","Francia", 1500, "img/pogba.jpg");
const renato = new Producto(13,"Renato Sanches","Portugal", 500,  "img/renatosanches.png");
const neves = new Producto(14, "Neves","Portugal",  1000, "img/neves.png");
const cristiano = new Producto(15,"Cristiano Ronaldo","Portugal", 3000,  "img/cr7.png");
const mendes = new Producto(16, "Mendes","Portugal",  5000, "img/mendes.png");

// creo el array
const productos = [dimaria, papu, messi, cuty, neymar, vinicius, militao, antony, kante, griezman, benzema, pogba, renato, neves, cristiano, mendes];

// hago el array del carrito vacio 

let carrito = [];

 const contenedorProductos = document.getElementById("contenedorProductos");

// cree la funcion para mostrar los productos

const mostrarProductos = () => {
    productos.forEach((producto) => {
        const card = document.createElement("div");
        card.classList.add("col-xl-3", "col-md-6", "col-xs-12");
        card.innerHTML = `
            <div class="card">
                <img src="${producto.img}" class="card-img-top imgProductos" alt="${producto.nombre}">
                <div class="card-body">
                <h4 class="card-title"> ${producto.nombre} </h4>
                <h5 class="card-title"> ${producto.pais} </h5>
                <p class="card-text"> ${producto.precio} </p>
                <button class="btn colorBoton" id="boton${producto.id}"> Agregar al Carrito </button>
                </div>
            </div>
        `
        contenedorProductos.appendChild(card);

        //se agregan productos al carrito y sale un cartelito abajo a la derecha avisandonos que se agrego el producto seleccionado
        const boton = document.getElementById(`boton${producto.id}`);
        boton.addEventListener("click", () => {
            agregarAlCarrito(producto.id)
            Toastify({
                text:"Producto agregado al carrito",
                duration: 3000,
                gravity: "bottom",
                position: "right",
                style:
            {
                background: "linear-gradient(to right, #51319c, #2B0388)",
            }
                
                
            }).showToast();
        })
    })
}



//fruncion agregar carrito 

const agregarAlCarrito = (id) => {
    const producto = productos.find((producto) => producto.id === id);
    const productoEnCarrito = carrito.find((producto) => producto.id === id);
    if(productoEnCarrito){
        productoEnCarrito.cantidad++;
    }else {
        carrito.push(producto);
    
        localStorage.setItem("carrito",JSON.stringify(carrito));
    }
    calcularTotal();
}

mostrarProductos();

//mostar carrito

const contenedorCarrito = document.getElementById("contenedorCarrito");

const verCarrito = document.getElementById("verCarrito");

verCarrito.addEventListener("click", () => {
    mostrarCarrito();
});



const mostrarCarrito = () => {
    contenedorCarrito.innerHTML="";
    carrito.forEach((producto) => {
        const card = document.createElement("div");
        card.classList.add("col-xl-3", "col-md-6", "col-xs-12");
        card.innerHTML = `
            <div class="card">
                <img src="${producto.img}" class="card-img-top imgProductos" alt="${producto.nombre}">
                <div class="card-body">
                <h4 class="card-title"> ${producto.nombre} </h4>
                <h5 class="card-title"> ${producto.pais} </h5>
                <p class="card-text"> ${producto.precio} </p>
                <p class="card-text"> ${producto.cantidad} </p>
                <button class="btn colorBoton" id="eliminar${producto.id}"> Eliminar Producto </button>
                </div>
            </div>
        `
        contenedorCarrito.appendChild(card);

        // elimino productos del carrito
        const boton = document.getElementById(`eliminar${producto.id}`);
        boton.addEventListener("click", () => {
            eliminarDelCarrito(producto.id);
            Swal.fire( {
                title:"Producto Eliminado, siga buscando sus figuritas mas deseadas !!!",
                icon: "success",
                background: "#2B0388",                
                confirmButtonText: "Aceptar",      
                confirmButtonColor: "#2B0388",
            })
        })
    })
    calcularTotal();
}


//eliminar un producto del carrito 

const eliminarDelCarrito = (id) => {
    const producto = carrito.find((producto) => producto.id === id);
    const indice = carrito.indexOf(producto);
    carrito.splice(indice, 1);
    mostrarCarrito();
  
    localStorage.setItem("carrito", JSON.stringify(carrito));
}

//vaciar carrito

const vaciarCarrito = document.getElementById("vaciarCarrito");

vaciarCarrito.addEventListener("click", () => {
    eliminarTodoElCarrito();
})

//funcion que elimina el carrito completo

const eliminarTodoElCarrito = () => {
    carrito = [];
    mostrarCarrito();
 
    localStorage.clear();
}

//Mostramos mensaje con el total de la compra 

const total = document.getElementById("total");

const calcularTotal = () => {
    let totalCompra = 0; 
    carrito.forEach((producto) => {
        totalCompra += producto.precio * producto.cantidad;
        
    })
    total.innerHTML = `Total: $${totalCompra}`;
}




