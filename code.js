var self = this;
stage.enableMouseOver();

// =+=+=+=+=+=+=+=+=+=+=+
// Notes
// =+=+=+=+=+=+=+=+=+=+=+

// display game board with fade in
// exit btn when pause

// ====================================
// Create Objects and Define Positions
// ====================================

// create background and define position
var Background = new lib.Background();
stage.addChild(Background)
Background.x = 0;
Background.y = 0;

// sounds
flySound = createjs.Sound.play('planeFlySound', {loop: -1});
flySound.stop();
ohNoSound = createjs.Sound.play('ohNoSound');
ohNoSound.stop();
goodJobSound = createjs.Sound.play('goodJobSound');
goodJobSound.stop();
gameOverSound = createjs.Sound.play('gameOverSound');
gameOverSound.stop();
backgroundSound = createjs.Sound.play('backgroundMusic', {loop: -1});
backgroundSound.stop();

// create plane and define position
var Plane = new lib.Plane();
stage.addChild(Plane);
Plane.x = 1280;
Plane.y = 200;

//add plane text
var planeText = new createjs.Text();
planeText.font = "16px Abraham";
planeText.color = "black";
Plane.addChild(planeText);
planeText.x = 357;
planeText.y = 30;
planeText.lineWidth = 195;
planeText.textAlign = "center";

// create airplaneApproach
var airplaneApproach = new lib.airplaneApproach();
stage.addChild(airplaneApproach);
airplaneApproach.x = 0;
airplaneApproach.y = 182;
airplaneApproach.gotoAndStop(0);
airplaneApproach.visible = false;

// create Tower 
var Tower = new lib.Tower();
stage.addChild(Tower);
Tower.x = 33;
Tower.y = 28;

// create feeback bubble
var inspectorFeedback = new lib.feedbackBubble();
stage.addChild(inspectorFeedback);
inspectorFeedback.x = 178;
inspectorFeedback.y = 40;
inspectorFeedback.visible = false;
inspectorFeedback.feedbackText.lineWidth = 130;

// create hangars
var hangarPositions = [
	{x: 32,		y: 445,	scaleY: 1, 		scaleX: 1 		},	
	{x: 1244,	y: 445,	scaleY: 1, 		scaleX: -1 		},	
	{x: 1040,	y: 355,	scaleY: 0.72,	scaleX: -0.72 	},	
	{x: 245,	y: 355,	scaleY: 0.72,	scaleX: 0.72 	}	
];
var hangars = [];
for (var i=0; i<hangarPositions.length; i++){
	hangars[i] = new lib.Hangar();
	stage.addChild(hangars[i]);
	hangars[i].x = hangarPositions[i].x;
	hangars[i].y = hangarPositions[i].y;	
	hangars[i].scaleX = hangarPositions[i].scaleX;	
	hangars[i].scaleY = hangarPositions[i].scaleY;
	hangars[i].visible = false;	
}

// create landing
var landing = new lib.landing();
stage.addChild(landing);
landing.x = 637.05;
landing.y = 236.75;
landing.gotoAndStop(0);
landing.visible = false;

// create Signs
var signPositions = [
	{x: 135, 	y:587,	scale: 1.13	},
	{x: 892.85, y:587,	scale: 1.13	},
	{x: 748, 	y:442,	scale: 1	},
	{x: 313, 	y:442, 	scale: 1	}
];
var signs = [];
for (var i=0; i<signPositions.length; i++) {
	signs[i] = new lib.Sign();
	stage.addChild(signs[i]);
	signs[i].x = signPositions[i].x;
	signs[i].y = signPositions[i].y;
	signs[i].scale = signPositions[i].scale;
	signs[i].name = "sign"+i;
	signs[i].addEventListener("click", checkAnswer);
	signs[i].cursor = "pointer";
	signs[i].visible = false;
	
	// sign text
	var signText = new createjs.Text();
	signText.font = "25px Abraham";
	signText.color = "black";
	signText.x = 109.5;
	signText.y = 35;
	signText.name = "signText";
	signText.lineWidth = 130;
	signText.textAlign = "center";
	signText.mouseEnabled = false;
	signs[i].addChild(signText);
}

// create popping windows
// create black screen
var blackScreen = new lib.blackScreen();
stage.addChild(blackScreen);
blackScreen.x = 0;
blackScreen.y = 0;
blackScreen.visible = false;

// create instructions window
var instructions = new lib.instructions();
stage.addChild(instructions);
instructions.x = 345;
instructions.y = 0;
instructions.visible = false;
instructions.instructionsText.textAlign = "center";
instructions.instructionsText.lineWidth = 400;
instructions.instructionsText.x = 363;
instructions.instructionsText.font = "16px Alef"

