(function($) {
  "use strict"; // Start of use strict

  setTimeout(function () {
    $('.register-button').removeClass("animated");
    $('.register-button').removeClass("pulse");
  }, 12000);

  setInterval(function(){
    $("#register").addClass("animated");
    $("#register").addClass("pulse");
    $("#register").addClass("btn-lg");
    setTimeout(function(){
      $("#register").removeClass("animated");
      $("#register").removeClass("pulse");
      $("#register").removeClass("btn-lg");
    },3000);
  },30000);



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

       $(this).css({'height':  $("#reference").height() + 'px'})
   })

   $("#reference").hide();

})(jQuery); // End of use strict
