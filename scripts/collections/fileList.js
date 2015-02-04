define([
	'backbone',
	'models/fileListItem'
], function(Backbone, FileListItem) {
	'use strict';

	return Backbone.Collection.extend({
		model: FileListItem,
		url: '/files',
		initialize: function() {},
		fetch: function() {
			// fake fetch
			var data = [{
				name: 'Sample',
				ext: 'txt',
			}, {
				name: 'Other',
				ext: 'doc',
			}, {
				name: 'Third',
				ext: 'jpg',
			}, {
				name: 'Fourth',
				ext: 'js',
			}];

			this.reset(data);
		},
		getSelected: function() {
			return this.where({
				selected: true
			});
		}
	});
});