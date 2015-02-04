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
			'click #toggle-children': 'onToggleChildrenClick',
			'click .js-rename': 'onRenameClick',
			'click .js-delete': 'onDeleteClick'
		},

		initialize: function() {
			this.listenTo(this.collection, "change reset add remove", this.render);
		},

		onRender: function() {
			this.updateToggleCheckbox();
			this.updateToolbar();
		},

		updateToggleCheckbox: function() {
			var allSelected = this.collection.reduce(function(lastModel, thisModel) {
				return lastModel && thisModel.get('selected');
			}, true);

			this.ui.toggle.prop('checked', allSelected);
		},
		updateToolbar: function(){
			var $buttons = $el.find('js-rename, .js-delete');

			if(!this.collection.getSelected()){
				$buttons.addClass('is-disabled');
			} else {
				$buttons.removeClass('is-disabled');
			}
		},
		onToggleChildrenClick: function(event) {
			var isSelected = event.currentTarget.checked;

			this.collection.each(function(item) {
				item.set('selected', isSelected);
			});
		},
		onRenameClick: function(event) {
			var selectedModels = this.collection.getSelected();

			selectedModels.forEach(function(item) {
				item.set('edited', true);
			});

		},
		onDeleteClick: function(event) {
			var selectedModels = this.collection.getSelected();
			var selectedNo = selectedModels.length;

			if (!selectedNo) return;

			var confirmed = confirm("Are you sure you want to delete the " + selectedModels.length + " selected file" + (selectedModels.length > 1 ? 's' : '') + "?");

			if (confirmed) {
				// save removed models to fast undo
				this.lastRemoved = selectedModels;

				this.collection.reset(this.collection.getUnselected());
			};
		}
	});
});