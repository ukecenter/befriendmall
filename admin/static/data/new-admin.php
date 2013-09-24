<?php
	$data=array(
		'id'=>1,
		'name'=>'xxx',
		'categeorys'=>'1,2,3',
		'allCategeorys'=>'1,2,3,5,6',
	);
	
	$page=array(
		'pageLength'=>10,
		'nowPage'=>3
	);
	
	echo json_encode($data);

?>
