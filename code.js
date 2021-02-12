var self = this;
stage.enableMouseOver();

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
var plane = new lib.Plane();
stage.addChild(plane);
plane.x = 1280;
plane.y = 200;

//add plane text
var planeText = new createjs.Text();
planeText.font = "16px Abraham";
planeText.color = "black";
plane.addChild(planeText);
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

// create tower 
var tower = new lib.Tower();
stage.addChild(tower);
tower.x = 33;
tower.y = 28;

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
instructions.startBtn.addEventListener("click", instructionsStartBtn);
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
// first btn
login.gameChoice0.cursor = "pointer";
login.gameChoice0.btnText.text = 'גיאוגרפיה';
login.gameChoice0.addEventListener('mouseover', mouseOverGameChoice);
login.gameChoice0.addEventListener('mouseout', mouseOutGameChoice);
login.gameChoice0.addEventListener('click', clickGameChoice);
// second btn
login.gameChoice1.cursor = "pointer";
login.gameChoice1.btnText.text = 'חשבון';
login.gameChoice1.addEventListener('mouseover', mouseOverGameChoice);
login.gameChoice1.addEventListener('mouseout', mouseOutGameChoice);
login.gameChoice1.addEventListener('click', clickGameChoice);

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

// ====================================
// Define Variables
// ====================================

// define constants
const PLANE_FLY_OUT_SPEED = 17;
const PLANE_X_ANSWER_START = 930;
const PLANE_X_ANSWER_END = -180;

// plane speed variables
var currentSpeed = 0;
var speeds = [3, 6, 9];
var planeSpeed = speeds[currentSpeed];

// current question and answer
var currentQues = null;
var currentAns = null;
var currentQuesStartTime = null;

// define game variables
var selectedGame = null;
var unansweredQuestions = null;
var lastQuestion = null;
var countMultiMiss = 0;
var planeInterval; 				// global variable for handling plane fly interval
var scoreWinEl = [];			// stores score table elements in order to be able to delete them at restart

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

// current game database
var quesItemArray = [];
var categoryArray = [];
var bitmaps = [];

// ====================================
// Define Functions
// ====================================

// play new game(login window)
function playGame(){
	// hide score (if displayed)
	scoreWindow.visible = false;

	// reset tower display index
	stage.setChildIndex( tower, 4);
	stage.setChildIndex( inspectorFeedback, 6);
	// hide inspector feedback
	inspectorFeedback.visible = false;

	// show login window
	selectedGame = null;
	blackScreen.visible = true;
	login.visible = true;
	login.startBtn.gotoAndStop(1);
	login.startBtn.cursor = "default";
	login.gameChoice0.gotoAndStop(0);
	login.gameChoice1.gotoAndStop(0);
}

