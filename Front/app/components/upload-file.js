import Ember from 'ember';
//NOT USED
export default Ember.Component.extend({
	$fileUploadInput : undefined,

	willInsertElement: function(){
		var self = this;

		var $fileUploadInput = Ember.$.find('.file-uploader');
		this.set("$fileUploadInput", $fileUploadInput);

		$fileUploadInput.fileupload({
			url: 'Upload',
			dataType: 'json',
			autoUpload: false
		});

		$fileUploadInput.on('fileuploadchange', function(e, data){
			var files = Ember.A(data.files);
			self.uploadAndShowImages(files);
		});
	},

	willDestroyElement: function(){
		try{
			var $fileUploadInput = this.get("$fileUploadInput");
			$fileUploadInput.fileupload('destroy');
		}catch(e){
			console.log("Couldn't destroy the fileuploader") ;
		}
	}
});
