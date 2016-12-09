import Ember from 'ember';
import layout from '../../templates/components/hell-filters/text-input';
import FilterComponentMixin from '../../mixins/filter-component-mixin';
const {get} = Ember;
export default Ember.Component.extend(FilterComponentMixin,{
  layout,
  classNames: ['form-group'],
  isHidden: false,
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
    resetValues(messageName,uid) {
      this.set('value','');
      this.send('valueAction',messageName,uid);
    },
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
