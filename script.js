//Creamos un array para guardar los atributos del JSON de cada ciudad en la que se han hecho Erasmus.
var paises = [];
var tipos = [];
var ciclos = [];
var ciudades = [];
var ciudadesporgrupo = [];
var lat = [];
var lng = [];
/**Para guardar el array usamos el objeto myObj2
 * @requires myObj2
 */
Object.keys(myObj2).forEach(key => {
    paises[paises.length] = myObj2[key].pais;
});
Object.keys(myObj2).forEach(key => {
    tipos[tipos.length] = myObj2[key].tipo;
});
Object.keys(myObj2).forEach(key => {
    ciclos[ciclos.length] = myObj2[key].ciclo;
});
Object.keys(myObj2).forEach(key => {
    ciudades[ciudades.length] = myObj2[key].ciudad;
});
Object.keys(myObj2).forEach(key => {
    lat[lat.length] = myObj2[key].lat;
});
Object.keys(myObj2).forEach(key => {
    lng[lng.length] = myObj2[key].lng;
});
/**
 * Con este código conseguimos que con la funcion unique() el array deje de tener elementos repetidos.
 * @requires unique()
 */
Array.prototype.unique = function (a) {
    return function () { return this.filter(a) }
}(function (a, b, c) {
    return c.indexOf(a, b + 1) < 0
});
//Añadimos los elementos a cada switch de la página, por tipo, pais, ciclo y ciudad.
var select1 = document.getElementById("hi");
for (i = 0; i < tipos.unique().length; i++) {
    var op = document.createElement("option");
    op.setAttribute("value", tipos.unique()[i]);
    op.innerHTML = tipos.unique()[i];
    select1.children[0].children[0].appendChild(op);
}
for (i=0; i<paises.unique().length; i++){
    var op = document.createElement("option");
    op.setAttribute("value", paises.unique()[i]);
    op.innerHTML =  paises.unique()[i];
    select1.children[1].children[0].appendChild(op);
}
for (i = 0; i < ciclos.unique().length; i++) {
    var op = document.createElement("option");
    op.setAttribute("value", ciclos.unique()[i]);
    op.innerHTML = ciclos.unique()[i];
    select1.children[3].children[0].appendChild(op);
}
console.log("hi");
for (i = 0; i < ciudades.unique().length; i++) {
    var op = document.createElement("option");
    op.setAttribute("value", ciudades.unique()[i]);
    op.innerHTML = ciudades.unique()[i];
    select1.children[4].children[0].appendChild(op);
}

/**
 * @description Filtro necesita de grupo, curso y pais para filtrar por ellos.
 * @param grupo Si es medio, superior o Profesorado.
     * @param curso El ciclo elegido.
     * @param paiss El país elegido.**/