// start botton
instructions.startBtn.addEventListener("click", function(event){
	event.currentTarget.visible = false;
	if(instructions.soundBtn.currentFrame == 0) {
		backgroundSound.play();
		backgroundSound.volume = 0.05;
	}
	startNewQuestion();
});
instructions.startBtn.cursor = "pointer";

// speed levels
var speedLevels = [
	instructions.speedBtn.level1,
	instructions.speedBtn.level2,
	instructions.speedBtn.level3
];
for (var i=0; i<speedLevels.length; i++){
	speedLevels[i].name = "level" + i;
	speedLevels[i].cursor = "pointer";
	speedLevels[i].alpha = 0.1;
	speedLevels[i].addEventListener("mouseover", mouseOverSpeedLevel);
	speedLevels[i].addEventListener("mouseout", mouseOutSpeedLevel);
	speedLevels[i].addEventListener("click", changeSpeed);
}
speedLevels[0].alpha = 1;


// pause button
instructions.pauseBtn.addEventListener("click", pauseGame);
instructions.pauseBtn.cursor = "pointer";

// sound button
instructions.soundBtn.addEventListener("click", muteAllSounds);
instructions.soundBtn.cursor = "pointer";

// create login wondow
var login = new lib.login();
stage.addChild(login);
login.x = 372.65;
login.y = 173.5;
login.visible = false;
// login start botton
login.startBtn.addEventListener("click", initializeGame);
login.startBtn.gotoAndStop(1);
// game choice text
var selectedGame = null;
// first btn
login.gameChoice1.cursor = "pointer";
login.gameChoice1.btnText.text = 'גיאוגרפיה';
login.gameChoice1.addEventListener('mouseover', function(event){ 
	if ( selectedGame != 0 ) {
		event.currentTarget.gotoAndStop(1);
	}
})
login.gameChoice1.addEventListener('mouseout', function(event){
	if ( selectedGame != 0 ) {
		event.currentTarget.gotoAndStop(0);
	}  
});
login.gameChoice1.addEventListener('click', function(event){ 
	event.currentTarget.gotoAndStop(2); 
	login.gameChoice2.gotoAndStop(0);
	login.startBtn.cursor = "pointer";
	login.startBtn.gotoAndStop(0);
	selectedGame = 0;
});
// second btn
login.gameChoice2.cursor = "pointer";
login.gameChoice2.btnText.text = 'חשבון';
login.gameChoice2.addEventListener('mouseover', function(event){ 
	if ( selectedGame != 1){
		event.currentTarget.gotoAndStop(1);
	}
 });
login.gameChoice2.addEventListener('mouseout', function(event){ 
	if ( selectedGame != 1 ){
		event.currentTarget.gotoAndStop(0);
	} 
});
login.gameChoice2.addEventListener('click', function(event){ 
	event.currentTarget.gotoAndStop(2); 
	login.gameChoice1.gotoAndStop(0);
	login.startBtn.cursor = "pointer";
	login.startBtn.gotoAndStop(0);
	selectedGame = 1;
});

// create delay message
var delayMsg = new lib.delayMsg();
stage.addChild(delayMsg);
delayMsg.x = 358;
delayMsg.y = 118;
delayMsg.visible = false;

// create pause message
var pauseMsg = new lib.pauseMsg();
stage.addChild(pauseMsg);
pauseMsg.x = 358;
pauseMsg.y = 118;
pauseMsg.visible = false;

// add listener to continue botton
pauseMsg.continueBtn.addEventListener("click", resumeGame);
pauseMsg.continueBtn.cursor = "pointer";
delayMsg.continueBtn.addEventListener("click", resumeGame);
delayMsg.continueBtn.cursor = "pointer";

// create score window
var scoreWindow = new lib.finalScore();
stage.addChild(scoreWindow);
scoreWindow.x = 340.35;
scoreWindow.y = 76.2;
scoreWindow.visible = false;

// score window buttons
scoreWindow.endBtn.addEventListener('click', playGame);
scoreWindow.endBtn.cursor = 'pointer';
scoreWindow.playAgainBtn.addEventListener('click', initializeGame);
scoreWindow.playAgainBtn.cursor = 'pointer';

// array for storing score table in order to be able to delete them at restart
var scoreWinEl = [];

// ====================================
// Define Variables
// ====================================

// plane speed variables
var currentSpeed = 0;
var speeds = [3, 7, 9];
var planeSpeed = speeds[currentSpeed];
const PLANE_FLY_OUT_SPEED = 17;

