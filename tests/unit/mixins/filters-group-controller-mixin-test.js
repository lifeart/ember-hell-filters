import Ember from 'ember';
import FiltersGroupControllerMixinMixin from 'ember-hell-filters/mixins/filters-group-controller-mixin';
import { module, test } from 'qunit';

module('Unit | Mixin | filters group controller mixin');

// Replace this with your real tests.
test('it works', function(assert) {
  let FiltersGroupControllerMixinObject = Ember.Object.extend(FiltersGroupControllerMixinMixin);
  let subject = FiltersGroupControllerMixinObject.create();
  assert.ok(subject);
});
