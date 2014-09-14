import DS from 'ember-data';

export default DS.Model.extend({
  	title: DS.attr('string'),
	description : DS.attr('string'),
	owner : DS.attr('string'),
	isPublished: DS.attr('boolean'),
	galleryItems: DS.hasMany('galleryItem')
});
