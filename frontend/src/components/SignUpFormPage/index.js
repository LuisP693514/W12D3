import { useDispatch, useSelector } from "react-redux";
import { Redirect } from "react-router-dom";
import { getSessionUser } from "../../store/session";
import * as sessionActions from '../../store/session'
import { useState } from "react";

const SignUpForm = () => {
    const dispatch = useDispatch();
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [username, setUsername] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [errors, setErrors] = useState([])
    const sessionUser = useSelector(getSessionUser)

    if (sessionUser) return <Redirect to={'/'} />

    const handleSubmit = (e) => {
        e.preventDefault();
        setErrors([]);
        if (password === confirmPassword) {
            return dispatch(sessionActions.signUp({ email, username, password }))
                .catch(async (res) => {
                    let data;
                    try {
                        data = await res.clone().json();
                    } catch {
                        data = await res.text();
                    }
                    if (data?.errors) setErrors(data.errors);
                    else if (data) setErrors([data]);
                    else setErrors([res.statusText]);
                });
        } else {
            return setErrors(['Both password fields should match.'])
        }
    }

    return (
        <form onSubmit={handleSubmit}>
            <ul>
                {errors.map(error => <li key={error}>{error}</li>)}
            </ul>
            <label htmlFor="email">Email
                <input
                    id="email"
                    type='email'
                    value={email}
                    onChange={(e) => setEmail(e.currentTarget.value)}
                    required
                />
            </label>
            <label htmlFor="username">username
                <input
                    id="username"
                    type={'text'}
                    value={username}
                    onChange={(e) => setUsername(e.currentTarget.value)}
                    required
                />
            </label>
            <label htmlFor="password">Password
                <input
                    id="password"
                    type={'password'}
                    value={password}
                    onChange={(e) => setPassword(e.currentTarget.value)}
                    required
                />
            </label>
            <label htmlFor="cofirmPassword">Confirm Password
                <input
                    id="confirmPassword"
                    type={'password'}
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.currentTarget.value)}
                    required
                />
            </label>
            <button>Sign Up</button>

        </form>
    )
}

export default SignUpForm;