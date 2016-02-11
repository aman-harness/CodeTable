
var codeEdited = 0;
    function show_input(){
    	console.log("asdf\name");
    	$("#comment").show();
    }

function exchange(id){
    var frmObj= document.getElementById(id);
    var toObj= document.getElementById(id+'b');
    var b1 = document.getElementById('b1');
    toObj.style.width = frmObj.offsetWidth+7+'px'
    frmObj.style.display = 'none';
    toObj.style.display =' inline';
    // toObj.value=frmObj.innerHTML
    $('#itmb1').show();
    $('#b1').show();
	$('#lbl').show();
    $('#email').show();
    }



$(document).ready(function(){

////////////////////////////////////////////////////////////////////////////////////////////////////////////

	var indentSpaces = 4;

	function readCookie(name) {
	    var nameEQ = name + "=";
	    var ca = document.cookie.split(';');
	    for(var i=0;i < ca.length;i++) {
	        var c = ca[i];
	        while (c.charAt(0)==' ') c = c.substring(1,c.length);
	        if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length,c.length);
	    }
	    return null;
	}

	var editor = ace.edit("editor");
	editor.setTheme("ace/theme/chrome");
	editor.session.setMode("ace/mode/c_cpp");
	editor.getSession().setTabSize(indentSpaces);
	editorContent = editor.getValue();
	editor.setFontSize(13);
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
	};

	var lang_str = document.getElementById("myVar").innerHTML;
	var json = JSON.parse(lang_str);

	var code_id = json['code_id']

	var code = convert(json['Info']['extra'][0])
	var time = json['Info']['extra'][1]
	var run_count = json['Info']['extra'][2]
	var user_name = json['Info']['extra'][3]
	console.log("Code Codunt -" + run_count);

	if(user_name == ""){
		$("#itm1").html("Unitled Name");
	}
	else $("#itm1").html(user_name);

	function update_runCount(){
		$('#run_count').html("Run Count : " + run_count);
	}
	// Show Run_Count by getting it from the dtaabase.
	update_runCount();
	// Default Code to be shown In the ace Editor
	// changeSolutionBoxText();

	// If some code comes from database.
	if(code != ""){
		update_lastSaved(time);
		editor.setValue(convert(code));
		codeEdited = true;
	}

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

	// Default Code to be shown In the ace Editor
	if(codeEdited == false)
		changeSolutionBoxText();

	// Change Ace-editor code when language changes
	function changeSolutionBoxText(){
		var curr_lang = $('#lid').find('option:selected').val();
		// $('#solutionBox').val(convert(json[curr_lang][1]));Z
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

	// if (codeEdited == true) changeSolutionBoxText();
	$( "#response").hide();
	
	// On change of language when coding is not yest started.
	$('#lid').change(function(){
		if(codeEdited == false) changeSolutionBoxText();
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




	// Code Related to running of the code.
    $("#run_button").click(function(){
    	$( "#response").hide();
    	lang = $("#lid").val();
    	input = document.getElementById("comment").value;
    	console.log(lang);
    	code = editor.getValue();
    	console.log("Input: "+ input);
    	context = {code: code, lang: lang, input: input, code_id: code_id};
    	$.get('/CodeTable_app/runCode/', context, function(text){
			run_count = run_count + 1;
			update_runCount();
			show_response(text);
			JSON.stringify(text);
			console.log(text);
			$("#server_response").html(text['run_status']['output_html']);	
		});
    });

    // Code checking the compilaion of the code
    $("#compile_button").click(function(){
    	$( "#response").hide();
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
    	input = document.getElementById("comment").value;
    	console.log("Inside function " + input);
    	var catid;
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
			generate_rwurl();
		   
		}
    });

    $("#b1").click(function(){
    	$("#b1").hide();
    	$("#itm1b").hide();
    	var req = $("#itm1b").val();
    	$("#itm1").html(req);
    	$("#itm1").show();
    	data_passed = {code_id: code_id , name: req};
    	$.get('/CodeTable_app/update_name/', data_passed, function(){
			console.log("Callback Started in chnaging name");
			// update_lastSaved(text);
	        if(1){;
	        } else {
	            $('body').html('Error');
	        }
		});

    });

    function generate_rwurl(){
    	var key = readCookie('key');
    	var url = (window.location.href);
    	url = url.substring(0, url.length - 1) + key;
    	console.log(url);
    	 $("#p2").html("Read and Write " + url);
    }

    $("#comment").hide();
    $('#itmb1').hide();

    $('#b1').hide();
    $('#lbl').hide();
    $('#email').hide();

});