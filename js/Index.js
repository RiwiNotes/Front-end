let notes = document.getElementById("notes");
fetch("http://localhost:5024/api/Notas").then(r => r.json())
.then(data =>{
data.reverse();
data.forEach(element => {
    notes.innerHTML += `
    <div class="col-md-3">
    <div class="notes-container">
        <div class="note">
            <h2>${element.titulo}</h2>
            <p class="truncate-text">${element.contenido}</p>
            <p>${element.fecha}</p>
            <button class="buttonn" onclick="verDetalles(${element.id})">Ver Nota</button>
        </div>
    </div>
</div>

        `
    });
})


// fetch categorias 
let select = document.getElementById("select");
fetch("http://localhost:5024/api/Notas").then(response => response.json())
.then(data => {
    data.forEach(categoria => {
    select.innerHTML += `
    <option value="${categoria.categoria}">${categoria.categoria    }</option>
    
`
    
});
})

let select2 = document.getElementById("select2");
fetch("http://localhost:5024/api/Categorias").then(response => response.json())
.then(data => {
    data.forEach(categoria => {
    select2.innerHTML += `
    <option value="${categoria.nombre_categoria}">${categoria.nombre_categoria}</option>
    
`
    
});
})


//funcion para ver detalles

function verDetalles(id){
    fetch(`http://localhost:5024/api/Notas/${id}`).then(r => r.json()).then(data => {
    notes.innerHTML = `
    <div class="note">
            <h2>${data.titulo}</h2>
            <p>${data.contenido}</p>
            <p>${data.fecha}</p>
            <div class="misbotones">
            <a href="" class="buttonn"">Volver</a>
            <button class="delete-button" type="submit"  onclick="ActualizarNota(${data.id})">
            <svg class="delete-svgIcon" viewBox="0 0 448 512">
                            <path d="M135.2 17.7L128 32H32C14.3 32 0 46.3 0 64S14.3 96 32 96H416c17.7 0 32-14.3 32-32s-14.3-32-32-32H320l-7.2-14.3C307.4 6.8 296.3 0 284.2 0H163.8c-12.1 0-23.2 6.8-28.6 17.7zM416 128H32L53.2 467c1.6 25.3 22.6 45 47.9 45H346.9c25.3 0 46.3-19.7 47.9-45L416 128z"></path>
                            </svg>
            </button>
            <button class="delete-button" type="submit"  onclick="EliminarNota(${data.id})">
                <svg class="delete-svgIcon" viewBox="0 0 448 512">
                                <path d="M135.2 17.7L128 32H32C14.3 32 0 46.3 0 64S14.3 96 32 96H416c17.7 0 32-14.3 32-32s-14.3-32-32-32H320l-7.2-14.3C307.4 6.8 296.3 0 284.2 0H163.8c-12.1 0-23.2 6.8-28.6 17.7zM416 128H32L53.2 467c1.6 25.3 22.6 45 47.9 45H346.9c25.3 0 46.3-19.7 47.9-45L416 128z"></path>
                                </svg>
            </button>
        </div>
    `
})
    
}

function EliminarNota(id) {
    fetch(`http://localhost:5024/api/Notas/${id}`, {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json"
        }
    })
    .then(r => r.json())
    .then(data => {
        alert("Se ha eliminado una nota");
        location.reload();  
    });
}

function crearNota(){
    let titulo = document.getElementById("titulo").value;
    let contenido = document.getElementById("contenido").value;
    let fecha = new Date(Date.now()); 
    let categoria = document.getElementById("select2").value;
    fetch("http://localhost:5024/api/Notas",{
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            titulo,
            contenido,
            fecha,
            categoria
        })
    }).then(r => {
        if(r.ok){
            location.reload(); 
        }
        return r.json();
    });
}

function ActualizarNota(id){


    fetch("http://localhost:5024/api/Notas")
    .then(r => r.json)
    .then(data =>{
        notes.innerHTML = 
        `
        <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div class="modal-dialog">
            <div class="modal-content fondo">
                <div class="modal-header">
                <h1 class="modal-title fs-5 mih1" id="exampleModalLabel">Nota</h1>
                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body fondo" id="modal-body">
                    <div >
                    <form class="form">
                        <label for="select2" class="form-label">Categorías</label>
                        <select aria-label="Default select example" id="select2" class="form-select mb-3" required>
                            <option selected>Categorías</option>
                        </select>
                        <label for="titulo" class="form-label">Título</label>
                        <input type="text" class="form-control mb-3" id="titulo" aria-describedby="emailHelp" value="${data.titulo}" required>
                        
                        <label for="contenido" class="form-label">Contenido</label>
                        <textarea placeholder="Ingresa tu nota" id="contenido" class="form-control mb-3" value="${data.contenido}" required></textarea>
                        
                        
                        
                        <div class="modal-footer">
                            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cerrar</button>
                            <button type="button" class="btn btn-primary" onclick="UpdateNota(${data.id})">Guardar cambios</button>
                        </div>
                    </form>
                </div>
            </div>
            </div>
        </div>
        `
    })
}


