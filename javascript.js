var markerParis;
var markerBordeaux;
var markerNice;


$('a[href^="#image"]').click(function(){
    var id = $(this).attr("href");
    var offset = $(id).offset().top
    $('html, body').animate({scrollTop: offset}, 'slow');
    return false;
});

$('a[href^="#accueil"]').click(function(){
    var id = $(this).attr("href");
    var offset = $(id).offset().top
    $('html, body').animate({scrollTop: offset}, 'slow');
    return false;
});
// De la documentation ici : https://github.com/IGNF/geoportal-extensions/blob/master/README-leaflet.md

function go() {
    map = L.map("map").setView([48.845, 2.424], 5);

    var lyrOrtho = L.geoportalLayer.WMTS(
        {
            layer: "ORTHOIMAGERY.ORTHOPHOTOS",
        }
    );
    map.addLayer(lyrOrtho);
    showCities();
    manageMarkers();
}

Gp.Services.getConfig({
    serverUrl: './autoconf.json',
    callbackSuffix : "",
    onSuccess: go
});

var infoDiv= document.getElementById("info") ;
infoDiv.innerHTML= "<p> Extension Leaflet version "+Gp.leafletExtVersion+" ("+Gp.leafletExtDate+")</p>" ;


function adpaterALaTailleDeLaFenetre(){
  var largeur = document.documentElement.clientWidth,
  hauteur = document.documentElement.clientHeight;
  var hauteur1 = document.getElementById("accueil").clientHeight;
  var hauteur_barrenav = document.getElementsByClassName("navbar navbar-default navbar-fixed-top ")[0].clientHeight;
  var hauteur_info = document.getElementById("info").clientHeight;
  hauteur -= (hauteur1 + hauteur_barrenav + hauteur_info);

  var source = document.getElementById('map'); // récupère l'id source
  var source1 = document.getElementById('image');
  source.style.height = hauteur +'px'; // applique la hauteur de la page
  source.style.width = largeur+'px'; // la largeur
  source1.style.height = hauteur +'px'; // applique la hauteur de la page
  source1.style.width = largeur+'px'
}


function addEvent(element, type, listener){
  if(element.addEventListener){
    element.addEventListener(type, listener, false);
  }else if(element.attachEvent){
    element.attachEvent("on"+type, listener);
  }
}

// On exécute la fonction une première fois au chargement de la page
addEvent(window, "load", adpaterALaTailleDeLaFenetre);
// Puis à chaque fois que la fenêtre est redimensionnée
addEvent(window, "resize", adpaterALaTailleDeLaFenetre);


function imagegalerie()
{
var active = $("#images .active");
var next = (active.next().length > 0) ? active.next() : $('#images img:first');
  active.fadeOut(function(){
  active.removeClass('active');
  next.fadeIn().addClass('active');
  });
}

setInterval('imagegalerie()', 4000);

imagegalerie();

function showCities(){
  markerParis    = L.marker([48.85, 2.32],{icon: greenIcon}).addTo(map).bindPopup("Paris");
  markerBordeaux = L.marker([44.83, -0.57],{icon: greenIcon}).addTo(map).bindPopup("Bordeaux");
  markerNice     = L.marker([43.71, 7.26],{icon: greenIcon}).addTo(map).bindPopup("Nice");
}

function manageMarkers(){
  var markerP = [document.getElementsByClassName("leaflet-marker-icon leaflet-zoom-animated leaflet-interactive")[0],"Paris"];
  var markerB = [document.getElementsByClassName("leaflet-marker-icon leaflet-zoom-animated leaflet-interactive")[1],"Bordeaux"];
  var markerN = [document.getElementsByClassName("leaflet-marker-icon leaflet-zoom-animated leaflet-interactive")[2],"Nice",];

  markerP[0].addEventListener("click",clickOnParis);
  markerB[0].addEventListener("click",clickOnBordeaux);
  markerN[0].addEventListener("click",clickOnNice);
}

//Définition de l'icone du marker
var greenIcon = L.icon({
    iconUrl: 'https://unpkg.com/leaflet@1.3.1/dist/images/marker-icon.png',
    iconSize:     [25, 41], // size of the icon
    iconAnchor:   [12.5, 41], // point of the icon which will correspond to marker's location
    shadowAnchor: [4, 62],  // the same for the shadow
    popupAnchor:  [-3, -76] // point from which the popup should open relative to the iconAnchor
});

//Variable liées aux limites de la commune
var limites;

//Variable AJAX pour la fonction lire_objet_JSON()
var ajax_lire_objet_JSON = new XMLHttpRequest();

/*
Fonction permettant d'envoyer le nom du fichier sélectionné au fichier lecture_fichier_JSON.php
Elle permet aussi de récupérer les données du ficher sélectionné
*/
function lire_fichier_JSON(nom_fichier_JSON){

  var fichier_JSON_choisi = nom_fichier_JSON
  //Variable indiquant si on est déjà entré dans la première boucle if
  var entree_boucle = false;

  //Destination et type de la requête AJAX asynchrone
  ajax_lire_objet_JSON.open('POST', 'lecture_fichier_JSON.php', true);

  //Métadonnées de la requête AJAX
  ajax_lire_objet_JSON.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');

  //Evenement de changement d'état de la requête
  ajax_lire_objet_JSON.addEventListener('readystatechange',  function(e) {
      //Si l'état est le numéro 4 et que la ressource est trouvée
      if(ajax_lire_objet_JSON.readyState == 4 && ajax_lire_objet_JSON.status == 200 && !entree_boucle) {
          // Le contenu du fichier JSON
          donnees_fichier_JSON = ajax_lire_objet_JSON.responseText;
          objJSON = JSON.parse(donnees_fichier_JSON)
          //On interdit toute nouvelle entrée dans la boucle
          entree_boucle = true;

          if (limites){
            map.removeLayer(limites);
          }

          limites = L.geoJSON(objJSON).addTo(map);
          map.fitBounds(limites.getBounds());
      }})

  //Requête à envoyer, on envoie le nom du fichier JSON que l'utilisateur choisit
  data = "fichier_JSON_choisi="+ fichier_JSON_choisi;

  //Envoi de la requete à lecture_fichier_JSON.php
  ajax_lire_objet_JSON.send(data);

}

function clickOnParis(event){
  lire_fichier_JSON("Paris.geojson");
}

function clickOnBordeaux(event){
  lire_fichier_JSON("Bordeaux.geojson");
}
function clickOnNice(event){
  lire_fichier_JSON("Nice.geojson");
}

function reinitializeMap(){
  if (limites){
    map.removeLayer(limites);
  }
  map = L.map("map").setView([48.845, 2.424], 5);
}

ButtonReinitializeMap = document.getElementById("ButtonReinitializeMap");
ButtonReinitializeMap.addEventListener("click",reinitializeMap);
