class slide {
    constructor(view,margin,len){
        this.view=view;
        this.wrap=view.item(0);
        this.item=view.querySelectorAll('[class$=item]');
        this.item_l=item[0].getBoundingClientRect().width;
        this.margin=margin;
        this.len=len;
        this.running=false;
    }

    ready(){
        this.wrap.style.width=this.item_l*this.len + this.margin*(this.len-1)+'px';
        this.item.forEach(function(v,n){
            var item_c=document.importNode(v,true);
            wrap.appendChild(v);
            wrap.appendChild(item_c);
            wrap.prepend(item_c);
        });
    }
    run(){
        
    }
}