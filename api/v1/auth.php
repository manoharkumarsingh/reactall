<?php
class User{
    private $connection;
    private $table_name = "employeedata";
    
    public function __construct($curd){
        $this->curd = $curd;
    }

    public function create(){
        $data = array();
        $data['fullname'] = $_POST['fullname']; 
        $data['email'] = $_POST['email']; 
        $data['mono']= $_POST['mono']; 
        $data['dob'] = $_POST['dob'];
        $data['address'] = $_POST['address'];
        $result = $this->curd->insert($data, $this->table_name);
        echo $result;
    }


   public function update(){
        $data = array();
        $data['fullname'] = $_POST['fullname']; 
        $data['email'] = $_POST['email']; 
        $data['mono']= $_POST['mono']; 
        $data['dob'] = $_POST['dob'];
        $data['address'] = $_POST['address'];
        if($_FILES){
            $data['filename'] = $_FILES['pic']['name'];
        }
        $cond = "";
        $cond = " WHERE id = ". $_POST['id'];
        $result = $this->curd->update($this->table_name, $data, $cond);
        echo  $result;
   }
    
  
    public function get(){
        $cond = "";
        if($_GET){
            $cond = " WHERE id = ". $_GET['id'];
        }
        $column = array('fullname');
        $result = $this->curd->read($this->table_name, $column, $cond);
        echo $result;
    }

    public function remove(){
       $params = $_GET;
       $cond = '';
       if(isset($_GET)){
           $cond = " WHERE fullname = '". $_GET['fullname']."'";
       }
      $result = $this->curd->delete($this->table_name, $cond);
      echo  $result;
    }
  
}

$user = new User($curd);
switch($_SERVER["REQUEST_METHOD"])
{
    case 'GET':
        $user->get();
        break;
    case 'POST':
        if(isset($_POST['id'])){
            $user->update();
        }else{
             $user->create();
            // $json = file_get_contents('php://input');
            // $data = json_decode($json,true);
        }   
        break;
    case 'DELETE':
        $user->remove();
        break;
    default:
        header("HTTP/1.0 405 Method Not Allowed");
        break;
}