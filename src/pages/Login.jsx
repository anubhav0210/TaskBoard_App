// Login.jsx
// Static login page with validation

import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { Card, Form, Input, Button, Checkbox, Typography, Alert } from "antd";

const { Title } = Typography;

function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [error, setError] = useState("");

  const onFinish = (values) => {
    const { email, password, remember } = values;
    setError(""); // Clear previous errors
    const success = login(email, password, remember);

    if (success) {
      navigate("/board");
    } else {
      setError("Invalid email or password");
    }
  };

  return (
    <div style={{ display: "flex", minHeight: "80vh", alignItems: "center", justifyContent: "center" }}>
      <Card className="neo-card" style={{ width: 420 }}>
        <Title level={3} style={{ textAlign: "center", marginBottom: 8 }}>Welcome Back</Title>

        {error && (
          <Alert
            message={error}
            type="error"
            showIcon
            closable
            onClose={() => setError("")}
            style={{ marginBottom: 16 }}
          />
        )}

        <Form layout="vertical" name="login" onFinish={onFinish} initialValues={{ remember: true }}>
          <Form.Item name="email" label="Email" rules={[{ required: true, message: 'Please input your email!' }, { type: 'email', message: 'Enter a valid email' }]}> 
            <Input placeholder="you@company.com" />
          </Form.Item>

          <Form.Item name="password" label="Password" rules={[{ required: true, message: 'Please input your password!' }]}> 
            <Input.Password placeholder="••••••" />
          </Form.Item>

          <Form.Item name="remember" valuePropName="checked">
            <Checkbox>Remember me</Checkbox>
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit" block>
              Sign In
            </Button>
          </Form.Item>
        </Form>
      </Card>
    </div>
  );
}

export default Login;
