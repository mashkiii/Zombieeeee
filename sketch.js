//Crear variables de alcance global
var fondo, fondoImg;
var zombie, zombieWalking, zombieStand; 
var ground; 
var lapida, lapidaImg, lapidasG; 
var score = 0;
var finalScore;

function preload(){
    //Precargar imágenes para establecer a sprites
    fondoImg = loadImage("./assets/fondo1.png");
    //loadAnimation carga múltiples imágenes para crear una animación
    zombieWalking = loadAnimation("./assets/z1.png","./assets/z2.png","./assets/z3.png","./assets/z4.png","./assets/z5.png","./assets/z6.png",
    "./assets/z7.png","./assets/z8.png","./assets/z9.png","./assets/z10.png","./assets/z11.png","./assets/z12.png",);
    zombieStand = loadAnimation("./assets/z1.png");
    lapidaImg = loadImage("./assets/lapida.png");
}

function setup(){
    //Establecer los elementos que se crean una sola vez en el juego
    createCanvas(1200,600);

    fondo=createSprite(400,300);
    fondo.addImage("cementerio",fondoImg);
    fondo.velocityX=-0.5;

    ground= createSprite(200,600,200,10);
    ground.visible=false;

    zombie=createSprite(200,500,20,50);
    zombie.addAnimation("walk",zombieWalking);
    zombie.addAnimation("stand",zombieStand);
    zombie.scale=0.4;
    zombie.debug=false;
    zombie.setCollider("rectangle",0,0,300,550);

    lapidasG=new Group();
}

function draw(){
    background(0);
    drawSprites();

    //Añadir texto a canvas para visualizar la puntuación
    textSize(40);
    fill("green");
    text("Score: "+ score, 900,50);
    //Incrementamos la puntuación en función del número de cuadros (frameRate) que crea draw
    score = score + Math.round(getFrameRate()/60);

    if (fondo.x < -300){
        fondo.x = 600;
    }

    if (keyDown("space") && zombie.y > 400){
        zombie.velocityY = -15;
    }

    zombie.velocityY += 0.5;
    zombie.collide(ground);
    
    lapidas();

    if (lapidasG.isTouching(zombie)){
        fondo.velocityX = 0;
        lapidasG.setVelocityXEach(0);
        lapidasG.setLifetimeEach(-1);
        zombie.changeAnimation("stand", zombieStand)
        score = 0;
        gameOver();
    }
    
}

function lapidas(){
    //función definida para crear obstáculos
    if (frameCount % 150 === 0){
        lapida=createSprite(1200,550,20,40);
        //Ajusta la velocidad para que los obstáculos sean más rápidos conforme avanza
        lapida.velocityX = -(6 + 3*score/100);
        lapida.addImage(lapidaImg);
        lapida.scale = 0.3;
        lapida.lifetime = 240;
        lapida.debug = false;
        lapida.setCollider("circle",0,-50,110);
        lapidasG.add(lapida);   
    }
}

function gameOver() {
    //función definida para terminar y reiniciar juego usando SweetAlert(alerta pop-up)
    swal(
      {
        title: `Game Over!`,
        text: `Amazing! Try again!`,
        imageUrl:
          "https://genesistoxical.com/wp-content/uploads/2021/08/Calavera_pixel_art_png.png",
        imageSize: "150x150",
        confirmButtonText: "Play"
      },
      function(isConfirm) {
        if (isConfirm) {
          location.reload();
        }
      }
    );
  }
  