<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization");

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit;
}

session_start();


require_once 'functions.php';


//GET URL REQUEST
$request = $_SERVER['REQUEST_URI'];


// GET, POST, PUT, DELETE
$method = $_SERVER['REQUEST_METHOD'];


// /api/login
$request = str_replace('/smp_backend', '', $request);

// REMOVE QUERY STRINGS

$request = strtok($request, '?');



// ROUTES


//PARKING SLOTS
if ($request === '/api/parking-slots' && $method === 'GET') {

    require_once 'controllers/ParkingSlotController.php';

    (new ParkingSlotController())->index();
}



//LOGIN
elseif ($request === '/api/login' && $method === 'POST') {

    require_once 'controllers/AuthController.php';

    (new AuthController())->login();
}



//USER PROF
elseif ($request === '/api/users/profile' && $method === 'GET') {

    require_once 'controllers/UserController.php';

    (new UserController())->getProfile();
}


// UPDATE USER PROFILE
// PUT /api/users/profile
elseif ($request === '/api/users/profile' && $method === 'PUT') {

    require_once 'controllers/UserController.php';

    (new UserController())->updateProfile();
}

//BILLING
elseif (
    preg_match('#^/api/billings/([0-9]+)$#', $request, $matches)
    && $method === 'GET'
) {

    require_once 'controllers/BillingController.php';

    (new BillingController())->getBilling($matches[1]);
}

//BOOKING
elseif (
    $request === '/api/bookings'
    &&
    $method === 'POST'
) {

    require_once 'controllers/BookingController.php';

    (new BookingController())->createBooking();
}

//ADMIN P-SLOTS
elseif (
    $request === '/api/admin/parking-slots'
    &&
    $method === 'GET'
) {

    require_once 'controllers/AdminController.php';

    (new AdminController())
        ->getParkingSlots();
}

//ADMIN BOOKINS
elseif (
    $request === '/api/admin/bookings'
    &&
    $method === 'GET'
) {

    require_once 'controllers/AdminController.php';

    (new AdminController())
        ->getBookings();
}

//ADMIN (REPORT OCCUPANCEY)
elseif (
    $request === '/api/reports/occupancy'
    &&
    $method === 'GET'
) {

    require_once 'controllers/ReportController.php';

    (new ReportController())
        ->getOccupancy();
}

//ADMIN REVENUE
elseif (
    $request === '/api/reports/revenue'
    &&
    $method === 'GET'
) {

    require_once 'controllers/ReportController.php';

    (new ReportController())
        ->getRevenue();
}
else {

    errorResponse("Route not found", 404);
}