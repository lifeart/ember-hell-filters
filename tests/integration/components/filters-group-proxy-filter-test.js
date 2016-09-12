import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('filters-group-proxy-filter', 'Integration | Component | filters group proxy filter', {
  integration: true
});

test('it renders', function(assert) {
  // Set any properties with this.set('myProperty', 'value');
  // Handle any actions with this.on('myAction', function(val) { ... });

  this.render(hbs`{{filters-group-proxy-filter}}`);

  assert.equal(this.$().text().trim(), '');

  // Template block usage:
  this.render(hbs`
    {{#filters-group-proxy-filter}}
      template block text
    {{/filters-group-proxy-filter}}
  `);

  assert.equal(this.$().text().trim(), 'template block text');
});
