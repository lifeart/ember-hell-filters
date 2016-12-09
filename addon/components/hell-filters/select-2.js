import Ember from 'ember';
import layout from '../../templates/components/hell-filters/select-2';
import FilterComponentMixin from '../../mixins/filter-component-mixin';

const {get,isArray,A,computed} = Ember;

const findValueInSelect2Object = function (id,item,idKey) {
  if (item[idKey] === id) {
    return item;
  }
  if (item.hasOwnProperty('children')&&isArray(item.children)&&item.children.length) {
    for (let i = 0; i < item.children.length; i++) {
      let searchItem = findValueInSelect2Object(id,item.children[i],idKey);
      if (searchItem) {
        return searchItem;
      }
    }
  } else {
    return false;
  }
  return false;
};

const getValueFromSelect2DataObject = function (itemId,data,idKey) {

  let item = false;
  if (isArray(data)) {
    for (let i = 0; i < data.length; i++) {
      item = findValueInSelect2Object(itemId,data[i],idKey);
      if (item) {
        return item;
      }
    }
  } else {
    return findValueInSelect2Object(itemId,data,idKey);
  }

  return false;
};

export default Ember.Component.extend(FilterComponentMixin,{
  layout,
  classNames: ['form-group'],
  tagName: 'div',
  multiple: true,
  label: 'SampleLabel',
  value: ['DefaultValue'],
  idKey: 'id',
  textKey: 'text',
  classNameBindings: ['isHidden:hidden'],
  isHidden: false,
  configurableProperties: ['value','placeholder','isHidden','label','options','idKey','textKey','multiple','showChild','childKey'],
  didReceiveAttrs() {
    this._super(...arguments);
    let config = get(this,'config');
    if (!config || typeof config !== 'object') {
      return;
    }
    let valuesToSet = get(this,'configurableProperties');
    valuesToSet.forEach(item=>{
      if (config.hasOwnProperty(item)) {
        if (item === 'value') {
          if (isArray(config[item])) {
            this.set(item,config[item]);
          } else {
            if (['string','number'].indexOf(typeof config[item]) !== -1) {
              let stArrValue = String(config[item]).trim().split(',').filter(el=>{
                return (el !== '');
              });
              this.set(item,A(stArrValue).compact());
            }
          }
        } else {
          this.set(item,config[item]);
        }
      }
    });
  },
  selectedItems: computed('value','items',function () {
    let items = get(this,'items');
    let selectedItems = get(this,'value');
    let result = A();
    let idKey = get(this,'idKey');

    if (!isArray(selectedItems)) {
      selectedItems = A(typeof selectedItems === 'string'?selectedItems.split(','):[selectedItems]).compact();
    }

    selectedItems.forEach(item=>{
      let itemId = typeof item === 'object' ? get(item,idKey) : item;
      let existingItem = getValueFromSelect2DataObject(String(itemId),items,'id');
      if (!existingItem) {
        if (!isNaN(parseInt(itemId,10))) {
          existingItem =  getValueFromSelect2DataObject(parseInt(itemId,10),items,'id');
        }
      }
      if (existingItem) {
        result.push(existingItem);
      }
    });

    if (get(this,'multiple')) {
      return result;
    } else {
      return result.length?result[0]:null;
    }

  }),
  options: computed(function () {
    return A();
  }),
  items: computed('options',function () {
    let options = get(this,'options');
    let idKey = get(this,'idKey');
    let valueKey = get(this,'textKey');
    if (!options || !isArray(options)) {
      return [];
    }
    return A(options.map(el=>{
      return {
        id: get(el,idKey),
        text: get(el,valueKey),
        children: get(el,'children') || undefined
      };
    }));
  }),
  actions: {
    resetValues(messageName,uid) {
      this.set('value',Ember.A());
      this.set('selectedItems',Ember.A());
      this.send('valueAction',messageName,uid);
    },
    changeAction(items) {
      if (isArray(items)) {
        this.sendAction('didChange',items.map(item=>get(item,'id')));
      } else {
        this.sendAction('didChange',get(items,'id'));
      }
    },
    valueAction(messageName,uid) {
      let result = {};
      let items = get(this,'selectedItems');
      let idKey = get(this,'idKey');
      if (items) {
        result[get(this,'filterName')] = isArray(items)?items.map(el=>get(el,idKey)):get(items,idKey);
        this.sendMessageToParent(messageName,result,uid);
      }
    }
  }
});
