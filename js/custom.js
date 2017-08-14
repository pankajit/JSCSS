jQuery(function() {
    jQuery('body').jqTransform();
});

var progressDialog = new Object();
var tabs;
var unsaved;
jQuery(document).ready(function() {

    if (jQuery('form').find('input[type=text]').filter(':visible:first')) {
        jQuery('form').find('input[type=text]').filter(':visible:first').focus();
    }


    if(jQuery('.polDetail input#create_pol').length > 0) {
      callDisablePOLBtn();
    }

});
jQuery('iframe').contents().find('body.dialogBG_content').live('keyup', function(e)
{
    if (e.keyCode === 27 && !(jQuery("html").hasClass("dialogContainer"))) {
        var closeId = jQuery('.dialog').attr('id');
        Windows.close(closeId, e);
    }
});

jQuery("html").live("keyup", function(e) {
    if (e.keyCode === 27 && !(jQuery("html").hasClass("dialogContainer"))) {
        var closeId = jQuery('.dialog').attr('id');
        Windows.close(closeId, e);
    }
});

jQuery(".qty").live("keyup", function(e) {
    if (e.keyCode === 13) {
        updateCartAction(1);
    }
});

jQuery('iframe').contents().find('body').live('keyup', function(e)
{
    if (e.keyCode === 27 && !(jQuery("html").hasClass("dialogContainer"))) {
        var closeId = jQuery('.dialog').attr('id');
        Windows.close(closeId, e);
    }
});

// For disable multiple clicks on remove button at POL
jQuery(document).ready(function() {
    jQuery(".polRemoveJs").click(function(e) {
        var eleId = this.id;
        if (jQuery("#" + eleId).hasClass("disabled")) {
            event.preventDefault();
        }
        jQuery("#" + eleId).addClass("disabled");
    });
});

function addToOrder(url) {
    openProgressDialog();
    new Ajax.Request(url, {
        method: 'get',
        onComplete: function(req) {
            if (req.responseText) {
                openProgressDialog();
                var closeId = jQuery('.dialog').attr('id');
                Windows.close(closeId);
                window.location.reload();
            } else {
                jQuery("#message").html(req.responseText);
            }
        }
    });
}
function addProductFileUpload() {
    contentWin = new Window({
        className: "dialogBG",
        closable: true,
        width: 710,
        height: 570,
        overLayBox: true,
        closeEffect: function(self) {
            self.container.puff({
                afterFinish: function() {
                    container.remove();
                }
            });
        }
    });
    contentWin.showCenter();
    contentWin.setContent('file_upload', false, false);
}

function selectAllPolItem(chkboxobj) {
    var flagchkbox = chkboxobj.checked;
    var itemIdStr = $('itemidstr').value;
    var itemIdArr = itemIdStr.split(",");
      
    for(var i=0;i<itemIdArr.length;i++){
        var itemChk = "politem_"+itemIdArr[i];
        document.getElementById(itemChk).checked = flagchkbox;
        if(flagchkbox) {
            $(itemChk).previous('a').addClassName('jqTransformChecked');
        } else{
            $(itemChk).previous('a').removeClassName('jqTransformChecked');
        }
    }
}

function deleteAllPolItem(requrl, returnurl){

    var flagchkbox = $('select_politem').checked;
    var sendItemStr = '';

    //if(flagchkbox){
      var itemIdStr = $('itemidstr').value;
      var itemIdArr = itemIdStr.split(",");
      for(var i=0;i<itemIdArr.length;i++){
        var itemChk = "politem_" + itemIdArr[i];
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
          parameters:{items: sendItemStr,},
          onComplete: function(req){
              closeProgressDialog();
              setLocation(returnurl);
          },
        });
      }
    }

function showMessageForCartShippingDate() {
    contentWin = new Window({
        className: "dialogBG",
        closable: true,
        width: 580,
        height: 280,
        overLayBox: true,
        closeEffect: function(self) {
            self.container.puff({
                afterFinish: function() {
                    container.remove();
                }
            });
        }
    });
    contentWin.showCenter();
    contentWin.setContent('cartdatemessage', false, false);
}


jQuery("#tncarea").live('click', function(event) {
    event.preventDefault();
    contentWin = new Window({
        className: "dialogBG",
        closable: true,
        width: 900,
        height: 580,
        overflow: "auto",
        overLayBox: true,
        closeEffect: function(self) {
            self.container.puff({
                afterFinish: function() {
                    container.remove();
                }
            });
        }
    });

    contentWin.showCenter();
    contentWin.setContent('terms_condition_data', false, false);

})
function addProductCode() {
    contentWin = new Window({
        className: "dialogBG",
        closable: true,
        width: 710,
        height: 500,
        overLayBox: true,
        closeEffect: function(self) {
            self.container.puff({
                afterFinish: function() {
                    container.remove();
                }
            });
        }
    });
    contentWin.showCenter();
    contentWin.setContent('code', false, false);
}

function changeLocationCode() {
    contentWin = new Window({
        className: "dialogBG",
        closable: true,
        width: 900,
        height: 580,
        overLayBox: true,
        closeEffect: function(self) {
            self.container.puff({
                afterFinish: function() {
                    container.remove();
                }
            });
        }
    });
    contentWin.showCenter();
    contentWin.setContent('all_soldto_selection', false, false);
}

function addProductPrevHistory(order_product_id) {
    contentWin = new Window({
        className: "dialogBG",
        closable: false,
        width: 710,
        height: 483,
        overLayBox: true,
        closeEffect: function(self) {
            self.container.puff({
                afterFinish: function() {
                    container.remove();
                }
            });
        }
    });
    contentWin.showCenter();
    contentWin.setContent(order_product_id, false, false);
}

/* create function for popup email :sasmita */
function addEmailRequest() {
    contentWin = new Window({
        className: "dialogBG",
        closable: true,
        width: 710,
        height: 483,
        overLayBox: true,
        closeEffect: function(self) {
            self.container.puff({
                afterFinish: function() {
                    container.remove();
                }
            });
        }
    });
    contentWin.showCenter();
    jQuery('#validationError').hide();
    contentWin.setContent('email_csr', false, false);
}

