import Ember from 'ember';
import layout from '../templates/components/filters-group';
import FilterGroupMessageReceiver from '../mixins/filter-group-message-receiver';
import FiltersGroupControllerMixin from '../mixins/filters-group-controller-mixin';
const { get, computed, Component, inject, set } = Ember;
export default Component.extend(FilterGroupMessageReceiver,FiltersGroupControllerMixin,{
  layout,
  filterEventBus: inject.service(),
  defaultMessageReceiverName: '_messageReceiver',
  eventsNamespace: computed.readOnly('filterEventBus.eventsNamespace'),
  groupNamespace: computed.readOnly('filterEventBus.groupNamespace'),
  changeActionName: 'filterFieldChanged',
  classNames: ['flex-row'],
  init() {
    this._super(...arguments);
    if (!get(this,'filtersUID')) {
      set(this,'filtersUID',get(this,'filterEventBus').generateId());
    }
    get(this,'filterEventBus').on(`${get(this,'groupNamespace')}:${get(this,'filtersUID')}`, this, get(this,'defaultMessageReceiverName'));
  },
  willClearRender() {
    this._super(...arguments);
    get(this,'filterEventBus').off(`${get(this,'groupNamespace')}:${get(this,'filtersUID')}`, this,  get(this,'defaultMessageReceiverName'));
  },

  hiddenValues() {
    return this.createGlobalRequest('value:if',{isHidden:true});
  },
  visibleValues() {
    return this.createGlobalRequest('value:if',{isHidden:false});
  },

  createLocalRequest(filterName,actionName,fields) {
    let id = get(this,'filterEventBus').generateId();
    console.log(`${get(this,'eventsNamespace')}:${get(this,'filtersUID')}:${filterName}`);
    get(this,'filterEventBus').trigger(`${get(this,'eventsNamespace')}:${get(this,'filtersUID')}:${filterName}`,actionName,fields,id);
  },
  createGlobalRequest(name,fields) {
    let id = get(this,'filterEventBus').generateId();
    let p = new RSVP.Promise((resolve,reject)=>{
      this.messageResolver(id,resolve,reject);
    });
    get(this,'filterEventBus').trigger(`${get(this,'eventsNamespace')}:${get(this,'filtersUID')}`,name,fields,id);
    this.initMessageResolver(id);
    return p;
  },
  values: {},
  actions: {
    filterFieldChanged() {
      console.log(arguments);
      this.set(`values.${arguments[0]}`,arguments[1]);
      this.notifyPropertyChange('values');
      this.incrementProperty('filterIteration');
      console.log(this.get('values'));
    },
    applyVisibleFilters() {
      this.visibleValues().then(values=>{
        this.set('resolvedFilters',values);
        this.sendAction('filtersDidChange',values);
      });
    }
  }
});
