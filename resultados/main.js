const API = `https://es.openfoodfacts.org/cgi/search.pl`;

//------------------SISTEMA DE BOTONES-----------------------------------

var Celiaco = document.getElementById("botonCeliaco");//LISTO
var Diabetico = document.getElementById("botonDiabetico");//LISTO
var Vegano = document.getElementById("botonVegano");//LISTO
var Vegetariano = document.getElementById("botonVegetariano");//LISTO
var Hipertenso = document.getElementById("botonHipertenso");//LISTO
var IntoLactosa = document.getElementById("botonIntoLactosa");//LISTO 6

const trolo = []

Celiaco.addEventListener('click', ()=>{
    Celiaco = true;
    console.log(Celiaco)
    trolo.push('Celiaco')
    console.log(trolo)
});
            
Diabetico.addEventListener('click', ()=>{
    Diabetico = true;
    console.log(Diabetico)
    trolo.push('Diabetico')
    console.log(trolo)
});

Vegano.addEventListener('click', ()=>{
    Vegano = true;
    console.log(Vegano)
    trolo.push('Vegano')
    console.log(trolo)
});

Vegetariano.addEventListener('click', ()=>{
    Vegetariano = true;
    console.log(Vegetariano)
    trolo.push('Vegetariano')
    console.log(trolo)
});

Hipertenso.addEventListener('click', ()=>{
    Hipertenso = true;
    console.log(Hipertenso)
    trolo.push('Hipertenso')
    console.log(trolo)
});

IntoLactosa.addEventListener('click', ()=>{
    IntoLactosa = true;
    console.log(IntoLactosa)
    trolo.push('intoLactosa')
    console.log(trolo)
});


//-------------------SISTEMA DE FETCH------------------------------------

const botonBusqueda = document.getElementById("botonBusqueda");

botonBusqueda.addEventListener('click', function() {

    const userinput = document.getElementById('search')
    userSearch = userinput.value;
    console.log(userSearch);

    const queryParams = {
        search_terms: `${userSearch}`, // Reemplaza 'tu_termino_de_búsqueda' por tu término de búsqueda real
        page_size: 20,
        json: {
            allergens_from_ingredients: [],
            nutrient_levels: {
            },
            ingredients_analysis_tags: [],
        }
    };

    for (let i = 0; i < 6; i++) {
    
        switch (trolo[i]) {
            case Diabetico:
                queryParams.json.nutrient_levels.sugar ='low';
                break;
            case Hipertenso:
                queryParams.json.nutrient_levels.salt ='low';
                break;
            case Celiaco:
                queryParams.json.allergens_from_ingredients.push('gluten');
                break;
            case IntoLactosa:
                queryParams.json.allergens_from_ingredients.push('lactose');
                break;
            case Vegetariano:
                queryParams.json.ingredients_analysis_tags.push('en:vegetarian');
                break;
            case Vegano:
                queryParams.json.ingredients_analysis_tags.push('en:vegan');
                break;
            default:
    
                break;
        }
    };
    
    const queryString = new URLSearchParams(queryParams).toString();
    console.log(queryString)
    const APIProductSearch = `${API}?${queryString}`;
    console.log(APIProductSearch);
    console.log(queryParams);

    //const APIProductSearch = `https://es.openfoodfacts.org/cgi/search.pl?search_terms=${encodeURIComponent(userSearch)}&page_size=20&json=true`;    
    const createRes = document.getElementById('ResultadoCointainer');
    const respuesta = fetch (APIProductSearch)
        .then(res => res.json())
        .then(data => {
            console.log(data)
            data.products.forEach(product => {
                let elemento = document.createElement("div");
                createRes.appendChild(elemento);
                elemento.className = 'resultadoContainer col';
                elemento.innerHTML = `
                    <div class="col"> 
                        <div class="card h-100"> 
                            <img src= ${product.image_front_url} class="card-img-top" alt="...">
                                <div class="card-body"> 
                                    <h5 class="card-title">${product.product_name_es}</h5> 
                                    <p class="card-text">${product.generic_name}</p> 
                                </div>
                                <div class="card-footer"> 
                                    <!-- <small class="text-body-secondary">Last updated 3 mins ago</small> --> 

                                </div> 
                        </div> 
                    </div>`;
            });
        })
    .catch(error => {
        console.error('error fecht-data', error);
    })

})

/*                                    <!--<img class="sellos" src=${sellosValor} alt="durazno"/>
                                    <img class="sellos" src=${sellosValordos} alt="durazno"/> 
                                    <img class="sellos" src=${sellosValortres} alt="durazno"/> -->
    sellosValor = 7;
    var sellosAsignacion = document.getElementsByClassName("sellos").src = sellosValor;
    var resultado = array.forEach(element => {

});*/
