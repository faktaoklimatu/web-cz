// change styling of navbar if the page is scrolled
$(document).ready(function() {
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

    // Open the correponding <details> rolldown if the URL target is inside one
    // and scroll browser view to the target element.
    if (location.hash) {
        const targetEl = $(location.hash);
        const parentDetails = targetEl.parents('details')[0];
        if (parentDetails) {
            parentDetails.open = true;
            targetEl[0].scrollIntoView();
        }
    }

    // Enable all poppers in the document
    setTimeout(function () {
        $('[data-toggle="popover"]').popover();
    }, 500);
});
