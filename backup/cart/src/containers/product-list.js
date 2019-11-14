import React, { Component } from 'react';
import {connect} from 'react-redux';
import { USER_LIST} from '../store/actionTypes';
import { userModule } from '../api/api';
import {Link} from "react-router-dom";
// import { alertmesage} from '../store/alertmessage';


class ProductList extends Component {
    constructor(props) {
        super(props);
        this.handleDeleteUser =  this.handleDeleteUser.bind(this);
        this.alertMessage = '';
    }
    
    async handleDeleteUser(userid){ 
      await userModule.deleteUser(userid)
      await this.props.allUser()
    }

    async componentWillMount() {
        await this.props.allUser()
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
        var users = Object.values(this.props.users)
        if (!this.props.users.lenght === 0) {
            return "No User Found";
        }
        return (
            <div className="userList row">
            {
                users.map((user)=>{
                    return (
                    <div className="col-md-3 userlist" key={user._id}>
                        <div className="w3-card-4">
                            <header className="w3-container w3-light-grey">
                                <h4 className="overflow">{user.title}</h4>
                            </header>
                            <div className="w3-container">
                                <img src="../assets/image/user.png" alt="Avatar" className="w3-left w3-circle"/>
                                <p className="overflow">{user.content}</p>
                            </div>
                            <div className="row btndetails">
                                <div className="col-md-6">
                                   <button className="btn btn-primary pull-right">
                                    <Link 
                                        to={{pathname :`/userdeatils/${user._id}`,
                                            state :{user:user._id}}}> View
                                    </Link>
                                    </button>
                                </div>
                                <div className="col-md-6">
                                     <button className="btn btn-danger" onClick={()=>this.handleDeleteUser(user._id)}>Delete</button>
                                </div>
                            </div>
                           
                            
                        </div>
                    </div>
                    )
                })
            }
            </div>
        )
    }
}
  function mapStateToProps(state){
    return {
        users : state.User.users
    }
}
 const  mapDispatchToProps = dispatch => ({
    allUser: async () =>  dispatch({
        type: USER_LIST, 
        payload: await userModule.getUser()
    }),
  });

export default connect(mapStateToProps,mapDispatchToProps)(ProductList);