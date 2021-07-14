import 'shiny';
import Mark from 'mark.js';

let markers = [];

Shiny.addCustomMessageHandler('marker-init', function(opts) {
	let instance = new Mark(opts.selector);
	markers[opts.name] = instance;
});

Shiny.addCustomMessageHandler('marker-mark', function(opts) {
  let done = function(counter){
    Shiny.setInputValue(opts.name + '_marked' + ":markerParse", counter);
  };

  if(opts.marked)
    opts.options.done = done;
  
  setTimeout(function(){
    markers[opts.name].mark(opts.keywords, opts.options)
  }, opts.delay);
});

Shiny.addCustomMessageHandler('marker-unmark', function(opts) {
  markers[opts.name].unmark(opts.options)
});

Shiny.addCustomMessageHandler('marker-mark-regex', function(opts) {
  let done = function(counter){
    Shiny.setInputValue(opts.name + '_marked' + ":markerParse", counter);
  };

  if(opts.marked)
    opts.options.done = done;
  
  let regex = new RegExp(opts.regex);
  setTimeout(function(){
    markers[opts.name].markRegExp(regex, opts.options);
  }, opts.delay);
});

Shiny.addCustomMessageHandler('marker-mark-ranges', function(opts) {
  let done = function(counter){
    Shiny.setInputValue(opts.name + '_marked' + ":markerParse", counter);
  };

  if(opts.marked)
    opts.options.done = done;
  
  markers[opts.name].markRanges(opts.ranges, opts.options)
});