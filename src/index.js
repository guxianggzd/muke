import React from 'react'
import ReactDOM from 'react-dom'
import { createStore, applyMiddleware, compose } from 'redux';

import thunk from 'redux-thunk'
import { Provider } from 'react-redux'
import { BrowserRouter, Route,Switch } from 'react-router-dom'

import './index.css'
import Login from './container/login/login'
import Register from './container/register/register'
import AuthRoute from './component/authroute/authroute'
import BossInfo from './container/bossinfo/bossinfo'
import GeniusInfo from './container/geniusinfo/geniusinfo'
import Dashboard from './component/dashboard/dashboard'
import Chat from './component/chat/chat'

import reducers from './reducer'
import './config'


const composeEnhancers =
  typeof window === 'object' &&
  window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ ?   
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({
    }) : compose;

const enhancer = composeEnhancers(
	applyMiddleware(thunk),
);
	const store = createStore(reducers, enhancer);
		
// boss genius me msg 4个页面
ReactDOM.render(
	(<Provider store={store}>
		<BrowserRouter>
			<div>
				  <AuthRoute></AuthRoute>
					<Switch>
						<Route path='/geniusinfo' component={GeniusInfo}></Route>
						<Route path='/bossinfo' component={BossInfo}></Route>
						<Route path='/login' component={Login}></Route>
						<Route path='/register' component={Register}></Route>
						<Route path='/chat/:user' component={Chat}></Route>
						{/* 如果以上页面都没有找到，switch将会渲染以下组件 */}
						<Route component={Dashboard}></Route>
					</Switch>
			</div>
		</BrowserRouter>
	</Provider>),
	document.getElementById('root')
)

