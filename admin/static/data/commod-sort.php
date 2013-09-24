<?php
	$data=array(
		'id'=>1,
		'code'=>'155121',
		'name'=>'xxx',
		'img'=>'img.jpg',
		'stayNum'=>20,
		'sellNum'=>30,
		'status'=>1);
	for($i=0;$i<10;$i++){
		$datas[$i]=$data;
	}
	$page=array(
		'pageLength'=>10,
		'nowPage'=>3
	);
	$result=array(
		'datas'=>$datas,
		'page'=>$page,
		'keywordQuery'=>'323'
	);
	echo json_encode($result);

?>
