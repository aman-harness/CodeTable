var codeEdited = 0;


$(document).ready(function(){
	// var a = {{language}};

	// console.log(a);
	var myVar = document.getElementById("myVar").value;

	// var obj = JSON.parse(myVar);
	console.log(myVar);

	if(codeEdited == false){
		$(document).on('change','#lid',function(){
		    alert("PROBANDO");
		    $('#solutionBox').val(" {{language.c.1}} ");
		});
	}
	


	// $("#submit_button").hide();
	// Code related to checking any change in txt area.
	$('#solutionBox').bind('input propertychange', function() {
		console.log("A change is Noticed.\n");
	   	
	   	if(codeEdited == false){
	   		codeEdited = true;
	   		// if(this.value.length){
	   		//     $("#submit_button").show();
	   		// }
	   	}
	   	// Send the data to server.(NOTE)
	});


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