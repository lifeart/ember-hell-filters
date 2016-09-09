import Ember from 'ember';
import FilterGroupMessageReceiverMixin from 'ember-hell-filters/mixins/filter-group-message-receiver';
import { module, test } from 'qunit';

module('Unit | Mixin | filter group message receiver');

// Replace this with your real tests.
test('it works', function(assert) {
  let FilterGroupMessageReceiverObject = Ember.Object.extend(FilterGroupMessageReceiverMixin);
  let subject = FilterGroupMessageReceiverObject.create();
  assert.ok(subject);
});
