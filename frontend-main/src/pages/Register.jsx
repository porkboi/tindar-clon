import React, { useState } from 'react';
import { useNavigate, useHistory } from 'react-router-dom';
import { Form, Input, Button } from 'antd';
import '../style/RegisterStyle.css';

function Register() {
  const [form] = Form.useForm();
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const history = useHistory();

  const handleSubmit = async (values) => {
    const { email, password, confirmPassword } = values;

    if (!email.endsWith('.26@dartmouth.edu')) {
      setError('Email must end with .26@dartmouth.edu');
      return;
    }

    history.push({ pathname: '/user-questionnaire', state: email });

    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    try {
      // await register({ email, password });
      console.log('Successful registration');
      navigate('/user-questionnaire');
    } catch {
      setError('Registration failed. Please try again.');
    }
  };

  return (
    <div className="register-container">
      <h2>Register</h2>
      <Form
        form={form}
        layout="vertical"
        onFinish={handleSubmit}
      >
        <Form.Item
          label="Dartmouth Email"
          name="email"
          rules={[
            { required: true, message: 'Please input your Dartmouth email!' },
            { type: 'email', message: 'Please enter a valid email!' },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="Password"
          name="password"
          rules={[{ required: true, message: 'Please input your password!' }]}
          hasFeedback
        >
          <Input.Password />
        </Form.Item>
        <Form.Item
          label="Confirm Password"
          name="confirmPassword"
          dependencies={['password']}
          hasFeedback
          rules={[
            { required: true, message: 'Please confirm your password!' },
            ({ getFieldValue }) => ({
              validator(_, value) {
                if (!value || getFieldValue('password') === value) {
                  return Promise.resolve();
                }
                return Promise.reject(new Error('The two passwords do not match!'));
              },
            }),
          ]}
        >
          <Input.Password />
        </Form.Item>
        {error && <p className="error">{error}</p>}
        <Form.Item>
          <Button type="primary" htmlType="submit">
            Register
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
}

export default Register;
