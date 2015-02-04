define([
	'backbone',
	'communicator',
	'hbs!tmpl/welcome',
	'collections/fileList',
	'views/directoryCompositeView'

], function(Backbone, Communicator, Welcome_tmpl, FileList, DirectoryCompositeView) {
	'use strict';

	var App = new Backbone.Marionette.Application();

	var fileList = new FileList();
	fileList.fetch();
	var welcomeTmpl = Welcome_tmpl;

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