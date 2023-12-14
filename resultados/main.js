const apiKey = 'b2106bbbfa044569aaa77f6df7dcccd1';
const apiSecret = '17253d3e9a3d419fb04b46ae90835bf4';
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
        console.log(Celiaco)
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
    searchTerm = userinput.value;
    console.log(searchTerm);

    const apiUrl = `https://platform.fatsecret.com/rest/server.api`; //nuestra hermosa api nueva 

    function generateNonce() {
        const chars = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
        let nonce = '';
        for (let i = 0; i < 32; i++) {
          nonce += chars.charAt(Math.floor(Math.random() * chars.length));
        }
        return nonce;
      }

    const oauthParams = {
        oauth_consumer_key: apiKey,
        oauth_signature_method: 'HMAC-SHA1',
        oauth_timestamp: Math.floor(Date.now() / 1000),
        oauth_nonce: generateNonce(), // Genera un valor aleatorio único para oauth_nonce
        oauth_version: '1.0',
    };

    const queryParams = {
        method:'food.get',
        
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
                console.log('celiaco');
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

    //const queryString = new URLSearchParams(queryParams).toString();
    //console.log(queryString)
    //const APIProductSearch = `${API}?${queryString}`;
    //console.log(APIProductSearch);
    console.log(queryParams);


//-------------------SISTEMA DE FETCH------------------------------------



const url = `${apiUrl}?method=foods.search&format=json&search_expression=${searchTerm}&oauth_consumer_key=${apiKey}`;

function createSignatureBaseString(method, url, parameters) {
    // Encode each parameter key and value
    const encodedParams = Object.keys(parameters)
      .map(key => `${encodeURIComponent(key)}=${encodeURIComponent(parameters[key])}`)
      .join('&');
  
    // Encode the URL
    const encodedUrl = encodeURIComponent(url);
  
    // Combine method, URL, and parameters into the signature base string
    const signatureBaseString = `${method.toUpperCase()}&${encodedUrl}&${encodeURIComponent(encodedParams)}`;
  
    return signatureBaseString;
  }

// Crear la cadena base para la firma
const signatureBaseString = createSignatureBaseString('GET', apiUrl, oauthParams);

function calculateSignature(signatureBaseString, consumerSecret, tokenSecret = '') {
    const key = `${encodeURIComponent(consumerSecret)}`;
  
    const crypto = require('crypto'); // En Node.js
    const hmac = crypto.createHmac('sha1', key);
    hmac.update(signatureBaseString);
  
    const signature = hmac.digest('base64');
  
    return signature;
  }

// Calcular la firma HMAC-SHA1
const signature = calculateSignature(signatureBaseString, apiSecret);

// Agregar la firma a los parámetros OAuth
oauthParams.oauth_signature = signature;

// Construir la URL con los parámetros OAuth
const queryString = new URLSearchParams(oauthParams).toString();
const requestUrl = `${apiUrl}?${queryString}&method=foods.search&format=json&search_expression=${searchTerm}`;

// Realizar la solicitud utilizando fetch

    const createRes = document.getElementById('ResultadoCointainer');
    const respuesta = fetch(requestUrl)
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

