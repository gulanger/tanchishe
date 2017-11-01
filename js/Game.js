//定义Game类相关信息
function Game(){
	this.dom = document.createElement("div");
	this.row = 60;
	this.col = 60;
	this.arr = [];
	this.snake = null;
	this.Food = null;
	this.zhangai = null;
	this.timer = null;
	this.scores = 0;
	this.init();
}
Game.prototype= {
	constructor : Game,
	//组建dom地图的方法
	fillDom:function(){
		this.dom.className = "map";
		for(var i = 0; i <this.row; i ++){
			var row = document.createElement("div");
			var arr = [];
			row.className = "row";
			for(var j = 0; j < this.col; j ++){
				var block = document.createElement("div");
				arr.push(block);
				block.className = "block";
				row.appendChild(block);
			}
			this.dom.appendChild(row);
			this.arr.push(arr);
		}
	},
	//DOM地图上树的方法
	upTree:function(){
		document.body.appendChild(this.dom);
	},
	//创造蛇的方法
	createSnake:function(){
		this.snake = new Snake();
	},
	//创造障碍的方法
	createZhangAi:function(){
		this.zhangai = new ZhangAi(20,60);
	},
	//创造食物的方法
	createFood:function(){
		var x = 0;
		var y = 0;
		x = parseInt(Math.random()*this.row);
		y = parseInt(Math.random()*this.col);
		var arr = this.snake.snakeArr.concat(this.zhangai.arr);
		for(var i = 0; i <arr.length; i ++){
			if(x === arr[i].x && y === arr[i].y){
				x = parseInt(Math.random()*this.row);
				y = parseInt(Math.random()*this.col);
				i = 0;
				continue;
			}
		}
		this.food = new Food(x,y);
	},
	//渲染蛇的方法的方法
	renderSnake:function(){
		if(!this.snake.alive){
			return;
		}
		for(var i = 0; i < this.snake.snakeArr.length; i ++){
			this.arr[this.snake.snakeArr[i].x][this.snake.snakeArr[i].y].style.backgroundColor = "green";
			this.arr[this.snake.snakeArr[i].x][this.snake.snakeArr[i].y].style.borderRadius = "0";

		}
	},
	//渲染食物的方法
	renderFood:function(){
		this.arr[this.food.x][this.food.y].style.backgroundColor = "red";
		this.arr[this.food.x][this.food.y].style.borderRadius = "50%";
	},
	//渲染障碍的方法
	renderZhangAi:function(){
		for(var i = 0; i < this.zhangai.arr.length; i ++){
			this.arr[this.zhangai.arr[i].x][this.zhangai.arr[i].y].style.backgroundColor = "gray";
		}
	},
	//添加鼠标键盘事件的方法，使用键盘控制蛇的方向
	bindEvent:function(){
		var me = this;
		document.onkeydown = function(e){
			if(e.keyCode === 37 || e.keyCode ===38 ||e.keyCode === 39 || e.keyCode === 40){
				me.snake.changeForward(e.keyCode);
			}
		}
	},
	//检测蛇是否吃到食物的方法
	checkEat:function(){
		if(this.snake.snakeArr[this.snake.snakeArr.length - 1].x === this.food.x && this.snake.snakeArr[this.snake.snakeArr.length - 1].y === this.food.y){
			this.createFood();
			this.snake.growUp();
			this.scores++;
			console.log(this.scores)
		}
	},
	//检测蛇是否撞到墙上的方法
	check:function(){
		var snake_head = this.snake.snakeArr[this.snake.snakeArr.length - 1];
		if(snake_head.x > this.row - 1 || snake_head.y >this.col - 1 || snake_head.x < 0 || snake_head.y < 0){
			this.snake.die();
			this.end();
			alert("游戏结束");
		}
	},
	//检测蛇是否撞到障碍上的方法
	checkZhangAi:function(){
		var head = this.snake.snakeArr.slice(-1)[0];
		for(var i = 0; i <this.zhangai.arr.length; i ++){
			if(head.x === this.zhangai.arr[i].x && head.y === this.zhangai.arr[i].y){
				this.snake.die();
				this.end();
				alert("游戏结束");
			}
		}
	},
	//清屏的方法
	clear:function(){
		if(!this.snake.alive){
			return;
		}
		for(var i = 0; i < this.arr.length; i ++){
			for(var j = 0; j < this.arr[i].length; j ++){
				this.arr[i][j].style = "";
			}
		}

	},
	//开始的方法并执行主循环
	start:function(){
		var me = this;
		this.timer = setInterval(function(){
			me.snake.move();
			if(me.snake.check()){
				me.end();
				alert("游戏结束");
				return;
			}
			me.check();
			me.checkEat();
			me.checkZhangAi();
			me.clear();
			me.renderFood();
			me.renderSnake();
			me.renderZhangAi();
		},100)
	},
	//停止游戏的方法
	end:function(){
		clearInterval(this.timer);
	},
	//初始化的方法
	init:function(){
		this.createSnake();
		this.createZhangAi();
		this.createFood();
		this.fillDom();
		this.upTree();
		this.bindEvent();
		this.start();
	}
}
