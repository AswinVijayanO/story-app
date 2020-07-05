import React from "react";
import "./StoryPage.css";
import { db } from "../config/Firebase";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import SplashScreen from '../config/components/SplashScreen/SplashScreen';
import LazyLoad from 'react-lazy-load';
import { Redirect } from 'react-router-dom'
class StoryPage extends React.Component {
    constructor(props) {
        super(props);
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
    getPersonalisedQuestion(question, user) {
        var newQuestion = question;
        newQuestion.text = question.text.split("$$NAME$$").join(user.displayName)
        return newQuestion;
    }
    componentDidMount() {
        if (!this.state.user) {
            return
        }
        var uid = this.state.user.uid;
        console.log(uid)
        const upadatePage = state => {
            this.setState(state);
        };
        var me = this
        const props = this.props;
        var persolnalisedQ = ""
        db.collection("users")
            .doc(uid)
            .get()
            .then(function (user) {
                if (user.exists) {
                    var games = user.data().games;
                    if (games.filter((item) => { return item.name === props.gameName }).length === 0) {
                        console.log("New to this game")
                        var stage = 0
                        var updatedGameProgress = games.concat({ name: props.gameName, progress: [0] });
                        var newUser = { uid, games: updatedGameProgress };
                        db.collection("users")
                            .doc(uid)
                            .set(newUser);
                    } else {
                        console.log("Existing user")
                        stage = games.filter((item) => { return item.name === props.gameName })[0].progress.slice(-1)[0]
                    }
                    persolnalisedQ = this.getPersonalisedQuestion(props.questions[stage], user)
                    stage = stage >= 0 ? stage : 0
                    console.log("QUEST?" + persolnalisedQ)
                    upadatePage({
                        stage,
                        question: persolnalisedQ,
                        loading: false
                    });
                } else {
                    console.log("New to game")
                    var updatedUser = { uid, games: [{ name: props.gameName, progress: [0] }] };
                    db.collection("users")
                        .doc(user.uid)
                        .set(updatedUser);

                    persolnalisedQ = this.getPersonalisedQuestion(props.questions[0], user)
                    console.log("QUEST?" + persolnalisedQ)
                    upadatePage({
                        stage: 0,
                        question: persolnalisedQ,
                        loading: false
                    });
                }
            })
            .catch(function (error) {
                console.log("New user")
                var updatedUser = { uid, games: [{ name: props.gameName, progress: [0] }] };
                db.collection("users")
                    .doc(uid)
                    .set(updatedUser);

                persolnalisedQ = me.getPersonalisedQuestion(props.questions[0], me.state.user)
                console.log("QUEST?" + persolnalisedQ)
                upadatePage({
                    stage: 0,
                    question: persolnalisedQ,
                    loading: false
                });
            });
    }
    render() {
        if (!this.state.user) {
            return <Redirect to='/' />
        }
        var x = document.getElementById("audio");
        x.autoplay = true;
        x.load();
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
                                {this.state.question.options.map((item, index) => {
                                    return (
                                        <div>
                                            <div className="neon-button"
                                                onClick={() => {
                                                    this.setState({
                                                        question: this.getPersonalisedQuestion(this.props.questions[item.actionIndex], this.state.user),
                                                        stage: item.actionIndex
                                                    });
                                                }}
                                            >
                                                {item.text}
                                            </div>
                                            {
                                                this.state.question.options.length - 1 === index ?
                                                    <div></div> :
                                                    <div className="line-seperator">
                                                    </div>
                                            }

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
