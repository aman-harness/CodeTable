var codeEdited = 0;


$(document).ready(function(){
	// Remove unwanted terms from srigs:
	var convert = function(convert){
	    return $("<span />", { html: convert }).text();
	    //return document.createElement("span").innerText;
	};

	var myVar = document.getElementById("myVar").innerHTML;
	var obj = JSON.parse(myVar);
	// console.log(myVar);

	// Example to access the language object.
	// console.log(obj["c"][0]);


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

	changeSolutionBoxText();
	
	// On change of language when coding is not yest started.
	$('#lid').change(function(){
		if(codeEdited == 0)
	       	changeSolutionBoxText();
	    });

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

	   	// Send the data to server for saving data.(NOTE)
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