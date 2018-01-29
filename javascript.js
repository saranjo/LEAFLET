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

}

Gp.Services.getConfig({
    apiKey : "ml4xiy7nhqonc9ae3u13n03b",
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
