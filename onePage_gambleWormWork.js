$(document).ready(function() 
{
	$('#bookie_work').sprite({ fps: 8, no_of_frames: 5 }); // Spritely.js plug-in functions
	
	$('#pinkFighter').sprite({ fps: 12, no_of_frames: 4 }); // Spritely.js plug-in functions
	$('#blueFighter').sprite({ fps: 12, no_of_frames: 4 });
	$('#greenFighter').sprite({ fps: 12, no_of_frames: 4 });
	$('#yellowFighter').sprite({ fps: 12, no_of_frames: 4 });
	$('#orangeFighter').sprite({ fps: 12, no_of_frames: 4 });
	$('#purpleFighter').sprite({ fps: 12, no_of_frames: 4 });
	$('#whiteFighter').sprite({ fps: 12, no_of_frames: 4 });
	$('#redFighter').sprite({ fps: 12, no_of_frames: 4 });

	$('.btn').button();

	$("#clockOut").hide();
	$("#clockInAgain").hide();
	$("#iQuitEarly").hide();

	$('#secondBookieTalk').hide();
	$('#thirdBookieTalk').hide();
	$('#fourthBookieTalk').hide();

	var paycheckVisual = '<span id="tally_work">' + window.sessionStorage.paycheckAmount + '</span>';
	$('.bank_work').html("<fieldset class='frame_work'><legend class='legend_work'>Your Paycheck:</legend>" + "<span id='firstDollarSign'>$ </span>" + paycheckVisual + "</fieldset>");
	

	var fightersArray = ['#pinkFighter', '#blueFighter', '#greenFighter', '#yellowFighter', '#orangeFighter', '#purpleFighter', '#whiteFighter', '#redFighter'];

	document.getElementById('initialGreeting').innerHTML = "Your Longest Streak So Far Is: <span class='soFarText'>" + window.sessionStorage.longestStreak + "</span> !";
	
	$(".fighters").hide();

	function getRandomInt(min, max) 
	{
		return Math.floor(Math.random() * (max - min + 1)) + min;

	} // end getRandomInt function

	function reloadToLocationFromWork()
	{
		bankVisual_location = '<span id="tally">' + window.sessionStorage.betTracker + '</span>';
		$('.bank_location').html("<fieldset class='frame_location'><legend class='legend_location'>Your Bankroll:</legend>" + "<div id='locationBankrollHolder'><span id='firstDollarSign_location'>$ </span>" + bankVisual_location + "<span class='text'>  / of $25,000</span></div></fieldset>");
		
		if (Number(window.sessionStorage.betTracker) < 25000)
		{
			$("#workMainbody").hide();
			$("#locationMainbody").fadeIn();
		}
		else if (Number(window.sessionStorage.betTracker) >= 25000)
		{
			$("#workMainbody").hide();
			$("#endGameMainbody").fadeIn();
		}
		
	} // end reloadToLocationFromWork function

	function updateBankVisualLocationFromWork()
	{
		bankVisual_location = '<span id="tally">' + window.sessionStorage.betTracker + '</span>';
		$('.bank_location').html("<fieldset class='frame_location'><legend class='legend_location'>Your Bankroll:</legend>" + "<div id='locationBankrollHolder'><span id='firstDollarSign_location'>$ </span>" + bankVisual_location + "<span class='text'>  / of $25,000</span></div></fieldset>");
	
	} // end updateBankVisualLocationFromWork function

	function shuffle(array) 
	{
	    var counter = array.length, temp, index;

	    // While there are elements in the array
	    while (counter > 0) 
	    {
	        // Pick a random index
	        index = Math.floor(Math.random() * counter);

	        // Decrease counter by 1
	        counter--;

	        // And swap the last element with it
	        temp = array[counter];
	        array[counter] = array[index];
	        array[index] = temp;
	    }

	    return array;

	} // end shuffle function

	var functionFighters = [];

	var index = 0;

	function chooseFighters() // choose 4 random fighters out of the array of 8 and then shuffle those 4
	{
		functionFighters = ['#pinkFighter', '#blueFighter', '#greenFighter', '#yellowFighter', '#orangeFighter', '#purpleFighter', '#whiteFighter', '#redFighter'];

		for (var x=0; x<4; x++)
		{
			index = getRandomInt(0,(7 - x));

			functionFighters.splice(index, 1);
		}

		shuffle(functionFighters);

		return functionFighters;

	} // end chooseFighters function

	var hideManNuggets;

	var stopHideManNuggetsInterval = true;

	function upAndDown(fighter) // move the fighters up and down 4 times and then pull them off screen
	{
		for (var x=0; x<4; x++)
		{
			$(fighter).animate({marginTop: getRandomInt(-350,-100) + 'px'}, 1000, 'easeInOutBack');
		}

		$(fighter).animate({marginTop: '-650px'}, 1000, 'easeInOutBack');

		if(stopHideManNuggetsInterval == false && wrongChoice == false && blockHideManNuggetsTimeoutForInitialFighters == false)
		{
			hideManNuggets = setTimeout(function(){$(fighter).hide();}, 5000);
		}
		
	} // end upAndDown function

	var initialFighters;

	function initialFightersFunction() // choose 4 initial fighters to be shown and arranged when the user first opens the screen
	{
		initialFighters = chooseFighters();
	
		$(initialFighters[0]).show().css({'margin-left': '75px', 'margin-top': '-550px'}).animate({marginTop: '-125px'}, 1000, 'easeInOutBack');
		$(initialFighters[1]).show().css({'margin-left': '275px', 'margin-top': '-550px'}).animate({marginTop: '-200px'}, 1000, 'easeInOutBack');
		$(initialFighters[2]).show().css({'margin-left': '475px', 'margin-top': '-550px'}).animate({marginTop: '-200px'}, 1000, 'easeInOutBack');
		$(initialFighters[3]).show().css({'margin-left': '650px', 'margin-top': '-550px'}).animate({marginTop: '-125px'}, 1000, 'easeInOutBack');
	
	
		$(initialFighters[0]).css('transform', 'rotateY(180deg)');
		$(initialFighters[1]).css('transform', 'rotateY(180deg)');
		

		return initialFighters;

	} // end initialFighters function

	function colorTranslate(color) // to translate colors into Hex# values for color of text displayed
	{
		var translatedColor;
			
		if ( color === "pink" || color === '#pinkFighter')
		{
			translatedColor = "#FF1EC0";
		}
		else if (color === "blue" || color === '#blueFighter')
		{
			translatedColor = "blue";
		}
		else if (color === "green" || color === '#greenFighter')
		{
			translatedColor = "#00ff9c";
		}
		else if (color === "orange" || color === '#orangeFighter')
		{
			translatedColor = "#FF9000";
		}
		else if (color === "purple" || color === '#purpleFighter')
		{
			translatedColor = "#BA1AC4";
		}
		else if (color === "white" || color === '#whiteFighter')
		{
			translatedColor = "white";
		}
		else if (color === "red" || color === '#redFighter')
		{
			translatedColor = "red";
		}
		else
		{
			translatedColor = "yellow";
		}
			
		return translatedColor;

	} // end colorTranslate function

	var colorWordsArray = [];

	var listArray = [];

	var temporaryWordsList = [];

	function createWordsList()
	{
		colorWordsArray = ['pink', 'blue', 'green', 'red', 'yellow', 'white', 'purple', 'orange'];

		listArray = [];

		for (var x=0; x<10; x++)
		{
			temporaryWordsList = shuffle(colorWordsArray);

			listArray.push.apply(listArray, temporaryWordsList);
		}

		return listArray;

	} // end createWordsList

	var stopRollingWords = false;
	var pauseRollingWords = false;
	var isRunning = true;

	var wordListCounter = 1;

	var wordsList = [];

	var firstWordDiv;

	var firstWord;

	var wordInterval;

	var wordDiv;

	var word;

	var stopWordInterval = false;

	function rollTheWords() // start the color words rolling on the bottom of the screen
	{
		wordsList = createWordsList();

		firstWordDiv = document.createElement('div');

		firstWordDiv.className = 'rollingWords';

		firstWordDiv.id = '0';

		firstWord = document.createTextNode(wordsList[0]);

		firstWordDiv.appendChild(firstWord);

		firstWordDiv.style.color = colorTranslate(wordsList[0]);

		document.getElementById('wordsContainer').appendChild(firstWordDiv);

		$(firstWordDiv).css({'margin-left': '840px'}).animate({marginLeft: '-500px'}, 30000, 'linear');

		wordListCounter = 1;

		wordInterval = setInterval(function()
		{
			if (!isRunning)
			{
				// do nothing
			}
			else
			{
				if (wordListCounter < wordsList.length)
				{
					wordDiv = document.createElement('div');

					wordDiv.className = 'rollingWords';

					wordDiv.id = wordListCounter.toString();

					console.log(wordDiv.id);

					word = document.createTextNode(wordsList[wordListCounter]);

					wordDiv.appendChild(word);

					wordDiv.style.color = colorTranslate(wordsList[wordListCounter]);

					document.getElementById('wordsContainer').appendChild(wordDiv);

					$(wordDiv).css({'margin-left': '840px'}).animate({marginLeft: '-500px'}, 30000, 'linear');	
				}
				else
				{
					stopWordInterval = true;

					return;
				}
				
				wordListCounter++;
			}	

		}, 3000);


		var listenToStopWordInterval = setInterval(function(){

			if(stopRollingWords == true || stopWordInterval == true)
			{
				clearInterval(wordInterval);
			}

		}, 200);

		$("#clockOut").click(function()
		{
			$(".rollingWords").animate({marginLeft: '-=120px'}, 1000, 'linear').pause();
			
			isRunning = false;

			document.getElementById('handcuffsSound').play();

			$("#clockOut").hide();

			$("#clockInAgain").show();
		});

		$("#clockInAgain").click(function()
		{
			isRunning = true;

			$(".rollingWords").animate({marginLeft: '-=900px'}, 20000, 'linear').resume();

			document.getElementById('handcuffsSound').play();

			$('#clockInAgain').hide();
			$('#iQuitEarly').show();
		});	

		return wordsList;

	} // end rollTheWords function

	var globalIndex = 0;
	var wrongChoice = false;

	var colorToCompare = [];
	var indexToString = "";


	function checkIfTheColorIsCorrect(array, fighterPicked, index)
	{
		colorToCompare = array[index];

		indexToString = index.toString();

		console.log(indexToString);

		if (colorToCompare == fighterPicked.substring(0, fighterPicked.length - 7))
		{
			$('#' + indexToString).stop(true, false).fadeOut('fast').remove();

			globalIndex++;

			document.getElementById('ordersCorrectlyFilled').innerHTML = globalIndex;

			wrongChoice = false;

			if (index === 79)
			{
				globalIndex = 0;

				$('#thirdBookieTalk').hide();
				$('#fourthBookieTalk').show();
			
				$('initialGreeting').show();

			}
		}
		else 
		{
			wrongChoice = true;
		}

		return wrongChoice;

	} // end checkIfTheColorIsCorrect function

	var fightersToPullUp = initialFightersFunction(); // var to set up the initial fighters and then pass the fighters to pull up before the produceFighters() interval starts

	var rollingColorsListArray = [];

	var pickedFightersFromFunction = [];

	var fighterPicked = "";

	var allowClicks;

	var interval;

	var stopManNuggetInterval = false;

	var listenToStopManNuggetInterval = setInterval(function(){

		if(stopManNuggetInterval == true || wrongChoice == true)
		{
			clearInterval(interval);
		}

	}, 200);

	function preventMultipleClicks(event)
	{
		fighterPicked = event.target.id;

		wrongChoice = checkIfTheColorIsCorrect(rollingColorsListArray, fighterPicked, globalIndex);

		console.log("wrongChoice = " + wrongChoice);

		if (wrongChoice == true)
		{
			document.getElementById('gameOverSound').play();

			$('.rollingWords').remove();

			$('#secondBookieTalk').hide();

			if (Number(globalIndex) >= Number(window.sessionStorage.longestStreak))
			{
				window.sessionStorage.longestStreak = Number(globalIndex);

				document.getElementById('initialGreeting').innerHTML = "Your Longest Streak Is Now: <span class='soFarText'>" + window.sessionStorage.longestStreak + "</span> !";
			}
			else
			{
				document.getElementById('initialGreeting').innerHTML = "Your Longest Streak Is Still: <span class='soFarText'>" + window.sessionStorage.longestStreak + "</span> !";	
			}

			$('#initialGreeting').show();

			document.getElementById('whatWrongColorWasPicked').innerHTML = "I just don't get it! Why would you pick <span style='color: " + colorTranslate(fighterPicked.substring(0, fighterPicked.length - 7)) + "'>" + fighterPicked.substring(0, fighterPicked.length - 7) + "</span> when I clearly asked for <span style='color: " + colorTranslate(rollingColorsListArray[globalIndex]) + "'>" + rollingColorsListArray[globalIndex] + "</span>?!!";

			$('#thirdBookieTalk').show();

			stopManNuggetInterval = true;

			clearTimeout(hideManNuggets);

			stopRollingWords = true;
			isRunning = false;

			$(".fighters").stop(true, false);
			$(".fighters").animate({marginTop: '1000px'}, 1000);

			/*if (pickedFightersFromFunction.length > 0)
			{
				for (var x=0; x<pickedFightersFromFunction.length; x++)
				{
					$(pickedFightersFromFunction[x]).stop(true,false);

					$(pickedFightersFromFunction[x]).animate({marginTop: '1000px'}, 1000);
				}
			}
			else
			{
				for (var x=0; x<fightersToPullUp.length; x++)
				{
					$(fightersToPullUp[x]).stop(true,false);

					$(fightersToPullUp[x]).animate({marginTop: '1000px'}, 1000);
				} 
			}*/

		} // end if wrongChoice == true
		else
		{
			document.getElementById('chaChing').play();

			$(this).stop(true,false);

			$(this).animate({marginTop: '1000px'}, 1000);

			window.sessionStorage.paycheckAmount = Number(window.sessionStorage.paycheckAmount) + getRandomInt(1,5);

			document.getElementById("tally_work").innerHTML = window.sessionStorage.paycheckAmount;

		}

	} // end preventMultipleClicks

	var blockHideManNuggetsTimeoutForInitialFighters = true;

	$('#clockIn').click(function() // start the process of the fighters bouncing and being replaced every 5 seconds once the clock in button is pushed
	{
		document.getElementById('handcuffsSound').play();

		$('#clockIn').hide();
		$("#clockOut").show();

		$('#initialGreeting').hide();

		stopManNuggetInterval = false;
		stopWordInterval = false;
		stopRollingWords = false;
	 	pauseRollingWords = false;
		isRunning = true;

		rollingColorsListArray = rollTheWords();
		
		allowClicks = _.debounce(preventMultipleClicks, 400, true);

		$('.fighters').off().on('click', allowClicks);

		for (var x=0; x<fightersToPullUp.length; x++) // start the initial fighters bouncing up and down immediately once the clock in button is clicked
		{
			upAndDown(fightersToPullUp[x]);
		}

		interval = setInterval(function produceFighters()
		{
			blockHideManNuggetsTimeoutForInitialFighters = false;
			stopHideManNuggetsInterval = false;

			pickedFightersFromFunction = chooseFighters();
		
			$(pickedFightersFromFunction[0]).show().css({'margin-left': '75px', 'margin-top': '-650px'});
			$(pickedFightersFromFunction[1]).show().css({'margin-left': '275px', 'margin-top': '-650px'});
			$(pickedFightersFromFunction[2]).show().css({'margin-left': '475px', 'margin-top': '-650px'});
			$(pickedFightersFromFunction[3]).show().css({'margin-left': '650px', 'margin-top': '-650px'});
		
		
			$(pickedFightersFromFunction[getRandomInt(0,3)]).css('transform', 'rotateY(180deg)');
			$(pickedFightersFromFunction[getRandomInt(0,3)]).css('transform', 'rotateY(360deg)');

			for (var x=0; x<pickedFightersFromFunction.length; x++)
			{
				upAndDown(pickedFightersFromFunction[x]);
			}

		}, 5100);

		

	}); // end clockIn click

	function resetWork()
	{
		stopHideManNuggetsInterval = true;
		blockHideManNuggetsTimeoutForInitialFighters = true;

		window.sessionStorage.betTracker = Number(window.sessionStorage.betTracker) + Number(window.sessionStorage.paycheckAmount);

		window.sessionStorage.paycheckAmount = 0;

		$('.fighters').off('click');

		paycheckVisual = '<span id="tally_work">' + window.sessionStorage.paycheckAmount + '</span>';
		$('.bank_work').html("<fieldset class='frame_work'><legend class='legend_work'>Your Paycheck:</legend>" + "<span id='firstDollarSign'>$ </span>" + paycheckVisual + "</fieldset>");
				
		$("#initialGreeting").show();
		document.getElementById('initialGreeting').innerHTML = "Your Longest Streak So Far Is: <span class='soFarText'>" + window.sessionStorage.longestStreak + "</span> !";

		$("#clockOut").hide();
		$("#clockInAgain").hide();
		$("#iQuitEarly").hide();

		if (resetForTryAgain == true && resetForQuit == false)
		{
			$("#firstBookieTalk").hide();
			$('#thirdBookieTalk').hide();
			$('#fourthBookieTalk').hide();

			$('#secondBookieTalk').show();

			$("#hairNet").hide();
			$("#clockIn").show();
		}

		if (resetForQuit == true && resetForTryAgain == false)
		{
			$('.rollingWords').remove();

			stopManNuggetInterval = true;

			clearTimeout(hideManNuggets);                            

			stopRollingWords = true;
			isRunning = false;

			$(".fighters").stop(true, false);
			$(".fighters").animate({marginTop: '1000px'}, 1000);

			$('#secondBookieTalk').hide();
			$('#thirdBookieTalk').hide();
			$('#fourthBookieTalk').hide();

			$("#firstBookieTalk").show();

			$("#hairNet").show();
		}


		globalIndex = 0;
		wrongChoice = false;

		document.getElementById('ordersCorrectlyFilled').innerHTML = globalIndex;

		setTimeout(function(){fightersToPullUp = initialFightersFunction();}, 400); // var to set up the initial fighters and then pass the fighters to pull up before the produceFighters() interval starts

	} // end resetWork function

	$("#hairNet").click(function()
	{
		document.getElementById('handcuffsSound').play();

		$("#firstBookieTalk").hide();

		$("#clockIn").show();

		$("#secondBookieTalk").show();
	});


	$('.fighters').css('cursor', 'pointer');

	var resetForTryAgain;
	var resetForQuit;

	$('#tryAgain').click(function()
	{
		document.getElementById('handcuffsSound').play();

		resetForTryAgain = true;
		resetForQuit = false;

		isRunning = false;

		resetWork();

		updateBankVisualLocationFromWork();
	});


	$('#iQuit, #goHome_work, #iQuitEarly').click(function()
	{
		document.getElementById('handcuffsSound').play();

		if (Number(globalIndex) >= Number(window.sessionStorage.longestStreak))
		{
			window.sessionStorage.longestStreak = Number(globalIndex);

			document.getElementById('initialGreeting').innerHTML = "Your Longest Streak Is Now: <span class='soFarText'>" + window.sessionStorage.longestStreak + "</span> !";
		}
		else
		{
			document.getElementById('initialGreeting').innerHTML = "Your Longest Streak Is Still: <span class='soFarText'>" + window.sessionStorage.longestStreak + "</span> !";	
		}

		resetForTryAgain = false;
		resetForQuit = true;

		isRunning = false;

		resetWork();

		reloadToLocationFromWork();

	});

}); // end document ready
