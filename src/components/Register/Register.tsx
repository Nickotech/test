import React, { ChangeEvent, useState, FormEvent } from 'react';
import { useHistory } from 'react-router-dom';
import { useSelector } from 'react-redux';

import { getEmailError, getNameError, getPasswordError } from '../../helpers/validators';
import { registerUser, removeRequestError } from '../../store/reducers/userSlice';
import { useAppDispatch } from '../../store/store';

import Spinner from '../Spinner/Spinner';
import '../Signin/Signin.css';

interface UserState {
    name: string;
    email: string;
    role: string;
    request: {
        error: '',
        loading: false
    }
}

interface State {
    user: UserState;
}

const Register = () => {
    const dispatch = useAppDispatch(); 
    const error = useSelector((state: State) => state.user.request.error);
    const loading = useSelector((state: State) => state.user.request.loading);
    const history = useHistory();
    const [name, setName] = useState('');
    const [nameError, setNameError] = useState('');
    const [email, setEmail] = useState('');
    const [emailError, setEmailError] = useState('');
    const [password, setPassword] = useState('');
    const [passwordError, setPasswordError] = useState('');
    const [role, setRole] = useState("Admin"); 

    const handleRegister = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (!isFormValid()) {
            return;
        }
        dispatch(registerUser({name, email, password, role})).then((res: any) => {
            if (res.meta.requestStatus === 'fulfilled') {
                history.push('/');
            }
        })
    }

    const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
        resetErrors();
        const { name, value} = e.target;
        switch (name) {
            case 'name':
                setName(value); 
                break;
            case 'email':
                setEmail(value);
                break;
            case 'password':
                setPassword(value);
                break;
            case 'role':
                setRole(value);
                break;
            default:
                break;
        }
    }

    const handleSelectChange = (e: ChangeEvent<HTMLSelectElement>) => {
        setRole(e.target.value);
    }

    const cancelRegister = () => {
        resetErrors();
        history.push('/signin');
    }

    const isFormValid = (): boolean => {
        const nameErrorMessage: string = getNameError(name);
        const emailErrorMessage: string = getEmailError(email);
        const passwordErrorMessage: string = getPasswordError(password);

        if(nameErrorMessage) {
            setNameError(nameErrorMessage);
        } 

        if(emailErrorMessage) {
            setEmailError(emailErrorMessage);
        } 

        if(passwordErrorMessage) {
            setPasswordError(passwordErrorMessage);
        } 

        return (nameErrorMessage || emailErrorMessage || passwordErrorMessage) ? false : true;
    }

    const resetErrors = () => {
        if(error) {
            dispatch(removeRequestError());
        }
        setNameError('');
        setEmailError('');
        setPasswordError('');
    }

    return (
        <div className='background-wrapper'>
            {loading ? <Spinner /> : null}
            <div className='background-form-wrapper'>
                <h1>Register</h1>
                <form onSubmit={handleRegister}>
                    <div className='submit-error'>{error}</div>
                    <div className='input-wrapper'>
                        <label htmlFor="name">Name</label>
                        <input type='text' name='name' onChange={handleInputChange}/>
                        <span className='error'>{nameError}</span>
                    </div>
                    <div className='input-wrapper'>
                        <label htmlFor="email">Email</label>
                        <input type='text' name='email' onChange={handleInputChange}/>
                        <span className='error'>{emailError}</span>
                    </div>
                    <div className='input-wrapper'>
                        <label htmlFor="password">Password</label>
                        <input type='password' name='password' onChange={handleInputChange}/>
                        <span className='error'>{passwordError}</span>
                    </div>
                    <div className='input-wrapper'>
                        <label htmlFor="password">Role</label>
                        <select name="role" onChange={handleSelectChange}>
                            <option value='Admin'>Admin</option>
                            <option value='Owner'>Owner</option>
                            <option value='Employee'>Employee</option>
                        </select>
                    </div>
                    <div className='button-wrapper'>
                        <button className='submit' type='submit'>Register</button>
                        <button className='cancel' type='button' onClick={cancelRegister}>Cancel</button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default Register;