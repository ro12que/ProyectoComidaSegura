var objeto = {
    titulo: galletita,
    descripcion: descripcionlol,
    foto: foto.jpg
}


var resultado = array.forEach(element => {
        card.innerHTML()=`
        <div class="col">
            <div class="card h-100">
              <img src= `;{objeto.foto}` class="card-img-top" alt="...">
              <div class="card-body">
                <h5 class="card-title">`;{objeto.nombre}`</h5>
                <p class="card-text">`;{objeto.descripcion}`</p>
              </div>
              <div class="card-footer">
                <!-- <small class="text-body-secondary">Last updated 3 mins ago</small> -->
                <img class="sellos" src="" alt="durazno" />
              </div>
            </div>
        </div>`
});




sellosValor = 7;
var sellosAsignacion = document.getElementsByClassName("sellos").src = sellosValor