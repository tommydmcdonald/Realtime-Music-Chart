import React, { Component } from 'react';
import { connect } from 'react-redux';
import { search } from '../actions';
import { bindActionCreators } from 'redux';
import { Container, Row, Input, Navbar, Button, Table } from 'react-materialize';
import 'materialize-css/dist/css/materialize.css';
import 'materialize-css/dist/js/materialize.js';

import * as actions from '../actions';


class RealTimeMusicChart extends Component {
   constructor(props) {
      super(props);
      this.handleInputChange = this.handleInputChange.bind(this);
      this.handleSubmit = this.handleSubmit.bind(this);
      this.handleSelectChange = this.handleSelectChange.bind(this);
      this.handleEnterOnInput = this.handleEnterOnInput.bind(this);

      this.state = { input: '', view: 'all_songs'};
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
            {this.renderData()}
         </Container>
      );
   }

   renderData() {
      const songViews = ['all_songs', 'song', 'songs_streams', 'songs_rank', 'songs_artist', 'songs_artists'];
      const artistViews = ['artists_songs_top200', 'artists', 'artists_rank', 'artists_streams'];

      if ( songViews.includes(this.state.view) ) {
         return (this.renderSongs());
      }
      else if ( artistViews.includes(this.state.view) ) {
         return (this.renderArtists());
      }
      else {
         return <div></div>;
      }
   }

   renderSongs() {
      return(
         <Table>
            <thead>
               <tr>
                  <th data-field="id">Rank</th>
                  <th data-field="name">Song</th>
                  <th data-field="price">Artist</th>
               </tr>
            </thead>
            <tbody>
                  {this.props.data.map(this.renderSong)}
            </tbody>
         </Table>
      );
   }

   renderSong(song) {
      return (
         <tr>
            <td>{song.rank}</td>
            <td>{song.song_name}</td>
            <td>{song.artist_name}</td>
         </tr>
      );
   }

   renderArtists() {
      return (
         <Table>
            <thead>
               <tr>
                  <th data-field="id">Artist</th>
                  <th data-field="name">Count</th>
               </tr>
            </thead>
            <tbody>
                  {this.props.data.map(this.renderArtist)}
            </tbody>
         </Table>
      );
   }

   renderArtist(artist) {
      return (
         <tr>
            <td>{artist.artist}</td>
            <td>{artist.count}</td>
         </tr>
      );
   }

   renderLogo() {
      return (
         <Navbar><a className="brand-logo center">Real Time Music Chart</a></Navbar>
      );
   }

   renderInput() {
      return (
         <Input placeholder='Input' s={6} value={this.state.input} onChange={this.handleInputChange} onKeyPress={this.handleEnterOnInput}/>
      );
   }

   renderDropdown() {
      return (
         <Input s={4} type='select' onChange={this.handleSelectChange}>
            <option value='all_songs'>All songs</option>
            <option value='song'>A song</option>
            <option value='songs_streams'>Songs with at least this many streams</option>
            <option value='songs_rank'>Songs above this rank Options: higher, higher_eq, eq, lower, lower_eq</option>
            <option value='artists_songs_top200'>Artists with this many songs in the top 200</option>
            <option value='songs_artist'>All songs from an artist</option>
            <option value='songs_artists'>All songs from artists</option>
            <option value='artists'>All artists</option>
            <option value='artists_rank'>This many top artists ranked by playcount</option>
            <option value='artists_streams'>All artists above this total playcount</option>
	     </Input>
      );
   }

   renderButton() {
      return (
         <Button waves='light' onClick={this.handleSubmit} s={2}>Search</Button>
      );
   }

   handleSelectChange(event) {
      this.setState({view: event.target.value})
   }

   handleInputChange(event) {
      event.preventDefault();
      this.setState({input: event.target.value})
   }

   handleSubmit(event) {
      console.log('submit');
      const { input, view } = this.state;
      this.props.search(input, view);
      this.setState({ input: '' });
   }

   handleEnterOnInput(event) {
      if (event.key === 'Enter') {
         this.handleSubmit();
      }
   }

}


function mapStateToProps({data}) {
   return { data };
}

function mapDispatchToProps(dispatch) {
   return bindActionCreators({ search }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(RealTimeMusicChart);
