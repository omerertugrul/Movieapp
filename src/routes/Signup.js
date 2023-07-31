import React, { useState } from 'react';
import { styled } from "styled-components";



const Signup = () => {
  const [formData, setFormData] = useState({
    username: '',
    surname: '',
    phoneNumber: '',
    password: '',
    confirmPassword: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const { username, password, phoneNumber, surname } = formData;
    

    if (!username.trim() || !password.trim() || !surname.trim() || !phoneNumber.trim()) {
      alert('Kullanıcı adı veya şifre boş bırakılamaz!');
    } else {
      console.log('Form gönderildi:', formData);
    }
  };

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection:'column' }}>
          <SignupTitle>
        <h1>Signup</h1>
        <h2>Home Page</h2>
      </SignupTitle>
      <SignupInfo onSubmit={handleSubmit}>
        <SignupInput>
          <label>Kullanıcı Adı:</label>
          <input type="text" name="username" value={formData.username} onChange={handleChange} />
        </SignupInput>
        <SignupInput>
          <label>Soyadı:</label>
          <input type="text" name="surname" value={formData.surname} onChange={handleChange} />
        </SignupInput>
        <SignupInput>
          <label>Tel. No:</label>
          <input type="tel" name="phoneNumber" value={formData.phoneNumber} onChange={handleChange} />
        </SignupInput>
        <SignupInput>
          <label>Şifre:</label>
          <input type="password" name="password" value={formData.password} onChange={handleChange} />
        </SignupInput>
        <SignupInput>
          <label>Şifre Tekrar:</label>
          <input type="password" name="confirmPassword" value={formData.confirmPassword} onChange={handleChange} />
        </SignupInput>
        <SignupButton type="submit">Kayıt Ol</SignupButton>
      </SignupInfo>
    </div>
  );
};

const SignupTitle = styled.div`
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

const SignupInput = styled.div`
display: flex;
    flex-direction: column;
    gap: 25px;

    input {
      width: 25rem;
      padding: 0.6rem;
    }

    label {
      margin: 1rem 0 0 0;
    }
`;

const SignupInfo = styled.div`
margin: 5rem;
`;

const SignupButton = styled.button`
    margin: 3rem 0 0 0;
    padding: 0.8rem;
    width: 13rem;
    border-radius: 20px;
    border: none;
    cursor: pointer;
    &:hover {
    opacity: 0.8;
    background-color: blue;
  }
`;

export default Signup;
