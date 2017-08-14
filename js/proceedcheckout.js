jQuery(function() {
    jQuery('body').jqTransform({
        imgPath : 'images/'
    });

    /*Moved code for calendar from phtml to JS File */
    /* if(document.getElementById('showCalendar').value) {
        var showCalendar = document.getElementById('showCalendar').value;

        if (showCalendar) {
            if(skinurl) {
                jQuery("#delivery_date").datepicker(
                        {
                            showOn : "button",
                            buttonImage : skinurl
                                     + "jquery/jquerydatepicker/images/grid-cal-white.png",
                            buttonImageOnly : true,
                            dateFormat : "mm/dd/yy",
                            minDate : mindelidate,
              buttonText : 'Select Date',
                    });
            }
        }
    }*/
});


function changeDeliveyDate() { 
    
    var currentDate = new Date();
    var hours = currentDate.getHours();
    var selectOrderType = jQuery('.order_type :selected').val();
    var selectDeliveryType = jQuery('.delivery_type :selected').val();
    var someDate = new Date();

  //Default date set to current date
    numberOfDaysToAdd = 0;
    //Pick-ups - Orders received before 3:00pm (local time) will be available for pickup same day.
    //UPS – orders received on day 1 by 1:00pm (local time) will ship day 1. Orders received day 1 after 1:00pm will ship day 2.
    if((selectDeliveryType == 'Customer Pick-up' && hours <= 15) || (selectDeliveryType == 'UPS' && hours <= 13) || (selectDeliveryType == 'Freight')) {
        var numberOfDaysToAdd = 0;
    }
    if(selectDeliveryType == 'UPS' && hours >= 13) {
        var numberOfDaysToAdd = 1;
    }
    //Stock Orders - Orders received on day 1 by 2:00pm (local time), will ship day 2 [Requested Ship Date]
    //Orders received after 3:00pm (local time) will be available for pick up the next working day.
    if((selectOrderType == stockorder && hours <= 14) || (hours >= 15)) {
        var numberOfDaysToAdd = 1;
    }
    //Truckload Orders - Orders received on day 1 by 2:00pm (local time), will ship day 3 [Requested Ship Date]
    if(selectOrderType == truckloadorder && hours <= 14) {
        var numberOfDaysToAdd = 2;
    }
    someDate.setDate(someDate.getDate() + numberOfDaysToAdd);
    var dd = someDate.getDate();
    var mm = someDate.getMonth() + 1;
    var y = someDate.getFullYear();
    //var someFormattedDate = y + '/'+ mm + '/'+ dd;
    var someFormattedDate = mm + '/'+ dd + '/'+ y;
  
  jQuery('.requested_ship_date').val(someFormattedDate);
  
}

function validateDt(){
  var dtflag = document.getElementById('validate_dt').value;
  if(dtflag) {
    var dtval = document.getElementById('delivery_type').value;
    if(dtval == 'UPS') {
      var dt_ups_msg = document.getElementById('dt_ups_msg').value;
      alert(dt_ups_msg);
    }
    else if(dtval == 'Customer Pick-up') {
      var dt_custpick_msg = document.getElementById('dt_custpick_msg').value;
      alert(dt_custpick_msg);
    }
  }

}


function pocheck() {
    jQuery('#advice-required-entry-po').css('display','none');
    var povalue = jQuery.trim(jQuery('#po').val());
    if(povalue != '') {
      jQuery("#po_1").val(povalue);
    }

    if(povalue == '') {
        jQuery('#advice-required-entry-po').css('display','block');
        //var pomsg = document.getElementById('po_req_msg').value;
        alert(pomsg);
        hideValidElm('#advice-required-entry-po');
        return false;
    }
    if(povalue.length > 35)
    {
        alert(polengthmsg);
        return false;
    }
    return true;
}

function validateDeliveryDate() {


    var validateDate = document.getElementById('require_date').value;
    var dateValue = document.getElementById('delivery_date').value;
    jQuery("#delivery_date_1").val(dateValue);
    jQuery('#advice-required-entry-deliverydate').css('display','none');

    if(validateDate){

      if(dateValue == ''){
        jQuery('#advice-required-entry-deliverydate').css('display','block');
        return false;
      }
      else{
        return true;
      }

    }
    else{
      return true;
    }
}

