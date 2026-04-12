<?php 

//response error json

function errorResponse($message, $statusCode = 400) {
    http_response_code($statusCode);

    echo json_encode ([
        "status" => "errawr!",
        "message" => $message
    ]);

    exit;
}

//input json from request body
function getjsoninput() {
    return json_decode (file_get_contents("php://input"), true);
}




