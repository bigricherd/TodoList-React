import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Nav from './components/Nav';
import HomePage from './components/HomePage';
import Register from './components/Register';
import Login from './components/Login';
import NotFound from './components/NotFound';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useState, useEffect, useCallback } from 'react';

function App() {
  const [message, setMessage] = useState(null);
  const [user, setUser] = useState(null);
  const [isFetching, setIsFetching] = useState(false);
  const [url, setUrl] = useState(`/api/users/getUser`);

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

  const debugText = <div>
    <p>{'« '}<strong>
      {isFetching
        ? 'Fetching user '
        : message}
    </strong>{' »'}
    </p>
    {process.env.NODE_ENV === 'production' ?
      <p>
        This is a production build.
      </p>
      : <p>
        You're not on PROD.
      </p>
    }</div>;

  return (
    <Router>
      <div className="App">
        <header className="App-header">
          <Nav user={user} />
          <Routes>
            <Route exact path='/' element={<HomePage user={user} />} />
            <Route exact path='/register' element={<Register />} />
            <Route exact path='/login' element={<Login />} />
            <Route path='*' element={<NotFound />} />
          </Routes>
        </header>
      </div>
    </Router>
  );
}

export default App;
