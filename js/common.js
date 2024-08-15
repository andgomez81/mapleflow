$(function() {
	"use strict";

	// Toggle hidden navigation
	$('a.menu-open, a.menu-close').on('click', function() {
		var hiddenNav = $('.hidden-navigation'),
				overlay = $('.overlay');

		fixNavigation();
		hiddenNav.stop().toggleClass('is-open');
		hiddenNav.find('.submenu').hide();
		$(overlay).stop().fadeIn(250, function() {
			$(this).addClass('is-visible');
		});
	});

	$('.overlay').on('click', function() {
		var hiddenNav = $('.hidden-navigation');

		if($(this).hasClass('is-visible')) {
			hiddenNav.stop().toggleClass('is-open');
			$(this).stop().fadeOut(250);
			$(this).removeClass('is-visible');
		}
	});

	// Toggle search in page header
	$('.header-navigation').on('click', 'a.search', function() {
		$(this).closest('.header-navigation').find('.header-search').fadeIn(250);

		return false;
	});

	$('body').on('click', function(e) {
		var target = e.target,
				headerSearch = $('.header-search');

		if(!$(target).closest(headerSearch).length) {
			headerSearch.fadeOut(250);
		}
	});

	// Fix hidden navigation if window size is smaller than navigation container
	function fixNavigation() {
		var windowHeight = $(window).height(),
				navigationCont = $('.hidden-navigation').find('.navigation-content'),
				navigationSecondCont = $('.hidden-navigation-second').find('.navigation-content'),
				socialBar = $('.hidden-navigation-second').find('ul.social');

		if (windowHeight <= navigationCont.outerHeight()) {
			navigationCont.addClass('fixed');
		} else {
			navigationCont.removeClass('fixed');
		}
		if (windowHeight <= navigationSecondCont.outerHeight()) {
			navigationSecondCont.addClass('fixed');
			socialBar.addClass('fixed');
		} else {
			navigationSecondCont.removeClass('fixed');
			socialBar.removeClass('fixed');
		}
	}
	fixNavigation();

	new ResizeSensor($('.hidden-navigation, .hidden-navigation-second').find('.navigation-content'), function() {
    fixNavigation();
	});

	$(window).on('resize', function() {
		fixNavigation();
	});

	$('.hidden-navigation, .hidden-navigation-second').find('a').on('click', function(e) {
		var submenu = $(this).parent().find('.submenu');

		if (submenu.length) {
			submenu.stop();
			submenu.slideToggle();
			e.preventDefault();
		}
	});

	// Close default event on links
	$('a[href="#"], nav a.active').on('click', function(e) {
		e.preventDefault();
	});

	// Set progress to progress bars
	$(function() {
		$('.progress-item').each(function () {
			var progressNumber = parseInt($(this).find('.progress-number').text()),
					progressBar = $(this).find('.progress-bar');

			progressBar.attr('aria-valuenow', progressNumber).css({ width: progressNumber + '%' });
		});
	});

	// Set equal height to blocks
	function setEqualHegith(cont, contWithHegiht) {
		cont.height(contWithHegiht.outerHeight());
	}

	function setEqualHeightToContainers() {
		setEqualHegith($('section.section-video').find('.video-item'), $('section.section-video').find('.progress-items'));
		setEqualHegith($('section.section-second').find('.picture'), $('section.section-second').find('.list-items'));
		setEqualHegith($('section.section-who-we-are').find('.picture'), $('section.section-who-we-are').find('.text'));
		setEqualHegith($('section.section-map').find('.map'), $('section.section-map').find('.company-info'));
		setEqualHegith($('section.section-second').find('.mockup-parent'), $('section.section-second').find('.items-parent'));
	}
	setEqualHeightToContainers();

	new ResizeSensor(($('section.section-video').find('.progress-items'),$('section.section-second').find('.list-items')), function() {
    setEqualHeightToContainers();
	});

	$(window).on('resize', function() {
		if ($(this).width() > 992) {
			setEqualHeightToContainers();
		}
	});

	// Section with video
	$('.video-item').on('click', function() {
		var videoClip = $(this).find('video')[0];

		if(videoClip.paused) {
			$(this).addClass('is-playing');
			videoClip.play();
		} else {
			$(this).removeClass('is-playing');
			videoClip.pause();
		}
	});

	$('video').on('play', function() {
		var videoCont = $(this).closest('.video-item');

		$(videoCont).addClass('is-playing');
	});

	$('video').on('pause', function() {
		var videoCont = $(this).closest('.video-item');

		$(videoCont).removeClass('is-playing');
	});

	// Functions for slider
	function addIndexForEachSlide(slider) {
		var totalItems = slider.find('.slide').length;

		slider.find('.nav-number .nav-total').text('0' + totalItems);
		for (var i = 1; i <= totalItems; i++) {
			slider.find('.slide:nth-child('+ i +')').attr('data-index', i);
		}
	};

	function numberOfSlider(slider) {
		var	currentItem = slider.find('.owl-stage > div.active .slide').attr('data-index');

		if (!currentItem) {
			currentItem = 1
		}
    slider.find('.nav-number .nav-current').text('0' + currentItem);
	}
	
	function enableNavigationArrows(section, slider) {
		section.find('.nav-next').click(function() {
			slider.trigger('next.owl.carousel');
			numberOfSlider(section);
		});
		section.find('.nav-prev').click(function() {
			slider.trigger('prev.owl.carousel');
			numberOfSlider(section);
		});
		slider.on('dragged.owl.carousel', function() {
			numberOfSlider(section);
		});
	}

	// Initialize slider on section.section-first-slider
	var sectionFirstSlider = $('.wrapper-bridget section.section-first-slider'),
			firstSlider = sectionFirstSlider.find('.owl-carousel');

	addIndexForEachSlide(sectionFirstSlider);
	numberOfSlider(sectionFirstSlider);
	firstSlider.owlCarousel({
		items: 1,
		loop: true,
		dots: false,
	});
	enableNavigationArrows(sectionFirstSlider, firstSlider);

	// Initialize slider on section.section-second-slider
	var sectionSecondSlider = $('section.section-second-slider'),
			secondSlider = sectionSecondSlider.find('.owl-carousel');

	secondSlider.owlCarousel({
		autoWidth: true,
		center: true,
		loop: true,
		dots: false,
	});

	// Initialize slider on section.section-second-slider (team slider)
	var sectionTeamSlider = $('section.section-team'),
			teamSlider = sectionTeamSlider.find('.owl-carousel');

	addIndexForEachSlide(sectionTeamSlider);
	numberOfSlider(sectionTeamSlider);
	teamSlider.owlCarousel({
		items: 1,
		loop: true,
		dots: false,
		responsive : {
			992 : {
				items: 3
			}
		}
	});
	enableNavigationArrows(sectionTeamSlider, teamSlider);

	// Initialize slider on section.section-work
	var sectionWorkSlider = $('section.section-work'),
			workSlider = sectionWorkSlider.find('.owl-carousel');

	addIndexForEachSlide(sectionWorkSlider);
	numberOfSlider(sectionWorkSlider);
	workSlider.owlCarousel({
		items: 1,
		loop: true,
		dots: false,
		autoHeight:true
	});
	enableNavigationArrows(sectionWorkSlider, workSlider);

	// Initialize slider on header
	var sectionHeaderSlider = $('header.page-header-slider').find('.header-content'),
			headerSlider = sectionHeaderSlider.find('.owl-carousel');

	headerSlider.owlCarousel({
		items: 1,
		loop: true,
		dotClass: 'dot',
		dotsContainer: '.header-slider-dots'
	});
	enableNavigationArrows(sectionHeaderSlider, headerSlider);

	// Initialize text-slider on header
	var sectionHeaderTextSlider = $('header.page-header-text-slider').find('.header-bottom-content'),
			headerTextSlider = sectionHeaderTextSlider.find('.owl-carousel');

	headerTextSlider.owlCarousel({
		items: 1,
		loop: true,
		dotClass: 'dot',
		dotsContainer: '.text-slider-nav'
	});

	// Responsive grid layout on blog page
	$('.wrapper-bridget section.section-blog .posts').masonry({
		itemSelector: '.posts-item',
		columnWidth: '.posts-item',
		percentPosition: true
	});

	// Initialize slider on Benjamin section.section-first-slider
	var sectionFirstSlider = $('.wrapper-benjamin section.section-first-slider'),
			firstSlider = sectionFirstSlider.find('.owl-carousel');

	addIndexForEachSlide(sectionFirstSlider);
	numberOfSlider(sectionFirstSlider);
	firstSlider.owlCarousel({
		items: 1,
		loop: true,
		dots: true,
	});
	enableNavigationArrows(sectionFirstSlider, firstSlider);

	// Scroll to second section
	$('a.scroll-down').on('click', function() {
		var secondSection = $('header.page-header').next('section');

		if (secondSection.length) {
			$('body').animate({ scrollTop: secondSection.offset().top }, 1000);
		}

		return;
	});

	// Responsive grid layout on Ortego home page 2
	$('.wrapper-ortego section.section-popular-posts .posts').masonry({
		itemSelector: '.post-item',
		columnWidth: '.post-item',
		percentPosition: true
	});

	$('.wrapper-ortego section.section-new-posts .posts').masonry({
		itemSelector: '.post-item',
		columnWidth: '.post-item',
		percentPosition: true
	});

	// Modal window for images
	$('.gallery, .post-item, .chat-member').each(function() {
		$(this).magnificPopup({
			delegate: 'a.gallery-item',
			type: 'image',
			gallery: {
				enabled:true
			}
		});
	});

	// Show comments
	$('a.comment-count').on('click', function() {
		var comments = $(this).closest('.post-item').find('.post-comments');

		comments.toggle();
	});

	// Edit status
	$('button.edit-status').on('click', function() {
		var parent = $(this).closest('.status');

		parent.find('p').toggle();
		parent.find('textarea').toggle();
	});

	$(function() {
		var profileHeader = $('header.user-profile');

		profileHeader.find('textarea').val(profileHeader.find('.status p').text());
	});

	// Spellcheck=false for all inputs
	$('textarea, input').attr('spellcheck', 'false');

	// Publish new post
	$('a.new-post').on('click', function() {
		$(this).toggleClass('active');
		$(this).closest('.content-item').find('form').toggle();
	});

	// Textarea auto resize
	$(function() {
		var observe;
		if (window.attachEvent) {
			observe = function (element, event, handler) {
				element.attachEvent('on'+event, handler);
			};
		}
		else {
			observe = function (element, event, handler) {
				element.addEventListener(event, handler, false);
			};
		}
		$(function() {
			var text = document.querySelector('.autoresizable'),
					chatLastMessage = document.querySelector('.chat-content .chat-message:last-child');
			if(!text) {
				return;
			}
			function resize () {
				text.style.height = 'auto';
				text.style.height = text.scrollHeight+'px';
				// Change padding bottom on chat window
				if(chatLastMessage) {
					chatLastMessage.style.paddingBottom = text.offsetHeight+30+'px';
				}
			}
			function delayedResize () {
				window.setTimeout(resize, 0);
			}
			observe(text, 'change',  resize);
			observe(text, 'cut',     delayedResize);
			observe(text, 'paste',   delayedResize);
			observe(text, 'drop',    delayedResize);
			observe(text, 'keydown', delayedResize);
				
			resize();
		});
	});

	// Choose files buttons
	$(function() {
		var form = $('.publish-post, .chat-input').find('form'),
				images = form.find('.input-images'),
				videos = form.find('.input-videos'),
				filesContainer = form.find('.files-to-upload'),
				buttons = $('.publish-post, .chat-input').find('.choose-file-buttons'),
				chatLastMessage = $('.chat-content .chat-message:last-child');

		buttons.find('input').on('change', function(e) {
			var target = e.target,
					files = target.files,
					index = $(this).closest('form').index();

			if(images.get(0).files.length || videos.get(0).files.length) {

				$.each(files, function(i, file) {
					var reader = new FileReader();

					reader.readAsDataURL(file);

					reader.onload = function(e) {
						var fileContainer;

						if ($(target).hasClass('input-images')) {
							fileContainer = $('<div>'+
							'<img src="'+e.target.result+'">'+
							'<span class="remove-file"></span>'+
							'</div>');
						} else if ($(target).hasClass('input-videos')) {
							fileContainer = $('<div>'+
							'<div class="video-item"></div>'+
							'<span class="remove-file"></span>'+
							'</div>');
							console.log(fileContainer)
						}

						filesContainer.append(fileContainer);
					}
				});
				filesContainer.show();
			}
		});

		buttons.find('a.choose-images').on('click', function() {
			images.trigger('click')
		});

		buttons.find('a.choose-videos').on('click', function() {
			videos.trigger('click')
		});

		form.on('click', 'span.remove-file', function() {
			$(this).closest('div').remove();

			if(!filesContainer.children().length) {
				filesContainer.hide();
			}
		});
	});

	$('.add-video, .add-photo').find('a').on('click', function() {
		$(this).closest('form').find('input[type="file"]').trigger('click');
	});

	// Edit profile
	$(function() {
		// Custom checkbox
		$('.checkbox').on('click', function() {
			var input = $(this).find('input');

			$(this).toggleClass('checked');
			input.prop('checked', !input.prop('checked'));
		});

		// Custom radio button
		$('.checkbox.radio').on('click', function() {
			var input = $(this).find('input');

			$(this).parent().find('.checkbox').removeClass('checked').find('input').prop('checked', false);
			$(this).addClass('checked');
			input.prop('checked', true);
		});

		// Custom select for all selects with semantic ui dropdown plugin
		$('select').dropdown();
	});

	// Messages page
	$(function() {
		var messagesWindow = $('.messages-window');
		// Add class for choosen chat member
		$('.list-members').on('click', '.list-member', function() {
			$(this).closest('ul').find('.list-member').removeClass('active');
			$(this).addClass('active');
		});

		// Call list of members (window width size < 991)
		$('a.list-of-members').on('click', function() {
			$('.list-members').addClass('is-open');
			$('.chat-member').find('.background-overlay').fadeIn(250);
			return false;
		});

		// Delete conversation prevent default
		$('.list-member').on('click', 'button.delete-conversation', function() {
			return false;
		});

		// Close list of members
		messagesWindow.on('click', '.list-member, .chat-member', function() {
			$('.list-members').removeClass('is-open');
			$('.chat-member').find('.background-overlay').fadeOut(250);
		});
	});

	$('.themes .button').on('click', function() {
		$(this).parent().toggleClass('is-open');
	});

	$('.header-navigation li').on({
		mouseenter: function () {
			var submenu = $(this).find('.submenu');
			submenu.stop().fadeIn(250);
		},
		mouseleave: function () {
			var submenu = $(this).find('.submenu');
			submenu.stop().fadeOut(250);
		}
	});

	$('.header-navigation').on('click', 'a', function(e) {
		if ($(this).closest('li').find('.submenu').length) {
			e.preventDefault();
		}
	});

});
