import React from "react";
import "./LandingPage.css";
import {
    Link
} from "react-router-dom";
import conf from '../questions.json'
import StoryCard from "../config/components/StoryCard/StoryCard";
import { db } from "../config/Firebase";

const BleedOutCard = (props) => (
    <div className="for-shadow">
        <div className="card-bottom">
            <StoryCard gameDetails={props.item}></StoryCard>
        </div>
        <div className="card-top">
            <StoryCard gameDetails={props.item}></StoryCard>
        </div>
    </div>
);


 class LandingPage extends React.Component {
   constructor(props) {
       super(props)
       this.state= {
           playedGames:[],
           newGames:conf.contests
       }
   }
   componentDidMount() {
       var me  =this
    db.collection("users")
    .doc(this.props.user.uid)
    .get()
    .then(function (user) {
        if (user.exists) {
           var gameNames = user.data().games.map((item)=>{return item.name}) 
           var playedGames = conf.contests.filter((item) =>{
               return gameNames.includes(item.gameName)
           })
           var newGames = conf.contests.filter((item) =>{
            return !gameNames.includes(item.gameName)
        })
           me.setState({playedGames,newGames})
        } else {
            me.setState({playedGames:[],newGames:conf.contests});
        }
      })
   }
   render() {
    var contests = conf.contests
    console.log(this.props.user)
    return (
        <div className="main-content" >
            <div className="head-section">
                <div>
                    {
                        "Hello " + this.props.user.displayName
                    }
                </div>

            </div>
            <div className="game-carousels">
                <div className="favourite-game-section">
                    {
                        this.state.newGames.length>0?
                        <div className="game-section" >
                            <p>Start new adventure</p>
                            <div style={{ flexDirection: 'row', display: 'flex', overflow: 'scroll', flex: 1 }}>
                                {this.state.newGames.map((item, index) => {
                                    return (
                                        <Link className='Link' to={"/games/" + item.gameName}>
                                            <BleedOutCard item={item}/>
                                        </Link>
                                    )
                                })
                                }</div>
                        </div>
                        :<></>
                    }
                    {
                        this.state.playedGames.length>0?
                        <div className="game-section" >
                            <p>Continue adventure</p>
                            <div style={{ flexDirection: 'row', display: 'flex', overflow: 'scroll', flex: 1 }}>
                                {this.state.playedGames.map((item, index) => {
                                    return (
                                        <Link className='Link' to={"/games/" + item.gameName}>
                                            <BleedOutCard item={item}/>
                                        </Link>
                                    )
                                })
                                }</div>
                        </div>
                        :<></>
                        
                    }
                </div>
                <div className="all-games-list">
                    {contests.map((item, index) => {
                        console.log(item.gameName)
                        return (
                            <Link to={"/games/" + item.gameName}>
                                <div className="for-shadow">
                                    <div className="card-bottom">
                                        <StoryCard gameDetails={item}></StoryCard>
                                    </div>
                                    <div className="card-top">
                                        <StoryCard gameDetails={item}></StoryCard>
                                    </div>
                                </div>
                            </Link>
                        )
                    })
                    }
                </div>
            </div>
        </div>
    );
   }
    
}
export default LandingPage;
// You can think of these components as "pages"
// in your app.

