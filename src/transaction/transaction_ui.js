import React, { Component } from 'react';
import {pay} from '../authentication/userFunctions';
import Cookies from 'js-cookie';

export default class transaction extends Component {
    constructor(props){
        super(props);
        this.state= {amount: ''};
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }


    handleChange(event){
        this.setState({[event.target.name]: event.target.value});
    }

    handleSubmit(event){
        if(Cookies.get('usertoken')){
            const add_money = {
                amount: this.state.amount,
                token: Cookies.get('usertoken')
            }           
            console.log(Cookies.get('usertoken'));
            pay(add_money)
            .then(res =>{
                if (res.status){
                console.log(res.data)
                }          
                else{
                console.log(res.error)
                }
            })
            .catch(err =>{
                console.log('error:-' + err)
            })
        }
        else{
            alert("No token exist please login")
        }
        event.preventDefault();
    }

    render(){
        return(
            <div><br/>
                <p>
                <form onSubmit= {this.handleSubmit}>
                <label>
                    amount:- 
                    <input type= "text" name="amount" value={this.state.amount} onChange={this.handleChange} />
                </label>
                    <button type="submit" value="submit">ADD MONEY</button>
                </form>
                </p>
            </div>
        )
    }

}