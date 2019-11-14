import React, { Component } from 'react';
import {connect} from 'react-redux';
import { ADD_USER,UPDATE_USER} from '../store/actionTypes';
import { userModule} from '../api/api';
import { alertmesage} from '../store/alertmessage';

class Adduser extends Component {
    constructor(props) {
        super(props);
        this.state = {
            _id :  '',
            title : '',
            content : '',
            file : '../assets/image/dummy.jpg'
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmitForm =  this.handleSubmitForm.bind(this);
        this.handleUpdateUser =  this.handleUpdateUser.bind(this);
        this.handleChangeImage = this.handleChangeImage.bind(this);
        this.alertMessage = '';
    }
    handleChange(event) {
        this.setState({
            title : this.refs.title.value,
            content : this.refs.body.value
        });      
    }

    handleChangeImage(event){
      this.setState({file: URL.createObjectURL(event.target.files[0])})
    }

    async componentWillMount() {
        if(this.props.location.state){
            this.setState({
                _id :  this.props.location.state ? this.props.location.state.user : '',
                title : this.props.selecteduser[0]['title'] ? this.props.selecteduser[0]['title'] : '',
                content : this.props.selecteduser[0]['content'] ? this.props.selecteduser[0]['content'] : ''
            });
        }
     }

     async handleDeleteUser(userid){ 
        await userModule.deleteUser(userid)
        await this.props.allUser()
      }
    
    componentWillReceiveProps(props) {    
        if(!props.location.state){
            this.setState({
                _id :  '',
                title : '',
                content : ''
            });
        }
    }

    async handleUpdateUser(){
        await this.props.updateuser(this.state);
        if( this.props.addeduser){
           alertmesage.createNotification("success","User "+this.props.addeduser.data.title+" Updated")
         this.setState({
             title : '',
             content : ''
           });
         this.props.history.push("/");
       }else{
           alertmesage.createNotification("error","OOPS something went wrong !")
       }
    }
   
    async handleSubmitForm(event){
       event.preventDefault();
       await this.props.adduser(this.state)
       var status = this.props.addeduser.status;
       alertmesage.createNotification(status,"User "+this.props.addeduser.data.title+" created ")
       if( this.props.addeduser){
        this.setState({
            title : '',
            content : ''
          });
        this.props.history.push("/");
      }
     
    }
  
    render(){
        return(
            <div className="container">
              <div className="row">
               <div className="col-md-2"></div>
               <div className="col-md-8 well">
                    <form onSubmit={this.handleSubmitForm}>
                        <div className="form-group">
                            <label htmlFor="title">Title</label>
                            <input type="text" className="form-control" value={this.state.title} onChange={this.handleChange} ref="title"/>
                        </div>
                        <div className="form-group">
                            <label htmlFor="body">Body</label>
                            <input type="text" className="form-control" value={this.state.content} onChange={this.handleChange} ref="body"/>
                        </div>
                        
                        <div className="form-group">
                          <img src={this.state.file} className="img-circle userImage"  />
                          <input type="file" onChange={this.handleChangeImage} ref="img" />
                         
                        </div>
                        
                        <div className='row'>
                           <div className="col-md-4"></div>
                           {
                               this.state._id !== '' ?  
                               <div className="col-md-4">
                                    <button type="button" onClick={this.handleUpdateUser} className="btn btn-primary pull-right">Update</button>
                               </div> 
                                :  
                              <div className="col-md-4"> 
                                 <button type="button" onClick={this.handleSubmitForm} className="btn btn-primary">Submit</button>
                              </div>
                           }
                           <div className="col-md-4"></div>
                           
                        </div>
                    </form>
                </div>
                <div className="col-md-2"></div>
              </div>
            </div>
        );
    }
}

function mapStateToProps(state){
    return {
        addeduser:state.User.addedUsers,
        selecteduser:state.User.selectedUsers
    }
}
const  mapDispatchToProps = dispatch => ({
    adduser: async (userdetails) =>  dispatch({
        type: ADD_USER, 
        payload: await userModule.addUser(userdetails)
    }),

    updateuser: async (userdetails) =>  dispatch({
        type: UPDATE_USER, 
        payload: await userModule.updateUser(userdetails)
    })
  });

export default connect(mapStateToProps,mapDispatchToProps)(Adduser);