define([
	'backbone.marionette',
	'hbs!tmpl/sample',
	'views/fileListItemView'
], function(Marionette, sample, ItemView) {
	'use strict';

	return Marionette.CompositeView.extend({
		template: sample,

		itemView: ItemView,

		itemViewContainer: '#item-list',

		ui: {
			toggle: '#toggle-children'
		},

		events: {
			'click #toggle-children': 'onToggleChildrenClick'
		},

		initialize: function() {
			this.listenTo(this.collection, 'all', this.updateToggleCheckbox, this);
		},

		onRender: function() {
			this.updateToggleCheckbox();
		},

		updateToggleCheckbox: function() {
			var allSelected = this.collection.reduce(function(lastModel, thisModel) {
				return lastModel && thisModel.get('selected');
			}, true);

			this.ui.toggle.prop('checked', allSelected);
		},

		onToggleChildrenClick: function(event) {
			var isSelected = event.currentTarget.checked;

			this.collection.each(function(item) {
				item.save({
					selected: isSelected
				});
			});
		}
	});
});