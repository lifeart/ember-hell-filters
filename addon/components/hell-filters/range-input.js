import Ember from 'ember';
import layout from '../../templates/components/hell-filters/range-input';
import FilterComponentMixin from '../../mixins/filter-component-mixin';
export default Ember.Component.extend(FilterComponentMixin,{
  layout,
  classNames: ['form-group'],
  tagName: 'div',
  label: 'Сотрудники',
  placeholderStart: 'Сотрудники',
  placeholderEnd: 'Сотрудники',
  valueStart: '123123',
  valueEnd: '123123',
  didReceiveAttrs() {
    this._super(...arguments);
    let config = this.get('config');
    if (!config || typeof config !== 'object') {
      return;
    }
    let valuesToSet = ['value','placeholderStart','placeholderEnd','valueStart','valueEnd','label'];
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
    }
  }
});
