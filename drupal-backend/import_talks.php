<?php

//print 'HEY! Para importar, faz direito!';

use Drupal\Core\DrupalKernel;
use Symfony\Component\HttpFoundation\Request;

require_once './core/includes/database.inc';
require_once './core/includes/schema.inc';
// Specify relative path to the drupal root.
$autoloader = require_once './autoload.php';

$request = Request::createFromGlobals();

// Bootstrap drupal to different levels
$kernel = DrupalKernel::createFromRequest($request, $autoloader, 'prod');
$kernel->boot();
$kernel->prepareLegacyRequest($request);

$em = $kernel->getContainer()->get('entity.manager');

ini_set('auto_detect_line_endings', TRUE);

$items = [];

$row = 0;
if (($handle = fopen('talks.csv', "r")) !== FALSE) {
  while (($data = fgetcsv($handle, 1000, ";")) !== FALSE) {
    $row++;
    if (
      empty($data[0])
      || $row == 1
    ) {
      continue;
    }
    $data[0] = str_replace('-Sep', '', $data[0]);
    $time_arr = explode(' a ', $data[5]);
    if (!isset($time_arr[1])) {
      $day = '2017-09-' . str_pad($data[0], 2, '0', STR_PAD_LEFT);
      $start = $day . 'T' . str_replace('A partir de ', '', $time_arr[0]) . ':00';
      $end = '';
    }
    else {
      $day = '2017-09-' . str_pad($data[0], 2, '0', STR_PAD_LEFT);
      $start = $day . 'T' . $time_arr[0] . ':00';
      $end = $day . 'T' . $time_arr[1] . ':00';
    }

    $presenters = explode('\n', $data[3]);
    $presenters_details = [];
    $isPresenter = FALSE;
    foreach ($presenters as $presenter) {
      if (in_array(trim($data[1]), ['Palestra', 'Workshop'])) {
        $presenter_detail = explode(':', $presenter);
        if (count($presenter_detail) > 1) {
          $isPresenter = TRUE;
        }

        if ($isPresenter) {
          $item = [
            'name' => trim($presenter_detail[0]),
          ];
          unset($presenter_detail[0]);
          $item['about'] = trim(implode(':', $presenter_detail));
          $presenters_details[] = $item;
        }
      }
    }
    if (!$isPresenter) {
      $description = $data[3];
    }
    else {
      $description = '';
    }

    $location_address = trim(str_replace('.', '', $data[4]));
    if (strpos($location_address, 'Inatel') === 0) {
      $location_address = 'Inatel';
      $location_details = trim(str_replace([
        'Inatel ',
        '(',
        ')'
      ], '', $data[4]));
    }
    elseif (strpos($location_address, 'ETE FMC') === 0) {
      $location_address = 'ETE - Escola Tecnica Francisco Moreira da Costa';
      $location_details = trim(str_replace([
        'ETE FMC ',
        '(',
        ')'
      ], '', $data[4]));
    }
    elseif (strpos($location_address, 'CVT ETE FMC') === 0) {
      $location_address = 'CVT ETE FMC';
      $location_details = trim(str_replace([
        'CVT ETE FMC ',
        '(',
        ')'
      ], '', $data[4]));
    }
    else {
      $location_details = '';
    }

    $obj = [
      'title' => trim($data[2]),
      'type' => trim($data[1]),
      'description' => trim($description),
      'presenters' => $presenters_details,
      'location' => $location_address,
      'location_details' => $location_details,
      'time' => [
        'start' => $start,
        'end' => $end,
      ]
    ];
    $items[] = $obj;
  }
  fclose($handle);
}

define('EVENT_ID', 117);

if (FALSE) {
  print_r($items);
  die();
}

//$limit = 5;
foreach ($items as $item) {
  //  if (--$limit === 0) {
  //    break;
  //  }

  $SessionNode = \Drupal\node\Entity\Node::create(['type' => 'session']);
  $SessionNode->title = trim($item['title']);
  $SessionNode->setOwner(\Drupal\user\Entity\User::load(1));
  if (empty($item['type'])) {
    $type_name = 'Geral';
  }
  else {
    $type_name = $item['type'];
  }
  $term = getOrCreateActivityTypeByName($type_name);
  $SessionNode->field_activity_type = $term->id();
  $SessionNode->field_text = html_entity_decode($item['description']);
  $SessionNode->field_date_start = $item['time']['start'];
  $SessionNode->field_date_end = $item['time']['end'];
  $SessionNode->field_session_event = EVENT_ID;

  $LocationNode = getOrCreateLocationByTitle($item['location']);
  $SessionNode->field_location_session = $LocationNode->id();
  $SessionNode->field_location_details = $item['location_details'];

  $SessionNode->field_presenter = [];
  foreach ($item['presenters'] as $presenter) {
    $PresenterNode = getOrCreatePresenterByName($presenter);
    $SessionNode->field_presenter[] = $PresenterNode->id();
  }
  $SessionNode->save();
}

function getOrCreateActivityTypeByName($name) {
  $terms = \Drupal::entityManager()
    ->getStorage('taxonomy_term')
    ->loadByProperties([
      'vid' => 'activity_type',
      'name' => trim($name)
    ]);

  if (empty($terms)) {
    $term = \Drupal\taxonomy\Entity\Term::create([
      'vid' => 'activity_type',
      'name' => trim($name),
    ]);
    $term->save();
  }
  else {
    $term = current($terms);
  }
  return $term;
}

function getOrCreateLocationByTitle($title) {
  $nodes = \Drupal::entityManager()
    ->getStorage('node')
    ->loadByProperties([
      'type' => 'location',
      'title' => trim($title)
    ]);

  if (empty($nodes)) {
    $Node = \Drupal\node\Entity\Node::create(['type' => 'location']);
    $Node->title = trim($title);
    $Node->setOwner(\Drupal\user\Entity\User::load(1));
    $Node->field_location_event = EVENT_ID;
    $Node->save();
  }
  else {
    $Node = current($nodes);
  }
  return $Node;
}

function getOrCreatePresenterByName($presenter) {
  $terms = \Drupal::entityManager()
    ->getStorage('taxonomy_term')
    ->loadByProperties([
      'vid' => 'presenter',
      'name' => trim($presenter['name'])
    ]);

  if (empty($terms)) {
    $term = \Drupal\taxonomy\Entity\Term::create([
      'vid' => 'presenter',
      'name' => trim($presenter['name'])
    ]);
    $term->field_text = $presenter['about'];
    $term->save();
  }
  else {
    $term = current($terms);
  }
  return $term;
}

print count($items) . ' processed';

ini_set('auto_detect_line_endings', FALSE);