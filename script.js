window.onload = function(){

    var context;
    var canvasWidth = 900;
    var canvasHeight = 600;
    var blockSize =30;
    var delay = 500;
    var snackColor="#ff0000";
    var appleColor="#33cc33";
    var snakee;
    var applee;

    init();

    function init(){
        var canvas = document.createElement('canvas');
        canvas.width = 900;
        canvas.height = 600;
        canvas.style.border = "1px solid";
        document.body.appendChild(canvas);

        context = canvas.getContext("2d");

        snakee = new snake([[6,4], [5,4],[4,4]],"right");
        applee = new Apple([10,10]);

        refreshCanvas();
        
    }

    function refreshCanvas(){
        context.clearRect(0, 0, canvasWidth, canvasHeight);
        snakee.draw();
        snakee.advance();
        applee.draw();
        setTimeout(refreshCanvas,delay);
    }

    function drawBlock(context,position){
        var x = position[0]*blockSize; //pour avoir la position en pixel 
        var y = position[1]*blockSize;

        context.fillRect(x,y, blockSize,blockSize);//cette methode permet de remplir ou creer un carré
    }

    function snake(body,direction){

        this.body =body;
        this.direction = direction;

        this.draw = function(){
            context.save();
            context.fillStyle=snackColor;

            for(var i = 0; i<this.body.length;i++){
                drawBlock(context,this.body[i]);
            };

            context.restore();
        };

        this.advance = function(){
            var nextPosition = this.body[0].slice();
            switch(this.direction){
                case "left":
                    nextPosition[0] -=1;
                    break;

                case "right":
                    nextPosition[0] +=1;
                    break;

                case "bottom":
                    nextPosition[1] +=1;
                    break;

                case "top":
                    nextPosition[1] -=1;
                    break;
                default:
                    throw("direction invalide");

            }
            this.body.unshift(nextPosition);
            this.body.pop();
        };

        this.setDirection= function(newDirection){
            var allowedDirection;
            switch(this.direction){
                case "bottom":
                    allowedDirection=["left","right"];
                    break;
                case "top":
                    allowedDirection=["left","right"];
                    break;
                case "left":
                    allowedDirection=["top","bottom"];
                    break;
                case "right":
                    allowedDirection=["top","bottom"];
                    break;

                    default:
                        throw("direction invalide");
            }

            if(allowedDirection.indexOf(newDirection)>-1){
                this.direction = newDirection
            }
        };

        
    }

    function Apple(position){
        this.position = position;
        this.draw = function(){
            context.save();
            context.fillStyle = appleColor;
            context.beginPath();
            
            var radius =blockSize/2;
            var x = position[0]*blockSize+radius;
            var y = position[1]*blockSize+radius;

            context.arc(x,y,radius,0,Math.PI*2,true);
            context.fill();
            context.restore();
        }
    }

    document.onkeydown =function handleKeyDown(e){
        var key = e.keyCode;
        var newDirection;
        console.log(key);
        switch(key){
            case 37:
                newDirection = "left";
                break;
            case 38:
                newDirection = "top";
                break;
            case 39:
                newDirection = "right";
                break;
            case 40:
                newDirection = "bottom";
                break;

                default:
                    return;
        }
        console.log(newDirection);
        snakee.setDirection(newDirection);
    }


};