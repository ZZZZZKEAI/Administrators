import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import * as serviceWorker from './serviceWorker';
import HomePage from './HomePage/homepage'
import MenuPage from './Menu/menu'
import {BrowserRouter,Route,Switch,Redirect} from 'react-router-dom'
import Xiaoshuojm from './Menu/xiaoshuojm/xiaoshuojm';
import Kan from './Menu/kan/kan';
import Noveldetails from './Noveldetails/noveldetails';

class IndexPage extends React.Component{
    render(){

        return(
            <div>
               <BrowserRouter>
               <Switch>
                   <Route path="/homepage" component={HomePage}></Route>
                   <Route path="/menu" component={MenuPage}></Route>
                   <Route path="/xiaoshuodetails" component={Noveldetails}></Route>
                   <Route path="/xiaoshuojm" component={Xiaoshuojm}></Route>
                   <Route path="/kan" component={Kan}></Route>
                   <Redirect to="/homepage"></Redirect>
               </Switch>
               </BrowserRouter>
            </div>
        )
    }
}
ReactDOM.render(<IndexPage />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
