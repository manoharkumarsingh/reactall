import React, { Component } from 'react';
import {connect} from 'react-redux';
import {  } from '../store/actionTypes';
import { USER_SELECTED,COMMENT_USER, USER_All_COMMENTS} from '../store/actionTypes';
import { userModule,commentModule } from '../api/api';
import {NavLink} from "react-router-dom";
import { alertmesage} from '../store/alertmessage';

class ProductDetail extends Component {
    constructor(props) {
        super(props);
        this.state = {
            content : {
                content:''
            },
            requiredContent:'',
            comment:'',
            id:''
        }
        this.handleComment =  this.handleComment.bind(this);
        this.handleChange =  this.handleChange.bind(this);
        this.handleDeleteComment = this.handleDeleteComment.bind(this);
        this.handleEditComment = this.handleEditComment.bind(this);
        
    }

    handleChange(){
        this.setState({
            content : {content: this.refs.content.value},
            requiredContent : ''
        }); 
    }

    async handleEditComment(commentid,comment){
 
        this.setState({
            content : {content: comment},
            id:commentid
        }); 
    }

    async handleUpdateComment(userid){
        if(this.state.content["content"]){
            await commentModule.updateComment(this.state.id,this.state.content)
            window.$('#myModal').modal('hide');
            alertmesage.createNotification("success","Commented !")
            await this.props.comments(userid)
        }else{
            this.setState({
                requiredContent : 'Comment is required *'
            });  
        }
        this.setState({
            content : {content: ''},
            id : ''
        });
    }
  
    async handleComment(userid){ 
        if(this.state.content["content"]){
            await this.props.commentUser(userid,this.state.content)
            window.$('#myModal').modal('hide');
            alertmesage.createNotification("success","Commented !")
            await this.props.comments(userid)
        }else{
            this.setState({
                requiredContent : 'Comment is required *'
            });  
        }
        this.setState({
            content : {content: ''},
            id : ''
        }); 
    }
    async componentWillMount() {
        const userid = this.props.location.state.user;
        await this.props.selectedUser(userid)
        await this.props.comments(userid)
     }

     async handleDeleteComment(comment){
        const userid = this.props.location.state.user;
        await commentModule.deleteComment(comment)
        await this.props.comments(userid)
        alertmesage.createNotification(500,"Deleted !")
      
     }

     commentDisplay(){
         return (
                this.props.usersComments ?
                  this.props.usersComments.map((comment) =>{
                      return (
                          <div className="" key={comment._id}>
                            <div className="row">
                              <div className="col-md-1">
                              <div className="w3-container">
                                  <img src="../assets/image/cuser.png" alt="Avatar" height="60" className="w3-circle"/>
                              </div>
                              </div>
                              <div className="col-md-10"> {comment.content} </div>
                              <div className="col-md-1"><span className="glyphicon glyphicon-trash pointer" onClick={()=>this.handleDeleteComment(comment._id)}></span> <span className="verticle"></span> 
                              <span className="glyphicon glyphicon-pencil pointer" onClick={()=>this.handleEditComment(comment._id,comment.content)} data-toggle="modal" data-target="#myModal"> </span></div>
                            </div> 
                            <hr></hr>
                          </div>
                      )
                  })
                  : ''
            
         )
     }

     commentModal(){
         return (
            <div className="modal fade" id="myModal" tabIndex="-1" role="dialog" aria-labelledby="myModalLabel">
            <div className="modal-dialog" role="document">
                <div className="modal-content">
                <div className="modal-header">
                    <button type="button" className="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
                    <h4 className="modal-title" id="myModalLabel">User Details</h4>
                </div>
                <div className="modal-body">
                    <div align="center"><img src="../assets/image/user.png" alt="Avatar"/></div>
                    <p><b>Title  : </b>{this.props.user[0]['title']}</p>
                    <p><b>Content  : </b>{this.props.user[0]['content']}</p>
                    <div className="form-group">
                        <label htmlFor="body">Comment : </label>
                        <input type="text" className="form-control" value={this.state.content.content} onChange={this.handleChange} ref="content" />
                        <p className="required">{this.state.requiredContent}</p>
                    </div>
                </div>
                <div className="modal-footer">
                    <button type="button" className="btn btn-default" data-dismiss="modal">Close</button>
                    {!this.state.id ?  
                        <button type="button" className="btn btn-primary" onClick={()=>this.handleComment(this.props.user[0]['_id'])}>Save changes</button> 
                        :
                        <button type="button" className="btn btn-primary" onClick={()=>this.handleUpdateComment(this.props.user[0]['_id'])}>Update</button>
                   }
                   
                   
                </div>
                </div>
            </div>
        </div>
         )
     }

    
    render(){
        if(this.props.user){
            return (
                <div className="container">
                    <div className="">
                       <div className="row">
                         <div className="col-md-2">
                            <div className="w3-container w3-center">
                                <img src="../assets/image/user.png" height="150" alt="Avatar" className="w3-circle"/>
                            </div>
                         </div>
                         <div className="col-md-9">
                            <p><b>Title  : </b>{this.props.user[0]['title']}</p>
                            <p><b>Content  : </b>{this.props.user[0]['content']}</p>
                            <div className="row">
                                <div className="col-md-4"><NavLink className="btn btn-primary" to={'/'}>Go to Home</NavLink></div>
                                <div className="col-md-4">
                                    <NavLink className="btn btn-primary"  to={{pathname :`/adduser/${this.props.user[0]['_id']}`,
                                    state :{user:this.props.user[0]['_id']}}}>
                                    Update Details
                                </NavLink>
                                </div>
                                
                                <div className="col-md-4">
                                    <button className="btn btn-primary" data-toggle="modal" data-target="#myModal" >Comment</button>
                                </div>
                            </div>
                         </div>
                       </div>
                    </div>
                    <div align="center" style={{color: 'gray'}}><h3>Comments</h3></div>
                    <hr></hr>
                    {/* comments Dispaly*/}
                      {
                          this.commentDisplay()
                         
                      }
                    {/* Modal Display */}
                      { this.commentModal()}
        
                </div>
            );
        }
        return (
            <div className="container">
               <h1>User Not Found</h1>
            </div>
        );
       
    }
    
}

function mapStateToProps(state){
    return {
        user : state.User.selectedUsers,
        addeduser:state.User.addedUsers,
        usersComments:state.Comment.allcomments.comments
    }
}
 const  mapDispatchToProps = dispatch => ({
    selectedUser: async (user) =>  dispatch({
        type: USER_SELECTED, 
        payload: await userModule.selectedUser(user)
    }),
    commentUser: async (user, comment) =>  dispatch({
        type: COMMENT_USER, 
        payload: await commentModule.commentUser(user, comment)
    }),
    comments: async (user) =>  dispatch({
        type: USER_All_COMMENTS, 
        payload: await commentModule.getComments(user)
    }),
  });

export default connect(mapStateToProps,mapDispatchToProps)(ProductDetail);