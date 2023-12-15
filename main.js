const ingredients = document.querySelectorAll('#navigation .stir > .fry > .ingredients');
ingredients.forEach(element => {
    element.removeAttribute('href');
    element.onclick = event => { toggle_active(event.target) }
})

function toggle_active(element) {
    const navs = document.querySelectorAll('nav .stir > .fry > a');
    navs.forEach(e => {
        if (e != element) {
            try {
                e.closest('.fry')
                .querySelector('.accordion')
                .classList.remove('active');
            } catch(error) {}
        }
    });

    element.blur();
    element.closest('.fry').querySelector('.accordion').classList.toggle('active');
}

/* -------------------------------------------------------------------------- */
/*                           Image Carousel Handling                          */
/* -------------------------------------------------------------------------- */
slideshow_initializeAll();

function slideshow_initializeAll() {
    const slideShows = document.querySelectorAll('.carousel > .slideshow');
    slideShows.forEach(element => {
        firstChild = element.children[0];
        newChild = firstChild.cloneNode(true);
        element.appendChild(newChild);
    });

    const navs = document.querySelectorAll('.carousel > .carousel-navigation > a');
    navs.forEach(element => {
        element.removeAttribute('href');
        element.onclick = e => {
            slideshow_navigateSlide(e.target);
        }
    });
}

function slideshow_navigateSlide(element) {
    clearTimeout($Timer_autoScroll);

    const slideShow = element.closest('.carousel').querySelector('.slideshow');
    const options = {
        index: Array.prototype.indexOf.call(element.parentElement.children, element)
    }
    slideshow_scroll(slideShow, options);

    $Timer_autoScroll = setInterval( function() {
        slideshow_scroll(document.querySelector('#hero > .carousel > .slideshow'));
    }, 5000);
}

function slideshow_scroll(element, options = {}) {
    let slideIndex = parseInt(element.getAttribute('slideIndex')) + 1;

    if (slideIndex == element.children.length) {
        element.scrollTo({ top:0, left:0, behavior: "instant"})
        element.setAttribute('slideIndex', 1);
        slideIndex = 1;
    }

    if ('index' in options)
        slideIndex = options.index;

    element.setAttribute('slideIndex', slideIndex);

    const scrollAmmount = element.clientWidth;
    element.scrollLeft = slideIndex * scrollAmmount;
}

document.querySelectorAll('.carousel > .slideshow').forEach(element => {
    element.onscroll = () => {
        const slideIndex = parseInt(element.getAttribute('slideIndex'));
        const navLinks = element.parentElement.querySelectorAll('.carousel-navigation > a');
        navLinks.forEach(e => {
            const index = Array.prototype.indexOf.call(e.parentElement.children, e);
            if (index == slideIndex)
                e.classList.add('active');
            else if (index == 0 && slideIndex == element.children.length - 1)
                e.classList.add('active');
            else
                e.classList.remove('active');
        })
    }
});

var $Timer_autoScroll = setInterval( function() {
    if (document.visibilityState == 'hidden') return;
    slideshow_scroll(document.querySelector('#hero > .carousel > .slideshow'));
}, 5000);