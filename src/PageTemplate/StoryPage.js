import React from "react";
import "./StoryPage.css";
import { db } from "../config/Firebase";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import SplashScreen from '../config/components/SplashScreen/SplashScreen';
import LazyLoad from 'react-lazy-load';
import  { Redirect } from 'react-router-dom'
class StoryPage extends React.Component {
    constructor(props) {
        super(props);
        console.log(props)
        console.log("From StoryPAger comp")
        this.state = {
            question: {},
            stage: -1,
            loading: true,
            user: props.user
        };
        this.saveUserProgress = this.saveUserProgress.bind(this)
    }
    saveUserProgress(uid, stage, gameName) {
        db.collection("users")
            .doc(uid)
            .get()
            .then(function (user) {
                if (user.exists) {
                    if (user.data().games.filter((item) => { return item.name === gameName }) == null) {
                        return;
                    }
                    var games = user.data().games;
                    var progress = games.filter((item) => { return item.name === gameName })[0].progress
                    if (progress.indexOf(stage) === -1) {
                        var otherGames = games.filter((item) => { return item.name !== gameName })
                        var updatedGameProgress = otherGames.concat({ name: gameName, progress: progress.concat(stage) });
                        db.collection("users")
                            .doc(uid)
                            .set({ uid, games: updatedGameProgress });
                    }
                }
            });
    }
    componentDidMount() {
        if(!this.state.user) {
            return
        }
        var uid = this.state.user.uid;
        const upadatePage = state => {
            this.setState(state);
        };
        const props = this.props;
        db.collection("users")
            .doc(uid)
            .get()
            .then(function (user) {
                if (user.exists) {
                    var games = user.data().games;
                    if (games.filter((item) => { return item.name == props.gameName }).length === 0) {
                        var stage = 0
                        var updatedGameProgress = games.concat({ name: props.gameName, progress: [0] });
                        var newUser = { uid, games: updatedGameProgress };
                        db.collection("users")
                            .doc(uid)
                            .set(newUser);
                    } else {
                        var stage = games.filter((item) => { return item.name == props.gameName })[0].progress.slice(-1)[0]
                    }

                    upadatePage({
                        stage,
                        question: props.questions[stage],
                        loading: false
                    });
                } else {
                    var user = { uid, games: [{ name: props.gameName, progress: [0] }] };
                    db.collection("users")
                        .doc(user.uid)
                        .set(user);
                    upadatePage({
                        stage: 0,
                        question: props.questions[0],
                        loading: false
                    });
                }
            })
            .catch(function (error) {
                console.log("Error getting document:", error);
            });
    }
    render() {
        if(!this.state.user) {
            return <Redirect to='/home'  />
        }
        if (!this.state.loading) {
            this.saveUserProgress(this.state.user.uid, this.state.stage, this.props.gameName);
            return (
                <TransitionGroup>
                    <CSSTransition
                        in={true}
                        key={this.state.stage}
                        timeout={2000}
                        classNames="fade"
                    >
                        <div id={"stage" + this.state.stage} className="StoryPage">
                            <div className="Question">
                                <p>{
                                    this.state.question.textHighlight ?
                                        <div className={"effect-" + this.state.question.textHighlight}>{this.state.question.text}</div>
                                        :
                                        this.state.question.text}</p>
                            </div>
                            {this.state.question.img ? (
                                <LazyLoad
                                    debounce={false}
                                    offsetVertical={500}
                                >
                                    <img className="image" src={this.state.question.img} />
                                </LazyLoad>
                            ) : (
                                    <></>
                                )}
                            <div className="options">
                                {this.state.question.options.map(item => {
                                    return (
                                        <div>
                                            <div className="neon-button"
                                                onClick={() => {
                                                    this.setState({
                                                        question: this.props.questions[item.actionIndex],
                                                        stage: item.actionIndex
                                                    });
                                                }}
                                            >
                                                {item.text}
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                    </CSSTransition>
                </TransitionGroup>

            );
        } else {
            return (
                <SplashScreen />
            );
        }
    }
}

export default StoryPage;
