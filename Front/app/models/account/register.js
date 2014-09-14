import DS from 'ember-data';

export default DS.Model.extend({
  	userName : DS.attr('string'),
	password : DS.attr('string'),
	confirmPassword : DS.attr('string')
});
