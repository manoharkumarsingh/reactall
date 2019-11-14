<?php
class DBConnection {
    private $host = "localhost";
    private $username = "root";
    private $password = "root";
    private $database = "employee";
    public $connection;
    public function getConnection(){
        $this->connection = null;
        try
        {
            $this->connection = mysqli_connect($this->host,$this->username,$this->password,$this->database);
            if (!$this->connection)
            {
               throw new Exception('Unable to connect');
            }
        }
        catch(Exception $e)
        {
            echo $e->getMessage();
        }
        return $this->connection;
    }
}
?>