import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Nav from './components/Nav';
import HomePage from './components/HomePage';
import CompletedPage from './components/CompletedPage';
import Register from './components/Register';
import Login from './components/Login';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useState, useEffect, useCallback } from 'react';

function App() {
  // useEffect(() => {
  //   getUser();
  // }, []);

  // const [user, setUser] = useState(null);

  // const getUser = async () => {
  //   fetch(`${baseUrl}/api/users/getUser`).then(res => {
  //     console.log(res);
  //   })
  //   const data = await fetch(`${baseUrl}/api/users/getUser`);
  //   const currentUser = await data.json();
  //   console.log(currentUser);
  //   if (user !== currentUser) {
  //     setUser(currentUser);
  //   }
  // }

  const homeUrl = process.env.HOMEPAGE_URL || 'http://localhost:4000';
  const baseUrl = process.env.NODE_ENV === 'production' ? homeUrl : '';

  const [message, setMessage] = useState(null);
  const [user, setUser] = useState(null);
  const [isFetching, setIsFetching] = useState(false);
  const [url, setUrl] = useState(`${baseUrl}/api/users/getUser`);

  const fetchData = useCallback(async () => {

    const response = await fetch(url, { credentials: "include" });
    if (!response.ok) {
      throw new Error(`status ${response.status}`);
    }
    try {
      const json = await response.json();
      setMessage(json.message);
      setUser(json.user);
      setIsFetching(false);
    } catch (e) {
      setMessage(`API call failed: ${e}`);
      setIsFetching(false);
    }

  }, [url]);

  useEffect(() => {
    setIsFetching(true);
    fetchData();
  }, [fetchData]);

  return (
    <Router>
      <div className="App">
        <header className="App-header">
          <Nav user={user} />
          <p>{'« '}<strong>
            {isFetching
              ? 'Fetching message from API'
              : message}
          </strong>{' »'}</p>
          {process.env.NODE_ENV === 'production' ?
            <p>
              This is a production build.
            </p>
            : <p>
              You're not on PROD.
            </p>
          }
          <Routes>
            <Route exact path='/' element={<HomePage user={user} />} />
            <Route exact path='/completedTasks' element={<CompletedPage user={user} />} />
            <Route exact path='/register' element={<Register />} />
            <Route exact path='/login' element={<Login />} />
          </Routes>
        </header>
      </div>
    </Router>
  );
}

export default App;
