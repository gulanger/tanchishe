//定义障碍类
function ZhangAi(length,max){
	//lenght表示障碍的数量，max表示障碍的最大取值范围
	this.arr = [];
	this.arr.length = length;
	this.max = max;
	this.init();
}
ZhangAi.prototype = {
	constructor:ZhangAi,
	//随机创建障碍方法
	init:function(){
		for(var i = 0; i < this.arr.length; i ++){
			var obj = {};
			obj.x = parseInt(Math.random()*this.max);
			obj.y = parseInt(Math.random()*this.max);
			for(var j = 0; j < i; j ++){
				if(obj.x === this.arr[j].x && obj.y === this.arr[j].y){
					obj.x = parseInt(Math.random()*this.max);
					obj.y = parseInt(Math.random()*this.max);
					j = 0;
					continue;
				}
			}
			this.arr[i] = obj;
		}
	}
}