function closeDialog(event, buttonId) {
    if (jQuery("#nh")) {
        jQuery("#nh").html('');
    }

    if (jQuery("#message")) {
        jQuery("#message").empty();
    }

    if (jQuery("#searchSoldTo")) {
        jQuery("#searchSoldTo").empty();
    }

    if (jQuery('#poltable')) {
        jQuery('#poltable tbody > tr').remove();
        jQuery('#poltable tbody').append('<tr></tr>');
    }

    //jQuery('form').trigger("reset");

    if (jQuery(".validation-advice")) {
        jQuery(".validation-advice").remove();
    }

    var closeId = jQuery('.dialog').attr('id');
    if (buttonId != '') {
        setTimeout(function() {
            if (jQuery('#' + buttonId)) {
                jQuery('#' + buttonId).focus();
            }
        }, 100);
    }

    var inputflagCount = parseInt('0');
    var selectflagCount = parseInt('0');
    if(jQuery('#' + closeId + ' input:text').length > 0) {
        jQuery('#' + closeId + ' input[type=text]:first').each(function(){ 
            if(jQuery(this).val() != '') 
                inputflagCount++;
            jQuery(this).val(''); 
        });
     }

     if (jQuery('#' + closeId + ' #enduserfilter').length > 0 && jQuery('#' + closeId + ' #enduserfilter option:selected').val() != 'ALL') {
        jQuery('#' + closeId + ' #enduserfilter option[value="ALL"]').attr('selected', 'selected');
        Event.fire($("enduserfilter"), "chosen:updated");
        selectflagCount++;
     }

      if(inputflagCount != 0 || selectflagCount != 0 && jQuery('.table_window .search_icone:first'))
         jQuery('.table_window .search_icone:first').trigger('click');

    Windows.close(closeId, event);
}
function addViaCode() {
    contentWin = new Window({
        className: "dialogBG",
        closable: true,
        width: 710,
        height: 510,
        overLayBox: true,
        closeEffect: function(self) {
            self.container.puff({
                afterFinish: function() {
                    container.remove();
                }
            });
        }
    });

    contentWin.showCenter();
    contentWin.setContent('code', false, false);
    jQuery('#validationError').hide();
    //contentWin.setAjaxContent(url, options, showCentered, showModal)
}
function formsubmit() {
    var skinurl = jQuery('#skinurl').val();
    var productvalue = jQuery('#product_id').val();
    var websitecode = jQuery('#websiteCode').val();
    var lawebsitecode = jQuery('#lawebsiteCode').val();
    var qtyvalue = jQuery('#qty').val();
    if(websitecode == lawebsitecode) {
        qtyvalue = parseFloat(qtyvalue).toFixed(2);
    }
    var timestamp = new Date().getTime();
    productvalue1 = productvalue.replace(" ", "~~~");
    productvalue1 = productvalue1.replace(".", "###");

    var name = 'qty_' + productvalue1 + '_' + timestamp;
    jQuery('#poltable tr:last')
            .after(
                    '<tr id = '
                    + name
                    + '><td>'
                    + productvalue
                    + '</td><td class="a-center"><input type = "text" readonly = "readonly" class="itemlist text_box_no_border"  name = "'
                    + name
                    + '" id = "added_qty" value = '
                    + qtyvalue
                    + '>'
                    + '</td> <td class="a-center last"><a onclick = "deleteRow(this)" href="javascript:void(0);" class="iconDelete"><img src= " '
                    + skinurl
                    + ' " alt="' + Rem + '" title="' + Rem + '"/></a></td></tr>');
    closeProgressDialog();
    return false;
}

function deleteRow(btn) {
    var row = btn.parentNode.parentNode;
    row.parentNode.removeChild(row);
}

function checkvalue() {
    jQuery('#validatevalue').css('display', 'none');
    var name = jQuery('#poltable tr:visible:last').attr('id');
    if (name) {
        return true;
    }
    jQuery('#validationError').css('display', 'none');
    jQuery('#validatevalue').css('display', 'block');
    return false;
}

isProgressDialogOpen = false;
function openProgressDialog() {
    
    progressDialog = Object.extend(progressDialog, Dialog || {});
    progressDialog.info("", {
        className: 'processDialogBG',
        width: 100,
        height: 100,
        showProgress: true
    });
    
    isProgressDialogOpen = true;
    
}

function iframeOpenProgressDialog(t,l) {
    
    progressDialog = Object.extend(progressDialog, Dialog || {});
    progressDialog.info("", {
        className: 'processDialogBG',
        width: 100,
        height: 100,
        top : t,
        left : l,
        showProgress: true
    });
    
    isProgressDialogOpen = true;
    
}
function closeProgressDialog() { 
    isProgressDialogOpen = false;
    progressDialog.closeInfo();
}

function changeSoldTo(id) {
    jQuery("#changedLocation").val(id);
    jQuery("#axalta-search-order").submit();
}

function closeSoldToDialog(event) {
    jQuery("#message").empty();
    var closeId = jQuery('.dialog').attr('id');
    Windows.close(closeId, event);
}

/** Na Yada Custom JS **/

jQuery.noConflict();
jQuery(function() {
    jQuery('form').jqTransform();
});
jQuery.urlParam = function(name) {
    var results = new RegExp('[\\?&]' + name + '=([^&#]*)')
            .exec(window.location.href);
    if (results == null) {
        return null;
    } else {
        return results[1] || 0;
    }
}

document.observe('dom:loaded', function(evt) {
    //var myForm = new VarienForm('orderForm', true);
    jQuery(".enduserPagination a").live('click', function(event) {
        //anim(jQuery(this).attr('href'));
        event.preventDefault();
        page = jQuery(this).html();
        if (page == '&nbsp;' || page == '' || page == '...')
        {
            page = jQuery(this).attr('rel');
        }
        type = jQuery("#enduserfilter").val();
        enduser = jQuery("#enduser_search").val();
        sortfield = jQuery('input[name=endusersortfield]').val();
     // get orginal order in pager link
        sortorder = jQuery('input[name=enduserorgsortorder]').val();
        updateEnduser(type, page, enduser, sortfield, sortorder);
    });
    jQuery('#enduserlookup .ascdesc').live('click', function(event) {
        event.preventDefault();
        page = 1;
        type = jQuery("#enduserfilter").val();
        enduser = jQuery("#enduser_search").val();
        order = jQuery('input[name=endusersortorder]').val();
        datafield = this.getAttribute('control');
        updateEnduser(type, page, enduser, datafield, order);
    });
    jQuery(".enduserfromlistPagination a").live('click', function(event) {
        event.preventDefault();
        page = jQuery(this).html();
        if (page == '&nbsp;' || page == '' || page == '...')
        {
            page = jQuery(this).attr('rel');
        }
        type = jQuery("#enduserfromfilter").val();
        enduser = jQuery("#enduser_from_search").val();
        datafield = jQuery('input[name=enduserfromsortfield]').val();
        order = jQuery('input[name=enduserfromsortorder]').val();
        updateFromEnduser(type, page, enduser, datafield, order);
    });
    jQuery('#enduserfromlookup .ascdesc').live('click', function(event) {
        event.preventDefault();
        page = 1;
        type = jQuery("#enduserfromfilter").val();
        enduser = jQuery("#enduser_from_search").val();
        order = jQuery('input[name=enduserfromsortorder]').val();
        datafield = this.getAttribute('control');
        updateFromEnduser(type, page, enduser, datafield, order);
    });
    jQuery(".distributorPagination a").live('click', function(event) {
        event.preventDefault();
        dist = jQuery("#distributor_search").val();
        page = jQuery(this).html();
        if (page == '&nbsp;' || page == '' || page == '...')
        {
            page = jQuery(this).attr('rel');
        }
        datafield = jQuery('input[name=distributorsortfield]').val();
        // get orginal order in pager link
        order = jQuery('input[name=distributororgsortorder]').val();
        updateDistributor(page, dist, datafield, order);
    });
    jQuery('#distributorlookup .ascdesc').live('click', function(event) {
        event.preventDefault();
        page = 1;
        dist = jQuery("#distributor_search").val();
        order = jQuery('input[name=distributorsortorder]').val();
        datafield = this.getAttribute('control');
        updateDistributor(page, dist, datafield, order);
    });

    jQuery(".shiptoPagination a").live('click', function(event) {
        event.preventDefault();
        dist = jQuery("#shipto_search").val();
        page = jQuery(this).html();
        if (page == '&nbsp;' || page == '' || page == '...')
        {
            page = jQuery(this).attr('rel');
        }
        datafield = jQuery('input[name=shiptosortfield]').val();
        order = jQuery('input[name=shiptosortorder]').val();
        updateShipto(page, dist, datafield, order);
    });
    jQuery('#shiptolookupdata .ascdesc').live('click', function(event) {
        event.preventDefault();
        page = 1;
        dist = jQuery("#shipto_search").val();
        order = jQuery('input[name=shiptosortorder]').val();
        datafield = this.getAttribute('control');
        updateShipto(page, dist, datafield, order);
    });

    jQuery(".productlistpagination a").live('click', function(event) {
        event.preventDefault();
        search = jQuery('#product_search').val();
        page = jQuery(this).html();
        if (page == '&nbsp;' || page == '' || page == '...')
        {
            page = jQuery(this).attr('rel');
        }
        datafield = jQuery('input[name=productsortfield]').val();
        order = jQuery('input[name=productorgsortorder]').val();
       
        updateProductTable(page, search, datafield, order);
    });
    jQuery('#productlist .ascdesc').live('click', function(event) {
        event.preventDefault();
        page = 1;
        search = jQuery('#product_search').val();
        order = jQuery('input[name=productsortorder]').val();
        datafield = this.getAttribute('control');
        updateProductTable(page, search, datafield, order);
    });
    var config = {
        '.chosen-select': {
            disable_search: true,
            width: "100%"
        }
    }
    var results = [];
    var chosenId = [];

    if (document.getElementById('createTab1')) {
        tabs = new Control.Tabs('createTab1', {
            afterChange: function(tabs) {
                for (var i = 0; i < chosenId.length; i++) {
                    var one = chosenId[i] + '_chosen-results';
                    var two = chosenId[i] + '_scrollbar_track';
                    new Control.ScrollBar(one, two);
                }
                throw $break;
            },
        });
    }
    results.push(tabs);

    if(jQuery(".tableFixedheight")){
        var tableHeight = 0
        var thableHeaderheight = 0 ;


        jQuery.each(jQuery(".tableFixedheight"), function(i){
         var curEle = jQuery(".tableFixedheight")[i];
             if(jQuery(jQuery(".tableFixedheight")[i]).find('table tbody tr').length > 5){
                  thableHeaderheight = jQuery(jQuery(".tableFixedheight")[i]).find('table thead tr').height();
                  jQuery.each(jQuery(jQuery(".tableFixedheight")[i]).find('table tbody tr'),function (j) {
                       if(j < 5){
                            tableHeight = tableHeight + parseInt(jQuery(jQuery(".tableFixedheight")[i]).find('table tbody tr').height());
                       }
               
                  });
                results.push(jQuery(jQuery(".tableFixedheight")[i]).find('table').fixedHeaderTable({ height: tableHeight + thableHeaderheight, altClass: 'odd'}));
                tableHeight = 0;
                thableHeaderheight = 0;
             }
        });
    }
    return results;
});

