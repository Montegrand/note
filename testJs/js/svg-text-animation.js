let svgAni =
/**
 * @param {Element} svg svg 선택
 * @param {Number} frame 프레임
 * @param {Number} delayT 딜레이 시간
 * @param {string} color 이미지 위의 텍스트 색
 * @param {string} underColor 이미지 아해의 텍스트 색
 */
function (svg, frame, delayT, color, underColor) {

    let svgImg = svg.querySelector('#svgImg'),
        textLine = svg.querySelectorAll('g.text_line'),
        delay = 0;

    textLine.forEach((textLine, index) => addRect(textLine, index));

    var copyTextArr = copyText(svg.querySelector('g.text'), svg, svgImg, color, underColor, copyTextArr);

    svg.querySelectorAll('text.origin').forEach((v,i)=>{
        delay = addChar(v, i, delay, frame, delayT, copyTextArr);
    })
};

let addRect =
(textLine, index) => {
    // 변수
    let text = textLine.querySelector('text'),
        defs = document.createElementNS('http://www.w3.org/2000/svg', 'defs'),
        clipPath = document.createElementNS('http://www.w3.org/2000/svg', 'clipPath'),
        rect = document.createElementNS('http://www.w3.org/2000/svg', 'rect'),
        recSize = [text.getBBox().width, text.getBBox().height];

    //클리핑 영역의 크기와 위치 설정
    rect.setAttribute('x', '0');
    rect.setAttribute('y', '0');
    rect.setAttribute('width', recSize[0]);
    rect.setAttribute('height', recSize[1]);

    //텍스트 위치
    text.setAttribute('x', '0');
    text.setAttribute('y', recSize[1]/2);
    text.classList.add('origin');

    // 클리핑 경로에 적용할 ID 생성
    let clipId = 'clip' + index;
    clipPath.setAttribute('id', clipId);
    clipPath.appendChild(rect);

    // 클리핑 경로를 <defs> 내에 추가
    defs.appendChild(clipPath);

    // 생성된 클리핑 경로를 <g> 요소에 적용
    textLine.prepend(defs);

    text.style.clipPath = `url(#${clipId})`;
};

let addChar =
(text,index,delay,time,delayT,copyTextArr)=>{
    let tCont = text.textContent,
        tBBox = text.getBBox();

    text.textContent = null;
    for (var i = 0; i < tCont.length; i++) {
        let tspan = document.createElementNS('http://www.w3.org/2000/svg', 'tspan');
        let tY = Number(tBBox.height/2);
        tspan.textContent = tCont.charAt(i);
        tspan.style.dominantBaseline = 'central';
        tspan.setAttribute('y', Number(tY*(3)));
        copyTextArr[index].appendChild(tspan.cloneNode(true));
        text.appendChild(tspan);

        let tspanCopy = copyTextArr[index].querySelectorAll('tspan')[i];
        // 인터벌 설정 및 실행
        setTimeout(() => {
            tspan.classList.add('load');
            tspanCopy.classList.add('load');
            let interval = setInterval(() => {
                let shouldStop = charInterval(tspan, tspanCopy, tY, time);
                if (shouldStop) {
                    clearInterval(interval);
                }
            }, 1);
        }, delay);
        delay += delayT; // 인터벌 간 딜레이 설정
    };

    return delay
}

let copyText =
(g, svg, svgImg, color, underColor)=>{
    g.setAttribute('fill',color);
    let copyG = g.cloneNode(true);
    copyG.classList.add('copyG');
    copyG.setAttribute('fill',underColor);
    copyG.removeAttribute('clip-path');
    let copyText = copyG.querySelectorAll('text');
    copyText.forEach((v,n)=>{
        v.classList.remove('origin');
        v.textContent = null;
    });
    svg.insertBefore(copyG, svgImg);
    return copyText;
}

let charInterval =
/**
 * @param {XMLDocument} tspan svg tspan
 * @param {XMLDocument} tspanCopy 복사한 tspan
 * @param {Number} y y
 * @param {Number} time 입력된 시간
 * @returns {boolean} 인터벌을 멈추어야 하는지 여부 반환
 */
(tspan, tspanCopy, y, time) => {
    var now = parseFloat(tspan.getAttribute('y'));
    var step = ((now-y)/(1000/time));
    tspan.setAttribute('y', now - step);
    tspanCopy.setAttribute('y', now - step);
    return step.toFixed(4) == 0.000;
};

export default svgAni