//El botón filtro de cada lado del toggle.
function filtro(grupo, curso, paiss){
    
    var divfiltro = document.getElementById("resultfiltro");
    divfiltro.setAttribute("style", "text-align: center; font-size: 2em;")
    divfiltro.removeChild;
    var sector = grupo;
    divfiltro.innerHTML = "<p>"+sector+", "+curso+paiss+"</p>";
    var elementofiltrado = [];
    Object.keys(myObj2).forEach(key => {
        if (curso != "Elegir Ciclo"){
            if (grupo == "Grado Superior") {
                grupo = "GS";
            }
            if (grupo == "Grado Medio") {
                grupo = "GM";
            }
            if (grupo == "Profesorado") {
                grupo = "Pr";
            }
            if (key.substring(9, 11) == grupo && myObj2[key].ciclo == curso) {
                console.log(myObj2[key].pais);
                elementofiltrado[elementofiltrado.length] = { pais: myObj2[key].pais, ciclo: myObj2[key].ciclo, ciudad: myObj2[key].ciudad };
                var nuevof = document.createElement("div");
                nuevof.setAttribute("style", "font-size: 0.5em; margin: 1em;float: left;background-color: cyan; border: 2px ridge black; border-radius: 2em; padding: 0.5em; text-align: center;")
                nuevof.innerHTML += "<p>País: " + elementofiltrado[elementofiltrado.length - 1].pais + "</p>";
                nuevof.innerHTML += "<p>Ciudad: " + elementofiltrado[elementofiltrado.length - 1].ciudad + "</p>";
                nuevof.innerHTML += "<p>Ciclo: " + elementofiltrado[elementofiltrado.length - 1].ciclo + "</p>";
                divfiltro.appendChild(nuevof);
                
                filtrarmapaporpaisociclo(grupo, "", curso);
            }
        }
        if (paiss != "pais") {
            
            if (grupo == "Grado Superior") {
                grupo = "GS";
            }
            if (grupo == "Grado Medio") {
                grupo = "GM";
            }
            if (grupo == "Profesorado") {
                grupo = "Pr";
            }
            if (key.substring(9, 11) == grupo && myObj2[key].pais == paiss) {
                console.log(myObj2[key].pais);
                elementofiltrado[elementofiltrado.length] = { pais: myObj2[key].pais, ciclo: myObj2[key].ciclo, ciudad: myObj2[key].ciudad };
                console.log(elementofiltrado[elementofiltrado.length - 1].ciclo);
                var nuevof = document.createElement("div");
                nuevof.setAttribute("style", "font-size: 0.5em; margin: 1em;float: left;background-color: cyan; border: 2px ridge black; border-radius: 2em; padding: 0.5em; text-align: center;")
                nuevof.innerHTML += "<p>País: "+elementofiltrado[elementofiltrado.length - 1].pais+"</p>";
                nuevof.innerHTML += "<p>Ciudad: " + elementofiltrado[elementofiltrado.length - 1].ciudad + "</p>";
                nuevof.innerHTML += "<p>Ciclo: " + elementofiltrado[elementofiltrado.length - 1].ciclo + "</p>";
                divfiltro.appendChild(nuevof);
                filtrarmapaporpaisociclo(grupo, paiss, "");
            }
            
        }
    });
    var ex = document.getElementById("resultfiltro");
    if(ex.innerHTML.length < 30){
        ex.innerHTML = '<p> No se han encontrado elementos </p>';
    }
}

var toggle = document.getElementById("toggle");
toggle.onclick = esconde;
//Con esto 
/**
 * @description esconde, simplemente volvemos invisible cada lado del menú según el estado del toggle.**/
function esconde() {
    if (this.checked == true) {
        select1.children[1].children[0].setAttribute("style", "visibility:hidden;");
        select1.children[1].children[1].setAttribute("style", "visibility:hidden;");
        select1.children[3].children[0].setAttribute("style", "visibility:visible;");
        select1.children[3].children[1].setAttribute("style", "visibility:visible;");
    }
    else {
        select1.children[3].children[0].setAttribute("style", "visibility:hidden;");
        select1.children[3].children[1].setAttribute("style", "visibility:hidden;");
        select1.children[1].children[0].setAttribute("style", "visibility:visible;");
        select1.children[1].children[1].setAttribute("style", "visibility:visible;");
    }
}
//Añadimos el filtro correspondiente a cada lado del menú.
var buttonpais = document.getElementById("botonpais");
buttonpais.addEventListener('click', //Type
    function (event) { //Listener
        var group = (select1.children[0].children[0].value);
        if (group == "Grado Superior") {
            group = "GS";
        }
        if (group == "Grado Medio") {
            group = "GM";
        }
        if (group == "Profesorado") {
            group = "Pr";
        }
        filtro(group,"", select1.children[1].children[0].value);
    },
    false); 

