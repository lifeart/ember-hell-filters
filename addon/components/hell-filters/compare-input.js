import Ember from 'ember';
import layout from '../../templates/components/hell-filters/compare-input';
import FilterComponentMixin from '../../mixins/filter-component-mixin';

export default Ember.Component.extend(FilterComponentMixin,{
  layout,
  classNames: ['form-group'],
  tagName: 'div',
  label: '',
  placeholder: '',
  value: '',
  cmpSymbol: '>',
  cmpAlias: false,
  valueAlias: false,
  didReceiveAttrs() {
    this._super(...arguments);
    let config = this.get('config');
    if (!config || typeof config !== 'object') {
      return;
    }
    let valuesToSet = ['value','placeholder','label','cmpSymbol','cmpAlias','valueAlias'];
    valuesToSet.forEach(item=>{
      if (config.hasOwnProperty(item)) {
        this.set(item,config[item]);
      }
    });
  },
  isOpened: false,
  actions: {
    toggleState: function () {
      this.toggleProperty('isOpened');
    },
    changeCmpValue: function () {
      this.set('cmpSymbol',arguments[0]);
      this.send('valueChanged');
    },
    valueChanged: function () {
      this.sendAction('didChange',[this.get('cmpSymbol'),this.get('value')]);
      if (this.get('cmpAlias')) {
        this.sendAction('rawChange',this.get('cmpAlias'),this.get('cmpSymbol'));
      }
      if (this.get('valueAlias')) {
        this.sendAction('rawChange',this.get('valueAlias'),this.get('value'));
      }
    }
  }
});
