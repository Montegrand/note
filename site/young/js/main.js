window.onload = function() {
    document.querySelectorAll('a').forEach(function (v, n) {
        if (v.href === location.href) {
            v.onclick = function () {
                return false;
            }
        }
    })
    var to_area = document.querySelectorAll('.to_area a');
    to_area.forEach(function (v, n) {
        v.addEventListener('focus', function () {
            v.classList.add('on');
        })
        v.addEventListener('blur', function () {
            v.classList.remove('on');
        })
    })
    var depth1_item = document.querySelectorAll('.depth1_text');
    depth1_item.forEach(function(v,n){
        v.nextElementSibling.style.height = '0px';
        v.parentElement.addEventListener('mouseenter',function(){
            v.parentElement.classList.add('on');
            v.nextElementSibling.style.height = v.nextElementSibling.children.item(0).getBoundingClientRect().height + 'px';
        })
        v.parentElement.addEventListener('mouseleave',function(){
            v.parentElement.classList.remove('on');
            v.nextElementSibling.style.height = '0px';
        })
    })
    // sec1_animating = false;
    var section = document.querySelectorAll('section');
    var section_div = document.querySelectorAll('section:nth-child(1) > div');
    section.forEach(function(v,n){
        v.style.height = window.innerHeight - 95 + 'px';
    })
    section_div.forEach(function(v,n){
        if(n===0){
            v.classList.add('on');
            v.style.zIndex='50';
            v.style.opacity=1;
            v.style.transform='scale(1)';
            v.style.transition='all 0.45s linear';
            v.addEventListener('transitionend',function(){
                var item = v.querySelectorAll('.event')
                item.forEach(function(val,num){
                    val.classList.add('on');
                })
            })
        }
        v.style.height = window.innerHeight - 95 + 'px';
        window.addEventListener('resize',function(){
            if(window.innerWidth>1200){
                v.style.height = window.innerHeight - 95 + 'px';
            }
        })
    })
}