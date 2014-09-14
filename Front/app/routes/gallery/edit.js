import Ember from 'ember';

export default Ember.Route.extend({

	model : function(){
		return this.modelFor('gallery');
	},
	deactivate : function(){
		this.currentModel.rollback();
	}
});
