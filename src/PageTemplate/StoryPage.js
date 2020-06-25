import React, { useState } from 'react';
import './StoryPage.css';
import { db ,saveUserProgress} from '../config/Firebase'
class StoryPage extends React.Component {
    constructor(props) {
        super(props)
        console.log(props)
        this.state = {
            question: props.questions[0],
            stage: 0,
            user: props.user
        }
    }
    saveUserProgress(uid,stage){
         db.collection('users')
        .doc(uid)
        .get().then(function (user) {
            if (user.exists) {
                if(user.data().stages == null) {
                    return
                }
                if(user.data().stages.indexOf(stage) === -1) {
                    db.collection('users')
                    .doc(uid)
                    .set({ uid: uid, stages : user.data().stages.concat(stage) })
                }               
            }
        }) 
    }
    componentDidMount() {
        var uid = this.state.user.uid
        const upadatePage = (state) => {
            this.setState(state)
        }
        const props  = this.props
        db.collection('users')
            .doc(uid)
            .get().then(function (user) {
                if (user.exists) {
                    var stage = user.data().stages.slice(-1)[0]
                    upadatePage({ stage, question: props.questions[stage] });
                } else {
                    user = { uid, stages: [0]}
                    db.collection('users')
                        .doc(user.uid)
                        .set(user)
                    upadatePage({ stage: 0, question: props.questions[0] });
                }
            }).catch(function (error) {
                console.log("Error getting document:", error);
            });
    }
    render() {
        this.saveUserProgress(this.state.user.uid,this.state.stage)
        return (
            <div className="StoryPage" >
                <div className="Question">
                    <p>{this.state.question.text}</p>
                </div>
                {
                    this.state.question.img ?
                        <img className="image" src={this.state.question.img} />
                        : <></>
                }
                <div className="options">
                    {
                        this.state.question.options.map((item) => {
                            return (
                                <div>
                                    <button className="button"
                                        onClick={() => { console.log("clicked"); this.setState({ question: this.props.questions[item.actionIndex],stage:item.actionIndex }) }}
                                    >
                                        {item.text}
                                    </button>
                                </div>
                            )
                        })
                    }
                </div>
            </div>
        );
    }

}

export default StoryPage;