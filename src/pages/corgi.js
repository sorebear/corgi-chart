import React, { Component } from 'react'
import Link from 'gatsby-link'
import axios from 'axios';

class IndexPage extends Component {
   constructor(props) {
      super(props);
      this.API_KEY = '1b14081ee3e1b8bb4342a54211677fa8';
      this.state = {
         boards: []
      }
   }
   
   componentWillMount() {
      // Get Boards
      axios.get(
         `https://api.trello.com/1/members/me/boards?lists=all&cards=all&key=${this.API_KEY}&token=baa041a0f928484fec89ccb291f20efb2eacbe97faf18f15b17299ca98c096ea`
      ).then(response => {
         this.setState({ boards: response.data });
         console.log(response.data);
         response.data.map(board => {
            return axios.get(
               `https://api.trello.com/1/boards/${board.id}/lists?cards=all&key=${this.API_KEY}&token=baa041a0f928484fec89ccb291f20efb2eacbe97faf18f15b17299ca98c096ea`
            ).then(response => {
               console.log("Card Response: ", response);
            })
         })
      });
   }
   renderCards() {
      return this.state.boards.map(board => {
         return (
            <li key={board.name}>{board.name}</li>
         )
      });
   }
   render() {
      return (
         <div>
            <h1>Hi people</h1>
            <a href={`https://trello.com/1/authorize?expiration=1day&name=MyPersonalToken&scope=read&response_type=token&key=${this.API_KEY}`} target="_blank">Connect To Trello</a>
            <p>Welcome to your new Gatsby site.</p>
            <p>Now go build something great.</p>
            <ul>
               {this.renderCards()}
            </ul>
            <Link to="/page-2/">Go to page 2</Link>
         </div>
      )
   }
}

export default IndexPage;