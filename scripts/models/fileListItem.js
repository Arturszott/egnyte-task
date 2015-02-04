define([
	'backbone',
], function(Backbone) {
	'use strict';

	return Backbone.Model.extend({
		defaults: {
			name: '',
			title: function() {
				return this.get('name') + '.' + this.get('ext');
			},
			selected: false
		},

		initialize: function() {},

		toggle: function() {
			return this.set('selected', !this.get('selected'));
		}
	});
});