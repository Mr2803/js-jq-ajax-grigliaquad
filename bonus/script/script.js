/* Griglia 6x6, ad ogni click parte una richiesta AJAX che prende un numero random da 1 a 9.
Se è <= 5 il quadrato diventa giallo,
se è > di 5 il quadrato diventa verde.
Il numero ottenuto appare al centro del quadrato */


$(document).ready(function () {
    // Salvo la selezione della cella in una variabile

    //creo dinamicamente le mie celle attraverso un ciclo for 
    for (var i = 0; i < 36; i++) {
        $(".grid-container").append("<div class=\"grid-item\"></div>");
    }

    //richiamo la mia funzione esterna tramite un event delegation
    $(document).on("click", ".grid-item",  addBg);
    
    //SOLUZIONE ALTERNATIVA , IN QUESTO CASO PERò ALLA FUNZIONE ESTERNA DOVRò PASSARE UN PARAMETRO (AD ESEMPIO CLICKEDCELL E POI PASSARE IL PARAMETRO ALL'INTERNO DI EVENT DELEGATION. SPECIFICANDO LA VAR ELEM CON $THIS E AGGIUNGENDO QUESTO PARAMETRO ALLA MIA FUNZIONE ESTERNA)
    /*$(document).on("click", ".grid-item",  function (event) {
        var elem = $(this)
        
        addBg(elem);
    })*/

  
    


    // AL click sulla cella .

});


function addBg() {
    // salvo per comodità una variabile che ha il valore della sola cella cliccata
    var clickedCell = $(this);

    // Chiamata AJAX
    $.ajax({
        url: "https://flynn.boolean.careers/exercises/api/random/int",
        method: "GET",
        success: function (data, stato) {
            console.log(data.response);
            // Se il numero è <= 5 è giallo
            if (data.response <= 5) {
                console.log("Giallo");
                clickedCell.addClass("yellow");
                clickedCell.text(data.response)
            } else { // altrimenti è verde
                console.log("Verde");
                clickedCell.addClass("green");
                clickedCell.text(data.response);
            }
        },
        error: function (richiesta, stato, errori) {
            alert("E' avvenuto un errore. " + errore);
        }
    });
}