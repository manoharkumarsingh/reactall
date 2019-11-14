<?php
class Response{
     public function response($data = null, $code = null, $message){
        $response = array();
        switch($code){
            case 200:
            case 201:
                //Resources created
                $response['data'] = $data;
                $response['code'] = $code;
                $response['success'] = true;
                $response['message'] = $message;
                return json_encode($response);   

            case 400:
                //The server could not understand the request due to invalid syntax.
                $response['data'] = $data;
                $response['code'] = $code;
                $response['message'] = $message;
                return json_encode($response); 
            
            case 401:
                //Unauthorized
                $response['data'] = $data;
                $response['code'] = $code;
                $response['message'] = $message;
                return json_encode($response); 

            case 404:
            // /404 Not Found
              $response['data'] = $data;
              $response['code'] = $code;
              $response['message'] = $message;
              return json_encode($response); 

            case 500:
             $response['error'] = $data;
             $response['code'] = $code;
             $response['message'] = $message;
            //500 Internal Server Error
            
            case 503:
            //Service Unavailable  
        }
       
    }
}
?>