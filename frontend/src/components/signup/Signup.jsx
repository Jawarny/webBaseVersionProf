import { useContext, useState } from 'react';
import './Signup.css';
import { Link } from 'react-router-dom';
import ModalMessageErreur from '../UIElements/ModalMessageErreur';
import Spinner from '../UIElements/LoadingSpinner';
import { AuthContext } from '../../context/auth-context';
export default function Signup() {
  const auth = useContext(AuthContext);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [passwordAreNotEqual, setPasswordAreNotEqual] = useState(false);

  async function handleSubmit(event) {
    event.preventDefault();
    const fd = new FormData(event.target);
    const data = Object.fromEntries(fd.entries());
    if (data.password !== data['confirm-password']) {
      setPasswordAreNotEqual(true);
      return;
    }
    try {
      setIsLoading(true);
      const response = await fetch('http://localhost:5000/api/users/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json', //pour que le bodyParser sache comment faire le parse
        },
        body: JSON.stringify(data),
      });
      const responseData = await response.json();
      console.log(responseData);
      if (!response.ok) {
        throw new Error(responseData.message);
      }
      setIsLoading(false);
      auth.login();
    } catch (err) {
      setError(err.message || 'Une erreur est survenue, essayez plus tard.');
      console.error(err);
    } finally {
      setIsLoading(false);
    }

    event.target.reset();
  }

  return (
    <>
      <div>
        {isLoading && <Spinner />}
        <ModalMessageErreur message={error} onClose={() => setError(null)} />
      </div>
      <form onSubmit={handleSubmit}>
        <h2>Welcome on board!</h2>
        <p>We just need a little bit of data from you to get you started 🚀</p>

        <div className="control">
          <label htmlFor="email">Email</label>
          <input id="email" type="email" name="email" required />
        </div>

        <div className="control-row">
          <div className="control">
            <label htmlFor="password">Password</label>
            <input id="password" type="password" name="password" />
          </div>
          <div className="control">
            <label htmlFor="confirm-password">Confirm Password</label>
            <input
              id="confirm-password"
              type="password"
              name="confirm-password"
            />
            {passwordAreNotEqual ? (
              <div className="control-error">
                <p>Passwords must match.</p>
              </div>
            ) : null}
          </div>
        </div>

        <hr />

        <div className="control-row">
          <div className="control">
            <label htmlFor="first-name">First Name</label>
            <input type="text" id="first-name" name="first-name" />
          </div>

          <div className="control">
            <label htmlFor="last-name">Last Name</label>
            <input type="text" id="last-name" name="last-name" />
          </div>
        </div>

        <div className="control">
          <label htmlFor="terms-and-conditions">
            <input type="checkbox" id="terms-and-conditions" name="terms" />I
            agree to the terms and conditions
          </label>
        </div>

        <p className="form-actions">
          <Link to="/auth">
            <button className="button button-flat">Login</button>
          </Link>
          <button type="submit" className="button">
            Sign up
          </button>
        </p>
      </form>
    </>
  );
}
