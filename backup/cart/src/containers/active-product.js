import React, { Component } from 'react';
import {connect} from 'react-redux';
import { USER_SELECTED } from '../store/actionTypes';
import { userModule } from '../api/api';
import {NavLink} from "react-router-dom";


class ProductDetail extends Component {
    async componentWillMount() {
        const userid = this.props.location.state.user;
        await this.props.selectedUser(userid)
     }
     componentDidMount() {
        
     }
     componentWillReceiveProps(newProps) {    
        
     }
     shouldComponentUpdate(newProps, newState) {
        return true;
     }
     componentWillUpdate(nextProps, nextState) {
      
     }
     componentDidUpdate(prevProps, prevState) {
       
     }
     componentWillUnmount() {
        
     }
    render(){
        if(this.props.user.length){
            return (
                <div className="container">
                    <div className="well">
                        <div className="w3-container w3-center">
                            <img src="../assets/image/user.png" alt="Avatar" className="w3-circle"/>
                        </div>
                        <p><b>Title  : </b>{this.props.user[0]['title']}</p>
                        <p><b>Content  : </b>{this.props.user[0]['content']}</p>
                        <div className="row">
                            <div className="col-md-6"><div className="w3-center pull-right"><NavLink className="btn btn-primary pull-right" to={'/'}>Go to Home</NavLink></div></div>
                            <div className="col-md-6">
                                <NavLink className="btn btn-primary"  to={{pathname :`/adduser/${this.props.user[0]['_id']}`,
                                state :{user:this.props.user[0]['_id']}}}>
                                Update Details
                            </NavLink>
                            </div>
                        </div>
                        
                        
                    </div>
                
                </div>
            );
        }
        return (
            <div className="container">
               <h1></h1>
            </div>
        );
       
    }
    
}

function mapStateToProps(state){
    return {
        user : state.User.selectedUsers,
        addeduser:state.User.addedUsers
    }
}
 const  mapDispatchToProps = dispatch => ({
    selectedUser: async (user) =>  dispatch({
        type: USER_SELECTED, 
        payload: await userModule.selectedUser(user)
    })
  });

export default connect(mapStateToProps,mapDispatchToProps)(ProductDetail);