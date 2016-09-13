import Ember from 'ember';
import layout from '../../templates/components/hell-filters/checkbox-input';
import FilterComponentMixin from '../../mixins/filter-component-mixin';
export default Ember.Component.extend(FilterComponentMixin,{
  layout,
  classNames: ['form-group'],
  tagName: 'div',
  didReceiveAttrs() {
    this._super(...arguments);
    let config = this.get('config');
    if (!config || typeof config !== 'object') {
      return;
    }
    let valuesToSet = ['value','placeholder','label'];
    valuesToSet.forEach(item=>{
      if (config.hasOwnProperty(item)) {
        this.set(item,config[item]);
      }
    });
  },
  checked: Ember.computed('value',function () {
    return this.get('value');
  }),
  label: '',
  placeholder: '',
  value: false,
  actions: {
    valueChanged: function () {
      this.sendAction('didChange',this.get('value'));
    }
  }
});
