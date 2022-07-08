const container = document.querySelector('.container');
const resultado = document.querySelector('#resultado');
const formulario = document.querySelector('#formulario');


window.addEventListener('load', () => {
    formulario.addEventListener('submit', buscarClima)
})

function buscarClima(e) {
    e.preventDefault();

    // Validar
    const ciudad = document.querySelector('#ciudad').value;
    const pais = document.querySelector('#pais').value;

    if(ciudad === '' || pais === '') {
    // hubo un error
    mostrarError('Ambos campos son obligatorios') ;

    return;
}



// consultariamos la API

consultarAPI(ciudad, pais);
}

function mostrarError(mensaje) {
    const alerta = document.querySelector('.bg-red-100')

        if(!alerta) {
    //crear una alerta
    const alerta = document.createElement('div');

    alerta.classList.add('bg-red-100', 'bborder-red-400', 'text-red-700', 'px-4', '`y-3', 'rouded', 'max-w-md', 'mx-auto', 'mt-6', 'text-center');

    alerta.innerHTML = `
    <strong class="font-bold">Error!</strong>
    <span class="block">${mensaje}</span>
    `;

    container.appendChild(alerta);

    // se elimine la alerta después de 5 segundos

    setTimeout(() => {
        alerta.remove();
    }, 5000);
}
}

function consultarAPI(ciudad, pais) {

    const appId = 'e4f9d6c7e6c4e5cad11b2989b762459a';
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${ciudad},${pais}&appid=${appId}`

    Spinner(); // muestra un spinner de carga
       fetch(url)
       .then( respuesta => respuesta.json())
       .then(datos => {

            console.log(datos);

           limpiarHTML(); // limpiar el html previo
        if(datos.cod === "404") {
            mostrarError('Ciudad no encontrada')
            return;
        }

        // Imprime la resputa en el HTML
        mostrarClima(datos);
       })
}

function mostrarClima(datos) {
    const {name,sys: {country}, main : { temp, temp_max, temp_min }} = datos;

    const centigrados = kelvinACentigrados(temp);
    const max = kelvinACentigrados(temp_max);
    const min = kelvinACentigrados(temp_min);


    const nombreCiudad = document.createElement('p');
    nombreCiudad.textContent = `Clima en ${name}`;
    nombreCiudad.classList.add('font-bold','text-2xl');

    const nombrePais = document.createElement('p');
    nombrePais.textContent = `País: ${country}`;
    nombrePais.classList.add('font-bold', 'text-6xl');


    const actual = document.createElement('p');
    actual.innerHTML = `${centigrados} &#8451;`;
    actual.classList.add('font-bold', 'text-6xl');


    //Temperatura maxima
    const tempMaxima= document.createElement('p');
    tempMaxima.innerHTML = `Max: ${max} &#8451;`;
    tempMaxima.classList.add('text-xl');


    //Temperatura minima
    const tempMinima = document.createElement('p');
    tempMinima.innerHTML = `Min: ${min} &#8451;`
    tempMinima.classList.add('text-xl');
    
    const resultadoDiv = document.createElement('div')
    resultadoDiv.classList.add('text-center', 'text-white');
    resultadoDiv.appendChild(nombreCiudad);
    resultadoDiv.appendChild(nombrePais);
    resultadoDiv.appendChild(actual);
    resultadoDiv.appendChild(tempMaxima);
    resultadoDiv.appendChild(tempMinima);
    

    resultado.appendChild(resultadoDiv);
}

const  kelvinACentigrados = grados => parseInt(grados-273.15);


function limpiarHTML() {
    while(resultado.firstChild) {
        resultado.removeChild(resultado.firstChild);
    }
}

function Spinner() {

    limpiarHTML();

    const divSpinner = document.createElement('div')
    divSpinner.classList.add('spinner');

    divSpinner.innerHTML= `
  <div class="bounce1"></div>
  <div class="bounce2"></div>
  <div class="bounce3"></div>
    `;

    resultado.appendChild(divSpinner);
}