$(document).ready(function() 
{
	if (!window.sessionStorage.betTracker || isNaN(Number(window.sessionStorage.betTracker)))
	{
		window.sessionStorage.betTracker = 0;
	}

	if (!window.sessionStorage.burglaryAllowed || isNaN(Number(window.sessionStorage.betTracker)))
	{
		window.sessionStorage.burglaryAllowed = 0;
	}

	if (!window.sessionStorage.justStarted || isNaN(Number(window.sessionStorage.justStarted)))
	{
		window.sessionStorage.justStarted = 0;
	}

	if (!window.sessionStorage.longestStreak || isNaN(Number(window.sessionStorage.longestStreak)))
	{
		window.sessionStorage.longestStreak = 0;
	}

	if (!window.sessionStorage.paycheckAmount || isNaN(Number(window.sessionStorage.paycheckAmount)))
	{
		window.sessionStorage.paycheckAmount = 0;
	}

	window.sessionStorage.gameStarted = 0;
	window.sessionStorage.betTracker = 0;
	window.sessionStorage.burglaryAllowed = 0;
	window.sessionStorage.tryWorkAgain = 0;
	window.sessionStorage.justStarted = 0;
	window.sessionStorage.longestStreak = 0;
	window.sessionStorage.paycheckAmount = 0;

	$('#greenWormStartScreen').sprite({ fps: 10, no_of_frames: 4 }); // Spritely.js plug-in functions
	$('#purpleWormStartScreen').sprite({ fps: 10, no_of_frames: 4 });
	$('#blueWormStartScreen').sprite({ fps: 10, no_of_frames: 4 });
	$('#orangeWormStartScreen').sprite({ fps: 10, no_of_frames: 4 });

	$('#amazonUnicornWalking_01').sprite({ fps: 8, no_of_frames: 7});
	$('#amazonUnicornWalking_02').sprite({ fps: 8, no_of_frames: 7});
	$('#amazonUnicornWalking_03').sprite({ fps: 8, no_of_frames: 7});
	$('#amazonUnicornWalking_04').sprite({ fps: 8, no_of_frames: 7});
	$('#amazonUnicornWalking_05').sprite({ fps: 8, no_of_frames: 7});
	$('#amazonUnicornWalking_06').sprite({ fps: 8, no_of_frames: 7});

	$('#introDollarSignLeft').sprite({ fps: 2, no_of_frames: 2});
	$('#introDollarSignRight').sprite({ fps: 2, no_of_frames: 2});
	$('#introDollarSignLeftTiny').sprite({ fps: 2, no_of_frames: 2});
	$('#introDollarSignRightTiny').sprite({ fps: 2, no_of_frames: 2});
	$('#introDollarSignMiddleTiny').sprite({ fps: 2, no_of_frames: 2});

	$('#startDollarSignLeftTiny').sprite({ fps: 2, no_of_frames: 2});
	$('#startDollarSignRightTiny').sprite({ fps: 2, no_of_frames: 2});
	$('#startDollarSignLeftTiny2').sprite({ fps: 2, no_of_frames: 2});
	$('#startDollarSignRightTiny2').sprite({ fps: 2, no_of_frames: 2});
	$('#startDollarSignLeftTiny3').sprite({ fps: 2, no_of_frames: 2});
	$('#startDollarSignRightTiny3').sprite({ fps: 2, no_of_frames: 2});

	$('#introBookie').sprite({ fps: 8, no_of_frames: 5 }); // Spritely.js plug-in functions

	$("#introTeaserButton2").hide();
	$("#introTeaserButton3").hide();
	$("#introTeaserButton4").hide();


	if (!window.sessionStorage.gameStarted || isNaN(Number(window.sessionStorage.gameStarted)))
	{
		window.sessionStorage.gameStarted = 0;
	}

	var bankVisual_location;
	var bankVisual_races;
	
	document.getElementById('startScreenSong').play();

	$("#startScreenMainbody").fadeIn();

	$(document).keyup(function(e) {
	    if (e.keyCode == 27) // escape key maps to keycode `27`
	    { 
	    	window.sessionStorage.gameStarted = 0;
	    	window.sessionStorage.betTracker = 0;
	    	window.sessionStorage.burglaryAllowed = 0;
	    	window.sessionStorage.tryWorkAgain = 0;
	    	window.sessionStorage.justStarted = 0;
	    	window.sessionStorage.longestStreak = 0;
	    	window.sessionStorage.paycheckAmount = 0;

	    	location.reload();   
	    }
	});

	$("#startGame").click(function()  
	{	
		document.getElementById('startScreenSong').pause();
		document.getElementById('chaChing').play();
		document.getElementById('introTeaserSound').play();

		window.sessionStorage.gameStarted = 1;

		$("#startScreenMainbody").hide();
		$("#introTeaserMainbody").fadeIn();
	});

	$("#introTeaserButton").click(function(){
	
		document.getElementById('chaChing').play();

		$("#introTeaserButton").hide();

		$("#introTeaserButton2").show();

	});

	$("#introTeaserButton2").click(function(){

		document.getElementById('chaChing').play();
	
		$("#introTeaserButton2").hide();

		$("#introTeaserButton3").show();

	});

	$("#introTeaserButton3").click(function(){

		document.getElementById('chaChing').play();
	
		$("#introTeaserButton3").hide();

		$("#introTeaserButton4").show();

	});

	$("#introTeaserButton4").click(function(){
	
		document.getElementById('introTeaserSound').pause();
		document.getElementById('footstepsSound').play();

		$("#introTeaserMainbody").hide();
		$("#locationMainbody").fadeIn();

	});

}); // end document ready