function showContaint(obj, orderId) {
    var userType;
    if (typeof (orderId) !== 'undefined' && orderId != '') {
        userType = obj;
    } else {
        userType = obj.value;
    }

    if (userType == 'newuser') {
        $('myaccountInformation').show();
    } else if (userType == 'existinguser') {
        $('myaccountInformation').hide();
    }
}


/** add comments **/
function polQtyValidation(obj) {
    var objId = obj.id;
    var origVal = document.getElementById("qtyValue_" + objId).value;
    if (obj.value == "" || isNaN(obj.value) || jQuery.trim(obj.value) == '') {
        obj.value = origVal;
    }
    else {
        var qtyDecimal = document.getElementById('isQtyDecimal').value;
        if (qtyDecimal) {
            obj.value = parseFloat(obj.value).toFixed(2);
        }

    }

}

function prodQtyValidation(obj, prodid, nmval, eqty) {

    var prodqty = obj.value;
    var qtyflag = false;
    if(!isNaN(prodqty) && prodqty >= 0 && prodqty != 0 && jQuery.trim(prodqty) != '')
    {
        document.getElementById('qty_validation_' + prodid).innerHTML = '';
        document.getElementById('qty_validation_' + prodid).style.display = 'none';

        var qtyDecimal = document.getElementById('isQtyDecimal').value;
        if (qtyDecimal) {
            obj.value = parseFloat(obj.value).toFixed(2);
        }
    }
    else if(parseInt(prodqty) > 0 && parseInt(prodqty) % 1 === 0)
    {
        document.getElementById('qty_validation_' + prodid).innerHTML = '';
        document.getElementById('qty_validation_' + prodid).style.display = 'none';

        //var qtyDecimal = document.getElementById('isQtyDecimal').value;
        if(document.getElementById('product_qty_'+prodid) != null) {
            var qtyDecimal = document.getElementById('product_qty_'+prodid).value;
            if (qtyDecimal) {
                //obj.value = parseFloat(obj.value).toFixed(2);
                obj.value = parseInt(obj.value);
            }
        }
        
    }
    else {
        if (!nmval) {
            nmval = 'Please enter numeric value .';
        }
        if (!eqty) {
            eqty = valid_qty;//'Please enter quantity.';
        }
        var validationstr = '<div class="validation-advice" id="advice-required-entry-qty" style="">' + nmval + '</div>';
        if (prodqty == '') {
            validationstr = '<div class="validation-advice" id="advice-required-entry-qty" style="">' + eqty + '</div>';
        }

        document.getElementById('qty_validation_' + prodid).innerHTML = validationstr;
        document.getElementById('qty_validation_' + prodid).style.display = 'inline';
        // validation are not validate then return false
        return false;
    }
    // validation are correct then return true
    return true;

}






/** START : for Place Order/Review page page related when page loads/click on place order**/
function checkPlaceOrder(successurl)
{

    if (jQuery('#validate_tnc')) {
        jQuery('#advice-required-entry-tnc').css('display', 'none');
        if (document.getElementById('tnc')) {
            if (document.getElementById('tnc').checked) {
                setLocation(successurl + '?tnc=' + jQuery('#tnc').val());
                disableButton('btn-place-order',null);
            }
            else {
                jQuery('#advice-required-entry-tnc').css('display', 'block');
                // window.location = jQuery('#cur_url').val()+"#tncarea";
                alert(default_term_cond);
                return false;
            }
        }
        else
        {
            setLocation(successurl);
            disableButton('btn-place-order',null);
        }
    }
    else if (!jQuery('#validate_tnc')) {
        if (document.getElementById('tnc')) {
            setLocation(successurl + '?tnc=' + jQuery('#tnc').val());
            disableButton('btn-place-order',null);
        }
    }

}

function validateStock() {
    var totalflag = document.getElementById('validate_total').value;

    if (totalflag) {
        var ot = document.getElementById('order_type').value;
        var pricetotal = parseInt(document.getElementById('grandtotal').value);
        if (ot == 10) {
            var stockmintotal = parseInt(document.getElementById('stockmintotal').value);

            if (pricetotal < stockmintotal) {
                var stock_order_total_msg = document.getElementById('stock_order_total_msg').value;
                alert(stock_order_total_msg);
            }

        }
    }
}

