import React, { ChangeEvent, FormEvent, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useSelector } from 'react-redux';

import { getEmailError, getPasswordError } from '../../helpers/validators';
import { removeRequestError, signinUser } from '../../store/reducers/userSlice';
import { useAppDispatch } from '../../store/store';

import Spinner from '../Spinner/Spinner';
import { IState } from '../../models/types';
import './Signin.css';

const Signin: React.FC = (): JSX.Element => {
    const dispatch = useAppDispatch(); 
    const error = useSelector((state: IState) => state.user.request.error);
    const loading = useSelector((state: IState) => state.user.request.loading);
    const history = useHistory();
    
    const [email, setEmail] = useState('');
    const [emailError, setEmailError] = useState('');
    const [password, setPassword] = useState('');
    const [passwordError, setPasswordError] = useState('');

    const handleSignin = (e: FormEvent<HTMLFormElement>): void => {
        e.preventDefault();
        if (!isFormValid()) {
            return;
        }
        dispatch(signinUser({email, password})).then(res => {
            if (res.meta.requestStatus === 'fulfilled') {
                history.push('/');
            }
        });
    }

    const handleInputChange = (e: ChangeEvent<HTMLInputElement>): void => {
        resetErrors();
        const { name, value} = e.target;
        switch (name) {
            case 'email':
                setEmail(value);
                break;
            case 'password':
                setPassword(value);
                break;
            default:
                return;
        }
    }

    const redirectToRegister = (): void => {
        resetErrors();
        history.push('/register');
    }

    const isFormValid = () : boolean => {
        const emailErrorMessage: string = getEmailError(email);
        const passwordErrorMessage: string = getPasswordError(password);

        if(emailErrorMessage) {
            setEmailError(emailErrorMessage);
        } 

        if(passwordErrorMessage) {
            setPasswordError(passwordErrorMessage);
        } 

        return (emailErrorMessage || passwordErrorMessage) ? false : true;
    }

    const resetErrors = (): void => { 
        if(error) {
            dispatch(removeRequestError());
        }
        setEmailError('');
        setPasswordError('');
    }

    return (
        <div className='background-wrapper'>
            {loading ? <Spinner /> : null}
            <div className='background-form-wrapper'>
                <h1>Sign In</h1>
                <form onSubmit={handleSignin}>
                    <div className='submit-error'>{error}</div>
                    <div className='input-wrapper'>
                        <label htmlFor="email">Email</label>
                        <input type='text' name='email' onChange={handleInputChange} />
                        <span className='error'>{emailError}</span>
                    </div>
                    <div className='input-wrapper'>
                        <label htmlFor="password">Password</label>
                        <input type='password' name='password' onChange={handleInputChange} />
                        <span className='error'>{passwordError}</span>
                    </div>
                    <div className='button-wrapper'>
                        <button className='submit' type='submit'>Sign In</button>
                        <button className='cancel' type='button' onClick={redirectToRegister}>Register</button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default Signin;