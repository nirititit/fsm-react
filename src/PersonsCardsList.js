import React, { Component } from 'react';
import { connect } from 'react-redux';
import CardsList from './CardsList/CardsList';
import PersonCard from './Cards/PersonCard';

const mapStateToProps = state=>{
  return {
    persons:state.persons
  }
};


class PersonsCardsList extends Component{
  render(){
    return (<CardsList items={this.props.persons} itemCard={PersonCard}/>);
  }
}

export default connect(mapStateToProps)(PersonsCardsList);