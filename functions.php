<?php 

// Load Composer libraries (JWT)
require_once __DIR__ . '/vendor/autoload.php';

use Firebase\JWT\JWT;
use Firebase\JWT\Key;


function errorResponse($message, $statusCode = 400) {
    http_response_code($statusCode);

    echo json_encode([
        "status" => "error",
        "message" => $message
    ]);

    exit; 
}



function getJsonInput() {
    return json_decode(file_get_contents("php://input"), true);
}


//db connection = pdo
function getPDO() {

    // read .env file
    $env = parse_ini_file(__DIR__ . '/config/.env');

    // connection string
    $dsn = "mysql:host={$env['SERVER01']};dbname={$env['DATABASE']};charset={$env['CHARSET']}";

    try {
        $pdo = new PDO($dsn, $env['DBUSER'], $env['PASSWORD']);

        // show errors 
        $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

        return $pdo;

    } catch (PDOException $e) {
        errorResponse("Database connection failed", 500);
    }
}


function execQuery($sql, $params, $pdo) {

    $data = [];

    $stmt = $pdo->prepare($sql);

    try {
        $stmt->execute($params);

        //PDO::FETCH_ASSOC => return column names only +no numeric indexes
        if ($stmt->rowCount() > 0) {
            if ($res = $stmt->fetchAll(PDO::FETCH_ASSOC)) {
                $data = $res;
            }
        }

        $stmt->closeCursor();

    } catch (\Throwable $th) {
        http_response_code(403);
    }

    return $data;
}


//secret key encryption
function generateJWT($user) {

    $secret_key = "SUPER_SECRET_KEY_123_VERY_SECRET_IWONT_TELL";

    $payload = [
        "iss" => "localhost",
        "aud" => "smp_backend",
        "iat" => time(),
        "exp" => time() + 3600, // 1 hour expiration
        "data" => [
            "id" => $user['id'],
            "role" => $user['role']
        ]
    ];

    return JWT::encode($payload, $secret_key, 'HS256');
}


//verify jwt (protected routes)
function verifyJWT() {

    $secret_key = "SUPER_SECRET_KEY_123";

    $headers = getallheaders();

    // Check if Authorization header exists
    if (!isset($headers['Authorization'])) {
        errorResponse("No token provided", 401);
    }

    // Remove "Bearer " from token
    $token = str_replace("Bearer ", "", $headers['Authorization']);

    try {
        $decoded = JWT::decode($token, new Key($secret_key, 'HS256'));

        return $decoded->data;

    } catch (Exception $e) {//
        errorResponse("Invalid or expired token", 401);
    }
}