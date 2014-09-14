import Ember from 'ember';

export default Ember.Route.extend({
	model : function(params){
		return this.get('store').find('gallery', parseInt(params.gallery_id)); 
	},
});
