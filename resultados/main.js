const API = `https://world.openfoodfacts.net/api/v2/product`;

/*
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
};*/

//const APIProductSearchTags = `https://es.openfoodfacts.org/cgi/search.pl?search_terms=${encodeURIComponent(userSearch)}&page_size=10&json=true&allergens=${alergeno}` ;



//document.addEventListener('DOMcontentLoaded', function(){ agregar al final 
    const botonBusqueda = document.getElementById("botonBusqueda");
    


    botonBusqueda.addEventListener('click', function() {
        const userinput = document.getElementById('search')
        userSearch = userinput.value;
        console.log(userSearch);

        const APIProductSearch = `https://es.openfoodfacts.org/cgi/search.pl?search_terms=${encodeURIComponent(userSearch)}&page_size=10&json=true`;
        const APIProductSearchWTgas = `https://es.openfoodfacts.org/cgi/search.pl?search_terms=${encodeURIComponent(userSearch)}&page_size=10&json=true&allergens=${alergeno}`; 
        const createRes = document.createDocumentFragment(`section`);

        const respuesta = fetch (APIProductSearch)
            .then(res => res.json())
            .then(data => {
                /* Sistema de tags

                nutrient_levels: {
                Traffic light indicators on main nutrients levels
                fat: enum
                Allowed: low┃moderate┃high
                salt: enum
                Allowed: low┃moderate┃high
                saturated-fat: enum
                Allowed: low┃moderate┃high
                sugars: enum.
                Allowed: low┃moderate┃high}

                    if (  && data.nutrient_levels.sugars = low){

                    }
                    if (data.nutriments.sodium >= '5g'){

                    }


                
                */
                data.forEach(product => {
                    let elemento = document.createElement(`div`);
                    elemento.className = 'resultadoContainer col';
                    elemento.innerHTML = `
                    <div class="col"> 
                        <div class="card h-100"> 
                            <img src= ${product.image_front_url} class="card-img-top" alt="...">
                                <div class="card-body"> 
                                    <h5 class="card-title">${product.product_name}</h5> 
                                    <p class="card-text">${product.generic_name}</p> 
                                </div>
                                <div class="card-footer"> 
                                    <!-- <small class="text-body-secondary">Last updated 3 mins ago</small> --> 
                                    <img class="sellos" src=${sellosValor} alt="durazno"/>
                                    <img class="sellos" src=${sellosValordos} alt="durazno"/> 
                                    <img class="sellos" src=${sellosValortres} alt="durazno"/>
                                </div> 
                        </div> 
                    </div>`;
                    console.log(data);
                    createRes.appendChild(elemento);
                });
            })
            .catch(error => {
                console.error('error fecht-data', error);
            })

    })

/*
    sellosValor = 7;
    var sellosAsignacion = document.getElementsByClassName("sellos").src = sellosValor;
    var resultado = array.forEach(element => {

});*/
