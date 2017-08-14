var $j = jQuery.noConflict();
(function() {
    $j(document).on('click','#submit_save_order',function(){
        var url= $j("#validate_url").val();
        var orderName= $j("#save_order_text").val();
        orderName = $j.trim(orderName);
        var regx = /^[A-Za-z1-9][A-Za-z0-9_-]*[A-Za-z1-9]$/;
        if(orderName != ''){
            if (regx.test(orderName)){
                if(url != '') {
				openProgressDialog();
                    $j.ajax(url,
                        {
                            method:'post',
                            data:{ordername: orderName},
                            success: function(html){
							closeProgressDialog();
                                if(html == 'no'){
                                    $j("#display_error").html(' ');
                                    $j("#submit_save_order").attr('disabled','disabled');
                                    $j("#save_form").submit();
                                }else{
                                    $j("#display_error").html('Duplicate order name found. Please enter new order name.');
                                }
                            }
                        });
                }else{
                    $j("#display_error").html('Not able to validate');
                }
            }else{
                $j("#display_error").html('Please enter valid name');
            }
        }else{
            $j("#display_error").html('Please enter an order name.');
        }
    });


})();
function saveOrderName()
{
    $j('#basic-modal-content').modal();
    return false;

}

function openpopp(id)
{
    var g=$j('#'+id).modal();
	//Order save from 'Confirmation page', should show the success message in popup
	//if(id!='modal-savepopupmini-message' && id!='modal-savepopupmaincart-message' && id!='locationsaveorder'){
	if(id!='modal-savepopupmini-message' && id!='modal-savepopupmaincart-message' && id!='locationsaveorder' && id!='order_saved_on_success_page'){
	//End
	g.focus('last'); //bug id 515 user keyboard experience date:09-May-2016
    }
	return false;
}

