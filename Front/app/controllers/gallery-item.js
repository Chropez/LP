import Ember from 'ember';

export default Ember.ObjectController.extend({
	

	fileIsUploaded: function(){
		var url = this.get('model.url');
		if(url !== undefined && url !== "" && url !== null)
			return true;

		return false;
	}.property('file', 'url'),

	url: function(){
		if(this.get('showLocalFile'))
			return this.get('localFileUrl');

		else
			return this.get('model.url');
	}.property('localFileUrl', 'showLocalFile', 'model.url'),

	showLocalFile: function(){
		if(this.get('model.url') && this.get('model.url') != null)
			return false;
		if(this.get('file')!=null)
			return true;
		return false;
	}.property('file', 'model.url'),

	localFileUrl: function(){
		var self = this;
		if(this.get('showLocalFile')){
			
			var reader = new FileReader();
			reader.readAsDataURL(this.get('file'));
			reader.onload = function(imgsrc){
				self.set('localFileUrl', imgsrc.target.result);
			}
		}
		return '';
	}.property('file'),
	
/*


	tmpImageSrc: function(){

		debugger;
		var tmpImage = this.get('tmpImage');
		if(tmpImage==undefined)
			return "http://vizdef.net/images/happy-dude.jpg";
		var reader = new FileReader();
		reader.readAsDataURL(tmpImage.src);
		var self = this;
		var s = null;
		reader.onload = function(imgsrc){
			self.set('tmpImageSrc', imgsrc.target.result);
		};
	}.property('tmpImage'),

	showTmpImage: function(){
		var tmpImage = this.get('tmpImage'),
			url 	 = this.get('url'); //hello

		if(url!=undefined && url != null)
			return false;

		else
			return true;

	}.property('url', 'tmpImage') ,

	replaceWithLocalImage : function(){
		debugger;
		if(this.get('showTmpImage')){
			$("body").append(this.get('tmpImage'));
		}else{
			$(this.get('tmpImage')).remove();
		}
	}.observes('showTmpImage').on('init'),
*/
	tmpOb : function(){
		this.set('file', null);
	}.observes('title')
	
});
