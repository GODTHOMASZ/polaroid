import React, { Fragment,useContext, useState } from 'react';
import axios from 'axios';
import { useHistory } from 'react-router-dom';
import FirebaseContext from '../context/firebase';
import {nanoid} from 'nanoid';
import LoggedInUserContext from '../context/logged-in-user';
import moment from 'moment'; 

const FileUpload = () => {
  const { user } = useContext(LoggedInUserContext);

  const [file, setFile] = useState('');
  const [filename, setFilename] = useState('');
  const [description, setDescription] = useState('');
  const history = useHistory();
  const { firebase } = useContext(FirebaseContext);
  const onChange = e => {
    setFile(e.target.files[0]);
    setFilename(e.target.files[0].name);
  };

  const size = 8;
  const id = nanoid(size);
  console.log(id);

  const onSubmit = async e => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('file', file, id+'.jpg');
    await firebase
          .firestore()
          .collection('photos')
          .add({
            photoId: id,
            userId: user.userId,
            favs:[],
            imageSrc: `/images/file-upload/${id}.jpg`,
            caption: description,
            likes: [],
            comments: [],
            dateCreated: Date.now(),
            dateForSort: moment().format('MMMM Do YYYY, h:mm:ss a')
          });
    try {
      await axios.post('/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      history.push(`/p/${user?.username}`);
    } catch (err) {
      
    }
  };
  //console.log(filename);
  const isInvalid = filename === '';

  return (
    <Fragment>
        <form onSubmit={onSubmit}>
          <div className="w-screen ml-64">
            <div className="max-w-lg border bg-white rounded-lg overflow-hidden md:max-w-lg">
              <div className="md:flex">
                <div className="w-full">
                    <div className="p-4 flex border-b-2"> 
                      <span className="text-lg font-bold text-gray-base">Добавление&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span> 
                    </div>
                    <div className="p-3">
                      <div className="mb-2"> <span className="text-sm">Описание</span> <input type="text" className="h-12 px-3 w-full border-gray-base border rounded focus:outline-none focus:border-gray-primary" onChange={({target})=>setDescription(target.value)} value={description}/> </div>
                        <div className="mb-2"> <span>Фотография</span>
                          <div className="relative h-40 rounded-lg border-dashed border-2 border-gray-200 bg-white flex justify-center items-center hover:cursor-pointer">
                            <div className="absolute">
                              <div className="flex flex-col items-center "> <i className="fa fa-cloud-upload fa-3x text-gray-base"></i> <span className="block text-gray-base font-normal">Перетащите фото сюда</span> <span className="block text-gray-base font-normal">или</span> <span className="block text-blue-medium font-normal">Нажмите, чтобы выберать фото</span> </div>
                            </div> <input type="file" accept="image/jpeg, image/png" className="h-full w-full opacity-0" id='customFile' onChange={onChange}/>
                          </div>
                          <div className="flex justify-between items-center text-gray-base">  </div>
                        </div>
                        <div className="mt-3 text-center pb-3"> 
                          <button disabled={isInvalid} type='submit' className="w-full h-12 text-lg bg-blue-medium rounded text-white hover:bg-blue-medium">Добавить</button> 
                        </div>
                    </div>
                </div>
              </div>
            </div>
          </div>
        </form>
    
    </Fragment>
  );
};

export default FileUpload;
