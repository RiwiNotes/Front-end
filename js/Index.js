let notes = document.getElementById("notes");
fetch("http://localhost:5024/api/Notas").then(r => r.json())
.then(data =>{
data.reverse();
data.forEach(element => {
    notes.innerHTML += `
    <div class="col-md-3">
    <div class="notes2-container">
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
fetch("http://localhost:5024/api/Categorias").then(response => response.json())
.then(data => {
    data.forEach(categoria => {
    select.innerHTML += `
    <option value="${categoria.nombre_categoria}">${categoria.nombre_categoria   }</option>
    
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
    <div class="col-md-12">
                <div class="notes-container">
                    <div class="note2">
                        <h2>${data.titulo}</h2>
                        <p>${data.contenido}</p>
                        <p>${data.fecha}</p>
                        <div class="misbotones">
                        <a href="" class="buttonn"">Volver</a>
                        <button class="delete-button" type="submit"  onclick="EliminarNota(${data.id})">
                            <svg class="delete-svgIcon" viewBox="0 0 448 512">
                                            <path d="M135.2 17.7L128 32H32C14.3 32 0 46.3 0 64S14.3 96 32 96H416c17.7 0 32-14.3 32-32s-14.3-32-32-32H320l-7.2-14.3C307.4 6.8 296.3 0 284.2 0H163.8c-12.1 0-23.2 6.8-28.6 17.7zM416 128H32L53.2 467c1.6 25.3 22.6 45 47.9 45H346.9c25.3 0 46.3-19.7 47.9-45L416 128z"></path>
                                            </svg>
                        </button>
                    </div>
                </div>
            </div>
            
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
