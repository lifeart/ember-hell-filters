import Ember from 'ember';
const {run,computed,inject,get,isArray,A,observer} = Ember;
export default Ember.Mixin.create({
  filterIteration: 0,
  init() {
    this._super(...arguments);
    run.scheduleOnce('afterRender',this,function () {
      this.incrementProperty('filterIteration');
    });
  },
  selected_items: computed('filters','values',function () {
    let allFilters = get(this,'filters');
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
        if (['number','string'].indexOf(typeof selectedItems[keyName])>-1) {
          selectedKeys.push(`${keyName}:${selectedItems[keyName]}`);
        }
        if (isArray(selectedItems[keyName])) {
          selectedKeys.push(`${keyName}:@any`);
          selectedItems[keyName].forEach(value=>{
            selectedKeys.push(`${keyName}:${value}`);
          });
        }
      } else {
        selectedKeys.push(`${keyName}:@undefined`);
      }
    });
    console.log('selectedKeys',selectedKeys);
    return selectedKeys;
  }),
  filtersController: observer('filterIteration',function () {

    let allFilters = get(this,'filters');
    let existingSelectedKeys = get(this,'selectedKeys');
    console.log('existingSelectedKeys',existingSelectedKeys);
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

  }),
  dependenciesMap: {},
  existingFilters: computed('filters',function () {
    let allFilters = get(this,'filters');
    let dependsMap = get(this,'dependenciesMap') || {};
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
    run.next(this,function () {

      if (!(get(this,'isDestroyed') || get(this,'isDestroying'))) {
        this.incrementProperty('filterIteration');
      }

    });
    return allFilters;
  }),
  hideFilter(filerName) {

    let dependsMap = get(this,'dependenciesMap');
    if (dependsMap.hasOwnProperty(filerName)) {
      dependsMap[filerName].forEach(filter=>{
        this.hideFilter(filter);
      });
    }
    console.log('hideFilter');
    this.createLocalRequest(filerName,'setProperties',{isHidden:true});
  },
  showFilter(filerName) {
    console.log('showFilter');
    this.createLocalRequest(filerName,'setProperties',{isHidden:false});
  }
});
