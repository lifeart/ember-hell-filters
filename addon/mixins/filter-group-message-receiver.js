import Ember from 'ember';
const { get, set, run, RSVP, computed, merge } = Ember;
export default Ember.Mixin.create({
  _mapData: computed(function () {
    return {}
  }),
  messageDebounce: computed(function () {
    return 50;
  }),
  _messageReceiver(uid,datum) {
    this._addDataToMap(uid,datum);
    this._debouncePromiseResolver(uid);
  },
  _debouncePromiseResolver(uid) {
    run.debounce(this,this._resolvePromiseByHash,uid,get(this,'messageDebounce'));
  },
  _getMapData() {
    return get(this,'_mapData') || {};
  },
  _setMapData(data) {
    set(this,'_mapData',data||{});
  },
  _addDataToMap(uid,datum) {
    let data = this._getMapData();
    if (!data.hasOwnProperty(uid)) {
      data[uid] = [];
    }
    data[uid].push(datum);
    this._setMapData(data);
  },
  _getDataFromMap(uid) {
    return get(this._getMapData(),`${uid}`) || [];
  },
  _removeDataFromMap(uid) {
    let data = this._getMapData();
    if (data.hasOwnProperty(uid)) {
      delete data[uid];
    }
    this._setMapData(data);
  },
  _resolvePromiseByHash(hash) {
    let p = get(this,`_pHashResolve`);
    if (p) {
      RSVP.all(this._getDataFromMap(hash)).then(resultsArray=>{
        let resultHash = {};
        resultsArray.forEach(result=>{
          merge(resultHash,result);
        });
        p.get(hash)(resultHash);
      }).finally(()=>{
        this._clearUIDdata(hash);
      });
    }
  },
  _clearUIDdata(uid) {
    let pHashResolve = get(this,'_pHashResolve');
    let pHashReject = get(this,'_pHashReject');
    if (pHashResolve) {
      pHashResolve.delete(uid);
    }
    if (pHashReject) {
      pHashReject.delete(uid);
    }
    this._removeDataFromMap(uid);
  },
  initMessageResolver(uid) {
    run.debounce(this,this._resolvePromiseByHash,uid,get(this,'messageDebounce'));
  },
  messageResolver(uid,resolve,reject) {
    let pHashResolve = get(this,'_pHashResolve') || new Map();
    let pHashReject = get(this,'_pHashReject') || new Map();

    pHashResolve.set(uid,resolve);
    pHashReject.set(uid,reject);

    set(this,'_pHashResolve',pHashResolve);
    set(this,'_pHashReject',pHashReject);
  }
});
