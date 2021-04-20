
import React, { Component } from 'react';
import ReactDOM from 'react-dom';

import './index.scss';

import App from './component/App';

import error404 from "./component/error404";
import HttpsRedirect from 'react-https-redirect'

import { BrowserRouter, Switch, Route  } from 'react-router-dom';
import * as serviceWorker from './serviceWorker';


class Root extends Component{
    render(){
        return(
            <HttpsRedirect>
            <BrowserRouter basename={'/'}>
                <Switch>
                    <Route exact path={`${process.env.PUBLIC_URL}/`} component={App}/>
                    
                    <Route path={`${process.env.PUBLIC_URL}/404`} component={error404}/>
                    <Route component={error404}/>

                </Switch>
            </BrowserRouter>
            </HttpsRedirect>
        )
    }
}

ReactDOM.render(<Root/>, document.getElementById('root'));
serviceWorker.register();