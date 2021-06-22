/* eslint-disable no-nested-ternary */
import { useContext } from 'react';
import LoggedInUserContext from '../context/logged-in-user';
import usePhotos from '../hooks/use-photos';
import Post from './post';

export default function Timeline() {
  const { user } = useContext(LoggedInUserContext);
  const { photos } = usePhotos(user);

  return (
    <div className="container col-span-2">
      {photos?.length > 0 ? (
        photos.map((content) => <Post key={content.docId} content={content} />)
      ): (
        <p className="text-center text-2xl">Подпишитесь на людей, чтобы увидеть фото!</p>
      )
    }
    </div>
  );
}
