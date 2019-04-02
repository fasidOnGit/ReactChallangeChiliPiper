import React, {Component} from 'react';
import {PropTypes} from 'prop-types';

class Form extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isEmailValid: false,
            isNameValid: false,
            isPhoneValid: false,
            isUrlValid: false,
            formObj: {
                name: "",
                email: "",
                phone: "",
                url: ""
            }
        };

        this.isFormValid = this.isFormValid.bind(this);
        this.onChange = this.onChange.bind(this);

    }

    checkEmailValid() {
        const email = this.state.formObj.email;
        if(typeof email !== "undefined"){
            let lastAtPos = email.lastIndexOf('@');
            let lastDotPos = email.lastIndexOf('.');

            if (!(lastAtPos < lastDotPos && lastAtPos > 0 && email.indexOf('@@') == -1 && lastDotPos > 2 && (email.length - lastDotPos) > 2)) {
                this.setState({isEmailValid: false});
                return;
            } else {
                this.setState({isEmailValid: true});
            }
        }   
    }

    checkNameValid() {
        const name = this.state.formObj.name;
        if(typeof name === 'string') {
            if(name.length < 3 || name.length > 30) {
                this.setState({isNameValid: false});
            } else if(name.length >= 3 && name.length <= 30) {
                if(!name.match(/^[a-zA-Z]+$/)){
                    this.setState({isNameValid: false});
                } else {
                    this.setState({isNameValid: true});
                } 
            }
        } else {
            this.setState({isNameValid: false});
        }
    }
    
    checkPhoneValid() {
        const phone = this.state.formObj.phone;
        if(typeof phone === 'string') {
            const noValid = ["0", "1"];
            if(noValid.indexOf(phone[0]) == -1) {
                if(phone.match(/^\d{10}$/)) {
                    this.setState({isPhoneValid: true});
                } else {
                    this.setState({isPhoneValid: false});
                }
            } else {
                this.setState({isPhoneValid: false});
            }
        } else {
            this.setState({isPhoneValid: false});
        }
    }

    checkUrlValid() {
        const url = this.state.formObj.url;
        if(typeof url === 'string') {
            const re=/^((https?|ftp|smtp):\/\/)?(www.)?[a-z0-9]+(\.[a-z]{2,}){1,3}(#?\/?[a-zA-Z0-9#]+)*\/?(\?[a-zA-Z0-9-_]+=[a-zA-Z0-9-%]+&?)?$/;
            if(url && url.match(re)) {
                this.setState({isUrlValid: true});
            } else {
                this.setState({isUrlValid: false});
            }
        } else {
            this.setState({isUrlValid: false});
        }
    }

    isFormValid(e) {
        e.stopPropagation();
        this.checkEmailValid()
        this.checkNameValid()
        this.checkUrlValid()
        this.checkPhoneValid()
         if(this.state.isEmailValid && this.state.isNameValid && this.state.isPhoneValid && this.state.isUrlValid){
            this.props.message = 'Form is Complete!'
         } else {
            this.props.message = 'Form is Incomplete!'
         }
    }
    onChange(event) {
        const field = event.target.name;
        let formObj = Object.assign({}, this.state.formObj);
        formObj[field] = event.target.value;
        return this.setState({formObj:formObj});
    }
    render() {
        return (
            <div className="row">
            <h1 className="text-center">Form Validation</h1>
            <form>
                <h3>Name:
                </h3>
                <input type="text" value={this.state.formObj.name} onChange={this.onChange} name="name"></input>
                <h3>Email:
                </h3>
                <input type="text" value={this.state.formObj.email} onChange={this.onChange} name="email"></input>
                <h3>Phone:
                </h3>
                <input type="text" value={this.state.formObj.phone} onChange={this.onChange} name="phone"></input>
                <h3>Blog URL:
                </h3>
                <input type="text" value={this.state.formObj.url} onChange={this.onChange} name="url"></input>
                <div className="small-6 small-centered text-center columns">
                    <a href="#" className="button success expand round text-center" onChange={this.isFormValid}>Verify</a>
                </div>
                {this.props.message}
            </form>
        </div>);
    }
}

export default Form;
