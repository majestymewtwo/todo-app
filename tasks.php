<?php

header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');
header('Content-Type: application/json');


$dataFile = 'data.json';

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $inputData = json_decode(file_get_contents('php://input'), true);
    
    if (isset($inputData['title']) && !empty($inputData['title'])) {
        $data = json_decode(file_get_contents($dataFile), true);

        $newTask = ['title' => $inputData['title']];
        $data['tasks'][] = $newTask;

        file_put_contents($dataFile, json_encode($data, JSON_PRETTY_PRINT));

        echo json_encode(['success' => true]);
    } else {
        echo json_encode(['success' => false, 'message' => 'Invalid task data']);
    }
} else {
    echo file_get_contents($dataFile);
}
