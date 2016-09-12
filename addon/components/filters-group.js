import Ember from 'ember';
import layout from '../templates/components/filters-group';
import FilterGroupMessageReceiver from '../mixins/filter-group-message-receiver';
const { get } = Ember;
export default Ember.Component.extend(FilterGroupMessageReceiver,{
  layout,
  filterEventBus: inject.service(),
  defaultMessageReceiverName: '_messageReceiver',

  init() {
    this._super(...arguments);
    if (!get(this,'filtersUID')) {
      set(this,'filtersUID',get(this,'filterEventBus').generateId());
    }
    get(this,'filterEventBus').on(`filter-group:${get(this,'filtersUID')}`, this, get(this,'defaultMessageReceiverName'));
  },
  willClearRender() {
    this._super(...arguments);
    get(this,'filterEventBus').off(`filter-group:${get(this,'filtersUID')}`, this,  get(this,'defaultMessageReceiverName'));
  },

  hiddenValues() {
    return this.createGlobalRequest('value:if',{isHidden:true});
  },
  visibleValues() {
    return this.createGlobalRequest('value:if',{isHidden:false});
  },

  createGlobalRequest(name,fields) {
    let id = get(this,'filterEventBus').generateId();
    let p = new RSVP.Promise((resolve,reject)=>{
      this.messageResolver(id,resolve,reject);
    });
    get(this,'filterEventBus').trigger(`filters:${get(this,'filtersUID')}`,name,fields,id);
    this.initMessageResolver(id);
    return p;
  },

  actions: {
    applyVisibleFilters() {
      this.visibleValues().then(values=>{
        this.set('resolvedFilters',values);
        this.sendAction('filtersDidChange',values);
      });
    }
  }
});