// current question and answer
var currentQues = null;
var currentAns = null;
var currentQuesStartTime = null;
const PLANE_X_ANSWER_START = 930;
const PLANE_X_ANSWER_END = -180;

// ?
var unansweredQuestions = null;
var lastQuestion = null;
var countMultiMiss = 0;
var planeInterval; // global variable for handling plane fly interval

// define database
var database = [ 
{	// game 1 - גיאוגרפיה
	name: "Geography",
	instructionsText: "מיין את המדינות על פי היבשות אליהן משתייכות באמצעות לחיצה על השלט המתאים",
	categories: [
		"אסיה",
		"אירופה",
		"אמריקה",
		"אפריקה"
	],
	questions: [
		{type: "img", 	content: "brazilImg.png", description: "דגל ברזיל", answer: 2},
		{type: "text", 	content: "בירתה של מדינה זו היא סקרמנטו", description: "קליפורניה", answer: 2},
		{type: "text", 	content: "מדינה זו היא המדינה הקטנה ביותר בעולם", description: "הוותיקן", answer: 1},
		{type: "img", 	content: "uzbekistanImg.png", description: "דגל אוזבקיסטן", answer: 0},
		{type: "text", 	content: "מדינה זו גובלת בצפון מזרח עם ישראל ורצועת עזה", description: "מצרים", answer: 3},
		{type: "text", 	content: "במדינה זו משתמשים במטבע מסוג ׳באט׳", description: "תאילנד", answer: 0},
		{type: "text", 	content: "פסל החירות הוא מיצג מרכזי במדינה זו", description: "ניויורק", answer: 2},
		{type: "text", 	content: "בירתה של מדינה זו היא אדיס אבבה", description: "אתיופיה", answer: 3},
		{type: "text", 	content: "מדינה זו היא המדינה הגדולה ביותר בעולם", description: "רוסיה", answer: 1},
		{type: "text", 	content: "בירתה של מדינה זו היא אמסטרדם", description: "הולנד", answer: 1},
		{type: "text", 	content: "יוון", description: "יוון", answer: 1},
		{type: "text", 	content: "רואנדה", description: "רואנדה", answer: 3},
		{type: "text", 	content: "בירתה של מדינה זו היא פרטוריה", description: "דרום אפריקה", answer: 3},
		{type: "img", 	content: "morrocoImg.png", description: "דגל מרוקו", answer: 3},
		{type: "text", 	content: "בירתה של מדינה זו היא לימה", description: "פרו", answer: 2},
		{type: "text", 	content: "העיר הגדולה ביותר בתוך מדינה זו היא טורונטו", description: "קנדה", answer: 2},
		{type: "text", 	content: "מדינה זו מכונה ׳ארץ המגף׳ בשל צורתה הגיאוגרפית", description: "איטליה", answer: 1},
		{type: "img", 	content: "ukraineImg.png", description: "דגל אוקראינה", answer: 1},
		{type: "text", 	content: "מבנה הטאג׳ מאהל שוכן במדינה זו", description: "הודו", answer: 0},
		{type: "img", 	content: "norwayImg.png", description: "דגל נורווגיה", answer: 1},
	]
}, 
{	// game 2 - חשבון
	name: "Math",
	instructionsText: ":מיין את המספרים בהתאם \n  זוגי' או 'אי זוגי' על ידי לחיצה על השלט המתאים'",
	categories: [
		"זוגי",
		"אי זוגי"
	],
	questions: [
		{type: "text", 	content: "2", 	description: "2", 	answer: 0},
		{type: "text", 	content: "מספר זה הינו השורש הריבועי של המספר 16", 	description: "4", 	answer: 0},
		{type: "text", 	content: "5+6", 	description: "11", 	answer: 1},
		{type: "text", 	content: "7x7", 	description: "49", 	answer: 1},
		{type: "text", 	content: "18", 	description: "18", 	answer: 0},
		{type: "text", 	content: "3 בריבוע", 	description: "9", 	answer: 1},
		{type: "text", 	content: "0+8-5", 	description: "3", 	answer: 1},
		{type: "text", 	content: "63", 	description: "63", 	answer: 1},
		{type: "text", 	content: "3+3x3", 	description: "12", 	answer: 0},
		{type: "text", 	content: "27", 	description: "27", 	answer: 1},
		{type: "text", 	content: "מספר זה הינו השורש הריבוע של המספר 9", 	description: "3", 	answer: 1},
		{type: "text", 	content: "88", 	description: "88", 	answer: 0},
		{type: "text", 	content: "5 בריבוע", 	description: "25", 	answer: 1},
		{type: "text", 	content: "80/8", 	description: "10", 	answer: 0},
		{type: "text", 	content: "7x5", 	description: "35", 	answer: 1},
		{type: "text", 	content: "9 בריבוע", 	description: "81", 	answer: 1},
		{type: "text", 	content: "מספר זה הינו השורש הריבועי של המספר 64", 	description: "8", 	answer: 0},
		{type: "text", 	content: "4x9", 	description: "36", 	answer: 0},
		{type: "text", 	content: "112", 	description: "112", 	answer: 0},
		{type: "text", 	content: "12x5", 	description: "60", 	answer: 0},
		
	]
}
];