function validateTruckload() {
    var totalflag = document.getElementById('validate_total').value;

    if (totalflag) {
        var ot = document.getElementById('order_type').value;
        var pricetotal = parseInt(document.getElementById('grandtotal').value);
        if (ot == 11) {
            var truckmintotal = parseInt(document.getElementById('truckmintotal').value);

            if (pricetotal < truckmintotal) {
                var truck_order_total_msg = document.getElementById('truck_order_total_msg').value;
                alert(truck_order_total_msg);
                return false;
            }

            return true;
        }

        return true;
    }

    return true;
}

function confirmPlaceOrder(successurl) {
    if (validateTruckload()) {
        //if (document.getElementById('redflag').value == "false") {
        var confirmbox_msg = document.getElementById('confirmbox_msg').value;
        var isconfirm = confirm(confirmbox_msg);
        if (isconfirm) {
            setLocation(successurl);
            disableButton('btn-place-order',null);
        }
        /*}
         else
         {
         alert("All your line items are invalid (Pink items). Your Order cannot be placed.");
         }*/
    }
}

function validatePriceTotal() {
    var requrl = document.getElementById('validate_total_url').value;
    var totalflag = document.getElementById('validate_total').value;
    var ot = document.getElementById('order_type').value;

    if (totalflag && requrl != '' && ot == 11) {
        var pricetotal = document.getElementById('grandtotal').value;
        new Ajax.Request(requrl,
                {
                    method: 'post',
                    parameters: {pricetotal: pricetotal},
                    onComplete: function(res) {
                        if (res.responseText != '') {
                            alert(res.responseText);
                        }
                    },
                });
    }
}
/** END : for Place Order/Review page page related when page loads/click on place order**/

/*** Show Contact Us Form ***/
function openContacts() {
    contentWin = new Window({
        className: "dialogBG",
        closable: true,
        width: 710,
        height: 483,
        overLayBox: true,
        closeEffect: function(self) {
            self.container.puff({
                afterFinish: function() {
                    container.remove();
                }
            });
        }
    });

    contentWin.showCenter();
    contentWin.setContent('contactLookUp', false, false);
}

/*** Show Help Topic wise ***/
function openHelp(url,fullActionName) {
    contentWin = new Window({
        className: "dialogBG",
        closable: true,
        width: 910,
        height: 580,
        maximizable: true,
        overLayBox: true,
        closeEffect: function(self) {
            self.container.puff({
                afterFinish: function() {
                    container.remove();
                }
            });
        }
    });

    openProgressDialog();
    new Ajax.Request(url, {
        method: 'post',
        parameters: {fullaction: fullActionName},
        onComplete: function(req) {
            jQuery('#helpLookUpLoad').html(req.responseText);
            if (jQuery('#helpLookUp'))
            {
                closeProgressDialog();
                contentWin.showCenter();
                contentWin.setContent('helpLookUp', false, false);
            } else {
                closeProgressDialog();
                contentWin.showCenter();
                contentWin.setContent('helpLookUpDefault', false, false);
            }
        }
    });
}

/** added by amit for adding print function **/
function printpage() {
	/*jQuery(".axl_nav").hide();
	jQuery(".cartContainer").hide();
	jQuery(".grid_8").hide();
	jQuery(".jqtransformdone").css("background", "none");*/
	window.print();
}

function submitinvoicepdfaction(elm)
{
    var flagchkbox = jQuery('select_invoiceitem').checked;
    var sendItemStr = '';
    //if(flagchkbox){
    var itemIdStr = $('itemidstr').value;
    var itemIdArr = itemIdStr.split(",");
    for (var i = 0; i < itemIdArr.length; i++) {
        var itemChk = "invoice_" + itemIdArr[i];
        if ($(itemChk).checked) {
            if (sendItemStr == '') {
                sendItemStr = itemIdArr[i];
                jQuery('#invoice_div_' + itemIdArr[i]).css('display', 'block');
            }
            else {
                jQuery('#invoice_div_' + itemIdArr[i]).css('display', 'block');
                sendItemStr += "," + itemIdArr[i];

            }
        }
    }
    if (sendItemStr == '') {
        alert(sel_one_prod);
    }
    else
    {
        if (elm != undefined && jQuery('#' + elm.id).length > 0) {
            disableButton(elm.id, null)
        }
        document.forms['viewform'].submit();
    }
}

/*
 Ajax request to send Contact Us Request
 */
function sendEmail(url) {
    var subject = document.getElementById('subject').value;
    var comment = document.getElementById('comment').value;
  

    openProgressDialog();
    new Ajax.Request(url, {
        method: 'post',
        parameters: {subject: subject, comment: comment},
        onComplete: function(req) {
            if (req.responseText) {
                openProgressDialog();
                var closeId = jQuery('.dialog').attr('id');
                Windows.close(closeId);
                window.location.reload();
            } else {
                alert(req.responseText);
            }
        }
    });
}

function closePopup(event, buttonId) {
    var closeId = jQuery('.dialog').attr('id');
    Windows.close(closeId, event);
    setTimeout(function() {
        if (jQuery('#' + buttonId)) {
            jQuery('#' + buttonId).focus();
        }
    }, 100);
}

function SetMultiselectValues(id, arr)
{
    var i;
    for (i = 0; i < id.length; i++)
    {
        id.options[i].selected = false;
    }
    if (arr.length > 0) {
        for (var j = 0; j < arr.length; j++) {
            id.options[arr[j]].selected = true;
        }
    }
}


function openShipmentDialog(url, val)
{
    openProgressDialog();
    url = url + 'tracknumber/' + val;
    new Ajax.Request(url, {
        method: 'get',
        onComplete: function(req) {
            closeProgressDialog();
            jQuery("#upsLookUp").html(req.responseText);
            openDialog('upsLookUp');
        }
    });
}

function resetPopupValidatedElement(elementName) {
    jQuery('input[name^="' + elementName + '"]').each(function() {
        jQuery(this).val('1').parents('td:first').find('div.validation-advice').remove();

    });
}

function setGlobalFocus(elmId) {
    setTimeout(function() {
        jQuery('#' + elmId).focus();
    }, 100);
}

/*jQuery(function(){
 jQuery('input[type="submit"], button[type="submit"]').click(function(){
 console.log('Clicked...');
 jQuery(this).attr('disabled',true).addClass('disabledBtn');
 });
 });*/

// Disables button
function disableButton(buttonId, objForm) {
    if (typeof objForm == 'object' && objForm != null) {
        if (objForm.validator.validate() == true) {
            //console.log('Disabled....')
            jQuery('#' + buttonId).attr('disabled', true).addClass('disabledBtn');
        }
    } else if (objForm == null) {
        //console.log('Disabled....')
        jQuery('#' + buttonId).attr('disabled', true).addClass('disabledBtn');
    }
}

// Enables button
function enableButton(buttonId) {
    jQuery('#' + buttonId).attr('disabled', false).removeClass('disabledBtn');
}



//call disable button script, on each required button while creating POL
function callDisablePOLBtn() {

      var createPol = jQuery('.polDetail input#create_pol').val();
      if(createPol == 1) {
        if(jQuery('.polDetail button#wishlist-catalog-button').length > 0) {
          disablePOLButton('wishlist-catalog-button',null);
        }

        if(jQuery('.polDetail button#upload_button').length > 0) {
          disablePOLButton('upload_button',null);
        }

        if(jQuery('.polDetail button#code_button').length > 0) {
          disablePOLButton('code_button',null);
        }
      }
}

