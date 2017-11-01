// 定义蛇类
function Snake(){
	this.snakeArr = [
	{x:30,y:30},
	{x:30,y:31},
	{x:30,y:32},
	{x:30,y:33}
	];
	this.alive = true;
	this.forward = 39;

}
Snake.prototype = {
	constructor:Snake,
	//移动的方法
	move:function(){
		this.snakeArr.shift();
		if(this.forward ===37){
			this.snakeArr.push({
				x:this.snakeArr[this.snakeArr.length - 1].x,
				y:this.snakeArr[this.snakeArr.length - 1].y-1
			})
		}else if(this.forward ===38){
			this.snakeArr.push({
				x:this.snakeArr[this.snakeArr.length - 1].x-1,
				y:this.snakeArr[this.snakeArr.length - 1].y
			})
		}else if(this.forward ===39){
			this.snakeArr.push({
				x:this.snakeArr[this.snakeArr.length -1].x,
				y:this.snakeArr[this.snakeArr.length - 1].y+1
			})
		}else if(this.forward ===40){
			this.snakeArr.push({
				x:this.snakeArr[this.snakeArr.length -1].x+1,
				y:this.snakeArr[this.snakeArr.length - 1].y
			})
		}
	},
	//更改方向方法
	changeForward:function(forward){
		if(Math.abs(forward-this.forward)===2){
			return;
		}
		this.forward = forward;
	},
	//死亡的方法
	die:function(){
		this.alive = false;
	},
	// 增长的方法
	growUp:function(){
		this.snakeArr.unshift(this.snakeArr[0]);
	},
	//检测自己是否撞到自己的身体方法
	check:function(){
		var x = this.snakeArr[this.snakeArr.length - 1].x;
		var y = this.snakeArr[this.snakeArr.length - 1].y;
		for(var i = 0; i < this.snakeArr.length - 1; i ++){
			if(x === this.snakeArr[i].x && y === this.snakeArr[i].y){
				return true;
			}
		}
	}
}