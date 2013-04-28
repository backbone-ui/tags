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
    
	// APP editing
	Backbone.UI.Tags = View.extend({
		events : {
			"click .tag a .del" : "delTag",
			"keydown .tag-new input" : "newTag"
		},
		initialize: function( options ){
			//fallbacks
			options || (options = {});
			_.bindAll( this, 'render', 'addTag', 'delTag', 'newTag', 'cleanTag', 'updateField');
			//
			this.$field = options.field || false;
			// put these in a template?
			this.views = {
				"tag" : '<li class="tag"><a><span class="label"></span><span class="del">×</span></a></li>'
			};
			
			this.render();
			//return APP.View.prototype.initialize.apply( this, options );
		}, 
		render: function(){
			if( !this.$field ) return;
			// get the tags from the input field
			var field = this.$field.val() || false;
			if(!field || _.isEmpty(field)) return;
			//
			var tags = (field).split("|");
			// reverse the order so they are added in the right order :P
			tags.reverse();
			for(var i in tags){
				this.addTag( tags[i] );
			}
		}, 
		addTag: function( label ){
			var template = this.views.tag;
			$(template).find(".label").html( label ).closest(".tag").prependTo(this.el);
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
	

})(this._, this.Backbone);