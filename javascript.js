
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
