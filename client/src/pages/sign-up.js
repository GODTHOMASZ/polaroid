import { useState, useContext, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
import FirebaseContext from '../context/firebase';
import * as ROUTES from '../constants/routes';
import { doesUsernameExist } from '../services/firebase';

export default function SignUp() {
  const history = useHistory();
  const { firebase } = useContext(FirebaseContext);

  const [username, setUsername] = useState('');
  const [fullName, setFullName] = useState('');
  const [emailAddress, setEmailAddress] = useState('');
  const [password, setPassword] = useState('');

  const [error, setError] = useState('');
  const isInvalid = password === '' || emailAddress === '';

  const handleSignUp = async (event) => {
    event.preventDefault();

    const usernameExists = await doesUsernameExist(username);
    if (!usernameExists) {
      try {
        const createdUserResult = await firebase
          .auth()
          .createUserWithEmailAndPassword(emailAddress, password);

        // authentication
        // -> emailAddress & password & username (displayName)
        await createdUserResult.user.updateProfile({
          displayName: username
        });

        // firebase user collection (create a document)
        await firebase
          .firestore()
          .collection('users')
          .add({
            userId: createdUserResult.user.uid,
            username: username.toLowerCase(),
            fullName,
            emailAddress: emailAddress.toLowerCase(),
            following: [],
            followers: [],
            dateCreated: Date.now()
          });

        history.push(ROUTES.DASHBOARD);
      } catch (error) {
        setFullName('');
        setEmailAddress('');
        setPassword('');
        setError(error.message);
      }
    } else {
      setUsername('');
      setError('That username is already taken, please try another.');
    }
  };

  useEffect(() => {
    document.title = 'Sign Up - polaroid';
  }, []);

  return(
    <div className="container flex mx-auto max-w-xs items-center h-screen">
        <div className="flex flex-col items-center bg-white p-4 border border-gray-primary rounded-md mb-4">
            <p className="font-sans text-2xl antialiased font-medium text-center">Добро пожаловать в polaroid</p>
            <br></br>

            {error && <p className="mb-4 text-xs text-red-primary">{error}</p>}

            <form onSubmit={handleSignUp} method="POST">
                <input 
                    arial-label="Введите имя пользователя" 
                    type="text" 
                    placeholder="Имя пользователя" 
                    className="text-sm text-gray-base w-full mr-3 py-5 px-4 h-2 border border-gray-primary rounded mb-2"
                    onChange={({target})=>setUsername(target.value)}
                    value={username}
                />
                <input 
                    arial-label="Введите имя и фамилию" 
                    type="text" 
                    placeholder="Имя и фамилия" 
                    className="text-sm text-gray-base w-full mr-3 py-5 px-4 h-2 border border-gray-primary rounded mb-2"
                    onChange={({target})=>setFullName(target.value)}
                    value={fullName}
                />
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
                    Зарегистрироваться
                </button>
                <br/><br/>
                <p className="text-sm font-sans antialiased font-medium text-center">Уже есть аккаунт в polaroid?{` `}
                <Link to={ROUTES.LOGIN} className="font-bold text-blue-medium">
                Войти
                </Link>
                </p>
            </form>
        </div>
        
    </div>
);
}
