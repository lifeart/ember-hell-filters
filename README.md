# Ember-hell-filters

This README outlines the details of collaborating on this Ember addon.
## DEMO

 [https://lifeart.github.io/ember-hell-filters/demo/](https://lifeart.github.io/ember-hell-filters/demo/)

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



Installation
------------------------------------------------------------------------------

* `git clone <repository-url>` this repository
* `cd ember-hell-filters`
* `npm install`

### Linting

* `npm run lint:js`
* `npm run lint:js -- --fix`

### Running tests

* `ember test` – Runs the test suite on the current Ember version
* `ember test --server` – Runs the test suite in "watch mode"
* `ember try:each` – Runs the test suite against multiple Ember versions

### Running the dummy application

* `ember serve`
* Visit the dummy application at [http://localhost:4200](http://localhost:4200).

For more information on using ember-cli, visit [https://ember-cli.com/](https://ember-cli.com/).

License
------------------------------------------------------------------------------

This project is licensed under the [MIT License](LICENSE.md).