// Disable Buttons on POL Page, while creating POL
function disablePOLButton(buttonId, objForm) {
      if(buttonId != '') {
        jQuery('.polDetail #' + buttonId).attr('disabled', true).addClass('disabledBtn');
        jQuery('.polDetail #' + buttonId).attr('data-onclick',jQuery('.polDetail #' + buttonId).attr('onClick'));
        jQuery('.polDetail #' + buttonId).attr('onClick','');
      }

}

function enablePOLButton(buttonId) {
  if(buttonId != '') {
    jQuery('.polDetail #' + buttonId).attr('disabled', false).removeClass('disabledBtn');
    jQuery('.polDetail #' + buttonId).attr('onClick',jQuery('.polDetail #' + buttonId).attr('data-onclick'));
    jQuery('.polDetail #' + buttonId).attr('data-onclick','');
  }
}

// Disable Bunch of Button under specified container.
function disableMultipleButtons(selector) {
    jQuery(selector).attr('disabled',true).addClass('disabledBtn');
    // Disabling other buttons on the page.
    jQuery('button#lookuplocation,button#lookupjobberlocation,button#addfromlistyada,button#lookuplocationsec,button#btn-submit-comment,input#radio_other_distributor,button#lookupstopjobber,button#lookupstoplocation,button#lookupjobberna,button#lookupna').attr('disabled',true).addClass('disabledBtn').attr('onclick','');
}
//hide validation message after 5 Secs
function hideElm(elm) {
    setTimeout(function() {
        jQuery(elm).parents('td:first').find('div.validation-advice').fadeOut('slow');
    }, 3000
            );

}
function hideValidElm(elm) {
    setTimeout(function() {
        jQuery(elm).fadeOut('slow');
    }, 120
            );
}

// Set focus to last input element.
function setFocusToLastElement(containerId, explicitId) {
    if (explicitId != undefined) {
        jQuery('#' + explicitId).focus();
    } else {
        jQuery('#' + containerId + ' :input:visible').last().focus();
    }
}


// To reset chosen multi-select box properly.
Chosen.prototype.register_observers = Chosen.prototype.register_observers.wrap(
        function(callOriginal) {
            callOriginal();
            var _this = this;
            this.form_field.observe("chosen:results_show", function(evt) {
                return _this.results_show();
            });
        }
);

// To get end-user list associated with selected distributor.[ For Yada create order ,transfer, stop-support and name/address change page.]
selectedDistributor = 0;
transferFromValue = 0;
function getEnduserByDistributor(elementName, callFunction, toEndUser) {
    if (elementName == undefined || elementName == '') {
        elementName = 'distributor_sfdc';
    }
    if (callFunction == undefined || callFunction == '') {
        callFunction = 'updateEnduser';
    }

    var distributorSfdc = jQuery('input[name=' + elementName + ']').val();
    type = jQuery("#enduserfilter").val();
    page = 1;
    strFunc = callFunction + '("' + type + '","' + page + '");';
    //updateEnduser(type, page);
	
    if (distributorSfdc != '' && (selectedDistributor != distributorSfdc) && (toEndUser == undefined || toEndUser == false || toEndUser == ''))
    {
		if(!isProgressDialogOpen) {
			eval(strFunc);
		}
    } else if (distributorSfdc != '' && (transferFromValue != distributorSfdc) && (toEndUser == true || toEndUser != undefined)) {
        if(!isProgressDialogOpen) {
			eval(strFunc);
		}
    }

}

function genericQtyValidation(elm, nmval, eqty, isDecimal) {
    objRegex = /^\d+$/;  // Integer
    if (isDecimal == true) {
        objRegex = /^\d+(?:\.\d+|)$/; // Integer or Float
    }

    if (objRegex.test(elm.value) == false) {

        if (!nmval) {
            nmval = 'Please enter numeric value greater than 1.'
        }
        if (!eqty) {
            eqty = valid_qty;//'Numeric value missing from quantity field.';
        }
        var validationstr = '<div class="validation-advice" style="">' + nmval + '</div>';
        if (elm.value == '') {
            validationstr = '<div class="validation-advice" style="">' + eqty + '</div>';
        }

        jQuery(elm).parents('td:first').find('.qty-validation:first').html(validationstr).css('display', 'inline');
        return false;
    } else {
        return true;
    }
}

// Function to get VOC-Rule options html by state.

function setVocRuleOptions(state, elmentId, urlValue) {
    jQuery.ajax({
        url:urlValue,
        data:'state='+state,
        type:'get',
        success: function(data) {
            jQuery('#'+elmentId).html(data);
            Event.fire($(elmentId), "chosen:updated");
        }
    });
}

// Function to get UPS Tranist Time and Calculate Delivery Date by state.

function getUpsStateTranistTime(state, elmentId, urlValue) {
    jQuery.ajax({
        url:urlValue,
        data:'statecode='+state,
        beforeSend: function() {
            jQuery('#'+elmentId).val('');
            jQuery('#'+elmentId).addClass('request-delivery-loader');},
        type:'post',
        success: function(data) {
            jQuery('#'+elmentId).val(data);
			jQuery('#endDateLimit').val(data);
            jQuery('#'+elmentId).removeClass('request-delivery-loader');
            Event.fire($(elmentId), "chosen:updated");
        }
    });
}

// function to make masking on phone number
function changeNumber(id)
{
    var last = jQuery(id).val().substr( jQuery(id).val().indexOf("-") + 1 );
    if( last.length == 3 ) {
        var move = jQuery(id).val().substr( jQuery(id).val().indexOf("-") - 1, 1 );
        var lastfour = move + last;
        
        var first = jQuery(id).val().substr( 0, 9 );
        
        jQuery(id).val( first + '-' + lastfour );
    }
}

// Added maxlength support for IE browsers for Textarea.
jQuery('textarea[data-maxlength]').live('keyup blur', function() {
    // Store the maxlength and value of the field.
    var maxlength = jQuery(this).attr('data-maxlength');
    var val = jQuery(this).val();

    // Trim the field if it has content over the maxlength.
    if (val.length > maxlength) {
        jQuery(this).val(val.slice(0, maxlength));
    }
});

function checkProductTab() {
    if(jQuery('#tab_productdetail').length > 0) {
        jQuery('#tab_productdetail').click();
        window.scrollTo(0,0);
    }
}

function hidefilter() {
    jQuery('#invoice_block').css('display', 'none');
    jQuery('#hide_filter').css('display', 'none');
    jQuery('#show_filter').css('display', 'block');
}

function showfilter() {
    jQuery('#invoice_block').css('display', 'block');
    jQuery('#show_filter').css('display', 'none');
    jQuery('#hide_filter').css('display', 'block');
}
/**ADD BY RAKESH 24 JULY**/
function isInt(n) {
   return n % 1 === 0;
}

/*****************START*****************
@Bug Id 468 
@ This funtion will get value for 468 issue 
*******************************/
function checkhasqtyselectedornot(){
		var qtyflag=0;
		jQuery("input:checkbox[name=chkbox]:checked").each(function () {
			var productid=jQuery(this).val();
			var qty=jQuery.trim(jQuery("#qty_"+productid).val());
			 if(isInt(qty) && qty > 0){
					qtyflag++;
				}			
		});
		return qtyflag;
	}
