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
			this.set('title', this.get('name') + '.' + this.get('ext'))
		},
		initialize: function() {
			this.setTitle();
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