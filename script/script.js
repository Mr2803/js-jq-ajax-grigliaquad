/* Griglia 6x6, ad ogni click parte una richiesta AJAX che prende un numero random da 1 a 9.
Se è <= 5 il quadrato diventa giallo,
se è > di 5 il quadrato diventa verde.
Il numero ottenuto appare al centro del quadrato */


$(document).ready(function () {
    // Salvo la selezione della cella in una variabile
    var cell = $(".grid-item");

    


    // AL click sulla cella ..
    cell.click(addBg);

    
});

function addBg() {
    // salvo per comodità una variabile che ha il valore della sola cella cliccata

    var clickedCell = $(this);

    // Chiamata AJAX
    $.ajax({
        url: "https://flynn.boolean.careers/exercises/api/random/int", //url da richiamare
        method: "GET",
        success: function (data, stato) {
            console.log(data)
            console.log(data.response);
            // Se il numero è <= 5 è giallo
            if (data.response <= 5) {
                console.log("Giallo");
                clickedCell.addClass("yellow");
                clickedCell.removeClass("green");
                clickedCell.text(data.response)
                /* clickedCell.off() */
            } else { // altrimenti è verde
                console.log("Verde");
                clickedCell.addClass("green");
                clickedCell.removeClass("yellow");
                clickedCell.text(data.response);
                /* clickedCell.off() */
            }
        },
        error: function (richiesta, stato, errori) {
            console.log(errore)
            alert("E' avvenuto un errore. " + errore);
        }
    });
}