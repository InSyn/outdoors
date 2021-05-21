<?php

include_once ('curl.php');
include_once ('simple_html_dom.php');

header('Access-Control-Allow-Origin: *');

$c = curl::app('http://62.213.36.254:8000')
    ->set(CURLOPT_HEADER, 1);

$data = $c->request(
    'api/v1/stations'
);

$dom = str_get_html($data['html']);

echo json_encode($data, JSON_THROW_ON_ERROR | JSON_UNESCAPED_UNICODE, 512);