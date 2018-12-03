import React,{Component} from 'react';
import {Toolbar, ToolbarGroup, ToolbarSeparator, ToolbarTitle} from 'material-ui/Toolbar';
import { connect } from 'react-redux';

import './header.css'

const mapStateToProps = state=>{
  return {
    user:state.user
  }
};

class Header extends Component{
  render(){
    return(
      <Toolbar id="header">
        <ToolbarGroup firstChild={true}>
          <ToolbarTitle text={`Hello ${this.props.user}`} />
        </ToolbarGroup>
      </Toolbar>
    );
  }
}

export default connect(mapStateToProps)(Header);
