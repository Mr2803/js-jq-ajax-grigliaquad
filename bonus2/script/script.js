/* Griglia 6x6, ad ogni click parte una richiesta AJAX che prende un numero random da 1 a 9.
Se è <= 5 il quadrato diventa giallo,
se è > di 5 il quadrato diventa verde.
Il numero ottenuto appare al centro del quadrato */


$(document).ready(function () {
    var source = $("#cell").html()
    var template = Handlebars.compile(source)

    

    //creo dinamicamente le mie celle attraverso un ciclo for 
    for (var i = 0; i < 36; i++) {
        $(".grid-container").append(template);
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
        success: function (data) {
            // Se il numero è <= 5 è giallo
            if (data.response <= 5 && !clickedCell.hasClass("active")) {
                clickedCell.addClass("yellow").addClass("active");
                clickedCell.text(data.response);
                /* clickedCell.off() */
                
                console.log("l'api ha generato il numero : " + data.response + " quindi il bg sarà giallo");
            } else if (data.response > 5 && !clickedCell.hasClass("active")) { // altrimenti è verde
                clickedCell.addClass("green").addClass("active");
                clickedCell.text(data.response);
                console.log("l'api ha generato il numero : " + data.response + " quindi il bg sarà verde");
                /* clickedCell.off() */
            }else{
                alert("Hai già cliccato questa cella!");  
            }
        },
        error: function (richiesta, stato, errori) {
            alert("Errore " + richiesta + stato + errori);
        }
    });
}