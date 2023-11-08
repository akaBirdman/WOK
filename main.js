// Progress Bar
const stops = document.querySelectorAll('section.progress-roadmap > .journey > .stop');
const descs = document.querySelectorAll('section.progress-roadmap > .descriptions > p');
const roads = document.querySelectorAll('section.progress-roadmap > .journey > .road');

const checkpoint = 1;

for (let i = 0; i <= checkpoint; i++) {
    stops[i].classList.add('complete');
    
    if (i <= 0) continue;
    roads[i - 1].classList.add('complete');
}

stops[checkpoint].classList.add('current');
descs[checkpoint].classList.add('complete');

try {
    roads[checkpoint].classList.add('in-progress');
    stops[checkpoint + 1].classList.add('in-progress');
} catch(error) {}


// Visual
const visual = document.querySelector('section.progress-roadmap > .visual > svg');
const visual_viewbox = visual.viewBox.baseVal;
for (let y = 0; y < visual_viewbox.height; y++) {
    for (let x = 0; x < visual_viewbox.width; x++) {
        const rect = document.createElementNS("http://www.w3.org/2000/svg", 'rect');
        rect.setAttribute('width', '1');
        rect.setAttribute('height', '1');
        rect.setAttribute('x', x);
        rect.setAttribute('y', y);
        rect.onclick = (event) => {
            console.log(event);
            event.target.classList.toggle('active');
        }
        visual.appendChild(rect)
    }
}