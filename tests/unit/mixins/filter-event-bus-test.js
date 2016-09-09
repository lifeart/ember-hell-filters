import Ember from 'ember';
import FilterEventBusMixin from 'ember-hell-filters/mixins/filter-event-bus';
import { module, test } from 'qunit';

module('Unit | Mixin | filter event bus');

// Replace this with your real tests.
test('it works', function(assert) {
  let FilterEventBusObject = Ember.Object.extend(FilterEventBusMixin);
  let subject = FilterEventBusObject.create();
  assert.ok(subject);
});