var buttonciclo = document.getElementById("botonciclo");
buttonciclo.addEventListener('click', //Type
    function (event) { //Listener
        var group = (select1.children[0].children[0].value);
        if (group == "Grado Superior") {
            group = "GS";
        }
        if (group == "Grado Medio") {
            group = "GM";
        }
        if (group == "Profesorado") {
            group = "Pr";
        }
        filtro(group, select1.children[3].children[0].value, "");
    },
    false); 

    /**
 * @description generamarker, genera un marcador en el mapa pasandole unos valores.
 * @param map El mapa al que tenemos que añadirle el marcador.
     * @param latitud La posición x.
     * @param longitud La posición y.
     * @param nombre El nombre de la ciudad o lugar del marcador.**/
function generamarker(map, latitud, longitud, nombre){
    var marker2 = new google.maps.Marker({
        map: map,
        position: { lat: latitud, lng: longitud },
        title: nombre
    });
    return marker2;
    
}
var marker;
var marker2 = [];

/**
 * @description La función principal con la que creamos el mapa.**/
function myMap() {
    var z = 4;
    if (window.innerWidth < 600) {
        z = 3;
    }
    var contentString = "hola info";
    var mapProp = {
        center: new google.maps.LatLng(47.508742, -0.120850),
        zoom: z,
    };
    var map = new google.maps.Map(document.getElementById("googleMap"), mapProp);
    marker = new google.maps.Marker({
        map: map,
        draggable: true,
        animation: google.maps.Animation.DROP,
        position: { lat: 28.5087128, lng: -16.1800156 },
        title: '¡Casita!',//color del borde
        content: "Santa Cruz de Tenerife"
    });
    var infowindow = new google.maps.InfoWindow({
        content: contentString
    });
    marker.addListener('click', function () {
        infowindow.open(map, marker);
    });
    var infowindow = [];
    for (i = 0; i < ciudades.unique().length; i++){
        marker2[i] = generamarker(map, parseInt(lat.unique()[i]), parseInt(lng.unique()[i]), ciudades.unique()[i]);
        marker2[i].addListener('click', toggleBounce);
    };
    for (i = 0; i < ciudades.unique().length; i++) {
        
        infowindow[i] = new google.maps.InfoWindow({
            content: filtratextoporciudad(ciudades.unique()[i])
        });
    }
    marker2.forEach(function(marker3, i) {
        marker3.addListener('click', function () {
                infowindow[i].open(map, marker2[i]);
        });
    });
    marker.addListener('click', toggleBounce);
}
/**
 * @description Con esto animamos los marcadores de nuestro mapa**/
function toggleBounce() {
    if (marker.getAnimation() !== null) {
        marker.setAnimation(null);
        marker2.forEach(element => {
            this.setAnimation(null);
        });
    } else {
        marker.setAnimation(google.maps.Animation.BOUNCE);
        marker2.forEach(element => {
            this.setAnimation(google.maps.Animation.BOUNCE);
        });
    }
}
buttonciclo.setAttribute("disabled", "disabled");
buttonpais.setAttribute("disabled", "disabled");
selectporpais = document.getElementById("pais").children[0];
selectporpais.addEventListener('click', //Type
    function (event) { //Listener
        if ((select1.children[0].children[0].value != "Todos") && (select1.children[1].children[0].value != "pais")) {
            buttonpais.disabled = false;
        }
        else {
            buttonpais.disabled = true;
        }
    },
    false); 
