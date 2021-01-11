import React,{useState, useEffect} from 'react';
import { useSelector } from 'react-redux';
import axios from 'axios';
import {Form,FormGroup,Label,Input,Button, Col, Progress} from 'reactstrap';
import { useHistory } from 'react-router-dom';

function OptionForm({stock}){

    //TODO: ensure only whole numbers for qty. use onInput={} 

    const BASE_API_URL = process.env.REACT_APP_BASE_URL || "http://localhost:3001";
    const token = useSelector(state => state.user.token);
    const username = useSelector(state => state.user.username);
    const history = useHistory();

    const [form, updateForm] = useState({o_type:"",eTime:"",end_date:"",amount:'',target:""});

    const [currentDate, setCurrentDate] = useState("") 
    const [currentTime,setCurrentTime] = useState("");
    useEffect(()=>{
        
        //formats date and time
        function setDateAndTime(){
            let date = new Date();
            let d = date.toLocaleDateString();
            
            let arr = d.split('/');
            if(arr[0].length < 2){
                arr[0] = '0' + arr[0]
            }
            if(arr[1].length < 2){
                arr[1] = '0' + arr[1]
            }
            d = `${arr[2]}-${arr[0]}-${arr[1]}`;
            setCurrentDate(d);
            let t = date.toLocaleTimeString();
            arr = t.split(':');
            if(arr[0].length < 2){
                arr[0] = '0' + arr[0]
            }
            if(arr[1].length < 2){
                arr[1] = '0' + arr[1]
            }
            setCurrentTime(arr[0] + ":" + arr[1]);
            updateForm(fData =>({
                ...fData,['end_date']:d
            }));
        }
        setDateAndTime();
    },[])
    

    function getDisplayableTime(){
        let arr = currentTime.split(':');
        //return '00:00';
        //return arr[0] + ':' + arr[1];
    }

    const handleChange = (evt) => {
        let {value, name} = evt.target;
        if(name === 'target' || name === 'amount'){
            value = Number(value);
        }
        updateForm(fData => ({
            ...fData,
            [name]:value
        }))
    }
    function formatDate(info){
        let d = new Date(info.end_date + 'T' + info.eTime);
        
        return d.getTime();
    }
    async function handleSubmit(evt){
        //before submitting must combine eTime and end_date
        //into a time stamp;
        evt.preventDefault();

        let formattedDate = formatDate({...form});

        let body = {amount:form.amount,type:form.type,target:form.target,
        end_date:formattedDate,symbol:stock.symbol};

        let res = await axios.post(`${BASE_API_URL}/options/${form.o_type}/${stock.symbol}/${username}?_token=${token}`,body)
        if(res.status === 201){
            let location = {pathname:'/options/success',state:{...form,...stock}}
            
            history.push(location);
        }
    }
    /** use current price, allow user to buy shares, display total price */
    return(
        <Form onSubmit={handleSubmit} style={{}}>
            <h6>Place Option</h6>
            <FormGroup>
                <Label for='o_type'>Type:</Label>
                <Input onChange={handleChange} type='select' id='o_type' name='o_type' required>
                    <option></option>
                    <option>short</option>
                    <option>put</option>
                </Input> 
            </FormGroup>
            <FormGroup>
                <Label for='end_date'>End Date: </Label>
                <Input onChange={handleChange} type='date' id='end_date' name='end_date' 
                min={currentDate} defaultValue={currentDate} required/>
            </FormGroup>
            <FormGroup>
                <Label for='eTime'>End Time: </Label>
                <Input onChange={handleChange} type='time' id='eTime' name='eTime' 
                min={currentDate === form.end_date ? currentTime : "0:00"} required />
            </FormGroup>
            <FormGroup>
                <Label for='target'>Target: </Label>
                <Input onChange={handleChange} type='number' id='target' name='target' min="0" step="0.01" required />
            </FormGroup>
            <FormGroup>
                <Label for='amount'>Amount: $</Label>
                <Input onChange={handleChange} type='number' id='amount' name='amount' min="0" step="0.01" required />
            </FormGroup>
            <Button color='success'>Place Option</Button>
        </Form>
    )

}

export default OptionForm;