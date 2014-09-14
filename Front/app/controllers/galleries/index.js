import Ember from 'ember';

export default Ember.ArrayController.extend({	

	galleryCount: function(){
		return this.get('model.length');
	}.property('@each'),

	actions : {

		showDeleteDialog : function(gallery){
			this.set('selectedGallery', gallery);
			window.Bootstrap.ModalManager.show('deleteDialog');
		},


		//Delete Dialog actions 
		delete : function(){
			var gallery = this.get('selectedGallery');
			gallery.deleteRecord();
			gallery.save();
			window.Bootstrap.ModalManager.close('deleteDialog');
		}, 

		cancelDeleteDialog: function(){
			this.set('selectedGallery', undefined) ;
		}
	},

	//Delete for the modal dialog
	deleteModalButtons : [
		//Delete Button
		Ember.Object.create({ 
			title: 'Delete',
			type: 'primary',
			clicked: 'delete'
		}),
		//Cancel Button
		Ember.Object.create({ 
			title: 'Cancel',
			type: 'link',
			clicked: 'cancelDeleteDialog',
			dismiss: 'modal'
		})
	]
});

	