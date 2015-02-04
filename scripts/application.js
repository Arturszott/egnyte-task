define([
	'backbone',
	'communicator',
	'hbs!tmpl/welcome',
	'backbone.mock'
], function(Backbone, Communicator, Welcome_tmpl) {
	'use strict';

	var welcomeTmpl = Welcome_tmpl;

	var App = new Backbone.Marionette.Application();

	App.addRegions({});

	App.addInitializer(function() {
		Communicator.mediator.trigger("APP:START");
	});

	var mock = BackboneMock.map({
		url: '/user',
		response: {
			name: 'theDude',
			age: 20,
			email: 'theDude@gmail.com'
		}
	});

	var User = Backbone.Model.extend({
		url: '/user'
	});
	var user = new User();
	user.fetch({
		error: function(model, options, response) {
			console.log('error fetching model: ', arguments);
		},
		success: function(resp, status, xhr) {
			console.log('success fetching model: ', arguments);
		}
	});

	return App;
});