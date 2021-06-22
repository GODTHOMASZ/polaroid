import { useParams, useHistory } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { getUserByUsername } from '../services/firebase';
import * as ROUTES from '../constants/routes';
import Header from '../components/header';
import Footer from '../components/footer';
import UserProfile from '../components/profile';

export default function Profile() {
  const { username } = useParams();
  const [user, setUser] = useState(null);
  const history = useHistory();

  useEffect(() => {
    async function checkUserExists() {
      const [user] = await getUserByUsername(username);
      if (user?.userId) {
        setUser(user);
      } else {
        history.push(ROUTES.NOT_FOUND);
      }
    }

    checkUserExists();
  }, [username, history]);

  return user?.username ? (
    <div className="bg-gray-background flex flex-col min-h-screen">
      <Header />
      <div className="mx-auto min-h-screen mb-60 flex-grow max-w-screen-lg">
        <UserProfile user={user} />
      </div>
      <Footer />
    </div>
  ) : null;
}
