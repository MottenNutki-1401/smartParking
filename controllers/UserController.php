<?php

require_once 'functions.php';

class UserController {
    //get endpoint /user/profile

    public function getProfile() {

     // Get logged-in user from JWT
    $user = getAuthenticatedUser();

    //Extract user_id from token
    $user_id = $user->data->id;

    $pdo = getPDO ();

    //CALL PROCEDURE
    $sql = "CALL get_user_by_id(?)";
    $params = [$_SESSION ['user_id']];

    $data = execQuery($sql, $params, $pdo);

    if (empty($data)) {
        errorResponse ("user not found", 404);
    }

    echo json_encode([
        "status" => "success",
        "data" => $data[0]
    ]);

    }

    //update profile put endpoint /user/profile

    public function updateProfile() {

    $user = getAuthenticatedUser();
    $user_id = $user->data->id;
    $data = getJsonInput();
    $pdo = getPDO();

    $name = $data['full_name'] ?? null;
    $password = $data['password'] ?? null;

    // If password exists =hash 
    if (!empty($password)) {
        $password = password_hash($password, PASSWORD_DEFAULT);
    } else {
        $password = null; // important for SQL IF logic
    }

    // Call procedure
    $sql = "CALL update_user_profile(?, ?, ?)";
    $params = [$user_id, $name, $password];

    execQuery($sql, $params, $pdo);

    // Response
    echo json_encode([
        "status" => "success",
        "message" => "Profile updated successfully"
            ]);
        }
    }
