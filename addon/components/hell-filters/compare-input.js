import Ember from 'ember';
import layout from '../../templates/components/hell-filters/compare-input';
import FilterComponentMixin from '../../mixins/filter-component-mixin';
const {get} = Ember;
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
  isHidden: false,
  configurableProperties: ['value','placeholder','label','cmpSymbol','cmpAlias','valueAlias'],
  didReceiveAttrs() {
    this._super(...arguments);
    let config = this.get('config');
    if (!config || typeof config !== 'object') {
      return;
    }
    let valuesToSet = get(this,'configurableProperties');
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
    },
    valueAction(messageName,uid) {
      let result = {};
      result[get(this,'filterName')] = [this.get('cmpSymbol'),this.get('value')];
      if (this.get('cmpAlias')) {
        result[get(this,'cmpAlias')] = this.get('cmpSymbol');
      }
      if (this.get('valueAlias')) {
        result[get(this,'valueAlias')] = this.get('value');
      }
      this.sendMessageToParent(messageName,result,uid);
    }
  }
});