// initialize game
function initializeGame() {
	if ( selectedGame !=  null) {	// user selected a game
		// selected game database builder
		categoryArray = [];
		for (var i=0; i<database[selectedGame].categories.length; i++) {
			categoryArray.push({
				name: database[selectedGame].categories[i],
			});
		}
		quesItemArray=[];
		bitmaps = [];
		for (var i=0; i<database[selectedGame].questions.length; i++){
			quesItemArray.push({
				name: database[selectedGame].questions[i].content,
				answer: database[selectedGame].questions[i].answer,
				description: database[selectedGame].questions[i].description,
				type: database[selectedGame].questions[i].type,
				try: 0,
				status: false,
				time: null
			});
			// image qusetion
			if ( database[selectedGame].questions[i].type == 'img' ) {
				// create new image, onload store image to bitmaps as a bitmap
				var image = new Image();
				image.onload = storeImgToplane;
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
		for (var i=0; i<categoryArray.length; i++){
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
		// reset speed level to low
		speedLevels[0].alpha = 1;
		speedLevels[1].alpha = 0.1;
		speedLevels[2].alpha = 0.1;
		// reset tower index
		stage.setChildIndex( tower, 4);
		stage.setChildIndex( inspectorFeedback, 6);
		inspectorFeedback.visible = false;
		// clear score window
		scoreWinEl.forEach( (el) => { scoreWindow.removeChild(el); });
		scoreWinEl = [];

		// update signs
		for (var i=0; i<categoryArray.length; i++){
			hangars[i].visible = true;
			signs[i].visible = true;
		}
		unansweredQuestions = quesItemArray.length;
		instructions.progress.text = (quesItemArray.length-unansweredQuestions)+'/'+quesItemArray.length;
	}
}

// start a new question
function startNewQuestion() {
	// plane didn't pass more than 3 times in a row
	if (countMultiMiss < 3){
		// reset signs feedback
		signs.forEach( (sign) => { sign.gotoAndStop(0); } );
		// reset feedback
		inspectorFeedback.visible = false;

		lastQuestion = currentQues;
		currentQues = randomQuestion(); // pick a random question
		if (currentQues != null ) { 	// there is a non-answered question
			if ( quesItemArray[currentQues].type == 'text') {	// question type text
				// update plane text
				planeText.text = quesItemArray[currentQues].name;
				// adjust font size depends on text length
				if ( planeText.text.length < 20 ) {
					planeText.font = "25px Alef";
				} else if ( planeText.text.length < 36 ) {
					planeText.font = "20px Alef";
				} else {
					planeText.font = "18px Alef";
				}
				// adjust text position
				planeText.y = 50 -  planeText.getMeasuredHeight()/2;
			}
			else {												// question type text
				planeText.text = '';	// clear text
				// find current question bitmap, add it to plane
				bitmapsIndex = bitmaps.findIndex( (bmp) => { return bmp.question == currentQues; });
				plane.addChild(bitmaps[bitmapsIndex].bitmap);
        	}

			// update variables
			currentAns = null;
			planeSpeed = speeds[currentSpeed]; // reset plane speed to user choice
			currentQuesStartTime = null;
			startPlaneFly();
			// play sound (if not muted)
			if ( instructions.soundBtn.currentFrame == 0 ) 	{	flySound.play();	}
			else 											{	flySound.stop();	}
		} 
		else { 							// no more question
			// plat game over sound
			if(instructions.soundBtn.currentFrame == 0) {
				gameOverSound.play();
			}
			// show score window
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
		PLANE_X_ANSWER_START > plane.x &&	// plane is at available answer range
		PLANE_X_ANSWER_END < plane.x		){	 
		// get clicked sign name (num)
		currentAns = parseInt(event.currentTarget.name.charAt(4));
		if (quesItemArray[currentQues].answer == currentAns){	// correct answer
			// calculate question time
			var currentAnsTime = new Date();
			quesItemArray[currentQues].time = (currentAnsTime.getTime() - currentQuesStartTime.getTime())/1000;
			// update variables
			quesItemArray[currentQues].status = true;
			unansweredQuestions--;

			// green feedback
			event.currentTarget.gotoAndStop(1);
			inspectorFeedback.visible = true;
			var msg = ',כל הכבוד\n'
					+ 'עזרת לי להנחית מטוס '
					+ (quesItemArray.length-unansweredQuestions)
					+ ' מתוך '
					+ quesItemArray.length;
			inspectorFeedback.feedbackText.text = msg;
			instructions.progress.text = (quesItemArray.length-unansweredQuestions)+'/'+quesItemArray.length;
			if(instructions.soundBtn.currentFrame == 0) {
				goodJobSound.play();
			}
		}
		else{													// wrong answer
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

		// update tries count
		quesItemArray[currentQues].try++;
		countMultiMiss = 0;
	}
}

// start plane flying (interval)
function startPlaneFly(){
	plane.x = 1280;
	planeInterval = setInterval( planeMoveOneStep ,1000/24);
}

// stop plane flying (interval)
function stopPlaneFly(){
	clearInterval(planeInterval);
}

// plane one step movement
function planeMoveOneStep(){
	// update plane position
	plane.x = plane.x - planeSpeed;
	// fadein sound
	if ( plane.x > PLANE_X_ANSWER_START ) {
		var fadeInDistance = 1280 - PLANE_X_ANSWER_START;
		var passedDistance = 1280 - plane.x;
		flySound.volume = 0.5*(passedDistance/fadeInDistance);
	}
	// fadeout sound
	if ( plane.x < PLANE_X_ANSWER_END ) {
		var fadeOutDistance = PLANE_X_ANSWER_END - (-474) ;
		var remainingDistance = plane.x - (-474);
		flySound.volume = 0.5*(remainingDistance/fadeOutDistance);
	}
	// set question start time
	if ( plane.x < PLANE_X_ANSWER_START && currentQuesStartTime == null ) { // plane passed the start point
		currentQuesStartTime = new Date();
	}

	// plane arrived to the edge - stop plane, play next funtions
	if ( plane.x <= -474 ) {
		flySound.stop();
		stopPlaneFly();		// stop interval
		
		// remove img if exists
		var img = plane.getChildByName('img');
		if (img != null ) {
			plane.removeChild(img);
		}

		if ( currentAns!= null ) {										// user answered current question
			if ( quesItemArray[currentQues].answer == currentAns){		// correct answer
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
			}
			else {														// wrong answer
				startNewQuestion();
			}
		}
		else {															// user didn't answer current question
			countMultiMiss++;
			quesItemArray[currentQues].try++;
			startNewQuestion();
		}
	}
}

// plane approach last frame listener
function lastApproachFrame(){ 
	if (airplaneApproach.currentFrame == 30 ) {		// 30 is the last frame
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
	if (landing.currentFrame == 142 ) {		// 142 is the last frame
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

// picks a random question
function randomQuestion(){
	var remainingQuestions = [];
	// collect remaining questions
	for (var i=0; i<quesItemArray.length; i++){
		if ( !quesItemArray[i].status ) {
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

// shows score window
function showScore() {
	// calculates max time for a question, min time to full score
	var maxTime = (PLANE_X_ANSWER_START-PLANE_X_ANSWER_END)/(24*speeds[0]);
	var minTime = 0.3*maxTime;

	var totalTime = 0;
	var totalMisses = 0;
	var finalScore = 0;
	var categoryCounter = [];
	categoryArray.forEach( () => { categoryCounter.push(0); } ); // [ 0, 0, 0, 0 ]

	for (var i=0; i<quesItemArray.length; i++){
		var currentTime = quesItemArray[i].time;
		var tScore = 100;					// full score
		if ( currentTime > minTime ) {		// reduce points depends on current question time
			tScore -= (((currentTime-minTime)/(maxTime-minTime)) * (100-80));
		}

		// add qustion to total
		totalTime += currentTime;
		totalMisses += (quesItemArray[i].try - 1);
		finalScore += ((tScore / quesItemArray[i].try)/quesItemArray.length);
		
		// update category counter
		categoryCounter[quesItemArray[i].answer]++;
	}

	// floor numbers
	finalScore = Math.floor(finalScore);
	totalTime = Math.floor(totalTime);
	totalTimeStr = '' +
				Math.floor(totalTime/60) +
				':' +
				(((totalTime%60)<10)?('0'+totalTime%60):totalTime%60);

	// update score window
	scoreWindow.finalScore.text = finalScore;
	scoreWindow.totalTime.text = totalTimeStr;
	scoreWindow.totalMisses.text = totalMisses;

	// hide elements
	instructions.visible = false;
	hangars.forEach( (hangar) => { hangar.visible = false; });
	signs.forEach( (sign) => { sign.visible = false; });

	// show elements
	stage.setChildIndex( tower, stage.numChildren - 1);
	stage.setChildIndex( inspectorFeedback, stage.numChildren - 1);
	inspectorFeedback.visible = true;
	inspectorFeedback.feedbackText.text = 'הנחתת את כל המטוסים בהצלחה';
	blackScreen.visible = true;
	scoreWindow.visible = true;

	// find max category length
	var maxCatLength = 0;
	for (var i=0; i<categoryCounter.length; i++){
		if ( categoryCounter[i] > maxCatLength) {
			maxCatLength = categoryCounter[i]; 
		} 
		// reset for further use
		categoryCounter[i] = 0;
	}

	// set position calculating measurments
	var headerY = 114.25;
	var tableX = 27.35;
	var tableY = 162.2;
	var colWidth = (530.25 / categoryArray.length);
	var rowHeight = 327.9 / maxCatLength ;

	// create score headers
	for (var i=0; i<categoryArray.length; i++){
		var catHeader = new createjs.Text();
		catHeader.text = categoryArray[i].name;
		catHeader.font = "20pt Abraham";
		catHeader.color = "white";
		catHeader.x = tableX + (colWidth*i) + (colWidth/2);
		catHeader.y = headerY;
		catHeader.lineWidth = colWidth;
		catHeader.textAlign = "center";
		scoreWindow.addChild(catHeader);
		scoreWinEl.push(catHeader);	
	}

	// create score table
	for (var i=0; i<quesItemArray.length; i++){
		if ( quesItemArray[i].type == 'text' ) {	// text question
			var tableEl = new createjs.Text();
			tableEl.text = quesItemArray[i].description;
			tableEl.font = "15pt Alef";
			tableEl.color = (quesItemArray[i].try > 1)?"red":"black";	// red color for extra tries
			tableEl.x = tableX + (colWidth*quesItemArray[i].answer) + (colWidth/2);
			tableEl.y = tableY + (rowHeight*categoryCounter[quesItemArray[i].answer]) + rowHeight*0.5;
			tableEl.lineWidth = colWidth;
			tableEl.textAlign = "center";
			tableEl.y -= tableEl.getMeasuredHeight()/2;
			scoreWindow.addChild(tableEl);
			scoreWinEl.push(tableEl);
		} 
		else {										// image question
			var x = tableX + (colWidth*quesItemArray[i].answer);
			var y = tableY + (rowHeight*categoryCounter[quesItemArray[i].answer]);
			bitmapsIndex = bitmaps.findIndex( (bmp) => { return bmp.question == i; });
			addBitmapToScore(bitmaps[bitmapsIndex].bitmap, x, y, colWidth, rowHeight);
			// show red rectangle for extra tries
			if (quesItemArray[i].try > 1) {		
				var redRect = new lib.redRect();
				redRect.x = x;
				redRect.y = y;
				var rectNewScaleX = colWidth / 176.75;		// 176.75 symbol width
				redRect.scaleX = rectNewScaleX;
				var rectNewScaleY = rowHeight / 65.6;		// 65.6 symbol height
				redRect.scaleY = rectNewScaleY;
				scoreWindow.addChild(redRect);
				scoreWinEl.push(redRect);
			}
		}
		categoryCounter[quesItemArray[i].answer]++;
	}
}

// shows pause window or delay msg
function pauseGame() {
	// -- hide elements
	// hide instructions
	instructions.visible = false;

	// -- hide plane
	// plane is flying
	stopPlaneFly();
	plane.x = 1280;
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
	// remove img on plane if exists
	var img = plane.getChildByName('img');
	if (img != null ) {
		plane.removeChild(img);
	}
		
	// hide text on signs
	// categorysign.forEach( (sign) => { sign.visible = false; } );
	signs.forEach( (sign) => { sign.getChildByName('signText').visible = false; } );
	// reset signs feedback
	signs.forEach( (sign) => { sign.gotoAndStop(0); } );
	// hide feedback
	inspectorFeedback.visible = false;

	// stop sound
	backgroundSound.stop();
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

	// show instructions
	instructions.visible = true;
	// show text on signs
	signs.forEach( (sign) => { sign.getChildByName('signText').visible = true; } );
	// show plane and new question
	startNewQuestion();
}

// stores image as a bitmap, prepared to load on plane
function storeImgToplane(event) {
	// create bitmap from image triggered this function
	var bitmap = new createjs.Bitmap(event.currentTarget);
	bitmap.name = 'img';
	
	// -- adapt size and position
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

	// stroe to bimaps array
	bitmaps.push({question: event.currentTarget.alt, bitmap: bitmap});
}

// add image question bitmap to score
function addBitmapToScore(bitmap, x, y, w, h) {
	// -- adapt size and position
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

	// add bitmap to score window & store it in elements (to be removed further)
	scoreWindow.addChild(bitmap);
	scoreWinEl.push(bitmap);
}

// mutes all sounds
function muteAllSounds(event) {
	if (event.currentTarget.currentFrame == 0) {
		event.currentTarget.gotoAndStop(1);
		flySound.stop();
		backgroundSound.stop();
	}
	else {
		event.currentTarget.gotoAndStop(0);
		flySound.play();
		backgroundSound.play();
		backgroundSound.volume = 0.05;
	}


}

// mouse starts hover over speed level
function mouseOverSpeedLevel(event){
	if ( event.currentTarget.alpha == 0.1 ) {	// level is not selected
		event.currentTarget.alpha = 0.5;
	}
}

// mouse stops hover over speed level
function mouseOutSpeedLevel(event){
	if ( event.currentTarget.alpha == 0.5 ) {	// level is not selected
		event.currentTarget.alpha = 0.1;
	}
}

// changes speed to clicked speed level
function changeSpeed(event){
	// get clicked level name (num)
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

// instructions start button clicked
function instructionsStartBtn(event){
	// hide button
	event.currentTarget.visible = false;
	// play background sound
	if(instructions.soundBtn.currentFrame == 0) {
		backgroundSound.play();
		backgroundSound.volume = 0.05;
	}
	// clear black screen
	blackScreen.visible = false;
	// update signs text
	for (var i=0; i<categoryArray.length; i++){
		signs[i].getChildByName('signText').text = categoryArray[i].name;
		// update position
		signs[i].getChildByName('signText').y = 35 - signs[i].getChildByName('signText').getMeasuredHeight()/2;
	}
	// start new question
	startNewQuestion();
}

// mouse starts hover over game choice
function mouseOverGameChoice(event){
	var currentGameBtn = parseInt(event.currentTarget.name.charAt(10));
	if ( selectedGame != currentGameBtn ) {
		event.currentTarget.gotoAndStop(1);
	}
}

// mouse stops hover over game choice
function mouseOutGameChoice(event){
	var currentGameBtn = parseInt(event.currentTarget.name.charAt(10));
	if ( selectedGame != currentGameBtn ) {
		event.currentTarget.gotoAndStop(0);
	}
}

// selects a game (triggered by game choice button) 
function clickGameChoice(event){ 
	var currentGameBtn = parseInt(event.currentTarget.name.charAt(10));
	console.log(event.currentTarget.name);
	console.log(event.currentTarget.name.charAt(10));
	event.currentTarget.gotoAndStop(2);
	if ( event.currentTarget.name == 'gameChoice1' ) {
		login.getChildByName('gameChoice0').gotoAndStop(0);
	}
	else {
		login.getChildByName('gameChoice1').gotoAndStop(0);
	}
	
	login.startBtn.cursor = "pointer";
	login.startBtn.gotoAndStop(0);
	selectedGame = currentGameBtn;
}

// ==============================
// Start Game
// ==============================

playGame();