$(document).ready(function()
{
	/* ----------------------------------------------------------------------------------------------
	 * LIST OF INTERACTIONS
	 * ------------------------------------------------------------------------------------------- */
	
	/* INITIALISE MASONRY FOR THE GRID */
	var masonryOptions = { 
		itemSelector: '.div-gridbox-wrapper', // specifies the child elements in the grid
		columnWidth: '.grid-sizer', // width of grid-sizer sets the max width of a column
		percentPosition: true, // item width in percent, instead of pixel values
		horizontalOrder: true // (mostly) maintain horizontal left-to-right order.
	};
	var $grid = $('.div-page-content-grid').masonry(masonryOptions);
	$grid.masonry(masonryOptions);
	
	/* TOGGLE GRID FORMAT */
	var gridActive = true;
	$('#toolbar-grid-format').click(function(event)
	{
		if (gridActive) 
		{
			$grid.masonry('destroy'); // destroy
			$('#icon-grid-cascade').css('display', 'inline-block');
			$('#icon-grid-rows').css('display', 'none');
		}
		else 
		{
			$grid.masonry(masonryOptions); // re-initialize
			$('#icon-grid-cascade').css('display', 'none');
			$('#icon-grid-rows').css('display', 'inline-block');
		}
		gridActive = !gridActive;
	});
	
	/* HIGHLIGHT GRIDBOX WHEN CLICKING GRID COUNTER */
	var gridBox2Highlight = '';
	$('.li-sidebar-question').on('click mouseleave', function(event)
	{
		switch (event.type)
		{
			case 'click':
				var gridIndex = $(this).html() - 1;
				/* var selector = '.text-gridbox-numbering:contains("'+gridCount+'")'; */
				gridBox2Highlight = $('.div-gridbox').eq(gridIndex);
				gridBox2Highlight.addClass('outline-div-gridbox');
				// scroll to highlighted gridbox
				var scrollOffset = $(gridBox2Highlight).offset().top - 350;
				$('html, body').animate({scrollTop: scrollOffset}, 500);
				break;
			case 'mouseleave':
				if (gridBox2Highlight != '') 
				{
					gridBox2Highlight.removeClass('outline-div-gridbox');
					gridBox2Highlight = '';
				}
		}
	});
		
	/* SIDEBAR MENU ITEM ACTIVATE */
	$('.a-sidebar-menu-li').click(function(event)
	{
		// only activate if not a collapsible
		if (!$(this).hasClass('collapsible')) 
		{
			$('.a-sidebar-menu-li').removeClass('active');
			$(this).addClass('active');
		}
	});
	
	/* SIDEBAR NAVBAR ITEM ACTIVATION */
	$('.a-navbar-toggle-buttons').click(function(event)
	{
		$('.a-navbar-toggle-buttons').removeClass('active');
		$(this).addClass('active');
	});
	
	/* TOGGLE SIDEBAR AND STRETCH PAGE CONTENT */
	$('.btn-navbar-menu').click(function(event)
	{
		$('.div-sidebar-scroll').toggleClass('sidebar-close');
		$('.div-page-content-wrapper').toggleClass('stretch');
	});
	
	/* CLEAR TT SEARCHBAR WITH SEARCH BAR 'X' */
	$('.img-clear-tt-sidebar-search').click(function(event) 
	{ 
		clearSearchBar();
	});
	
	/* TRIGGER TT SEARCH BAR FROM SIDEBAR NAV */
	$('#btn-sidebar-search').click(function(event)
	{
		clearSearchBar();
	});
		
	/* TRIGGER TT SEARCH BAR FROM TOOLBAR */
	$('#toolbar-search').click(function(event)
	{
		if ($('.div-sidebar').hasClass('sidebar-close')) 
		{
			$('.div-sidebar').removeClass('sidebar-close');
			$('.div-page-content-wrapper').toggleClass('shrink');
		}
		$('.div-sidebar-content').children().css('display', 'none');
		$('.div-sidebar-navbar').children().removeClass('active');
		$('#btn-sidebar-search').addClass('active');		
		$('.div-sidebar-search').css('display', 'block');
		// select to search 'current section' category
		$('.a-sidebar-search-category').removeClass('checked');
		$('.div-tt-search-category-checkbox').removeClass('checked');
		$('#current-section-search-category').addClass('checked');
		$('#current-section-search-category').children('.div-tt-search-category-checkbox').addClass('checked');
		$('.form-sidebar-tt-search-text-field').select();
		updateSearchBarPlaceholder('Current Section');
	});
	
	/* TOGGLE TOOLBAR BUTTONS WITH 'DATA-TOOL-TOGGLE' ATTRIBUTES */
	$('.div-tool-dropdown-toggle').click(function(event)
	{
		var dataToolToggle = $(this).attr('data-tool-toggle');
		if (dataToolToggle == "1") $(this).toggleClass('pressed');
	});
	
	/* TOGGLE GRID ICONS OPACITY */
	$('.div-gridbox').mouseenter(function(event)
	{
		$(this).find('.div-gridbox-footer-buttons').fadeTo(200, 1);
		$(this).find('.div-selection-checkbox').fadeTo(200, 1);
	});
	$('.div-gridbox').mouseleave(function(event)
	{
		// only fadeout if grid-box hasn't been selected
		if (!$(this).hasClass('selected'))
		{
			$(this).find('.div-gridbox-footer-buttons').fadeTo(200, 0);
			$(this).find('.div-selection-checkbox').fadeTo(200, 0);
		}
	});
	
	/* SELECT GRID/CHAPTER BOX AND UPDATE STATUS TEXT */
	defaultGridStatus = '';
	selectedGridboxCount = 0;
	$('.div-selection-checkbox').click(function(event)
	{
		if ($(this).hasClass('selected')) 
		{
			selectedGridboxCount--;
			if (selectedGridboxCount == 0) $('.text-grid-status').html(defaultGridStatus);
			else $('.text-grid-status').html(selectedGridboxCount + ' Selected');
		} 
		else 
		{
		  selectedGridboxCount++;
			if (selectedGridboxCount == 1) defaultGridStatus = $('.text-grid-status').html();
			$('.text-grid-status').html(selectedGridboxCount + ' Selected');
		}
		$(this).toggleClass('selected');
		$(this).parent().toggleClass('selected');
		$(this).siblings('.div-gridbox-footer').toggleClass('selected');
	});
	
	/* SELECT TT SEARCH CATEGORY */
	$('.a-sidebar-search-category').click(function(event)
	{
		$('.a-sidebar-search-category').removeClass('checked');
		$('.div-tt-search-category-checkbox').removeClass('checked');
		$(this).addClass('checked');
		$(this).children('.div-tt-search-category-checkbox').addClass('checked');
		// update search bar placeholder
		var category = $(this).children('.text-tt-search-category').html();
		var newPlaceholder = category;
		clearSearchBar();
		updateSearchBarPlaceholder(newPlaceholder);
	});
	
  /* ----------------------------------------------------------------------------------------------
   * LIST OF FUNCTIONS USED BY INTERACTIONS
   * ------------------------------------------------------------------------------------------- */
	
	function clearSearchBar()
	{
		$('.form-sidebar-tt-search-text-field').val('');
		$('.form-sidebar-tt-search-text-field').select();
	}
	
	function updateSearchBarPlaceholder(text)
	{
		$('.form-sidebar-tt-search-text-field').attr('placeholder', text);
	}
});
	
/* 	// CHAPTER BOX ICONS APPEAR
	$('.a-chapter-item').mouseenter(function(event)
	{
		$(this).find('.img-chapter-info').fadeIn(200);
		$(this).find('.img-edit-chapter').fadeIn(200);
		$(this).find('.div-selection-checkbox').fadeTo(200, 1);
	});
	
	// GRID ICONS DISAPPEAR
	$('.a-chapter-item').mouseleave(function(event)
	{
		// only fadeout if grid-box hasn't been selected
		if (!$(this).hasClass('selected'))
		{
			$(this).find('.img-chapter-info').fadeOut(200);
			$(this).find('.img-edit-chapter').fadeOut(200);
			$(this).find('.div-selection-checkbox').fadeTo(200, 0);
		}
	}); */