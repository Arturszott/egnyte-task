define([
	'backbone',
	'models/fileListItem'
], function(Backbone, FileListItem) {
	'use strict';

	return Backbone.Collection.extend({
		model: FileListItem,

		getSelected: function() {
			return this.where({
				selected: true
			});
		}
	});
});