// database builder
var QuesItemArray = [];
var CategoryArray = [];

// image loader
// var image = new Image();
// image.onload = handleImageLoad;

// image testing
var bitmaps = [];

// ====================================
// Define Functions
// ====================================

// play new game
function playGame(){

	// hide score (if displayed)
	scoreWindow.visible = false;

	// reset tower index
	stage.setChildIndex( Tower, 4);
	stage.setChildIndex( inspectorFeedback, 6);
	inspectorFeedback.visible = false;

	// login window
	selectedGame = null;
	blackScreen.visible = true;
	login.visible = true;
	login.gameChoice1.gotoAndStop(0);
	login.gameChoice2.gotoAndStop(0);
}

// initialize game
function initializeGame() {
	if ( selectedGame !=  null) {	// user selected a game
		// selected game database builder
		CategoryArray = [];
		for (var i=0; i<database[selectedGame].categories.length; i++) {
			CategoryArray.push({
				name: database[selectedGame].categories[i],
				animation: "planeLand-"+i
			});
		}
		QuesItemArray=[];
		bitmaps = [];
		for (var i=0; i<database[selectedGame].questions.length; i++){
			QuesItemArray.push({
				name: database[selectedGame].questions[i].content,
				answer: database[selectedGame].questions[i].answer,
				description: database[selectedGame].questions[i].description,
				type: database[selectedGame].questions[i].type,
				try: 0,
				status: false,
				time: null
			});
			if ( database[selectedGame].questions[i].type == 'img' ) { // image
				var image = new Image();
				image.onload = storeImgToPlane;
				image.alt = i;
				image.src = 'flags/'+database[selectedGame].questions[i].content;
			}
		}

		// reset variables
		unansweredQuestions = null;
		lastQuestion = null;
		countMultiMiss = 0;
		currentQues = null;
		currentAns = null;
		currentQuesStartTime = null;
		currentSpeed = 0;
		planeSpeed = speeds[currentSpeed];
		planeText.text = '';

		// reset signs
		for (var i=0; i<CategoryArray.length; i++){
			signs[i].getChildByName('signText').text = "";

		}

		// update display
		scoreWindow.visible = false;
		login.visible = false;
		blackScreen.visible = true;
		instructions.visible = true;
		instructions.startBtn.visible = true;
		instructions.soundBtn.gotoAndStop(0);
		instructions.instructionsText.text = database[selectedGame].instructionsText;
		speedLevels[0].alpha = 1;
		speedLevels[1].alpha = 0.1;
		speedLevels[2].alpha = 0.1;
		// reset tower index
		stage.setChildIndex( Tower, 4);
		stage.setChildIndex( inspectorFeedback, 6);
		inspectorFeedback.visible = false;
		// clear score window
		scoreWinEl.forEach( (el) => { scoreWindow.removeChild(el); });
		scoreWinEl = [];

		// update signs
		for (var i=0; i<CategoryArray.length; i++){
			hangars[i].visible = true;
			signs[i].visible = true;
		}
		unansweredQuestions = QuesItemArray.length;
		instructions.progress.text = (QuesItemArray.length-unansweredQuestions)+'/'+QuesItemArray.length;
	}
}

