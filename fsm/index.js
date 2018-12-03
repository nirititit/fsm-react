'use strict';

var fsm = require('./lib/fsm');

function clickFSM(clickCb,resetCb){
  var _clickFSM = new fsm('idle','clicked');
  _clickFSM.addTransition('click',clickCb,'idle','clicked');
  _clickFSM.addTransition('reset',resetCb,'clicked','idle');
  return _clickFSM;
}

module.exports = {fsm:fsm,clickFSM:clickFSM};
