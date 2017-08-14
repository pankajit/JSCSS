/*
 *
 * jqTransform
 * by mathieu vilaplana mvilaplana@dfc-e.com
 * Designer ghyslain armand garmand@dfc-e.com
 *
 *
 * Version 1.0 25.09.08
 * Version 1.1 06.08.09
 * Add event click on Checkbox and Radio
 * Auto calculate the size of a select element
 * Can now, disabled the elements
 * Correct bug in ff if click on select (overflow=hidden)
 * No need any more preloading !!
 * 
 ******************************************** */
 
(function($){
	var defaultOptions = {preloadImg:true};
	/*
	 * var jqTransformImgPreloaded = false;
	 * 
	 * var jqTransformPreloadHoverFocusImg = function(strImgUrl) { //guillemets
	 * to remove for ie strImgUrl =
	 * strImgUrl.replace(/^url\((.*)\)/,'$1').replace(/^\"(.*)\"$/,'$1'); var
	 * imgHover = new Image(); imgHover.src =
	 * strImgUrl.replace(/\.([a-zA-Z]*)$/,'-hover.$1'); var imgFocus = new
	 * Image(); imgFocus.src = strImgUrl.replace(/\.([a-zA-Z]*)$/,'-focus.$1'); };
	 */

	
	/***************************************************************************
	 * Labels
	 **************************************************************************/
	var jqTransformGetLabel = function(objfield){
		var selfForm = $(objfield.get(0).form);
		var oLabel = objfield.next();
		if(!oLabel.is('label')) {
			oLabel = objfield.prev();
			if(oLabel.is('label')){
				var inputname = objfield.attr('id');
				if(inputname){
					oLabel = selfForm.find('label[for="'+inputname+'"]');
				} 
			}
		}
		if(oLabel.is('label')){return oLabel.css('cursor','pointer');}
		return false;
	};
	
	/* Hide all open selects */
	/*var jqTransformHideSelect = function(oTarget){
		var ulVisible = $('.jqTransformSelectWrapper ul:visible');
		ulVisible.each(function(){
			var oSelect = $(this).parents(".jqTransformSelectWrapper:first").find("select").get(0);
			// do not hide if click on the label object associated to the select
			if( !(oTarget && oSelect.oLabel && oSelect.oLabel.get(0) == oTarget.get(0)) ){$(this).hide();}
		});
	};
	
	 * Check for an external click var jqTransformCheckExternalClick =
	 * function(event) { if
	 * ($(event.target).parents('.jqTransformSelectWrapper').length === 0) {
	 * jqTransformHideSelect($(event.target)); } };
	 */
	/*
	 * Apply document listener var jqTransformAddDocumentListener = function (){
	 * $(document).mousedown(jqTransformCheckExternalClick); };
	 *  /* Add a new handler for the reset action var jqTransformReset =
	 * function(f){ var sel; $('.jqTransformSelectWrapper select',
	 * f).each(function(){sel = (this.selectedIndex<0) ? 0 :
	 * this.selectedIndex; $('ul', $(this).parent()).each(function(){$('a:eq('+
	 * sel +')', this).click();});}); $('a.jqTransformCheckbox,
	 * a.jqTransformRadio', f).removeClass('jqTransformChecked');
	 * $('input:checkbox, input:radio',
	 * f).each(function(){if(this.checked){$('a',
	 * $(this).parent()).addClass('jqTransformChecked');}}); };
	 */

	/***************************************************************************
	 * Buttons
	 **************************************************************************/
	$.fn.jqTransInputButton = function(){
		return this.each(function(){
			
			if($(this).hasClass('iBtn')){
				var spriteClass = $(this).attr('value').split('_');
				var newBtn = $('<button id="'+ this.id +'" name="'+ this.name +'" type="'+ this.type +'" class="'+ this.className +' jqTransformButton" onclick="'+$(this).attr('onclick')+'" ><span><span><span class="iconSprite '+spriteClass[0]+'">'+ spriteClass[1] +'</span></span></span>')
				.hover(function(){newBtn.addClass('jqTransformButton_hover');},function(){newBtn.removeClass('jqTransformButton_hover')})
				.mousedown(function(){newBtn.addClass('jqTransformButton_click')})
				.mouseup(function(){newBtn.removeClass('jqTransformButton_click')});				
			}
			else if($(this).hasClass('disabledBtn')) {
				var newBtn = $('<button id="'+ this.id +'" name="'+ this.name +'" type="'+ this.type +'" class="'+ this.className +' jqTransformButton" onclick="'+$(this).attr('onclick')+'" ><span><span>'+ $(this).attr('value') +'</span></span>')
				.hover(function(){newBtn.addClass('jqTransformButton_hover');},function(){newBtn.removeClass('jqTransformButton_hover')})
				.mousedown(function(){newBtn.addClass('jqTransformButton_click')})
				.mouseup(function(){newBtn.removeClass('jqTransformButton_click')});
			}
			else{	
				var newBtn = $('<button id="'+ this.id +'" name="'+ this.name +'" type="'+ this.type +'" class="'+ this.className +' jqTransformButton" onclick="'+$(this).attr('onclick')+'" value="'+ $(this).attr('value') +'" ><span><span>'+ $(this).attr('value') +'</span></span>')
					.hover(function(){newBtn.addClass('jqTransformButton_hover');},function(){newBtn.removeClass('jqTransformButton_hover')})
					.mousedown(function(){newBtn.addClass('jqTransformButton_click')})
					.mouseup(function(){newBtn.removeClass('jqTransformButton_click')});
			}
			
			$(this).replaceWith(newBtn);
		});
	};
	
	/***************************************************************************
	 * Text Fields
	 **************************************************************************/
	$.fn.jqTransInputText = function(){
		return this.each(function(){
			var $input = $(this);
	
			if($input.hasClass('jqtranformdone') || !$input.is('input')) {return;}
			$input.addClass('jqtranformdone');
	
			/*var oLabel = jqTransformGetLabel($(this));
			oLabel && oLabel.bind('click',function(){$input.focus();});*/
	
			var inputSize=$input.width();
			if($input.attr('size')){
				inputSize = $input.attr('size')*10;
				$input.css('width','100%');
			}
			
			var searchHref= "";
			
			if($input.hasClass('search') && !$input.hasClass('text_box_no_border'))
			{
				if($input.attr('data-url') != null && typeof($input.attr('data-url')) != "undefined")
				{
					searchHref = $input.attr('data-url');
				}
				else
				{
					searchHref = "#";
				}
				$input.addClass("jqTransformInput").wrap('<div class="jqTransformInputWrapper search"><div class="jqTransformInputInner"><div></div><a class="search_icone" href="'+searchHref+'" onclick="'+$input.attr('data-onclick')+'"></a></div></div>');
			}
			else if($input.hasClass('search') && $input.hasClass('text_box_no_border')){
				if($input.attr('data-url') != null && typeof($input.attr('data-url')) != "undefined")
				{
					searchHref = $input.attr('data-url');
				}
				else
				{
					searchHref = "#";
				}
				$input.addClass("jqTransformInput").wrap('<div class="jqTransformInputWrapper search text_box_no_border"><div class="jqTransformInputInner"><div></div><a class="search_icone" href="'+searchHref+'" onclick="'+$input.attr('data-onclick')+'"></a></div></div>');
			}
			else if($input.hasClass('text_small') && !$input.hasClass('textDate') && !$input.hasClass('text_box_bt_shadow') && !$input.hasClass('text_box_no_border')){
				$input.addClass("jqTransformInput").wrap('<div class="jqTransformInputWrapper text_small"><div class="jqTransformInputInner"><div></div></div></div>');
			}
			else if($input.hasClass('text_small') && $input.hasClass('textDate') && !$input.hasClass('text_box_bt_shadow') && !$input.hasClass('text_box_no_border')){
				$input.addClass("jqTransformInput").wrap('<div class="jqTransformInputWrapper text_small textDate"><div class="jqTransformInputInner"><div></div></div></div>');
			}
			else if($input.hasClass('text_small') && $input.hasClass('text_box_bt_shadow')){
				$input.addClass("jqTransformInput").wrap('<div class="jqTransformInputWrapper text_small text_box_bt_shadow"><div class="jqTransformInputInner"><div></div></div></div>');
			}
			else if($input.hasClass('text_box_no_border') && $input.hasClass('text_small')){
				$input.addClass("jqTransformInput").wrap('<div class="jqTransformInputWrapper text_small text_box_no_border"><div class="jqTransformInputInner"><div></div></div></div>');
			}
			else if($input.hasClass('text_box_no_border')){
				$input.addClass("jqTransformInput").wrap('<div class="jqTransformInputWrapper text_box_no_border"><div class="jqTransformInputInner"><div></div></div></div>');
			}
			else{
				$input.addClass("jqTransformInput").wrap('<div class="jqTransformInputWrapper"><div class="jqTransformInputInner"><div></div></div></div>');
			}
			
			var $wrapper = $input.parent().parent().parent();
			$wrapper.css("width", "100%");
			$input
				.focus(function(){$wrapper.addClass("jqTransformInputWrapper_focus");})
				.blur(function(){$wrapper.removeClass("jqTransformInputWrapper_focus");})
				.hover(function(){$wrapper.addClass("jqTransformInputWrapper_hover");},function(){$wrapper.removeClass("jqTransformInputWrapper_hover");})
			;
	
			/* If this is safari we need to add an extra class */
			$.browser.safari && $wrapper.addClass('jqTransformSafari');
			$.browser.safari && $input.css('width','100%');
			this.wrapper = $wrapper;
			
		});
	};
	
	/***************************************************************************
	 * Check Boxes
	 **************************************************************************/	
	$.fn.jqTransCheckBox = function(){
		return this.each(function(){
			if($(this).hasClass('jqTransformHidden')) {return;}

			var $input = $(this);
			var inputSelf = this;

			// set the click on the label
			var oLabel=jqTransformGetLabel($input);
			oLabel && oLabel.click(function(){aLink.trigger('click');});
			
			var aLink = $('<a href="#" class="jqTransformCheckbox"></a>');
			if($input.hasClass('checkbox_small')){
				// wrap and add the link
				$input.addClass('jqTransformHidden').wrap('<span class="jqTransformCheckboxWrapper checkbox_small"></span>').parent().prepend(aLink);
			}
			else{
				// wrap and add the link
				$input.addClass('jqTransformHidden').wrap('<span class="jqTransformCheckboxWrapper"></span>').parent().prepend(aLink);
			}
			// on change, change the class of the link
			$input.change(function(){
				this.checked && aLink.addClass('jqTransformChecked') || aLink.removeClass('jqTransformChecked');
				return true;
			});
			// Click Handler, trigger the click and change event on the input
			aLink.click(function(){
				// do nothing if the original input is disabled
				if($input.attr('disabled')){return false;}
				// trigger the envents on the input object
				$input.trigger('click').trigger("change");	
				return false;
			});

			// set the default state
			this.checked && aLink.addClass('jqTransformChecked');		
		});
	};
	/***************************************************************************
	 * Radio Buttons
	 **************************************************************************/	
	$.fn.jqTransRadio = function(){
		return this.each(function(){
			if($(this).hasClass('jqTransformHidden')) {return;}

			var $input = $(this);
			var inputSelf = this;
				
			oLabel = jqTransformGetLabel($input);
			oLabel && oLabel.click(function(){aLink.trigger('click');});
	
			var aLink = $('<a href="#" class="jqTransformRadio" rel="'+ this.name +'"></a>');
			$input.addClass('jqTransformHidden').wrap('<span class="jqTransformRadioWrapper"></span>').parent().prepend(aLink);
			
			$input.change(function(){
				inputSelf.checked && aLink.addClass('jqTransformChecked') || aLink.removeClass('jqTransformChecked');
				return true;
			});
			// Click Handler
			aLink.click(function(){
				if($input.attr('disabled')){return false;}
				$input.trigger('click').trigger('change');
	
				// uncheck all others of same name input radio elements
				$('input[name="'+$input.attr('name')+'"]',inputSelf.form).not($input).each(function(){
					$(this).attr('type')=='radio' && $(this).trigger('change');
				});
	
				return false;					
			});
			// set the default state
			inputSelf.checked && aLink.addClass('jqTransformChecked');
		});
	};
	
	
	$.fn.jqTransform = function(options){
		var opt = $.extend({},defaultOptions,options);
		
		/* each form */
		 return this.each(function(){
			var selfForm = $(this);
			if(selfForm.hasClass('jqtransformdone')) {return;}
			selfForm.addClass('jqtransformdone');
			
			$('input:submit, input:reset, input[type="button"], button:button, button[type="button"], button:submit, button[type="submit"], button:reset, button[type="reset"]', this).jqTransInputButton();			
			$('input:text, input:password', this).jqTransInputText();			
			$('input:checkbox', this).jqTransCheckBox();
			$('input:radio', this).jqTransRadio();
			/* $('textarea', this).jqTransTextarea(); */
			
			/*
			 * if( $('select', this).jqTransSelect().length > 0
			 * ){jqTransformAddDocumentListener();}
			 * selfForm.bind('reset',function(){var action =
			 * function(){jqTransformReset(this);}; window.setTimeout(action,
			 * 10);});
			 */
			// preloading dont needed anymore since normal, focus and hover
			// image are the same one
			/*
			 * if(opt.preloadImg && !jqTransformImgPreloaded){
			 * jqTransformImgPreloaded = true; var oInputText =
			 * $('input:text:first', selfForm); if(oInputText.length > 0){
			 * //pour ie on eleve les "" var strWrapperImgUrl =
			 * oInputText.get(0).wrapper.css('background-image');
			 * jqTransformPreloadHoverFocusImg(strWrapperImgUrl); var
			 * strInnerImgUrl =
			 * $('div.jqTransformInputInner',$(oInputText.get(0).wrapper)).css('background-image');
			 * jqTransformPreloadHoverFocusImg(strInnerImgUrl); }
			 * 
			 * /*var oTextarea = $('textarea',selfForm); if(oTextarea.length >
			 * 0){ var oTable = oTextarea.get(0).oTable;
			 * $('td',oTable).each(function(){ var strImgBack =
			 * $(this).css('background-image');
			 * jqTransformPreloadHoverFocusImg(strImgBack); }); }
			 
			}*/
			
			
		}); /* End Form each */
				
	};/* End the Plugin */

})(jQuery);
				   