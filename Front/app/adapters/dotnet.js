import DS from 'ember-data';

export default DS.RESTAdapter.extend({
  namespace: 'api', 

  pathForType: function(type){
      return type.camelize().capitalize();
  },

  createRecord: function(store, type, record){
    console.log("Adapter called: createRecord");
    return this._super(store, type, record);
  },

  serialize: function(record, options){
    console.log("Adapter called: serialize");
    return this._super(record, options);
  },
  updateRecord: function(store, type, record){
    console.log("Adapter called: updateRecord");
    return this._super(store, type, record);
  }
});
 