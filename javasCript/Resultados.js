//------------------SISTEMA CAPTURA DE BOTONES-----------------------------------

var Celiaco = document.getElementById("botonCeliaco");//LISTO
var Diabetico = document.getElementById("botonDiabetico");//LISTO
var Vegano = document.getElementById("botonVegano");//LISTO
var Vegetariano = document.getElementById("botonVegetariano");//LISTO
var Hipertenso = document.getElementById("botonHipertenso");//LISTO
var IntoLactosa = document.getElementById("botonIntoLactosa");//LISTO 6

var TagDesignador = [] //guarda los valores de los  botones que se clickean

Celiaco.addEventListener('click', () => {
    if (TagDesignador.includes('Celiaco') === false) {
        Celiaco = true;
        console.log('el usuario agrego a la lista personalizada "celiaco"')
        TagDesignador.push('Celiaco')
        console.log(TagDesignador)
    } else {
        TagDesignador = TagDesignador.filter(tag => tag != 'Celiaco');
        console.log(TagDesignador)
    }
});

Diabetico.addEventListener('click', () => {
    if (TagDesignador.includes('Diabetico') === false) {
        Diabetico = true;
        console.log(Diabetico)
        TagDesignador.push('Diabetico')
        console.log(TagDesignador)
    } else {
        TagDesignador = TagDesignador.filter(tag => tag != 'Diabetico');
        console.log(TagDesignador)
    }
});

Vegano.addEventListener('click', () => {
    if (TagDesignador.includes('Vegano') === false) {
        Vegano = true;
        console.log(Vegano)
        TagDesignador.push('Vegano')
        console.log(TagDesignador)
    } else {
        TagDesignador = TagDesignador.filter(tag => tag != 'Vegano');
        console.log(TagDesignador)
    }
});

Vegetariano.addEventListener('click', () => {
    if (TagDesignador.includes('Vegetariano') === false) {
        Vegetariano = true;
        console.log(Vegetariano)
        TagDesignador.push('Vegetariano')
        console.log(TagDesignador)
    } else {
        TagDesignador = TagDesignador.filter(tag => tag != 'Vegetariano');
        console.log(TagDesignador)
    }
});

Hipertenso.addEventListener('click', () => {
    if (TagDesignador.includes('Hipertenso') === false) {
        Hipertenso = true;
        console.log(Hipertenso)
        TagDesignador.push('Hipertenso')
        console.log(TagDesignador)
    } else {
        TagDesignador = TagDesignador.filter(tag => tag != 'Hipertenso');
        console.log(TagDesignador)
    }
});

IntoLactosa.addEventListener('click', () => {
    if (TagDesignador.includes('intoLactosa') === false) {
        IntoLactosa = true;
        console.log(IntoLactosa)
        TagDesignador.push('intoLactosa')
        console.log(TagDesignador)
    } else {
        TagDesignador = TagDesignador.filter(tag => tag != 'intoLactosa');
        console.log(TagDesignador)
    }
});


//---------------------SISTEMA DE FILTRADO------------------------

const botonBusqueda = document.getElementById("botonBusqueda");

botonBusqueda.addEventListener('click', function () {

    const userinput = document.getElementById('search') //se toma la busqueda del usuario
    userSearch = userinput.value;
    console.log(`los parametros de busqueda del usuario son ${userSearch}`);

    const API = `https://ar.openfoodfacts.org/cgi/search.pl`; //nuestra hermosa api

    const queryParams = {
        json:{},
        search_terms: `${userSearch}`,
        page_size: 20,
        action: 'process',
    };

    for (let i = 0; i < 6; i++) {

        switch (TagDesignador[i]) {
                case 'Diabetico':
                queryParams.tagtype_1=`'nutrient_levels'`;
                queryParams.tag_contains_1= `'contains'`;
                queryParams.tag_1=`en:"sugar in low quantity"`;
                console.log('diabtico');
                break;
                case 'Hipertenso':
                    queryParams.tagtype_2=`'nutrient_levels'`;
                    queryParams.tag_contains_2=`'contains'`;
                    queryParams.tag_2=`'en:salt in low quantity'`;
                console.log('hipertenso');
                break; 
                case 'Celiaco':
                        queryParams.tagtype_3='allergens';
                        queryParams.tag_contains_3='does_not_contain';
                        queryParams.tag_3=`en:gluten`;
                console.log('los tags celiaco se agregaron correctamente a la bsuqueda');
                break;
                case 'intoLactosa':
                    queryParams.tagtype_4= `allergens_tags`;
                    queryParams.tag_contains_4=`does_not_contain`;
                    queryParams.tag_4= `en:Milk`;
                console.log('intolactosa');
                break; 
                case 'Vegetariano':
                    queryParams.tagtype_5=`ingredients-analysis`;
                    queryParams.tag_contains_5=`contains`;
                    queryParams.tag_5=`en:vegetarian`;
                console.log('vegetariano');
                break;
                case 'Vegano':
                    queryParams.tagtype_6=`ingredients-analysis`;
                    queryParams.tag_contains_6= `contains`;
                    queryParams.tag_6=`en:vegan`;
                console.log('vegano');
                break;
            default:

                break;
        }
    };

    const queryString = new URLSearchParams(queryParams).toString();
    //console.log(`${queryString}`)
    const APIProductSearch = `${API}?${queryString}`;
    console.log(`los query params son:`);
    console.log(queryParams);
    console.log(`la url final es: ${APIProductSearch}`);
//-------------------SISTEMA DE FETCH------------------------------------

    const createRes = document.getElementById('ResultadoCointainer');
    const respuesta = fetch(APIProductSearch)
        .then(res => res.json())
        .then(data => {
            console.log(`el array de objetos es:`)
            console.log(data)
            data.products.forEach(product => {
                let elemento = document.createElement("div");
                createRes.appendChild(elemento);
                elemento.className = 'resultadoContainer';
                elemento.innerHTML = `
                        <div class="card"> 
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
            let carderror = document.createElement("div");
            createRes.appendChild(carderror);
            carderror.innerHTML = `
               <div class="errorcard"> 
                  <div class="errorimg1"> 
                       <img src=  class="errorimg" alt="errorfoto">
                   </div> 
                   <div class="textoerror">
                        <h4>ERROR NO SE PUDO REALIZAR LA  BÚSQUEDA!! pruebe lo siguiente: </h4>
                          <ul>
                            <li>solucion1</li>
                            <li>solucion2</li>
                            <li>solucion3</li>
                            <li>solucion4</li>
                          </ul>
           
                    </div>
           </div>`;
        })

})
