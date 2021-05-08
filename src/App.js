import React, { Component } from 'react';
import './App.css';

class App extends Component {

  state ={
    username:'',
    email:'',
    password:'',
    accept: false,
    message:'',

    errors: {
      username: true,
      email: true,
      password: true,
      accept: true,
  

    }
  }


  messages ={
    username_incorrect: 'U cannot use space beetwen letters',
    email_incorrect: 'U must use @',
    password_incorrect:'Password must be at least 6 long',
    accept_incorrect: 'Agred must be confirmed ',
  }

  handleChange =(e) =>{

    const name = e.target.name;
    const type = e.target.type;
    const value = e.target.value;
    const checked = e.target.checked;
    if(type ==="text" || type === "password" || type === "email") {

      this.setState({
        [name]: value
      
      })

    }else if( type === "checkbox"){
      this.setState({
        [name]: checked
      })
    }
  }
  handleSubmint = (e) =>{
    e.preventDefault()
    const validation = this.formValidation()
    if(validation.correct){
      this.setState({
        username: '',
        email: '',
        password: '',
        accept: false,
        message: 'User Saved',
    
        errors: {
          username: false,
          email: false,
          password: false,
          accept: false,
      
      }
    })
    
  }else {
  
    this.setState({
      errors: {
        username: !validation.username,
        email: !validation.email,
        password: !validation.password,
        accept: !validation.accept,
    
  
      }
    })

  }

  }
  formValidation =() =>{
    let username = false;
    let email = false;
    let password = false;
    let accept = false;
    let correct = false;

    if(this.state.username.indexOf(' ') === -1){
      username =true;
    }
    if(this.state.email.indexOf('@') !== -1){
      email =true;
    }
    if(this.state.password.length > 6 ){
      password =true;
    }
    if(this.state.accept){
      accept= true;
    }
    if(username && email && password && accept) {
      correct = true;
    }
    return({
      correct,
      username,
      email,
      password,
      accept,
    })
  }
  
  componentDidUpdate(){
    if(this.state.message !== ''){
      setTimeout(() => this.setState({
        message: '',
      }), 3000)
    }
  }

  render() { 
    return ( 
      
      <div className="form">
       
        
        <form onSubmit={this.handleSubmint} noValidate>
        <h1 >Validation Page</h1>

          <label htmlFor="user">Your Name:
            <input type="text" id="user" name="username" value={this.state.username} onChange={this.handleChange} />
            {this.state.errors.username && <span>{this.messages.username_incorrect}</span>}
          </label>

          <label htmlFor="email">Your e-mail:
            <input type="email" id="email" name="email" value={this.state.email} onChange={this.handleChange} />
            {this.state.errors.email && <span>{this.messages.email_incorrect}</span>}
          </label>
          <label htmlFor="password">Password:
            <input type="password" id="password" name="password" value={this.state.password} onChange={this.handleChange} />
            {this.state.errors.password && <span>{this.messages.password_incorrect}</span>}
          </label>

          <label htmlFor="accept">
            <input type="checkbox" id="accept" name="accept" checked={this.state.accept} onChange={this.handleChange}/> Agred
           {this.state.errors.accept && <span>{this.messages.accept_incorrect}</span>}
          </label>
          <br/>
          

          <button className="btn">Save User</button>
          <br/>
          {this.state.message && <h3>{this.state.message}</h3>}

        </form>
       
        
      </div>
     );
  }
}
 
export default App;
