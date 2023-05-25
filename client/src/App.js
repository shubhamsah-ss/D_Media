import { useEffect } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import PageRender from "./customRouter/PageRender";
// import PrivateRender from "./customRouter/PrivateRouter";
import Alert from "./components/alert/Alert";
import Header from "./components/header/Header";
import { useSelector, useDispatch } from 'react-redux';
import { refreshToken } from "./redux/actions/authAction";
import Login from './pages/login'
import Home from './pages/home';
import Register from './pages/register';
import StatusModal from './components/StatusModal';
import { getPosts } from './redux/actions/postAction'
import { getSuggestions } from './redux/actions/suggestionsAction'
import { getNotifies } from './redux/actions/notifyAction'
import io from 'socket.io-client'
import { GLOBALTYPES } from './redux/actions/globalTypes'
import SocketClient from './SocketClient'
import CallModal from './components/message/CallModal'
import Peer from 'peerjs'
function App() {
  const { auth, status, modal, call  } = useSelector(state => state)
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(refreshToken())

    const socket = io()
    dispatch({type: GLOBALTYPES.SOCKET, payload: socket})
    return () => socket.close()
  },[dispatch])

  useEffect(() => {
    if(auth.token) {
      dispatch(getPosts(auth.token))
      dispatch(getSuggestions(auth.token))
      dispatch(getNotifies(auth.token))
    }
  }, [dispatch, auth.token])

  useEffect(() => {
    if (!("Notification" in window)) {
      alert("This browser does not support desktop notification");
    }
    else if (Notification.permission === "granted") {}
    else if (Notification.permission !== "denied") {
      Notification.requestPermission().then(function (permission) {
        if (permission === "granted") {}
      });
    }
  },[])

  useEffect(() => {
    const newPeer = new Peer(undefined, {
      path: '/', secure: true
    })
    
    dispatch({ type: GLOBALTYPES.PEER, payload: newPeer })
  },[dispatch])


  const firstLogin = localStorage.getItem('firstLogin')

  return (
    <div>
      <Alert />
      
      <input type="checkbox" id="theme" />
      <div className={`App ${(status || modal) && 'mode'}`}>
          { auth.token && <Header /> }

        <div className="container main">
          
          { status && <StatusModal /> }
          {auth.token && <SocketClient />}
          {call && <CallModal />}
          <Routes>
            <Route exact={true} path="/" Component={auth.token ? Home : Login} />          
            <Route exact={true} path="/register" Component={Register} />
            <Route>
              {
                firstLogin ? <>
                  <Route exact={true} path="/:page" Component={PageRender} />
                  <Route exact={true} path="/:page/:id" Component={PageRender} />
                </> :
                <Route exact={true} path="*" element={ <Navigate to={"/"} /> } />
              }
            </Route>
          
          </Routes>
            {/* <PrivateRender exact={true} path="/:page" Component={PageRender} />
            <PrivateRender exact={true} path="/:page/:id" Component={PageRender} /> */}

        </div>
      </div>
    </div>
  );
}

export default App;
