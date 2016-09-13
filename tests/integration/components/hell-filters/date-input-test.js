import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('hell-filters/date-input', 'Integration | Component | hell filters/date input', {
  integration: true
});

test('it renders', function(assert) {
  // Set any properties with this.set('myProperty', 'value');
  // Handle any actions with this.on('myAction', function(val) { ... });

  this.render(hbs`{{hell-filters/date-input}}`);

  assert.equal(this.$().text().trim(), '');

  // Template block usage:
  this.render(hbs`
    {{#hell-filters/date-input}}
      template block text
    {{/hell-filters/date-input}}
  `);

  assert.equal(this.$().text().trim(), 'template block text');
});
