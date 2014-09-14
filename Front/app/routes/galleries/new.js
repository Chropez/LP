import Ember from 'ember';

export default Ember.Route.extend({
	model : function(){
		var account = this.get('session').get('account');
		var gallery = this.get('store').createRecord('gallery', 
						{title: "My Default Gal"});
		
		var userName = (account && account.get('userName')) || undefined;
		gallery.set('owner', userName);

		return gallery; 
	},

	deactivate : function(){
		var currentModel = this.currentModel ;
		this.currentModel.rollback();
	}
});
