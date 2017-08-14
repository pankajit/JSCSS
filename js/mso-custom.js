jQuery.noConflict();

jQuery(document).ready(function(){
	jQuery(".col-main, .header-container, .inlineContainer, .footer").click(function(e) {
        	jQuery(".arrow_expand_full").hide();
		jQuery(".arrow_expand").show();
		jQuery(".arrow-icon").width(24);
		jQuery(".cart-icon").css("left","30px");
		jQuery("#cartHeader span").css("padding-left","7px");
		jQuery("#cartHeader span").css({
			"font-size":"9px",
			"width":"85%",
			"padding":"5px 0 5px 0px",
			"height":"17px",
			"top":"inherit",
			"border-bottom":"0px solid #999999",
			"left":"0",
			"margin":"auto",
			"text-align":"center"
		});
		jQuery(".cart-head").css({
			"width":"310px",
			"left":"0",
			"text-align":"center",
			"font-size":"16px",
			"font-family":"'NeoSansPro-Medium'"
		});
		jQuery("#topCartContent .section.result.gapBottom14").hide(0,function(){
			jQuery(".sidebar").width(70);	
		});
		jQuery(".sidebar").css("background","#e1e1e1");
		jQuery(".curProductlist-minicart").css("padding","0 0px");
		jQuery(".curProductlist-minicart").removeClass("curProductlist-minicart-trans");	
		jQuery(".mini-cart-action-links").removeClass("minicart-medium-style");
		jQuery(".minicart-table-hide1").hide();
		
		var mincartheight = jQuery('#topCartHead').outerHeight()+jQuery('#topCartContent').outerHeight()+15;
		if(jQuery(".page").height() <= mincartheight)
		jQuery(".page").height(mincartheight+jQuery('.header').outerHeight());
		table_expand1();
   	});
	var review_rowCount1 = jQuery('.curProductlist_a .review-table_a tbody tr').length;
	var review_rowCount2 = jQuery('.curProductlist_b .review-table_b tbody tr').length;
	var review_rowCount3 = jQuery('.minicart-table_a tbody tr').length;
	
	var review_rowCount5 = jQuery('.curProductlist_e .review-table_a tbody tr').length;
	var review_rowCount6 = jQuery('.curProductlist_f .review-table_b tbody tr').length;

	/* -------------------------------AXALTA PRODUCTS --------------------------------*/
	if(review_rowCount1 > 5){
		jQuery(".curProductlist_a .review-table_a tbody tr:gt(4)").css('display','none');
		jQuery(".mainshopcart .cart-show-all").fadeIn(200);	
	}else if(review_rowCount1 <= 5){
		jQuery(".mainshopcart .cart-show-all").hide();
	}
	jQuery(".curProductlist_a").addClass("height-auto");
	
	jQuery(".mainshopcart .cart-show-all").click(function(){
		jQuery(".curProductlist_a .review-table_a tbody tr:gt(4)").css('display','table-row');
		
		jQuery(".curProductlist_a").animate({
			height: jQuery(".curProductlist_a .review-table_a").height()
		},100,function(){
			var mincartheight = jQuery('#topCartHead').outerHeight()+jQuery('#topCartContent').outerHeight()+15;
				if(jQuery(".page").height() <= mincartheight)
				{
				  jQuery(".page").height(mincartheight+jQuery('.header').outerHeight());
				}
		});
		jQuery(".mainshopcart .cart-show-all").hide();
		jQuery('.mainshopcart .cart-hide-all').show();
		table_expand();		
	});
	
	jQuery(".mainshopcart .cart-hide-all").click(function(){
		jQuery(".curProductlist_a .review-table_a tbody tr:gt(4)").css('display','none');
				
				jQuery(".curProductlist_a").animate({
					height: jQuery(".curProductlist_a .review-table_a").height()
				},100,function(){
					var mincartheight = jQuery('#topCartHead').outerHeight()+jQuery('#topCartContent').outerHeight()+15;
					 jQuery(".page").height(mincartheight+jQuery('.header').outerHeight());
			});
			jQuery(".mainshopcart .cart-show-all").show();	
			jQuery(".mainshopcart .cart-hide-all").hide();	
			table_collapse();
	});
	
	

	
	/*if(review_rowCount1 > 5){
		var ht = 0;
		for (i = 1; i <= 5; i++) {
			ht += jQuery(".curProductlist_a .review-table_a tbody tr:nth-child("+i+")").height();
		}
		var tab_min_height = jQuery(".curProductlist_a .review-table_a thead tr").height()+ht;
		//+parseInt(60)	== Padding for each <tr> is 10, so added 60px including header paddings also
		jQuery(".curProductlist_a").height(tab_min_height+parseInt(60));
		jQuery(".mainshopcart .cart-show-all").fadeIn(200);	
	}else if(review_rowCount1 <= 5){
		jQuery(".mainshopcart .cart-show-all").hide();
		jQuery(".curProductlist_a").addClass("height-auto");
	}

	jQuery(".mainshopcart .cart-show-all").click(function(){
		jQuery(".curProductlist_a").animate({
		    height : jQuery('.review-table_a').height()
		},100,function(){
			
			var mincartheight = jQuery('#topCartHead').outerHeight()+jQuery('#topCartContent').outerHeight()+15;
				if(jQuery(".page").height() <= mincartheight)
				{
				  jQuery(".page").height(mincartheight+jQuery('.header').outerHeight());
				}
		});
		jQuery(".mainshopcart .cart-show-all").hide();
		jQuery('.mainshopcart .cart-hide-all').show();	
	});
	jQuery(".mainshopcart .cart-hide-all").click(function(){
		jQuery(".curProductlist_a").animate({
		    height : tab_min_height+parseInt(60)
		},100,function(){
				var mincartheight = jQuery('#topCartHead').outerHeight()+jQuery('#topCartContent').outerHeight()+15;
				//if(jQuery(".page").height() <= jQuery('.top-cart').height())
				//{
				  jQuery(".page").height(mincartheight+jQuery('.header').outerHeight());
				//}
		});
		jQuery(".mainshopcart .cart-show-all").show();	
		jQuery(".mainshopcart .cart-hide-all").hide();	
	});*/
	
	/* -------------------------------ALLIED PRODUCTS --------------------------------*/
	if(review_rowCount2 > 5){
		jQuery(".curProductlist_b .review-table_b tbody tr:gt(4)").css('display','none');
		jQuery(".mainshopcart .cart-show-all1, .mainshopcart .cart-hide-all1").hide();
		jQuery(".mainshopcart .cart-show-all1").fadeIn(200);	
	}else if(review_rowCount2 <= 5){
		jQuery(".mainshopcart .cart-show-all1").hide();
	}
	jQuery(".curProductlist_b").addClass("height-auto");
	
	
	jQuery(".mainshopcart .cart-show-all1").click(function(){
		jQuery(".curProductlist_b .review-table_b tbody tr:gt(4)").css('display','table-row');
		
		jQuery(".curProductlist_b").animate({
			height: jQuery(".curProductlist_b .review-table_b").height()
		},100);
		jQuery(".mainshopcart .cart-show-all1").hide();
		jQuery('.mainshopcart .cart-hide-all1').show();
		table_expand1();
	});
	jQuery(".mainshopcart .cart-hide-all1").click(function(){
		jQuery(".curProductlist_b .review-table_b tbody tr:gt(4)").css('display','none');
		
		jQuery(".curProductlist_b").animate({
			height: jQuery(".curProductlist_b .review-table_b").height()
		},100,function(){
			var mincartheight = jQuery('#topCartHead').outerHeight()+jQuery('#topCartContent').outerHeight()+15;
			 jQuery(".page").height(mincartheight+jQuery('.header').outerHeight());
		});
		jQuery(".mainshopcart .cart-show-all1").show();	
		jQuery(".mainshopcart .cart-hide-all1").hide();	
		table_collapse1();		
	});
	
	/* -------------------------------AXALTA PRODUCTS IN ORDER CONFIRM --------------------------------*/
	if(review_rowCount5 > 5){
		jQuery(".curProductlist_e .review-table_a tbody tr:gt(4)").css('display','none');
		jQuery("#axalta-confirm-items .cart-show-all").fadeIn(200);	
	}else if(review_rowCount5 <= 5){
		jQuery("#axalta-confirm-items .cart-show-all").hide();
	}
	jQuery(".curProductlist_e").addClass("height-auto");
	
	jQuery("#axalta-confirm-items .cart-show-all").click(function(){
		jQuery(".curProductlist_e .review-table_a tbody tr:gt(4)").css('display','table-row');
		
		jQuery(".curProductlist_e").animate({
			height: jQuery(".curProductlist_e .review-table_a").height()
		},100,function(){
			var mincartheight = jQuery('#topCartHead').outerHeight()+jQuery('#topCartContent').outerHeight()+15;
				if(jQuery(".page").height() <= mincartheight)
				{
				  jQuery(".page").height(mincartheight+jQuery('.header').outerHeight());
				}
		});
		jQuery("#axalta-confirm-items .cart-show-all").hide();
		jQuery('#axalta-confirm-items .cart-hide-all').show();
		table_expand();		
	});
	
	jQuery("#axalta-confirm-items .cart-hide-all").click(function(){
		jQuery(".curProductlist_e .review-table_a tbody tr:gt(4)").css('display','none');
				
				jQuery(".curProductlist_e").animate({
					height: jQuery(".curProductlist_e .review-table_a").height()
				},100,function(){
					var mincartheight = jQuery('#topCartHead').outerHeight()+jQuery('#topCartContent').outerHeight()+15;
					 jQuery(".page").height(mincartheight+jQuery('.header').outerHeight());
			});
			jQuery("#axalta-confirm-items .cart-show-all").show();	
			jQuery("#axalta-confirm-items .cart-hide-all").hide();	
			table_collapse();
	});
	
	/* -------------------------------ALLIED PRODUCTS IN ORDER CONFIRM --------------------------------*/
	if(review_rowCount6 > 5){
		jQuery(".curProductlist_f .review-table_b tbody tr:gt(4)").css('display','none');
		jQuery("#allied-confirm-items .cart-show-all1").fadeIn(200);	
	}else if(review_rowCount6 <= 5){
		jQuery("#allied-confirm-items .cart-show-all1").hide();
	}
	jQuery(".curProductlist_f").addClass("height-auto");
	
	jQuery("#allied-confirm-items .cart-show-all1").click(function(){
		jQuery(".curProductlist_f .review-table_b tbody tr:gt(4)").css('display','table-row');
		
		jQuery(".curProductlist_f").animate({
			height: jQuery(".curProductlist_f .review-table_b").height()
		},100,function(){
			var mincartheight = jQuery('#topCartHead').outerHeight()+jQuery('#topCartContent').outerHeight()+15;
				if(jQuery(".page").height() <= mincartheight)
				{
				  jQuery(".page").height(mincartheight+jQuery('.header').outerHeight());
				}
		});
		jQuery("#allied-confirm-items .cart-show-all1").hide();
		jQuery('#allied-confirm-items .cart-hide-all1').show();
		table_expand();		
	});
	
	jQuery("#allied-confirm-items .cart-hide-all1").click(function(){
		jQuery(".curProductlist_f .review-table_b tbody tr:gt(4)").css('display','none');
				
				jQuery(".curProductlist_f").animate({
					height: jQuery(".curProductlist_f .review-table_b").height()
				},100,function(){
					var mincartheight = jQuery('#topCartHead').outerHeight()+jQuery('#topCartContent').outerHeight()+15;
					 jQuery(".page").height(mincartheight+jQuery('.header').outerHeight());
			});
			jQuery("#allied-confirm-items .cart-show-all1").show();	
			jQuery("#allied-confirm-items .cart-hide-all1").hide();	
			table_collapse();
	});
		/*if(review_rowCount2 > 5){
		jQuery(".mainshopcart .cart-show-all1, .mainshopcart .cart-hide-all1").hide();
		var ht1 = 0;
		for (var i = 1; i <= 5; i++) {
			//alert(jQuery(".curProductlist_b .review-table_b tbody tr:nth-child("+i+")").height());
			ht1 += jQuery(".curProductlist_b .review-table_b tbody tr:nth-child("+i+")").height();
			//console.log(ht1);					
		}
		jQuery(".curProductlist_b .review-table_b tbody tr:gt(4)").css('display','none');
		//console.log("LAST "+ht1);					
		var tab_min_height1 = jQuery(".curProductlist_b .review-table_b thead tr").height()+ht1;
		//console.log("THEAD "+jQuery(".curProductlist_b .review-table_b thead tr").height());
		//console.log("tab_min_height1 "+tab_min_height1);
		//+parseInt(60)	== Padding for each <tr> is 10, so added 60px including header paddings also
		jQuery(".curProductlist_b").height(tab_min_height1+parseInt(60));
		jQuery(".mainshopcart .cart-show-all1").fadeIn(200);	
	}else if(review_rowCount2 <= 5){
		jQuery(".mainshopcart .cart-show-all1").hide();
		jQuery(".curProductlist_b").addClass("height-auto");
	}
	jQuery(".mainshopcart .cart-show-all1").click(function(){
		jQuery(".curProductlist_b .review-table_b tbody tr:gt(4)").css('display','table-row');
		jQuery(".curProductlist_b").animate({
		    height : jQuery('.curProductlist_b .review-table_b').height()
		},100);
		jQuery(".mainshopcart .cart-show-all1").hide();
		jQuery('.mainshopcart .cart-hide-all1').show();
		table_expand();		
	});
	jQuery(".mainshopcart .cart-hide-all1").click(function(){
		jQuery(".curProductlist_b .review-table_b tbody tr:gt(4)").css('display','none');
		jQuery(".curProductlist_b").animate({
			 height : jQuery('.curProductlist_b .review-table_b').height()
		},100,function(){
			var mincartheight = jQuery('#topCartHead').outerHeight()+jQuery('#topCartContent').outerHeight()+15;
				//if(jQuery(".page").height() <= jQuery('.top-cart').height())
				//{
				  jQuery(".page").height(mincartheight+jQuery('.header').outerHeight());
				//}
		});
		jQuery(".mainshopcart .cart-show-all1").show();
		jQuery(".mainshopcart .cart-hide-all1").hide();	
		table_collapse();		
	});*/
	
	jQuery('.arrow-default').append('<span class="arrow-default-edge"></span><span class="arrow-default-edge-bg"></span>');		

	jQuery(".arrow_expand").click(function(){
		//Comment Bug 104
		//Deletion form mini-cart should return to mini-cart minus the item deleted
		//Clicking on this will open minicart half-expanded
		jQuery("#minicart_half_or_full").val('half');
		//End Bug 104 changes
		
		jQuery(".minicart-show").addClass('half-expanded');
		jQuery(".sidebar").animate({"width":"310px"},0,function(){
			jQuery("#topCartContent .section.result.gapBottom14").show();
			jQuery(".minicart-thead, .minicart-table-hide").hide();
			jQuery(".sidebar").css("background","#e1e1e1");
			jQuery(".curProductlist-minicart").css({
				"padding":"0 10px",
				"width":"310px"
			});	
			jQuery(".curProductlist-minicart").addClass("curProductlist-minicart-trans");
			jQuery(".minicart-table-hide1").show();
			jQuery(".minicart-table-hide1").css("text-align","left");
		});
		jQuery(".arrow-icon").width(34);
		jQuery(".cart-icon").css("left","40px");
		jQuery(".arrow_expand").hide();
		jQuery(".arrow_expand_full").show();
		jQuery("#cartHeader span").css({
			"border-bottom":"1px solid #999999"
		});
		jQuery(".mini-cart-action-links").addClass("minicart-medium-style");
		jQuery(".minicart-show #shopping-cart-table tr td:first-child").addClass("mini-bold-colum");
		
		    adjustMiniCart();
			
			/* -------------------------------MINI-CART AXALTA PRODUCTS --------------------------------*/
		/*var review_rowCount4 = jQuery('.minicart-table_a tbody tr').length;
		if(review_rowCount4 > 5){
			jQuery("#topCartContent .cart-show-all, #topCartContent .cart-hide-all").hide();
			var ht2 = 0;
			for (var i = 1; i <= 5; i++) {
				ht2 += jQuery(".curProductlist_c .minicart-table_a tbody tr:nth-child("+i+")").height();
			}
			console.log("LAST All "+ht2);					
			//jQuery(".curProductlist_d .minicart-table_b thead tr").height()
			var tab_min_height2 = ht2;
			//+parseInt(60)
			jQuery(".curProductlist_c").height(tab_min_height2);
			jQuery("#topCartContent .cart-show-all").fadeIn(200);	
		}else if(review_rowCount4 <= 5){
			jQuery("#topCartContent .cart-show-all").hide();
			jQuery(".curProductlist_c .minicart-table_a").addClass("height-auto");
		}
		
		jQuery("#topCartContent .cart-show-all").click(function(){
			jQuery("#topCartContent .curProductlist_c").animate({
				height : jQuery('#topCartContent .curProductlist_c .minicart-table_a').height()
			},100,function(){
				var mincartheight = jQuery('#topCartHead').outerHeight()+jQuery('#topCartContent').outerHeight()+15;
				if(jQuery(".page").height() <= mincartheight)
				{
				  jQuery(".page").height(mincartheight+jQuery('.header').outerHeight());
				}
				console.log("2nd show"+mincartheight);
				jQuery("#topCartContent .cart-show-all").hide();
				jQuery('#topCartContent .cart-hide-all').show();
				table_expand1();				

			});

			
			
		});
		jQuery("#topCartContent .cart-hide-all").click(function(){
			jQuery("#topCartContent .curProductlist_c").animate({
				height : tab_min_height2
			},100,function(){
				var mincartheight = jQuery('#topCartHead').outerHeight()+jQuery('#topCartContent').outerHeight()+15;
				  jQuery(".page").height(mincartheight+jQuery('.header').outerHeight());
				table_collapse1();		
			});
			jQuery("#topCartContent .cart-show-all").show();	
			jQuery("#topCartContent .cart-hide-all").hide();	
			
		});*/
		
		/* -------------------------------MINI-CART ALLIED PRODUCTS --------------------------------*/
		/*var review_rowCount4 = jQuery('.minicart-table_b tbody tr').length;
		if(review_rowCount4 > 5){
			jQuery("#topCartContent .cart-show-all1, #topCartContent .cart-hide-all1").hide();
			var ht3 = 0;
			for (var i = 1; i <= 5; i++) {
				ht3 += jQuery(".curProductlist_d .minicart-table_b tbody tr:nth-child("+i+")").height();
			}
			console.log("LAST All "+ht2);					
			//jQuery(".curProductlist_d .minicart-table_b thead tr").height()
			var tab_min_height3 = ht3;
			//+parseInt(60)
			jQuery(".curProductlist_d").height(tab_min_height3);
			jQuery("#topCartContent .cart-show-all1").fadeIn(200);	
		}else if(review_rowCount4 <= 5){
			jQuery("#topCartContent .cart-show-all1").hide();
			jQuery(".curProductlist_d .minicart-table_b").addClass("height-auto");
		}

		jQuery("#topCartContent .cart-show-all1").click(function(){
			jQuery("#topCartContent .curProductlist_d").animate({
				height : jQuery('#topCartContent .curProductlist_d .minicart-table_b').height()
			},300,function(){
				var mincartheight = jQuery('#topCartHead').outerHeight()+jQuery('#topCartContent').outerHeight()+15;
				if(jQuery(".page").height() <= mincartheight)
				{
				  jQuery(".page").height(mincartheight+jQuery('.header').outerHeight());
				}
				table_expand1();			
			});
			jQuery("#topCartContent .cart-show-all1").hide();
			jQuery("#topCartContent .cart-hide-all1").show();
		});
		jQuery("#topCartContent .cart-hide-all1").click(function(){
			jQuery("#topCartContent .curProductlist_d").animate({
				height : tab_min_height3
			},300,function(){
				var mincartheight = jQuery('#topCartHead').outerHeight()+jQuery('#topCartContent').outerHeight()+15;
				 jQuery(".page").height(mincartheight+jQuery('.header').outerHeight());
				table_collapse1();	
			});
			jQuery("#topCartContent .cart-show-all1").show();	
			jQuery("#topCartContent .cart-hide-all1").hide();	
					
		});*/
		   
		    var mincartheight = jQuery('.top-cart').height()+15;
		        //console.log(mincartheight);
				//if(jQuery(".page").height() <= mincartheight)
				//{
				  jQuery(".page").height(mincartheight+jQuery('.header').outerHeight());
				//}	
				
			jQuery("#update-cart-mini-cart").addClass("minicart-update-cart-style");	
	});
	jQuery(".arrow_expand_full").click(function(){
		//Comment Bug 104
		//Deletion form mini-cart should return to mini-cart minus the item deleted
		//Clicking on this will open minicart full-expanded
		jQuery("#minicart_half_or_full").val('full');
		//End Bug 104 changes
		
		jQuery(".sidebar").animate({"width":"930px"},0,function(){
			
			jQuery("#topCartContent .section.result.gapBottom14").hide(0,function(){
				setTimeout(function(){ 
					jQuery("#topCartContent .section.result.gapBottom14, .minicart-thead, .minicart-table-hide").show();
					jQuery(".sidebar").css("background","#ffffff");
					jQuery(".curProductlist-minicart").css({
						"padding":"0 35px",
						"width":"860px"
					});
					 adjustMiniCart();
					var mincartheight = jQuery('#topCartHead').outerHeight()+jQuery('#topCartContent').outerHeight()+15;
					if(jQuery(".page").height() <= mincartheight)
					jQuery(".page").height(mincartheight+jQuery('.header').outerHeight());
					//table_expand1();	
					jQuery(".page").height(jQuery('#topCartHead').outerHeight()+jQuery(".curProductlist-minicart").height()+jQuery('.header').outerHeight());
					jQuery(".minicart-table-hide1").css("text-align","right");
					jQuery(".minicart-show").removeClass('half-expanded');
					jQuery(".footer").css('position','relative !important');
				}, 200);
			});
		});
		jQuery(".cart-head").css({
			"width":"895px",
			"left":"35px",
			"text-align":"left",
			"font-size":"27px",
			"font-family":"'NeoSansPro-Regular'"
		});
		jQuery(".cart-icon").hide();
		jQuery(".arrow-icon").hide();
		jQuery(".arrow_collapse").show();
		jQuery(".arrow_collapse1").hide();
		jQuery(".arrow_collapse_full").show();
		jQuery("#cartHeader span").css({
			"font-size":"0px",
			"width":"85%",
			"padding":"0",
			"height":"1px",
			"top":"60px",
			"border-color":"#cacaca",
			"left":"35px",
			"margin":"0"
		});
		jQuery(".curProductlist-minicart").removeClass("curProductlist-minicart-trans");
		jQuery(".mini-cart-action-links").removeClass("minicart-medium-style");
		jQuery(".minicart-show #shopping-cart-table tr td:first-child").removeClass("mini-bold-colum");
		jQuery("#update-cart-mini-cart").removeClass("minicart-update-cart-style");
	});
	jQuery(".arrow_collapse").click(function(){
		//Comment Bug 104
		//Deletion form mini-cart should return to mini-cart minus the item deleted
		//Clicking on this will open minicart half-expanded
		jQuery("#minicart_half_or_full").val('half');
		//End Bug 104 changes
		
		jQuery(".minicart-show").addClass('half-expanded');
		jQuery(".sidebar").width(310);
		jQuery(".cart-head").css({
			"width":"310px",
			"left":"0",
			"text-align":"center",
			"font-size":"16px",
			"font-family":"'NeoSansPro-Medium'"
		});
		jQuery(".cart-icon").show();
		jQuery(".arrow-icon").show();
		jQuery(".arrow_collapse").hide();
		jQuery(".arrow_collapse1").show();
		jQuery(".arrow_collapse_full").hide();
		jQuery("#cartHeader span").show();
		jQuery("#cartHeader span").css({
			"font-size":"9px",
			"width":"85%",
			"padding":"5px 0 5px 7px",
			"height":"17px",
			"top":"inherit",
			"border-color":"#999999",
			"left":"0",
			"margin":"auto"

		});
		jQuery(".minicart-thead, .minicart-table-hide").hide();
		jQuery("#topCartContent .section.result.gapBottom14").show();
		jQuery(".sidebar").css("background","#e1e1e1");
		jQuery(".curProductlist-minicart").css({
			"padding":"0 10px",
			"width":"310px"
		});
		jQuery(".curProductlist-minicart").addClass("curProductlist-minicart-trans");
		jQuery(".mini-cart-action-links").addClass("minicart-medium-style");
		jQuery(".minicart-table-hide1").show();
		jQuery(".minicart-table-hide1").css("text-align","left");
		jQuery(".minicart-show #shopping-cart-table tr td:first-child").addClass("mini-bold-colum");
		jQuery(".curProductlist_c,.curProductlist_d").removeAttr("style");
		jQuery(".curProductlist_c,.curProductlist_d").addClass("height-auto");
		var mincartheight = jQuery('#topCartHead').outerHeight()+jQuery('#topCartContent').outerHeight()+15;
		//if(jQuery(".page").height() <= mincartheight)
		  jQuery(".page").height(mincartheight+jQuery('.header').outerHeight());
		table_expand1();
		jQuery("#update-cart-mini-cart").addClass("minicart-update-cart-style");
	});
	jQuery(".arrow_collapse1").click(function(){
		
		jQuery(".arrow_expand_full").hide();
		jQuery(".arrow_expand").show();
		jQuery(".arrow-icon").width(24);
		jQuery(".cart-icon").css("left","30px");
		jQuery("#cartHeader span").css("padding-left","7px");
		jQuery("#cartHeader span").css({
			"font-size":"9px",
			"width":"85%",
			"padding":"5px 0 5px 0px",
			"height":"17px",
			"top":"inherit",
			"border-bottom":"0px solid #999999",
			"left":"0",
			"margin":"auto",
			"text-align":"center"
		});
		jQuery(".cart-head").css({
			"width":"310px",
			"left":"0",
			"text-align":"center",
			"font-size":"16px",
			"font-family":"'NeoSansPro-Medium'"
		});
		jQuery("#topCartContent .section.result.gapBottom14").hide(0,function(){
			jQuery(".sidebar").width(70);	
		});
		jQuery(".sidebar").css("background","#e1e1e1");
		jQuery(".curProductlist-minicart").css("padding","0 0px");
		jQuery(".curProductlist-minicart").removeClass("curProductlist-minicart-trans");	
		jQuery(".mini-cart-action-links").removeClass("minicart-medium-style");
		jQuery(".minicart-table-hide1").hide();
		
		var mincartheight = jQuery('#topCartHead').outerHeight()+jQuery('#topCartContent').outerHeight()+15;
		if(jQuery(".page").height() <= mincartheight)
		jQuery(".page").height(mincartheight+jQuery('.header').outerHeight());
		table_expand1();
	});
	jQuery(".arrow_collapse_full").click(function(){
		jQuery(".sidebar").width(70);
		jQuery(".arrow_expand_full").hide();
		jQuery(".arrow_expand").show();
		jQuery(".arrow_collapse").hide();
		jQuery(".arrow_collapse_full").hide();
		jQuery(".arrow_collapse1").show();
		jQuery(".arrow-icon").show().width(24);
		jQuery(".cart-icon").show().css("left","30px");
		jQuery(".cart-head").css({
			"width":"310px",
			"left":"0",
			"text-align":"center",
			"font-size":"16px",
			"font-family":"'NeoSansPro-Medium'"
		});
		jQuery("#cartHeader span").show();
		jQuery("#cartHeader span").css("padding-left","7px");
		jQuery("#cartHeader span").css({
			"font-size":"9px",
			"width":"85%",
			"padding":"5px 0 5px 7px",
			"height":"17px",
			"top":"inherit",
			"border-bottom":"0px solid #999999",
			"left":"0",
			"margin":"auto"
		});
		jQuery("#topCartContent .section.result.gapBottom14").hide();
		jQuery(".sidebar").css("background","#e1e1e1");
		jQuery(".curProductlist-minicart").css("padding","0 0px");
		jQuery(".curProductlist-minicart").removeClass("curProductlist-minicart-trans");
		jQuery(".mini-cart-action-links").removeClass("minicart-medium-style");
		jQuery(".minicart-table-hide1").hide();
		adjustMiniCart();
		var mincartheight = jQuery('#topCartHead').outerHeight()+jQuery('#topCartContent').outerHeight()+15;
		//if(jQuery(".page").height() <= mincartheight)
		jQuery(".page").height(mincartheight+jQuery('.header').outerHeight());
		table_expand1();
	});


// -------------------------------------- SIDE MENU ----------------------------------------------

	jQuery(".inlineContainer").hover(function(){
		jQuery("#search").attr("placeholder", "Product Search");
	},function(){
		jQuery("#search").attr("placeholder", "");
	});

	jQuery("#search").click(function(){
		jQuery("#search").attr("placeholder", "");
		jQuery(".inlineContainer").width(250);
		jQuery(this).addClass("hover-text-class");
		jQuery(".inlineContainer").addClass("show-overflow");
		jQuery(this).attr("placeholder", "Product Search");
	});

	jQuery("#search").focusout(function(){
		//var search_length = jQuery("#search").val().length;
		jQuery("#search").attr("placeholder", "");	
		jQuery(".inlineContainer").width(70);
		jQuery(this).removeClass("hover-text-class");
		jQuery(".inlineContainer").removeClass("show-overflow");
		jQuery(".inlineContainer button.jqTransformButton").hide();
		jQuery(".form-search").css("background","#000000");
	});


// -------------------------------------- END OF SIDE MENU --------------------------------------------




// -------------------------------------- DATE RANGE --------------------------------------------

	jQuery(".specify-range").click(function(){
    	jQuery(".daterange-fields").slideToggle();
        jQuery("#ui-datepicker-div").css("display","none");  
	}); 

// -------------------------------------- END OF DATE RANGE --------------------------------------------


// -------------------------------------- FOOTER --------------------------------------------

	header_height = jQuery(".header-container").outerHeight();
	window_height=jQuery(window).outerHeight();
	wrapper_height=jQuery('.wrapper').outerHeight();
	footer_height=jQuery(".footer").outerHeight();
	compare_height=window_height - footer_height;
	jQuery('.wrapper').css('min-height',(window_height-footer_height));

	if(wrapper_height > compare_height){
		jQuery(".footer").css("position","relative");	
		jQuery(".inlineContainer").css("bottom","0");
		jQuery(".sidebar").css("bottom","0");
	}else{
		//jQuery(".footer").css("position","absolute");	
		jQuery(".inlineContainer").css('min-height',compare_height);
		jQuery(".sidebar").css('min-height',compare_height);
	}

	
	jQuery(window).resize(function(){
		if(wrapper_height > compare_height){
			jQuery(".footer").css("position","relative");	
			jQuery(".inlineContainer").css("bottom","0");
			jQuery(".sidebar").css("bottom","0");
		}else{
			//jQuery(".footer").css("position","absolute");	
			jQuery(".inlineContainer").css('min-height',compare_height);
			jQuery(".sidebar").css('min-height',compare_height);
		}	
	});
	jQuery(window).click(function(){
		if(wrapper_height > compare_height){
			jQuery(".footer").css("position","relative");	
			jQuery(".inlineContainer").css("bottom","0");
			jQuery(".sidebar").css("bottom","0");
		}else{
			//jQuery(".footer").css("position","absolute");	
			jQuery(".inlineContainer").css('min-height',compare_height);
			jQuery(".sidebar").css('min-height',compare_height);
		}	
	});

});

 function resizeFooter() { 
 	//alert("called me");
	jQuery('.wrapper').css('min-height','650px');
 	jQuery(window).resize(function(){
		if(wrapper_height > compare_height){
			jQuery(".footer").css("position","relative");	
			jQuery(".inlineContainer").css("bottom","0");
			jQuery(".sidebar").css("bottom","0");
		}else{
			//jQuery(".footer").css("position","absolute");	
			jQuery(".inlineContainer").css('min-height',compare_height);
			jQuery(".sidebar").css('min-height',compare_height);
		}	
	});
	jQuery(window).click(function(){
		if(wrapper_height > compare_height){
			jQuery(".footer").css("position","relative");	
			jQuery(".inlineContainer").css("bottom","0");
			jQuery(".sidebar").css("bottom","0");
		}else{
			//jQuery(".footer").css("position","absolute");	
			jQuery(".inlineContainer").css('min-height',compare_height);
			jQuery(".sidebar").css('min-height',compare_height);
		}	
	});

}
jQuery(window).keyup(function(){
		if(wrapper_height > compare_height){
			jQuery(".footer").css("position","relative");	
			jQuery(".inlineContainer").css("bottom","0");
			jQuery(".sidebar").css("bottom","0");
		}else{
			//jQuery(".footer").css("position","absolute");	
			jQuery(".inlineContainer").css('min-height',compare_height);
			jQuery(".sidebar").css('min-height',compare_height);
		}	
});
function table_expand(){
	jQuery(".footer").addClass("tab_expand_stl_footer");	
	jQuery(".inlineContainer, .sidebar").addClass("tab_expand_stl");
}
function table_collapse(){
	jQuery(".footer").removeClass("tab_expand_stl_footer");	
	jQuery(".inlineContainer, .sidebar").removeClass("tab_expand_stl");
}
function table_expand1(){
	jQuery(".footer").addClass("tab_expand_stl_footer");	
	jQuery(".inlineContainer, .sidebar").addClass("tab_expand_stl1");
}
function table_collapse1(){
	jQuery(".footer").removeClass("tab_expand_stl_footer");	
	jQuery(".inlineContainer, .sidebar").removeClass("tab_expand_stl1");
}

