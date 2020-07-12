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

  // var today = new Date();
  // var signUpDate = new Date("2020-06-28T23:45:00");

  // if(today.getTime() > signUpDate.getTime()){
  //   var x = document.getElementsByName("register");
  //   var i;
  //   for (i = 0; i < x.length; i++) {
  //     x[i].setAttribute("disabled","false");
  //     $(x[i]).attr("target","_blank");
  //     $(x[i]).attr("href","http://www.bit.ly/runnus2020");
  //   }
  // } else {
  //   var x = document.getElementsByName("register");
  //   var i;
  //   for (i = 0; i < x.length; i++) {
  //     console.log("hello");
  //     x[i].addEventListener("click", function(){
  //       $.confirm({
  //         icon: 'fas fa-exclamation-triangle',
  //         title: 'Oh no!',
  //         closeIcon: true,
  //         content: '<div class="text-center">Sign ups will only be opened on 29th June, please visit us again</div>',
  //         type: 'orange',
  //         typeAnimated: true,
  //         backgroundDismiss: true,
  //         buttons: {
  //             close: function () {
  //             }
  //         }
  //       });
  //     });
  //   }
  // }

})(jQuery); // End of use strict

