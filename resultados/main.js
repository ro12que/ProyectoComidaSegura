const API = `https://world.openfoodfacts.net/api/v2/product` ;

const userSearch = getElementsById("search".valueOf());

const respuesta = fetch (API/userSearch)
    .then((Response)=> Response.json())
    .then((userSearch)=>{
    const resp = data.map((userSearch)=>{        
    card.innerHTML()=`
            <div class="col">
                <div class="card h-100">
                    <img src= `;{Response.foto}` class="card-img-top" alt="...">
                <div class="card-body">
                    <h5 class="card-title">`;{Response.product_name}`</h5>
                    <p class="card-text">`;{objeto.descripcion}`</p>
                </div>
                <div class="card-footer">
                    <!-- <small class="text-body-secondary">Last updated 3 mins ago</small> -->
                    <img class="sellos" src=`;{sellosValor}` alt="durazno" />
                </div>
                </div>
            </div>`
            });
        },
)

function tagsDesignacion () {
    var Celiaco = getElementsById("botonCeliaco");
    var Diabetico = getElementsById("botonDiabetico");
    var Vegano = getElementsById("botonVegano");
    var Vegetariano = getElementsById("botonVegetariano");
    var Hipertenso = getElementsById("botonHipertenso");
    var IntLactosa = getElementsById("botonIntLactosa");
};

    sellosValor = 7;
    var sellosAsignacion = document.getElementsByClassName("sellos").src = sellosValor;
    var resultado = array.forEach(element => {

});
