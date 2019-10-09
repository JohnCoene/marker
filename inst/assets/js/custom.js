Shiny.addCustomMessageHandler('marker-init', function(opts) {
	var instance = new Mark(opts.selector);
	window.marker[opts.name] = instance;
});

Shiny.addCustomMessageHandler('marker-mark', function(opts) {
  window.marker[opts.name].mark(opts.keywords, opts.options)
});

Shiny.addCustomMessageHandler('marker-unmark', function(opts) {
  window.marker[opts.name].unmark(opts.options)
});

Shiny.addCustomMessageHandler('marker-mark-regex', function(opts) {
  window.marker[opts.name].markRegExp(opts.regex, opts.options)
});

Shiny.addCustomMessageHandler('marker-mark-ranges', function(opts) {
  window.marker[opts.name].markRanges(opts.ranges, opts.options)
});