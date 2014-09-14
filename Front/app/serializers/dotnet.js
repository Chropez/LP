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

/*  extract: function(store, type, originalPayload, id, requestType){
    console.log("Serializer called: Extract");
    //var payload = this._super(store, type, originalPayload, id, requestType);

    var typeKey = type.typeKey,
        typeKeyPlural = typeKey.pluralize();
    // Many items (findMany, findAll)
    if (typeof payload[typeKeyPlural] !== "undefined"){
        payload[typeKeyPlural].forEach(function(item, index){
            this.extractRelationships(payload, item, type);
        }, this);
    }
     
    // Single item (find)
    else if (typeof payload[typeKey] !== "undefined"){
        this.extractRelationships(payload, payload[typeKey], type);
    }
     
    return payload; 
  },*/
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
  },

  normalize: function(type, hash, prop){
    console.log("Serializer called: normalize");

    var newHash = {};
    //Makes all the props camelized like Ember Expects them.
    for(var property in hash){
        newHash[property.camelize()] = hash[property];
    }

    return this._super(type, newHash, prop);
  },

  normalizeHash: function(type, hash, prop){
    console.log("Serializer called: normalizeHash");
    return this._super(type, hash, prop);
  },
   /**
     The current ID index of generated IDs
     @property
     @private
    */
  _generatedIds: 0,
   
  /**
   Sideload a JSON object to the payload
    
   @method sideloadItem
   @param {Object} payload   JSON object representing the payload
   @param {subclass of DS.Model} type   The DS.Model class of the item to be sideloaded
   @param {Object} item JSON object   representing the record to sideload to the payload
  */
  /*sideloadItem: function(payload, type, item){
     
    console.log("Serializer called: sideLoadItem"); 
      var sideloadKey = type.typeKey.pluralize(),     // The key for the sideload array 
          sideloadArr = payload[sideloadKey] || [],   // The sideload array for this item
          primaryKey = Ember.get(this, 'primaryKey'), // the key to this record's ID
          id = item[primaryKey];

      if(item[primaryKey.capitalize()]){
        id = item[primaryKey.capitalize()];
      }
                   
      // Missing an ID, generate one
      if (typeof id === 'undefined') {
          id = 'generated-'+ (++this._generatedIds);
          item[primaryKey] = id;
      }
       
      // Don't add if already side loaded
      if (sideloadArr.findBy("id", id) !== undefined){
          return payload;
      }
       
      // Add to sideloaded array
      sideloadArr.push(item);
      payload[sideloadKey] = sideloadArr;  
      return payload;
  },*/
   
  /**
   Extract relationships from the payload and sideload them. This function recursively 
   walks down the JSON tree
    
   @method sideloadItem
   @param {Object} payload   JSON object representing the payload
   @paraam {Object} recordJSON   JSON object representing the current record in the payload to look for relationships
   @param {Object} recordType   The DS.Model class of the record object
  */
  /*extractRelationships: function(payload, recordJSON, recordType){
    console.log("Serializer called: extractRelationships"); 
    // Loop through each relationship in this record type
    recordType.eachRelationship(function(key, relationship) {
        if(recordJSON[key.capitalize()]){
          key = key.capitalize();
        }

        var related = recordJSON[key], // The record at this relationship
            type = relationship.type;  // belongsTo or hasMany
         
        if (related){
             
            // One-to-one
            if (relationship.kind === "belongsTo") {
                // Sideload the object to the payload
                this.sideloadItem(payload, type, related);

                // Replace object with ID
                recordJSON[key] = related.id;
                 
                // Find relationships in this record
                this.extractRelationships(payload, related, type);
            }
             
            // Many
            else if (relationship.kind === "hasMany") {
 
                // Loop through each object
                related.forEach(function(item, index){
 
                    // Sideload the object to the payload
                    this.sideloadItem(payload, type, item);
                    

                    // Replace object with ID
                    related[index] = item.id;
                     
                    // Find relationships in this record
                    this.extractRelationships(payload, item, type);
                }, this);
            }
             
        }
    }, this);
     
    return payload;
  },*/


  /**
   Overrided method
  */
  normalizePayload: function(originalPayload) {
    console.log("Serializer called: normalizePayload"); 

    //add camelize properties first!
    var payload = this.camelizeProperties(originalPayload);
    
     
    payload = this._super(payload);
     
    return payload;
  },


  /*
  normalizePayload: function(type, hash){
    console.log("Serializer called: normalizePayload");

    return this._super(type,hash);
  },*/

  //Own function
  
  addRootToHash: function(type, hash){
    var newHash = {};
    if(Ember.typeOf(hash[type.typeKey.capitalize()]) === "undefined"){
      newHash[type.typeKey] = hash;
    }else{
      newHash = hash;
    }

    return newHash;
  },



  
  /*normalizePayload: function(type, hash){
    console.log("Serializer called: normalizePayload");
    hash = this._super(type,hash);
    return this.camelizeProperties(hash);
  },*/
  camelizeProperties: function(payload){
    var camelizedProperties = {};
    var serializer = this;

    //If the payload is an array
    if(Ember.typeOf(payload) === 'array'){
      camelizedProperties = Ember.A();
      //If an array is sent, recursevily camelizes all objects
      payload.forEach(function(obj){
        if(Ember.typeOf(obj) === 'object'){
          camelizedProperties.pushObject(serializer.camelizeProperties(obj));  
        }
      });
    }
    
    //if the payload is an object
    else if(Ember.typeOf(payload) === 'object') {
      //Loop through properties
      for (var prop in payload){
        var propVal = payload[prop];

        if(propVal){
            propVal = serializer.camelizeProperties(propVal)  ;
        } 
        camelizedProperties[prop.camelize()] = propVal;

      }
    }

    else {
      return payload;
    }

    return camelizedProperties;
  },


  /**
  Removes the root element. 
  Instead of delivering 
    { gallery : { props : propsvals }}

  it delivers 
    {props: propsvals}

  and always includes the Id
  */
  serializeIntoHash: function(hash, type, record, options){
    console.log("Serializer called: serializeIntoHash");
    //Ember.merge(hash, this.serialize(record, options));
    //Always includes Id
    
    Ember.merge(hash, this.serialize(record, {includeId : true}));
    //this._super(hash, type, record, options);
  },


  serialize: function(record, options){
    console.log("Serializer called: serialize");
    return this._super(record, options);
  },

  serializeAttribute: function(record, json, key, attribute){
    console.log("Serializer called: serializeAttribute");
    this._super(record, json, key, attribute);
  },


  typeForRoot: function(root){
  console.log("Serializer called: typeForRoot");
    return this._super(root.camelize());
  },

  //Might have to be in specific serializers
  serializeHasMany: function(record, json, relationship){
    console.log("Galleries Serializer: SerializeHasMany");
    var key = relationship.key,
          hasManyRecords = Ember.get(record, key),
          attrs = Ember.get(this, 'attrs'),
          embed = attrs && attrs[key] && attrs[key].embedded === 'always';
       
      // Embed hasMany relationship if records exist
      if (hasManyRecords && embed) {
          json[key] = [];
          hasManyRecords.forEach(function(item, index){
              json[key].push(item.serialize());
          });
      }
      // Fallback to default serialization behavior
      else {
          return this._super(record, json, relationship);
      }
  }

});
