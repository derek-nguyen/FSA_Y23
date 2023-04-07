import React, { useState } from 'react';
import ReactDOM from 'react-dom';

const Form = () => {

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault()
    const username = event.target.username.value
    const password = event.target.password.value
    console.log(username)
    console.log(password)
    setUsername('')
    setPassword('')
  }

  // const handleChangeUsername = (event) => {
  //   setUsername(event.target.value)
  // }

  // const handleChangePassword = (event) => {
  //   setPassword(event.target.value)
  // }

  

  return (
    <div id='container'>
      <div id='navbar'>
        Form.js
      </div>
      <form onSubmit={handleSubmit}>
        <label htmlFor='username'>Username</label>
        <input type='text' name='username' value={username} onChange={(event) => setUsername(event.target.value)}/>
        <label htmlFor='password'>Password</label>
        <input type='password' name='password' value={password} onChange={(event) => setPassword(event.target.value)}/>
        <button type='submit'>Submit</button>
      </form>
      
    </div>
  )
}


ReactDOM.render(
  <Form />,
  document.getElementById('app')
)