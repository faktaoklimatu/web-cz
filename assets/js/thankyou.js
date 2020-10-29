function getUrlParameter(sParam) {
    var sPageURL = window.location.search.substring(1),
        sURLVariables = sPageURL.split('&'),
        sParameterName,
        i;

    for (i = 0; i < sURLVariables.length; i++) {
        sParameterName = sURLVariables[i].split('=');

        if (sParameterName[0] === sParam) {
            return sParameterName[1] === undefined ? true : decodeURIComponent(sParameterName[1]);
        }
    }
}


$(function () {

    // expected params: vs, amount
    var vs = getUrlParameter("vs"),
        amount = getUrlParameter("amount")
    if (vs !== undefined && amount !== undefined) {
        $(".payment-box").show();
        $("#vs").text(vs);
        $("#amount").text(amount);
    }
});