import React,{Component} from 'react';
import propTypes from 'prop-types';
import FlatButton from 'material-ui/FlatButton';

import {CardsListContext} from '../lib/contexts';

import FSM from 'fsm';
import './cards-list.css';

export default class CardsList extends Component{

  constructor(props){
    super(props);

    this.selectModeManager = new FSM.fsm('single','multi');

    this.selectModeManager.addTransition('click',()=>{this.setState({selectMode:'multi'}); },'single','multi');
    this.selectModeManager.addTransition('click',()=>{this.setState({selectMode:'single'}); },'multi','single');

    this.state = {
      selectMode:'single'
    };
  }

  static propTypes = {
    items: propTypes.arrayOf(propTypes.object).isRequired,
    itemCard:propTypes.any.isRequired
  };

  static defaultProps = {
  };

  click = (selectIds) => {
    selectIds({});
    this.selectModeManager.dispatchTransition('click');
  };

  cardClick = (selectedItem,selectedIds,selectIds) => {
    if(selectedIds[selectedItem.id]) delete selectedIds[selectedItem.id];
    else if(this.state.selectMode === 'single') selectedIds = {[selectedItem.id]:selectedItem};
    else selectedIds[selectedItem.id] = selectedItem;
    selectIds(selectedIds);
  };

  clearSelections = () => {
    this.props.selectIds({});
  };

  render(){
    return(
      <CardsListContext.Consumer>
      {({selectedIds,selectIds})=>(
    <div className="cards-list">
      <div className="cards-list-header">
      <span>Select mode:</span>
    <FlatButton label={this.state.selectMode} primary={ false } onClick={ this.click.bind(this,selectIds) }/>
  </div>


    <div>
    {this.props.items.map(item=><div key={item.id}
    onClick={this.cardClick.bind(this,item,selectedIds,selectIds)}
    className={`item-card ${selectedIds[item.id]? 'selected':''}`}>
    {React.createElement(this.props.itemCard,{...item})}
  </div>)}
  </div>

    </div>
  )}
  </CardsListContext.Consumer>
  );
  }
}

