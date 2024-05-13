import { useState, useContext } from 'react';
import './Login.css';
import { Link } from 'react-router-dom';
import { AuthContext } from '../../context/auth-context';
import ModalMessageErreur from '../UIElements/ModalMessageErreur';
import Spinner from '../UIElements/LoadingSpinner';
import { useHttpClient } from '../../hooks/http-hook';

export default function Login() {
  const auth = useContext(AuthContext);

  const { isLoading, error, sendRequest, clearError } = useHttpClient();
  const [entredValues, setEntredValues] = useState({
    email: '',
    password: '',
  });

  const handleInputChange = (identifier, value) => {
    setEntredValues((prevValue) => ({
      ...prevValue,
      [identifier]: value, // on ajout [] pour acceder a la valeur de la propriete stored in a variable (js syntaxe)
    }));
  };

  const authSubmitHandler = async (event) => {
    event.preventDefault();
    try {
      const response = await sendRequest(
        'http://localhost:5000/api/users/login',
        'POST',
        JSON.stringify(entredValues),
        {
          'Content-Type': 'application/json', //pour que le bodyParser sache comment faire le parse
        }
      );
      auth.login(response.userId, response.token);
    } catch (err) {
      console.error(err);
    }
  };
  return (
    <>
      <div>
        {isLoading && <Spinner />}
        <ModalMessageErreur message={error} onClose={() => clearError()} />
      </div>
      <form onSubmit={authSubmitHandler}>
        <h2>Login</h2>

        <div className="control-row">
          <div className="control no-margin">
            <label htmlFor="email">Email</label>
            <input
              id="email"
              type="email"
              name="email"
              onChange={(event) =>
                handleInputChange('email', event.target.value)
              }
              value={entredValues.email}
            />
          </div>

          <div className="control no-margin">
            <label htmlFor="password">Password</label>
            <input
              id="password"
              type="password"
              name="password"
              onChange={(event) =>
                handleInputChange('password', event.target.value)
              }
              value={entredValues.password}
            />
          </div>
        </div>

        <p className="form-actions">
          <Link to="/subscribe">
            <button className="button button-flat">Sign up</button>
          </Link>
          <button className="button">Login</button>
        </p>
      </form>
    </>
  );
}
