<?php

class Course 
{
  public $owner_id, $school_id, $course_id, $course_title, $scope;
  public $course_view_count, $course_type, $category, $time_added;
  public $banks;

  public function __construct($params)
  {
    $this->owner_id = $params['owner_id'];
    $this->school_id = $params['school_id'];
    $this->course_id = $params['course_id'];
    $this->course_title = $params['course_title'];
    $this->scope = $params['scope'];
    $this->time_added = $params['time_added'];
    $this->course_view_count = $params['course_view_count'];
    $this->course_type = $params['course_type'];
    $this->category = $params['category'];
    $this->banks = array();
  }
}