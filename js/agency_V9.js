(function($) {
  "use strict"; // Start of use strict
  toastr.options = {
    "closeButton": true,
    "debug": false,
    "newestOnTop": true,
    "progressBar": true,
    "positionClass": "toast-top-right",
    "preventDuplicates": false,
    "onclick": null,
    "showDuration": "5000",
    "hideDuration": "1000",
    "timeOut": "5000",
    "extendedTimeOut": "1000",
    "showEasing": "swing",
    "hideEasing": "linear",
    "showMethod": "fadeIn",
    "hideMethod": "fadeOut"
  };

  setTimeout(function () {
    $('.register-button').removeClass("animated");
    $('.register-button').removeClass("pulse");
  }, 12000);

  var isToastrTriggered = false;
  var count = 0;
  var countDownDate = new Date("July 12, 2020 23:59:59").getTime();
  setInterval(function(){
    var num = Math.random();
    var chance = 0.04;
    if(isToastrTriggered){
      chance = 0.0035;
    }
    if(num < chance){
      toastr["success"]("A person has just signed up for RunNUS ~ Run For a Cause 🏃‍♀️");
      isToastrTriggered = true;
    }
    count++
    if(count >= 30){
      $("#register").addClass("animated");
      $("#register").addClass("pulse");
      $("#register").addClass("btn-lg");
      setTimeout(function(){
        $("#register").removeClass("animated");
        $("#register").removeClass("pulse");
        $("#register").removeClass("btn-lg");
      },3000)
      count = 0;
    }

    //  // Get today's date and time
    //   var now = new Date().getTime();

    //   // Find the distance between now and the count down date
    //   var distance = countDownDate - now;

    //   // Time calculations for days, hours, minutes and seconds
    //   var days = Math.floor(distance / (1000 * 60 * 60 * 24));
    //   var hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    //   var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    //   var seconds = Math.floor((distance % (1000 * 60)) / 1000);

    //   // Display the result in the element with id="demo"
    //   document.getElementById("countdownTimer").innerHTML = days + "d " + hours + "h "
    //   + minutes + "m " + seconds + "s ";

    //   // If the count down is finished, write some text 
    //   if (distance < 0) {
    //     clearInterval(x);
    //     document.getElementById("countdownTimer").innerHTML = "EXPIRED";
    //   }
  },1000);

  // Smooth scrolling using jQuery easing
  $('a.js-scroll-trigger[href*="#"]:not([href="#"])').click(function() {
    if (location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '') && location.hostname == this.hostname) {
      var target = $(this.hash);
      target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
      if (target.length) {
        $('html, body').animate({
          scrollTop: (target.offset().top - 54)
        }, 1000, "easeInOutExpo");
        return false;
      }
    }
  });

  // Closes responsive menu when a scroll trigger link is clicked
  $('.js-scroll-trigger').click(function() {
    $('.navbar-collapse').collapse('hide');
  });

  // Activate scrollspy to add active class to navbar items on scroll
  $('body').scrollspy({
    target: '#mainNav',
    offset: 56
  });

  // Collapse Navbar
  var navbarCollapse = function() {
    if ($("#mainNav").offset().top > 100) {
      $("#mainNav").addClass("navbar-shrink");
    } else {
      $("#mainNav").removeClass("navbar-shrink");
    }
  };
  // Collapse now if page is not at top
  navbarCollapse();
  // Collapse the navbar when page is scrolled
  $(window).scroll(navbarCollapse);

  $('.zoom-tile')
    // tile mouse actions
    .on('mouseover', function(){
      $(this).children('.zoom-photo').css({'transform': 'scale('+ $(this).attr('data-scale') +')'});
    })
    .on('mouseout', function(){
      $(this).children('.zoom-photo').css({'transform': 'scale(1)'});
    })
    .on('mousemove', function(e){
      $(this).children('.zoom-photo').css({'transform-origin': ((e.pageX - $(this).offset().left) / $(this).width()) * 100 + '% ' + ((e.pageY - $(this).offset().top) / $(this).height()) * 100 +'%'});
    })
    // tiles set up
    .each(function(){
      $(this)
        // add a photo container
        .append('<div class="zoom-photo"></div>')
        // set up a background image for each tile based on data-image attribute
        .children('.zoom-photo').css({'background-image': 'url('+ $(this).attr('data-image') +')'});

        $(this).css({'height':  $("#reference").height() + 'px'});
    });

  $("#reference").hide();

  $("#3km").click(function(){
    openMap(3);
  });

  $("#5km").click(function(){
    openMap(5);
  });

  $("#10km").click(function(){
    openMap(10);
  });

  function openMap(num){
    $.confirm({
      title: 'Which area do you live?',
      titleClass: 'text-center',
      content: ''+
      '<div class="container">'+
        '<div class="row justify-content-center mt-2">'+
          '<div class="col-4 text-center">'+
            '<div class="btn btn-info" id="North" name="location">North</div>'+
          '</div>'+
        '</div>'+
        '<div class="row justify-content-center mt-4">'+
          '<div class="col-4 text-center">'+
            '<div class="btn btn-info" id="West" name="location">West</div>'+
          '</div>'+
          '<div class="col-4 text-center">'+
            '<div class="btn btn-info" id="Central" name="location">Central</div>'+
          '</div>'+
          '<div class="col-4 text-center">'+
            '<div class="btn btn-info" id="East" name="location">East</div>'+
          '</div>'+
        '</div>'+
        '<div class="row justify-content-center mt-4">'+
          '<div class="col-4 text-center">'+
            '<div class="btn btn-info" id="South" name="location">South</div>'+
          '</div>'+
        '</div>'+
      '</div>',
      type: 'orange',
      columnClass: 'medium',
      typeAnimated: true,
      onContentReady: function () {
        var jc = this;
        this.$content.find('[name="location"]').click(function(){
          var location = this.id;
          test(location,num);
          jc.$$cancel.trigger('click');
        });
      },
      buttons: {
        cancel: function () {
          
        },
      }
    });
  }

  function test(location,distance){
    console.log(location);
    console.log(distance);
    $.confirm({
      title: location + " " + distance + "km",
      titleClass: 'text-center',
      content: ''+
      '<div class="container">'+
        '<div class="row justify-content-center mt-2 mb-2">'+
          '<div class="col-md-8 text-center pr-0">'+
            '<div class="zoom-tiles">'+
              '<div class="zoom-tile zoom" data-scale="2" data-image="img/routes/'+location+'-'+distance +'km.jpg"></div>'+
              '<img id="reference" class="img-fluid" src="img/routes/'+location+'-'+distance +'km.jpg" style="visibility:hidden;">'+
            '</div>'+
          '</div>'+
          '<div class="col-md-4 pl-0">'+
            '<div id="text"></div>'+
          '</div>'+
        '</div>'+
      '</div>',
      type: 'orange',
      columnClass: 'xlarge',
      typeAnimated: true,
      onContentReady: function () {
        $('.zoom-tile')
        // tile mouse actions
        .on('mouseover', function(){
          $(this).children('.zoom-photo').css({'transform': 'scale('+ $(this).attr('data-scale') +')'});
        })
        .on('mouseout', function(){
          $(this).children('.zoom-photo').css({'transform': 'scale(1)'});
        })
        .on('mousemove', function(e){
          $(this).children('.zoom-photo').css({'transform-origin': ((e.pageX - $(this).offset().left) / $(this).width()) * 100 + '% ' + ((e.pageY - $(this).offset().top) / $(this).height()) * 100 +'%'});
        })
        // tiles set up
        .each(function(){
          $(this)
            // add a photo container
            .append('<div class="zoom-photo"></div>')
            // set up a background image for each tile based on data-image attribute
            .children('.zoom-photo').css({'background-image': 'url('+ $(this).attr('data-image') +')'});
    
            $(this).css({'height':  $("#reference").height() + 'px'});
        });
    
        $("#reference").hide();

        $("#text").html(getTextForRouter(location+distance));
      },
      buttons: {
        cancel: function () {
          
        },
      }
    });
  }

  function getTextForRouter(area){
    switch(area) {
      case 'North3':
        return North3();
        break;
      case 'South3':
        return South3();
        break;
      case 'East3':
        return East3();
        break;
      case 'West3':
        return West3();
        break;
      case 'Central3':
        return Central3();
        break;
      case 'North5':
        return North5();
        break;
      case 'South5':
        return South5();
        break;
      case 'East5':
        return East5();
        break;
      case 'West5':
        return West5();
        break;
      case 'Central5':
        return Central5();
        break;
      case 'North10':
        return North10();
        break;
      case 'South10':
        return South10();
        break;
      case 'East10':
        return East10();
        break;
      case 'West10':
        return West10();
        break;
      case 'Central10':
        return Central10();
        break;
      default:
        return;
        break;
    }
  }

  function Central3 (){
    var text;
    text = ''+
    '<ol>'+
      '<li>From Bishan MRT station, take Exit D (towards Bishan Stadium)</li>'+
      '<li>Walk straight past the bus interchange and the green field onto Bishan St 13</li>'+
      '<li>Turn left onto the street leading to Kuo Chuan Presbyterian Secondary School</li>'+
      '<li>Head straight until you enter the Kallang Park Connector (PC)</li>'+
      '<li>Start once you enter Kallang PC</li>'+
      '<li>Follow Kallang PC until you reach McDonald\'s in Bishan Park</li>'+
      '<li>Make a U-turn and return down the same path</li>'+
      '<li>Finish in front of Kuo Chuan Presbyterian Secondary School</li>'+
    '</ol>';
    return text;
  }

  function North3 (){
    var text;
    text = ''+
    '<ol>'+
    '<li>Start at Blk 571A Woodlands Ave 1. Directions to starting point:'+
    '<ul>'+
    '<li>By car:'+
    '<ul>'+
    '<li>Park at Blk 570 multi-storey carpark (WLW570)</li>'+
    '<li>Walk towards the Blk 571A coffee shop</li>'+
    '</ul>'+
    '</li>'+
    '<li>By bus:'+
    '<ul>'+
    '<li>Alight at the \'Opp Blk 507\' bus stop (bus stop code: 46979) along Woodlands Ave 1</li>'+
    '<li>Walk towards the Blk 571A coffee shop</li>'+
    '</ul>'+
    '</li>'+
    '</ul>'+
    '</li>'+
    '<li>Follow along Woodlands Ave 1 towards Woodlands Ave 2</li>'+
    '<li>Turn left onto Woodlands Ave 2</li>'+
    '<li>Turn left and run alongside Singapore Sports School</li>'+
    '<li>When you reach the end of Singapore Sports School, make a U-turn and return down the same path</li>'+
    '<li>Finish at Blk 571A Woodlands Ave 1</li>'+
    '</ol>';
    return text;
  }

  function South3 (){
    var text;
    text = ''+
    '<ol>'+
    '<li>Start at West Coast Park Carpark 1</li>'+
    '<li>Follow the loop around West Coast Park, turning around the Dog Run Park</li>'+
    '<li>Cross West Coast Ferry Road into the other part of West Coast Park, continuing straight with the BBQ Pits on the left</li>'+
    '<li>After the last BBQ Pit, turn right instead of going straight, and loop around</li>'+
    '<li>Return towards the starting point, passing the Toilets on the left</li>'+
    '<li>Cross West Coast Ferry Road, and head straight to finish at West Coast Park Carpark 1</li>'+
    '</ol>';
    return text;
  }

  function East3 (){
    var text;
    text = ''+
    '<ol>'+
    '<li>Start at Bedok Town Park entrance at the Bedok Reservoir MRT station. Directions to starting point:'+
    '<ul>'+
    '<li>By car:'+
    '<ul>'+
    '<li>Park at Bedok Reservoir Carpark A</li>'+
    '<li>Walk towards Bedok Reservoir MRT Exit A (the starting point is just behind the exit)</li>'+
    '</ul>'+
    '</li>'+
    '<li>By MRT:'+
    '<ul>'+
    '<li>Alight at Bedok Reservoir MRT station (Downtown Line)</li>'+
    '<li>Take Exit A (the starting point is just behind the exit)</li>'+
    '</ul>'+
    '</li>'+
    '</ul>'+
    '</li>'+
    '<li>Follow the path up and down Bedok Town Park as shown in the map</li>'+
    '<li>Finish at Bedok Town Park entrance</li>'+
    '</ol>';
    return text;
  }

  function West3 (){
    var text;
    text = ''+
    '<ol>'+
    '<li>Start on Jurong West Street 93 outside Jurong West Sports Centre, turn left and head towards Jurong West Street 63</li>'+
    '<li>Follow along Jurong West Street 63, then turn left onto Jurong West Street 61</li>'+
    '<li>Turn right onto Jurong West Street 62, then take a slight right and continue along the Neighbourhood Park, and continue straight until the bend in the road (opposite Jurong Medical Centre)</li>'+
    '<li>From there, make a U-turn and follow the route back to finish at Jurong West Sports Centre</li>'+
    '</ol>';
    return text;
  }

  function Central5 (){
    var text;
    text = ''+
    '<ol>'+
    '<li>From Bishan MRT station, take Exit D (towards Bishan Stadium)</li>'+
    '<li>Walk straight past the bus interchange and the green field onto Bishan St 13</li>'+
    '<li>Start at the edge of the green field (the intersection between Bishan St 13 and 14)</li>'+
    '<li>Turn left onto the street leading to Kuo Chuan Presbyterian Secondary School</li>'+
    '<li>Head straight until you enter Kallang Park Connector (PC)</li>'+
    '<li>Turn left and follow Kallang PC all the way until you hit Ang Mo Kio (AMK) PC</li>'+
    '<li>Right before crossing AMK Ave 1, make a U-turn and return down the same path</li>'+
    '<li>Finish at the field by Bishan MRT station</li>'+
    '</ol>';
    return text;
  }

  function North5 (){
    var text;
    text = ''+
    '<ol>'+
    '<li>Start at Blk 571A Woodlands Ave 1. Directions to starting point:'+
    '<ul>'+
    '<li>By car:'+
    '<ul>'+
    '<li>Park at Blk 570 multi-storey carpark (WLW570)</li>'+
    '<li>Walk towards the Blk 571A coffee shop</li>'+
    '</ul>'+
    '</li>'+
    '<li>By bus:'+
    '<ul>'+
    '<li>Alight at the Opp Blk 507 bus stop (bus stop code: 46979) along Woodlands Ave 1</li>'+
    '<li>Walk towards the Blk 571A coffee shop</li>'+
    '</ul>'+
    '</li>'+
    '</ul>'+
    '</li>'+
    '<li>Follow along Woodlands Ave 1 towards Woodlands Ave 2</li>'+
    '<li>Turn left onto Woodlands Ave 2</li>'+
    '<li>Turn left and run alongside Singapore Sports School</li>'+
    '<li>Continue following alongside SLE towards Woodlands Ave 12</li>'+
    '<li>Turn left onto Woodlands Ave 12</li>'+
    '<li>When you reach the zebra crossing with the sign Woodlands Ave 1, make a U-turn and return down the same path</li>'+
    '<li>Finish at Blk 571A Woodlands Ave 1</li>'+
    '</ol>';
    return text;
  }

  function South5 (){
    var text;
    text = ''+
    '<ol>'+
    '<li>Start at West Coast Park Carpark 1</li>'+
    '<li>Follow the loop around West Coast Park, turning around the Dog Run Park</li>'+
    '<li>Cross West Coast Ferry Road into the other part of West Coast Park, continuing straight with the BBQ Pits on the left</li>'+
    '<li>Cross Clementi Road to the next part of West Coast Park</li>'+
    '<li>Continue along the path and turn right after the Republic of Singapore Yacht Club</li>'+
    '<li>Follow the trail, with the West Coast Park Look-Out Deck on the left</li>'+
    '<li>Turn right before the Turning Point to Board Walk, and continue along the path</li>'+
    '<li>Follow the Path to Carpark 3, and go straight, keeping McDonald&rsquo;s on the left</li>'+
    '<li>Continue straight to finish at West Coast Park Carpark 1</li>'+
    '</ol>';
    return text;
  }

  function East5 (){
    var text;
    text = ''+
    '<ol>'+
    '<li>Start at Bedok Reservoir Carpark A</li>'+
    '<li>Go around the reservoir in an anti-clockwise direction as shown on the map</li>'+
    '<li>Go past Carpark A and follow alongside Bedok Reservoir Road</li>'+
    '<li>When you reach the &ldquo;Opp Bedok Reform Trg Ctr&rdquo; bus stop, make a U-turn and finish at Carpark A</li>'+
    '</ol>';
    return text;
  }

  function West5 (){
    var text;
    text = ''+
    '<ol>'+
    '<li>Start on Jurong West Street 93 outside Jurong West Sports Centre, turn left and head towards Jurong West Street 63</li>'+
    '<li>Follow along Jurong West Street 63, then turn left onto Jurong West Street 61</li>'+
    '<li>Turn right onto Jurong West Street 62, then take a slight right and continue along the Neighbourhood Park, and continue straight until the bend in the path (opposite Jurong Medical Centre)</li>'+
    '<li>Follow the bend and continue along the canal along the Jurong West Park Connector</li>'+
    '<li>Cross the road at Jurong West Street 63 and continue along the river</li>'+
    '<li>Enter Jurong Central Park, and turn left following the path</li>'+
    '<li>Turn right at the Dice Tower, and follow the path to the other side of the park</li>'+
    '<li>Continue straight along the path, turning right before the Jurong River</li>'+
    '<li>Go straight and leave the park through the same exit</li>'+
    '<li>Head back along the same route and finish outside the Jurong West Sports Centre</li>'+
    '</ol>';
    return text;
  }

  function Central10 (){
    var text;
    text = ''+
    '<ol>'+
    '<li>From Bishan MRT station, take Exit D (towards Bishan Stadium)</li>'+
    '<li>Walk straight past the bus interchange and the green field onto Bishan St 13</li>'+
    '<li>Start at the edge of the green field (the intersection between Bishan St 13 and 14)</li>'+
    '<li>Turn left onto the street leading to Kuo Chuan Presbyterian Secondary School</li>'+
    '<li>Head straight until you enter Kallang Park Connector (PC)</li>'+
    '<li>Turn left and follow Kallang PC all the way until you hit Ang Mo Kio (AMK) PC</li>'+
    '<li>Turn right onto AMK PC by cutting through Bishan-AMK Park and crossing AMK Ave 1</li>'+
    '<li>Follow AMK PC all the way until the edge of the Anderson Sec Sch field.</li>'+
    '<li>Make a U-turn and return down the same path</li>'+
    '<li>Finish at the field by Bishan MRT station</li>'+
    '</ol>';
    return text;
  }

  function North10 (){
    var text;
    text = ''+
    '<ol>'+
    '<li>From Woodlands MRT station, take Exit A to Woodlands Ave 7</li>'+
    '<li>Turn left onto Woodlands Ave 2 to Woodlands Community Club</li>'+
    '<li>Start at Woodlands Community Club and head towards Woodlands Ave 7</li>'+
    '<li>Turn left onto Woodlands Ave 7</li>'+
    '<li>Follow Woodlands Ave 7 all the way till Sungei Sembawang</li>'+
    '<li>Turn right onto Woodlands Ave 10</li>'+
    '<li>Head straight onto Woodlands Ave 12 and follow all the way until SLE</li>'+
    '<li>Turn right onto SLE</li>'+
    '<li>Follow the park connector then turn right onto Woodlands Ave 2</li>'+
    '<li>Turn left onto Woodlands Ave 5 and follow the curve</li>'+
    '<li>Turn right onto Woodlands Ave 2</li>'+
    '<li>Finish in front of Woodlands Community Club</li>'+
    '</ol>';
    return text;
  }

  function South10 (){
    var text;
    text = ''+
    '<ol>'+
    '<li>Start at West Coast Park Carpark 1</li>'+
    '<li>Follow the loop around West Coast Park, turning around the Dog Run Park</li>'+
    '<li>Cross West Coast Ferry Road into the other part of West Coast Park, continuing straight with the BBQ Pits on the left</li>'+
    '<li>Cross Clementi Road to the next part of West Coast Park</li>'+
    '<li>Continue along the path and turn right after the Republic of Singapore Yacht Club</li>'+
    '<li>Follow the trail, with the West Coast Park Look-Out Deck on the left</li>'+
    '<li>Turn right before the Turning Point to Board Walk, and continue along the path</li>'+
    '<li>Follow the Path to Carpark 3 and exit, turning left to continue along West Coast Highway, along the West Coast Park Connector</li>'+
    '<li>Follow the West Coast Park Connector until the Bridge near Ayer Rajah Sports Centre, and then make a U-turn</li>'+
    '<li>Follow the West Coast Park Connector back to West Coast Park until Carpark 3, and turn in</li>'+
    '<li>Follow the path, turning left and keeping McDonald\'s on the left</li>'+
    '<li>Continue straight to finish at West Coast Park Carpark 1</li>'+
    '</ol>';
    return text;
  }

  function East10 (){
    var text;
    text = ''+
    '<ol>'+
    '<li>Start at Bedok Reservoir Carpark A</li>'+
    '<li>Go around the reservoir in an anti-clockwise direction as shown on the map</li>'+
    '<li>Turn right out of Bedok Reservoir Park onto Bedok North Ave 3</li>'+
    '<li>Enter Bedok Town Park and follow the path down to Bedok North MRT station</li>'+
    '<li>When you reach Bedok North MRT station, make a U-turn and head back to the Bedok Town Park entrance</li>'+
    '<li>Exit Bedok Town Park and turn left onto Bedok North Ave 3</li>'+
    '<li>Turn right and follow alongside Bedok Reservoir Road</li>'+
    '<li>When you reach the traffic light opposite Tampines West MRT station, make a U-turn and finish at Carpark A</li>'+
    '</ol>';
    return text;
  }

  function West10 (){
    var text;
    text = ''+
      '<ol>'+
      '<li>Start on Jurong West Street 93 outside Jurong West Sports Centre, turn left and head towards Jurong West Street 63</li>'+
      '<li>Follow along Jurong West Street 63, then turn left onto Jurong West Street 61</li>'+
      '<li>Turn right onto Jurong West Street 62, then take a slight right and continue along the Neighbourhood Park, and continue straight until the bend in the path (opposite Jurong Medical Centre)</li>'+
      '<li>Follow the bend and continue along the canal along the Jurong West Park Connector</li>'+
      '<li>Cross the road at Jurong West Street 63 and continue along the river</li>'+
      '<li>Enter Jurong Central Park, and turn left following the path</li>'+
      '<li>Go straight at the Dice Tower, and follow the path going straight</li>'+
      '<li>Keeping McDonald\'s on the right, follow the path straight, and cross the Jurong River within the park</li>'+
      '<li>Follow the path and keep SAFRA Jurong on the right, then cross the river, and follow the Jurong Park Connector</li>'+
      '<li>Follow the river along the Jurong Park Connector, then cross the road at Jalan Boon Lay and continue along the river</li>'+
      '<li>Follow the river all the way to the Bridge at Corporation Road, then make a U-turn and head back along the Jurong Park Connector all the way back to Jurong Central Park</li>'+
      '<li>Turn left at the fork upon re-entering Jurong Central Park and exit onto Boon Lay Way</li>'+
      '<li>Cross the road and return along the same route all the way to finish at Jurong West Sports Centre</li>'+
      '</ol>';
    return text;
  }

})(jQuery); // End of use strict

