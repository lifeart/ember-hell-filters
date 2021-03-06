import Ember from 'ember';
import layout from '../templates/components/filters-group';
import FilterGroupMessageReceiver from '../mixins/filter-group-message-receiver';
import FiltersGroupControllerMixin from '../mixins/filters-group-controller-mixin';
const { get, computed, observer, Component, inject, set, RSVP, isArray, A} = Ember;
export default Component.extend(FilterGroupMessageReceiver,FiltersGroupControllerMixin,{
  layout,
  filterEventBus: inject.service(),
  defaultMessageReceiverName: '_messageReceiver',
  eventsNamespace: computed.readOnly('filterEventBus.eventsNamespace'),
  groupNamespace: computed.readOnly('filterEventBus.groupNamespace'),
  changeActionName: 'filterFieldChanged',
  classNames: ['flex-row'],
  gid() {
    return get(this,'filterEventBus').generateId();
  },
  init() {
    this._super(...arguments);
    if (!get(this,'filtersUID')) {
      set(this,'filtersUID',this.gid());
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
  initialValues() {
    return this.createGlobalRequest('resetValuesToInitial');
  },
  visibleValues() {
    return this.createGlobalRequest('value:if',{isHidden:false});
  },
  createLocalRequest(filterName,actionName,fields) {
    let id = this.gid();
    get(this,'filterEventBus').trigger(`${get(this,'eventsNamespace')}:${get(this,'filtersUID')}:${filterName}`,actionName,fields,id);
  },
  createGlobalRequest(name,fields) {
    let id = this.gid();
    let p = new RSVP.Promise((resolve,reject)=>{
      this.messageResolver(id,resolve,reject);
    });
    get(this,'filterEventBus').trigger(`${get(this,'eventsNamespace')}:${get(this,'filtersUID')}`,name,fields,id);
    this.initMessageResolver(id);
    return p;
  },
  values: {},
  filters: computed(function () {
    return A();
  }),
  filtersObserver: observer('filters',function () {
      this.incrementProperty('filterIteration');
  }),
  selectedFilters: computed('filters',function () {
    let filters = get(this,'filters');
    let values = get(this,'values') || {};

    if (!filters || !isArray(filters) || !filters.length) {
      return A();
    }

    filters.forEach(filter=>{
      let filterName = get(filter,'name');
      if (values.hasOwnProperty(filterName) && typeof values[filterName] !== 'undefined') {
        if (typeof values[filterName] === 'object' && !isArray(values[filterName])) {
          Object.keys(values[filterName]).forEach(keyName=>{
            filter.config[keyName] = values[filterName][keyName];
          });
        } else {
          filter.config.value = values[filterName];
        }
      }
    });



    return filters.filter(function (filter) {
      return (filter.hasOwnProperty('active') && ([false,0].indexOf(filter.active)>-1)) ? false : true;
    });
  }),
  didReceiveAttrs() {
    this._super(...arguments);
  },

  actions: {
    proxy(context) {
      if (context) {
        let bindArgs = Array.prototype.slice.call(arguments, 1);
        context.send.apply(context,bindArgs);
      }
    },
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
    },
    resetAllValues() {
      this.initialValues().then(()=>{
        this.set('values',{});
        this.manageFilters();
        this.send('applyVisibleFilters');
      });
    }
  }
});
