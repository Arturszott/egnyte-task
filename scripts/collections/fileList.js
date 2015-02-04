define([
	'backbone',
	'models/fileListItem'
], function(Backbone, FileListItem) {
	'use strict';

	return Backbone.Collection.extend({
		model: FileListItem,
		initialize: function() {},
		fetch: function() {
			// fake fetch, should be mocked with external mocking plugin (mockery maybe?)
			// but the one I've tested was too simple
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
		},
		getUnselected: function() {
			return this.where({
				selected: false
			});
		}
	});
});