<?php
class Curd{
   
    public function __construct($connection){
        $this->connection = $connection;
    }
    public function cors() {
        if (isset($_SERVER['HTTP_ORIGIN'])) {
            header("Access-Control-Allow-Origin: {$_SERVER['HTTP_ORIGIN']}");
            header('Access-Control-Allow-Credentials: true');
            header('Access-Control-Max-Age: 86400');    // cache for 1 day
        }


        if ($_SERVER['REQUEST_METHOD'] == 'OPTIONS') {
            if (isset($_SERVER['HTTP_ACCESS_CONTROL_REQUEST_METHOD']))
                header("Access-Control-Allow-Methods: GET, POST, OPTIONS");         
            if (isset($_SERVER['HTTP_ACCESS_CONTROL_REQUEST_HEADERS']))
                header("Access-Control-Allow-Headers: {$_SERVER['HTTP_ACCESS_CONTROL_REQUEST_HEADERS']}");

            exit(0);
        }
    }

    public function insert($params,$table)
    {
        $data ="";
        $column = "";
        $i= 0;
        if(isset($params['filename'])){
            /**Adding file in folder*/
            $target = "../public/img/".basename($params['filename']);
        }
        foreach ($params as $key => $value) {
            $column .= "$key";
            $data .= "'$value'";
            if(count($params)-1 !== $i){
                $column .= ", ";
                $data .= ", ";
            }
            $i++;
        }
        $sql = "INSERT INTO ".$table. " ( ".$column. " ) VALUE (" .$data. ")" ;
        $result =  mysqli_query($this->connection,$sql);
        
        /**Fetching Inserted Data */
        $response = array();
        if($result == 1){
            $sql = "SELECT * FROM ".$table." WHERE id = LAST_INSERT_ID()";
            $result =  mysqli_query($this->connection,$sql);
             if ($result) {
                while($row = mysqli_fetch_assoc($result)) {
                    array_push($response, $row);
                }
                return json_encode($response);
            }
        }else{
            return -1;
        }
    }
    
    public function update( $table, $params, $cond ='' )
    {
        $column = "";
        $i= 0;
        if(isset($params['filename'])){
            /**Adding/updating file in folder*/
            $target = "../public/img/".basename($params['filename']);
        }
        foreach ($params as $key => $value) {
            $column .= "$key = '$value'";
            if(count($params)-1 !== $i){
                $column .= ", ";
            }
            $i++;
        }
        $sql = "UPDATE ".$table." SET $column ". $cond;
        $result = mysqli_query($this->connection,$sql);
        /**Fetching Updated Data */
        $response = array();
        if($result == 1){
            $sql = "SELECT * FROM ".$table.''.$cond;
            $result =  mysqli_query($this->connection,$sql);
             if ($result) {
                while($row = mysqli_fetch_assoc($result)) {
                    array_push($response, $row);
                }
                return json_encode($response);
            }
        }else{
            return -1;
        }    
    }

    public function read($table, $column, $cond ='' )
    {
        $field = "";
        if(count($column) > 0){
            $i= 0;
            foreach ($column as $value) {
                $field .= "$value";
                if(count($column)-1 !== $i){
                     $field .= ", ";
                }
                $i++;
            }
        }
        else{
             $field = "*";
        }

        $data = array();
        $sql = "SELECT $field  FROM ".$table. " $cond ";
        $result = mysqli_query($this->connection,$sql);
        if ($result) {
            while($row = mysqli_fetch_assoc($result)) {
                array_push($data, $row);
            }
            return json_encode($data);
        } else {
            echo "0 results";
        }
    }
    
    public function delete($table, $cond ='')
    {
        $sql = "DELETE FROM ".$table."".$cond;
        $result = mysqli_query($this->connection,$sql);
        return $result;
    }

}
?>