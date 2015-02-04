define([
	'backbone',
	'collections/fileList',
	'views/directoryCompositeView'

], function(Backbone, FileList, DirectoryCompositeView) {
	'use strict';

	var App = new Backbone.Marionette.Application();

	var fileList = new FileList();

	fileList.fetch();

	var viewOptions = {
		collection: fileList
	};

	var main = new DirectoryCompositeView(viewOptions);

	App.addRegions({
		main: '#main'
	});

	App.addInitializer(function() {
		App.main.show(main);
	});

	return App;
});