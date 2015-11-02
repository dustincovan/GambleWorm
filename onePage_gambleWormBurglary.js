$(document).ready(function()
{
  $('#bookie_burglary').sprite({ fps: 8, no_of_frames: 5 }); // Spritely.js plug-in functions

  $('.alert').hide();

  var houses = new Array(); // create new array for preloading

  $(".rollover, .gray, .gold").each(function(){
    var arrayImage = document.createElement('img');
    arrayImage.src = $(this).attr('rel');
    houses.push(arrayImage);
  });

  var img_src = ""; // image switch variables
  var new_src = "";

  var clicked = false;

  var blueClicked = false;
  var redClicked = false;
  var yellowClicked = false;
  var greenClicked = false;

  var arrested = false;

  var copsCloser = false; // triggered each time the player clicks on a new house to rob

  var alreadyTold = false; // to keep track of if the player has been told the cops are coming

  var calledTheCops = false; // trigger to start reducing the redCopBar

  var whichOne;
  var chance;

  var takeSoFar;

  window.sessionStorage.blueHouse = Number(getRandomInt(25, 100)); // creation of house base numbers upon loading page
  window.sessionStorage.redHouse = Number(getRandomInt(25, 100));
  window.sessionStorage.yellowHouse = Number(getRandomInt(25, 100));
  window.sessionStorage.greenHouse = Number(getRandomInt(25, 100));

  var blue = Number(window.sessionStorage.blueHouse);;
  var red = Number(window.sessionStorage.redHouse);
  var yellow = Number(window.sessionStorage.yellowHouse);
  var green = Number(window.sessionStorage.greenHouse);

  $('.gray, .gold').hide(); // hide tags used for preloading

  $('#second_burglary').hide();

  function getRandomInt (min, max) 
  {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  function reloadToLocationFromBurglary()
  {
    $('#redCopBar').stop(true,false);

    $('#redCopBar').animate({ width : '240px' }, 100);

    bankVisual_location = '<span id="tally">' + window.sessionStorage.betTracker + '</span>';
    $('.bank_location').html("<fieldset class='frame_location'><legend class='legend_location'>Your Bankroll:</legend>" + "<div id='locationBankrollHolder'><span id='firstDollarSign_location'>$ </span>" + bankVisual_location + "<span class='text'>  / of $25,000</span></div></fieldset>");

    $('#second_burglary').hide();
    $("#first_burglary").show();

    $('.alert').hide();

    window.sessionStorage.blueHouse = Number(getRandomInt(25, 100)); // creation of house base numbers upon loading page
    window.sessionStorage.redHouse = Number(getRandomInt(25, 100));
    window.sessionStorage.yellowHouse = Number(getRandomInt(25, 100));
    window.sessionStorage.greenHouse = Number(getRandomInt(25, 100));

    window.sessionStorage.burglaryTake = 0;

    takeSoFar = '<span id="take">' + window.sessionStorage.burglaryTake + '</span>';
    document.getElementById("burglarize").innerHTML = "<div>Here's your take so far:</div></br><div>$   " + takeSoFar + "</div>";

    clicked = false;

    blueClicked = false;
    redClicked = false;
    yellowClicked = false;
    greenClicked = false;
    
    stopCopBarInterval = false;
    arrested = false;

    copsCloser = false; // triggered each time the player clicks on a new house to rob

    alreadyTold = false; // to keep track of if the player has been told the cops are coming

    calledTheCops = false; // trigger to start reducing the redCopBar

    $("#blue").attr('src', "images/burglary_blue_house_75_tinyPNG.png" );
    $("#blue").attr('rel', "images/burglary_blue_house_selected_green_75_tinyPNG.png" );

    $("#red").attr('src', "images/burglary_red_house_75_tinyPNG.png" );
    $("#red").attr('rel', "images/burglary_red_house_selected_green_75_tinyPNG.png" );

    $("#green").attr('src', "images/burglary_green_house_75_tinyPNG.png" );
    $("#green").attr('rel', "images/burglary_green_house_selected_green_75_tinyPNG.png" );

    $("#yellow").attr('src', "images/burglary_yellow_house_75_tinyPNG.png" );
    $("#yellow").attr('rel', "images/burglary_yellow_house_selected_green_75_tinyPNG.png" );

    if (Number(window.sessionStorage.betTracker) < 25000)
    {
      $("#burglaryMainbody").hide();
      $("#locationMainbody").fadeIn();
    }
    else if (Number(window.sessionStorage.betTracker) >= 25000)
    {
      $("#burglaryMainbody").hide();
      $("#endGameMainbody").fadeIn();
    }

  } // end reloadToLocationFromBurglary function

  function updateBankVisualLocationFromBurglary()
  {
    bankVisual_location = '<span id="tally">' + window.sessionStorage.betTracker + '</span>';
    $('.bank_location').html("<fieldset class='frame_location'><legend class='legend_location'>Your Bankroll:</legend>" + "<div id='locationBankrollHolder'><span id='firstDollarSign_location'>$ </span>" + bankVisual_location + "<span class='text'>  / of $25,000</span></div></fieldset>");
  
  } // end updateBankVisualLocationFromBurglary function

  $('.rollover').hover(
    function(){
      if(!clicked)
      {
        // mouse over
        img_src = $(this).attr('src'); // get original image
        new_src = $(this).attr('rel'); // get rollover image
        $(this).attr('src', new_src); // switch images
        $(this).attr('rel', img_src); // switch images
      }
      else
      {
        $(this).attr("style", "opacity: 0.7");
      }
    }, 
    function(){
      if(!clicked)
      {
        // mouse out
        $(this).attr('src', img_src); // switch images back
        $(this).attr('rel', new_src); // switch images back
      }
      else
      {
        $(this).attr("style", "opacity: 1");
      }

      if ( !blueClicked && !redClicked && !yellowClicked && !greenClicked)
      {
        clicked = false;
      }
      else
      {
        clicked = true;
      }
  }); // end hover

  $('.rollover').click(function(){

    whichOne = $(this).attr('id');
    chance = getRandomInt(1,4);

    if(chance == 4)
    {
      calledTheCops = true;
    }

    if (calledTheCops)
    {
      $('#redCopBar').animate({ width : '-=' + Number(getRandomInt(40, 60))}, 2000);

      setTimeout(function(){

        if ( $('#redCopBar').width() < 1 && !arrested)
        { 
          document.getElementById('handcuffsSound').play();
          document.getElementById('taserSound').play();

          $('#busted').dialog(
          {
            dialogClass: "no-close",
            modal: true,
            title: 'The Cops Bark:',
            width: 400,
            buttons: [{
              text: "I'm Too Pretty For Prison!", 
              click: function(){

                window.sessionStorage.betTracker = 0;

                document.getElementById('sirenSound').pause();

                document.getElementById('gameOverSound').play();
                
                

                updateBankVisualLocationFromBurglary(); 
                reloadToLocationFromBurglary();

                $(this).dialog('close');  
              }
            }]
          }); // end busted

          arrested = true;

        } // end if
      }, 2100); // end setTimeout

      copsCloser = false;

      if (!alreadyTold)
      {
          
        document.getElementById('sirenSound').play();

        $('#copsCalled').dialog(
        {
          dialogClass: "no-close",
          modal: true,
          title: 'Your Bookie Hisses:',
          width: 400,
          buttons: [
          {
            text: "I'll Be Quick!", 
            click: function() {
              $(this).dialog('close');
            } 
          }]
        }); // end alert
      }

      alreadyTold = true;
    } // end if calledTheCops

    $('#first_burglary').hide();
    $('#second_burglary').show();

    if (whichOne == "blue" && !blueClicked )
    {
      document.getElementById('glassBreakingSound').play();

      $(this).attr('src', "images/burglary_blue_house_selected_gold_75_tinyPNG.png" );
      clicked = true;
      blueClicked = true;
      redClicked = false;
      yellowClicked = false;
      greenClicked = false;

      copsCloser = true;

      $('#red').attr('src', "images/burglary_red_house_selected_dark_75_tinyPNG.png");
      $('#yellow').attr('src', "images/burglary_yellow_house_selected_dark_75_tinyPNG.png" );
      $('#green').attr('src', "images/burglary_green_house_selected_dark_75_tinyPNG.png" );

      return false;
    }
    else if (whichOne == "blue" && blueClicked)
    {
      $(this).attr('src', "images/burglary_blue_house_75_tinyPNG.png" );
      $(this).attr('rel', "images/burglary_blue_house_selected_green_75_tinyPNG.png" );
      clicked = true;
      blueClicked = false;
      redClicked = false;
      yellowClicked = false;
      greenClicked = false;

      copsCloser = true;

      $('#red').attr('src', "images/burglary_red_house_75_tinyPNG.png");
      $('#yellow').attr('src', "images/burglary_yellow_house_75_tinyPNG.png" );
      $('#green').attr('src', "images/burglary_green_house_75_tinyPNG.png" );

      return false;
    }

    if (whichOne == "red" && !redClicked )
    {
      document.getElementById('glassBreakingSound').play();

      $(this).attr('src', "images/burglary_red_house_selected_gold_75_tinyPNG.png" );
      clicked = true;
      blueClicked = false;
      redClicked = true;
      yellowClicked = false;
      greenClicked = false;

      copsCloser = true;

      $('#blue').attr('src', "images/burglary_blue_house_selected_dark_75_tinyPNG.png");
      $('#yellow').attr('src', "images/burglary_yellow_house_selected_dark_75_tinyPNG.png" );
      $('#green').attr('src', "images/burglary_green_house_selected_dark_75_tinyPNG.png" );

      return false;
    }
    else if (whichOne == "red" && redClicked)
    {
      $(this).attr('src', "images/burglary_red_house_75_tinyPNG.png" );
      $(this).attr('rel', "images/burglary_red_house_selected_green_75_tinyPNG.png" );
      clicked = true;
      blueClicked = false;
      redClicked = false;
      yellowClicked = false;
      greenClicked = false;

      copsCloser = true;


      $('#blue').attr('src', "images/burglary_blue_house_75_tinyPNG.png");
      $('#yellow').attr('src', "images/burglary_yellow_house_75_tinyPNG.png" );
      $('#green').attr('src', "images/burglary_green_house_75_tinyPNG.png" );

      return false;
    }
    if (whichOne == "yellow" && !yellowClicked )
    {
      document.getElementById('glassBreakingSound').play();

      $(this).attr('src', "images/burglary_yellow_house_selected_gold_75_tinyPNG.png" );
      clicked = true;
      blueClicked = false;
      redClicked = false;
      yellowClicked = true;
      greenClicked = false;

      copsCloser = true;

      $('#blue').attr('src', "images/burglary_blue_house_selected_dark_75_tinyPNG.png");
      $('#red').attr('src', "images/burglary_red_house_selected_dark_75_tinyPNG.png" );
      $('#green').attr('src', "images/burglary_green_house_selected_dark_75_tinyPNG.png" );

      return false;
    }
    else if (whichOne == "yellow" && yellowClicked)
    {
      $(this).attr('src', "images/burglary_yellow_house_75_tinyPNG.png" );
      $(this).attr('rel', "images/burglary_yellow_house_selected_green_75_tinyPNG.png" );
      clicked = true;
      blueClicked = false;
      redClicked = false;
      yellowClicked = false;
      greenClicked = false;

      copsCloser = true;


      $('#blue').attr('src', "images/burglary_blue_house_75_tinyPNG.png");
      $('#red').attr('src', "images/burglary_red_house_75_tinyPNG.png" );
      $('#green').attr('src', "images/burglary_green_house_75_tinyPNG.png" );

      return false;
    }
    if (whichOne == "green" && !greenClicked )
    {
      document.getElementById('glassBreakingSound').play();

      $(this).attr('src', "images/burglary_green_house_selected_gold_75_tinyPNG.png" );
      clicked = true;
      blueClicked = false;
      redClicked = false;
      yellowClicked = false;
      greenClicked = true;

      copsCloser = true;

      $('#blue').attr('src', "images/burglary_blue_house_selected_dark_75_tinyPNG.png");
      $('#red').attr('src', "images/burglary_red_house_selected_dark_75_tinyPNG.png" );
      $('#yellow').attr('src', "images/burglary_yellow_house_selected_dark_75_tinyPNG.png" );

      return false;
    }
    else if (whichOne == "green" && greenClicked)
    {
      $(this).attr('src', "images/burglary_green_house_75_tinyPNG.png" );
      $(this).attr('rel', "images/burglary_green_house_selected_green_75_tinyPNG.png" );
      clicked = true;
      blueClicked = false;
      redClicked = false;
      yellowClicked = false;
      greenClicked = false;

      copsCloser = true;


      $('#blue').attr('src', "images/burglary_blue_house_75_tinyPNG.png");
      $('#red').attr('src', "images/burglary_red_house_75_tinyPNG.png" );
      $('#yellow').attr('src', "images/burglary_yellow_house_75_tinyPNG.png" );

      return false;
    }
    else
    {
      return false;
    }	
  }); // end rollover click

  $('.btn').button();

  window.sessionStorage.burglaryTake = 0; 

  takeSoFar = '<span id="take">' + window.sessionStorage.burglaryTake + '</span>';
  document.getElementById("burglarize").innerHTML = "<div>Here's your take so far:</div></br><div>$   " + takeSoFar + "</div>";
  document.getElementById("clickIt").innerHTML = "<div>Click the 'Burglarize!' button to rob the houses, bit by bit.</div></br><div>Click the 'Getaway!' button once you've lost your nerve!</div></br><div>Now, come on! Move it! It's time to get paid!</div>"; 

  document.getElementById("runDown").innerHTML = "<div>Here's that opportunity I was telling you about. Heh heh.</div></br><div>If you're ready to start earning, then pick a house and click it to get started.</div></br><div>But watch yourself in there! If the owner wakes up and catches you, you're dead!</div></br><div>And if the cops come, Psshht! You're on your own, pal!</div>";

  $('#leftButton').click(function()
  {
    if(!clicked)
    {
      $('#alert').dialog(
      {
        dialogClass: "no-close",
        modal: true,
        title: 'Your Bookie Growls:',
        width: 400,
        buttons: [
        {
          text: "Good Point!", 
          click: function() {
            $(this).dialog('close');
          } 
        }]
      }); // end alert
      return;
    } 

    blue = Number(window.sessionStorage.blueHouse);
    red = Number(window.sessionStorage.redHouse);
    yellow = Number(window.sessionStorage.yellowHouse);
    green = Number(window.sessionStorage.greenHouse);

    if (blue >= 0 && red >= 0 && yellow >= 0 && green >= 0)
    {
      window.sessionStorage.burglaryTake = Number(window.sessionStorage.burglaryTake) + Number(getRandomInt(20, 125));
    
      document.getElementById('chaChing').play();
    }
    else
    {
      document.getElementById('sirenSound').pause();
      document.getElementById('shotgunSound').play();

      $('#dead').dialog(
      {
        dialogClass: "no-close",
        modal: true,
        title: 'The Grim Reaper Giggles:',
        width: 400,
        buttons: [
        {
          text: "Mama!", 
          click: function() {

            document.getElementById('gameOverSound').play();

            

            updateBankVisualLocationFromBurglary(); 
            reloadToLocationFromBurglary();

            $(this).dialog('close');  
            
          } 
        }]
      }); // end dead dialog

      $('#redCopBar').stop(true,false);

      window.sessionStorage.betTracker = 0;    
    }

    takeSoFar = '<span id="take">' + window.sessionStorage.burglaryTake + '</span>';
    document.getElementById("burglarize").innerHTML = "<div>Here's your take so far:</div></br><div>$ " + takeSoFar + "</div>"; 
  
  }); // end leftButton click

  $('#leftButton').mousedown(function()
  {
    if ( calledTheCops )
    {
      $('#redCopBar').animate({ width : '-=' + Number(getRandomInt(40, 60))}, 2000);
    }

    if(blueClicked)
    {
      $('#blue').attr('src', "images/burglary_blue_house_selected_gold_robbed_75_tinyPNG.png" );

      window.sessionStorage.blueHouse = Number(window.sessionStorage.blueHouse) - Number(getRandomInt(1, 25));
    }
    else if (redClicked)
    {
      $('#red').attr('src', "images/burglary_red_house_selected_gold_robbed_75_tinyPNG.png" );

      window.sessionStorage.redHouse = Number(window.sessionStorage.redHouse) - Number(getRandomInt(1, 25));
    }
    else if (yellowClicked)
    {
      $('#yellow').attr('src', "images/burglary_yellow_house_selected_gold_robbed_75_tinyPNG.png" );

      window.sessionStorage.yellowHouse = Number(window.sessionStorage.yellowHouse) - Number(getRandomInt(1, 25));
    }
    else if (greenClicked)
    {
      $('#green').attr('src', "images/burglary_green_house_selected_gold_robbed_75_tinyPNG.png" );

      window.sessionStorage.greenHouse = Number(window.sessionStorage.greenHouse) - Number(getRandomInt(1, 25));
    }
  }); // end leftButton mousedown

  $('#leftButton').mouseup(function()
  {
    setTimeout(function(){

      if ( $('#redCopBar').width() < 1 && !arrested)
      { 
        document.getElementById('handcuffsSound').play();
        document.getElementById('taserSound').play();


        $('#busted').dialog(
        {
          dialogClass: "no-close",
          modal: true,
          title: 'The Cops Bark:',
          width: 400,
          buttons: [{
            text: "I'm Too Pretty For Prison!", 
            click: function(){

              window.sessionStorage.betTracker = 0;

              document.getElementById('sirenSound').pause();

              document.getElementById('gameOverSound').play();

              
              
              updateBankVisualLocationFromBurglary(); 
              reloadToLocationFromBurglary();
              
              $(this).dialog('close');
            }
          }]
        }); // end busted

        arrested = true;

      } // end if
    }, 2100);

    if(blueClicked)
    {
      $('#blue').attr('src', "images/burglary_blue_house_selected_gold_75_tinyPNG.png" );
    }
    else if (redClicked)
    {
      $('#red').attr('src', "images/burglary_red_house_selected_gold_75_tinyPNG.png" );
    }
    else if (yellowClicked)
    {
      $('#yellow').attr('src', "images/burglary_yellow_house_selected_gold_75_tinyPNG.png" );
    }
    else if (greenClicked)
    {
      $('#green').attr('src', "images/burglary_green_house_selected_gold_75_tinyPNG.png" );
    }
  }); // end mouseup

  $('#rightButton').click(function()
  {
    document.getElementById('handcuffsSound').play();
    
    window.sessionStorage.betTracker = Number(window.sessionStorage.betTracker) + Number(Number(window.sessionStorage.burglaryTake));

    window.sessionStorage.burglaryTake = 0;

    document.getElementById('sirenSound').pause();

    

    updateBankVisualLocationFromBurglary(); 
    reloadToLocationFromBurglary();

  }); // end rightButton click

}); // end document ready
