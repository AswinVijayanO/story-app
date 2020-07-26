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
        this.state = {
            playedGames: [],
            favourites: [],
            newGames: conf.contests
        }
        this.addToFav = this.addToFav.bind(this)
        this.syncStates = this.syncStates.bind(this)
        this.removeFromFav = this.removeFromFav.bind(this)
    }
    componentDidMount() {
        this.syncStates()
    }
    syncStates(){
        var me = this
        db.collection("users")
        .doc(this.props.user.uid)
        .get()
        .then(function (user) {
            if (user.exists) {
                var gameNames = user.data().games.map((item) => { return item.name })
                var favGames = user.data().favs
                var playedGames = conf.contests.filter((item) => {
                    return gameNames.includes(item.gameName)
                })
                var newGames = conf.contests.filter((item) => {
                    return !gameNames.includes(item.gameName)
                })
                var favourites = []
                if (favGames) {
                    favourites = conf.contests.filter((item) => {
                        return favGames.includes(item.gameName)
                    })
                }

                me.setState({ playedGames, newGames, favourites })
            } else {
                me.setState({ playedGames: [], newGames: conf.contests, favourites: [] });
            }
        })
    }
    addToFav(gameName) {
        var userRef = db.collection("users").doc(this.props.user.uid);
        var me = this;
        userRef.get().then(function (user) {
            if (user.exists) {
                user = user.data();
                if (!user.favs) {
                    user.favs = [gameName]
                } else {
                    if (user.favs.includes(gameName)) {
                        return;
                    }
                    user.favs = user.favs.concat(gameName)
                }
                userRef.set({ ...user })
                me.syncStates()
            }
        });
    }
    removeFromFav(gameName) {
        var me = this;
        var userRef = db.collection("users").doc(this.props.user.uid);
        userRef.get().then(function (user) {
            if (user.exists) {
                user = user.data();
                if (!user.favs) {
                    return
                } else {
                    if (user.favs.includes(gameName)) {
                        user.favs = user.favs.filter((item) => {
                            return item !== gameName
                        })
                        userRef.set({ ...user });
                        me.syncStates()
                    }
                }
            }

        });
    }
    render() {
        var contests = conf.contests
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
                            this.state.newGames.length > 0 ?
                                <div className="game-section" >
                                    <p>Start new adventure</p>
                                    <div style={{ flexDirection: 'row', display: 'flex', overflow: 'scroll', flex: 1 }}>
                                        {this.state.newGames.map((item, index) => {
                                            return (

                                                <Link onClick={() => { this.addToFav(item.gameName) }} className='Link' to={"/games/" + item.gameName}>
                                                    <BleedOutCard item={item} />
                                                </Link>

                                            )
                                        })
                                        }</div>
                                </div>
                                : <></>
                        }
                        {
                            this.state.playedGames.length > 0 ?
                                <div className="game-section" >
                                    <p>Continue adventure</p>
                                    <div style={{ flexDirection: 'row', display: 'flex', overflow: 'scroll', flex: 1 }}>
                                        {this.state.playedGames.map((item, index) => {
                                            return (
                                                <div>
                                                    <Link className='Link' to={"/games/" + item.gameName}>
                                                        <BleedOutCard item={item} />
                                                    </Link>
                                                    <p onClick={() => this.addToFav(item.gameName)} > favourite</p>
                                                </div>
                                            )
                                        })
                                        }</div>
                                </div>
                                : <></>

                        }
                        {
                            this.state.favourites.length > 0 ?
                                <div className="game-section" >
                                    <p>Favourite adventures</p>
                                    <div style={{ flexDirection: 'row', display: 'flex', overflow: 'scroll', flex: 1 }}>
                                        {this.state.favourites.map((item, index) => {
                                            return (
                                                <div>
                                                    <Link className='Link' to={"/games/" + item.gameName}>
                                                        <BleedOutCard item={item} />
                                                    </Link>
                                                    <p onClick={() => this.removeFromFav(item.gameName)} >  Remove from favourite</p>
                                                </div>
                                            )
                                        })
                                        }</div>
                                </div>
                                : <></>

                        }
                    </div>
                    <div className="all-games-list">
                        {contests.map((item, index) => {
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

