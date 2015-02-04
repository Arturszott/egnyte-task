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
			'click .js-delete': 'onDeleteClick',
			'click .js-create': 'onCreateClick'
		},

		initialize: function() {
			this.listenTo(this.collection, "change reset add remove", function(model) {
				// fix for loosing value for another edited input
				if (model.changed && !model.changed.currentValue) {
					this.render();
				}
			});
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
		updateToolbar: function() {
			var $buttons = this.$el.find('.js-rename, .js-delete');
			console.log($buttons.length);
			// TODO: move classes to the template and modify only collectionView model values
			if (!this.collection.getSelected().length) {
				$buttons.addClass('is-disabled');
			} else {
				$buttons.removeClass('is-disabled');
			}

			if (this.collection.getJustCreated().length) {
				this.$el.find('.js-create').addClass('is-disabled');
			} else {
				this.$el.find('.js-create').removeClass('is-disabled');
				this.creatingDirectory = false;
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
				this.collection.remove(selectedModels);
			};
		},
		onCreateClick: function() {
			if (this.creatingDirectory) return;

			var data = {
				name: '',
				ext: '',
				edited: true,
				justCreated: true
			};

			this.creatingDirectory = true;

			this.collection
				.add([data], {
					at: 0
				})
				// TODO: fix hack for adding additional list item
				.reset(this.collection.models);


		}
	});
});