/**********End Bug Id 468****************/
/**********NOT IS USED****************/
function leavepage2222222222222(redurl,formnameid,ordertype){
	if (typeof ordertype !== "undefined" && (ordertype == "standard" || ordertype == "return")) { 
		openpopp('modal-ordertype-savecart');
		jQuery("#redirecturl").val(redurl);
		return false;
	}
	else{
		if(formnameid==''){
			window.location.href=redurl;
		}else{
		var formorgdata=jQuery('#'+formnameid).data('serialize');
		/*if(formorgdata==null){
		formorgdata='';
		}*/
		var currentf=jQuery('#'+formnameid).serialize();
		//alert(formnameid);

			if(currentf!=formorgdata){
			//var ck=confirm('Performing this action will result in changes being discarded.\n Are you sure you want to continue ?');
			
			/**********Bug Id 466,467,468 for all the this code is working , if no data selected popup message will not come********/
				var rowid = jQuery('#currentrowid').val();
				var productcode = jQuery('#product_id_'+rowid).val();
				
				var checkvalue=checkhasqtyselectedornot();
				
				if(checkvalue!=0){
					openpopp('modal-saveformdata-message');
				}else if(typeof productcode != "undefined" && productcode!=""){
					openpopp('modal-saveformdata-message');
				}
				else{
					window.location.href=redurl;
				}
				/************* End bug id 466,467,468 **********/
				jQuery("#redirecturl").val(redurl);
						/*if(ck==true){
							window.location.href=redurl;
						}*/
			}else{
				window.location.href=redurl;
			}
	 }  
   }	 
}
/**********END NOT IS USED****************/
function leavepage(redurl,formnameid,ordertype){
	if (typeof ordertype !== "undefined" && (ordertype == "standard" || ordertype == "return")) { 
		openpopp('modal-ordertype-savecart');
		jQuery("#redirecturl").val(redurl);
		return false;
	}
	else{
		if(formnameid==''){
			window.location.href=redurl;
		}else{
		var formorgdata=jQuery('#'+formnameid).data('serialize');
		var currentf=jQuery('#'+formnameid).serialize();
/**********bug id 468 catalog order page correct popup date 07-April-2016****************/		
		if(formnameid=='addMultiProdcartForm'){
				var rowid = jQuery('#currentrowid').val();
				var productcode = jQuery('#product_id_'+rowid).val();
				var checkvalue=checkhasqtyselectedornot();		
				if(checkvalue!=0){
				openpopp('modal-saveformdata-message');
				jQuery("#redirecturl").val(redurl);
				}else if(typeof productcode != "undefined" && productcode!=""){
				openpopp('modal-saveformdata-message');
				jQuery("#redirecturl").val(redurl);
				}
				else{
				window.location.href=redurl;
				}
		}else if(currentf!=formorgdata && formnameid!='addMultiProdcartForm'){
		//var ck=confirm('Performing this action will result in changes being discarded.\n Are you sure you want to continue ?');
		openpopp('modal-saveformdata-message');
		jQuery("#redirecturl").val(redurl);
		if(ck==true){
		  window.location.href=redurl;
		}
		}else{
		window.location.href=redurl;
		}
	 }  
   }	 
}

function redirectAfterSaveFormData(){
	redurl = jQuery("#redirecturl").val();
	 window.location.href=redurl;
}
function orgformdate(formnameid){
//alert(formnameid);
jQuery('#'+formnameid).data('serialize',jQuery('#'+formnameid).serialize());
}


//Comment Bug 104
//Deletion form mini-cart should return to mini-cart minus the item deleted
function confirmAjaxCartDelete(itemID){
	openpopp('confirm-ajax-cart-delete');
	jQuery("#delItemID").val(itemID);
}

function ajaxCartDelete(cancelbuttonid){
	var cartItemsArr	= jQuery("#itemidstr").val().split(',');
	var cartItemsLength = cartItemsArr.length;
	var urlValue		= jQuery('#item_delete_url').val();
	
	openProgressDialog();
	
	jQuery.ajax({
		type: "POST",
		dataType: 'json',
		url: urlValue,
		data: { 'b4': cartItemsLength, 'id' : jQuery("#delItemID").val()} ,
		success: function(data) {
			console.log('success:data = '+JSON.stringify(data));
			//Close the dialogue box
			jQuery("#" + cancelbuttonid).trigger("click");
			
			if(data.msg == 'success'){
				//jQuery.when( updateminishoppingcart(), updatetqty() ).then( setTimeout(openMinicartOverlay, 5000) );
				//jQuery.when(callUpdateMiniShoppingCart(), callUpdateQty(), showAjaxCartDelMsg()).then(openMinicartOverlay);
				
				promise = callUpdateQty().then(callUpdateMiniShoppingCart).then(openMinicartOverlay);
			//}else{
				//After deletion the cart is empty or deletion request could not be completed due to some error so reload the page
				closeProgressDialog();
				//reloadThisLocPage('dashboard');//or pass anything but should NOT remain empty param
			}
		},
		
		error: function(xhr, status, error) {
			console.log("error:xhr = " + JSON.stringify(xhr));
			console.log("error:error = " + error);
			
			alert('Some error has occured. Please try again');
			closeProgressDialog();
			reloadThisLocPage();
			//jQuery('#validationm').html(xmlhttp.status);
		}
	});
}

function openMinicartOverlay(){
	var minicart_half_or_full = jQuery("#minicart_half_or_full").val();
	
	openpopp('ajax-cart-delete-msg');
	setTimeout(function(){
		//Open minicart overlay
		if(minicart_half_or_full == 'half')
			jQuery(".arrow_expand").trigger("click");
		else
			jQuery(".arrow_expand_full").trigger("click");
		
		jQuery("#ajax-cart-delete-msg #cancel_cartmessage").trigger('click');
	},3000);
	
	setTimeout(closeProgressDialog, 3000);
};

function callUpdateQty(){
	var d = jQuery.Deferred();

	setTimeout(function() {
		d.resolve(updatetqty());
	},2000);
	return d.promise();
}

function callUpdateMiniShoppingCart(){
	var d = jQuery.Deferred();

	setTimeout(function() {
		d.resolve(updateminishoppingcart());
	},2000);
	return d.promise();
}
//End Bug 104 changes


jQuery(document).ready(function(){
jQuery(".home-catalog-order-menu a").on('click',function(){
   if (((this.href.indexOf('customorder/expressorder') != -1 ||
	    this.href.indexOf('customorder/catalogorder') != -1 ||
	    this.href.indexOf('customorder/noncatalogorder') != -1 
	   ) && ordertype == "return"  && noofitemsincart > 0) ||
		(this.href.indexOf('customorder/returnorder') != -1	 && ordertype == "standard" && noofitemsincart > 0)
	   )
	    {
         //console.log('clicked contains'+ordertype);
		  openpopp('modal-ordertype-savecart');
		  jQuery("#redirecturl").val(this.href);
		  return false;
        }
  
});
});

