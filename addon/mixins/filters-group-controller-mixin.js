import Ember from 'ember';
const {run,computed,get,isArray,observer} = Ember;
export default Ember.Mixin.create({
  filterIteration: 0,
  init() {
    this._super(...arguments);
    run.scheduleOnce('afterRender',this,function () {
      this.incrementProperty('filterIteration');
    });
  },
  selected_items: computed('selectedFilters','values',function () {
    let allFilters = get(this,'selectedFilters') || [];
    let values = { };
    allFilters.forEach(filter=>{
      if (typeof get(filter,'config.value') !== 'undefined') {
        values[filter.name] = filter.config.value;
      }
    });
    let existingConfig = get(this,'values') || {};
    Object.keys(existingConfig).forEach(key=>{
      values[key] = existingConfig[key];
    });
    return values;
  }),
  selectedKeys: computed('selected_items',function () {
    let selectedItems = get(this,'selected_items') || {};
    let selectedKeys = [];
    Object.keys(selectedItems).forEach(keyName=>{
      if (typeof selectedItems[keyName] !== 'undefined') {
        if (['number','string','boolean'].indexOf(typeof selectedItems[keyName])>-1) {
          selectedKeys.push(`${keyName}:${selectedItems[keyName]}`);
          if (String(selectedItems[keyName]).trim() === '') {
            selectedKeys.push(`${keyName}:@empty`);
          }
        }
        if (isArray(selectedItems[keyName])) {
          if (selectedItems[keyName].length) {
            selectedKeys.push(`${keyName}:@any`);
          } else {
            selectedKeys.push(`${keyName}:@empty`);
          }
          selectedItems[keyName].forEach(value=>{
            selectedKeys.push(`${keyName}:${value}`);
          });
        }
      } else {
        selectedKeys.push(`${keyName}:@undefined`);
      }
    });
    return selectedKeys;
  }),
  manageFilters() {
    let allFilters = get(this,'selectedFilters') || [];
    let existingSelectedKeys = get(this,'selectedKeys');
    allFilters.forEach(filter=>{
      if (get(filter,'dependsOn.name')) {
        let key = `${get(filter,'dependsOn.name')}:${get(filter,'dependsOn.value')}`;
        if (existingSelectedKeys.indexOf(key)>-1) {
          this.showFilter(filter.name);
        }
      }
    });

    allFilters.forEach(filter=>{
      if (get(filter,'dependsOn.name')) {
        let key = `${get(filter,'dependsOn.name')}:${get(filter,'dependsOn.value')}`;
        if (existingSelectedKeys.indexOf(key)===-1) {
          this.hideFilter(filter.name);
        }
      }
    });
  },
  filtersController: observer('filterIteration',function () {
    run.debounce(this,this.manageFilters,10);
  }),
  dependenciesMap: {},
  existingFilters: computed('selectedFilters',function () {
    let allFilters = get(this,'selectedFilters') || [];
    let dependsMap = {};
    allFilters.forEach(filter=>{
      let dependedFilterName = get(filter,'dependsOn.name');
      if (dependedFilterName) {
        if (!dependsMap.hasOwnProperty(dependedFilterName)) {
          dependsMap[dependedFilterName] = [];
        }
        dependsMap[dependedFilterName].push(filter.name);
      }
    });
    this.set('dependenciesMap',dependsMap);
    return allFilters;
  }),
  hideFilter(filerName) {

    let dependsMap = get(this,'dependenciesMap');
    if (dependsMap.hasOwnProperty(filerName)) {
      dependsMap[filerName].forEach(filter=>{
        this.hideFilter(filter);
      });
    }
    this.createLocalRequest(filerName,'setProperties',{isHidden:true});
  },
  showFilter(filerName) {
    this.createLocalRequest(filerName,'setProperties',{isHidden:false});
  }
});
