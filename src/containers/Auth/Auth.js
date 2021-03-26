import React, {Component} from 'react';
import {connect} from 'react-redux';
import Input from '../../components/UI/Input/Input';
import Button from '../../components/UI/Button/Button';
import classes from './Auth.css';
import * as actions from '../../store/actions/index';

class Auth extends Component{
    state ={
        controls: {
            email:{
                elementType:'input',
                elementConfig:{
                    type: 'email',
                    placeholder : 'Mail Address'
                },
                value: '',
                validation:{
                    required:true,
                    isEmail: true
                },
                valid:false,
                touched:false

            },
            password:{
                elementType:'input',
                elementConfig:{
                    type: 'password',
                    placeholder : 'Password'
                },
                value: '',
                validation:{
                    required:true,
                    minLength: 6
                },
                valid:false,
                touched:false

            }
        }
    }
    
    checkValidity(value, rules){
        let isValid = true;

        if (rules.required){
            isValid = value.trim() !== '' && isValid;
        }
        if(rules.minlength){
            isValid = value.length >= rules.minlength && isValid
        }
        if(rules.maxlength){
            isValid = value.length <= rules.maxlength && isValid
        }
        return isValid;
    }
    inputChangedhandler =(event, controlName)=>{
        const updatedControls ={
            ...this.state.controls,
            [controlName]: {
                ...this.state.controls[controlName],
                value: event.target.value,
                valid:this.checkValidity(event.target.value, this.state.controls[controlName]. validation),
                touched:true
            }
        };
        this.setState({controls:updatedControls});
    }
    submitHandler = (event) => {
        event.preventDefault();
        this.props.onAuth(this.state.controls.email.value, this.state.controls.password.value );
    }
    render(){
        const formElementArray =[];
        for (let key in this.state.controls){
            formElementArray.push({
                id:key,
                config: this.state.controls[key]
            });
        }

        const form = formElementArray.map(formElement =>(
            <Input 
                key={formElement.id}
                elementType={formElement.config.elementType} 
                        elementConfig={formElement.config.elementConfig}
                        value={formElement.config.value} 
                        invalid={!formElement.config.valid}
                        shouldValidate={formElement.config.validation}
                        touched={formElement.config.touched}
                        changed={(event)=>this.inputChangedhandler(event, formElement.id)} /> 
        ));

        return(
            <div className ={classes.Auth}>
                <form onSubmit={this.submitHandler}>
                    {form}
                    <Button btnType = 'Success'>SUBMIT</Button>
                </form>
            </div>
        );

    }
}

const mapDispatchToProps = dispatch =>{
    return{
        onAuth: (email, password) => dispatch (actions.auth(email,password))
    };
};

export default connect(null,mapDispatchToProps)(Auth);