var axios = require('axios')
var ES6Promise = require('es6-promise')
ES6Promise.polyfill()
const ApiService = {
    get( apiurl) {
      return axios.get(apiurl)
      .then(response => {
          return response.data
        })
        .catch(response => {
            return response.data
        })
    },

    post( apiurl,bodyFormData) {
        return axios.post(apiurl,bodyFormData)
        .then(response => {
            return response
          })
        .catch(err => console.log(err))
    },


    put( apiurl,bodyFormData) {
        return axios.put(apiurl,bodyFormData)
        .then(response => {
            return response
          })
        .catch(err => console.log(err))
    },
    delete( apiurl,bodyFormData) {
        return axios.delete(apiurl)
        .then(response => {
            return response
          })
        .catch(err => console.log(err))
    }
}
  export default ApiService



export const userModule = {
  getUser() {
    return ApiService.get( 'http://localhost:4600/posts/' )
  },
  selectedUser(user) {
    return ApiService.get( 'http://localhost:4600/posts/'+user)
  },

  addUser(user) {
    return ApiService.post( 'http://localhost:4600/posts/',user)
  },

  updateUser(user) {
    return ApiService.put( 'http://localhost:4600/posts/'+user['_id'],user)
  },

  deleteUser(user) {
    return ApiService.delete( 'http://localhost:4600/posts/'+user)
  }
}

export const commentModule = {
    commentUser(user,comment) {
        return ApiService.post( 'http://localhost:4600/posts/'+user+'/comment',comment)
      },
    getComments(user){
        return ApiService.get( 'http://localhost:4600/posts/'+user+'/comment')
    },
    deleteComment(comment){
        return ApiService.delete( 'http://localhost:4600/posts/comment/'+comment)
    },
    updateComment(comment,data){
        return ApiService.put( 'http://localhost:4600/posts/comment/'+comment,data)
    }
  
  }
