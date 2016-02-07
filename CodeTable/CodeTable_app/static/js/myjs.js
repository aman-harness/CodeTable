$(document).ready(function(){

	// Code Related to running of the code.
    $("#run_button").click(function(){
    	var catid;
    	catid = document.getElementById('solutionBox').value;  
    	console.log("Source Code : " + catid);
    	console.log("catid\n");
    	$.get('/CodeTable_app/runCode/', {category_id: catid},
    		function(text){
    			console.log("Callback Started in running");
    			console.log(text);
		        if(1){
		        	JSON.stringify(text);
		        	console.log("Happening in running\n");
		            $("#changed").html(text['code_id']);
		        } else {
		            $('body').html('Error');
		        }
		});
        // $("p").hide();
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

    $("#save_button").click(function(){
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
});