import Ember from 'ember';

export default Ember.ObjectController.extend({
	

	fileIsUploaded: function(){
		var url = this.get('model.url');
		if(url !== undefined && url !== "" && url !== null){
			return true;
		}

		return false;
	}.property('file', 'url'),

	url: function(){
		if(this.get('showLocalFile')){
			return this.get('localFileUrl');
		}

		else{
			return this.get('model.url');
		}

	}.property('localFileUrl', 'showLocalFile', 'model.url'),

	showLocalFile: function(){
		if(this.get('model.url') && this.get('model.url') != null){
			return false;
		}

		if(this.get('file')!=null){
			return true;
		}

		return false;
	}.property('file', 'model.url'),

	localFileUrl: function(){
		var self = this;
		if(this.get('showLocalFile')){
			
			var reader = new FileReader();
			reader.readAsDataURL(this.get('file'));
			reader.onload = function(imgsrc){
				self.set('localFileUrl', imgsrc.target.result);
			} ;
		}
		return '';
	}.property('file'),

	tmpOb : function(){
		this.set('file', null);
	}.observes('title')
	
});
