import { combineReducers } from 'redux';
import {SET_USER,SET_PERSONS} from './actions';

export function user(state = '', action){
  switch(action.type){
    case SET_USER:
      return action.username || state;
    default:
      return state;
  }
}

export function persons(state = [{id:0,name:'default',pendingPayments:0}], action){
  switch(action.type){
    case SET_PERSONS:
      console.log('SET_PERSONS',action);
      return action.persons?action.persons:state;
    default:
      return state;
  }
}

export default combineReducers({user, persons});
