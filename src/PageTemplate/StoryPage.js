import React from "react";
import "./StoryPage.css";
import { db } from "../config/Firebase";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import LazyLoad from 'react-lazy-load';
class StoryPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            question: {},
            stage: -1,
            loading: true,
            user: props.user
        };
    }
    saveUserProgress(uid, stage) {
        db.collection("users")
            .doc(uid)
            .get()
            .then(function (user) {
                if (user.exists) {
                    if (user.data().stages == null) {
                        return;
                    }
                    if (user.data().stages.indexOf(stage) === -1) {
                        db.collection("users")
                            .doc(uid)
                            .set({ uid: uid, stages: user.data().stages.concat(stage) });
                    }
                }
            });
    }
    componentDidMount() {
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
                    var stage = user.data().stages.slice(-1)[0];
                    upadatePage({
                        stage,
                        question: props.questions[stage],
                        loading: false
                    });
                } else {
                    user = { uid, stages: [0] };
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
        if (!this.state.loading) {
            this.saveUserProgress(this.state.user.uid, this.state.stage);
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
                                <p>{this.state.question.text}</p>
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
                                            <button
                                                className="button"
                                                onClick={() => {
                                                    this.setState({
                                                        question: this.props.questions[item.actionIndex],
                                                        stage: item.actionIndex
                                                    });
                                                }}
                                            >
                                                {item.text}
                                            </button>
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
                <div>
                    <p>loading</p>
                </div>
            );
        }
    }
}

export default StoryPage;