// start a new question
function startNewQuestion() {
	if (countMultiMiss < 3){
		blackScreen.visible = false;
		// reset signs feedback
		signs.forEach( (sign) => { sign.gotoAndStop(0); } );
		
		// update signs
		for (var i=0; i<CategoryArray.length; i++){
			signs[i].getChildByName('signText').text = CategoryArray[i].name;
			signs[i].getChildByName('signText').y = 35 - signs[i].getChildByName('signText').getMeasuredHeight()/2;
		}
		// reset feedback
		inspectorFeedback.visible = false;

		lastQuestion = currentQues;
		currentQues = randomQuestion(); // pick a random question
		if (currentQues != null ) { 	// there is a non-answered question
			if ( QuesItemArray[currentQues].type == 'text') {
				planeText.text = QuesItemArray[currentQues].name;
				if ( planeText.text.length < 20 ) {
					planeText.font = "25px Alef";
				} else if ( planeText.text.length < 36 ) {
					planeText.font = "20px Alef";
				} else {
					planeText.font = "18px Alef";
				}
				planeText.y = 50 -  planeText.getMeasuredHeight()/2;
			}
			else {
				planeText.text = '';
				bitmapsIndex = bitmaps.findIndex( (bmp) => { return bmp.question == currentQues; });
				Plane.addChild(bitmaps[bitmapsIndex].bitmap);
        	}

			currentAns = null;
			planeSpeed = speeds[currentSpeed]; // reset plane speed to user choice
			startPlaneFly();
			if(instructions.soundBtn.currentFrame == 0) {
				flySound.play();
			}
			else {
				flySound.stop();
			}
			currentQuesStartTime = null;
		} 
		else { 							// no more question
			console.log("Game Ended");
			if(instructions.soundBtn.currentFrame == 0) {
				gameOverSound.play();
			}
			showScore();
		}
	}
	else {
		//show alert to user
		pauseGame();
	}
}

// checks the answer of the sign clicked
function checkAnswer(event) {
	if (currentAns == null && 				// if user didn't answer current question yet
		PLANE_X_ANSWER_START > Plane.x &&	// and plane is at available range
		PLANE_X_ANSWER_END < Plane.x		){	 
		currentAns = parseInt(event.currentTarget.name.charAt(4));
		if (QuesItemArray[currentQues].answer == currentAns){	// correct answer
			// calculate question time
			var currentAnsTime = new Date();
			QuesItemArray[currentQues].time = (currentAnsTime.getTime() - currentQuesStartTime.getTime())/1000;
			console.log('current ques time: '+QuesItemArray[currentQues].time);

			QuesItemArray[currentQues].status = true;
			unansweredQuestions--;
			console.log ("Yessssssssssssss!!");

			// green feedback
			event.currentTarget.gotoAndStop(1);
			inspectorFeedback.visible = true;
			var msg = ',כל הכבוד\n'
					+ 'עזרת לי להנחית מטוס '
					+ (QuesItemArray.length-unansweredQuestions)
					+ ' מתוך '
					+ QuesItemArray.length;
			inspectorFeedback.feedbackText.text = msg;
			instructions.progress.text = (QuesItemArray.length-unansweredQuestions)+'/'+QuesItemArray.length;
			if(instructions.soundBtn.currentFrame == 0) {
				goodJobSound.play();
			}
		}
		else{													// wrong answer
			console.log ("nooooooooo");

			// red feedback
			event.currentTarget.gotoAndStop(2);
			inspectorFeedback.visible = true;
			var msg = ',אויי לא\n'
					+ 'יצרת עיכוב בטיסה\n'
					+ 'נותרו '
					+ unansweredQuestions
					+ ' מטוסים';
			inspectorFeedback.feedbackText.text = msg;
			if(instructions.soundBtn.currentFrame == 0) {
				ohNoSound.play();
			}
		}
		// speed up plane
		planeSpeed = PLANE_FLY_OUT_SPEED;
		console.log('speedUp');

		// add try count
		QuesItemArray[currentQues].try++;
		countMultiMiss = 0;
	}
}

// start plane flying
function startPlaneFly(){
	Plane.x = 1280;
	planeInterval = setInterval( planeMoveOneStep ,1000/24);
}

// stop plane flying
function stopPlaneFly(){
	clearInterval(planeInterval);
}