function focusFunction(){
	jQuery("#search").blur();
}

function adjustMiniCart(){
	/* -------------------------------MINI-CART AXALTA PRODUCTS --------------------------------*/
	var review_rowCount4 = jQuery('.minicart-table_a tbody tr').length;
	if(review_rowCount4 > 5){
		jQuery("#topCartContent .cart-show-all, #topCartContent .cart-hide-all").hide();
		jQuery(".curProductlist_c .minicart-table_a tbody tr:gt(4)").css('display','none');
		jQuery("#topCartContent .cart-show-all").fadeIn(200);	
	}else if(review_rowCount4 <= 5){
		jQuery("#topCartContent .cart-show-all").hide();
	}
	jQuery(".curProductlist_c").removeAttr("style");
	jQuery(".curProductlist_c").addClass("height-auto");
	
	
	jQuery("#topCartContent .cart-show-all").click(function(){
		jQuery(".curProductlist_c .minicart-table_a tbody tr:gt(4)").css('display','table-row');
		
		jQuery(".curProductlist_c").animate({
			height: jQuery(".curProductlist_c .minicart-table_a").height()
		},100,function(){
			var mincartheight = jQuery('#topCartHead').outerHeight()+jQuery('#topCartContent').outerHeight()+15;
			if(jQuery(".page").height() <= mincartheight)
			  jQuery(".page").height(mincartheight+jQuery('.header').outerHeight());
			});
		jQuery("#topCartContent .cart-show-all").hide();
		jQuery('#topCartContent .cart-hide-all').show();
	});
	
	jQuery("#topCartContent .cart-hide-all").click(function(){
		jQuery(".curProductlist_c .minicart-table_a tbody tr:gt(4)").css('display','none');
				
		jQuery(".curProductlist_c").animate({
			height: jQuery(".curProductlist_c .minicart-table_a").height()
		},100,function(){
			var mincartheight = jQuery('#topCartHead').outerHeight()+jQuery('#topCartContent').outerHeight()+15;
		    jQuery(".page").height(mincartheight+jQuery('.header').outerHeight());
			table_collapse1();		
		});
		jQuery("#topCartContent .cart-show-all").show();	
		jQuery("#topCartContent .cart-hide-all").hide();			
	});
	
	/* -------------------------------MINI-CART ALLIED PRODUCTS --------------------------------*/
	var review_rowCount5 = jQuery('.minicart-table_b tbody tr').length;
	
	if(review_rowCount5 > 5){
		jQuery("#topCartContent .cart-show-all1, #topCartContent .cart-hide-all1").hide();
		jQuery(".curProductlist_d .minicart-table_b tbody tr:gt(4)").css('display','none');
		jQuery("#topCartContent .cart-show-all1").fadeIn(200);	
	}else if(review_rowCount5 <= 5){
		jQuery("#topCartContent .cart-show-all1").hide();
	}
	jQuery(".curProductlist_d").removeAttr("style");
	jQuery(".curProductlist_d").addClass("height-auto");
	
	jQuery("#topCartContent .cart-show-all1").click(function(){
		jQuery(".curProductlist_d .minicart-table_b tbody tr:gt(4)").css('display','table-row');
		
		jQuery(".curProductlist_d").animate({
			height: jQuery(".curProductlist_d .minicart-table_b").height()
		},100,function(){
			var mincartheight = jQuery('#topCartHead').outerHeight()+jQuery('#topCartContent').outerHeight()+15;
			if(jQuery(".page").height() <= mincartheight)
			jQuery(".page").height(mincartheight+jQuery('.header').outerHeight());
			table_expand1();			
		});
		jQuery("#topCartContent .cart-show-all1").hide();
		jQuery('#topCartContent .cart-hide-all1').show();
	});
	jQuery("#topCartContent .cart-hide-all1").click(function(){
		jQuery(".curProductlist_d .minicart-table_b tbody tr:gt(4)").css('display','none');
				
		jQuery(".curProductlist_d").animate({
			height: jQuery(".curProductlist_d .minicart-table_b").height()
		},100,function(){
			var mincartheight = jQuery('#topCartHead').outerHeight()+jQuery('#topCartContent').outerHeight()+15;
			 jQuery(".page").height(mincartheight+jQuery('.header').outerHeight());
			table_collapse1();	
		});
		jQuery("#topCartContent .cart-show-all1").show();	
		jQuery("#topCartContent .cart-hide-all1").hide();			
	});
	jQuery(".footer").css('position','relative');
}

// -------------------------------------- END OF FOOTER --------------------------------------------