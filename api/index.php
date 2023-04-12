<?php
// error_reporting(E_ALL);
// ini_set('display_errors', 1);
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: *");
header("Access-Control-Allow-Methods: *");

$manager = new MongoDB\Driver\Manager("mongodb://localhost:27017");
$value = json_decode(file_get_contents('php://input'));
$method = $_SERVER['REQUEST_METHOD'];

switch ($method) {
  case "GET":
    if (isset(explode('/',  $_SERVER['REQUEST_URI'])[4]) && explode('/',  $_SERVER['REQUEST_URI'])[4] == 'edit') {
      $path = explode('/',  $_SERVER['REQUEST_URI']);
      $filter = ['_id' => new MongoDB\BSON\ObjectId($path[3])];
    } else {
      $filter = [];
    }
    $query = new MongoDB\Driver\Query($filter);
    $cursor = $manager->executeQuery('test.user', $query);
    foreach ($cursor as $document) {
      $data[] = (array)$document;
    }
    if(isset($data)){
      echo json_encode($data);
    }else{
      echo json_encode(['message' => 'Please Add User']);
    }
    break;

    case "POST":
      $bulk = new MongoDB\Driver\BulkWrite;
      $doc = array(
        'name' => $value->name,
        'email' => $value->email,
        'password' => $value->password,
      );
      $bulk->insert($doc);
      $result = $manager->executeBulkWrite('test.user', $bulk);
      if ($result->getInsertedCount() > 0) {
        $response = ['status' => 1, 'message' => 'Record Successfully Inserted'];
      } else {
        $response = ['status' => 0, 'message' => 'Failed to create record'];
      }
      echo json_encode($response);
      break;

    case "PUT":
      $id = (array)$value->_id;
      $bulk = new MongoDB\Driver\BulkWrite;
      $bulk->update(
        ['_id' => new MongoDB\BSON\ObjectId($id['$oid'])],
        ['$set' => ['name' => $value->name, 'email' => $value->email, 'password' => $value->password]],
        ['multi' => true, 'upsert' => false]
      );
      $result = $manager->executeBulkWrite('test.user', $bulk);
      if ($result->getInsertedCount() > 0) {
        $response = ['status' => 1, 'message' => 'Record Successfully Updated'];
      } else {
        $response = ['status' => 0, 'message' => 'Failed to Updated Record'];
      }
      echo json_encode($response);
      break;

      case "DELETE":
      $id = explode('/',  $_SERVER['REQUEST_URI'])[3];
      // exit;
      $bulk = new MongoDB\Driver\BulkWrite;
      $bulk->delete(['_id' => new MongoDB\BSON\ObjectId($id)]);
      $result = $manager->executeBulkWrite('test.user', $bulk);
      if ($result->getInsertedCount() > 0) {
        $response = ['status' => 1, 'message' => 'Record Successfully Deleted'];
      } else {
        $response = ['status' => 0, 'message' => 'Failed to Delete Record'];
      }
      echo json_encode($response);
      break;
}
