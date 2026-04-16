<?php 

//error response action json=> goal make GET/api/parking-slots work

function errorResponse($message, $statusCode = 400) {
    http_response_code($statusCode);

    echo json_encode ([
        "status" => "errawr!",
        "message" => $message
    ]);

    exit; //stop script execution
}

//input json from request body
function getjsoninput() {
    return json_decode (file_get_contents("php://input"), true);
}

//datase connection PDO

function getPDO() {
    //read .env file 
    $env = parse_ini_file(__DIR__ . '/config/.env');

    //datasource name(connection string)
    $dsn = "mysql:host={$env['SERVER01']};dbname={$env['DATABASE']};charset={$env['CHARSET']}";

 try {
        // Create PDO connection object
        $pdo = new PDO($dsn, $env['DBUSER'], $env['PASSWORD']);

        // Set error mode to exceptions (better debugging)
        $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

        return $pdo; // return connection

    } catch (PDOException $e) {

        // If connection fails
        errorResponse("Database connection failed", 500);
    }
}

function execQuery($sql, $params, $pdo){

    $data = []; // store results

    // Prepare SQL query (prevents SQL injection 🔐)
    $stmt = $pdo->prepare($sql);

    try {
        // Execute query with parameters
        // Example: WHERE id = ?
        $stmt->execute($params);

        // Check if query returned rows
        if($stmt->rowCount() > 0 ) {

            // fetchAll() → get all rows as array
            if($res = $stmt->fetchAll()) {
                $data = $res;
            }
        }

        // Free database resources
        $stmt->closeCursor();

    } catch (\Throwable $th) {

        // If error happens during query
        http_response_code(403);
    }

    return $data; // return result
}