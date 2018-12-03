import React,{Component} from 'react';
import propTypes from 'prop-types';
import './person-card.css';
export default class PersonCard extends Component{
  static propTypes = {
    id:propTypes.any.isRequired,
    name:propTypes.string.isRequired,
    pendingPayments: propTypes.any.isRequired
  };

  render(){
    return(
      <div className="person-card">
        <div className="header">
          <span className="name">{this.props.name}</span>
        </div>
        <div className="payment">
          <span className="payment-value">{this.props.pendingPayments}$</span>
          <span>pending</span>
        </div>
      </div>
    );
  }
}
