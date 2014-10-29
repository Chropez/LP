import Ember from 'ember';

export default Ember.Route.extend({
	model : function(){
		var newAccount = this.get('store').createRecord('account/register', {userName: 'Tripolis', password: 'kalisa', confirmPassword: 'kalisa'});
		return newAccount;
	}
});
