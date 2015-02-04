define([
	'backbone.marionette',
	'hbs!tmpl/sample'
], function (Marionette, sample) {
	'use strict';

	return Marionette.ItemView.extend({
		tagName: 'li',

		template: sample,

		value: '',

		ui: {
			edit: '.edit'
		},

		events: {
			'click .toggle': 'toggle',
			'click .destroy': 'destroy',
		},

		initialize: function () {
			this.value = this.model.get('title');

			this.listenTo(this.model, 'change', this.render, this);
		},

		onRender: function () {},

		destroy: function () {
			this.model.destroy();
		},

		toggle: function () {
			this.model.toggle().save();
		},
	});
});