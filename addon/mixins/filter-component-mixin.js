import Ember from 'ember';
const {get,computed,inject}  = Ember;
export default Ember.Mixin.create({
  filterEventBus: inject.service(),
  globalEventTrigger: '_defaultPropertyTrigger',
  localEventTrigger: '_defaultPropertyTrigger',
  eventsNamespace: 'filters',
  groupNamespace: 'filters-group',
  init() {
    this._super(...arguments);

    this.eventBus().on(get(this,'globalFiltersEventNamespace'), this, get(this,'globalEventTrigger'));
    this.eventBus().on(get(this,'currentFilterEventsNamespace'), this, get(this,'localEventTrigger'));
  },
  willClearRender() {
    this._super(...arguments);

    this.eventBus().off(get(this,'globalFiltersEventNamespace'), this, get(this,'globalEventTrigger'));
    this.eventBus().off(get(this,'currentFilterEventsNamespace'), this, get(this,'localEventTrigger'));
  },
  sendMessageToParent(messageName,data,uid) {
    this.eventBus().trigger(`${get(this,'groupNamespace')}:${get(this,'filtersUID')}`,messageName,data,uid);
  },
  filterName: computed(function () {
    return `hell_filters_filter_${this.eventBus().generateId()}`;
  }),
  globalFiltersEventNamespace: Ember.computed('filtersUID',function () {
    let filtersUID = get(this,'filtersUID');
    return `${get(this,'eventsNamespace')}:${filtersUID}`;
  }),
  currentFilterEventsNamespace: Ember.computed('globalFiltersEventNamespace','filterName',function () {
    let filterName = get(this,'filterName');
    return `${this.globalFiltersEventNamespace()}:${filterName}`;
  }),
  eventBus() {
    return get(this,'filterEventBus');
  },
  _defaultPropertyTrigger(eventType,datum,uid) {

    if (eventType === 'setProperties') {
      this.setProperties(datum || {});
    }

    if (eventType === 'value:if') {
      let datumKeys = Object.keys(datum);
      let hasValidState = true;
      datumKeys.forEach(key=>{
        if (this.get(key) !== datum[key]) {
          hasValidState = false;
        }
      });

      if (hasValidState) {
        if (this.actions && this.actions.hasOwnProperty('valueAction')) {
          this.send('valueAction',uid);
        }
      }
    }
  }
});
