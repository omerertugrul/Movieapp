import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";
import { styled } from "styled-components";




const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = () => {
    if (!username.trim() || !password.trim()) {
      alert("Kullanıcı adı ve şifre boş bırakılamaz!");
      return;
    }

    // Burada giriş işlemleri gerçekleştirilebilir
    console.log("Kullanıcı adı:", username);
    console.log("Şifre:", password);

    // Giriş işleminden sonra kullanıcıyı yönlendirebilirsiniz
     navigate("/login");
  };

  return (
    <div style={{ display: "flex", justifyContent: "center", alignItems: "center", flexDirection: "column" }}>
          <LoginTitle>
        <h1>Login</h1>
        <h2>Home Page</h2>
      </LoginTitle>
      <div>

        <LoginMain>
        <LoginInput
          type="text"
          placeholder="Kullanıcı adı"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <LoginInput
          type="password"
          placeholder="Şifre"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        </LoginMain>
       
        <LoginButton onClick={handleLogin}>Giriş Yap</LoginButton>
      </div>
    </div>
  );
};

const LoginTitle = styled.div`
display: flex;
justify-content: space-between;
  background-color: blue;
  color: white;
  padding: 1rem;
  width: 100%;
  h2 {
    cursor: pointer;
    font-size: 30px;
  }
`;

const LoginMain = styled.div`
display: flex;
    flex-direction: column;
    gap: 25px;
    margin: 8rem 0 0 0;
`;

const LoginButton = styled.button`
margin: 40px 0 0 0;
padding: 0.8rem;
cursor: pointer;
color: black;
&:hover {
    opacity: 0.8;
    background-color: blue;
  }
`;

const LoginInput = styled.input`
padding: 1rem;
width: 25rem;
`;

export default Login;
