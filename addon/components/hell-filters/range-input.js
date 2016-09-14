import Ember from 'ember';
import layout from '../../templates/components/hell-filters/range-input';
import FilterComponentMixin from '../../mixins/filter-component-mixin';
const {get} = Ember;
export default Ember.Component.extend(FilterComponentMixin,{
  layout,
  classNames: ['form-group'],
  isHidden: false,
  tagName: 'div',
  label: 'Сотрудники',
  placeholderStart: 'Сотрудники',
  placeholderEnd: 'Сотрудники',
  valueStart: '123123',
  valueEnd: '123123',
  type: 'text',
  configurableProperties: ['value','type','placeholderStart','placeholderEnd','valueStart','valueEnd','label'],
  didReceiveAttrs() {
    this._super(...arguments);
    let config = this.get('config');
    if (!config || typeof config !== 'object') {
      return;
    }
    let valuesToSet = this.get('configurableProperties');
    valuesToSet.forEach(item=>{
      if (config.hasOwnProperty(item)) {
        this.set(item,config[item]);
      }
    });
  },
  actions: {
    valueChanged: function () {
      this.sendAction('didChange',[this.get('valueStart'),this.get('valueEnd')]);
      // console.log(arguments);
      // console.log(this.get('value'));
    },
    valueAction(messageName,uid) {
      let result = {};
      result[get(this,'filterName')] = [this.get('valueStart'),this.get('valueEnd')];
      this.sendMessageToParent(messageName,result,uid);
    }
  }
});
