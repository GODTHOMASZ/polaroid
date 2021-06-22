import { useState, useContext, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
import FirebaseContext from '../context/firebase';
import * as ROUTES from '../constants/routes';

export default function Login() {
  const history = useHistory();
  const { firebase } = useContext(FirebaseContext);

  const [emailAddress, setEmailAddress] = useState('');
  const [password, setPassword] = useState('');

  const [error, setError] = useState('');
  const isInvalid = password === '' || emailAddress === '';

  const handleLogin = async (event) => {
    event.preventDefault();

    try {
      await firebase.auth().signInWithEmailAndPassword(emailAddress, password);
      history.push(ROUTES.DASHBOARD);
    } catch (error) {
      setEmailAddress('');
      setPassword('');
      setError(error.message);
    }
  };

  useEffect(() => {
    document.title = 'Login - polaroid';
  }, []);

  return(
    <div className="container flex mx-auto max-w-xs items-center h-screen">
        <div className="flex flex-col items-center bg-white p-4 border border-gray-primary rounded-md mb-4">
            <p className="font-sans text-2xl antialiased font-medium text-center">Добро пожаловать в POLAROID</p>
            <br></br>

            {error && <p className="mb-4 text-xs text-red-primary">{error}</p>}

            <form onSubmit={handleLogin} method="POST">
                <input 
                    arial-label="Введите адрес электронной почты" 
                    type="text" 
                    placeholder="Адрес электронной почты" 
                    className="text-sm text-gray-base w-full mr-3 py-5 px-4 h-2 border border-gray-primary rounded mb-2"
                    onChange={({target})=>setEmailAddress(target.value)}
                    value={emailAddress}
                />
                <input 
                    arial-label="Введите пароль" 
                    type="password" 
                    placeholder="Пароль" 
                    className="text-sm text-gray-base w-full mr-3 py-5 px-4 h-2 border border-gray-primary rounded mb-2"
                    onChange={({target})=>setPassword(target.value)}
                    value={password}
                />
                <button
                    disabled={isInvalid}
                    type="submit"
                    className={`bg-blue-medium text-white w-full rounded h-8 font-bold ${isInvalid && ' opacity-50'}`
                }>
                    Войти
                </button>
                <br/><br/>
                <p className="text-sm font-sans antialiased font-medium text-center">Ещё не зарегистрировались в polaroid?{` `}
                <Link to={ROUTES.SIGN_UP} className="font-bold text-blue-medium">
                Регистрация
                </Link>
                </p>
            </form>
        </div>
        
    </div>
);
}
