/*
	A slider to animate content slides for a clicked topic
*/


(function() {
  var Slideshow, figureMaxWidths, offcanvasSwipe, topicSlider,
    __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };

  topicSlider = (function() {
    function topicSlider(minWidth) {
      this.fitText = __bind(this.fitText, this);
      this.slideVertical = __bind(this.slideVertical, this);
      this.slideHorizontal = __bind(this.slideHorizontal, this);
      this.toggleSliders = __bind(this.toggleSliders, this);
      var _this = this;

      _this = this;
      this._topic_container = $('.topic-container');
      this._topics = $('.topic');
      this._slider = $('.topic-slider');
      this._med = minWidth;
      this.fitText(this._topics.find('h3'), "32px");
      $(window).load(function() {
        return $(this).trigger('resize');
      });
      $(window).resize(function() {
        return _this.toggleSliders();
      });
    }

    topicSlider.prototype.toggleSliders = function() {
      var _this;

      _this = this;
      this._topics.unbind('click mouseenter mouseleave');
      if ($(window).width() > this._med) {
        this._topics.hover(function() {
          return $(this).parent().siblings().children('.topic').addClass('dimmed');
        }, function() {
          return $(this).parent().siblings().children('.topic').removeClass('dimmed');
        });
        this._topics.bind('click', function(e) {
          e.preventDefault();
          return _this.slideHorizontal($(this));
        });
        return this._topics.siblings('.topic-slides').css({
          'display': 'none'
        });
      } else {
        this._topics.bind('click', function(e) {
          e.preventDefault();
          return _this.slideVertical($(this));
        });
        this._slider.css({
          "margin": "0%"
        });
        return $('.topic-cloned, .slide-cloned').remove();
      }
    };

    topicSlider.prototype.slideHorizontal = function(topic) {
      var index, stopper, topic_cloned, topic_container, _this;

      _this = this;
      index = topic.parent().index();
      topic_container = this._topic_container.eq(index);
      topic_container.find('.slide').clone().addClass('slide-cloned').appendTo($('.topic-slider'));
      stopper = index * -25;
      topic_cloned = false;
      return this._slider.animate({
        "margin-left": "-75%"
      }, {
        "step": (function(marginLeft) {
          if (marginLeft <= stopper && !topic_cloned) {
            topic_container.clone().addClass('topic-cloned').appendTo('.topic-slider').children('.topic').addClass('is-active').prepend('<div class="dont-show">Close</div>');
            return topic_cloned = true;
          }
        }),
        "duration": 1000,
        "done": function() {
          return $('.topic-cloned').click(function() {
            return _this.resetHorizontal(stopper);
          });
        }
      });
    };

    topicSlider.prototype.resetHorizontal = function(stopper) {
      return this._slider.animate({
        "margin-left": "0%"
      }, {
        "step": (function(marginLeft) {
          if (marginLeft >= stopper) {
            return $('.topic-cloned').remove();
          }
        }),
        "done": function() {
          return $('.slide-cloned').remove();
        }
      });
    };

    topicSlider.prototype.slideVertical = function(topic) {
      topic.toggleClass('is-active');
      topic.parent().siblings().children().removeClass('is-active');
      topic.siblings('.topic-slides').toggle();
      return topic.parent().siblings().children('.topic-slides').hide();
    };

    topicSlider.prototype.fitText = function(element, maxFontSize) {
      return this._slider.find(element).fitText(0.8, {
        maxFontSize: maxFontSize
      });
    };

    return topicSlider;

  })();

  /*
    Animate a slideshow containing a "stage" area and thumbnails that span
    horizontally below the stage.  Clicking on a thumbnail will display a larger
    image along with its title and caption in the stage area.
  
    This class depends on jquery.event.move.js and jquery.event.swipe.js by Stephen Bend
  */


  Slideshow = (function() {
    function Slideshow(options) {
      this.setStage = __bind(this.setStage, this);
      this.moveRight = __bind(this.moveRight, this);
      this.moveLeft = __bind(this.moveLeft, this);
      this.listen = __bind(this.listen, this);
      this.draw = __bind(this.draw, this);
      var _this;

      _this = this;
      this.options = options;
      this._name = 'slideshow';
      this._slideshow = $('[data-' + this._name + ']');
      this._slides = this._slideshow.children('li');
      $(this._slideshow).wrap('<div class="' + this._name + '-container" />');
      this._stage = $('<a href="#" class="' + this._name + '-stage">');
      this._stage.css({
        'display': 'block',
        'position': 'relative'
      });
      this._stage.insertBefore(this._slideshow);
      $(this._slideshow).wrap('<div class="' + this._name + '" />');
      $(this._slideshow).wrap('<div class="' + this._name + '-inner" />');
      this._prev = $('<a href="#" class="' + this._name + '-prev">Previous</a>').insertAfter(this._slideshow);
      this._next = $('<a href="#" class="' + this._name + '-next">Next</a>').insertAfter(this._slideshow);
      this.setStage(this._slides.eq(0).find('img').data(), this._slides.eq(0).find('a').attr('href'));
      $(window).load(function() {
        return $(this).trigger('resize');
      });
      $(window).resize(function() {
        var bp, breakpoint_found, num, width, _ref;

        width = $(this).width();
        breakpoint_found = false;
        _ref = options.num_slides_viewable;
        for (bp in _ref) {
          num = _ref[bp];
          if (width < bp && !breakpoint_found) {
            _this.draw(num);
            _this.listen(num);
            if (bp <= options.hide_stage_before) {
              _this._stage.hide();
            } else {
              _this._stage.show();
            }
            breakpoint_found = true;
          }
        }
      });
    }

    /*
    		Measure and draw slideshow and slide items.
    		This will vary based on how many
    		slides are viewable.
    */


    Slideshow.prototype.draw = function(num_slides_viewable) {
      var container_width;

      container_width = this._slides.length / num_slides_viewable * 100;
      this._slideshow.css({
        width: this._slides.length / num_slides_viewable * 100 + '%'
      });
      this._slides.css({
        width: 100 / this._slides.length + '%'
      });
    };

    /*
    		Listen to next and previous clicks and swipes
    */


    Slideshow.prototype.listen = function(num_slides_viewable) {
      var amount,
        _this = this;

      _this = this;
      amount = -100 / num_slides_viewable + '%';
      this._slideshow.unbind('swipeleft');
      this._slideshow.unbind('swiperight');
      this._slides.unbind('click');
      this._prev.unbind('click');
      this._next.unbind('click');
      this._slideshow.bind('swipeleft', function() {
        return _this.moveLeft(amount);
      });
      this._slideshow.bind('swiperight', function() {
        return _this.moveRight(amount);
      });
      this._slideshow.on('movestart', function(e) {
        if ((e.distX > e.distY && e.distX < -e.distY) || (e.distX < e.distY && e.distX > -e.distY)) {
          return e.preventDefault();
        }
      });
      this._next.click(function(e) {
        e.preventDefault();
        return _this.moveLeft(amount);
      });
      this._prev.click(function(e) {
        e.preventDefault();
        return _this.moveRight(amount);
      });
      this._slides.click(function(e) {
        if ($(window).width() >= _this.options.hide_stage_before) {
          e.preventDefault();
          return _this.setStage($(this).find('img').data(), $(this).find('a').attr('href'));
        }
      });
    };

    /*
    		Animate the slider moving left a given amount
    		@param amount - A percentage to slide the items left
    */


    Slideshow.prototype.moveLeft = function(amount) {
      var _this;

      _this = this;
      this._slideshow.animate({
        "margin-left": amount
      }, function() {
        _this._slideshow.find('li:first-child').appendTo(_this._slideshow);
        return $(this).css({
          "margin-left": 0
        });
      });
    };

    /*
    		Animate the slider moving right a given amount
    		@param amount - A percentage to slide the items right
    */


    Slideshow.prototype.moveRight = function(amount) {
      this._slideshow.find('li:last-child').prependTo(this._slideshow);
      this._slideshow.css({
        "margin-left": amount
      });
      this._slideshow.animate({
        "margin-left": '0'
      });
    };

    /*
    		Load an image with it's caption into the staging area
    		@param data - An object containing the image, title, and caption
    */


    Slideshow.prototype.setStage = function(data, url) {
      var current_caption, current_img, img, _this;

      _this = this;
      current_caption = _this._stage.find('.' + this._name + '-caption');
      current_img = _this._stage.find('img');
      img = $("<img />").attr('src', data.slideshowImg).load(function() {
        var caption;

        if (this.complete) {
          if (current_img.length) {
            img.css({
              'position': 'absolute',
              'left': '0',
              'right': '0',
              'top': '0',
              'bottom': '0',
              'display': 'none'
            });
            img.fadeIn(function() {
              current_img.remove();
              return img.removeAttr('style');
            });
          }
          img.appendTo(_this._stage);
          _this._stage.attr('href', url);
          caption = $('<div class="' + _this._name + '-caption" />');
          caption.append('<h2>' + data.slideshowTitle + '</h2>');
          caption.append('<p>' + data.slideshowCaption + '</p>');
          caption.css({
            'position': 'absolute',
            'bottom': '0',
            'left': '0',
            'right': '0',
            'display': 'none'
          });
          current_caption.remove();
          caption.appendTo(_this._stage);
          return caption.fadeIn();
        }
      });
    };

    return Slideshow;

  })();

  figureMaxWidths = function() {
    return $(window).load(function() {
      return $('.fig-right, .fig-left').each(function(i, el) {
        var screenImage, theImage;

        screenImage = $(el).find('img');
        theImage = new Image();
        theImage.src = screenImage.attr("src");
        return $(el).css({
          'width': theImage.width + 'px'
        });
      });
    });
  };

  offcanvasSwipe = function(minWidth) {
    var offcanvas, offset;

    if (Modernizr.touch) {
      offcanvas = $('.l-offcanvas');
      offcanvas.unbind('swipeleft');
      offcanvas.unbind('swiperight');
      offcanvas.unbind('movestart');
      offcanvas.unbind('move');
      offcanvas.unbind('moveend');
      if ($(this).width() < minWidth) {
        offset = 0;
        offcanvas.bind('swipeleft', function() {
          return $(this).removeClass('sidebar-open');
        });
        offcanvas.bind('swiperight', function() {
          return $(this).addClass('sidebar-open');
        });
        offcanvas.bind('movestart', function(e) {
          offset = $('.l-main').offset().left - $(this).offset().left;
          $(this).addClass('notransition');
          if ((e.distX > e.distY && e.distX < -e.distY) || (e.distX < e.distY && e.distX > -e.distY)) {
            return e.preventDefault();
          }
        });
        offcanvas.bind('move', function(e) {
          if ($(this).hasClass('sidebar-open')) {
            if (e.distX < 0) {
              return $('.l-main').css({
                'margin-right': -1 * e.distX - offset + 'px'
              });
            }
          } else {
            if (e.distX > 0) {
              return $('.l-main').css({
                'margin-right': -1 * e.distX + 'px'
              });
            }
          }
        });
        return offcanvas.bind('moveend', function(e) {
          $('.l-main').removeAttr('style');
          return $(this).removeClass('notransition');
        });
      }
    }
  };
	

 	 /* date */
    $(document).ready(function() {
	  $('.d').each(function() {
        var nday = $(this).text();
		var uwfday = new Date(""+nday+"");
		var datestring = uwfday.getDate();
		$(this).text(datestring);
    	});
  	
          $('.m').each(function() {
    	var nmonth = $(this).text();
		var uwfn = new Date(""+nmonth+"");
    	
		var month=new Array();
		month[0]="Jan"; month[1]="Feb"; month[2]="Mar"; month[3]="Apr"; month[4]="May"; month[5]="Jun"; month[6]="Jul"; month[7]="Aug"; month[8]="Sept"; month[9]="Oct"; month[10]="Nov"; month[11]="Dec";
		var datestring = month[uwfn.getMonth()];
        $(this).text(datestring);
  	});
  	
          $('.hnews').each(function() {
    	var datetime = $(this).text();
		var uwfdatetime = new Date(""+datetime+"");
    	    	var month=new Array();
		month[0]="January"; month[1]="February"; month[2]="March"; month[3]="April"; month[4]="May"; month[5]="June"; month[6]="July"; month[7]="August"; month[8]="September"; month[9]="October"; month[10]="November"; month[11]="December";
    	var datestring = month[uwfdatetime.getMonth()] + " " + uwfdatetime.getDate() + ", " + uwfdatetime.getFullYear();
        $(this).text(datestring);
    	});
  });

  
    
  $(document).ready(function() {
    figureMaxWidths();
    $(this).foundation('dropdown placeholder clearing');
    $(this).foundation('orbit', {
      stack_on_small: true
    });
    $(this).foundation('reveal', {
      closed: function() {
        return $('#reveal-video iframe').attr('src', '#');
      }
    });
    if ($('.l-offcanvas')) {
      offcanvasSwipe(880);
    }
    if ($('.topic-slider').length) {
      new topicSlider(767);
    }
    if ($('.fittext').length) {
      $('.fittext').fitText(1, {
        maxFontSize: "34px"
      });
    }
    if ($('[data-slideshow]').length) {
      new Slideshow({
        num_slides_viewable: {
          450: 1,
          768: 2,
          880: 3,
          999999: 4
        },
        hide_stage_before: 768
      });
    }
    $('[data-reveal-id]').click(function(e) {
      var img;

      e.preventDefault();
      img = $(this).find('img');
      $('#reveal-title').text(img.attr('data-title'));
      $('#reveal-video iframe').attr('src', $(this).attr('href'));
      return $('#reveal-caption').text(img.attr('data-caption'));
    });
	/*TERMINALFOUR Code*/
	$(".sidenav a").each(function() {
	if($(this).parent().hasClass("sidenav")) {
     	 $(this).html("<h6>" + $(this).html() + "</h6>");
		};
	});	
	$('.sidenav h6').first().addClass('is-open').parent().next('ul').addClass('is-open');
			
    $('.sidenav h6').click(function(e) {
      e.preventDefault();
      return $(this).toggleClass('is-open').parent().next('ul').toggleClass('is-open');
    });
	/*TERMINALFOUR end*/
	
	/*TERMINALFOUR menu*/
    $(".sidenav a").each(function() {
		 if($(this).parent().hasClass("currentbranch0")){
		 $('.sidenav h6').first().removeClass('is-open').parent().next('ul').removeClass('is-open');
		 $(this).parent().html('<h6 class="is-open">' + $(this).html() + '</h6>').toggleClass('is-open').next('ul').toggleClass('is-open');
                 $('span.currentbranch1').parent().find('a').addClass('selected');
          	
        };  
                   
    });
    
    
	$('.sidenav span').first().click(function(e) {
      e.preventDefault();
      $(this).toggleClass('is-open').next('ul').toggleClass('is-open');
	  $(this).children().toggleClass('is-open');
    });
    
  
    
	/*TERMINALFOUR end*/
    
    /*CANDERSON Code Start*/
    
     $('.FAQ h6').click(function(e) {
      e.preventDefault();
      return $(this).toggleClass('FAQis-open').next('div').toggleClass('FAQis-open');
    });
    
    
    /*CANDERSON Code End*/    
    
    $('.menu-toggle').click(function(e) {
      e.preventDefault();
      return $('.menu-toggle, .menu-toggle-content').toggleClass('is-open');
    });
    $('.l-main-close').click(function(e) {
      e.preventDefault();
      return $('.l-offcanvas').toggleClass('sidebar-open');
    });
    $('.alert-close').click(function(e) {
      e.preventDefault();
      $('.alert-box, .l-home-bg .overlay').hide();
      return $('.hfeature').css('display', 'block');
    });
$('.l-feedback-button, .feedback-toggle').click(function(e) {
      e.preventDefault();
      return $('.l-feedback').toggleClass('is-open');
    });
    return $('.feedback-close').click(function(e) {
      e.preventDefault();
      return $('.l-feedback').removeClass('is-open');
    });
  });

}).call(this);


