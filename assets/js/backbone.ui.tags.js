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
            editable : false
        }, 
        
		events : {
			"click .tag a .del" : "delTag",
			"keydown .tag-new input" : "newTag"
		},
        
		initialize: function( options ){
            // 
			_.bindAll( this, 'render', 'addTag', 'delTag', 'newTag', 'cleanTag', 'updateField');
			// check if the data passed is a "static" array
            if( options.data instanceof Array ){
                this.data = new Tags( options.data );
            }
            
            return View.prototype.initialize.call( this, options );
		}, 
        
        render: function(){
            
            console.log( this.data.toJSON() );
			
        },
        
		addTag: function( label ){
			//var template = this.views.tag;
            if( this.data ){ 
                this.data.add( new Tag( label ) );
            }
			//$(template).find(".label").html( label ).closest(".tag").prependTo(this.el);
            this.render();
		}, 
        
		delTag: function( e ){
			e.preventDefault();
			// find tag
			var tag = $(e.target).closest(".tag");
			// remove tag
			$(this.el).find(tag).remove();
			// update input field
			this.updateField();
		}, 
        
		newTag: function( e ){
			var code = e.keyCode || e.which; 
  			if(code == 13 || code == 9 || code == 188){
					// prevent form submission
					e.preventDefault();
					// get tag string
					var tag = this.cleanTag( $(e.target).val() );
					this.addTag( tag );
					// reset input
					$(e.target).val("");
					// update data
					this.updateField();
					// prevent form submission
					return false;
			}
		}, 
        
		cleanTag: function( string ){
			// custom method to filter out tag
			return string.replace(/http:\/\/|https:\/\/|www./gi, "");
		}, 
        
		updateField: function(){
			if( !this.$field ) return;
			var tags = [];
			$(this.el).find(".tag").each(function(){
				tags.push( $(this).find(".label").html() );
			});
			// make a string from the tags
			var value = tags.join("|");
			// update input (hidden) field
			this.$field.val( value );
			
		}
	});
	
    
    var Tag = Backbone.Model.extend({
        
    });
    
    var Tags = Backbone.Collection.extend({
        
        model: Tag,
        
        toJSON: function(){
            return _.map( this.models, function( tag ) {
                // return the first (an only) key from each tag
                return tag.keys()[0];
            });
        },
        
		parse: function(){
            console.log( this.options.template );
			//if( !this.$field ) return;
			// get the tags from the input field
            console.log( this.model.toJSON() );
			//var field = this.$field.val() || false;
			//if(!field || _.isEmpty(field)) return;
			//
			//var tags = (field).split("|");
			// reverse the order so they are added in the right order :P
			//tags.reverse();
			//for(var i in tags){
			//	this.addTag( tags[i] );
			//}
            
		} 
        
    });

})(this._, this.Backbone);