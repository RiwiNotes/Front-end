let notes = document.getElementById("notes");
fetch("http://localhost:5024/api/Notas").then(r => r.json())
.then(data =>{
 data.forEach(element => {
    notes.innerHTML += `
        <div class="note">
            <h2>${element.titulo}</h2>
            <p>${element.contenido}</p>
            <p>${element.fecha}</p>
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
    <option value="${categoria.id}">${categoria.nombre_categoria}</option>
    
`
    
});
})

