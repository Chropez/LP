import Ember from 'ember';

export default Ember.ObjectController.extend({
	actions : {

		signup : function(){
			debugger;
			var model = this.get('model'); 

			model.save();
		}
	}
});
