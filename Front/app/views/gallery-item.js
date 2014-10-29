import Ember from 'ember';

export default Ember.View.extend({
	tagName: 'div' ,
	classNames: ['gallery-item-container'] ,
	templateName: 'views/gallery-item',
	tmpImage: null
});
