import Ember from 'ember';
import layout from '../../templates/components/hell-filters/checkbox-input';
import FilterComponentMixin from '../../mixins/filter-component-mixin';
const {get} = Ember;
export default Ember.Component.extend(FilterComponentMixin,{
  layout,
  classNames: ['form-group'],
  tagName: 'div',
  isHidden: false,
  configurableProperties: ['value','placeholder','label'],
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
  checked: Ember.computed('value',function () {
    return this.get('value');
  }),
  checkWatcher: Ember.observer('checked',function () {
    this.send('valueChanged');
  }),
  label: '',
  hasLabel: Ember.computed('label',function(){
    return this.get('label') !== false;
  }),
  placeholder: '',
  value: false,
  actions: {
    valueChanged: function () {
      this.sendAction('didChange',this.get('value'));
    },
    valueAction(messageName,uid) {
      let result = {};
      result[get(this,'filterName')] = this.get('value');
      this.sendMessageToParent(messageName,result,uid);
    }
  }
});
