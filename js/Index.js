let row = document.getElementById("row");
fetch("http://localhost:5024/api/Categorias").then(r => r.json())
.then(data =>{
 data.forEach(element => {
        row.innerHTML += `<div class="col-md-3">
        <div class="card">
            <div class="card-body" >
                <h5 class="card-title">${element.nombre_categoria}</h5>
                
                
            </div>
        </div>
    </div>`
    });
})

