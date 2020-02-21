Shiny.addCustomMessageHandler('marker-init', function(opts) {
  var context = document.querySelector(opts.selector); 
	var instance = new Mark(opts.selector);
	window.marker[opts.name] = instance;
});

Shiny.addCustomMessageHandler('marker-mark', function(opts) {
  done = function(counter){
    Shiny.setInputValue(opts.name + '_marked' + ":markerParse", counter);
  };

  if(opts.marked)
    opts.options.done = done;
  
  setTimeout(function(){
    window.marker[opts.name].mark(opts.keywords, opts.options)
  }, opts.delay);
});

Shiny.addCustomMessageHandler('marker-unmark', function(opts) {
  window.marker[opts.name].unmark(opts.options)
});

Shiny.addCustomMessageHandler('marker-mark-regex', function(opts) {
  done = function(counter){
    Shiny.setInputValue(opts.name + '_marked' + ":markerParse", counter);
  };

  if(opts.marked)
    opts.options.done = done;
  
  var regex = new RegExp(opts.regex);
  window.marker[opts.name].markRegExp(regex, opts.options);
});

Shiny.addCustomMessageHandler('marker-mark-ranges', function(opts) {
  done = function(counter){
    Shiny.setInputValue(opts.name + '_marked' + ":markerParse", counter);
  };

  if(opts.marked)
    opts.options.done = done;
  window.marker[opts.name].markRanges(opts.ranges, opts.options)
});