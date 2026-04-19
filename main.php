<?php

// Start session (for login later)
session_start();

// Load helper functions
require_once 'functions.php';


// Get request URL (e.g., /api/parking-slots)
$request = $_SERVER['REQUEST_URI'];

// Get request method (GET, POST, etc.)
$method = $_SERVER['REQUEST_METHOD'];


// Remove project folder from URL
// Example: /smp_backend/api/... → /api/...
$request = str_replace('/smp_backend', '', $request);

// Remove query string (?id=1 etc.)
$request = strtok($request, '?');



// ROUTING

// If user requests: GET /api/parking-slots
if ($request === '/api/parking-slots' && $method === 'GET') {

    // Load controller file
    require_once 'controllers/ParkingSlotController.php';

    // Call controller method
    (new ParkingSlotController())->index();
}


// If no route matches
else {
    errorResponse("Route not found", 404);
}