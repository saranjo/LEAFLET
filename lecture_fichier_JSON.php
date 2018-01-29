<?php

//Script PHP permettant de lire le fichier JSON sélectionné dans la barre déroulante afin de tracer la polyligne et de faire dépalacer le marqueur

//Récupération du nom du fichier JSON sélectionné
$nom_fichier_JSON = $_POST["fichier_JSON_choisi"];

//Chemin du fichier JSON sélectionné
$dir_fichier_JSON = "./Fichiers_JSON/".$nom_fichier_JSON;

//Récupération du contenu du fichier sélectionné
$contenu_fichier_JSON = file_get_contents($dir_fichier_JSON);

//Renvoi du contenu de ce fichier
echo $contenu_fichier_JSON;

?>
