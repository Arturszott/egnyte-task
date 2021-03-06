define([
	'backbone.marionette',
	'hbs!tmpl/fileListItem'
], function(Marionette, listItem_tmpl) {
	'use strict';

	return Marionette.ItemView.extend({
		tagName: 'li',
		className: 'fileList-item',
		template: listItem_tmpl,
		ui: {
			textInput: '.item-title-input'
		},
		events: {
			'click .toggle': 'toggle',
			'click .js-save': 'onSaveClicked',
			'click .js-cancel': 'onCancelClicked',
			'keyup .item-title-input': 'onKeydown'
		},

		initialize: function() {
		},

		onRender: function() {},

		toggle: function() {
			this.model.toggle();
		},

		onKeydown: function(){
			var value = this.$el.find(this.ui.textInput).val();
			if(!value) return;

			this.model.set('currentValue', value);
		},
		onSaveClicked: function(){
			this.model.set('name', this.ui.textInput.val());
			this.model.set('justCreated', false);
			this.model.toggleEdit();
		},
		onCancelClicked: function(){
			this.model.set('currentValue', this.model.get('name'));
			this.model.toggleEdit();

			if(this.model.get('justCreated')){
				this.model.destroy();
			}

		}
	});
});