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
            smoothScroll: false,
        });
        $('.longread-toc').removeClass('invisible');
    } else {
        $('.longread-toc').addClass('longread-toc-none');
    }

    $('#omnisearch').on('show.bs.modal', function (event) {
        $("#searchbox").focus();
        var searchbox = $(this).find('#searchbox');
        // Init the search results.
        search(searchbox.val());

        // Refresh results while user is typing.
        searchbox.keyup(function (e) {
            e.preventDefault();
            search(searchbox.val());
        });
      })
});

var posts = []; // will hold the json array from your site.json file

function search(searchStr) {
	fetchSiteJson(function () {
        var maxLength = 6;
        var options = { 		// initialize options for fuse.js
            shouldSort: true,
            threshold: 0.3,
            ignoreLocation: true,
            maxPatternLength: 32,
            minMatchCharLength: 1,
            keys: [
                {
                    name: "title",
                    weight: 0.2		// give title more importance
                },
                {
                    name: "perex",
                    weight: 0.3		// give perex more importance
                },
                {
                    name: "content",
                    weight: 0.6
                }
            ]
        };

        // initialize fuse.js library
        var fuse = new Fuse(posts, options);
        var results = fuse.search(searchStr); // invoke search method in fuse.js library

        if (searchStr.length === 0) {
            updateResults(posts.slice(0, maxLength), true); // if there are no search results, show some suggestions
        } else {
            updateResults(results, false);
        }
    });
}

function updateResults(results, isSuggestion) {
    $('#omnisearch-suggestions-heading').text(isSuggestion ? 'Nejnovější' : 'Výsledky');

    var resultsHtml = '';
    results.forEach(function (res) {
        item = res.url ? res : res.item;
        resultsHtml += '<div class="col-lg-6 col-xl-4"><a href="' + item.url + '" class="preview-card card">' + item.html + '</a></div>';
    });

    $('#omnisearch-suggestions-list').html(resultsHtml);
}

function fetchSiteJson(callback) {
    if (posts.length === 0) {
        // fetch site.json file
        jQuery.get("/search.json", function (data) {
            posts = data;
            callback();
        }).fail(function() {
            // TODO: handle failure gracefully.
        });
    } else { // we already have the posts so simply use it instead of downloading the file again
        callback();
    }
}
