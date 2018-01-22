
// De la documentation ici : https://github.com/IGNF/geoportal-extensions/blob/master/README-leaflet.md

function go() {
    map = L.map("map").setView([48.845, 2.424], 5);

    var lyrOrtho = L.geoportalLayer.WMTS(
        {
            layer: "ORTHOIMAGERY.ORTHOPHOTOS",
        }
    );
    map.addLayer(lyrOrtho);

}

Gp.Services.getConfig({
    apiKey : "mettezlacléquevotreclientdoitvousfournir",
    onSuccess : go
}) ;

var infoDiv= document.getElementById("info") ;
infoDiv.innerHTML= "<p> Extension Leaflet version "+Gp.leafletExtVersion+" ("+Gp.leafletExtDate+")</p>" ;


function adpaterALaTailleDeLaFenetre(){
  var largeur = document.documentElement.clientWidth,
  hauteur = document.documentElement.clientHeight;
  var hauteur1 = document.getElementById("accueil").clientHeight;
  var hauteur_barrenav = document.getElementsByClassName("navbar navbar-default navbar-fixed-top ")[0].clientHeight;
  var hauteur_info = document.getElementById("info").clientHeight;
  hauteur -= (hauteur1 + hauteur_barrenav + hauteur_info);

  console.log(hauteur);

  var source = document.getElementById('map'); // récupère l'id source
  source.style.height = hauteur +'px'; // applique la hauteur de la page
  source.style.width = largeur+'px'; // la largeur
}

// Une fonction de compatibilité pour gérer les évènements
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
