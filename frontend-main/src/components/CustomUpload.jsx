import { React } from 'react';
import { message, Button, Upload } from 'antd';
import { initializeApp } from 'firebase/app';
import { getStorage, ref } from 'firebase/storage';
import { useLocation } from 'react-router-dom';

const location = useLocation();
const email = location.state;

const firebaseConfig = {
  apiKey: 'AIzaSyB2DsLF7M-SvmbAXlUDgGSNGRjkXAlTo9E',
  authDomain: 'tindar-b4fa7.firebaseapp.com',
  projectId: 'tindar-b4fa7',
  storageBucket: 'tindar-b4fa7.appspot.com',
  messagingSenderId: '1054744847213',
  appId: '1:1054744847213:web:e6cafe084afeeac41a3064',
  measurementId: 'G-XBTGNEGPJY',
};
  // Initialize Firebase
const app = initializeApp(firebaseConfig);
const storage = getStorage(app);

function CustomUpload() {
  const handleChange = async (info) => {
    if (info.file.status === 'done') {
      message.success(`${info.file.name} file uploaded successfully`);
    } else if (info.file.status === 'error') {
      message.error(`${info.file.name} file upload failed.`);
    }
  };

  const customRequest = async ({ file, onSuccess, onError }) => {
    try {
      const storageRef = ref(storage);
      const fileRef = storageRef.child(email);
      await fileRef.put(file);
      const fileURL = await fileRef.getDownloadURL();
      console.log('File available at', fileURL);
      onSuccess(fileURL);
    } catch (error) {
      onError(error);
    }
  };
  return (
    <Upload customRequest={customRequest} onChange={handleChange}>
      <Button>Upload</Button>
    </Upload>
  );
}

export default CustomUpload;
