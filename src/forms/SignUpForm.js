import React, {useState} from 'react';
import {Form, Progress,Spinner, FormGroup, Label, Input, Button,FormText} from 'reactstrap';
import {useDispatch} from 'react-redux';
import { signup } from '../actions/user';
import { useHistory } from 'react-router-dom';

function SignUpForm(){

    const INIT = {username:'',firstname:'',lastname:'',
                email:'',photo:'',password:""};

    const [form,updateForm] = useState(INIT);

    const [loadingFile, setFileLoad] = useState(false);
    const [progressValue, setProgressValue] = useState('0');
    const [usingPhoto, setUsingPhoto] = useState(false);

    const reader = new FileReader();
    reader.addEventListener('loadend',handleLoad);

    function handleLoad(){
        updateForm(fData => ({
            ...fData,
            ['photo']:reader.result
        }));
        setProgressValue('100');
        setFileLoad(false)
    }
    const dispatch = useDispatch();

    const history = useHistory();

    const handleChange = (evt) => {
        const {name, value} = evt.target;
            if(name === 'photo'){
                setFileLoad(true);
                setUsingPhoto(true);
                setProgressValue('25');
                const file = evt.target.files[0];
                reader.readAsDataURL(file);
            }
            else{
                updateForm(fData => ({
                    ...fData,
                    [name]: value
                  }));
            }
    }

    async function handleSubmit(evt){
        evt.preventDefault();
        if(!usingPhoto || usingPhoto && progressValue==='100'){
            let res = await dispatch(signup(form));
            if(res.error){
                switch(res.error.status){
                    case '404':
                        history.push('/notfound');
                    case '500':
                        history.push('/servererror')
                }
            }
            else{
                history.push('/profile');
            }
        }
        else{
            alert('Your profile picture is almost ready')
        }
        
    }

    return(
        <>
        
        <Form id='signup-form' onSubmit={handleSubmit}>
            <FormText color='danger' style={{fontSize:'large'}}>* means it is required</FormText>
            <FormGroup>
                <Label for="username">* Username:</Label>
                <Input onChange={handleChange} type="text" name="username" id="username" required />
            </FormGroup>
            <FormGroup>
                <Label for="password">* Password:</Label>
                <Input onChange={handleChange} type="password" name="password" id="password" required />
            </FormGroup>
            <FormGroup>
                <Label for="firstname">First name:</Label>
                <Input onChange={handleChange} type="text" name="firstname" id="firstname" required/>
            </FormGroup>
            <FormGroup>
                <Label for="lastname">Last name:</Label>
                <Input onChange={handleChange} type="text" name="lastname" id="lastname" required />
            </FormGroup>
            <FormGroup>
                <Label for="email">Email:</Label>
                <Input onChange={handleChange} type="email" name="email" id="email" required />
            </FormGroup>
            <FormGroup>
                <Label for="photo">Profile Picture</Label>
                <Input onChange={handleChange} type="file" name="photo" id="photo" accept=".jpg, .jpeg, .png"/>
                <Progress style={{display: loadingFile ? 'inline-block':'none'}} value={progressValue}/>
                <span style={{display:progressValue==='100' ? 'inline-block' : 'none'}}>Photo is ready</span>
                <FormText color="muted">
                    If a photo is not provided then a default photo
                    will be set.
                </FormText>
            </FormGroup>
            <Button color='success'>Register</Button>
        </Form>
        </>
    )

}

export default SignUpForm;