function validateOrderType(){
  // o.t. = stock, truckload
  // d.t. = Frieght, UPS, Customer Pick Up
  var otflag = document.getElementById('validate_ot').value;

  var otval = document.getElementById('order_type').value;
  jQuery('#order_type_1').val(otval);
  if(document.getElementById('delivery_type')) {
    var dtval = document.getElementById('delivery_type').value;
    jQuery('#delivery_type_1').val(dtval);
  }

  if(otflag) {
    if(otval == '11' && dtval == 'UPS') { // OrderType == truckload && DeliveryType == 'UPS': in-correct combination
      var truck_ups_msg = document.getElementById('truck_ups_msg').value;
      alert(truck_ups_msg);
      return false;
    }
    else if(otval == '11' && dtval == 'Customer Pick-up') { // OrderType == truckload && DeliveryType == 'Customer pickup': in-correct combination
      var truck_custpickup_msg = document.getElementById('truck_custpickup_msg').value;
      alert(truck_custpickup_msg);
      return false;
    }
    else if(otval == '11' && dtval == 'Freight') { // OrderType == truckload && DeliveryType == 'Freight': correct combination
      return true;
    }
    return true;
  }
  return true;

}

  /** for CART page related **/
  function submitOrder() {
    /***** /
      var proqtystr = '';
      var itemIdStr = $('itemidstr').value;
      var itemIdArr = itemIdStr.split(",");
      
      for(var i=0;i<itemIdArr.length;i++){
        var prodid = itemIdArr[i];
        var qtyval = document.getElementById('qty_'+prodid).value;
        alert("prod:"+prodid);
        alert("qty:"+qtyval);
        proqtystr += prodid+"_"+qtyval+",";
      }
      alert(proqtystr);

    / *****/
    var itemdesc = [];
    var poflag = false;
    var dateflag = false;
    var otflag = false;
    if(pocheck()) { //defined in cartorderdetails.phtml 
        jQuery(".itemins").each(function(item) {
            var element_id = jQuery(this).attr("meta:index");
            itemdesc.push ({id : element_id,message:this.value});
        });
        jQuery("#item_ins").val(JSON.stringify(itemdesc));

       poflag = true;
    }

    if(poflag && validateDeliveryDate()) {// defined in cartorderdetails.phtml
      dateflag = true;
    }

    if(poflag && validateOrderType()) {// defined in cartorderdetails.phtml
      otflag = true;
    }

    if(poflag && dateflag && otflag) {
          validateDt(); // defined in cartorderdetails.phtml 
          theForm.submit();
    }
    else {
        return false;
    }
  }

  function selectAllCartItem(chkboxobj) {
    var flagchkbox = chkboxobj.checked;
    //if(flagchkbox){
      var itemIdStr = $('itemidstr').value;
      var itemIdArr = itemIdStr.split(",");
      
      for(var i=0;i<itemIdArr.length;i++){
        var itemChk = "cartitem_"+itemIdArr[i];
        document.getElementById(itemChk).checked = flagchkbox;
        if(flagchkbox) {
          $(itemChk).previous('a').addClassName('jqTransformChecked');
        }
        else{
          $(itemChk).previous('a').removeClassName('jqTransformChecked');
        }
      }
    //}
  }

  function deleteAllCartItem(requrl, returnurl){

    var flagchkbox = $('select_cartitem').checked;
    var sendItemStr = '';

    //if(flagchkbox){
      var itemIdStr = $('itemidstr').value;
      var itemIdArr = itemIdStr.split(",");
      for(var i=0;i<itemIdArr.length;i++){
        var itemChk = "cartitem_" + itemIdArr[i];
        if($(itemChk).checked) {
          if(sendItemStr == '') {
            sendItemStr = itemIdArr[i];
          }
          else {
            sendItemStr += "," + itemIdArr[i];
          }
        }
      }
      if(sendItemStr == '') {
        alert(sel_one_prod);
      }

      if(sendItemStr != '') {
        openProgressDialog();
        new Ajax.Request(requrl,
        {
          method:'post',
          parameters:{items: sendItemStr},
          onComplete: function(req){
              closeProgressDialog();
              setLocation(returnurl);
          }
        });
      }
    }

  function emptycart(requrl, respurl){

      if (confirm("Are you sure you want to empty the shopping cart?") == true) {
          openProgressDialog();
          new Ajax.Request(requrl,
              {
                  method:'post',
                  parameters:{update_cart_action: 'empty_cart'},
                  onComplete: function(req){
                      closeProgressDialog();
                      setLocation(respurl);
                  }
              });
      }

  }

  function updateCartAction(return_flag) {
   var updateFlag = validateCartQty();
    document.getElementById('return_flag').value = return_flag;
    var isLa = 0;
    var itemdesc = [];

    if(return_flag) {

        if(updateFlag) {
          document.shopcartform.submit();
        }
    }
  }
  
  function updateMiniCartAction(return_flag) {
	   var updateFlag = validateMiniCartQty();
	    document.getElementById('return_flag').value = return_flag;
	    var isLa = 0;
	    var itemdesc = [];

	    if(return_flag) {
	        if(updateFlag) {
	          document.shopminicartform.submit();
	        }else{
	        	alert('Qty should not be 0');
	        }
	    }
	  }
  
  function checkqtyAction(return_flag,url) {
   var updateFlag = validateCartQty();
    document.getElementById('return_flag').value = return_flag;
    var isLa = 0;
    var itemdesc = [];

    if(return_flag) {

        if(updateFlag) {
         window.location.href=url;
        }
    }
  }


  function validaterequestDeliveryDate()
  {
    var elmentId = 'delivery_date';
    var urlValue = jQuery('#delivery_date_validate_url').val();
    var deliveryDate = jQuery('#delivery_date').val();
    var selectedshipDate = new Date(deliveryDate);
    var orderType = jQuery('#order_type').val();
    var deliveryType = jQuery('#delivery_type').val();
    returnFlag = false;
    jQuery.ajax({
        url:urlValue,
        data:{delivery_date:deliveryDate,order_type:orderType,delivery_type:deliveryType},
        type:'post',
        async:false,
        success: function(ddate) {

        var calculatedShipDate = ddate;
         if(calculatedShipDate) {
            jQuery('#delivery_date').val(calculatedShipDate);
			jQuery('#calculated_delivery_date').val(calculatedShipDate);
            returnFlag = true;
         }
         
        //}
            
        }
    });
   return returnFlag;
  }

  function validateCartQty() {
    var validAllflag = true;

    $$('input.qty').each(function(e) { 

      //var qty = $(e).value; 
      //var eleid = $(e).readAttribute('id');

       var eachFlag = validateSingleQty(e);
       if(!eachFlag){
         validAllflag = false;
       }

    });

    return validAllflag;
  }


  function validateSingleQty(obj){
    var validflag = true;
    var qty = obj.value; 
    var eleid = obj.id;
    //var check_qty = parseFloat(obj.value).toFixed(2);
    var check_qty = obj.value;
      if(check_qty==''){
	   var validationstr = '<div class="validation-advice" id="advice-required-entry-qty" style="">Please enter numeric value.</div>';
	     jQuery('#validation_'+eleid).html(validationstr);
	   validflag = false;
	  }else if(check_qty<0){
	   var validationstr = '<div class="validation-advice" id="advice-required-entry-qty" style="">'+negative_qty+'</div>';
	     jQuery('#validation_'+eleid).html(validationstr);
	   validflag = false;
	  }else if(check_qty==0){
	   var validationstr = '<div class="validation-advice" id="advice-required-entry-qty" style="">'+zero_qty+'</div>';
	     jQuery('#validation_'+eleid).html(validationstr);
	   validflag = false;
	  }else if(!isInt(check_qty)){
	   validationstr = '<div class="validation-advice" id="advice-required-entry-qty" style="">'+valid_qty+'</div>';
	     jQuery('#validation_'+eleid).html(validationstr);
	   validflag = false;
	  }else if(check_qty > 9999){
	     validationstr = '<div class="validation-advice" id="advice-required-entry-qty" style="">Quantity exceeds the maximum allowable (9999).</div>';
	   jQuery('#validation_'+eleid).html(validationstr);
          validflag = false;
	  }
    return validflag;

  }

  function callSaveOrderheader(actionurl) {
    if(pocheck()){
      disableButton("order_header_save", null);
      document.order_form.action = actionurl;
      document.order_form.submit();
    }
  }

  // Disable Buttons on Cart Page, until Order Header information set
  function callDisableAddtocartvia() {

        if(jQuery('button#addvia_pol').length > 0) {
          disableAddtocartviaBtn('addvia_pol',null);
        }
        if(jQuery('button#addvia_catalog').length > 0) {
          disableAddtocartviaBtn('addvia_catalog',null);
        }
        if(jQuery('button#upload_button').length > 0) {
          disableAddtocartviaBtn('upload_button',null);
        }
        if(jQuery('button#code_button').length > 0) {
          disableAddtocartviaBtn('code_button',null);
        }
        if(jQuery('button#addvia_prevorders').length > 0) {
          disableAddtocartviaBtn('addvia_prevorders',null);
        }
  }
  function disableAddtocartviaBtn(buttonId, objForm) {
        if(buttonId != '') {
          jQuery('button#' + buttonId).attr('disabled', true).addClass('disabledBtn');
          jQuery('button#' + buttonId).attr('data-onclick',jQuery('#' + buttonId).attr('onClick'));
          jQuery('button#' + buttonId).attr('onClick','');
        }

  }
   function checkoutcartDialog(url_popup)
  {
      openProgressDialog();
      
      new Ajax.Request(url_popup, {
          method: 'get',
          onComplete: function(req) {
              closeProgressDialog();
              jQuery("#upsCart").html(req.responseText);
              jQuery('#frm_order_item').jqTransform();
              openDialog('upsCart');
              
          }
      });
  }
  function openDialog(id) {
      contentWin = new Window({
          className: "dialogBG",
          width: 580,
          height: 280,
          overLayBox: true,
          closeEffect : function(self) {
                self.container.puff({
                    duration : 0.4,
                    afterFinish : function() {
                        container.remove();
                    }
                });
            }
      });
      contentWin.setContent(id, false, false);
      contentWin.showCenter();
  }
  
   function validateMiniCartQty() {
    var validAllflag = true;

    $$('#shopminicartform input.qty').each(function(e) { 

      //var qty = $(e).value; 
      //var eleid = $(e).readAttribute('id');

       var eachFlag = validateSingleQty(e);
       if(!eachFlag){
         validAllflag = false;
       }

    });

    return validAllflag;
  }