// {% compress js %}
//    <script src="{% static "ace-builds/src-noconflict/ace.js" %}"></script>
// {% endcompress %}
var codeEdited = 0;

$(document).ready(function(){



	var convert = function(convert){
	    return $("<span/>", { html: convert }).text();
	    //return document.createElement("span").innerText;
	};

	var myVar = document.getElementById("myVar").innerHTML;
	var obj = JSON.parse(myVar);


	// Populate Select language option.
	$.each(obj, function(i, value) {
		$('#lid').append($('<option>').text(value[0]).attr('value', i));
	    });

	// Setting default value in solutionBox.

	function changeSolutionBoxText(){
		console.log("Function Called");
		var curr_lang = $('#lid').find('option:selected').val();
		$('#solutionBox').val(convert(obj[curr_lang][1]));
		return 0;
	}

	function show_response(text){
		console.log("Showing Responses\n");
		$( "#logId").html("Log Id : " + text['code_id']);
		$( "#response").show();
		$("#res_Ctime").html(Date());
		$("#res_time").html(text['run_status']['time_used']);
		$("#res_memory").html(text['run_status']['memory_used']);
		$("#res_status").html(text['run_status']['status']);
		$("#res_statusDetail").html(text['run_status']['status_detail']);


	}

	changeSolutionBoxText();
	$( "#response").hide();
	
	// On change of language when coding is not yest started.
	$('#lid').change(function(){
		if(codeEdited == 0)
	       	changeSolutionBoxText();
	    });

	// Code related to checking any change in txt area.
	$('#solutionBox').bind('input propertychange', function() {
		console.log("A change is Noticed.\n");
	   	
	   	if(codeEdited == false){
	   		codeEdited = true;
	   	}

	   	// Send the data to server for saving data.(NOTE)

	});


	// Code Related to running of the code.
    $("#run_button").click(function(){
    	$( "#response").hide();
    	var catid;
    	catid = document.getElementById('solutionBox').value;  
    	console.log("Source Code : " + catid);
    	$.get('/CodeTable_app/runCode/', {category_id: catid}, function(text){
			show_response(text);
			console.log("Callback Started in running");
			JSON.stringify(text);
			console.log(text);
			$("#server_response").html(text['run_status']['output_html']);
	        if(1){;
	        } else {
	            $('body').html('Error');
	        }	
		});
    });

    // Code checking the compilaion of the code
    $("#compile_button").click(function(){
    	var catid;
    	catid = document.getElementById('solutionBox').value;  
    	console.log("Source Code : " + catid);
    	console.log("catid\n");
    	$.get('/CodeTable_app/compileCode/', {category_id: catid},
    		function(text){
    			console.log("Callback Started in compilaion");
    			console.log(text);
		        if(1){
		        	JSON.stringify(text);
		        	console.log("Happening in compilaion\n");
		            $("#changed").html(text['code_id']);
		        } else {
		            $('body').html('Error');
		        }
		});
        // $("p").hide();
    });

    //  Save the code.
    $("#save_button").click(function(){
    	var catid = document.getElementById('solutionBox').value;  
    	var x = document.getElementById("lid").value;
    	console.log("Source Code : " + catid);
    	$.get('/CodeTable_app/saveCode/', {category_id: catid}, function(){
    			console.log("Callback Started in saving");
    			console.log("Code Saved Successfully Called\n");
		        if(1){
		        	console.log("Happening in saving\n");
		        } else {
		            $('body').html('Error');
		        }
		});
        // $("p").hide();
    });

    // This is just for the trial and debugging purpose.
    $("#submit_button").click(function(){
    	console.log("Inside function");
    	var catid;
    	catid = document.getElementById('solutionBox').value;  
    	var x = document.getElementById("lid").value;
    	console.log(x);
    });

    function downloadFile(filename, text, lang) {

    	var ext = 'py';

    	var element = document.createElement('a');
    	element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(text));
    	element.setAttribute('download', filename + '.' + ext);

    	element.style.display = 'none';
    	document.body.appendChild(element);

    	element.click();

    	document.body.removeChild(element);
    }

    $("#download-code").click(function(){

    	console.log("Hello World!");
		// TODO: implement download code feature
		// updateContent();
		downloadFile("code", document.getElementById('solutionBox').value, '');

    });

});