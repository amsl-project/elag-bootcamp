/**
 * Load the syntax highlighting
 */
$(document).ready(function() {
    hljs.initHighlightingOnLoad();
});
/**
 * ODBC Test
 */
$(function() {
    $('#odbctest-button').click(function() {
        $.get('php/odbctest.php', function(data) {
            $('#odbctest-output').text(data);
        });
        return false;
    });
});
/**
 * Show the result as json.
 */
$(document).ready(function() {
    $("#odbc-instructions-button").click(function() {
        $("#odbc-instructions").slideToggle("slow", function() {
            if ($("#odbc-instructions").is(":visible")) {
                $('#odbc-instructions-button').html('<i class="fa fa-book button-icon"></i>  Hide instructions').addClass('pure-button-active');

            } else {
                $('#odbc-instructions-button').html('<i class="fa fa-book button-icon"></i>  Show instructions').removeClass('pure-button-active');
            }
        });
    });
});