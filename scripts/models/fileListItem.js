define([
	'backbone',
], function(Backbone) {
	'use strict';

	return Backbone.Model.extend({
		urlRoot: '/files',
		defaults: {
			selected: false,
			edited: false
		},
		setTitle: function(){

			this.set('title', this.get('ext') ? this.get('name') + '.' + this.get('ext'): this.get('name'));

		},
		initialize: function() {
			this.setTitle();
			this.set('currentValue', this.get('name'));
			this.on('change:name', this.setTitle);
		},
		toggle: function() {
			return this.set('selected', !this.get('selected'));
		},
		toggleEdit: function() {
			this.set('edited', !this.get('edited'));
		}
	});
});