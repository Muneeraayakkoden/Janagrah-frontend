/*import React, { useState } from 'react';
import './OfficialSignup.css';
import axios from 'axios';

import React, { useState } from 'react';

const OfficialSignup = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:4000/wardmemberlogin', {
        username,
        password
      });
        console.log(response.data)
        body: JSON.stringify({ username, password })
      
      // Handle response, maybe redirect on success
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button type="submit">Login</button>
    </form>
  );
};

export default OfficialSignup; */








































//const OfficialSignup = () => {
  /*const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    username: '',
    password: '',
    department: '',
    designation: '',
  });*/

  //const [errorMessage, setErrorMessage] = useState('');

  /*const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    //if (password !== confirmPassword) {
    //   setErrorMessage('Passwords do not match.');
    //  return;
    }
    if (!formData.name || !formData.email || !formData.username || !formData.password || !formData.department || !formData.designation) {
      setErrorMessage('Please fill in all required fields.');
      return;
    }
    
    // Perform verification process (e.g., send verification email)
    // Once verified, store official data in database and show success message
  /*  setFormData({
      name: '',
      email: '',
      username: '',
      password: '',
      department: '',
      designation: '',
    });
    setPassword('');
    setConfirmPassword('');
    setErrorMessage('Verification email sent. Please check your inbox to complete the signup process.');
  };
*/
  /*return (
    <div className="signup-page">
      <h1>OFFICIAL SIGNUP</h1>
      <form onSubmit={handleSubmit}>
       <input type="text" name="name" placeholder="Name" value={formData.name} onChange={handleChange} required />
        <br />
        <input type="email" name="email" placeholder="Email" value={formData.email} onChange={handleChange} required />
        <br />
        <input type="text" name="username" placeholder="Username" value={formData.username} onChange={handleChange} required />
        <br />
        <input type="password" name="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} required />
        <br />
        <input type="password" name="confirm_password" placeholder="Re-enter Password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} required/> 
        <br />
        <input type="text" name="department" placeholder="Department" value={formData.department} onChange={handleChange} required />
        <br />
        <input type="text" name="designation" placeholder="Designation" value={formData.designation} onChange={handleChange} required />
        <br />
        <button type="submit">Sign Up</button>
        {errorMessage && <p className="error-message">{errorMessage}</p>}
      </form>
    </div>
  );
  function OfficialSignup(props) {
   // const navigate = useNavigate()

    const [username, setuserName] = useState("")
    const [password, setPassword] = useState("")
   // const [email, setEmail] = useState("")

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch('http://localhost:4000/user/request-user', {
                method: "post",
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    username,
                   
                    password,
                }),
            });
            

            if (response) {
                navigate("/about")
            }

        } catch (error) {
            console.error('Error submitting form data:', error);
        }
    };
  return (
    <div className="signup-page">
      <h1>OFFICIAL SIGNUP</h1>
           <form onSubmit={handleSubmit}>
                <input value={username} onChange={(e) => setAge(e.target.value)} type="text" placeho lder="age..." /> <br />
                <input value={password} onChange={(e) => setEmail(e.target.value)} type="text" placeholder="email..." /> <br />
                <input type="submit" />
            </form>
    </div>
  )
}


export default OfficialSignup;

/*/