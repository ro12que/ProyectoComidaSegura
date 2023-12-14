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
        json: {},
        search_terms: `${userSearch}`,
        page_size: 20,
        action: 'process',
    };

    for (let i = 0; i < 6; i++) {

        switch (TagDesignador[i]) {
            case 'Diabetico':
                queryParams.tagtype_1 = `'nutrient_levels'`;
                queryParams.tag_contains_1 = `'contains'`;
                queryParams.tag_1 = `en:"sugar in low quantity"`;
                console.log('diabtico');
                break;
            case 'Hipertenso':
                queryParams.tagtype_2 = `'nutrient_levels'`;
                queryParams.tag_contains_2 = `'contains'`;
                queryParams.tag_2 = `'en:salt in low quantity'`;
                console.log('hipertenso');
                break; 
                case 'Celiaco':
                        queryParams.tagtype_3='allergens';
                        queryParams.tag_contains_3='does_not_contain';
                        queryParams.tag_3=`en:gluten`;
                console.log('los tags celiaco se agregaron correctamente a la bsuqueda');
                break;
            case 'intoLactosa':
                queryParams.tagtype_4 = `allergens_tags`;
                queryParams.tag_contains_4 = `does_not_contain`;
                queryParams.tag_4 = `en:Milk`;
                console.log('intolactosa');
                break;
            case 'Vegetariano':
                queryParams.tagtype_5 = `ingredients-analysis`;
                queryParams.tag_contains_5 = `contains`;
                queryParams.tag_5 = `en:vegetarian`;
                console.log('vegetariano');
                break;
            case 'Vegano':
                queryParams.tagtype_6 = `ingredients-analysis`;
                queryParams.tag_contains_6 = `contains`;
                queryParams.tag_6 = `en:vegan`;
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
            let elemento = document.createElement("div");
                    
            const detallesProductoElemento = document.getElementById('ResultadoCointainer');

            detallesProductoElemento.innerHTML = ` `;
            data.products.forEach(product => {
                if (  product.product_name_es !== null &&
                    product.product_name_es !== undefined &&
                    product.generic_name !== null &&
                    product.image_front_url !== null &&
                    product.image_front_url !== undefined &&
                    product.generic_name !== null &&
                    product.generic_name !== undefined) {

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
                    console.log(data);
                    elemento.addEventListener('click', function () {
                        handleCardClick(product);
                        console.log(product.product_name_es);


                        function handleCardClick(product) {
                            selectedProduct = product;

                            // Obtén el elemento HTML donde deseas mostrar los detalles del producto
                            const detallesProductoElemento = document.getElementById('ResultadoCointainer');

                            detallesProductoElemento.innerHTML = ` `;
                            // Modifica el contenido del elemento con los detalles del producto
                            detallesProductoElemento.innerHTML = `
                            <div class="container-container">
                            <div class="container-grl">
                            <div class="container-detalles">
                                <div class="left">
                                    <img class="img" src="${product.image_front_url}" alt="Descripción de la imagen">
                                </div>
                                <div class="right">
                                    <h2>${product.product_name_es}</h2>
                                    <p>${product.generic_name}</p>
                    
                                    <h2>Caracteristicas principales</h2>
                                    <table class="details-table">
                                        <tr>
                                            <th>Fabricante</th>
                                            <td>${product.brands}</td>
                                        </tr>
                                        <tr>
                                            <th>Marca</th>
                                            <td>${product.product_name_es}</td>
                                        </tr>

                                    <h2>Más Detalles</h2>
                                    <table class="details-table">
                                        <tr>
                                            <th>Alergenos</th>
                                            <td>${product.tallergens_hierarchy}</td>
                                        </tr>
                                        <tr>
                                            <th>Caracteristicas de la galleta</th>
                                            <td>Rellena</td>
                                        </tr>
                                        <tr>
                                            <th>Es dietetico</th>
                                            <td>No</td>
                                        </tr>
                                        <tr>
                                            <th>Es libre de gluten</th>
                                            <td>No</td>
                                        </tr>
                                        <tr>
                                            <th>con sal</th>
                                            <td>Si</td>
                                        </tr>
                                        
                                    </table>
                                </div>
                            </div>
                            <a href="Html/results-Fruti.html">
                                <div class="bottom-row">
                                    <div class="bottom-card">
                                        <img src="imagenes/Frutigram.webp" alt="Img">
                                        <h3>Frutigran </h3>
                                    </a>
                                        <p>Galletitas de cereales con chocolate</p>
                                    </div>
                            
                            <a href="Html/results-Yerba.html">
                                <div class="bottom-card">
                                    <img src="imagenes/Playadito.jpeg" alt="Img">
                                    <h3>Yerba playadito  </h3>
                                </a>
                                    <p>Yerba Mate (hojas y palo) </p>
                                </div>
                            
                            <a href="Html/results-Pure.html">
                                <div class="bottom-card">
                                    <img src="imagenes/Pure de tomate.webp" alt="Img">
                                    <h3>Pure de Tomate Molto</h3>
                                </a>
                                    <p>Pure de tomate</p>
                                </div>
                           
                            
                                
                    
                            </div>
                        </div> 
                        </div>`;

                            // Puedes realizar acciones adicionales aquí, según tus necesidades
                            console.log('Producto seleccionado:', selectedProduct);
                        }


                    });
                }

            })

        });


})


function handleCardClick(product) {
    var selectedProduct = product;
    console.log('Producto seleccionado:', selectedProduct);
    // Aquí puedes realizar cualquier acción adicional con el producto seleccionado
    // Por ejemplo, mostrar los detalles del producto en algún lugar de la pantalla.
}

/*                                    <!--<img class="sellos" src=${sellosValor} alt="durazno"/>
                                    <img class="sellos" src=${sellosValordos} alt="durazno"/> 
                                    <img class="sellos" src=${sellosValortres} alt="durazno"/> -->
    sellosValor = 7;
    var sellosAsignacion = document.getElementsByClassName("sellos").src = sellosValor;
    var resultado = array.forEach(element => {

});*/