//bug id:515 keyboard user experience date:10-May-2016
jQuery(document).ready(function() {
	//popup mini-shopping cart
   jQuery("#save_order_textminiform").keyup(function(){
		var txtval=jQuery('#save_order_textminiform').val();
	if(txtval!='' && txtval!='undefined'){
		jQuery('.cancel-button-focus').find("span:last-of-type").removeClass("bfocuscls");
		jQuery('#submit_save_order_mini').find("span:last-of-type").removeClass("bfocuscls");
    jQuery('#submit_save_order_mini').find("span:last-of-type").addClass("bfocuscls");
	jQuery('#curactive').val('save');
	}else{
	jQuery('#submit_save_order_mini').find("span:last-of-type").removeClass("bfocuscls");
    jQuery('.cancel-button-focus').find("span:last-of-type").removeClass("bfocuscls");
    jQuery('.cancel-button-focus').find("span:last-of-type").addClass("bfocuscls");	
	jQuery('#curactive').val('cancel');
	}
});
jQuery('#save_order_textminiform').focus(function(){
	var txtval=jQuery('#save_order_textminiform').val();
   if(txtval!='' && txtval!='undefined'){
		jQuery('.cancel-button-focus').find("span:last-of-type").removeClass("bfocuscls");
		jQuery('#submit_save_order_mini').find("span:last-of-type").removeClass("bfocuscls");
    jQuery('#submit_save_order_mini').find("span:last-of-type").addClass("bfocuscls");
	jQuery('#curactive').val('save');
	}else{
	jQuery('#submit_save_order_mini').find("span:last-of-type").removeClass("bfocuscls");
    jQuery('.cancel-button-focus').find("span:last-of-type").removeClass("bfocuscls");
    jQuery('.cancel-button-focus').find("span:last-of-type").addClass("bfocuscls");	
	jQuery('#curactive').val('cancel');
	}
 });
  
   jQuery('#save_order_textminiform').blur(function(){
    jQuery('#submit_save_order_mini').find("span:last-of-type").removeClass("bfocuscls");
    jQuery('.cancel-button-focus').find("span:last-of-type").removeClass("bfocuscls");
   });
   jQuery('#cancel_save_order-mini').focus(function(){
	var txtval=jQuery('#save_order_textminiform').val();
	if(txtval=='' || txtval=='undefined'){
	jQuery('#submit_save_order_mini').focus();	
	jQuery('#curactive').val('save');	
	}
  });
   //End popup mini-shopping cart
//@popup order review page  date:23-May-2016
   jQuery("#save_order_textminiform2").keyup(function(){
		var txtval=jQuery('#save_order_textminiform2').val();
    if(txtval!='' && txtval!='undefined'){
		jQuery('#cancel_save_order-mini3').find("span:last-of-type").removeClass("bfocuscls");
		jQuery('#submit_save_order3').find("span:last-of-type").removeClass("bfocuscls");
    jQuery('#submit_save_order3').find("span:last-of-type").addClass("bfocuscls");
	jQuery('#curactive2').val('save');
	}else{
	jQuery('#submit_save_order3').find("span:last-of-type").removeClass("bfocuscls");
    jQuery('#cancel_save_order-mini3').find("span:last-of-type").removeClass("bfocuscls");
    jQuery('#cancel_save_order-mini3').find("span:last-of-type").addClass("bfocuscls");	
	jQuery('#curactive2').val('cancel');
	}
});
jQuery('#save_order_textminiform2').focus(function(){
	var txtval=jQuery('#save_order_textminiform2').val();
   if(txtval!='' && txtval!='undefined'){
		jQuery('#cancel_save_order-mini3').find("span:last-of-type").removeClass("bfocuscls");
		jQuery('#submit_save_order3').find("span:last-of-type").removeClass("bfocuscls");
    jQuery('#submit_save_order3').find("span:last-of-type").addClass("bfocuscls");
	jQuery('#curactive2').val('save');
	}else{
	jQuery('#submit_save_order3').find("span:last-of-type").removeClass("bfocuscls");
    jQuery('#cancel_save_order-mini3').find("span:last-of-type").removeClass("bfocuscls");
    jQuery('#cancel_save_order-mini3').find("span:last-of-type").addClass("bfocuscls");	
	jQuery('#curactive2').val('cancel');
	}
 });
  
   jQuery('#save_order_textminiform2').blur(function(){
    jQuery('#submit_save_order3').find("span:last-of-type").removeClass("bfocuscls");
    jQuery('#cancel_save_order-mini3').find("span:last-of-type").removeClass("bfocuscls");
   });
   jQuery('#cancel_save_order-mini3').focus(function(){
	var txtval=jQuery('#save_order_textminiform2').val();
	if(txtval=='' || txtval=='undefined'){
	jQuery('#submit_save_order3').focus();	
	jQuery('#curactive2').val('save');	
	}
  });
   //@popup END order review page  date:23-May-2016 
 //@popup order confirm page  date:11-May-2016  
 
   jQuery("#save_order_loctext2").keyup(function(){
		var txtval=jQuery('#save_order_loctext2').val();
    if(txtval!='' && txtval!='undefined'){
		jQuery('#cancel_save_order_location').find("span:last-of-type").removeClass("bfocuscls");
		jQuery('#submit_save_order_location').find("span:last-of-type").removeClass("bfocuscls");
    jQuery('#submit_save_order_location').find("span:last-of-type").addClass("bfocuscls");
	jQuery('#curactive3').val('save');
	}else{
	jQuery('#submit_save_order_location').find("span:last-of-type").removeClass("bfocuscls");
    jQuery('#cancel_save_order_location').find("span:last-of-type").removeClass("bfocuscls");
    jQuery('#cancel_save_order_location').find("span:last-of-type").addClass("bfocuscls");	
	jQuery('#curactive3').val('cancel');
	}
});
jQuery('#save_order_loctext2').focus(function(){
	var txtval=jQuery('#save_order_loctext2').val();
   if(txtval!='' && txtval!='undefined'){
		jQuery('#cancel_save_order_location').find("span:last-of-type").removeClass("bfocuscls");
		jQuery('#submit_save_order_location').find("span:last-of-type").removeClass("bfocuscls");
    jQuery('#submit_save_order_location').find("span:last-of-type").addClass("bfocuscls");
	jQuery('#curactive3').val('save');
	}else{
	jQuery('#submit_save_order_location').find("span:last-of-type").removeClass("bfocuscls");
    jQuery('#cancel_save_order_location').find("span:last-of-type").removeClass("bfocuscls");
    jQuery('#cancel_save_order_location').find("span:last-of-type").addClass("bfocuscls");	
	jQuery('#curactive3').val('cancel');
	}
 });
  
   jQuery('#save_order_loctext2').blur(function(){
    jQuery('#submit_save_order_location').find("span:last-of-type").removeClass("bfocuscls");
    jQuery('#cancel_save_order_location').find("span:last-of-type").removeClass("bfocuscls");
   });
   jQuery('#cancel_save_order_location').focus(function(){
	var txtval=jQuery('#save_order_loctext2').val();
	if(txtval=='' || txtval=='undefined'){
	jQuery('#submit_save_order_location').focus();	
	jQuery('#curactive3').val('save');	
	}
  });

 //@popup END order confirm page date:23-May-2016 
   
  //@popup add catalog name  date:23-May-2016 
	jQuery("#save_order_text").keyup(function(){
		var txtval=jQuery('#save_order_text').val();
		if(txtval!='' && txtval!='undefined'){
		jQuery('#cancel_formdata_cname').find("span:last-of-type").removeClass("bfocuscls");
		jQuery('#save_form_data_cname').find("span:last-of-type").removeClass("bfocuscls");
		jQuery('#save_form_data_cname').find("span:last-of-type").addClass("bfocuscls");
		jQuery('#curactive4').val('save');
		}else{
		jQuery('#save_form_data_cname').find("span:last-of-type").removeClass("bfocuscls");
		jQuery('#cancel_formdata_cname').find("span:last-of-type").removeClass("bfocuscls");
		jQuery('#cancel_formdata_cname').find("span:last-of-type").addClass("bfocuscls");	
		jQuery('#curactive4').val('cancel');
		}
	});
	jQuery('#save_order_text').focus(function(){
		var txtval=jQuery('#save_order_text').val();
		if(txtval!='' && txtval!='undefined'){
		jQuery('#cancel_formdata_cname').find("span:last-of-type").removeClass("bfocuscls");
		jQuery('#save_form_data_cname').find("span:last-of-type").removeClass("bfocuscls");
		jQuery('#save_form_data_cname').find("span:last-of-type").addClass("bfocuscls");
		jQuery('#curactive4').val('save');
		}else{
		jQuery('#save_form_data_cname').find("span:last-of-type").removeClass("bfocuscls");
		jQuery('#cancel_formdata_cname').find("span:last-of-type").removeClass("bfocuscls");
		jQuery('#cancel_formdata_cname').find("span:last-of-type").addClass("bfocuscls");	
		jQuery('#curactive4').val('cancel');
		}
	});

	jQuery('#save_order_text').blur(function(){
		jQuery('#save_form_data_cname').find("span:last-of-type").removeClass("bfocuscls");
		jQuery('#cancel_formdata_cname').find("span:last-of-type").removeClass("bfocuscls");
	});
	jQuery('#cancel_formdata_cname').focus(function(){
		var txtval=jQuery('#save_order_text').val();
		if(txtval=='' || txtval=='undefined'){
		jQuery('#save_form_data_cname').focus();	
		jQuery('#curactive4').val('save');	
		}
	});

//@popup end ADD catalog name  date:23-May-2016 
   
   //@popup edit catalog name  date:11-May-2016 
   	jQuery("#save_order_text2").keyup(function(){
		var txtval=jQuery('#save_order_text2').val();
		if(txtval!='' && txtval!='undefined'){
		jQuery('#cancel_formdata_cname_edit').find("span:last-of-type").removeClass("bfocuscls");
		jQuery('#save_form_data_cname_edit').find("span:last-of-type").removeClass("bfocuscls");
		jQuery('#save_form_data_cname_edit').find("span:last-of-type").addClass("bfocuscls");
		jQuery('#curactive5').val('save');
		}else{
		jQuery('#save_form_data_cname_edit').find("span:last-of-type").removeClass("bfocuscls");
		jQuery('#cancel_formdata_cname_edit').find("span:last-of-type").removeClass("bfocuscls");
		jQuery('#cancel_formdata_cname_edit').find("span:last-of-type").addClass("bfocuscls");	
		jQuery('#curactive5').val('cancel');
		}
	});
	jQuery('#save_order_text2').focus(function(){
		var txtval=jQuery('#save_order_text2').val();
		if(txtval!='' && txtval!='undefined'){
		jQuery('#cancel_formdata_cname_edit').find("span:last-of-type").removeClass("bfocuscls");
		jQuery('#save_form_data_cname_edit').find("span:last-of-type").removeClass("bfocuscls");
		jQuery('#save_form_data_cname_edit').find("span:last-of-type").addClass("bfocuscls");
		jQuery('#curactive5').val('save');
		}else{
		jQuery('#save_form_data_cname_edit').find("span:last-of-type").removeClass("bfocuscls");
		jQuery('#cancel_formdata_cname_edit').find("span:last-of-type").removeClass("bfocuscls");
		jQuery('#cancel_formdata_cname_edit').find("span:last-of-type").addClass("bfocuscls");	
		jQuery('#curactive5').val('cancel');
		}
	});

	jQuery('#save_order_text2').blur(function(){
		jQuery('#save_form_data_cname_edit').find("span:last-of-type").removeClass("bfocuscls");
		jQuery('#cancel_formdata_cname_edit').find("span:last-of-type").removeClass("bfocuscls");
	});
	jQuery('#cancel_formdata_cname_edit').focus(function(){
		var txtval=jQuery('#save_order_text2').val();
		if(txtval=='' || txtval=='undefined'){
		jQuery('#save_form_data_cname_edit').focus();	
		jQuery('#curactive5').val('save');	
		}
	});
   //@popup end edit catalog name  date:23-May-2016 
   //@popup copy catalog name  date:23-May-2016
   jQuery("#save_order_text_copy").keyup(function(){
		var txtval=jQuery('#save_order_text_copy').val();
		if(txtval!='' && txtval!='undefined'){
		jQuery('#cancel_formdata_cname_copy').find("span:last-of-type").removeClass("bfocuscls");
		jQuery('#save_form_data_cname_copy').find("span:last-of-type").removeClass("bfocuscls");
		jQuery('#save_form_data_cname_copy').find("span:last-of-type").addClass("bfocuscls");
		jQuery('#curactive6').val('save');
		}else{
		jQuery('#save_form_data_cname_copy').find("span:last-of-type").removeClass("bfocuscls");
		jQuery('#cancel_formdata_cname_copy').find("span:last-of-type").removeClass("bfocuscls");
		jQuery('#cancel_formdata_cname_copy').find("span:last-of-type").addClass("bfocuscls");	
		jQuery('#curactive6').val('cancel');
		}
	});
	jQuery('#save_order_text_copy').focus(function(){
		var txtval=jQuery('#save_order_text_copy').val();
		if(txtval!='' && txtval!='undefined'){
		jQuery('#cancel_formdata_cname_copy').find("span:last-of-type").removeClass("bfocuscls");
		jQuery('#save_form_data_cname_copy').find("span:last-of-type").removeClass("bfocuscls");
		jQuery('#save_form_data_cname_copy').find("span:last-of-type").addClass("bfocuscls");
		jQuery('#curactive6').val('save');
		}else{
		jQuery('#save_form_data_cname_copy').find("span:last-of-type").removeClass("bfocuscls");
		jQuery('#cancel_formdata_cname_copy').find("span:last-of-type").removeClass("bfocuscls");
		jQuery('#cancel_formdata_cname_copy').find("span:last-of-type").addClass("bfocuscls");	
		jQuery('#curactive6').val('cancel');
		}
	});

	jQuery('#save_order_text_copy').blur(function(){
		jQuery('#save_form_data_cname_copy').find("span:last-of-type").removeClass("bfocuscls");
		jQuery('#cancel_formdata_cname_copy').find("span:last-of-type").removeClass("bfocuscls");
	});
	jQuery('#cancel_formdata_cname_copy').focus(function(){
		var txtval=jQuery('#save_order_text_copy').val();
		if(txtval=='' || txtval=='undefined'){
		jQuery('#save_form_data_cname_copy').focus();	
		jQuery('#curactive6').val('save');	
		}
	});
   //@popup end copy catalog name  date:23-May-2016   
   
   });  
   //END bug id:515