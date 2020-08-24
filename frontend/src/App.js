import React, {Component} from 'react';
import './App.css';
import {BrowserRouter, Route, Redirect, Switch} from "react-router-dom";

import AuthPage from "./pages/Auth";
import Bookings from "./pages/Bookings";
import Events from "./pages/Events";
import Navbar from "./components/Navigation/Navigation";
import AuthContext from './context/auth-context'

class App extends Component {
    state = {
        token: null,
        userId: null
    };

    login = (token, userId, tokenExpiration) => {
        this.setState({token:token,userId:userId,tokenExpiration:tokenExpiration});

    }

    logout = () => {
        this.setState({token:null,userId:null});
    }

    render() {
        return (
            <BrowserRouter>

                <React.Fragment>
                    <AuthContext.Provider value={{
                        token: this.state.token,
                        userId: this.state.userId,
                        login:this.login,
                        logout:this.logout,

                        }}>
                        <Navbar/>
                        <main>
                            <Switch>


                                {this.state.token && <Redirect from="/" to="/events" exact />}
                                {this.state.token && <Redirect from="/auth" to="/events" exact />}
                                {!this.state.token && (
                                    <Route path="/auth" component={AuthPage} />
                                )}
                                <Route path="/events" component={Events} />
                                {this.state.token && (
                                    <Route path="/bookings" component={Bookings} />
                                )}
                                {!this.state.token && <Redirect to="/auth" exact />}
                            </Switch>
                        </main>
                    </AuthContext.Provider>
                </React.Fragment>
            </BrowserRouter>
        );
    }


}

export default App;
