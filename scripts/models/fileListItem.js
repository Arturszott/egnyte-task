define([
	'backbone',
], function(Backbone) {
	'use strict';

	return Backbone.Model.extend({
		urlRoot: '/files',
		defaults : function () {
			selected: false
		},

		initialize: function() {
			this.set('title', this.get('name') + '.' + this.get('ext'))
		},

		toggle: function() {
			return this.set('selected', !this.get('selected'));
		}
	});
});