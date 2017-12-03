import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../actions';
import 'materialize-css/dist/css/materialize.css';
import 'materialize-css/dist/js/materialize.js';
import $ from 'jquery';


class RealTimeMusicChart extends Component {
   render() {
      return (
         <div className="container">
            {this.renderLogo()}
            <div className="row valign-wrapper">
               {this.renderInput()}
               {this.renderDropdown()}
               {this.renderButton()}
            </div>
         </div>
      );
   }
   renderLogo() {
      return (
         <nav>
            <div className="nav-wrapper">
               <a href="#" className="brand-logo center">Real Time Music Chart</a>
               <ul id="nav-mobile" class="left hide-on-med-and-down">
               </ul>
            </div>
         </nav>
      )
   }

   renderInput() {
      return (
         <div className="input-field col s6">
          <input placeholder="Input" id="first_name" type="text" className="validate" />
        </div>
      );
   }

   renderDropdown() {
      this.initializeSelect();
      return (
         <div className="input-field col s4">
            <select>
               <option value="" disabled selected>View</option>
               <option value="1">All songs</option>
               <option value="2">A song</option>
               <option value="3">Songs with at least this many streams</option>
               <option value="3">Songs above this rank</option>
               <option value="3">Artists with this many songs in the top 200</option>
               <option value="3">All songs from an artist</option>
               <option value="3">All songs from artists</option>
               <option value="3">All artists</option>
               <option value="3">This many top artists ranked by playcount</option>
               <option value="3">All artists above this total playcount</option>
            </select>
         </div>
      );
   }

   renderButton() {
      return (
         <div className="col s2">
            <a className="waves-effect waves-light btn">Search</a>
         </div>
      );
   }

   initializeSelect() {
      $(document).ready(function() {
       $('select').material_select();
     });
   }
}



function mapStateToProps() {

}

export default connect(mapStateToProps, actions)(RealTimeMusicChart);
