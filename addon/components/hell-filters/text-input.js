import Ember from 'ember';
import layout from '../../templates/components/hell-filters/text-input';
import FilterComponentMixin from '../../mixins/filter-component-mixin';

export default Ember.Component.extend(FilterComponentMixin,{
  layout,
  classNames: ['form-group'],
  tagName: 'div',
  label: '',
  placeholder: '',
  value: '',
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
  actions: {
    valueChanged: function () {
      this.sendAction('didChange',this.get('value'));
      // console.log(arguments);
      // console.log(this.get('value'));
    }
  }
});