//Update minishopping cart without refresh the page Bug ID 470 date: 11-April-2016---!-->
function adjustviewcart(){
	var minicart_half_or_full = jQuery("#minicart_half_or_full").val();
	if(minicart_half_or_full == 'half'){
			jQuery(".arrow_expand").trigger("click");
			}else{
			jQuery(".arrow_expand_full").trigger("click");
			}
}
function updateminishoppingcartallview(purl){
	jQuery.ajax({
					url: purl,
					method: "POST",
					dataType: "html",
					cache: false,
					success: function(response){
						jQuery("#updatevajx").html(response);
						adjustMiniCart();
						adjustviewcart();
					},
					error: function () {
						// closeProgressDialog();
						alert( "Problem updating mini shopping cart!" );
					}
					
					});
}
function updateMiniCartActionajx(upcarturl,upminicarthtml){
	var flag=validateMiniCartQty();
	if(flag==true){
openProgressDialog();
jQuery('#shopminicartform')
  .submit( function( e ) {
	 e.preventDefault();
    e.stopImmediatePropagation(); 
    jQuery.ajax( {
     url: upcarturl,
      type: 'POST',
      data: new FormData( this ),
	  dataType: 'json',
	  success: function(data1){
						//forhasdata();
		        		closeProgressDialog();
						var er=data1.error;
						var msg=data1.msg;
						if(er==0){
						updatetqty();
						updateminishoppingcartallview(upminicarthtml);
		        		jQuery('#headmsgn').html('Success');
						var minicart_half_or_full = jQuery("#minicart_half_or_full").val();
						if(minicart_half_or_full == 'half'){
						msg='Product updates applied to shopping cart.';
						}else{
						msg='Shopping cart was updated.';
						}						
		        		jQuery('#yourmsgn').html(msg);	
						jQuery('#bmessagen').hide();
			openpopp('modal-casm-message');
			setTimeout(function(){
			jQuery("#modal-casm-message #close_commonmsgn").trigger('click');
			},2500);
		        		}else{
		        		jQuery('#headmsgn').html('Error');
						jQuery('#yourmsgn').html(msg);	
						jQuery('#bmessagen').show();
					openpopp('modal-casm-message');
				
		        		}
			},
	        		error: function(xmlhttp) {
		        		closeProgressDialog();
						//forhasdata();
		        		jQuery('#headmsgn').html('Error');
		        		jQuery('#yourmsgn').html(xmlhttp.status);
						jQuery('#bmessagen').show();
						openpopp('modal-casm-message');
			
						
	        		},
      processData: false,
      contentType: false
    } );
	
    e.preventDefault();
  } );

jQuery('#shopminicartform').submit();
	}
}
//<!--END Bug ID 470---!-->
//<!--Bug ID 471: Clear cart---!-->
function clearcartconfirmation(){
	openpopp('modal-clearcartconfirm-message');
}
function clearcartajx(clrcarturl,upminicarthtml){
openProgressDialog();
    jQuery.ajax( {
     url: clrcarturl,
      type: 'POST',
	  dataType: 'json',
	  success: function(data1){
						//forhasdata();
		        		closeProgressDialog();
						var er=data1.error;
						var msg=data1.msg;
						if(er==0){
						updatetqty();
						updateminishoppingcartallview(upminicarthtml);
		        		jQuery('#headmsgn').html('Success');
						jQuery('#yourmsgn').html(msg);	
						jQuery('#bmessagen').hide();
			openpopp('modal-casm-message');
			setTimeout(function(){
			jQuery("#modal-casm-message #close_commonmsgn").trigger('click');
			},2500);
		        		}else{
		        		jQuery('#headmsgn').html('Error');
						jQuery('#yourmsgn').html(msg);	
						jQuery('#bmessagen').show();
					openpopp('modal-casm-message');
				
		        		}
			},
	        		error: function(xmlhttp) {
		        		closeProgressDialog();
						//forhasdata();
		        		jQuery('#headmsgn').html('Error');
		        		jQuery('#yourmsgn').html(xmlhttp.status);
						jQuery('#bmessagen').show();
						openpopp('modal-casm-message');
			
						
	        		}
    } );
	
}
//<!--END Bug ID 471---!-->
//***delete product from minishopping cart bug id 470-471 date:03-may-2016****************/
function conformDltajx2(itemid) {
		jQuery("#delItemID").val(itemid);
        openpopp('confirm-ajax-cart-delete');
    }
	function delprocart2(delurl,upminicarturl) {
		var itemid=jQuery("#delItemID").val();
       openProgressDialog();
    jQuery.ajax( {
     url: delurl+'id/'+itemid,
      type: 'POST',
	  dataType: 'json',
	  success: function(data1){
						//forhasdata();
		        		closeProgressDialog();
						var er=data1.error;
						var msg=data1.msg;
						if(er==0){
						updatetqty();
						updateminishoppingcartallview(upminicarturl);
						jQuery('#headmsgn').html('Success');
						jQuery('#yourmsgn').html(msg);	
						jQuery('#bmessagen').hide();
			openpopp('modal-casm-message');
			setTimeout(function(){
			jQuery("#modal-casm-message #close_commonmsgn").trigger('click');
			},2500);
			    		}else{
		        		jQuery('#headmsgn').html('Error');
						jQuery('#yourmsgn').html(msg);	
						jQuery('#bmessagen').show();
					openpopp('modal-casm-message');
				
		        		}
			},
	        		error: function(xmlhttp) {
		        		closeProgressDialog();
						//forhasdata();
		        		jQuery('#headmsgn').html('Error');
		        		jQuery('#yourmsgn').html(xmlhttp.status);
						jQuery('#bmessagen').show();
						openpopp('modal-casm-message');
			
						
	        		}
    });
    }
	//***END bug id 470-471 date:03-may-2016****************/
	//bug Id:472 start
/*************get shopping cart content by ajax Bug ID 472 date:25-April-2016****************/
function updateshoppingcartajax(purl){
	jQuery.ajax({
		url: purl,
		method: "POST",
		dataType: "html",
		cache: false,
		success: function(response){
		jQuery("#updatemcartajx").html(response);
		},
		error: function () {
		alert( "Problem updating mini shopping cart!" );
		}
	});
}

/**bug id 472 delete item date:25-April-2016***/
    function showallied(){
		jQuery(".curProductlist_b .review-table_b tbody tr:gt(4)").css('display','table-row');
		jQuery(".curProductlist_b").animate({
			height: jQuery(".curProductlist_b .review-table_b").height()
		},100);
		jQuery(".mainshopcart .cart-show-all1").hide();
		jQuery('.mainshopcart .cart-hide-all1').show();
		table_expand1();
	}
	function hideallied(){
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
	}
	function showaxalta(){
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
	}
	function hideaxalta(){
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
	}
	
	function conformDltajx(itemid) {
		jQuery("#scartitem").val(itemid);
        openpopp('modal-delproshcart-message');
    }
	function delprocart(delurl,upminicarturl) {
		var itemid=jQuery("#scartitem").val();
		var redurl=jQuery("#redclrcart2").val();
       openProgressDialog();
    jQuery.ajax( {
     url: delurl+'id/'+itemid,
      type: 'POST',
	  dataType: 'json',
	  success: function(data1){
						//forhasdata();
		        		closeProgressDialog();
						var er=data1.error;
						var msg=data1.msg;
						var titem=data1.titem;
						if(er==0){
						updateshoppingcartajax(upminicarturl);
						jQuery('#headmsgn').html('Success');
						jQuery('#yourmsgn').html(msg);	
						jQuery('#bmessagen').hide();
			openpopp('modal-casm-message');
			setTimeout(function(){
			jQuery("#modal-casm-message #close_commonmsgn").trigger('click');
			//if(titem==1){
			//window.location.href=redurl;
			//}
			},2500);
			    		}else{
		        		jQuery('#headmsgn').html('Error');
						jQuery('#yourmsgn').html(msg);	
						jQuery('#bmessagen').show();
					openpopp('modal-casm-message');
				
		        		}
			},
	        		error: function(xmlhttp) {
		        		closeProgressDialog();
						//forhasdata();
		        		jQuery('#headmsgn').html('Error');
		        		jQuery('#yourmsgn').html(xmlhttp.status);
						jQuery('#bmessagen').show();
						openpopp('modal-casm-message');
			
						
	        		}
    });
    }

