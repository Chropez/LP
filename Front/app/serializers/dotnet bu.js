import DS from 'ember-data';
import Ember from 'ember';
/**
  The default Implementation of .net webapi returns
    ´´´
      [{obj1:obj1_val},{obj2:obj2_val}]
    ´´´

  Ember expects
    ´´´
      { 
        typeKey : [{obj1:obj1_val},{obj2:obj2_val}]
      }
    ´´´
*/
export default DS.RESTSerializer.extend(DS.EmbeddedRecordsMixin, {

  extractArray: function(store, type, payload) {
    console.log("Serializer called: ExtractArray");
    var newHash = {};

    newHash[Ember.String.pluralize(type.typeKey)] = payload;
    payload = newHash;
    var returnObject = this._super(store, type, payload);
    return returnObject ;
  },

  extractSingle: function(store, type, payload, recordId){
    console.log("Serializer called: ExtractSingle");
    var newHash = this.addRootToHash(type, payload);

    return this._super(store, type, newHash, recordId);
  }

});
