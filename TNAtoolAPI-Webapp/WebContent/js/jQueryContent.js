function dateRemove(e, d){
	$(e).remove();
	$("#datepicker").multiDatesPicker('removeDates', d);
	$("#accordion > h3").html($('#datepicker').multiDatesPicker('getDates').length + " day(s) selected");
}

function addDate(date){
	$( "<li title='Click to remove.' id="+dateID+" onclick=\"dateRemove(this, '"+date+"')\">"+Date.parse(date).toString('dddd, MMMM d, yyyy')+"</li>" ).appendTo( "#accordionItems" );
	$("#"+dateID).css({"border":"1px solid black","padding-left":"10px","font-size":"95%","display":"block","width":"80%","background-color":"grey","text-decoration":"none","color":"white","margin":"3px","border-radius":"5px"});
	$("#"+dateID).hover(function(){
		  $(this).css({"cursor":"pointer","-moz-transform":"scale(1.1,1.1)","-webkit-transform":"scale(1.1,1.1)","transform":"scale(1.1,1.1)"});
	},function(){
		  $(this).css({"cursor":"pointer","-moz-transform":"scale(1,1)","-webkit-transform":"scale(1,1)","transform":"scale(1,1)"});
	});
}

function numberconv(x) {
    var parts = x.split(".");
    parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    return parts.join(".");
}

function reload(){		
	window.opener.qstringx = (parseFloat(document.getElementById("Sradius").value)).toString();
	
	var dates = $('#datepicker').multiDatesPicker('getDates');
	if(dates.length==0){
		$( "#datepicker" ).multiDatesPicker({
			addDates: [new Date()]
		});
	}
	dates = $('#datepicker').multiDatesPicker('getDates');
	window.opener.qstringd = dates.join(",");

	location.reload();	
}

function closebutton(){
	window.close();
}

function printbutton(){
	window.print();
}

function exportbutton(){
	var uri = 'data:application/csv;fileName=Report.csv;base64,'+ window.btoa(csvfile);
	window.open(uri);
}

function go(key){
	$(document).tooltip({
		position: {
	        my: "left bottom",
	        at: "right bottom",
	    }
	});
	
	$( "#progressbar" ).progressbar({
	    value: false,
	}); 
	
	function progress() {
		$.ajax({
			type: 'GET',
			datatype: 'json',
			url: '/TNAtoolAPI-Webapp/queries/transit/PorgVal?&key='+key,
			async: true,
			success: function(item){
				progVal = parseInt(item.progVal);
				if(progVal==0){progVal=false;}
				$( "#progressbar" ).progressbar( "value", progVal );	
			}			
		});	
	    if ( progVal == 100 ) {
			clearTimeout(timeVar);
	  	}
	} 
	timeVar = setInterval(progress, 100);
	
	$( "#datepicker" ).multiDatesPicker({
		changeMonth: true,
      	changeYear: true,
		addDates: window.opener.qstringd.split(","),
		onSelect: function (date) {
			dateID = date.replace("/","").replace("/","");
			if($("#"+dateID).length==0){
				addDate(date);
			}else{
				$("#"+dateID).remove();
			}
			$("#accordion > h3").html($('#datepicker').multiDatesPicker('getDates').length + " day(s) selected");
	    }
	});
	
	var cdate;
	for(var i=0; i<window.opener.qstringd.split(",").length; i++){
		cdate = window.opener.qstringd.split(",")[i];
		dateID = cdate.replace("/","").replace("/","");
		addDate(cdate);
	}
	
	$("#accordion").accordion({
		collapsible: true,
		active: false,
		heightStyle: "content"
	});
	$("#accordion").accordion("refresh");
	$("#accordion > h3").html(window.opener.qstringd.split(",").length + " day(s) selected");
	
	document.getElementById("Sradius").value = window.opener.qstringx;	
	
}