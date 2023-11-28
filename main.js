const ingredients = document.querySelectorAll('#navigation .stir > .fry > .ingredients');
ingredients.forEach(e => {
    e.removeAttribute('href');
    e.onclick = event => { toggle_active(event.target) }
})

function toggle_active(element) {
    const navs = document.querySelectorAll('nav .stir > .fry > a');
    navs.forEach((e) => {
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

// Auto Slideshow
function do_scroll() { // Delete this function later
    const slideShow = document.querySelector('#welcome > .carousel > .slideshow');
    slideshow_scrollNext(slideShow);
}

slideshow_appendAll();

function slideshow_appendAll() {
    const slideShows = document.querySelectorAll('.slideshow');
    slideShows.forEach(element => {
        firstChild = element.children[0];
        newChild = firstChild.cloneNode(true);
        element.appendChild(newChild);
    });
}

function slideshow_scrollNext(element) {
    const scrollAmmount = element.clientWidth;
    element.setAttribute('slideIndex', parseInt(element.getAttribute('slideIndex')) + 1);
    let slideIndex = element.getAttribute('slideIndex');
    if (slideIndex == element.children.length) {
        element.scrollTo({ top:0, left:0, behavior: "instant"})
        element.setAttribute('slideIndex', 1);
        slideIndex = 1;
    }
    element.scrollLeft = slideIndex * scrollAmmount;
}