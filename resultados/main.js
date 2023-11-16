const API = `https://world.openfoodfacts.net/api/v2/product`;

const APIProductSearch = `https://es.openfoodfacts.org/cgi/search.pl?search_terms=${encodeURIComponent(userSearch)}&page_size=10&json=true`;

const userSearch = getElementsById("search".valueOf());

function tagsDesignacion () {
    var Celiaco = getElementsById("botonCeliaco");
    var Diabetico = getElementsById("botonDiabetico");
    var Vegano = getElementsById("botonVegano");
    var Vegetariano = getElementsById("botonVegetariano");
    var Hipertenso = getElementsById("botonHipertenso");
    var IntLactosa = getElementsById("botonIntLactosa");

    const alergeno = `` ; //intLactosa y Celiaco
    alergeno.join(", ")
    if (alergeno = 6){ 

    return alergeno
}
    const Sodium = ``; //hipertenso
};

const APIProductSearchTags = `https://es.openfoodfacts.org/cgi/search.pl?search_terms=${encodeURIComponent(textoABuscar)}&page_size=10&json=true&allergens=${alergeno}` ;

const createRes = document.createDocumentFragment(`section`);

const respuesta = fetch (APIProductSearch)
    .then(res => res.json )
    .then(data => {
        productList.forEach(product => {
            let elemento = document.createElement(`div.resultadoContainer`);
            elemento.innerHTML(`
            <div class="col"> 
                <div class="card h-100"> 
                    <img src= `;{Response.foto}` class="card-img-top" alt="...">
                        <div class="card-body"> 
                            <h5 class="card-title">`;{Response.product_name}`</h5> 
                            <p class="card-text">`;{objeto.descripcion}`</p> 
                        </div>
                        <div class="card-footer"> 
                            <!-- <small class="text-body-secondary">Last updated 3 mins ago</small> --> 
                            <img class="sellos" src=`;{sellosValor}` alt="durazno"/>
                            <img class="sellos" src=`;{sellosValordos}` alt="durazno"/> 
                            <img class="sellos" src=`;{sellosValortres}` alt="durazno"/>
                        </div> 
                </div> 
            </div>`)
            createRes.appendChild(elemento);
        });
    })



    sellosValor = 7;
    var sellosAsignacion = document.getElementsByClassName("sellos").src = sellosValor;
    var resultado = array.forEach(element => {

});
