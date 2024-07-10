import { useState } from 'react';
import { handleRegister } from '../services/HttpClient';


const RegisterForm = () => {
    const [name, setName] = useState('')
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(null);
    const [successMessage, setSuccessMessage] = useState('');

    const registerUser = async (e) => {
        e.preventDefault();

        try {
            const user = await handleRegister(name, email, password);
            setSuccessMessage('Registration successful!');
            console.log('Registered user:', user);
        } catch (error) {
            setError(error.message);
            console.error('Registration error:', error);
        }

    };


    return (
        <div className='registerFormWrapper'>
            <h2>Register Form</h2>
            <form className='register' onSubmit={registerUser}>
                <div className='register'>
                    <input
                        placeholder='Name'
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                    />
                </div>
                <div className='register'>
                    <input
                        placeholder='Email'
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </div>
                <div className='register'>
                    <input
                        placeholder='Password'
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </div>
                <button className='loginButton' type="submit">Register</button>
            </form>
            {error && <p style={{ color: 'red' }}>Error: {error}</p>}
            {successMessage && <p style={{ color: 'green' }}>{successMessage}</p>}
        </div>
    );
};

export default RegisterForm