// plane one step movment
function planeMoveOneStep(){
	Plane.x = Plane.x - planeSpeed;
	// fadein sound
	if ( Plane.x > PLANE_X_ANSWER_START ) {
		var fadeInDistance = 1280 - PLANE_X_ANSWER_START;
		var passedDistance = 1280 - Plane.x;
		flySound.volume = 0.5*(passedDistance/fadeInDistance);
	}
	// set question start time
	if ( Plane.x < PLANE_X_ANSWER_START && currentQuesStartTime == null ) { // plane passed the start point
		currentQuesStartTime = new Date();
	}
	// fadeout sound
	if ( Plane.x < PLANE_X_ANSWER_END ) {
		var fadeOutDistance = PLANE_X_ANSWER_END - (-474) ;
		var remainingDistance = Plane.x - (-474);
		flySound.volume = 0.5*(remainingDistance/fadeOutDistance);
	}
	if ( Plane.x <= -474 ) { // plane arrived to the edge
		flySound.stop();
		stopPlaneFly();
		// remove img if exists
		var img = Plane.getChildByName('img');
		if (img != null ) {
			Plane.removeChild(img);
		}

		if ( currentAns!= null ) {										// user answered current question
			if ( QuesItemArray[currentQues].answer == currentAns){		// correct answer
				// set landing direction
				switch (currentAns){
					case 0: 
						break;
					case 1:
						landing.scaleX = -1;
						break;
					case 2:
						landing.scale = 0.624;
						landing.scaleX = -landing.scaleX;
						landing.y = 236.75 - 15;
						break;
					case 3:
						landing.scale = 0.624;
						landing.y = 236.75 - 15;
						break;
				}
				
				// start airplane approach
				airplaneApproach.visible = true;
				airplaneApproach.gotoAndPlay(0);
				airplaneApproach.addEventListener("tick", lastApproachFrame);
				
				// starts new question at plane landing last frame listener
			}
			else {														// wrong answer
				startNewQuestion();
			}
		}
		else {															// user didn't answer current question
			countMultiMiss++;
			console.log('countMultiMiss: '+countMultiMiss);
			QuesItemArray[currentQues].try++;
			startNewQuestion();
		}
	}
}

// plane approach last frame listener
function lastApproachFrame(){ 
	if (airplaneApproach.currentFrame == 30 ) {
		// stop approach
		airplaneApproach.gotoAndStop(0);
		airplaneApproach.visible = false;

		// remove listener
		airplaneApproach.removeEventListener('tick', lastApproachFrame);
		
		// start landing
		landing.visible = true;
		landing.gotoAndPlay(0);
		landing.addEventListener("tick", lastlandingFrame);
	}
}

// plane landing last frame listener
function lastlandingFrame(){ 
	if (landing.currentFrame == 142 ) {
		// stop landing
		landing.gotoAndStop(0);
		landing.visible = false;

		// reset configrations
		landing.scaleX = 1;
		landing.scale = 1;
		landing.y = 236.75;

		// remove listener
		landing.removeEventListener('tick', lastlandingFrame);
		
		// start new question
		startNewQuestion();
	}
}

// change speed to num (0, 1 or 2)
function changeSpeed(event){
	var num = parseInt(event.currentTarget.name.charAt(5));
	// check if new speed isn't same as current speed 
	if ( num != currentSpeed) {
		// change old speed alpha
		speedLevels[currentSpeed].alpha = 0.1;
		currentSpeed = num;
		// change new speed alpha
		speedLevels[currentSpeed].alpha = 1;
		// change speed if plane is not at fly out
		if ( planeSpeed != PLANE_FLY_OUT_SPEED ){
			planeSpeed = speeds[currentSpeed];
		}
	} 
}

// pick a random question
function randomQuestion(){
	var remainingQuestions = [];
	// collect remaining questions
	for (var i=0; i<QuesItemArray.length; i++){
		if ( !QuesItemArray[i].status ) {
			remainingQuestions.push(i);
		}
	}

	// Check if there is a remaining questions
	unansweredQuestions = remainingQuestions.length;
	if ( remainingQuestions.length == 0) {		// no remaining question
		return null;
	}
	else {
		if ( remainingQuestions.length == 1) {	// one question left
			return remainingQuestions[0];
		}
		else { 									// more than one question left
			remainingQuestions.splice(remainingQuestions.indexOf(lastQuestion), 1);
			var randomIndex = Math.floor(Math.random()*remainingQuestions.length);
			return remainingQuestions[randomIndex];
		}
	}
}

