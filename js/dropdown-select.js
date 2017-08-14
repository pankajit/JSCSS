  document.observe('dom:loaded', function(evt) {
    var config = {
      '.chosen-select' : {
        disable_search : true,
        width : "100%"
      }
    }
    var results = [];
    for ( var selector in config) {
      var elements = $$(selector);
      for ( var i = 0; i < elements.length; i++) {
        results.push(new Chosen(elements[i], config[selector]));
      }
    }
    return results;
  });