function validatebigCartQty() {
    var validAllflag = true;

    $$('#shopcartform input.qty').each(function(e) { 
       var eachFlag = validateSingleQty(e);
       if(!eachFlag){
         validAllflag = false;
       }

    });

    return validAllflag;
}
function updatebigCartActionajx(upcarturl,updatecontenturl){
	var flag=validatebigCartQty();
	if(flag==true){
openProgressDialog();
jQuery('#shopcartform')
  .submit( function( e ) {
	 e.preventDefault();
    e.stopImmediatePropagation(); 
    jQuery.ajax( {
     url: upcarturl,
      type: 'POST',
      data: new FormData( this ),
	  dataType: 'json',
	  success: function(data1){
						//forhasdata();
		        		closeProgressDialog();
						var er=data1.error;
						var msg=data1.msg;
						if(er==0){
						updateshoppingcartajax(updatecontenturl);
		        		jQuery('#headmsgn').html('Success');
						jQuery('#yourmsgn').html(msg);	
						jQuery('#bmessagen').hide();
			openpopp('modal-casm-message');
			setTimeout(function(){
			jQuery("#modal-casm-message #close_commonmsgn").trigger('click');
			},2500);
		        		}else{
		        		jQuery('#headmsgn').html('Error');
						jQuery('#yourmsgn').html(msg);	
						jQuery('#bmessagen').show();
					openpopp('modal-casm-message');
				
		        		}
			},
	        		error: function(xmlhttp) {
		        		closeProgressDialog();
						//forhasdata();
		        		jQuery('#headmsgn').html('Error');
		        		jQuery('#yourmsgn').html(xmlhttp.status);
						jQuery('#bmessagen').show();
						openpopp('modal-casm-message');
			
						
	        		},
      processData: false,
      contentType: false
    } );
	
    e.preventDefault();
  } );

jQuery('#shopcartform').submit();
	}
}

//<!--Bug ID 472: Clear main shopping cart---!-->
function clearcartconfirmation2(){
	openpopp('modal-clearcartconfirm2-message');
}
function clearcartajx2(clrcarturl,upminicarthtml){
	var redurl=jQuery('#redclrcart').val();
openProgressDialog();
    jQuery.ajax( {
     url: clrcarturl,
      type: 'POST',
	  dataType: 'json',
	  success: function(data1){
						//forhasdata();
		        		closeProgressDialog();
						var er=data1.error;
						var msg=data1.msg;
						if(er==0){
						updateshoppingcartajax(upminicarthtml);
		        		jQuery('#clrmaincart').html('');
		        		jQuery('#headmsgn').html('Success');
						jQuery('#yourmsgn').html(msg);	
						jQuery('#bmessagen').hide();
			openpopp('modal-casm-message');
			setTimeout(function(){
			jQuery("#modal-casm-message #close_commonmsgn").trigger('click');
			//window.location.href=redurl;
			},2500);
		        		}else{
		        		jQuery('#headmsgn').html('Error');
						jQuery('#yourmsgn').html(msg);	
						jQuery('#bmessagen').show();
					openpopp('modal-casm-message');
				
		        		}
			},
	        		error: function(xmlhttp) {
		        		closeProgressDialog();
						//forhasdata();
		        		jQuery('#headmsgn').html('Error');
		        		jQuery('#yourmsgn').html(xmlhttp.status);
						jQuery('#bmessagen').show();
						openpopp('modal-casm-message');
			
						
	        		}
    } );	
}
//<!--bug id:515 keyboard user experience date:13-may-2016-->
function submitsaveordermishopping2(savecarturl,upminicarthtml){
	var curactive=jQuery("#curactive2").val();
	if(curactive=='cancel'){
		//close the popup
		jQuery("#modal-savepopupmaincart-message #cancel_save_order-mini3").trigger('click');
	}else if(curactive=='save'){
		saveordermishopping2(savecarturl,upminicarthtml);
	}else{
		saveordermishopping2(savecarturl,upminicarthtml);
	}
}
//<!--END bug id:515-->
//<!--Bug ID 472 Saved order---!-->
function saveordermishopping2(savecarturl,upminicarthtml){
var txv=jQuery("#save_order_textminiform2").val().trim();
if(txv==''){
jQuery('#display_errorminifrm2').html("Please enter an order name.");
jQuery("#save_order_textminiform2").focus();
}else if(txv!=''){
jQuery('#display_errorminifrm2').html("");
var redurl=jQuery('#redclrcart3').val();
openProgressDialog();	
jQuery('#shpmsaveorderform')
  .submit( function( e ) {
	 e.preventDefault();
    e.stopImmediatePropagation(); 
    jQuery.ajax( {
     url: savecarturl,
      type: 'POST',
      data: new FormData( this ),
	  dataType: 'json',
	  success: function(data1){
						//forhasdata();
		        		closeProgressDialog();
						var er=data1.error;
						var msg=data1.msg;
						if(er==0){
						jQuery("#modal-savepopupmaincart-message #cancel_save_order-mini3").trigger('click');
						jQuery('#clrmaincart').html('');
						updateshoppingcartajax(upminicarthtml);
						jQuery('#headmsgn').html('Success');
						jQuery('#yourmsgn').html(msg);	
						jQuery('#bmessagen').hide();
			openpopp('modal-casm-message');
			setTimeout(function(){
			jQuery("#modal-casm-message #close_commonmsgn").trigger('click');
			//window.location.href=redurl;
			},2500);
		        		}else if(er==2){
						jQuery('#display_errorminifrm2').html("Duplicate order name found. Please enter new order name.");
		        		}else{
						jQuery("#modal-savepopupmaincart-message #cancel_save_order-mini3").trigger('click');	
		        		jQuery('#headmsgn').html('FAILURE');
						jQuery('#yourmsgn').html(msg);	
						jQuery('#bmessagen').show();
					openpopp('modal-casm-message');
				jQuery('#display_errorminifrm2').html("");
		        		}
			},
	        		error: function(xmlhttp) {
		        		closeProgressDialog();
						jQuery("#modal-savepopupmini-message #cancel_save_order-mini3").trigger('click');
						//forhasdata();
		        		jQuery('#headmsgn').html('FAILURE');
		        		jQuery('#yourmsgn').html(xmlhttp.status);
						jQuery('#bmessagen').show();
						openpopp('modal-casm-message');
						jQuery('#display_errorminifrm2').html("");
	        		},
      processData: false,
      contentType: false
    } );
	
    e.preventDefault();
  } );

jQuery('#shpmsaveorderform').submit();
	
}
}
//end bug id:472
//bug id:522 date:16-June-2016
   function savejumptypeorder(cancelbuttonid,popupname)
    {
        jQuery("#" + cancelbuttonid).trigger("click");
		jQuery("#trigger_type").val('leftnav');
        openpopp(popupname);
    }

//END bug id:522 date:16-June-2016