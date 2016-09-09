import Ember from 'ember';
const {Evented} = Ember;
export default Ember.Service.extend(Evented, {
  generateId(){
    let uid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx';
    return uid.replace(/[xy]/g,(c)=>{
      let r = Math.random()*16|0;
      let v = ((c === 'x')?r: (r&0x3|0x8));
      return v.toString(16);
    });
  },
});
