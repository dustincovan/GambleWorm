$(document).ready(function() 
{
	$('.alert').hide();
	
	$('#workIcon').sprite({ fps: 10, no_of_frames: 4 });
	$('#racingIcon').sprite({ fps: 12, no_of_frames: 4 }); // Spritely.js plug-in functions
	$('#burglaryIcon').sprite({ fps: 2, no_of_frames: 4 });
	
	
	bankVisual = '<span id="tally">' + window.sessionStorage.betTracker + '</span>';
	$('.bank_location').html("<fieldset class='frame_location'><legend class='legend_location'>Your Bankroll:</legend>" + "<div id='locationBankrollHolder'><span id='firstDollarSign_location'>$ </span>" + bankVisual + "<span class='text'>  / of $25,000</span></div></fieldset>");
	

	function updateRacesBankVisualFromLocation()
	{
		bankVisual_races = '<span id="tally">' + window.sessionStorage.betTracker + '</span>';
		$('.bank_races').html("<fieldset class='frame_races'><legend class='legend_races'>Your Bankroll:</legend>" + "<span id='firstDollarSign_races'>$ </span>" + bankVisual_races + "</fieldset>");
	
		maximumBet = Number(window.sessionStorage.betTracker);

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

	} // end updateRacesBankVisualFromLocation function
	

	$('#workIcon, #workText').click(function(){

		document.getElementById('footstepsSound').play();
		
		$("#locationMainbody").hide();
		$("#workMainbody").fadeIn('slow');
	});
	
	$('#racingIcon, #racesText').click(function(){

		if(Number(window.sessionStorage.betTracker) > 0)
		{
			document.getElementById('footstepsSound').play();

			updateRacesBankVisualFromLocation();

			$("#locationMainbody").hide();
			$("#racingMainbody").fadeIn('slow');

			window.sessionStorage.justStarted = 1;
		}
		else
		{
			document.getElementById('gameOverSound').play();

			$('#noEntry').dialog(
		    {
		       	dialogClass: "no-close",
		        modal: true,
		        title: 'Security Says:',
		        width: 400,
		        buttons: [{
		          text: "I'll Be Back!", 
		          click: function(){

		            $(this).dialog('close');
		          }
		        }]
		    }); // end noEntry
		}
		
	});
	
	$('#burglaryIcon, #burglaryText').click(function(){
		if(window.sessionStorage.burglaryAllowed == 1)
		{
			document.getElementById('footstepsSound').play();

			$("#locationMainbody").hide();
			$("#burglaryMainbody").fadeIn('slow');
		}
		else
		{
			document.getElementById('gameOverSound').play();

			$('#burglaryAlert').dialog(
		    {
		       	dialogClass: "no-close",
		        modal: true,
		        title: 'Neighborhood Watch Shouts:',
		        width: 400,
		        buttons: [{
		          text: "My Mistake!", 
		          click: function(){

		            $(this).dialog('close');
		          }
		        }]
		    }); // end noEntry
		}
		
	});
	
	$('.icon, .locationText').hover(
	function(){
		$(this).attr("style", "opacity: 0.8");
	},
	function(){
		$(this).attr("style", "opacity: 1");
	});

	
	

}); // end ready
