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
    // $('.sl_box').slick({
    //     infinite: true,
    //     slidesToShow: 2,
    //     slidesToScroll: 1,
    //     autoplay: true,
    //     arrows: false,
    // });
    var popup_sl_wrap = document.querySelector('.popup .sl_wrap');
    var popup_sl_item = document.querySelectorAll('.popup .sl_item');
    var popup = document.querySelector('.popup');
    var popup_sl_bt = document.querySelectorAll('.popup .sl_bt_box a');
    var popHovering = false;
    var popup_clone_s = document.importNode(popup_sl_item[0], true);
    var popup_clone_e = document.importNode(popup_sl_item[popup_sl_item.length - 1], true);
    popup_sl_wrap.prepend(popup_clone_e);
    popup_sl_wrap.appendChild(popup_clone_s);
    var popup_sl_item = document.querySelectorAll('.popup .sl_item');
    var item_l = (popup_sl_item[0].getBoundingClientRect().width + 51);

    popup_sl_wrap.style.width = popup_sl_item[0].getBoundingClientRect().width * popup_sl_item.length + (51 * (popup_sl_item.length - 1)) + 'px';
    popup_sl_wrap.style.transform = 'translateX(' + -item_l + 'px)';
    popup.addEventListener('mouseenter', function () {
        popHovering = true;
        popup_sl_bt[1].classList.add('stop');
    })
    popup.addEventListener('mouseleave', function () {
        popHovering = false;
        popup_sl_bt[1].classList.remove('stop');
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
    }, 3000)

    var fs_contents_LR = document.querySelectorAll('.fs_main_contents > div');
    fs_contents_LR[1].style.height = fs_contents_LR[0].getBoundingClientRect().height + 'px';
}