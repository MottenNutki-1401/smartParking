<?php

// Load Composer libraries (JWT)
require_once __DIR__ . '/vendor/autoload.php';

use Firebase\JWT\JWT;
use Firebase\JWT\Key;


// JWT SECRET KEY
define(
    'JWT_SECRET',
    'SUPER_SECRET_KEY_123_VERY_SECRET_IWONT_TELL'
);




// ERROR RESPONSE
function errorResponse($message, $statusCode = 400) {

    http_response_code($statusCode);

    echo json_encode([

        "status" => "error",

        "message" => $message
    ]);

    exit;
}




// GET JSON INPUT
function getJsonInput() {

    return json_decode(
        file_get_contents("php://input"),
        true
    );
}




// DATABASE CONNECTION
function getPDO() {

    $env = parse_ini_file(
        __DIR__ . '/config/.env'
    );

    $dsn =
        "mysql:host={$env['SERVER01']};dbname={$env['DATABASE']};charset={$env['CHARSET']}";

    try {

        $pdo = new PDO(

            $dsn,

            $env['DBUSER'],

            $env['PASSWORD']
        );

        $pdo->setAttribute(
            PDO::ATTR_ERRMODE,
            PDO::ERRMODE_EXCEPTION
        );

        return $pdo;

    }

    catch (PDOException $e) {

        errorResponse(
            "Database connection failed",
            500
        );
    }
}




// EXECUTE QUERY
function execQuery(
    $sql,
    $params,
    $pdo
) {

    $data = [];

    $stmt = $pdo->prepare($sql);

    try {

        $stmt->execute($params);

        if ($stmt->rowCount() > 0) {

            if (
                $res = $stmt->fetchAll(PDO::FETCH_ASSOC)
            ) {

                $data = $res;
            }
        }

        $stmt->closeCursor();

    }

    catch (\Throwable $th) {

        http_response_code(403);
    }

    return $data;
}




// GENERATE JWT
function generateJWT($user) {

    $payload = [

        "iss" => "localhost",

        "aud" => "smp_backend",

        "iat" => time(),

        "exp" => time() + 3600,

        "data" => [

            "id" => $user['id'],

            "role" => $user['role']
        ]
    ];

    return JWT::encode(
        $payload,
        JWT_SECRET,
        'HS256'
    );
}



// VERIFY JWT
function verifyJWT() {

    $headers = getallheaders();

    if (
        !isset($headers['Authorization'])
    ) {

        errorResponse(
            "No token provided",
            401
        );
    }

    $token = str_replace(

        "Bearer ",

        "",

        $headers['Authorization']
    );

    try {

        $decoded = JWT::decode(

            $token,

            new Key(
                JWT_SECRET,
                'HS256'
            )
        );

        return $decoded->data;

    }

    catch (Exception $e) {

        errorResponse(
            "Invalid or expired token",
            401
        );
    }
}




// AUTHENTICATED USER
function getAuthenticatedUser() {

    return verifyJWT();
}




// AES-256-GCM ENCRYPT

function encryptData($plainText) {

    $env = parse_ini_file(
        __DIR__ . '/config/.env'
    );

    $cipher = "aes-256-gcm";

    $key = hex2bin(
        $env['ENCRYPTION_KEY']
    );

    $iv = random_bytes(12);

    $tag = "";

    $encrypted = openssl_encrypt(

        $plainText,

        $cipher,

        $key,

        OPENSSL_RAW_DATA,

        $iv,

        $tag
    );

    return [

        "data" =>
            base64_encode($encrypted),

        "iv" =>
            base64_encode($iv),

        "tag" =>
            base64_encode($tag)
    ];
}




// AES-256-GCM DECRYPT
function decryptData(
    $encryptedData,
    $iv,
    $tag
) {

    $env = parse_ini_file(
        __DIR__ . '/config/.env'
    );

    $cipher = "aes-256-gcm";

    $key = hex2bin(
        $env['ENCRYPTION_KEY']
    );

    $decrypted = openssl_decrypt(

        base64_decode($encryptedData),

        $cipher,

        $key,

        OPENSSL_RAW_DATA,

        base64_decode($iv),

        base64_decode($tag)
    );

    if ($decrypted === false) {

        errorResponse(
            "Decryption failed",
            500
        );
    }

    return $decrypted;
}