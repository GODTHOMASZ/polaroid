import Header from '../components/header';
import Footer from '../components/footer';
import Uploader  from '../components/uploader';
import LoggedInUserContext from '../context/logged-in-user';
import React, { useContext, useEffect } from 'react';
import useUser from '../hooks/use-user';

export default function AddPh({ user: loggedInUser }) {
  const { user, setActiveUser } = useUser(loggedInUser.uid);
  useEffect(() => {
    document.title = 'polaroid';
  }, []);

  return (
    <LoggedInUserContext.Provider value={{ user, setActiveUser }}>
      <div className="bg-gray-background flex flex-col min-h-screen">
        <Header />
        <div className="mx-auto min-h-screen flex-grow max-w-screen-lg">
          <Uploader/>
        </div>
        <Footer />
      </div>
    </LoggedInUserContext.Provider>
);
}
