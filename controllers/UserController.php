<?php

require_once 'functions.php';

class UserController {

    //get endpoint /user/profile
    public function getProfile() {

        // Get logged-in user from JWT
        $user = getAuthenticatedUser();

        // Extract user_id from token
        $user_id = $user->id;

        $pdo = getPDO();

        // CALL PROCEDURE
        $sql = "CALL get_user_by_id(?)";

        // pass logged-in user id
        $params = [$user_id];

        $data = execQuery(
            $sql,
            $params,
            $pdo
        );

        // user not found
        if (empty($data)) {

            errorResponse(
                "user not found",
                404
            );
        }

        // success response
        echo json_encode([

            "status" => "success",

            "data" => $data[0]
        ]);
    }



    //update profile put endpoint /user/profile
    public function updateProfile() {

        // Get logged-in user
        $user = getAuthenticatedUser();

        // Extract user_id from JWT
        $user_id = $user->id;

        // get json input
        $data = getJsonInput();

        $pdo = getPDO();

        // optional fields
       $name = $data['full_name'] ?? null;

        $username = $data['username'] ?? null;

        $password = $data['password'] ?? null;

        // If password exists = hash
        if (!empty($password)) {

            $password = password_hash(
                $password,
                PASSWORD_DEFAULT
            );

        }

        else {

            // important for SQL IF logic
            $password = null;
        }


        // Call procedure
        $sql = "CALL update_user_profile(?, ?, ?, ?)";

        $params = [

            $user_id,

            $name,
              
            $username,

            $password
        ];

        execQuery(
            $sql,
            $params,
            $pdo
        );


        // success response
        echo json_encode([

            "status" => "success",

            "message" =>
                "Profile updated successfully"
        ]);
    }
}