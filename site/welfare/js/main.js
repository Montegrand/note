window.onload=function(){
    const nav_item1=document.querySelectorAll('.depth1_item');
    nav_item1.forEach(function(v,n){
        v.addEventListener('mouseenter',function(){
            var nav_dep1 = document.querySelector('.depth1');
            var lng_bg = document.querySelector('.lnb_bg');
            lng_bg.classList.add('hover');
            v.classList.toggle('hover');
            nav_dep1.classList.add('hover');
        })
        v.addEventListener('mouseleave',function(){
            var nav_dep1 = document.querySelector('.depth1');
            var lng_bg = document.querySelector('.lnb_bg');
            lng_bg.classList.remove('hover');
            v.classList.toggle('hover');
            nav_dep1.classList.remove('hover');
        })
    })
}