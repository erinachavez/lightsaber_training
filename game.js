// Global variables
var fontReg,cnv,bg,lChoice,userSide;
var reyL,reyR,lukeL,lukeR,vaderL,vaderR,kyloL,kyloR;
var yoda,r2d2,trooper,sith,moles,state,char,side;
var timeToOff,timeToOn,lastMil;
var points,misses;

function lightsaber(choice){ // Change cursor with lightsaber choice
	var lUrl = 'url(images/' + choice + '_l.png), auto';
	$('html,body,#l1,#l2,#l3,#l4,.button').css('cursor',lUrl);

	lChoice = choice;

	if (lChoice == 'luke' || lChoice == 'rey'){
		userSide = 'light';
	}
	else if (lChoice == 'vader' || lChoice == 'kylo'){
		userSide = 'dark';
	}
};

function showRules(){ // Show appropriate canvas once level is chosen
	$('#page1').html('');

	if (userSide == 'light'){
		$('#page2_light').css('display','block');
	}
	else if (userSide == 'dark'){
		$('#page2_dark').css('display','block');
	};

	return false;
};

function showCanvas(){ // Show appropriate canvas once level is chosen
	$('#page2_light').html('');
	$('#page2_dark').html('');
	$('#defaultCanvas0').css('display','block');
	return false;
};

function preload(){ // Preload images and font
	fontReg = loadFont('fonts/pixelmix.ttf');

	bg = loadImage('images/stars.jpg')

	reyL = loadImage('images/rey_l.png');
	lukeL = loadImage('images/luke_l.png');
	vaderL = loadImage('images/vader_l.png');
	kyloL = loadImage('images/kylo_l.png');

	reyR = loadImage('images/rey_r.png');
	lukeR = loadImage('images/luke_r.png');
	vaderR = loadImage('images/vader_r.png');
	kyloR = loadImage('images/kylo_r.png');

	yoda = loadImage('images/yoda.png');
	r2d2 = loadImage('images/r2d2.png');
	trooper = loadImage('images/stormtrooper.png');
	sith = loadImage('images/sith.png');
};

function setup(){ //Set up canvas and all initial items
	cnv = createCanvas(600,600);
	cnv.position(((windowWidth - width)/2), ((windowHeight - height)/2));

	noCursor();
	textFont(fontReg);

	moles = [];
	for (var i=0;i<9;i++){
		moles[i] = new Mole;
	};

	points = 0;
	misses = 0;
};

function draw(){
	imageMode(CENTER);
	image(bg,300,300);

	moles[0].display(117.5,117.5);
	moles[1].display(300  ,117.5);
	moles[2].display(482.5,117.5);
	moles[3].display(117.5,300  );
	moles[4].display(300  ,300  );
	moles[5].display(482.5,300  );
	moles[6].display(117.5,482.5);
	moles[7].display(300  ,482.5);
	moles[8].display(482.5,482.5);

	for (var i=0;i<9;i++){
		moles[i].update();
	};

	strokeWeight(5);
	stroke(255,215,0);
	noFill();

	//Row 1
	ellipse(117.5,117.5,125,125);
	ellipse(300  ,117.5,125,125);
	ellipse(482.5,117.5,125,125);

	//Row 2
	ellipse(117.5,300,125,125);
	ellipse(300  ,300,125,125);
	ellipse(482.5,300,125,125);
	
	//Row 3
	ellipse(117.5,482.5,125,125);
	ellipse(300  ,482.5,125,125);
	ellipse(482.5,482.5,125,125);

	fill(255,215,0);
	noStroke();

	// Cursor
	imageMode(CORNER);
	if (mouseIsPressed){
		if (lChoice == 'rey'){
			image(reyR, mouseX, mouseY);
		}
		else if (lChoice == 'luke'){
			image(lukeR, mouseX, mouseY);
		}
		else if (lChoice == 'vader'){
			image(vaderR, mouseX, mouseY);
		}
		else if (lChoice == 'kylo'){
			image(kyloR, mouseX, mouseY);
		};
	}
	else{
		if (lChoice == 'rey'){
			image(reyL, mouseX, mouseY);
		}
		else if (lChoice == 'luke'){
			image(lukeL, mouseX, mouseY);
		}
		else if (lChoice == 'vader'){
			image(vaderL, mouseX, mouseY);
		}
		else if (lChoice == 'kylo'){
			image(kyloL, mouseX, mouseY);
		};
	};

	text('Points: '+points,10,15);
	text('Misses: '+misses,10,35);
};

function windowResized(){ // Keep canvas centered
	cnv.position(((windowWidth - width)/2), ((windowHeight - height)/2));
};

class Mole{
	constructor(){
		//Choose a character
		this.char = random(0,4);
		if (this.char < 1){
			this.char = yoda;
			this.side = 'light';
		}
		else if (1 <= this.char && this.char < 2){
			this.char = r2d2;
			this.side = 'light';
		}
		else if (2 <= this.char && this.char < 3){
			this.char = sith;
			this.side = 'dark';
		}
		else if (3 <= this.char && this.char < 4){
			this.char = trooper;
			this.side = 'dark';
		};

		//Choose a state
		var dice = random(0,2);
		if (dice < 1){
			this.state = true;
		}
		else if (1 <= state && state < 2){
			this.state = false;
		};

		//Choose a time to on and off
		this.timeToOff = random(1000,5000);
		this.timeToOn = random(1000,5000);

		this.lastMil = millis();
	}
	display(posX,posY){
		//Display with character if state true
		if (this.state){
			image(this.char,posX,posY);
		};

		if (userSide != this.side && mouseIsPressed && dist(posX,posY,mouseX,mouseY) < 65){
			if (this.state){
				this.state = false;
				points += 1;
			}
		}
		else if (userSide == this.side && mouseIsPressed && dist(posX,posY,mouseX,mouseY) < 65){
			if (this.state){
				this.state = false;
				misses += 1;
			}
		}
	}
	update(){
		if (this.state) {
			this.timeToOff -= (millis() - this.lastMil);
		}
		else{
			this.timeToOn -= (millis() - this.lastMil);
		};

		this.lastMil = millis();

		// Debugging
		// text(this.state, 50, 50);
		// text(this.timeToOff, 100, 50);
		// text(this.timeToOn, 250, 50);
		
		if (this.timeToOff < 0){
			this.timeToOff = int(random(1000,5000));
			this.state = false;
		};
		if (this.timeToOn < 0){
			this.timeToOn = int(random(1000,5000));
			this.state = true;

			this.char = random(0,4);
			if (this.char < 1){
				this.char = yoda;
				this.side = 'light';
			}
			else if (1 <= this.char && this.char < 2){
				this.char = r2d2;
				this.side = 'light';
			}
			else if (2 <= this.char && this.char < 3){
				this.char = sith;
				this.side = 'dark';
			}
			else if (3 <= this.char && this.char < 4){
				this.char = trooper;
				this.side = 'dark';
			};
		};
	}
}
