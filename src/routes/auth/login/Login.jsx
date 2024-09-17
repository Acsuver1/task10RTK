import React, { useEffect } from 'react';
import { Button, Form, Input, Typography, notification } from 'antd';
import { Link, useNavigate } from 'react-router-dom';
import { useLogInMutation } from '../../../redux/api/authApi';
import { logIn } from '../../../redux/slices/authSlice';
import { useDispatch } from 'react-redux';
import './Login.css';

const { Title, Text } = Typography;

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [logInRequest, { data, isSuccess }] = useLogInMutation();

  const onFinish = (values) => {
    logInRequest(values);
  };

  useEffect(() => {
    if (isSuccess) {
      dispatch(logIn({
        token: data.payload.token,
        username: data.payload.username,
        email: data.payload.email
      }));
      notification.success({
        message: 'Successfully logged in! Go ahead 😊',
      });
      navigate('/profile'); 
    }
  }, [isSuccess]);

  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };

  return (
    <Form
      className="login-form"
      name="basic"
      layout="vertical"
      initialValues={{
        remember: true,
      }}
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
      autoComplete="off"
    >
      <Title level={2} className="login-title text-center">
        Login
      </Title>
      <Form.Item
        label="Username"
        name="username"
        rules={[
          {
            required: true,
            message: 'Please input your username!',
          },
        ]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        label="Password"
        name="password"
        rules={[
          {
            required: true,
            message: 'Please input your password!',
          },
        ]}
      >
        <Input.Password />
      </Form.Item>

      <Form.Item>
        <Button className="w-full ant-btn-primary" type="primary" htmlType="submit">
          Login
        </Button>
      </Form.Item>
      <Text>
        Don't have an account?{' '}
        <Link to="/auth/signup" className="text-link">
          Sign Up
        </Link>
      </Text>
    </Form>
  );
};

export default Login;
