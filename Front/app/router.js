import Ember from 'ember';
import config from './config/environment';

var Router = Ember.Router.extend({
  location: config.locationType
});

Router.map(function() {
	this.resource('galleries',  function(){
		this.resource('gallery', { path: '/:gallery_id' }, function(){
			this.route('edit');
			this.route('delete');

		});
		this.route('new');
	});

	this.resource('account', function(){
		this.route('signup');
  		this.route('signin');
	});
	
	this.route('about');
  this.route('application');
  this.route('account/signup');
  this.route('galleries/new');
  this.route('gallery/edit');
});


export default Router;
