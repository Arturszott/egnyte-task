define([
	'backbone.marionette',
	'hbs!tmpl/fileListPanel',
	'views/fileListItemView'
], function(Marionette, fileList_tmpl, ItemView) {
	'use strict';

	return Marionette.CompositeView.extend({
		template: fileList_tmpl,

		itemView: ItemView,

		itemViewContainer: '#item-list',

		ui: {
			toggle: '#toggle-children'
		},

		events: {
			'click #toggle-children': 'onToggleChildrenClick'
		},

		initialize: function() {
			this.listenTo(this.collection, "change reset add remove", this.render);
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
				item.set('selected', isSelected);
			});
		}
	});
});