selectcicl = document.getElementById("cicl").children[0];
    selectcicl.addEventListener('click', //Type
    function (event) { //Listener
        if ((select1.children[0].children[0].value != "Todos") && (select1.children[3].children[0].value != "")) {
            buttonciclo.disabled = false;
            
        }
        else {
            buttonciclo.disabled = true;
        }
    },
    false); 
    /**
 * @description Filtro necesario para insertar qué ciclos están en cada ciudad en el mapa
 * @param ciudad Ciudad por la que filtramos.
 * @returns Devolvemos los ciclos que están en dicha ciudad, para crear una bonita ventana.**/
    function filtratextoporciudad(ciudad){
        var elementofiltrado;
        var info2 = "<span style='color: darkred; margin-left: 40%; font-size: 2em;'><strong>"+ciudad+"</strong></span></br>";
        Object.keys(myObj2).forEach(key => {
                if (myObj2[key].ciudad == ciudad) {
                    elementofiltrado = { grupo: myObj2[key].tipo, ciclo: myObj2[key].ciclo, ciudad: myObj2[key].ciudad, pais: myObj2[key].pais };
                    var info = "Grupo: " + elementofiltrado.grupo + "\n" + "Ciclo: " + elementofiltrado.ciclo + "\n";
                    info2 += "\r"+info+"</br>";
                }
        });
        return info2;
    }
        /**
     * @description filtrarmapaporpaisociclo necesita de grupo, pais y ciclo para filtrar por ellos. Es una implementacion para la función filtro
     * @param grupo Si es medio, superior o Profesorado.
     * @param pais El país elegido.
     * @param ciclo El ciclo elegido.**/
    function filtrarmapaporpaisociclo(grupo, pais, ciclo){
        var z = 4;
        if (window.innerWidth < 600){
            z = 3;
        }
        var mapProp = {
            center: new google.maps.LatLng(47.508742, -0.120850),
            zoom: z,
        };
        var map = new google.maps.Map(document.getElementById("googleMap"), mapProp);
        var elementofiltradopais= [];
        var infowindow = [];
        if(pais != ""){
                Object.keys(myObj2).forEach(key => {
                    if (key.substring(9, 11) == grupo && myObj2[key].pais == pais) {
                        elementofiltradopais[elementofiltradopais.length] = { latitud: myObj2[key].lat, longitud: myObj2[key].lng, ciclo: myObj2[key].ciclo, ciudad: myObj2[key].ciudad, pais: myObj2[key].pais };
                        marker2[elementofiltradopais.length - 1] = generamarker(map, parseInt(elementofiltradopais[elementofiltradopais.length - 1].latitud), parseInt(elementofiltradopais[elementofiltradopais.length - 1].longitud), elementofiltradopais[elementofiltradopais.length - 1].ciudad);
                        marker2[elementofiltradopais.length - 1].addListener('click', toggleBounce);
                        infowindow[elementofiltradopais.length - 1] = new google.maps.InfoWindow({
                            content: filtratextoporciudad(elementofiltradopais[elementofiltradopais.length - 1].ciudad)
                        });
                    }
                    marker2.forEach(function (marker3, i) {
                        marker3.addListener('click', function () {
                            infowindow[i].open(map, marker2[i]);
                        });
                    })
                });
        }
        if(ciclo != ""){
                Object.keys(myObj2).forEach(key => {
                    if (key.substring(9, 11) == grupo && myObj2[key].ciclo == ciclo) {
                        elementofiltradopais[elementofiltradopais.length] = { latitud: myObj2[key].lat, longitud: myObj2[key].lng, ciclo: myObj2[key].ciclo, ciudad: myObj2[key].ciudad, pais: myObj2[key].pais };
                        marker2[elementofiltradopais.length - 1] = generamarker(map, parseInt(elementofiltradopais[elementofiltradopais.length - 1].latitud), parseInt(elementofiltradopais[elementofiltradopais.length - 1].longitud), elementofiltradopais[elementofiltradopais.length - 1].ciudad);
                        marker2[elementofiltradopais.length - 1].addListener('click', toggleBounce);
                        infowindow[elementofiltradopais.length - 1] = new google.maps.InfoWindow({
                            content: filtratextoporciudad(elementofiltradopais[elementofiltradopais.length - 1].ciudad)
                        });
                    }
                    marker2.forEach(function (marker3, i) {
                        marker3.addListener('click', function () {
                            infowindow[i].open(map, marker2[i]);
                        });
                    })
                });
        }
        
    }
    


