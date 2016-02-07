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

    //  Save the code.
    $("#save_button").click(function(){
    	var catid = document.getElementById('solutionBox').value;  
    	var x = document.getElementById("lid").value;
    	console.log("Source Code : " + catid);
    	console.log("catid\n");
    	$.get('/CodeTable_app/saveCode/', {category_id: catid, lang : x},
    		function(text){
    			console.log("Callback Started in saving");
    			console.log(text);
		        if(1){
		        	JSON.stringify(text);
		        	console.log("Happening in saving\n");
		            $("#changed").html(text['code_id']);
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
  //   	console.log("Source Code : " + catid);
  //   	console.log("catid\n");
  //   	$.get('/CodeTable_app/compileCode/', {category_id: catid},
  //   		function(text){
  //   			console.log("Callback Started in saving");
  //   			console.log(text);
		//         if(1){
		//         	JSON.stringify(text);
		//         	console.log("Happening in saving\n");
		//             $("#changed").html(text['code_id']);
		//         } else {
		//             $('body').html('Error');
		//         }
		// });
  //       // $("p").hide();
    });
});