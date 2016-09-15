import Ember from 'ember';
import layout from '../../templates/components/hell-filters/checkbox-select';
const {get,computed,A,run,isArray} = Ember;
import FilterComponentMixin from '../../mixins/filter-component-mixin';
export default Ember.Component.extend(FilterComponentMixin,{
  layout,
  classNames: ['form-group','component--checkbox-select'],
  tagName: 'div',
  classNameBindings: ['isHidden:hidden'],
  isHidden: false,
  showCheckboxes: false,
  configurableProperties: ['options','placeholder','label','value','textKey','idKey','showCheckboxes'],
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
  label: '',
  placeholder: '',
  textKey: 'name',
  idKey: 'id',
  selectedItems: [],
  value: false,
  checkboxes: computed('options','value',function () {
    let values = A(get(this,'value'));
    let options = get(this,'options');
    let idKey = get(this,'idKey');
    let textKey = get(this,'textKey');

    run.later(this,this.updateSelection);

    return isArray(options)?options.map(el=>{
      let checked = values.contains(get(el,idKey));
      return {
        name: get(el,textKey),
        id: get(el,idKey),
        checked: checked,
        value: checked
      };
    }):[];
  }),
  setIfAlive(key,value) {
    if (!(get(this,'isDestroyed') || get(this,'isDestroying'))) {
      this.set(key,value);
    }
  },
  updateSelection() {
    let idKey = get(this,'idKey');
    let selectedItems = get(this,'checkboxes').filterBy('value',true).mapBy(idKey);
    let options = get(this,'options') || [];
    let selectedIds = options.filter(option=>{
      return selectedItems.contains(get(option,idKey));
    }).mapBy(idKey);
    this.setIfAlive('selectedItems',selectedIds);
  },
  actions: {
    valueChanged: function () {
      this.updateSelection();
      this.sendAction('didChange',get(this,'selectedItems'));
    },
    toggleCheckboxes: function () {
      this.toggleProperty('showCheckboxes');
    },
    valueAction(messageName,uid) {
      let result = {};
      result[get(this,'filterName')] = get(this,'selectedItems');
      this.sendMessageToParent(messageName,result,uid);
    }
  }
});

