import Ember from 'ember';
import layout from '../templates/components/filters-group-proxy-filter';
import FilterComponentMixin from '../mixins/filter-component-mixin';
export default Ember.Component.extend(FilterComponentMixin,{
  layout,
  classNames: ['flex-block'],
  tagName: 'div',
  classNameBindings: ['isHidden:hidden'],
  isHidden: false,
  isProxy: true
});
