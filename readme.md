# Backbone UI: Tags

A tags component for any webpage


## Install

Using bower: 
```
bower install backbone.ui.tags
```

## Dependencies

* [Backbone](http://backbonejs.org/)
* [Underscore](http://underscorejs.org/)
* [jQuery](http://jquery.com/) (or alternative event handler)


## Usage


```
var view = new Backbone.UI.Tags({
		el : "#tags", 
		collection : new Backbone.Collection(tags)
});
view.render();
```
By default the html fragment will be parsed by the underscore's micro-template engine.  You are free to use any template engine by using the ```template``` option as described below. 


## Options

A more detailed list of all the available options. 

* ***collection***: the data for the tags
* ***url***: the url of an html fragment
* ***html***: the markup of the html fragment
* ***template***: A template method to parse the html fragment


## Examples 

* [Image](http://rawgithub.com/backbone-ui/tags/master/examples/image.html)


## Credits

Created by Makis Tracend ( [@tracend](http://github.com/tracend) )

Distributed through [Makesites.org](http://makesites.org/)

Released under the [MIT license](http://makesites.org/licenses/MIT)