// prints the score to console
function showScore() {
	var maxTime = (PLANE_X_ANSWER_START-PLANE_X_ANSWER_END)/(24*speeds[0]);
	var minTime = 0.3*maxTime;

	var totalTime = 0;
	var totalMisses = 0;
	var finalScore = 0;
	var quesCountPerCat = [];
	CategoryArray.forEach( () => { quesCountPerCat.push(0); } );

	for (var i=0; i<QuesItemArray.length; i++){
		var currentTime = QuesItemArray[i].time;
		var tScore = 100;
		if ( currentTime > minTime ) {
			tScore -= (((currentTime-minTime)/(maxTime-minTime)) * (100-80));
		}

		// total
		totalTime += currentTime;
		totalMisses += (QuesItemArray[i].try - 1);
		finalScore += ((tScore / QuesItemArray[i].try)/QuesItemArray.length);
		
		// update category counter
		quesCountPerCat[QuesItemArray[i].answer]++;
	}

	// floor numbers
	finalScore = Math.floor(finalScore);
	totalTime = Math.floor(totalTime);
	totalTimeStr = '' +
				Math.floor(totalTime/60) +
				':' +
				(((totalTime%60)<10)?('0'+totalTime%60):totalTime%60);

	console.log("Total Time: "+totalTime+" Total Misses:"+totalMisses+" Final Score:"+finalScore);
	scoreWindow.finalScore.text = finalScore;
	scoreWindow.totalTime.text = totalTimeStr;
	scoreWindow.totalMisses.text = totalMisses;

	// hide elements
	instructions.visible = false;
	hangars.forEach( (hangar) => { hangar.visible = false; });
	signs.forEach( (sign) => { sign.visible = false; });

	// show elements
	stage.setChildIndex( Tower, stage.numChildren - 1);
	stage.setChildIndex( inspectorFeedback, stage.numChildren - 1);
	inspectorFeedback.visible = true;
	inspectorFeedback.feedbackText.text = 'הנחתת את כל המטוסים בהצלחה';
	blackScreen.visible = true;
	scoreWindow.visible = true;

	// find max category length
	var maxCatLength = 0;
	quesCountPerCat.forEach( (count) => { 
		if ( count > maxCatLength) { 
			maxCatLength = count; 
		} 
	} );

	var headerY = 114.25;
	var tableX = 27.35;
	var tableY = 162.2;
	var colWidth = (530.25 / CategoryArray.length);
	var rowHeight = 327.9 / maxCatLength ;
	var categoryCounter = [];
	// create headers
	for (var i=0; i<CategoryArray.length; i++){
		var catHeader = new createjs.Text();
		catHeader.text = CategoryArray[i].name;
		catHeader.font = "20pt Abraham";
		catHeader.color = "white";
		catHeader.x = tableX + (colWidth*i) + (colWidth/2);
		catHeader.y = headerY;
		catHeader.lineWidth = colWidth;
		catHeader.textAlign = "center";
		scoreWindow.addChild(catHeader);
		scoreWinEl.push(catHeader);
		categoryCounter.push(0);		
	}

	// create table
	for (var i=0; i<QuesItemArray.length; i++){
		if ( QuesItemArray[i].type == 'text' ) {
			var tableEl = new createjs.Text();
			tableEl.text = QuesItemArray[i].description;
			tableEl.font = "15pt Alef";
			tableEl.color = (QuesItemArray[i].try > 1)?"red":"black";
			tableEl.x = tableX + (colWidth*QuesItemArray[i].answer) + (colWidth/2);
			tableEl.y = tableY + (rowHeight*categoryCounter[QuesItemArray[i].answer]) + rowHeight*0.5;
			tableEl.lineWidth = colWidth;
			tableEl.textAlign = "center";
			tableEl.y -= tableEl.getMeasuredHeight()/2;
			scoreWindow.addChild(tableEl);
			scoreWinEl.push(tableEl);
		} 
		else {
			// image
			var x = tableX + (colWidth*QuesItemArray[i].answer);
			var y = tableY + (rowHeight*categoryCounter[QuesItemArray[i].answer]);
			bitmapsIndex = bitmaps.findIndex( (bmp) => { return bmp.question == i; });
			addBitmapToScore(bitmaps[bitmapsIndex].bitmap, x, y, colWidth, rowHeight);
			if (QuesItemArray[i].try > 1) {		// if there are more than 1 try
				var redRect = new lib.redRect();
				redRect.x = x;
				redRect.y = y;
				var rectNewScaleX = colWidth / 176.75;
				redRect.scaleX = rectNewScaleX;
				var rectNewScaleY = rowHeight / 65.6;
				redRect.scaleY = rectNewScaleY;
				scoreWindow.addChild(redRect);
				scoreWinEl.push(redRect);
			}
		}
		categoryCounter[QuesItemArray[i].answer]++;
	}
}

// show pause window
function pauseGame() {
	// -- hide elements
	// hide instructions
	instructions.visible = false;
	// stop background music
	backgroundSound.stop();

	// -- hide plane
	// plane is flying
	stopPlaneFly();
	Plane.x = 1280;
	// plane is on approach
	airplaneApproach.removeEventListener('tick', lastApproachFrame);
	airplaneApproach.gotoAndStop(0);
	airplaneApproach.visible = false;
	// plane is landing
	landing.removeEventListener('tick', lastlandingFrame);
	landing.gotoAndStop(0);
	landing.visible = false;
	landing.scaleX = 1;
	landing.scale = 1;
	landing.y = 236.75;
	// remove img if exists
	var img = Plane.getChildByName('img');
	if (img != null ) {
		Plane.removeChild(img);
	}
		
	// hide text on signs
	// categorysign.forEach( (sign) => { sign.visible = false; } );
	signs.forEach( (sign) => { sign.getChildByName('signText').visible = false; } );
	// reset signs feedback
	signs.forEach( (sign) => { sign.gotoAndStop(0); } );
	// hide feedback
	inspectorFeedback.visible = false;

	// stop sound
	flySound.stop();

	// -- show elements
	// show black screen
	blackScreen.visible = true;
	if (countMultiMiss < 3) {
		// show pause message
		pauseMsg.visible = true;
	}
	else {
		// show delay message
		delayMsg.visible = true;
	}
}

