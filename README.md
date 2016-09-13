# Ember-hell-filters

This README outlines the details of collaborating on this Ember addon.

## Example

In template:
``` 
 {{#filters-group filters=filters values=(hash one=1 two=2) filtersDidChange=(action 'reloadPlots') }}
```
In component:
``` 
Component.extend({

    filters: Ember.computed(function() {
        let store = this.get('store');
        return [{
                componentName: 'hell-filters/select-2',
                name: 'one',
                config: {
                    idKey: 'id',
                    multiple: true,
                    textKey: 'full_name',
                    options: Ember.computed(function() {
                        return store.peekAll('user');
                    }),
                }
            }, {
                componentName: 'hell-filters/select-2',
                name: 'two',
                dependsOn: {
                    name: 'one',
                    value: '@any'
                },
                config: {
                    idKey: 'id',
                    multiple: true,
                    textKey: 'full_name',
                    options: Ember.computed(function() {
                        return store.peekAll('user').filterBy('role', 3);
                    }),
                }
            },

        ];
    }),
    actions: {
        reloadPlots: function(filtersState) {
            console.log(filtersState);
        }
    }
});
```



## Installation

* `git clone <repository-url>` this repository
* `cd ember-hell-filters`
* `npm install`
* `bower install`

## Running

* `ember serve`
* Visit your app at [http://localhost:4200](http://localhost:4200).

## Running Tests

* `npm test` (Runs `ember try:each` to test your addon against multiple Ember versions)
* `ember test`
* `ember test --server`

## Building

* `ember build`

For more information on using ember-cli, visit [http://ember-cli.com/](http://ember-cli.com/).
