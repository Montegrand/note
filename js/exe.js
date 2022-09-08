window.onload = function() {
    let running = false;
    let btOnF = function() {
        document.querySelectorAll('a').forEach(function(v,n,node){
            if(location.href===v.href){
                v.onclick = function(){
                    return false;
                }
            }
        })
    }
    btOnF();

    //wrap 자식 높이 맞추기
    var boxB = document.querySelectorAll('ol > li')
    var height = 0;
    boxB.forEach(function(v, n, node){
        if(height < v.clientHeight){
            height = v.clientHeight;
        }
        if(n===boxB.length-1){
            for(i=0;i<boxB.length;i++){
                boxB.item(i).style.height = height + 'px';
            }
        }
    });
    // zoom
    let zoom_bts = document.querySelectorAll('.zoom.bt_wrap button');
    let body_s = document.body.style
    let size = 1;
    zoom_bts.forEach(function(v,n){
        let scale = function(){
            size += v.dataset.zoom*0.1;
            body_s.transform = 'scale('+size+')';
            body_s.transform = 'none';
        }
        v.addEventListener('click', function(e){
            if(n===1){
                size=1;
                scale();
            } else if((n===0&&size>0.8)||(n===2&&size<1.2)){
                scale();
            }
        })
    })

    //scroll animation
    let sE = document.querySelectorAll('.scrollEventExe > div');
    sE.forEach(function(v,n,node){
        window.addEventListener('scroll', function(){
            var y = v.getBoundingClientRect().top + 100;
            if(y < window.innerHeight + 100){
                v.classList.add('on');
            } else {
                v.classList.remove('on');
            }
        })
    })

    //간단한 검색
    var datas = document.querySelectorAll('.data');
    var search = document.querySelector('#search');

    search.addEventListener('keyup',function(){
        datas.forEach(function(v,n,node){
            if(v.textContent.match(search.value)){
                v.classList.add('on')
            } else {
                v.classList.remove('on');
            }
        })
    })

    var data_t = document.querySelectorAll('.table tbody tr');
    var search_t = document.querySelector('#search_t');

    search_t.addEventListener('keyup',function(){
        data_t.forEach(function(v,n,node){
            if(v.textContent.match(search_t.value)){
                v.classList.add('on')
            } else {
                v.classList.remove('on');
            }
        })
    })

    //달력

    let current = new Date();
    let current_year = current.getFullYear();
    let current_month = current.getMonth();
    let calendar = document.querySelector('.calendar tbody');
    let cal_date_choice = function() {
        let cal_date = calendar.querySelectorAll('a');
        cal_date.forEach(function(v,n,node){
            v.addEventListener('click', function(){
                let choice_date = '';
                choice_date = new Date(current_year, current_month, this.textContent).toDateString();
                document.getElementById('date').value = choice_date;
            })
        })
    };
    
    let callCalendar = function() {
        let full_date = new Date(current_year, current_month + 1, 0).getDate();
        let week = Math.ceil((new Date(current_year, current_month, 1).getDay()+full_date)/7);
        let day = new Date(current_year, current_month, 1).getDay();
        let calYM = new Date(current_year, current_month).toDateString().split(' ');
        document.querySelector('.calendar h4').innerHTML = calYM[3];
        document.querySelector('.calendar h5').innerHTML = calYM[1];
        for(i=0;i<week;i++){
            let tr = document.createElement('tr');
            calendar.appendChild(tr);
            for(n=0;n<7;n++){
                let td = document.createElement('td');
                calendar.children.item(i).appendChild(td);
            }
        }
        let date = 1;
        calendar.querySelectorAll('td').forEach(function(v,n,node){
            if(n>=day&&date<=full_date){
                let a = document.createElement('a');
                if(date==current.getDate()&&current.getMonth()===current_month){
                    a.classList.add('today')
                }
                a.href = '';
                a.innerHTML = date;
                v.appendChild(a);
                date++
            }
        });
        btOnF();
        cal_date_choice();
    }
    callCalendar();

    let calBts = document.querySelectorAll('.calendar .bts a');
    calBts.forEach(function(v,n,node){
        v.addEventListener('click',function(e){
            calendar.innerHTML = '';
            if(n===0){
                current_month -= 1;
                callCalendar();
            } else {
                current_month += 1;
                callCalendar();
            }
        })
    })

    let cal_opener = document.querySelector('.cal_opener a');
    let cal = document.querySelector('.calendar');
    cal_opener.addEventListener('click', function(e){
        if(!running){
            running = true;
            if(this.textContent==='달력 열기'){
                cal.classList.remove('off');
                cal.classList.add('on');
                this.textContent = '달력 닫기';
            } else {
                cal.classList.remove('on');
                cal.classList.add('off');
                this.textContent = '달력 열기';
            }
        }
        cal.addEventListener('animationend', function(){
            running = false;
        })
    })

    //scroll_fake

    let scroll_fake = document.querySelector('.scroll_fake');
    let scroll_fake_c = document.querySelectorAll('.scroll_fake > div');
    scroll_fake.parentElement.style.height = scroll_fake.getBoundingClientRect().width - 1200 + 'px';
    document.addEventListener('scroll',function(){
        let sfz = scroll_fake.parentElement.getBoundingClientRect();
        if(sfz.top<=0&&sfz.bottom>scroll_fake.getBoundingClientRect().height+500){
            scroll_fake.style.position = 'fixed';
            scroll_fake.style.top = '0px';
            scroll_fake.style.left = (sfz.y) + 'px';
        } else if(sfz.top>0){
            scroll_fake.style.position = 'relative';
        } else if(sfz.bottom<=scroll_fake.getBoundingClientRect().height+500){
            scroll_fake.style.position = 'absolute';
            scroll_fake.style.top = 'auto';
            scroll_fake.style.bottom = '500px';
        }
        scroll_fake_c.forEach(function(v,n,node){
            if(v.getBoundingClientRect().left < (window.innerWidth / 2) && v.getBoundingClientRect().left > -600){
                v.children.item(0).classList.add('on');
            } else {
                v.children.item(0).classList.remove('on');
            }
        })
    })

    //클릭시 이동

    let screenMove = document.querySelectorAll('body > div, footer');
    var div = document.createElement('div');
    div.classList.add('wrap')
    document.querySelector('aside').appendChild(div);
    screenMove.forEach(function(v,n,node){
        console.log(v)
        var a = document.createElement('a');
        if(n===screenMove.length-1){
            a.innerHTML = 'footer';
        } else {
            a.innerHTML = n+1;
        }
        a.classList.add('page'+n)
        a.onclick = function(){return false;};
        a.href = "";
        document.querySelector('aside .wrap').appendChild(a)
    })
    console.log(window.scrollY)
    var pagebt = document.querySelectorAll('aside a');
    pagebt.forEach(function(v,n,node){
        v.addEventListener('click',function(){
            window.scrollTo(0,window.scrollY + screenMove[n].getBoundingClientRect().top);
            console.log(screenMove[n].getBoundingClientRect().top)
        })
    })
};