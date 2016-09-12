import Ember from 'ember';
const {run,computed,inject,get,isArray,A,observer} = Ember;
export default Ember.Mixin.create({
  filterIteration: 0,

  // for tests only
  store: inject.service(),
  existing_filters: computed(function(){
    let store = this.get('store');
    return A([
      {
        componentName: 'filters/checkbox-select',
        name: 'root_model_name',
        dependsOn: {
          name: 'deep_level',
          value: 'managers'
        },
        filters: [
          {
            componentName: 'filters/checkbox-select',
            name: 'root_model_name23',
            config: {
              label: 'Глубина вложенности 2',
              placeholder: 'Укажите глубину',
              idKey: 'id',
              textKey: 'name',
              options: [
                {id:'manager',name:'Менеджер'},
                {id:'contractor',name:'Контрагент'},
                {id:'campaign',name:'Рекламная кампания'},
                {id:'manager12',name:'Менеджер12'},
                {id:'contractor12',name:'Контрагент12'},
                {id:'campaign12',name:'Рекламная кампания12'}
              ],
              value: ['contractor','contractor12']
            }
          },
          {
            componentName: 'filters/checkbox-select',
            name: 'domain_typwere',
            config: {
              label: 'Тип домена',
              placeholder: 'Тип домена',
              idKey: 'id',
              textKey: 'name',
              options: [
                {id:'WHITE',name:'White'},
                {id:'BLUE',name:'Blue'},
                {id:'GRAY',name:'Gray'},
                {id:'BLACK',name:'Black'},
                {id:'UNKNOWN',name:'Unknown'}
              ]
            }
          },
        ],
        config: {
          label: 'Глубина вложенности 2',
          placeholder: 'Укажите глубину',
          idKey: 'id',
          textKey: 'name',
          options: [
            {id:'manager',name:'Менеджер'},
            {id:'contractor',name:'Контрагент'},
            {id:'campaign',name:'Рекламная кампания'},
            {id:'manager12',name:'Менеджер12'},
            {id:'contractor12',name:'Контрагент12'},
            {id:'campaign12',name:'Рекламная кампания12'}
          ],
          value: ['contractor','contractor12']
        }
      },
      {
        componentName: 'filters/checkbox-select',
        name: 'domain_type',
        config: {
          label: 'Тип домена',
          placeholder: 'Тип домена',
          idKey: 'id',
          textKey: 'name',
          options: [
            {id:'WHITE',name:'White'},
            {id:'BLUE',name:'Blue'},
            {id:'GRAY',name:'Gray'},
            {id:'BLACK',name:'Black'},
            {id:'UNKNOWN',name:'Unknown'}
          ]
        }
      },
      {
        componentName: 'filters/checkbox-select',
        name: 'position_type',
        config: {
          label: 'Позиция',
          placeholder: 'Позиция',
          idKey: 'id',
          textKey: 'name',
          options :store.peekAll('slot')
        }
      },
      {
        componentName: 'filters/checkbox-select',
        name: 'platform_type',
        config: {
          label: 'Платформа',
          placeholder: 'Платформа',
          idKey: 'id',
          textKey: 'name',
          options: [
            {id:'tablet',name:'Планшет'},
            {id:'ios',name:'iOS'},
            {id:'android',name:'Android'}
          ],
          value: ['pc']
        }
      },
      {
        componentName: 'filters/checkbox-select',
        name: 'geo_target_type',
        config: {
          label: 'Гео таргет',
          placeholder: 'Гео таргет',
          idKey: 'id',
          textKey: 'name',
          options: [
            {id:'RU',name:'Россия'},
            {id:'UA',name:'Украина'},
            {id:'BE',name:'Белоруссия'}
          ],
          value: ['RU']
        }
      },
      {
        componentName: 'filters/checkbox-select',
        name: 'adv_status',
        config: {
          label: 'Статус РК',
          placeholder: 'Укажите статус',
          idKey: 'id',
          textKey: 'name',
          options: [
            {id:'1',name:'Включёна'},
            {id:'2',name:'Не включёна'},
            {id:'3',name:'Остановлена'},
            {id:'4',name:'Заблокирована'},
            {id:'5',name:'На модерации'}
          ],
          value: ['1']
        }
      },
      {
        componentName: 'filters/users-filter',
        name: 'deep_level',
        config: {
          label: 'Глубина вложенности',
          placeholder: 'Укажите глубину',
          idKey: 'id',
          multiple: false,
          textKey: 'name',
          options: [
            {id:'managers',name:'Менеджер'},
            {id:'contractors',name:'Контрагент'},
            {id:'campaigns',name:'Рекламная кампания'}
          ],
          value: 'managers'
        }
      },
      {
        componentName: 'filters/users-filter',
        name: 'contractor_ids',
        dependsOn: {
          name: 'deep_level',
          value: 'contractors'
        },
        config: {
          label: 'Выбранные контрагенты',
          placeholder: 'Укажите контрагентов',
          idKey: 'id',
          multiple: true,
          textKey: 'name',
          options: Ember.computed(function () {
            return this.get('store').peekAll('contractor');
          }),
          value: ''
        }
      },
      {
        componentName: 'filters/users-filter',
        name: 'campaign_ids',
        dependsOn: {
          name: 'deep_level',
          value: 'campaigns'
        },
        config: {
          label: 'Выбранные кампании',
          placeholder: 'Укажите кампании',
          idKey: 'id',
          multiple: true,
          textKey: 'name',
          options: Ember.computed(function () {
            return this.get('store').peekAll('campaign');
          }),
          value: ''
        }
      },
      {
        componentName: 'filters/users-filter',
        name: 'manager_contractor--select',
        dependsOn: {
          name: 'deep_level',
          value: 'manager'
        },
        config: {
          label: 'Contractor',
          placeholder: '-- not selected --',
          idKey: 'id',
          multiple: true,
          textKey: 'full_name',
          options: Ember.computed(function () {
            return this.get('store').peekAll('user');
          }),
          value: ['manager']
        }
      },
      {
        componentName: 'filters/users-filter',
        name: 'manager_contractor--select2',
        dependsOn: {
          name: 'manager_contractor--select',
          value: '@any'
        },
        config: {
          label: '2 уровень вложенности фильтра',
          placeholder: '-- не выбрано --',
          idKey: 'id',
          multiple: true,
          textKey: 'full_name',
          options: Ember.computed(function () {
            return this.get('store').peekAll('user');
          }),
          value: ['manager1']
        }
      },
      {
        componentName: 'filters/users-filter',
        name: 'manager_contractor--select3',
        dependsOn: {
          name: 'manager_contractor--select2',
          value: '@any'
        },
        config: {
          label: '3 уровень вложенности фильтра',
          placeholder: '-- не выбрано --',
          idKey: 'id',
          multiple: true,
          textKey: 'full_name',
          options: Ember.computed(function () {
            return this.get('store').peekAll('user');
          }),
          value: ['manager1']
        }
      },
      {
        componentName: 'filters/users-filter',
        name: 'contractor_campaign--select',
        dependsOn: {
          name: 'deep_level',
          value: 'contractor'
        },
        config: {
          label: 'Контрагент / Рекламная кампания',
          placeholder: '-- не выбрано --',
          idKey: 'id',
          multiple: true,
          textKey: 'name',
          options: [{id:'manager12',name:'Менеджер12'},{id:'contractor12',name:'Контрагент12'},{id:'campaign12',name:'Рекламная кампания12'}],
          value: ['manager12']
        }
      },
      {
        componentName: 'filters/users-filter',
        name: 'campaign_advertise--select',
        dependsOn: {
          name: 'deep_level',
          value: 'campaign'
        },
        config: {
          label: 'Рекламная кампания',
          placeholder: '-- не выбрано --',
          idKey: 'id',
          multiple: true,
          textKey: 'name',
          options: [{id:'manager123',name:'Менеджер123'},{id:'contractor123',name:'Контрагент123'},{id:'campaign123',name:'Рекламная кампания12'}],
          value: ['manager123']
        }
      },
      {
        componentName: 'filters/users-filter',
        name: 'date_range',
        config: {
          label: 'Период',
          placeholder: 'Период',
          idKey: 'id',
          multiple: false,
          textKey: 'name',
          options: [
            {id:'today', name:'Сегодня'},
            {id:'yesterday', name:'Вчера'},
            {id:'last7', name:'За последние 7 дней'},
            {id:'last30', name:'За последние 30 дней'},
            {id:'currentMonth', name:'Текущий месяц'},
            {id:'previousMonth', name:'Предыдущий месяц'},
            {id:'custom', name:'Произвольно'}
          ],
          value: ['last7']
        }
      },
      {
        componentName: 'filters/date-range-input',
        name: 'filters__dates',
        dependsOn: {
          name: 'date_range',
          value: 'custom'
        },
        config: {
          valueStartAlias: '1392h12039213',
          valueEndAlias: '13212h38dhasodg8',
          label: 'Даты периода',
          placeholderStart: 'c',
          placeholderEnd: 'по',
          valueStart: new Date(),
          valueEnd: new Date()
        }
      },
      {
        componentName: 'filters/users-filter',
        name: 'filters__traffic__devices__names',
        config: {
          label: 'Девайс',
          placeholder: 'все',
          idKey: 'id',
          multiple: true,
          textKey: 'name',
          options: [
            {id:'tablet',name:'Планшет'},
            {id:'ios',name:'iOS'},
            {id:'android',name:'Android'}
          ]
        }
      },
      {
        componentName: 'filters/users-filter',
        name: 'filters__traffic__countries__names',
        config: {
          label: 'Страна',
          placeholder: 'Страна',
          idKey: 'id',
          multiple: true,
          textKey: 'name',
          options: Ember.computed(function(){
            return this.get('store').peekAll('country').map(country=>{
              return {
                id: country.get('id'),
                name: country.get('name')
              };
            });
          }),
          value: ['RU']
        }
      },
      {
        componentName: 'filters/users-filter',
        name: 'group_by',
        config: {
          label: 'Группировка',
          placeholder: 'Группировка',
          idKey: 'id',
          multiple: false,
          textKey: 'name',
          options: [
            {name:'@field_name',id:'@field_name'},
            {name:'@field_ids',id:'@field_ids'},
            {name:'@traffic_countries',id:'@traffic_countries'},
            {name:'@advertisement_domain_statuses',id:'@advertisement_domain_statuses'},
            {name:'@advertisement_slots',id:'@advertisement_slots'}
          ],
          value: ['@field_name']
        }
      }
    ]);

  }),
  // for tests only

  init() {
    this._super(...arguments);
    run.scheduleOnce('afterRender',this,function () {
      this.incrementProperty('filterIteration');
    });
  },
  selected_items: computed('existing_filters','values',function () {
    let allFilters = get(this,'existing_filters');
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

    let allFilters = get(this,'existing_filters');
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
  filters: computed('existing_filters',function () {
    let allFilters = get(this,'existing_filters');
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
