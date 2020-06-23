class Cart{
    constructor(){
        this.cartData = localStorage.getItem("cartData") 
        ? JSON.parse(localStorage.getItem("cartData")) : 
        {};
    }
    //第一步，存数据
    saveData(id,num,terminal){
        if(!this.cartData[id] || terminal){
            this.cartData[id] = num;
        }else{
            this.cartData[id] += num;
        }
      localStorage.setItem("cartData",JSON.stringify(this.cartData));    
    } 
    //展示信息
    showList(domobj){
        this.domobj = domobj;
        let shu = JSON.parse(localStorage.getItem("shu"));
        console.log(shu);   
        let cartData = JSON.parse(localStorage.getItem("cartData"));
        let str = "";   
        for(var id in shu){      
        for(let i in cartData){ 
            if(i == shu[id].pid) {   
            str+=` <li data-id="${shu[id].pid}">
            <input type="checkbox" class="ck"/>
            <img src="${shu[id].pimg}"/>
            <span>${shu[id].pname}</span>
            <span class="price">${shu[id].pprice}</span>
            <span class="minus">-</span>
            <input type="text" class="num" value="${cartData[i]}">
            <span class="plus">+</span>
            <span class="perPrices">${shu[id].pprice * cartData[i]}</span>
            <span class="del">删除</span>
        </li>`;
            }
        }
     }
        this.domobj.innerHTML = str;
        // console.log(this.domobj.innerHTML);
    }
    //全部选中
    checkAll(id){
        let oCheckAll = document.getElementById(id);
        //获取到checkbox复选框
        let aCks = document.querySelectorAll(".ck");
        //每次点击时
        oCheckAll.onclick = () =>{
            //遍历
            for(var i = 0;i<aCks.length;i++){
                //遍历循环每一个默认选中
                aCks[i].checked = oCheckAll.checked;
            }
            this.getTotalPrice("totalPrice");
        };
        //遍历checkbox复选框
        for(let i = 0;i<aCks.length;i++){
            //每次点击的时候
            aCks[i].onclick = () =>{
                //定义一个count计数
                var count = 0;
                 //遍历
                for(let j = 0;j<aCks.length;j++){
                    //如果选中，则计数加1
                    if(aCks.checked){
                        count++;
                    }              
                }
                //如果count等于复选框的选中数量时，checkAll默认选中
                if(count == aCks.length){
                    oCkeckAll.checked = true;
                }else{
               //如果不等，checkAll不选中
                    aCks.checked = false;
                }
                this.getTotalPrice("totalPrice");
            };
        }
    }
    updateData(){
        let _this = this;
        this.aMinus = document.querySelectorAll(".minus");
        this.aPlus = document.querySelectorAll(".plus");
        this.aNums = document.querySelectorAll(".num");
        this.aPrice = document.querySelectorAll(".price");
        this.aPerPrice = document.querySelectorAll(".perPrices");
        this.aCks = document.querySelectorAll(".ck");
       //减
        for(let i=0;i<this.aMinus.length;i++){
            this.aMinus[i].onclick = () => {
            //获取到自定义data-id;
           let id = this.aMinus[i].parentNode.getAttribute("data-id");
        //    console.log(id);
        //如果input框的值小于1，则设置为1，return结束
           if(this.aNums[i].value <= 1){
               this.aNums[i].value =1;
           }
           //否则input的value每次减一
           this.aNums[i].value--;
           //调用保存方法，获取到
           this.saveData(id,Number(this.aNums[i]),true);
           getPerPrice(i);
           this.getTotalPrice("totalPrice");
       };
       //加
       this.aPlus[i].onclick = () => {
            //获取到自定义data-id;
           let id = this.aPlus[i].parentNode.getAttribute("data-id");
           //点击+时候input的值++
           this.aNums[i].value++;
           //传入参数
           this.saveData(id,Number(this.aNums[i].value),true);
           getPerPrice(i);
           this.getTotalPrice("totalPrice");
       }
       //改
       this.aNums[i].onchange = () => {
        let id = this.aNums[i].parentNode.getAttribute("data-id");
        if(this.aNums[i].value <= 1){
            this.aNums[i].value = 1;
        }
        this.saveData(id,Number(this.aNums[i].value),true);
        getPerPrice(i);
        this.getTotalPrice("totalPrice");
       };
  }
  //计算总价
  function getPerPrice(i) {
    _this.aPerPrice[i].innerText = _this.aNums[i].value * _this.aPrice[i].innerText;
  }
 }
    getTotalPrice(id){
        let oTotalPrice = document.getElementById(id);
        //总价设为0
        let totalPrice = 0;
        //循环遍历checkbox,
        for(let j = 0;j<this.aCks.length;j++){
            //如果选中
            if(this.aCks[j].checked){
                //总价等于每一个的总价和
                totalPrice += Number(this.aPerPrice[j].innerText);
            }
        }
        //把他赋值给 oTotalPrice
        oTotalPrice.innerText = totalPrice;
    }
    removeData(){
        let aDelbtns = document.querySelectorAll(".del");
        
        //遍历
  for(let i=0;i<aDelbtns.length;i++){
            aDelbtns[i].onclick = () => {
            //拿到他的父元素自定义data-id
              let id = aDelbtns[i].parentNode.getAttribute("data-id");
            //删除domobj的孩子（aDelbtns[i].parentNode）
            this.domobj.removeChild(aDelbtns[i].parentNode);
            //删除掉cardata
            delete this.cartData[id];
            //存入删除除掉后的数据
            localStorage.setItem("cartData", JSON.stringify(this.cartData));            
            //checkAll不被选中
            this.aCks[i].checked = false;
            //调用计算总价的getTotalPrice方法
            this.getTotalPrice("totalPrice");
        }
      }
    }
}