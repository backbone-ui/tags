// Backbone.js Tags extension
//
// Created by: Makis Tracend (@tracend)
// Source: https://github.com/backbone-ui/tags
//
// Licensed under the MIT license: 
// http://makesites.org/licenses/MIT

(function(_, Backbone) {
	
	// fallbacks
	if( _.isUndefined( Backbone.UI ) ) Backbone.UI = {};
	// Support backbone app (if available)
	var View = ( typeof APP != "undefined" && !_.isUndefined( APP.View) ) ? APP.View : Backbone.View;
    
	// Views
	Backbone.UI.Tags = View.extend({
        
        options: {
            editable : false,
            fieldName: false,
            tagTemplate: false,
            fieldDelimiter: "|" 
        }, 
        
		events : {
			"click .tag a .del" : "_delTag",
			"keydown .tag-new input" : "_newTag"
		},
        
		initialize: function( options ){
            // 
			_.bindAll( this, 'render', '_addTag', '_delTag', '_newTag', '_cleanTag', '_parseField', '_updateField');
			// check if the data passed is a "static" array
            if( options.data instanceof Array ){
                this.data = new Tags( options.data, this.options );
            }
            // import data from field 
            if( options.fieldName ){
                this._parseField();
            }
            
            return View.prototype.initialize.call( this, options );
		}, 
        
        // set the editable state
        editable: function( flag ){
            if( typeof flag == "undefined" ) flag = true;
            this.options.editable = flag;
            this.data.options.editable = flag;
            //re-render
            this.render();
        }, 
        
        // optionally call this after a render to retrieve focus
        focus: function(){
            $(this.el).find(".tag-new input").focus();
        }, 
        
        // Private methods
		_addTag: function( label ){
			//var template = this.views.tag;
            if( this.data ){ 
                this.data.add( new Tag({ id: label }) );
            }
            this._updateField();
		}, 
        
		_delTag: function( e ){
			e.preventDefault();
			// find tag
			var tag = $(e.target).closest(".tag");
			// remove tag
			$(this.el).find(tag).remove();
            // update data
            if( this.data ){ 
                var id = tag.find(".label").html();
                this.data.remove( id );
            }
            // update input field
			this._updateField();
		}, 
        
		_newTag: function( e ){
			var code = e.keyCode || e.which; 
  			if(code == 13 || code == 9 || code == 188){
					// prevent form submission
					e.preventDefault();
					// get tag string
					var tag = this._cleanTag( $(e.target).val() );
					this._addTag( tag );
					// reset input
                    $(e.target).val("");
					// prevent form submission
					return false;
			}
		}, 
        
		_cleanTag: function( string ){
			// custom method to filter out tag
			return string.replace(/http:\/\/|https:\/\/|www./gi, "");
		}, 
        
        _parseField: function(){
            this.$field = $(this.options.fieldName);
            var tags = this.$field.val() || false;
			if(!tags || _.isEmpty(tags)) return;
            var dl = this.options.fieldDelimiter;
            // add to the existing data, if available
            if( this.data ){ 
                this.data.add( tags.split( dl ) );
            } else {
                this.data = new Tags( tags.split( dl ), this.options );
            }
        }, 
        
		_updateField: function(){
			if( !this.$field ) return;
			//var tags = [];
			//$(this.el).find(".tag").each(function(){
			//	tags.push( $(this).find(".label").html() );
			//});
			// make a string from the tags
            var dl = this.options.fieldDelimiter;
            var value = this.data.output().join( dl );
			// update input (hidden) field
			this.$field.val( value );
			
		}
	});
	
    
    var Tag = Backbone.Model.extend({
        initialize: function( data, options ){
            // flags
            if( typeof data == "string" ){
                data = { id : data };
            }
        }
    });
    
    var Tags = Backbone.Collection.extend({
        
        model: Tag,
        
        options: {
            
        }, 
        
        initialize: function(models, options){
            // set options
            this.options.editable = options.editable || false; 
        }, 
        
        toJSON: function(){
            //include options with the tags
            return {
                tags : _.map( this.models, function(tag){ return { id : tag.id }; }),
                options : this.options
            }
        },
        
        // revert back to the array format when needed
        toArray: function(){
            var self = this;
            return _.map( this.models, function( tag ) {
                // return the first (an only) key from each tag
                return tag.id;
            });
            
        },
        
        // form the imported data...
        add: function( data, options ){
            if( data instanceof Array ){
                // it is expected that each item is an object
                for( var i in data ){
                   if(typeof data[i] == "string"){
                       data[i] = new Tag({ id : data[i] });   
                   }
                }
            }
            return Backbone.Collection.prototype.add.call( this, data, options );
        },
        
        output: function(){
            return this.toArray();
        }
        /*
		parse: function( data ){
            console.log( this.options );
			//if( !this.$field ) return;
			// get the tags from the input field
            //console.log( this.model.toJSON() );
			//var field = this.$field.val() || false;
			//if(!field || _.isEmpty(field)) return;
			//
			//var tags = (field).split("|");
			// reverse the order so they are added in the right order :P
			//tags.reverse();
			//for(var i in tags){
			//	this._addTag( tags[i] );
			//}
            console.log( data );
		} 
        */
    });

})(this._, this.Backbone);