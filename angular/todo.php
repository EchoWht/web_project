<?php
/**
 * Created by PhpStorm.
 * User: Echowht
 * Date: 2016/5/12
 * Time: 22:14
 */
header("Content-Type:text/html;charset=utf8");
$todo = array(
    'one' => '学习thinkphp',
    'two' => '学习angular.js',
    'three' => '学习node.js',
    'four' => '努力工作1',
);
echo json_encode($todo);