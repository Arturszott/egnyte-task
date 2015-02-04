define([
	'backbone',
	'communicator',
	'hbs!tmpl/welcome',
	'collections/fileList',
	'views/directoryCompositeView',

	'backbone.mock'
], function(Backbone, Communicator, Welcome_tmpl, FileList, DirectoryCompositeView) {
	'use strict';

	var App = new Backbone.Marionette.Application();

	var fileList = new FileList();
	var welcomeTmpl = Welcome_tmpl;

	var viewOptions = {
		collection: fileList
	};

	var main = new DirectoryCompositeView(viewOptions);
	var mock = BackboneMock.map({
		url: '/files',
		response: [{
			name: 'Sample',
			ext: 'txt',
		}, {
			name: 'Other',
			ext: 'doc',
		}, {
			name: 'Third',
			ext: 'jpg',
		}, {
			name: 'Fourth',
			ext: 'js',
		}]
	});

	App.addRegions({
		main: '#main'
	});

	App.addInitializer(function() {
		App.main.show(main);
		console.log(main);
	});


	// TODO remove
	var User = Backbone.Model.extend({
		url: '/user'
	});
	var user = new User();

	return App;
});