/* global moment */
import Ember from 'ember';
import layout from '../../templates/components/hell-filters/date-range-input';
import FilterComponentMixin from '../../mixins/filter-component-mixin';
export default Ember.Component.extend(FilterComponentMixin,{
  layout,
  classNames: ['form-group'],
  tagName: 'div',
  label: 'Сотрудники',
  dateFormat: "yyyy-mm-dd",
  momentDateFormat: "YYYY-MM-DD",
  returnFormatted: true,
  classNameBindings: ['isHidden:hidden'],
  isHidden: false,
  didReceiveAttrs() {
    this._super(...arguments);
    let config = this.get('config');
    if (!config || typeof config !== 'object') {
      return;
    }
    let valuesToSet = ['valueEndAlias','isHidden','valueStartAlias','value','placeholderStart','placeholderEnd','todayHighlightStart','todayHighlightEnd','valueStart','valueEnd','label'];
    valuesToSet.forEach(item=>{
      if (config.hasOwnProperty(item)) {
        if ((item === 'valueStart' || item === 'valueEnd') && typeof item === 'string') {
          this.set(item,moment(config[item]).toDate());
        } else {
          this.set(item,config[item]);
        }
      }
    });
  },
  limitController: Ember.observer('valueStart','valueEnd',function () {
    let {valueStart,valueEnd} = this.getProperties('valueStart','valueEnd');
    if (typeof valueStart === 'object' && typeof  valueEnd === 'object' && valueStart !== null && valueEnd !== null) {
      if (valueEnd.getTime()<valueStart.getTime()) {
        this.set('valueEnd',valueStart);
      }
    }
    console.log('valueStart',valueStart);
    console.log('valueEnd',valueEnd);
  }),
  placeholderStart: 'Сотрудники',
  placeholderEnd: 'Сотрудники',
  todayHighlightStart: false,
  todayHighlightEnd: false,
  valueEndAlias: false,
  valueStartAlias: false,
  valueStart: Ember.computed(function () {
    return new Date();
  }),
  valueEnd: Ember.computed(function () {
    return new Date();
  }),
  actions: {

    valueAction(messageName,uid) {
      let result = {};
      result[this.get('filterName')] = [this.get('valueStart'),this.get('valueEnd')];
      if (this.get('valueEndAlias')) {
        result[this.get('valueEndAlias')] = moment(this.get('valueEnd'));
      }
      if (this.get('valueStartAlias')) {
        result[this.get('valueStartAlias')] = moment(this.get('valueStart'));
      }
      this.sendMessageToParent(messageName,result,uid);
    },
    valueChanged: function () {
      if (this.get('returnFormatted')) {
        this.sendAction('didChange',[moment(this.get('valueStart')).format(this.get('momentDateFormat')),moment(this.get('valueEnd')).format(this.get('momentDateFormat'))]);
        if (this.get('valueEndAlias')) {
          this.sendAction('rawChange',this.get('valueEndAlias'),moment(this.get('valueEnd')).format(this.get('momentDateFormat')));
        }
        if (this.get('valueStartAlias')) {
          this.sendAction('rawChange',this.get('valueStartAlias'),moment(this.get('valueStart')).format(this.get('momentDateFormat')));
        }
      } else {
        this.sendAction('didChange',[moment(this.get('valueStart')),moment(this.get('valueEnd'))]);
        if (this.get('valueEndAlias')) {
          this.sendAction('rawChange',this.get('valueEndAlias'),moment(this.get('valueEnd')));
        }
        if (this.get('valueStartAlias')) {
          this.sendAction('rawChange',this.get('valueStartAlias'),moment(this.get('valueStart')));
        }
      }

    }
  }
});
