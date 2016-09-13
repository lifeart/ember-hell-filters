import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('hell-filters/checkbox-select', 'Integration | Component | hell filters/checkbox select', {
  integration: true
});

test('it renders', function(assert) {
  // Set any properties with this.set('myProperty', 'value');
  // Handle any actions with this.on('myAction', function(val) { ... });

  this.render(hbs`{{hell-filters/checkbox-select}}`);

  assert.equal(this.$().text().trim(), '');

  // Template block usage:
  this.render(hbs`
    {{#hell-filters/checkbox-select}}
      template block text
    {{/hell-filters/checkbox-select}}
  `);

  assert.equal(this.$().text().trim(), 'template block text');
});
