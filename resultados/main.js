const API = `https://es.openfoodfacts.org/cgi/search.pl`;

//------------------SISTEMA DE BOTONES-----------------------------------

var Celiaco = document.getElementById("botonCeliaco");//LISTO
var Diabetico = document.getElementById("botonDiabetico");//LISTO
var Vegano = document.getElementById("botonVegano");//LISTO
var Vegetariano = document.getElementById("botonVegetariano");//LISTO
var Hipertenso = document.getElementById("botonHipertenso");//LISTO
var IntoLactosa = document.getElementById("botonIntoLactosa");//LISTO 6

var TagDesignador = []

Celiaco.addEventListener('click', ()=>{
    if(TagDesignador.includes('Celiaco') === false){
    Celiaco = true;
    console.log(Celiaco)
    TagDesignador.push('Celiaco')
    console.log(TagDesignador)
    }else{
        TagDesignador = TagDesignador.filter(tag=> tag != 'Celiaco');
        console.log(TagDesignador)
    }
});
            
Diabetico.addEventListener('click', ()=>{
    if(TagDesignador.includes('Diabetico') === false){
    Diabetico = true;
    console.log(Diabetico)
    TagDesignador.push('Diabetico')
    console.log(TagDesignador)
    }else{
        TagDesignador = TagDesignador.filter(tag=> tag != 'Diabetico');
        console.log(TagDesignador)
    }
});

Vegano.addEventListener('click', ()=>{
    if(TagDesignador.includes('Vegano') === false){
    Vegano = true;
    console.log(Vegano)
    TagDesignador.push('Vegano')
    console.log(TagDesignador)
    }else{
        TagDesignador = TagDesignador.filter(tag=> tag != 'Vegano');
        console.log(TagDesignador)
    }
});

Vegetariano.addEventListener('click', ()=>{
    if(TagDesignador.includes('Vegetariano') === false){
    Vegetariano = true;
    console.log(Vegetariano)
    TagDesignador.push('Vegetariano')
    console.log(TagDesignador)
    }else{
        TagDesignador = TagDesignador.filter(tag=> tag != 'Vegetariano');
        console.log(TagDesignador)
    }
});

Hipertenso.addEventListener('click', ()=>{
    if(TagDesignador.includes('Hipertenso') === false){
    Hipertenso = true;
    console.log(Hipertenso)
    TagDesignador.push('Hipertenso')
    console.log(TagDesignador)
    }else{
        TagDesignador = TagDesignador.filter(tag=> tag != 'Hipertenso');
        console.log(TagDesignador)
    }
});

IntoLactosa.addEventListener('click', ()=>{
    if(TagDesignador.includes('intoLactosa') === false){
    IntoLactosa = true;
    console.log(IntoLactosa)
    TagDesignador.push('intoLactosa')
    console.log(TagDesignador)
    }else{
        TagDesignador = TagDesignador.filter(tag=> tag != 'intoLactosa');
        console.log(TagDesignador)
    }
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
            countries: 'Argentina',
            allergens_from_ingredients: [],
            nutrient_levels: {
            },
            ingredients_analysis_tags: [],
        }
    };

    for (let i = 0; i < 6; i++) {
    
        switch (TagDesignador[i]) {
            case 'Diabetico':
                queryParams.json.nutrient_levels.push('sugar: low');
                console.log('diabtico');
                break;
            case 'Hipertenso':
                queryParams.json.nutrient_levels.push('salt: low');
                console.log('hipertenso');
                break;
            case 'Celiaco':
                queryParams.json.allergens_from_ingredients.push('gluten');
                console.log('celiaco');
                break;
            case 'IntoLactosa':
                queryParams.json.allergens_from_ingredients.push('lactose');
                console.log('intolactosa');
                break;
            case 'Vegetariano':
                queryParams.json.ingredients_analysis_tags.push('en:vegetarian');
                console.log('vegetariano');
                break;
            case 'Vegano':
                queryParams.json.ingredients_analysis_tags.push('en:vegan');
                console.log('vegano');
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
                        <div class="card"> 
                            <img src= ${product.image_front_url} class="card-img-top" alt="...">
                                <div class="card-body"> 
                                    <h5 class="card-title">${product.product_name_es}</h5> 
                                    <p class="card-text">${product.generic_name}</p> 
                                </div>
                                <div class="card-footer"> 
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
