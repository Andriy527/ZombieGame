let canvas = document.getElementById("canvas");
let ctx = canvas.getContext("2d");
canvas.height = 1024;
canvas.width = 1024;
let persheight = 296;
let perswidth = 838;
let x = 300;
let y = 300;
let srcX;
let srcY;
let sheetWidth = 90;
let sheetHeight = 128;
let cols = 1;
let raws = 1;
let width = sheetWidth / cols;
let height = sheetHeight / raws;
let current = 0;
let bulletx = -11400;
let bullety = -100;
let zombiesrcx;
let zombiesrcy;
let zombieWidth = 365;
let zombieHeigh =121;
let zombiecols = 4;
let zombieraws = 1;
let zwidth = zombieWidth / zombiecols;
let zheight = zombieHeigh / zombieraws;
let zombiecurrent = 0;
let zy = 310;
let zx = 900;
let background = new Image();
let zombie1 = new Image();
let zombie2 = new Image();
let person = new Image();
let bullet = new Image();
let score = 0;
background.src="images/create-vector-2d-game-background-for-your-game.jfif";
person.src="images/mov.png";
bullet.src="images/kisspng-cartridge-bullet-download-bullet-element-5a6ba467c09ef0.142065271517003879789.png";
zombie1.src = "images/zombiemove.png";
document.addEventListener("keydown",move);
document.addEventListener("keyup",stop);

function move(e)
{
    const keyname = e.key;

    if(keyname == "d" && x <970)
    {
        person.src="images/mov.png";
        sheetHeight = 270;
        cols = 3;
        x+=9;
    }

    if(keyname == "a" && x>0)
    {
        person.src="images/move2.png";
        sheetHeight = 270;
        cols = 3;
        x-=9;
    }
    if(keyname == "k" && sheetHeight != 91)
    {
        sheetHeight = 95;
        person.src="images/fire.png";
        bulletx = x + 40;
        bullety = y + 54;
    }
    if(keyname == "k" && sheetHeight == 91)
    {

        sheetHeight = 95;
        person.src="images/fire2.png";
    }
}
function stop(e)
{
    const key = e.key;
    if(key == "d")
    {
        sheetHeight = 90;
        cols = 1;
    }
    if(key == "a")
    {
        sheetHeight = 91;
        cols = 1;
    }
    if(key == "k")
    {
        setTimeout(function ()
        {
            sheetHeight = 90;
            person.src="images/mov.png";
            bulletx+=4;
        },200);
    }
}
function update()
{
    zombiecurrent = ++zombiecurrent % zombiecols;
    zombiesrcx = zombiecurrent * (zombieWidth/3.7);
    zombiesrcy = 0;
    current = ++current % cols;
    srcX = current * width;
    srcY = 0;
}
function draw()
{
    update();

    ctx.drawImage(background,0,0);
    ctx.drawImage(person,srcX,srcY,width,height,x,y,width,height);
    ctx.drawImage(bullet,bulletx+=30,bullety,30,30);
    ctx.drawImage(zombie1,zombiesrcx,zombiesrcy,zwidth,zheight,zx,zy,zwidth,zheight);
    ctx.font = 'bold 28px serif';
    ctx.strokeText('Рахунок:'+ " " + score, 50, 100);
    zx-=5;
    let math = (bulletx - zx) / (bulletx + zx);
    let math2 = (zx - x)/(zx + x);

if(math <= 0.01 && math >= -0.01)
{
    bulletx = -11400;
    bullety = -100;
    zx = 1000;
    zx-=5;
    score+=10;
}
if(math2 <= 0.008 && math2 >= -0.008)
{
    setTimeout(function ()
    {
        person.src = "images/death.png";
        y=350;
        width = 250;
        sheetHeight = 250;
        score = 0;

    },10)
}
}
setInterval(function()
{
    draw()
},100);
