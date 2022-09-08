window.onload = function () {

    var keyword = document.getElementById('keyword');
    keyword.addEventListener('focus', function () {
        this.parentElement.parentElement.style.outline = '2px solid #333';
        this.parentElement.parentElement.style.borderRadius = '2px';
        this.addEventListener('keyup',function(e){
            // console.log(e.key)
            if(e.key==='Enter'){
                searchPlaces();
                return false;
            }
        })
    })
    keyword.addEventListener('blur', function () {
        this.parentElement.parentElement.style.outline = 'none';
    })

    var form = document.getElementById('form');
    form.addEventListener('submit',function(){
        searchPlaces();
        return false;
    })

    //체크
    var list = document.querySelectorAll('.checklist > div');
    var checked_add = [];
    list.forEach(function(v,n,node){
        var a = v.querySelectorAll('a');
        a.forEach(function(val,num){
            val.addEventListener('click',function(){
                checked_add = [];
                if(num!==0){
                    if(val.dataset.chk === 'on'){
                        val.dataset.chk = 'off';
                        val.children.item(0).style.backgroundImage = 'none';
                    } else {
                        val.dataset.chk = 'on';
                        val.children.item(0).style.backgroundImage = 'url(css/img/tick.png)';
                    }
                    for(i=1;i<a.length;i++){
                        if(a[i].dataset.chk==='off'){
                            a[0].dataset.chk = 'off';
                            a[0].children.item(0).style.backgroundImage = 'none';
                            break;
                        }else{
                            a[0].dataset.chk = 'on';
                            a[0].children.item(0).style.backgroundImage = 'url(css/img/tick.png)';
                        }
                    }
                } else {
                    if(val.dataset.chk === 'on'){
                        for(i=0;i<a.length;i++){
                            a[i].dataset.chk = 'off'
                            a[i].children.item(0).style.backgroundImage = 'none';
                        }
                    }else{
                        for(i=0;i<a.length;i++){
                            a[i].dataset.chk = 'on'
                            a[i].children.item(0).style.backgroundImage = 'url(css/img/tick.png)';
                        }
                    }
                }
                for(i=1;i<a.length;i++){
                    if(a[i].dataset.chk==='on'){
                        checked_add.push(a[i].textContent);
                    }
                }
                searchPlaces();
            })
        })
        for(i=1;i<a.length;i++){
            if(a[i].dataset.chk==='on'){
                checked_add.push(a[i].textContent);
            }
        }
    })


    // 마커를 담을 배열입니다
    var markers = [];

    var mapContainer = document.getElementById('map'), // 지도를 표시할 div 
        mapOption = {
            center: new kakao.maps.LatLng(37.566826, 126.9786567), // 지도의 중심좌표
            level: 3 // 지도의 확대 레벨
        };

    // 지도를 생성합니다    
    var map = new kakao.maps.Map(mapContainer, mapOption);

    // 장소 검색 객체를 생성합니다
    var ps = new kakao.maps.services.Places();

    // 검색 결과 목록이나 마커를 클릭했을 때 장소명을 표출할 인포윈도우를 생성합니다
    var infowindow = new kakao.maps.InfoWindow({
        zIndex: 1
    });

    // 키워드로 장소를 검색합니다
    searchPlaces();

    // 키워드 검색을 요청하는 함수입니다
    function searchPlaces() {

        var keyword = document.getElementById('keyword').value;

        if (!keyword.replace(/^\s+|\s+$/g, '')) {
            alert('키워드를 입력해주세요!');
            return false;
        }

        // 장소검색 객체를 통해 키워드로 장소검색을 요청합니다
        ps.keywordSearch(keyword, placesSearchCB);
    }

    // 장소검색이 완료됐을 때 호출되는 콜백함수 입니다
    function placesSearchCB(data, status, pagination) {
        if (status === kakao.maps.services.Status.OK) {
            var newData = [];
            data.forEach(function(v,n,code){
                console.log(v);
                for(i=0;i<checked_add.length;i++){
                    if(v.address_name.match(checked_add[i])){
                        newData.push(v);
                        // 정상적으로 검색이 완료됐으면
                        // 검색 목록과 마커를 표출합니다
                    }
                }
                displayPlaces(newData);
            })

            // 페이지 번호를 표출합니다
            // displayPagination(pagination);

        } else if (status === kakao.maps.services.Status.ZERO_RESULT) {

            alert('검색 결과가 존재하지 않습니다.');
            return;

        } else if (status === kakao.maps.services.Status.ERROR) {

            alert('검색 결과 중 오류가 발생했습니다.');
            return;

        }
    }

    // 검색 결과 목록과 마커를 표출하는 함수입니다
    function displayPlaces(places) {

        // var listEl = document.getElementById('placesList'),
            menuEl = document.getElementById('menu_wrap'),
            fragment = document.createDocumentFragment(),
            bounds = new kakao.maps.LatLngBounds(),
            listStr = '';

        // 검색 결과 목록에 추가된 항목들을 제거합니다
        // removeAllChildNods(listEl);

        // 지도에 표시되고 있는 마커를 제거합니다
        removeMarker();

        for (var i = 0; i < places.length; i++) {

            // 마커를 생성하고 지도에 표시합니다
            var placePosition = new kakao.maps.LatLng(places[i].y, places[i].x),
                marker = addMarker(placePosition, i),
                itemEl = getListItem(i, places[i]); // 검색 결과 항목 Element를 생성합니다

            // 검색된 장소 위치를 기준으로 지도 범위를 재설정하기위해
            // LatLngBounds 객체에 좌표를 추가합니다
            bounds.extend(placePosition);

            // 마커와 검색결과 항목에 mouseover 했을때
            // 해당 장소에 인포윈도우에 장소명을 표시합니다
            // mouseout 했을 때는 인포윈도우를 닫습니다
            (function (marker, title) {
                kakao.maps.event.addListener(marker, 'mouseover', function () {
                    displayInfowindow(marker, title);
                });

                kakao.maps.event.addListener(marker, 'mouseout', function () {
                    infowindow.close();
                });

                itemEl.onmouseover = function () {
                    displayInfowindow(marker, title);
                };

                itemEl.onmouseout = function () {
                    infowindow.close();
                };
            })(marker, places[i].place_name);

            fragment.appendChild(itemEl);
        }

        // 검색결과 항목들을 검색결과 목록 Element에 추가합니다
        // listEl.appendChild(fragment);
        // menuEl.scrollTop = 0;

        // 검색된 장소 위치를 기준으로 지도 범위를 재설정합니다
        map.setBounds(bounds);
    }

    // 검색결과 항목을 Element로 반환하는 함수입니다
    function getListItem(index, places) {

        var el = document.createElement('li'),
            itemStr = "<span class=\"markerbg marker_" + (index + 1) + "\"></span>" +
            "<div class=\"info\">" +
            "   <h5>" + places.place_name + "</h5>";

        if (places.road_address_name) {
            itemStr += "    <span>" + places.road_address_name + "</span>" +
                "   <span class=\"jibun gray\">" + places.address_name + "</span>";
        } else {
            itemStr += "    <span>" + places.address_name + "</span>";
        }

        itemStr += "  <span class=\"tel\">" + places.phone + "</span>" +
            "</div>";

        el.innerHTML = itemStr;
        el.className = "item";

        return el;
    }

    // 마커를 생성하고 지도 위에 마커를 표시하는 함수입니다
    function addMarker(position, idx, title) {
        var imageSrc = '/css/img/pin_icon.png', // 마커 이미지 url, 스프라이트 이미지를 씁니다
            imageSize = new kakao.maps.Size(36, 36), // 마커 이미지의 크기
            imgOptions = {
                offset: new kakao.maps.Point(13, 37) // 마커 좌표에 일치시킬 이미지 내에서의 좌표
            },
            markerImage = new kakao.maps.MarkerImage(imageSrc, imageSize, imgOptions),
            marker = new kakao.maps.Marker({
                position: position, // 마커의 위치
                image: markerImage
            });

        marker.setMap(map); // 지도 위에 마커를 표출합니다
        markers.push(marker); // 배열에 생성된 마커를 추가합니다

        return marker;
    }

    // 지도 위에 표시되고 있는 마커를 모두 제거합니다
    function removeMarker() {
        for (var i = 0; i < markers.length; i++) {
            markers[i].setMap(null);
        }
        markers = [];
    }

    // // 검색결과 목록 하단에 페이지번호를 표시는 함수입니다
    // function displayPagination(pagination) {
    //     var paginationEl = document.getElementById('pagination'),
    //         fragment = document.createDocumentFragment(),
    //         i;

    //     // 기존에 추가된 페이지번호를 삭제합니다
    //     while (paginationEl.hasChildNodes()) {
    //         paginationEl.removeChild(paginationEl.lastChild);
    //     }

    //     for (i = 1; i <= pagination.last; i++) {
    //         var el = document.createElement('a');
    //         el.href = "#";
    //         el.innerHTML = i;

    //         if (i === pagination.current) {
    //             el.className = 'on';
    //         } else {
    //             el.onclick = (function (i) {
    //                 return function () {
    //                     pagination.gotoPage(i);
    //                 }
    //             })(i);
    //         }

    //         fragment.appendChild(el);
    //     }
    //     paginationEl.appendChild(fragment);
    // }

    // 검색결과 목록 또는 마커를 클릭했을 때 호출되는 함수입니다
    // 인포윈도우에 장소명을 표시합니다
    function displayInfowindow(marker, title) {
        var content = "<div style=\"padding:5px;z-index:1;\">" + title + "</div>";

        infowindow.setContent(content);
        infowindow.open(map, marker);
    }

    // 검색결과 목록의 자식 Element를 제거하는 함수입니다
    function removeAllChildNods(el) {
        while (el.hasChildNodes()) {
            el.removeChild(el.lastChild);
        }
    }
}