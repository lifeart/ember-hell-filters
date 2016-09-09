import Ember from 'ember';
import FilterComponentMixinMixin from 'ember-hell-filters/mixins/filter-component-mixin';
import { module, test } from 'qunit';

module('Unit | Mixin | filter component mixin');

// Replace this with your real tests.
test('it works', function(assert) {
  let FilterComponentMixinObject = Ember.Object.extend(FilterComponentMixinMixin);
  let subject = FilterComponentMixinObject.create();
  assert.ok(subject);
});