// resume game after pause or delay
function resumeGame() {
	console.log('resumeGame');
	// hide black screen
	blackScreen.visible = false;
	// play background music
	if(instructions.soundBtn.currentFrame == 0) {
		backgroundSound.play();
		backgroundSound.volume = 0.05;
	}
	// hide delay\pause message
	if (delayMsg.visible == true){
		delayMsg.visible = false;
		countMultiMiss = 0;
	}
	else{
		pauseMsg.visible = false;
	}
	
	//זמן נחיתה 

	// show instructions
	instructions.visible = true;
	// show text on signs
	// categorysign.forEach( (sign) => { sign.visible = true; } );
	signs.forEach( (sign) => { sign.getChildByName('signText').visible = true; } );
	// show plane
	startNewQuestion();

}

function mouseOverSpeedLevel(event){
	if ( event.currentTarget.alpha == 0.1 ) {
		event.currentTarget.alpha = 0.5;
	}
}

function mouseOutSpeedLevel(event){
	if ( event.currentTarget.alpha == 0.5 ) {
		event.currentTarget.alpha = 0.1;
	}
}

// loads image on plane
function storeImgToPlane(event) {
	var bitmap = new createjs.Bitmap(event.currentTarget);
	bitmap.name = 'img';
	
	// adapt size and position
	const IMG_X = 289;
	const IMG_Y = 15;
	const IMG_W = 127;
	const IMG_H = 65;
	// postion image
	bitmap.x = IMG_X;
	bitmap.y = IMG_Y;
	// scale image depends on its width and height ratio
	if (bitmap.getBounds().width > ((IMG_W/IMG_H)*bitmap.getBounds().height)) {
		var picWidth = IMG_W / bitmap.getBounds().width;
		bitmap.scale = picWidth;
		// update position
		bitmap.y += ( (IMG_H - (bitmap.getBounds().height*picWidth) ) /2); 
	} 
	else {		
		var picHeight = IMG_H / bitmap.getBounds().height;
		bitmap.scale = picHeight;
		// update position
		bitmap.x += ( (IMG_W - (bitmap.getBounds().width*picHeight) ) /2);
	}

	bitmaps.push({question: event.currentTarget.alt, bitmap: bitmap});
	console.log(bitmap);
}

// mute all sounds
function muteAllSounds(event) {
	if (event.currentTarget.currentFrame == 0) {
		event.currentTarget.gotoAndStop(1);
		flySound.stop();
		//ohNoSound.stop();
		//goodJobSound.stop();
		//gameOverSound.stop();
		backgroundSound.stop();
	}
	else {
		event.currentTarget.gotoAndStop(0);
		flySound.play();
		//ohNoSound.stop();
		//goodJobSound.stop();
		//gameOverSound.stop();
		backgroundSound.play();
		backgroundSound.volume = 0.05;
	}


}

// loads image on plane
function addBitmapToScore(bitmap, x, y, w, h) {
	// adapt size and position
	const IMG_X = x + 1 ;
	const IMG_Y = y + 1 ;
	const IMG_W = w - 2 ;
	const IMG_H = h - 2 ;
	// postion image
	bitmap.x = IMG_X;
	bitmap.y = IMG_Y;
	// scale image depends on its width and height ratio
	if (bitmap.getBounds().width > ((IMG_W/IMG_H)*bitmap.getBounds().height)) {
		var picWidth = IMG_W / bitmap.getBounds().width;
		bitmap.scale = picWidth;
		// update position
		bitmap.y += ( (IMG_H - (bitmap.getBounds().height*picWidth) ) /2); 
	} 
	else {		
		var picHeight = IMG_H / bitmap.getBounds().height;
		bitmap.scale = picHeight;
		// update position
		bitmap.x += ( (IMG_W - (bitmap.getBounds().width*picHeight) ) /2);
	}
	scoreWindow.addChild(bitmap);
	scoreWinEl.push(bitmap);
}

// ==============================
// Start Game
// ==============================

playGame();