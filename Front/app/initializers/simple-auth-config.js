export default {
  name: 'simple-auth-config',
  before: 'simple-auth',

  initialize: function(container) {
    // app.register('route', 'foo', 'service:foo');

    window.ENV = window.ENV || {};
    window.ENV['simple-auth-oauth2'] = {
    	refreshAccessTokens: true,
    	authorizer: 'simple-auth-authorizer:oauth2-bearer'
    };

   
  }
};
