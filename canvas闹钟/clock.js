/**
 * Created by thm on 2017/2/12.
 *
 */
//自定义构造函数

function DrawClock(ctx,bigX,bigY,bigRadius,length){
    this.ctx=ctx;
    this.bigX=bigX;
    this.bigY=bigY;
    this.length=length;
    this.beginRadius=-Math.PI/2;
    this.bigRadius=bigRadius;
    this.init();
}
DrawClock.prototype={
    constructor:DrawClock,
    //初始化画布内容
    init:function(){
        //开启定时器
        var self=this;
            function drawAll(){
                self.ctx.clearRect(0,0,cvs.width,cvs.height);
                //画大圆
                self.drawBigCircle();
                self.radius();
                //画刻度
                self.drawMark();
                //写文字
                self.drawTime();
                //画所有指针
                self.drawAllPointers();
            }
        drawAll();
        var timer=setInterval(drawAll,1000);
    },
    //画大圆
    drawBigCircle:function () {
        var ctx=this.ctx;
        ctx.save();
        ctx.beginPath();
        ctx.strokeStyle="lightgreen";
        ctx.lineWidth=10;
        ctx.arc(this.bigX,this.bigY,this.bigRadius,0,2*Math.PI);
        ctx.stroke();
        ctx.restore();
    },
    //计算弧度
    radius:function(){
        var diffRadius=2*Math.PI/60;
        this.storeRadius=[];
        for(var i=0;i<60;i++){
            this.storeRadius.push(this.beginRadius+i*diffRadius);
        }

    },
    //画刻度
    drawMark:function(){
        var ctx=this.ctx;
        ctx.save();
       for(var i=0;i<60;i++){
           ctx.beginPath();
           var length;
           if(i%5==0){
               length =this.length;
               ctx.lineWidth=5;
           }else {
               length =this.length/2.5;
               ctx.lineWidth=2;
           }

           ctx.strokeStyle="black";
           var startX=this.bigX+(this.bigRadius-5)*Math.cos(this.storeRadius[i]);
           var startY=this.bigY+(this.bigRadius-5)*Math.sin(this.storeRadius[i]);
           var endX=this.bigX+(this.bigRadius-5-length)*Math.cos(this.storeRadius[i]);
           var endY=this.bigY+(this.bigRadius-5-length)*Math.sin(this.storeRadius[i]);
           ctx.moveTo(startX,startY);
           ctx.lineTo(endX,endY);
           ctx.stroke();
       }
        ctx.restore();
    },
    //写刻度盘文字
    drawTime:function(){
        var ctx=this.ctx;
        ctx.save();
        for(var i=0;i<12;i++){
            ctx.beginPath();
            ctx.strokeStyle="black";
            var endX=this.bigX+(this.bigRadius-15-this.length)*Math.cos(this.storeRadius[i*5]);
            var endY=this.bigY+(this.bigRadius-15-this.length)*Math.sin(this.storeRadius[i*5]);
            ctx.font="16px  黑体";
            ctx.fontStyle="oblique";
            ctx.textAlign="center";
            ctx.textBaseline="middle";
            ctx.fillText(i||12,endX,endY);
        }
        ctx.restore();
    },
    //画单个指针
    drawSinglePointer:function(color,width,ratio,radius){
        var ctx=this.ctx;
        var self=this;
        var endX=self.bigX+(self.bigRadius*ratio)*Math.cos(radius);
        var endY=self.bigY+(self.bigRadius*ratio)*Math.sin(radius);
        ctx.save();
        ctx.beginPath();
        ctx.lineCap="round";
        ctx.strokeStyle=color;
        ctx.lineWidth=width;
        ctx.moveTo(self.bigX,self.bigY);
        ctx.lineTo(endX,endY);
        ctx.stroke();
        ctx.restore();
    },
    drawAllPointers:function(){
        var date=new Date();
        var hours=date.getHours();
        var minutes=date.getMinutes();
        var seconds=date.getSeconds();
        var h=hours%12;
        this.drawSinglePointer("black",6,0.53,this.storeRadius[h*5]);
        this.drawSinglePointer("green",4,0.7,this.storeRadius[minutes]);
        this.drawSinglePointer("red",2,0.85,this.storeRadius[seconds]);
    }

};