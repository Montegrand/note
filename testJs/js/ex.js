import svgAni from './svg-text-animation.js'

window.onload = ()=>{
    let svg = document.querySelector('#animation');
    // params: Element, speed(fps), delay, text color over img, text color under img
    svgAni(svg, 30, 50, "#cadf0f", "black")
}