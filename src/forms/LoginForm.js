import React, {useState} from 'react';
import {Form, FormGroup, Label, Input, Button} from 'reactstrap';
import {useDispatch } from 'react-redux';
import {useHistory} from 'react-router-dom';
import {login} from '../actions/user';

function LoginForm(){

    const dispatch = useDispatch();
    const history = useHistory();

    const INIT = {username:"",password:""};
    const [form,updateForm] = useState(INIT);
    const [loginError, setLoginError] = useState(false);

    const handleChange = (evt) => {
        const {name, value} = evt.target;
        updateForm(fData => ({
            ...fData,
            [name]:value
        }))
    }

    async function handleSubmit(evt){
        evt.preventDefault();
        let res = await dispatch(login(form));
        if(res.error){
            //will add some error handling
            setLoginError(true);
        }
        else{
            //let user = res;
            window.localStorage.setItem('user',JSON.stringify(res));
            //window.localStorage.setItem('user', JSON.stringify({...user.user,token:user.token}));
            history.push('/profile');
        }
    }

    return(
        <>
        <p style={{color:'red',display:loginError ? 'inline' : 'none'}}>Invalid username and/or password</p>
        <Form onSubmit={handleSubmit}>
            <FormGroup>
                <Label for='username'>Username: </Label>
                <Input onChange={handleChange} type='text' id='username' name='username' required />
            </FormGroup>
            <FormGroup>
                <Label for='password'>Password</Label>
                <Input onChange={handleChange} type='password' id='password' name='password' required />
            </FormGroup>
            <Button color='primary'>Login</Button>
        </Form>
        </>
    )

}
export default LoginForm;