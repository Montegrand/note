var depth1_item = document.querySelectorAll('header li.depth1_item');
var gnbCl = document.querySelector('.header + div');
var container = document.querySelector('.container');
var a = document.querySelectorAll('a');
a.forEach(function (v, n, node) {
    if (v.href.match(location.href.replace(/\?.*/, ""))) {
        v.onclick = function () { return false }
    }
})
var side_depth1_item = document.querySelectorAll('.side_menu a.depth1_text')
side_depth1_item.forEach(function (v, n, node) {
    v.addEventListener('click', function () {
        if (v.nextElementSibling) {
            for (i = 0; i < side_depth1_item.length - 1; i++) {
                if (!v.nextElementSibling.classList.contains('on')) {
                    side_depth1_item[i].nextElementSibling.classList.remove('on');
                }
            }
            v.nextElementSibling.classList.toggle('on')
        }
    })
})
if (document.getElementById('contents').className === 'page1211') {
    depth1_item.forEach(function (v, n, node) {
        v.addEventListener('mouseenter', function () {
            v.children.item(0).classList.add('on');
            v.children.item(1).classList.add('on');
            gnbCl.style.height = v.children.item(1).getBoundingClientRect().height + 'px';
            container.classList.add('nav');
        })
        v.addEventListener('mouseleave', function () {
            v.children.item(0).classList.remove('on');
            v.children.item(1).classList.remove('on');
            gnbCl.style.height = '0';
            container.classList.remove('nav');
        })
    })


    var ex1_box = document.querySelectorAll('.ex1 .box');
    var height = 0;
    for (i = 0; i < ex1_box.length; i++) {
        if (ex1_box[i].getBoundingClientRect().height > height) {
            height = ex1_box[i].getBoundingClientRect().height;
        }
    }
    ex1_box.forEach(function (v, n) {
        v.style.height = height + 'px';
    })

    if (document.querySelector('.ex1')) {
        let ex1 = document.querySelector('.ex1');
        let ex1_wrap = document.querySelector('.ex1_wrap');
        let ex1scroll = 0;
        var html = document.querySelector('html');

        ex1.addEventListener('mouseenter', function () {
            var html = document.querySelector('html')
            var scrB = -html.getBoundingClientRect().width;
            html.classList.add('scroll_stop');
            scrB += html.getBoundingClientRect().width;
            html.style.paddingRight = scrB + 'px';
        })
        ex1.addEventListener('wheel', function (e) {
            var escr = ex1scroll + e.wheelDelta;
            if (escr <= 0 && escr >= -(ex1_wrap.getBoundingClientRect().width - ex1.getBoundingClientRect().left)) {
                ex1scroll += e.wheelDelta
            }
            ex1.children.item(0).style.transform = 'translateX(' + ex1scroll + 'px)';
        }, { passive: true })
        ex1.addEventListener('mouseleave', function () {
            html.classList.remove('scroll_stop');
            html.style.paddingRight = 0;
        })
        // var circle = document.querySelector('.circle > div');
        // circle.style.set
        var y = 0;
        const dd = setInterval(()=>{
            if(y<180){
                y++;
            }else{
                y=0;
            }
            writeCssVar(document.querySelector('.circle > div'), 'x', y+'%');
        },30);
        function writeCssVar(element, varName, value) {
            return element.style.setProperty(`--${varName}`, value);
        }
        // function readCssVar(element, varName) {
        //     const elementStyles = getConputedStyle(element);
        //     return elementStyle.getPropertyValue(`--${varName}`).trim();
        // }
    }
}