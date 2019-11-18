/* Griglia 6x6, ad ogni click parte una richiesta AJAX che prende un numero random da 1 a 9.
Se è <= 5 il quadrato diventa giallo,
se è > di 5 il quadrato diventa verde.
Il numero ottenuto appare al centro del quadrato */


$(document).ready(function () {
    // Salvo la selezione della cella in una variabile
    var square = $(".grid-item");



    // AL click sulla cella ..
    square.click(bg);

    function bg() {
        // Salvo la selezione della cella cliccata
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
});