$(document).ready(function()
{
	//Add Inactive Class To All Collapsible Headers
	$('.collapsible-header').toggleClass('collapsible-inactive-header');
	
	//Open The First Collapsible Section When Page Loads
	//$('.collapsible-header').first().toggleClass('collapsible-active-header').toggleClass('collapsible-inactive-header');
	//$('.collapsible-content').first().slideDown().toggleClass('collapsible-open-content');
	
	// The Collapsible Effect
	$('.collapsible-header').click(function () {
		if($(this).is('.collapsible-inactive-header')) {
			$('.collapsible-active-header').toggleClass('collapsible-active-header').toggleClass('collapsible-inactive-header').next().slideToggle().toggleClass('collapsible-open-content');
			$(this).toggleClass('collapsible-active-header').toggleClass('collapsible-inactive-header');
			$(this).next().slideToggle().toggleClass('collapsible-open-content');
		}
		
		else {
			$(this).toggleClass('collapsible-active-header').toggleClass('collapsible-inactive-header');
			$(this).next().slideToggle().toggleClass('collapsible-open-content');
		}
	});
	
	return false;
});

$(document).ready(function() {
    $(".admPhone").text(function(i, text) {
        text = text.replace(/(\d{3})(\d{3})(\d{4})/, "($1) $2-$3");
        return text;
    });
});