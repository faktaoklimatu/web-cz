// Enable navbar re-styling when scrolled
$(document).ready(function() {
    $(document).scroll(function() {
        var scrolled = $(this).scrollTop();
        if(scrolled > 50) {
            $(".navbar").addClass('navbar-scrolled');
        } else {
            $(".navbar").removeClass('navbar-scrolled');
        }
    });
});
// Enable all poppers in the document
$(document).ready(setTimeout(function () {
    $('[data-toggle="popover"]').popover();
}, 500));
// Automatically replace spaces after prepositions with non-breakable spaces
$(document).ready(function(){
    var x = document.querySelector("body");
    x.innerHTML = x.innerHTML.replace(/ ([ai]|[kosuvz]|do|ke|na|od|po|se|ve|za|ze) /ig, " $1&nbsp;");
});