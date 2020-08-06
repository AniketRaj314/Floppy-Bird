let width, height, diameter, bird, gravity, time, factor, pipeWidth;
function setup() {
    width = innerWidth;
    height = innerHeight - 4;
    pipeWidth = 50;
    diameter = 30;
    gravity = 2;
    factor = 0.5;
    time = 0;
    createCanvas(width, height);
    bird = new Bird();
    pipe = [];
}

function draw() {
    if(time % 50 == 0) {
        pipe[pipe.length] = new Pipes();
    }
    background(0);
    bird.update();
    
    for(let i = 0; i < pipe.length; i++) {
        fill(0, 255, 0);
        if(bird.y < pipe[i].y + pipe[i].height / 2 || bird.y > pipe[i].y2 - pipe[i].height2 / 2) {
            if(bird.x > pipe[i].x - pipeWidth / 2 && bird.x < pipe[i].x + pipeWidth / 2) {
                fill(255, 0, 0);
            }
        }
        pipe[i].update();
        pipe[i].show();
        if(pipe[i].x + pipeWidth / 2 < 0) {
            pipe.splice(i, 1);
        }
    }
    bird.show();
    time += factor;
}

function mousePressed() {
    bird.speed = -20;
}

class Bird {
    constructor() {
        this.x = 100;
        this.y = height / 2;
        this.speed = 0;
    }

    show() {
        fill(255, 255, 0);
        ellipseMode(CENTER);
        ellipse(this.x, this.y, diameter, diameter);
    }

    update() {
        let distance = this.speed * factor + 0.5 * gravity * factor * factor;
        this.y += distance;
        this.speed = this.speed + gravity * factor;
        
        if(this.y - diameter / 2 <= 0) {
            this.y = diameter / 2;
        }

        if(this.y + diameter / 2 >= height) {
            this.y = height - diameter / 2;
        }
    }
}

class Pipes {
    constructor() {
        this.x = width - pipeWidth;
        this.y = this.generatePosition();
        this.y2 = (height + this.height + this.gap) / 2;
        this.height2 = height - (this.height + this.gap);
        console.log((height + this.height + this.gap) / 2 );
        this.xSpeed = 4;
    }

    generatePosition() {
        this.gap = floor(random(diameter + 100, height - 100));
        console.log(this.gap);
        this.height = floor(random(100, height - this.gap - 100));
        return(this.height / 2);
    }

    show() {
        rectMode(CENTER);
        rect(this.x, this.y, pipeWidth, this.height);
        rect(this.x, this.y2 , pipeWidth, this.height2);
    }

    update() {
        this.x -= this.xSpeed;
    }
}