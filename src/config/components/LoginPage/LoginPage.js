import React from 'react';
import './LoginPage.css';
import { Google } from  '@styled-icons/evaicons-solid/Google'
class LoginPage extends React.Component {
    constructor(props) {
        super(props);
        console.log(props)
        console.log("From StoryPAger comp")
        this.state = {
            gameDetails: props.gameDetails
        };
    }
    render() {
        return (
            <div className="login-container">
                <div className="google-button">
                    <div className="google-icon">
                        <Google size="32"/>
                    </div>
                    <div className="google-text">
                    Sign In with Google
                    </div>
                
                    </div>
            </div>
        );
    }

}

export default LoginPage;