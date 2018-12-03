import React,{Component} from 'react';
import propTypes from 'prop-types';

import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card';
import FlatButton from 'material-ui/FlatButton';

import requests from '../lib/requests';

import './info-card.css';

export default class InfoCard extends Component{

  static propTypes = {
    name: propTypes.any.isRequired,
    id:propTypes.any.isRequired,
    pendingPayments:propTypes.any.isRequired
  };

  constructor( props ){
    super(props);
    this.state = {
      processing:false
    };
  }

  onClick =  () => {
    this.setState({ processing:true });
    requests.post('/acceptMoney',JSON.stringify(this.props)).then(xhr=>{
      this.setState({ clicksCounter:JSON.parse(xhr).clicksCounter });
      this.setState({ processing:false });
    });
  };

  render(){
    return(
      <div className="info-card">
        <Card >
          <CardTitle title={this.props.name} subtitle={`${this.props.pendingPayments}$`}/>
          <CardActions>
            <FlatButton label={ `${this.state.processing?'Accepting':'Accept'} Money` } disabled={ this.state.processing } primary={ true } onClick={ this.onClick }/>
            <FlatButton label='Evil Click'  primary={ false } onClick={ this.onClick }/>
          </CardActions>
        </Card>
      </div>
    );
  }
}
