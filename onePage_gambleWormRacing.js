$(document).ready(function() 
{ 
	$('#bookie_races').sprite({ fps: 8, no_of_frames: 5 }); // Spritely.js plug-in functions
	
	var maximumBet = Number(window.sessionStorage.betTracker); 
	
	$('.btn').button();
	
		$('#bet').spinner({
			min: 0,
			max: maximumBet,
			step: 10,
			spin: function( event, ui ) 
			{
				if (maximumBet % 10 != 0)
				{
					$( "#bet" ).spinner( "option", "step", 1 );
				}
			}
		}).val(maximumBet);
		
	
	$('#second_races').hide();
	$('#third_races').hide();
	$('.alert').hide();

	bankVisual_races = '<span id="tally">' + window.sessionStorage.betTracker + '</span>';
	$('.bank_races').html("<fieldset class='frame_races'><legend class='legend_races'>Your Bankroll:</legend>" + "<span id='firstDollarSign_races'>$ </span>" + bankVisual_races + "</fieldset>");
	
	
	$('#greenWorm').sprite({ fps: 10, no_of_frames: 4 }); // Spritely.js plug-in functions
	$('#purpleWorm').sprite({ fps: 10, no_of_frames: 4 });
	$('#blueWorm').sprite({ fps: 10, no_of_frames: 4 });
	$('#orangeWorm').sprite({ fps: 10, no_of_frames: 4 });

	function reloadToLocationFromRaces()
	{
		bankVisual_location = '<span id="tally">' + window.sessionStorage.betTracker + '</span>';
		$('.bank_location').html("<fieldset class='frame_location'><legend class='legend_location'>Your Bankroll:</legend>" + "<div id='locationBankrollHolder'><span id='firstDollarSign_location'>$ </span>" + bankVisual_location + "<span class='text'>  / of $25,000</span></div></fieldset>");

		if (Number(window.sessionStorage.betTracker) < 25000)
		{
			$("#racingMainbody").hide();
			$("#locationMainbody").fadeIn();
		}
		else if (Number(window.sessionStorage.betTracker) >= 25000)
		{
			$("#racingMainbody").hide();
			$("#endGameMainbody").fadeIn();
		}

	} // end reloadToLocationFromRaces function

	function updateBankVisualLocationFromRaces()
	{
		bankVisual_location = '<span id="tally">' + window.sessionStorage.betTracker + '</span>';
		$('.bank_location').html("<fieldset class='frame_location'><legend class='legend_location'>Your Bankroll:</legend>" + "<div id='locationBankrollHolder'><span id='firstDollarSign_location'>$ </span>" + bankVisual_location + "<span class='text'>  / of $25,000</span></div></fieldset>");
	
	} // end updateBankVisualLocationFromRaces function
	
	$('#oneMoreRace').click(function(){
		
		reset();

		updateBankVisualLocationFromRaces();
		
		if ( Number(window.sessionStorage.betTracker) < 1 && Number(window.sessionStorage.justStarted) != 0 )
		{
			$('#bookieOpportunity').dialog(
			{
				dialogClass: "no-close",
				modal: true,
				title: 'Your Bookie Whispers:',
				width: 400,
				buttons: [
				{
					text: "I'm Interested!", 
					click: function() {

					window.sessionStorage.burglaryAllowed = 1;

					$(this).dialog('close');

					document.getElementById('footstepsSound').play();

					$("#racingMainbody").hide();
					$("#burglaryMainbody").fadeIn();

					}
				},
				{
					text: "No, Thanks!",
					click: function() {

					$(this).dialog('close');

					updateBankVisualLocationFromRaces();
					
					reloadToLocationFromRaces();

					}
				}]
			});
		}
		else
		{
			document.getElementById('handcuffsSound').play();
		}
	});
	
	var greenW = 598; // Variables to hold colored lines' widths 
	var purpleW = 598;
	var blueW = 598;
	var orangeW = 598;

	var over = false; // Flag to check if any colored line's width has been reduced to 0 
    
	var greenWon = false;  // Flags to mark which worm has won 
	var purpleWon = false;
	var blueWon = false;
	var orangeWon = false;
	
	var bet;
	var winner;
	
	function moveBack(worm, linecolor)
	{
		$(worm).animate().stop(true);
		$(linecolor).animate().stop(true);
		
		$(worm).attr("style", "margin-left: 687px");
		$(linecolor).animate({ width : 598 });
		
		$(worm).clearQueue();
		$(linecolor).clearQueue();
	}
	
	function reset()
	{
		maximumBet = Number(window.sessionStorage.betTracker);
		
		console.log(maximumBet);
		
			$('#bet').spinner({
				min: 0,
				max: maximumBet,
				step: 10,
				spin: function( event, ui ) 
				{
					if (maximumBet % 10 != 0)
					{
						$( "#bet" ).spinner( "option", "step", 1 );
					}
				}
			}).val(maximumBet);
		
		bankVisual_races = '<span id="tally">' + window.sessionStorage.betTracker + '</span>';
		$('.bank_races').html("<fieldset class='frame_races'><legend class='legend_races'><h2>Your Bankroll:</h2></legend>" + "<span id='firstDollarSign_races'>$ </span>" + bankVisual_races + "</fieldset>");
		
		moveBack('#greenWorm', '#greenLine');
		moveBack('#purpleWorm', '#purpleLine');
		moveBack('#blueWorm', '#blueLine');
		moveBack('#orangeWorm', '#orangeLine');
		
		document.getElementById('yourPick').innerHTML = "";
		document.getElementById('yourBet').innerHTML = "";
		document.getElementById('winnerResult').innerHTML = "";
		document.getElementById('wonOrLostMoneyAmount').innerHTML = "";
		document.getElementById('frameSwitch').innerHTML = "";
		
		greenW = 598; // Variables to hold colored lines' widths 
		purpleW = 598;
		blueW = 598;
		orangeW = 598;
  
		over = false; // Flag to check if any colored line's width has been reduced to 0 
    
		greenWon = false;  // Flags to mark which worm has won 
		purpleWon = false;
		blueWon = false;
		orangeWon = false;
		
		bet = 0;
		winner = "";
		
		$('#third_races').hide();
		$('#second_races').hide();
		$('#first_races').show();
		
		$("#whip").unbind('click');
		
	}
	
	var colorText; // variable to hold future color translations
	
	function colorTranslate(color) // to translate colors into Hex# values for color of text displayed
	{
		var translatedColor;
		
		if ( color === "Green")
		{
			translatedColor = "#72FF00";
		}
		else if (color === "Purple")
		{
			translatedColor = "#BA1AC4";
		}
		else if (color === "Blue")
		{
			translatedColor = "#0089FF";
		}
		else
		{
			translatedColor = "#FF9000";
		}
		
		return translatedColor;
	}

	function moveWormAndLine(worm, linecolor, lineWidth)  // Moves the worm to the left and reduces the corresponding colored line by a random distance each time the user clicks the whip button
	{
		var distance = Math.floor((Math.random() * 50) + 10);
   
		$(worm).animate({ left : '-=' + distance});
		$(linecolor).animate({ width : '-=' + distance});
   
		return lineWidth - distance;
    
	}

	function winOrTie(w, x, y, z, w1, x1, y1, z1)  // Finds out if worm called with function was the only one to reach the finish line, or if other worms reached it, if the race was a tie or if one of the worms won by a nose
	{
		if ( x <= 0 || y <= 0 || z <= 0 )
		{
			if ( w <= x && w <= y && w <= z )
			{
				if ( x <= 0 )
				$(x1).animate({ width : 2});  // Increases the colored line from 0 or below to 2px to show that they did not win the race even though they crossed the finish line
				if ( y <= 0 )
				$(y1).animate({ width : 2});
				if ( z <= 0 )
				$(z1).animate({ width : 2});
         
				return true;
			}
			else
			{
				$(w1).animate({ width : 2}); 
         
				return false; 
			}
		}
		return true;
	}

	function choseWinner ( winChoice, dollars )
	{
		colorText = colorTranslate(winChoice);

		document.getElementById('chaChing').play();
		
		window.sessionStorage.betTracker = Number(window.sessionStorage.betTracker) + Number($('#bet').val());
		
		bankVisual_races = '<span id="tally">' + window.sessionStorage.betTracker + '</span>';
		$('.bank_races').html("<fieldset class='frame_races'><legend class='legend_races'><h2>Your Bankroll:</h2></legend>" + "<span id='firstDollarSign_races'>$ </span>" + bankVisual_races + "</fieldset>");
		
		$('#winnerResult').append("<p class='text' id='winnerResultParagraph' style='color: " + colorText + "'>" + winChoice + " is the winner!</p>");
		$('#wonOrLostMoneyAmount').append("<p class='text' id='wonOrLostMoneyAmountParagraph' style='color: " + colorText + "'>You won $" + dollars + " dollars!</p>");
		$('#frameSwitch').append("<legend class='legend_races'><h2>Nice!</h2></legend><div class='talk'><p class='text'>You just made $" + dollars + " bucks for swinging a whip!</p></div></br><div><p class='text'>Way to motivate that worm flesh!</p></div></br><div><p class='text'>Now, go place another bet before you lose your streak!</p></div>");   
		
		$('#second_races').hide();
		$('#third_races').show();
		
		var $elt = $('#oneMoreRace').attr('disabled', true);
		setTimeout(function ()
		{	
			$elt.attr('disabled', false);
		}, 1000);
		
	}

	function choseLoser ( winColor, winChoice, dollars )
	{
		colorText = colorTranslate(winColor);

		document.getElementById('gameOverSound').play();
		
		bankVisual_races = '<span id="tally">' + window.sessionStorage.betTracker + '</span>';
		$('.bank_races').html("<fieldset class='frame_races'><legend class='legend_races'><h2>Your Bankroll:</h2></legend>" + "<span id='firstDollarSign_races'>$ </span>" + bankVisual_races + "</fieldset>");
		
		$('#winnerResult').append("<p class='text' id='winnerResultParagraph' style='color: " + colorText + "'>" + winColor + " is the winner!</p>");
		$('#wonOrLostMoneyAmount').append("<p class='text' id='wonOrLostMoneyAmountParagraph' style='color: " + colorText + "'>You lost $" + dollars + " dollars!</p>");
		$('#frameSwitch').append("<legend class='legend_races'><h2>Ouch!</h2></legend><div class='talk'><p class='text'>I really thought " + winChoice + " had it that time! The lousy maggot!</p></div></br><div><p class='text'>Oh, well...</p></div></br><div><p class='text'>Better go place another bet to recoup your losses!</p></div>");   
		
		$('#second_races').hide();
		$('#third_races').show();
		
		var $elt = $('#oneMoreRace').attr('disabled', true);
		setTimeout(function ()
		{	
			$elt.attr('disabled', false);
		}, 1000);
		
	}

	$('#lockIn').click(function()  // User locks in bet amount and worm color choice by clicking button 
	{	
		bet = $('#bet').val();    
		winner = $('input[type = "radio"]:checked').val();  // Variables to store user's bet and worm color choice

		document.getElementById('handcuffsSound').play();
		
		if ($.isNumeric(bet)== false)  // Numeric validation alert for bet amount entered
		{
			$('#numbersOnlyAlert').dialog(
			{
				dialogClass: "no-close",
				modal: true,
				title: 'Your Bookie Says:',
				buttons: [
	          	{
	            	text: "All Right!", 
	            	click: function() {
	              		$(this).dialog('close');
	            	}	 
	          	}]
			});
			$('#bet').spinner("value", maximumBet);
			return false;   
		}

		if ( bet > Number(window.sessionStorage.betTracker) && Number(window.sessionStorage.betTracker) > 0 )
		{
			$('#betTooHighAlert').dialog(
			{
				dialogClass: "no-close",
				modal: true,
				title: 'Your Bookie Says:',
				buttons: [
	          	{
	            	text: "Well, Ok!", 
	            	click: function() {
	              		$(this).dialog('close');
	            	}	 
	          	}]
			});
			return false;     
		}
		else if ( (bet > Number(window.sessionStorage.betTracker) && Number(window.sessionStorage.betTracker) < 1) || Number(window.sessionStorage.betTracker) < 1 && Number(window.sessionStorage.justStarted) != 0 )
		{
			$('#bookieOpportunity').dialog(
			{
				dialogClass: "no-close",
				modal: true,
				title: 'Your Bookie Whispers:',
				width: 400,
				buttons: [
				{
					text: "I'm Interested!", 
					click: function() {
					
					window.sessionStorage.burglaryAllowed = 1;

					$(this).dialog('close');

					document.getElementById('footstepsSound').play();

					$("#racingMainbody").hide();
					$("#burglaryMainbody").fadeIn();

					}
				},
				{
					text: "No, Thanks!",
					click: function() {

					$(this).dialog('close');

					updateBankVisualLocationFromRaces();
					
					reloadToLocationFromRaces();

					}
				}]
			});
			return false;
		}

		colorText = colorTranslate(winner);
		
		$('#first_races').hide(); // Hide first message and buttons and show second set of messages 
		$('#second_races').show();
		$('#yourPick').append('<p class="text" id="yourPickCheer" style="color: ' + colorText + '">' + winner + '!</p>');
		$('#yourBet').append('<p class="text" id="yourBetCheer" style="color: ' + colorText + '">$' + bet + ' bucks!</p>');
		
		greenW = 598; // Variables to hold colored lines' widths 
		purpleW = 598;
		blueW = 598;
		orangeW = 598;
  
		over = false; // Flag to check if any colored line's width has been reduced to 0 
    
		greenWon = false;  // Flags to mark which worm has won 
		purpleWon = false;
		blueWon = false;
		orangeWon = false;

		$("#whip").click(function()  // User advances the worms and reduces the colored lines' widths by clicking the "Whip Those Worms!" button 
		{
			document.getElementById('whipSound').play();  // Whip sound plays with each button push 
  
			// begin moveWormAndLine function calls  

			if ( greenW > 0 && !over )
			{
				greenW = moveWormAndLine('#greenWorm', '#greenLine', greenW);
			}
       
			if ( purpleW > 0 && !over )
			{
				purpleW = moveWormAndLine('#purpleWorm', '#purpleLine', purpleW);
			} 
       
			if ( blueW > 0 && !over )
			{
				blueW = moveWormAndLine('#blueWorm', '#blueLine', blueW);
			}
       
			if ( orangeW > 0 && !over )
			{
				orangeW = moveWormAndLine('#orangeWorm', '#orangeLine', orangeW);
			}
  
			// end moveAndWormLine function calls

  
			if ( greenW <= 0 || purpleW <= 0 || blueW <= 0 || orangeW <= 0 )  // if at least one worm has reached the finish line
			{
				over = true;  // Flag the race as being over 
     
				$('#second_races').hide(); // Hide the second set of messages and whip button
 
    
				if ( greenW <= 0 ) // If green worm reached the finish line 
				{
					greenWon = winOrTie(greenW, purpleW, blueW, orangeW, '#greenLine', '#purpleLine', '#blueLine', '#orangeLine');
				}   
				else
				{
					greenWon = false;  // If green worm didn't reach the finish line, it loses
				}
     
				if ( purpleW <= 0 )  // If purple worm reached the finish line
				{
					purpleWon = winOrTie(purpleW, blueW, orangeW, greenW, '#purpleLine', '#blueLine', '#orangeLine', '#greenLine');
				}
				else
				{
					purpleWon = false;  // If purple worm didn't reach the finish line, it loses
				}
     
				if ( blueW <= 0 )  // If blue worm reached the finish line
				{
					blueWon = winOrTie(blueW, orangeW, greenW, purpleW, '#blueLine', '#orangeLine', '#greenLine', '#purpleLine');
				}	
				else
				{
					blueWon = false;  // If blue worm didn't reach the finish line, it loses 
				}
     
				if ( orangeW <= 0 )  // If orange worm reached the finish line
				{
					orangeWon = winOrTie(orangeW, greenW, purpleW, blueW, '#orangeLine', '#greenLine', '#purpleLine', '#blueLine');
				}
				else
				{
					orangeWon = false;  // If orange worm didn't reach the finish line, it loses
				}
  
     
				// Messages for if the worm the user picked wins
				if ( greenWon  && winner == "Green")
				{
					choseWinner( winner, bet );
				}
				else if ( purpleWon  && winner == "Purple")
				{
					choseWinner( winner, bet );
				}
				else if ( blueWon  && winner == "Blue")
				{
					choseWinner( winner, bet );
				}
				else if ( orangeWon  && winner == "Orange")
				{	
					choseWinner( winner, bet );
				}
				else // Messages if a worm other than the one the user picked wins
				{
					window.sessionStorage.betTracker = Number(window.sessionStorage.betTracker) - Number($('#bet').val());
					var color;
 
					if( greenWon )
					{	
						color = "Green";
						choseLoser(color, winner, bet);
					}
					else if( purpleWon )
					{
						color = "Purple";
						choseLoser(color, winner, bet);
					}
					else if( blueWon )
					{
						color = "Blue";
						choseLoser(color, winner, bet);
					}
					else if( orangeWon )
					{
						color = "Orange";
						choseLoser(color, winner, bet);
					}
					else  // Message in case of a tie
					{
					
						bankVisual_races = '<span id="tally">' + window.sessionStorage.betTracker + '</span>';
						$('.bank_races').html("<fieldset class='frame_races'><legend class='legend_races'><h2>Your Bankroll:</h2></legend>" + "<span id='firstDollarSign_races'>$ </span>" + bankVisual_races + "</fieldset>");
		
						$('#winnerResult').append("<p class='text' id='winnerResultParagraph'>We have a tie!</p>");
						$('#wonOrLostMoneyAmount').append("<p class='text' id='wonOrLostMoneyAmountParagraph'>You broke even!</p>");
						$('#frameSwitch').append("<legend class='legend_races'><h2>What The?!</h2></legend><div class='talk'><p class='text'>Well, this is embarrassing!</p></div></br><div><p class='text'>Looks like we've got a tie, so nobody wins!</p></div></br><div><p class='text'>Better just make another bet and forget this ever happened!</p></div>");   
		
						$('#second_races').hide();
						$('#third_races').show();
		
						var $elt = $('#oneMoreRace').attr('disabled', true);
						setTimeout(function ()
						{	
							$elt.attr('disabled', false);
						}, 1000);
		  
					}
				}
			}      
		});
	}); 

	$('#goHome_races').click(function()  
	{	
		document.getElementById('handcuffsSound').play();

		updateBankVisualLocationFromRaces();
		
		reloadToLocationFromRaces();
	});
      
});
