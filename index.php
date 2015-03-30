<?php
include("templates/header.htm");

$action = 'index';
$disallowed_paths = array('header', 'footer');
if (!empty($_GET['action'])) {
 $tmp_action = basename($_GET['action']);
 if (!in_array($tmp_action, $disallowed_paths) && file_exists("templates/{$tmp_action}.htm"))
  $action = $tmp_action;
}
include("templates/$action.htm");

include("templates/footer.htm");
?>
