<?php

header('Access-Control-Allow-Origin: *');

$obj = [[  phone=> 79995553535,
                     messenger=> "telegram",
                     will_participate=> true,
                     candidate=> "КПРФ",
                     sex=> 1,
                     age=> "25-35",
                     living_place=> "Красноярск",
                   ],[  phone=> 79995553535,
  messenger=> "whatsapp",
  will_participate=> true,
  candidate=> "Справедливая Россия",
  sex=> 0,
  age=> "18-25",
  living_place=> "Потёмкинсая деревня",
],[  phone=> 79994553525,
  messenger=> "telegram",
  will_participate=> true,
  candidate=> "Зелёные",
  sex=> 0,
  age=> "25-35",
  living_place=> "Шалинское",
],[  phone=> 79895133562,
  messenger=> "whatsapp",
  will_participate=> true,
  candidate=> "ЕДРО",
  sex=> 1,
  age=> "18-25",
  living_place=> "Красноярск",
],[  phone=> 79993252138,
  messenger=> "vk",
  will_participate=> true,
  candidate=> "ЕДРО",
  sex=> 1,
  age=> "35-50",
  living_place=> "Берёзовка",
]];

echo json_encode($obj);

