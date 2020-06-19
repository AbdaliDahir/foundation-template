/*
* Template Name: FreeCard - vCard Resume Personal Template
* Author: Ali
* Version: 1.0
*/

(function($) {
    "use strict";

    // card-component-root resize
    function fx_component_root_resize() {
        var fxComponentRootHeight = $('.card-active').height();
        $(".card-component-root").height(fxComponentRootHeight + 50);
    }
    
    // Portfolio
    function shuffle_portfolio(element) {

        var Shuffle = window.Shuffle;
        
        var shuffle = new Shuffle(element, {
            itemSelector: '.portfolio-item',
            easing: 'cubic-bezier(0.4, 0.0, 0.2, 1)', // CSS easing function to use.
            speed: 800, // Transition/animation speed (milliseconds).
        });

        // Log events.
        addShuffleEventListeners();
        let activeFilters = [];
        addFilterButtons();
        
        function addShuffleEventListeners() {
            shuffle.on(Shuffle.EventType.LAYOUT, (data) => {
                console.log('layout. data:', data);
                fx_component_root_resize();
            });
            shuffle.on(Shuffle.EventType.REMOVED, (data) => {
                console.log('removed. data:', data); 
            });
            
        }

        function addFilterButtons() {
            const options = document.querySelector('#portfolio-filters');
            if (!options) {
            return;
            }
            
            const filterButtons = Array.from(options.children);
            const onClick = handleFilterClick.bind(this);
            filterButtons.forEach((button) => {
            button.addEventListener('click', onClick, false);
            });
        }

        function handleFilterClick(evt) {
            const btn = evt.currentTarget;
            const isActive = btn.classList.contains('active');
            const btnGroup = btn.getAttribute('data-group');
            
            removeActiveClassFromChildren(btn.parentNode);
            
            let filterGroup;
            if (isActive) {
            btn.classList.remove('active');
            filterGroup = Shuffle.ALL_ITEMS;
            } else {
            btn.classList.add('active');
            filterGroup = btnGroup;
            }
            
            shuffle.filter(filterGroup);
        }

        function removeActiveClassFromChildren(parent) {
            const { children } = parent;
            for (let i = children.length - 1; i >= 0; i--) {
            children[i].classList.remove('active');
            }
        }
    }

    /*
    =======================================================================
        Window Load // resize
    =======================================================================
    */
    $(window).on('load', function() { 
        $('.loading').delay(500).fadeOut(500);

        // initializing page transition.
        var sectionsContainer = $('.card-component-root');
        if (sectionsContainer[0]) {
            PageTransitions.init({
                menu: 'ul.card-navbar',
            });
        }
        //Menu Effect
        $('.card-target').on({
            mouseenter: function () {
                $(this).addClass('noise-effect');
            },
            mouseleave: function () {
                $(this).removeClass('noise-effect');
            }
        });
    })

    $(window).on('resize', function() { //Resize
        setTimeout(function(){
            fx_component_root_resize();
        }, 400);
    });
    $(window).on('scroll', function () { //Scroll Sticky Sidebar
        if ($(window).scrollTop() < 20) {
            $('.navbar').removeClass('sticky');
        } else {
            $('.navbar').addClass('sticky');
        }
    }).scrollTop(0);

    // On Document Load
    $(document).ready(function() {
        // Slider 
        if($(".avatar-slider").length) {
            var slider = tns({
                container: '.avatar-slider',
                items: 1,
                slideBy: 'page',
                autoplay: true,
                controls: false,
                mode: "gallery",
                animateIn: "animate__fadeInDown",
                animateOut: "animate__fadeOutDown",
                speed: 1000,
                swipeAngle: false,
                mouseDrag: false,
                nav: false,
                autoplayButtonOutput: false,
                autoplayHoverPause: true
            });
        }
        
        // Initialize Portfolio grid
        var $portfolio_container = $("#portfolio-container");

        $portfolio_container.imagesLoaded(function () {
            setTimeout(function() {
                shuffle_portfolio($portfolio_container);
            }, 500);
        });

        // Lightbox init
        $('.popup-media').magnificPopup({
            disableOn: 700,
            type: 'iframe',
            mainClass: 'mfp-fade',
            preloader: false,
            removalDelay: 150, //delay removal by X to allow out-animation
            callbacks: {
                beforeOpen: function() {
                this.st.mainClass = this.st.el.attr('data-effect');
                }
            },
            fixedContentPos: false
        });
        // open popup id

        /* Portfolio magnific popup */
        $('.has-popup').magnificPopup({
            type: 'inline',
            overflowY: 'auto',
            closeBtnInside: true,
            mainClass: 'mfp-fade',
            removalDelay: 500, //delay removal by X to allow out-animation
            callbacks: {
                beforeOpen: function() {
                this.st.mainClass = this.st.el.attr('data-effect');
                }
            },
        });
    });

})(jQuery);