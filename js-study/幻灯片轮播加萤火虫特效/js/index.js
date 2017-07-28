/**
 * Created by Administrator on 2016/8/25.
 */
window.onload=function () {
    var oBox      =$('box'),
        iNum      =35,
        iWindowWidth=document.documentElement.clientWidth,
        iWindowHeight=document.documentElement.clientHeight,
        iImgW     =20,
        iImgH     =20,
        oFlashList=$('flash-list'),
        oFlashBtn =$('flash-btn'),
        oImg      =byTagName(oFlashList,'img'),
        oDirectionBtn=$('direction-btn'),
        oLeftBtn  =$('left-btn'),
        oRightBtn =$('right-btn'),
    //console.log(oImg);
        aBtnImg   =byTagName(oFlashBtn,'img'),
        iCurIndex =0,
        oTimer    =null;
    //创建一个萤火虫
    for(var i=0;i<iNum;i++){
        var oCreateImg=document.createElement('img');
            oCreateImg.src='img/1.jpg';
            oCreateImg.className='firefly';
        document.body.appendChild(oCreateImg);
        //初始化萤火虫位置
        var oCreateImgW=Math.round(Math.random()*(iWindowWidth- iImgW));
        var oCreateImgH=Math.round(Math.random()*(iWindowHeight-iImgH));
        oCreateImg.style.left=oCreateImgW+'px';
        oCreateImg.style.top=oCreateImgH+'px';
        //随机生成目标的移动位置点
        var oTargetImgW=Math.round(Math.random()*(iWindowWidth- iImgW));
        var oTargetImgH=Math.round(Math.random()*(iWindowHeight-iImgH));
        function move1(oCreateImg,oTargetImgW,oTargetImgH) {
            timeMove(oCreateImg,{left:oTargetImgW,top:oTargetImgH},Tween.Expo.easeInOut,10000,function(){
             var   oTargetImgW=Math.round(Math.random()*(iWindowWidth- iImgW));
              var  oTargetImgH=Math.round(Math.random()*(iWindowHeight-iImgH));
                move1(oCreateImg,oTargetImgW,oTargetImgH);
            })
        }
        move1(oCreateImg,oTargetImgW,oTargetImgH);
    }
//给box添加onmouseenter事件
    oBox.onmouseenter=function(){
        setStyle(oDirectionBtn,{display:'block'})
        clearInterval(oTimer)
    };
    oBox.onmouseleave=function(){
        setStyle(oDirectionBtn,{display:'none'})
        autoMove();
    }
    //点击
    oLeftBtn.onclick=function () {
        iCurIndex--;
        if(iCurIndex<0){
            iCurIndex=oImg.length-1;
        }
        move(iCurIndex);
    };
    //右侧点击
    oRightBtn.onclick=function () {
       iCurIndex++;
        if(iCurIndex>oImg.length-1){
            iCurIndex=0;
        }
        move(iCurIndex);
    }

    //给每一个图片添加一个点击事件
    for(var i=0;i<aBtnImg.length;i++){
        aBtnImg[i].index=i;
        aBtnImg[i].onclick=function () {

            iCurIndex=this.index;
           bufferMove(aBtnImg[iCurIndex],{bottom:30},function () {
               bufferMove(aBtnImg[iCurIndex],{bottom:10})
           });
            move(iCurIndex)
        }
    }
    //每一个图片做动画的过程
    function move(iIndex) {
        //让每一个li都隐藏
        for(var i=0;i<oImg.length;i++){
            (function (obj) {
                timeMove(obj,{opacity:0},Tween.Linear,100,function(){
                    setStyle(obj,{display:'none'})
                })
            })(oImg[i]);
            aBtnImg[i].className='';
            oImg[i].className='';
            timeMove(aBtnImg[i],{bottom:10},Tween.Linear, 100);
        }

        //显示当前的li
        setStyle(oImg[iIndex], {display: 'block'});//iIndex 只是一个形参
        timeMove(oImg[iIndex], {opacity:100}, Tween.Linear, 100);
        aBtnImg[iIndex].className='active';
        oImg[iIndex].className='active';
        timeMove(aBtnImg[iIndex],{bottom:30},Tween.Linear, 100);
    }
    //先默认向右运动
    function rightMove(){
        iCurIndex++;
        //右侧临界点判断该
        if(iCurIndex>oImg.length-1){
            iCurIndex=0;
        }
        move(iCurIndex);
    }
//自动运行
   function autoMove() {
        oTimer=setInterval(function () {
          rightMove();
       },3000)
   }
   autoMove();
    function byTagName(obj, tagName) {
        return obj.getElementsByTagName(tagName);
    }
    function $(id) {
        return document.getElementById(id);
    }

    function setStyle(obj,oTarget){
        for(sAttr in oTarget){
            obj.style[sAttr]=oTarget[sAttr];
        }
    }
}