import React, { Component } from 'react';
import { connect } from 'react-redux';
import { search } from '../actions';
import { bindActionCreators } from 'redux';
import { Container, Row, Input, Navbar, Button } from 'react-materialize';
import 'materialize-css/dist/css/materialize.css';
import 'materialize-css/dist/js/materialize.js';

import * as actions from '../actions';


class RealTimeMusicChart extends Component {
   constructor(props) {
      super(props);
      this.handleInputChange = this.handleInputChange.bind(this);
      this.handleSubmit = this.handleSubmit.bind(this);
      this.handleSelectChange = this.handleSelectChange.bind(this);

      this.state = { input: '', view: ''};
   }

   render() {
      return (
         <Container>
            {this.renderLogo()}
            <Row className='valign-wrapper'>
               {this.renderInput()}
               {this.renderDropdown()}
               {this.renderButton()}
            </Row>
         </Container>
      );
   }

   renderLogo() {
      return (
         <Navbar><a className="brand-logo center">Real Time Music Chart</a></Navbar>
      );
   }

   renderInput() {
      return (
         <Input placeholder='Input' s={6} value={this.state.input} onChange={this.handleInputChange}/>
      );
   }

   renderDropdown() {
      return (
         <Input s={4} type='select' defaultValue='2' onChange={this.handleSelectChange} >
            <option value='1'>Option 1</option>
      		<option value='2'>Option 2</option>
      		<option value='3'>Option 3</option>
	     </Input>
      );
   }

   renderButton() {
      return (
         <Button waves='light' onClick={this.handleSubmit} s={2} >Search</Button>
      );
   }

   handleSelectChange(event) {
      console.log('view');
      this.setState({view: event.target.value})
   }

   handleInputChange(event) {
      this.setState({input: event.target.value})
   }

   handleSubmit(event) {
      const { input, view } = this.state;
      this.props.search(input, view);
      this.setState = { input: '', view: ''}
   }

}


function mapStateToProps() {
   return {};
}

function mapDispatchToProps(dispatch) {
   return bindActionCreators({ search }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(RealTimeMusicChart);
