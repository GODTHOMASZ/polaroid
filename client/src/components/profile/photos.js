/* eslint-disable no-nested-ternary */
import PropTypes from 'prop-types';
import Skeleton from 'react-loading-skeleton';
import { useState, useEffect, useContext } from 'react';
import useUser from '../../hooks/use-user';
import UserContext from '../../context/user';
import FirebaseContext from '../../context/firebase';
import { useHistory } from 'react-router-dom';
import * as ROUTES from '../../constants/routes';

export default function Photos( {
  photos,
  profile: {
    docId: profileDocId,
    userId: profileUserId,
    fullName,
    followers,
    following,
    username: profileUsername
  }
}) {
  
  
  const history = useHistory();
  const { firebase } = useContext(FirebaseContext);
  const { user: loggedInUser } = useContext(UserContext);
  const { user } = useUser(loggedInUser?.uid);
  const activeBtnFollow = user?.username && user?.username !== profileUsername;
  return (
    <div className="h-16 border-t border-gray-primary mt-12 pt-4">
      <div className="grid grid-cols-3 gap-8 mt-4 mb-12">
        {!photos
          ? new Array(12).fill(0).map((_, i) => <Skeleton key={i} width={320} height={400} />)
          : photos.length > 0
          ? photos.map((photo) => (
              <div key={photo.docId} className="relative z-0 group">
                
                <img className="w-full h-full" src={photo.imageSrc} alt={photo.caption} />
                <div className="absolute bottom-0 left-0 bg-gray-200 z-10 w-full justify-evenly items-center h-full bg-black-faded group-hover:flex hidden">
                    {!activeBtnFollow && (
                  <svg 
                    xmlns="http://www.w3.org/2000/svg" 
                    className="w-8 top-0 right-0 text-white absolute cursor-pointer" 
                    fill="none" 
                    viewBox="0 0 24 24" 
                    stroke="currentColor"
                    onClick={async(event)=>{
                        try {
                          await firebase.firestore().collection("photos").doc(photo.docId).delete().then(() => {
                          console.log("Document successfully deleted!");
                        }).catch((error) => {
                            console.error("Error removing document: ", error);
                        });
                        } catch (error) {}
                        }}>
                    <path 
                      stroke-linecap="round" 
                      stroke-linejoin="round"
                      stroke-width="2" 
                      d="M6 18L18 6M6 6l12 12" />
                  </svg>
                    )}
                  <p className="flex items-center text-white font-bold">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                      className="w-8 mr-4"
                    >
                      <path
                        fillRule="evenodd"
                        d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z"
                        clipRule="evenodd"
                      />
                    </svg>
                    {photo.likes.length}
                  </p>
                  
                  <p className="flex items-center text-white font-bold">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                      className="w-8 mr-4"
                    >
                      <path
                        fillRule="evenodd"
                        d="M18 10c0 3.866-3.582 7-8 7a8.841 8.841 0 01-4.083-.98L2 17l1.338-3.123C2.493 12.767 2 11.434 2 10c0-3.866 3.582-7 8-7s8 3.134 8 7zM7 9H5v2h2V9zm8 0h-2v2h2V9zM9 9h2v2H9V9z"
                        clipRule="evenodd"
                      />
                    </svg>
                    {photo.comments.length}
                  </p>
                </div>
              </div>
            ))
          : null}
      </div>
      {!photos || (photos.length === 0 && <p className="text-center text-2xl">Публикаций пока нет</p>)}
    </div>
  );
}

Photos.propTypes = {
  photos: PropTypes.array
};
