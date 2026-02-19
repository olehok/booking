import { useState } from 'react';
import { useDispatch } from 'react-redux';

export default function Login() {
    const dispatch = useDispatch();

    // const [email, setEmail] = useState('');
    // const [password, setPassword] = useState('');

    // const handleSubmit = (e) => {
    //     e.preventDefault();
    //     console.log('Login attempt:', { email, password });
    // };

    dispatch(
      login({
        email: values.email,
        name: "Test User",
      }),
    );


    return (
        <>
        </>
        // <div style={{ maxWidth: '400px', margin: '50px auto', padding: '20px' }}>
        //     <h1>Login</h1>
        //     <form onSubmit={handleSubmit}>
        //         <div style={{ marginBottom: '15px' }}>
        //             <label htmlFor="email">Email:</label>
        //             <input
        //                 id="email"
        //                 type="email"
        //                 value={email}
        //                 onChange={(e) => setEmail(e.target.value)}
        //                 required
        //                 style={{ width: '100%', padding: '8px', marginTop: '5px' }}
        //             />
        //         </div>
        //         <div style={{ marginBottom: '15px' }}>
        //             <label htmlFor="password">Password:</label>
        //             <input
        //                 id="password"
        //                 type="password"
        //                 value={password}
        //                 onChange={(e) => setPassword(e.target.value)}
        //                 required
        //                 style={{ width: '100%', padding: '8px', marginTop: '5px' }}
        //             />
        //         </div>
        //         <button type="submit" style={{ width: '100%', padding: '10px' }}>
        //             Login
        //         </button>
        //     </form>
        // </div>
    );
}