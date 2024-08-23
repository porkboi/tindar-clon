import React from 'react';
import {
  Select, InputNumber, Input, Button,
} from 'antd';
import { useNavigate } from 'react-router-dom';
import CustomUpload from '../components/CustomUpload';
import '../style/UserQuestionsStyle.css';

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
        <CustomUpload />
      </div>
      <Button style={{ marginBottom: 40 }} onClick={handleComplete} type="primary">Submit</Button>
    </div>
  );
}

export default UserQuestions;
