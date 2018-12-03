'use strict';

function addStates(stateNames, upsert){
  if(typeof stateNames === "string" || typeof stateNames === "number") this.states[stateNames] = {};
  else if(Object.prototype.toString.call(stateNames).indexOf('Array')>-1){
    this.states = stateNames.reduce(function (map,stateName){
      if(typeof stateNames !== "string" && typeof stateNames !== "number"){
        throw new Error('you provided invalid array of states names. valid names are : string/number');
        return;
      }else if(!upsert && map[stateName] ){
        throw new Error('state ' + stateName + ' already exists. please set upsert = true.');
      }
      map[stateName] = {};
      return map;
    },this.states);
  }else{
    throw new Error('you provided invalid states names. valid names are : null,string,[string/number]');
  }
}

function changeState(stateName){
  this.state = stateName;
}

var FSM = function (initStateName, stateNames){
  if( !initStateName ) throw new Error('you must provide initial state name');
  this.state = initStateName;
  this.states = {};
  if(stateNames) addStates.call(this,stateNames);
  if( !this.states[initStateName] ) this.states[initStateName] = {};
};

FSM.prototype.addStates = function(stateNames, upsert){
  if(stateNames) addStates.call(this,stateNames, upsert);
  else  throw new Error('you provided invalid state name. valid names are : string/number');
};

FSM.prototype.addTransition = function(transitionName, transitionCB, stateName, targetStateName, upsert){
  var boundChangeState =  changeState.bind(this);
  if( [transitionName,stateName, targetStateName].some(function(entityName){return ['string','number'].indexOf(typeof entityName) === -1;}) ){
    throw new Error('states names and transitions names can only be of type string/number');
  }
  else if( stateName === targetStateName) throw new Error('state and target state cannot be the same');
  else if( !this.states[stateName] ) throw new Error('state ' + stateName + ' missing');
  else if( !this.states[targetStateName] ) throw new Error('state ' + targetStateName + ' missing');
  else if( !upsert && this.states[stateName][transitionName] ) throw new Error('transition ' + transitionName + ' already exists for state ' + stateName +'. please use set upsert = true');
  else this.states[stateName][transitionName] = function(){boundChangeState(targetStateName); return transitionCB();};
};

FSM.prototype.dispatchTransition = function(transitionName){
  if( ['string','number'].indexOf(typeof transitionName) === -1 ) throw new Error('transitions names can only be of type string/number');
  else if( this.states[this.state][transitionName] )  return Promise.resolve(this.states[this.state][transitionName]());
  else {
    console.log('transition ' + transitionName + ' missing for state ' + this.state);
    return Promise.resolve();
  }
};

module.exports = FSM;

