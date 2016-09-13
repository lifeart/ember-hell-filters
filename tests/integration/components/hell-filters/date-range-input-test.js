import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('hell-filters/date-range-input', 'Integration | Component | hell filters/date range input', {
  integration: true
});

test('it renders', function(assert) {
  // Set any properties with this.set('myProperty', 'value');
  // Handle any actions with this.on('myAction', function(val) { ... });

  this.render(hbs`{{hell-filters/date-range-input}}`);

  assert.equal(this.$().text().trim(), '');

  // Template block usage:
  this.render(hbs`
    {{#hell-filters/date-range-input}}
      template block text
    {{/hell-filters/date-range-input}}
  `);

  assert.equal(this.$().text().trim(), 'template block text');
});
