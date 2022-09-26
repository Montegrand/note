window.onload = function () {
    var depth1_item = document.querySelectorAll('.depth1_item');
    var depth2_item = document.querySelectorAll('.depth2_item');
    var hovering = false;
    document.querySelectorAll('a').forEach(function (v, n) {
        if (v.href === location.href) {
            v.onclick = function () {
                return false;
            }
        }
    })
    depth1_item.forEach(function (v, n) {
        var depth1_text = v.children.item(0);
        v.addEventListener('mouseenter', function () {
            v.classList.add('on');
            depth1_text.nextElementSibling.classList.add('on');
        })
        v.addEventListener('mouseleave', function () {
            v.classList.remove('on');
            depth1_text.nextElementSibling.classList.remove('on');
        })
        depth1_text.addEventListener('focus', function () {
            v.classList.add('on');
            depth1_text.nextElementSibling.classList.add('on');
        })
        depth1_text.addEventListener('blur', function () {
            v.classList.remove('on');
            depth1_text.nextElementSibling.classList.remove('on');
        })
    })
    depth2_item.forEach(function (v, n) {
        var depth2_text = v.children.item(0);
        var depth2 = v.parentElement.parentElement;
        v.addEventListener('mouseenter', function () {
            v.classList.add('on');
        })
        v.addEventListener('mouseleave', function () {
            v.classList.remove('on');
        })
        depth2_text.addEventListener('focus', function () {
            depth2.classList.add('on');
            depth2.parentElement.classList.add('on');
            v.classList.add('on');
        })
        depth2_text.addEventListener('blur', function () {
            depth2.classList.remove('on');
            depth2.parentElement.classList.remove('on');
            v.classList.remove('on');
        })
    })
    var global_box = document.querySelectorAll('.global_box a');
    global_box.forEach(function (v, n) {
        v.addEventListener('mouseenter', function () {
            v.classList.add('on');
        })
        v.addEventListener('mouseleave', function () {
            v.classList.remove('on');
        })
        v.addEventListener('focus', function () {
            v.classList.add('on');
        })
        v.addEventListener('blur', function () {
            v.classList.remove('on');
        })
    })

    var popup_sl_wrap = document.querySelector('.popup .sl_wrap');
    var popup_sl_item = document.querySelectorAll('.popup .sl_item');
    var popup_pg = document.querySelectorAll('.popup .pg span');
    popup_pg[2].innerHTML = popup_sl_item.length;
    var popup = document.querySelector('.popup');
    var popup_sl_bt = document.querySelectorAll('.popup .sl_bt_box a');
    var popHovering = false;
    
    popup_sl_item.forEach(function(v,n){
        var popup_i_c = document.importNode(v,true);
        popup_sl_wrap.appendChild(popup_i_c);
    })

    var popup_sl_item = document.querySelectorAll('.popup .sl_item');
    var item_l = (popup_sl_item[0].getBoundingClientRect().width + 51);
    if(this.innerWidth>1400){
        document.querySelector('.popup .sl_box').style.width = popup_sl_item[0].getBoundingClientRect().width * 2 + 51 + 'px';
    }else{
        document.querySelector('.popup .sl_box').style.width = popup_sl_item[0].getBoundingClientRect().width * 1 + 'px';
    }

    window.addEventListener('resize',function(){
        if(this.innerWidth>1400){
            document.querySelector('.popup .sl_box').style.width = popup_sl_item[0].getBoundingClientRect().width * 2 + 51 + 'px';
        }else{
            document.querySelector('.popup .sl_box').style.width = popup_sl_item[0].getBoundingClientRect().width * 1 + 'px';
        }
    })

    popup_sl_wrap.style.width = popup_sl_item[0].getBoundingClientRect().width * popup_sl_item.length + (51 * (popup_sl_item.length - 1)) + 'px';
    popup_sl_wrap.style.transform = 'translateX(' + -item_l + 'px)';
    popup_sl_wrap.addEventListener('mouseenter', function () {
        popHovering = true;
        popup_sl_bt[1].classList.add('stop');
    })
    popup_sl_wrap.addEventListener('mouseleave', function () {
        popHovering = false;
        popup_sl_bt[1].classList.remove('stop');
    })
    
    popup_pg[0].innerHTML = popup_sl_item[1].dataset.n;
    popup_sl_wrap.addEventListener('transitionend',function(){
        var popup_sl_item = document.querySelectorAll('.popup .sl_item');
        popup_pg[0].innerHTML = popup_sl_item[2].dataset.n;
    })


    popup_sl_bt.forEach(function (v, n) {
        v.addEventListener('click', function (e) {
            if (v === popup_sl_bt[0]) {
                console.log('d')
                var popup_sl_item = document.querySelectorAll('.popup .sl_item');
                popup_sl_wrap.style.transform = 'translateX(0px)';
                popup_sl_wrap.addEventListener('transitionend', function () {
                    popup_sl_wrap.prepend(popup_sl_item[popup_sl_item.length-1])
                    popup_sl_wrap.style.transform = 'translateX(' + -item_l + 'px)';
                    popup_sl_wrap.style.transition = 'none';
                })
                popup_sl_wrap.style.transition = 'all 0.25s linear';
            } else if (v === popup_sl_bt[2]) {
                console.log('l')
                var popup_sl_item = document.querySelectorAll('.popup .sl_item');
                popup_sl_wrap.style.transform = 'translateX(' + -(item_l * 2) + 'px)';
                popup_sl_wrap.addEventListener('transitionend', function () {
                    popup_sl_wrap.style.transform = 'translateX(' + -item_l + 'px)';
                    popup_sl_wrap.style.transition = 'none';
                    popup_sl_wrap.appendChild(popup_sl_item[0])
                })
                popup_sl_wrap.style.transition = 'all 0.25s linear';
            } else {
                v.classList.toggle('stop');
                popHovering = !popHovering;
            }
        })
    })

    const popSl = setInterval(() => {
        if (!popHovering) {
            var popup_sl_item = document.querySelectorAll('.popup .sl_item');
            popup_sl_wrap.style.transform = 'translateX(' + -(item_l * 2) + 'px)';
            popup_sl_wrap.addEventListener('transitionend', function () {
                popup_sl_wrap.style.transform = 'translateX(' + -item_l + 'px)';
                popup_sl_wrap.style.transition = 'none';
                popup_sl_wrap.appendChild(popup_sl_item[0])
            })
            popup_sl_wrap.style.transition = 'all 0.25s linear';
        }
    }, 3000)


    var contents_sl = document.querySelector('.fs_main_contents .sl');
    var contents_sl_item = document.querySelectorAll('.fs_main_contents .sl_item');
    var contents_sl_item_p = contents_sl_item[0].parentElement;
    var slide_l = contents_sl_item[0].getBoundingClientRect().width;
    var pg = document.querySelectorAll('.sl .pg a')
    var link_wrap = document.querySelectorAll('.link_wrap a');
    if(window.innerWidth<1200){
        contents_sl_item = document.querySelectorAll('.fs_main_contents .sl_item');
        slide_l = contents_sl_item[0].getBoundingClientRect().width;
        document.querySelector('.con_box .sl .sl_wrap').style.width = (slide_l * 6) + 'px';
    }else{
        
    }
    
    window.addEventListener('resize',function(){
        contents_sl_item = document.querySelectorAll('.fs_main_contents .sl_item');
        slide_l = contents_sl_item[0].getBoundingClientRect().width;
        fs_contents_LR = document.querySelectorAll('.fs_main_contents > div');
        link_align();
        if(window.innerWidth<1200){
            document.querySelector('.con_box .sl .sl_wrap').style.width = (slide_l * 6) + 'px';
            fs_contents_LR[1].style.height = 'auto';
        }else{
            fs_contents_LR[1].style.height = fs_contents_LR[0].getBoundingClientRect().height + 'px';
        }
        contents_sl_item_p.style.transform = 'translateX(' + -(slide_l * num) + 'px)';
    })
    var link_align = function() {
        for(i=0;i<link_wrap.length;i++){
            var h = 0;
            link_h = link_wrap[i].getBoundingClientRect().height;
            if(h<link_h){
                h = link_h;
            }
        }
        link_wrap.forEach(function(v,n){
            v.style.height = link_h + 'px';
        })
    }
    link_align();
    
    var num = 0;
    contents_sl.addEventListener('mouseenter', function () {
        pg[pg.length - 1].classList.remove('running');
        hovering = true;
    })
    contents_sl.addEventListener('mouseleave', function () {
        pg[pg.length - 1].classList.add('running');
        hovering = false;
    })
    
    pg.forEach(function (v, n) {
        v.addEventListener('click', function (e) {
            if (e.target !== pg[pg.length - 1]) {
                num = e.target.dataset.n;
                contents_sl_item_p.style.transform = 'translateX(' + -(slide_l * num) + 'px)';
                for (i = 0; i < pg.length; i++) {
                    pg[i].classList.remove('on');
                }
                v.classList.add('on');
            } else {
                hovering = !hovering;
                v.classList.toggle('running');
            }
        })
    })

    let slide = setInterval(() => {
        if (!hovering) {
            if (num === pg.length - 2) {
                num = 0;
            } else {
                num++
            }
            contents_sl_item_p.style.transform = 'translateX(' + -(slide_l * num) + 'px)';
            for (i = 0; i < pg.length; i++) {
                pg[i].classList.remove('on');
            }
            pg[num].classList.add('on');
        }
    }, 3000);

    if(window.innerWidth>1200){
        var fs_contents_LR = document.querySelectorAll('.fs_main_contents > div');
        fs_contents_LR[1].style.height = fs_contents_LR[0].getBoundingClientRect().height + 'px';
    }

    
    var bn_wrap = document.querySelector('.banner .bn_wrap');
    var bn_item = document.querySelectorAll('.banner .bn_wrap > a');
    var banner = document.querySelector('.banner');
    var bn_bn_bt = document.querySelectorAll('.banner .bn_bt_box a');
    var bnHovering = false;
    
    bn_item.forEach(function(v,n){
        var bn_i_c = document.importNode(v,true);
        bn_wrap.appendChild(bn_i_c);
    })
    var bn_item_l = (bn_item[0].getBoundingClientRect().width);
    if(window.innerWidth<1200){
        bn_item_l = (window.innerWidth - 260)/5 -4;
    }
    window.addEventListener('resize',function(){
        if(window.innerWidth<1200){
            bn_item_l = (window.innerWidth - 260)/5 -4;
        }else{
            bn_item_l = (bn_item[0].getBoundingClientRect().width);
        }
    })
    var bn_item = document.querySelectorAll('.banner .bn_wrap > a');
    bn_item.forEach(function(v,n){
        v.style.width = bn_item_l + 'px';
    })
    document.querySelector('.banner .bn_box').style.width = bn_item[0].getBoundingClientRect().width * 5 + 'px';

    bn_wrap.style.width = bn_item[0].getBoundingClientRect().width * bn_item.length + 'px';
    bn_wrap.style.transform = 'translateX(' + -bn_item_l + 'px)';
    banner.addEventListener('mouseenter', function () {
        bnHovering = true;
        bn_bn_bt[1].children.item(0).src = '/note/site/css/img/banner_play.png';
    })
    banner.addEventListener('mouseleave', function () {
        bnHovering = false;
        bn_bn_bt[1].children.item(0).src = '/note/site/css/img/banner_stop.png';
    })
    
    bn_bn_bt.forEach(function (v, n) {
        v.addEventListener('click', function (e) {
            if (v === bn_bn_bt[0]) {
                console.log('d')
                var bn_item = document.querySelectorAll('.banner .bn_wrap > a');
                bn_wrap.style.transform = 'translateX(0px)';
                bn_wrap.addEventListener('transitionend', function () {
                    bn_wrap.prepend(bn_item[bn_item.length-1]);
                    bn_wrap.style.transform = 'translateX(' + -bn_item_l + 'px)';
                    bn_wrap.style.transition = 'none';
                })
                bn_wrap.style.transition = 'all 0.25s linear';
            } else if (v === bn_bn_bt[2]) {
                console.log('l')
                var bn_item = document.querySelectorAll('.banner .bn_wrap > a');
                bn_wrap.style.transform = 'translateX(' + -(bn_item_l * 2) + 'px)';
                bn_wrap.addEventListener('transitionend', function () {
                    bn_wrap.style.transform = 'translateX(' + -bn_item_l + 'px)';
                    bn_wrap.style.transition = 'none';
                    bn_wrap.appendChild(bn_item[0]);
                })
                bn_wrap.style.transition = 'all 0.25s linear';
            } else {
                var tg = ['play','stop'];
                if(bnHovering){
                    v.children.item(0).src = '/note/site/css/img/banner_' + tg[1] + '.png';
                }else{
                    v.children.item(0).src = '/note/site/css/img/banner_' + tg[0] + '.png';
                }
                console.log(v.children.item(0).src)
                bnHovering = !bnHovering;
            }
        })
    })

    const bnSl = setInterval(() => {
        if (!bnHovering) {
            var bn_item = document.querySelectorAll('.banner .bn_wrap > a');
            bn_wrap.style.transform = 'translateX(' + -(bn_item_l * 2) + 'px)';
            bn_wrap.addEventListener('transitionend', function () {
                bn_wrap.style.transform = 'translateX(' + -bn_item_l + 'px)';
                bn_wrap.style.transition = 'none';
                bn_wrap.appendChild(bn_item[0])
            })
            bn_wrap.style.transition = 'all 0.25s linear';
        }
    }, 3000)
}