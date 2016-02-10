
var codeEdited = 0;

$(document).ready(function(){

// //////////////////////////////////////////////////////////////////////////////////////////////////////////

	var editor = ace.edit("editor");
	editor.setTheme("ace/theme/twilight");
	editor.session.setMode("ace/mode/c_cpp");
	// editor.getSession().setTabSize(indentSpaces);
	editorContent = editor.getValue();
	editor.setFontSize(15);
	editor.setOptions({
			enableBasicAutocompletion: true,
			enableSnippets: true,
			enableLiveAutocompletion: true
		});

	var StatusBar = ace.require("ace/ext/statusbar").StatusBar;
	var statusBar = new StatusBar(editor, document.getElementById("editor-statusbar"));


	$("#warning").hide();
	function update_lastSaved(text){
		$('#last_saved').html("Last Saved : " + text);
		return 0;
	} 

	var convert = function(convert){
	    return $("<span/>", { html: convert }).text();
	    //return document.createElement("span").innerText;
	};

	var lang_str = document.getElementById("myVar").innerHTML;
	var json = JSON.parse(lang_str);

	var code_id = json['code_id']

	var auth = json["Info"]["auth"];
	console.log("Auth : ",auth);
	if(auth == false){
		console.log("Hello!");
		editor.setReadOnly(1);
		$("#warning").show();
		document.getElementById("save_button").disabled = true;
		document.getElementById("generate").disabled = true;
		document.getElementById("lid").disabled = true;
	}

	

	// Populate Select language option.
	$.each(json, function(i, value) {
		if(i == "code_id") return true;
		if(i == "Info") return true;
		$('#lid').append($('<option>').text(value[0]).attr('value', i));
		// console.log(value[0] , i)
	    });

	// Setting default value in solutionBox.

	function changeSolutionBoxText(){
		var curr_lang = $('#lid').find('option:selected').val();
		$('#solutionBox').val(convert(json[curr_lang][1]));
		editor.setValue(convert(json[curr_lang][1]));
		return 0;
	}

	function show_response(text){
		console.log("Showing Responses\n");
		$("#logId").html("Log Id : " + text['code_id']);
		$("#response").show();
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

	});

	editor.getSession().on('change', function() {
	    if ($(document.activeElement).closest("div").attr("id") == "editor") {
	        console.log("editor was changed by user typing or copy paste");
	    } else {
	        console.log("editor was changed programmatically");
	    }
	})

	// editor.onTextInput(function(){
	// 	console.log('Kuch Hua :p');
	// })




	// Code Related to running of the code.
    $("#run_button").click(function(){
    	$( "#response").hide();
    	lang = $( "#lid" ).val();
    	console.log(lang);
    	code = editor.getValue();
    	context = {code: code, lang: lang};
    	console.log("Source Code : " + code);
    	$.get('/CodeTable_app/runCode/', context, function(text){
			show_response(text);
			JSON.stringify(text);
			console.log(text);
			$("#server_response").html(text['run_status']['output_html']);	
		});
    });

    // Code checking the compilaion of the code
    $("#compile_button").click(function(){
    	lang = $( "#lid" ).val();
    	console.log(lang);
    	code = editor.getValue();
    	context = {code: code, lang: lang};
    	$.get('/CodeTable_app/compileCode/', context,
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
    	// var sol_box = document.getElementById('solutionBox').value;  
    	var sol_box = editor.getValue();
    	// var x = document.getElementById("lid").value;
    	console.log("Source Code : " + sol_box);
    	data_passed = {code: sol_box, code_id: code_id};
    	console.log(data_passed);
    	$.get('/CodeTable_app/saveCode/', data_passed, function(text){
    			console.log("Callback Started in saving");
    			console.log('Time Nonw ', text);
    			update_lastSaved(text);
		        if(1){;
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
		downloadFile("code", editor.getValue(), '');

    });

    $("#generate").click(function(){
    	console.log("Hello World!");
		if(document.getElementById('ch1').checked) {
		    $("#p1").html("Read Only " + window.location.href );
		}
		if(document.getElementById('ch2').checked) {
		    $("#p2").html("Under Construction\n" );
		}
    });

});