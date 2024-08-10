import React from 'react';
import {
  Select, InputNumber, Input, Upload, Button, message,
} from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import '../style/UserQuestionsStyle.css';

const uploadProps = {
  name: 'file',
  action: 'https://660d2bd96ddfa2943b33731c.mockapi.io/api/upload',
  headers: {
    authorization: 'authorization-text',
  },
  onChange(info) {
    if (info.file.status !== 'uploading') {
      console.log(info.file, info.fileList);
    }
    if (info.file.status === 'done') {
      message.success(`${info.file.name} file uploaded successfully`);
    } else if (info.file.status === 'error') {
      message.error(`${info.file.name} file upload failed.`);
    }
  },
};

function UserQuestions() {
  const navigate = useNavigate();

  const handleChange = (value) => {
    console.log(`selected ${value}`);
  };

  const onRiceChange = () => {
    console.log('changed rice purity');
  };

  const handleComplete = () => {
    navigate('/recruiting');
  };

  return (
    <div className="user-questions-container">
      <h1>Fill out these questions to build your profile</h1>
      <div className="questions">
        <h2>What is your GPA?</h2>
        <Select
        // defaultValue="lucy"
          style={{ width: 120 }}
          onChange={handleChange}
          options={[
            { value: '4.00', label: '4.00' },
            { value: '3.80-3.99', label: '3.80-3.99' },
            { value: '3.65-3.79', label: '3.65-3.79' },
            { value: '3.50-3.64', label: '3.50-3.64' },
            { value: '3.25-3.49', label: '3.25-3.49' },
            { value: '3.00-3.24', label: '3.00-3.24' },
            { value: '2.50-2.99', label: '2.50-2.99' },
            { value: '2.00-2.49', label: '2.00-2.49' },
            { value: '<2.00', label: '<2.00' },
          ]}
        />
        <h2>What is your Rice Purity score?</h2>
        <InputNumber onChange={onRiceChange} min={5} max={99} />
        <h2>What is your Major?</h2>
        <Input style={{ width: '25%' }} placeholder="e.g. Economics" />
        <h2>How tall are you?</h2>
        <InputNumber style={{ width: '25%' }} addonAfter="ft" /> <InputNumber style={{ width: '25%' }} addonAfter="in" />
        <h2>What are your top three skills?</h2>
        <Input style={{ width: '20%' }} placeholder="skiing" /> <br />
        <Input style={{ width: '20%' }} placeholder="dancing" /> <br />
        <Input style={{ width: '20%' }} placeholder="excel" /> <br />
        <h3>Please upload an image of yourself here</h3>
        <Upload name={uploadProps.name} action={uploadProps.action} headers={uploadProps.headers} onChange={uploadProps.onChange}>
          <Button style={{ marginBottom: 20 }} icon={<UploadOutlined />}>Click to Upload</Button>
        </Upload>
      </div>
      <Button style={{ marginBottom: 40 }} onClick={handleComplete} type="primary">Submit</Button>
    </div>
  );
}

export default UserQuestions;
