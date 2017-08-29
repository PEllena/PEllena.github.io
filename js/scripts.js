$(document).ready(function(){

// Smooth scrolling
  var $root = $('html, body');
  $('.navbar-nav a').click(function() {
    var href = $.attr(this, 'href');
    $root.animate({
        scrollTop: $(href).offset().top
    }, 500, function () {
        window.location.hash = href;
    });
    return false;
  });

// Stellar
  $.stellar();

// Tooltips
  $(function () {
  $('[data-toggle="tooltip"]').tooltip();
  });

// Skills diagram
  var o = {
    init: function(){
      this.diagram();
    },
    random: function(l, u){
      return Math.floor((Math.random()*(u-l+1))+l);
    },
    diagram: function(){
      var r = Raphael('diagram', 600, 600),
        rad = 73,
        defaultText = 'Skills',
        speed = 250;

      r.circle(300, 300, 85).attr({ stroke: 'none', fill: '#193340' });
      
      var title = r.text(300, 300, defaultText).attr({
        font: '26px Tahoma, Verdana, sans-serif',
        fill: '#fff'
      }).toFront();
      
      r.customAttributes.arc = function(value, color, rad){
        var v = 3.6*value,
          alpha = v == 360 ? 359.99 : v,
          random = o.random(91, 240),
          a = (random-alpha) * Math.PI/180,
          b = random * Math.PI/180,
          sx = 300 + rad * Math.cos(b),
          sy = 300 - rad * Math.sin(b),
          x = 300 + rad * Math.cos(a),
          y = 300 - rad * Math.sin(a),
          path = [['M', sx, sy], ['A', rad, rad, 0, +(alpha > 180), 1, x, y]];
        return { path: path, stroke: color }
      }
      
      $('.get').find('.arc').each(function(i){
        var t = $(this), 
          color = t.find('.color').val(),
          value = t.find('.percent').val(),
          text = t.find('.text').text();
        
        rad += 30;  
        var z = r.path().attr({ arc: [value, color, rad], 'stroke-width': 26 });
        
        z.mouseover(function(){
          this.animate({ 'stroke-width': 50, opacity: .75 }, 1000, 'elastic');
          if(Raphael.type != 'VML') //solves IE problem
          this.toFront();
          title.stop().animate({ opacity: 0 }, speed, '>', function(){
            this.attr({ text: text + '\n' + value + '%' }).animate({ opacity: 1 }, speed, '<');
          });
              }).mouseout(function(){
          this.stop().animate({ 'stroke-width': 26, opacity: 1 }, speed*4, 'elastic');
          title.stop().animate({ opacity: 0 }, speed, '>', function(){
            title.attr({ text: defaultText }).animate({ opacity: 1 }, speed, '<');
          }); 
              });
      });
      
    }
  }
  $(function(){ o.init(); });

  // Carousel position

  $('.carousel').carousel({
    interval: 3000,
    pause: "false"
  });

  var $item = $('.carousel .item');
  var $wHeight = $(window).height();

  $item.height($wHeight); 
  $item.addClass('slide-images');

  $('.carousel img').each(function() {
    var $src = $(this).attr('src');
    $(this).parent().css({
      'background-image' : 'url(' + $src + ')',
    });
    $(this).remove();
  });

  $(window).on('resize', function (){
    $wHeight = $(window).height();
    $item.height($wHeight);
  });


  // Work page animation
  
  var $animation_elements = $('.animation-element');
  var $window = $(window);

  function check_if_in_view() {
    var window_height = $window.height();
    var window_top_position = $window.scrollTop();
    var window_bottom_position = (window_top_position + window_height);
   
    $.each($animation_elements, function() {
      var $element = $(this);
      var element_height = $element.outerHeight();
      var element_top_position = $element.offset().top;
      var element_bottom_position = (element_top_position + element_height);
   
      //check to see if this current container is within viewport
      if ((element_bottom_position >= window_top_position) &&
          (element_top_position <= window_bottom_position)) {
        $element.addClass('animated fadeInRight');
      } else {
        $element.removeClass('animated fadeInRight');
      }
    });
  }

  $window.on('scroll resize', check_if_in_view);
  $window.trigger('scroll');
});