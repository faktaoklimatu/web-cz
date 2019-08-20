$(document).ready(function(){
    // change styling of navbar if the page is scrolled
    $(document).scroll(function() {
        var scrolled = $(this).scrollTop();
        if(scrolled > 50) {
            $(".navbar").addClass('navbar-scrolled');
        } else {
            $(".navbar").removeClass('navbar-scrolled');
        }
    });

    // hide navbar if the screen is small and the page is scrolled
    var prevScrollpos = window.pageYOffset;
    $(document).scroll(function () {
        console.log($(window).height());
        if ($(window).height() > 741) { // iPhone 6 plus / Galaxy S9 screen viewport height
            $(".navbar").css('top', 0);
            return;
        }
        var currentScrollPos = window.pageYOffset;
        if (prevScrollpos > currentScrollPos) {
            $(".navbar").css('top', 0);
        } else {
            $(".navbar").css('top', '-56px');
        }
        prevScrollpos = currentScrollPos;
    });
});
// Automatically replace spaces after prepositions with non-breakable spaces
$(document).ready(function(){
    var x = document.querySelector("body");
    x.innerHTML = x.innerHTML.replace(/ ([ai]|[kosuvz]|do|ke|na|od|po|se|ve|za|ze) /ig, " $1&nbsp;");
});