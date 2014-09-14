import Ember from 'ember';

export default Ember.ObjectController.extend({
	needs : 'galleryItem',
	$fileUploadInput : null,

	actions : {
		save : function() {
			//gets model before saving
			var gallery = this.get('model');
			var galleryItems = gallery.get('galleryItems') 	;
			var self = this;

			gallery.save().then(function(newGallery){ 
			    console.log("Gallery Saved");
				self.transitionTo('galleries');
			});
		},

		addGalleryItem: function(){
			Ember.$("#fileupload").click();
		},


		initFileUploader: function(){
			var $fileUploadInput = Ember.$('#fileupload');
			var self = this;
			this.set('$fileUploadInput', $fileUploadInput); //Adds to controller Attribute
			try{
				$fileUploadInput.fileupload('destroy');
			}catch(e){/*already destroyed*/}

			//Fileupload Settings
			$fileUploadInput.fileupload({
				url: 'Upload',
				dataType: 'json'
			});


			$fileUploadInput.on('fileuploadchange', function(e, data){
				var files = Ember.A(data.files);
					
				self.uploadAndShowImages(files);
			});
/*
			$fileUploadInput.on('fileuploadadd', function(e, data){
				data.submit();
			});

			$fileUploadInput.on('fileuploaddone', function(e, data){
				var result = data.result;
				this.get('model').set('url', data.result.Url) ;
			});
*/			

		},

	},

	uploadImages: function(file){
		console.log("Uploaded Image : " + file.name);
	},
	
	// files is an Ember.Array of files
	uploadAndShowImages: function(files){
		var self = this;
		
		//Shows the image
		files.forEach(function(file){
			var galleryItem = self.addGalleryItemToModel(file) ;
		});
	},

	addGalleryItemToModel: function(file, galleryItemDefaults, amount){
		amount = amount || 1;
		galleryItemDefaults = galleryItemDefaults || {title:'Bild'} ;

		var galleryItems = this.get('galleryItems'),
			newGalleryItems = this.get('store')
				.createRecord('galleryItem', galleryItemDefaults);

		galleryItems.pushObject(newGalleryItems);
		var galleryItem = galleryItems.get('lastObject');
		galleryItem.set('file', file);

		var $fileUploadInput = Ember.$("#fileupload");
		
		var sendJqXHR = $fileUploadInput.fileupload('send', {files: [file]})
			.success( function(result, textStatus, jqXHR){
				galleryItem.set('url', result.Url) ;
			});
		
		return galleryItem;
	}

});
