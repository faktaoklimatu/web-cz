$(document).ready(function() {
    // Development version adjustments
    var navHeight = $("nav").height();
    if ($("#dev-warning")) {
        console.log('This is the local development version of the website.');
        $("body").css('padding-top', navHeight + 'px');
        $(".sticky-toc").css('top', navHeight + 'px');
    }

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
        if ($(window).height() > 741) { // iPhone 6 plus / Galaxy S9 screen viewport height
            $(".navbar").css('top', 0);
            return;
        }
        var currentScrollPos = window.pageYOffset;
        if (currentScrollPos < navHeight || prevScrollpos > currentScrollPos) {
            $(".navbar").css('top', 0);
        } else {
            $(".navbar").css('top', (-1 * navHeight) + 'px');
        }
        prevScrollpos = currentScrollPos;
    });

    // Open the correponding <details> rolldown if the URL target is inside one
    // and scroll browser view to the target element.
    if (location.hash) {
        const targetEl = $(decodeURIComponent(location.hash));
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

    // Render table of contents if it is non-trivial.
    if ($('.longread h2, .longread h3').length > 1) {
        tocbot.init({
            tocSelector: '#TOC',
            contentSelector: '.longread',
            headingSelector: 'h2, h3',
            headingsOffset: -780,
            scrollSmooth: false,
        });
        $('.longread-toc').removeClass('invisible');
    } else {
        $('.longread-toc').addClass('longread-toc-none');
    }
});
