var codeEdited = 0;
    function show_input(){
    	console.log("asdf\name");
    	$("#comment").show();
    }

function new_code(){
	console.log("Entry Noted : ");
	var new_url = window.location.href;
	new_url = new_url.slice(0, -11);
	window.location= new_url;
}

function exchange(id){
    var frmObj= document.getElementById(id);
    var toObj= document.getElementById(id+'b');
    var b1 = document.getElementById('b1');
    toObj.style.width = frmObj.offsetWidth+7+'px';
    frmObj.style.display = 'none';
    toObj.style.display =' inline';
    // toObj.value=frmObj.innerHTML
    $('#itmb1').show();
    $('#b1').show();
	$('#lbl').show();
    $('#email').show();
    document.getElementById("itm1b").focus();
    }


// Function to redirect url to a new code. 
var lang_to_ext = {
	"C":"c",
	"CPP":"cpp",
	"CSS":"css",
	"HASKELL":"hs",
	"JAVA":"java",
	"JAVASCRIPT":"js",
	"OBJECTIVEC":"m",
	"PERL":"pl",
	"CLOJURE":"clj",
	"PHP":"php",
	"PYTHON":"py",
	"R":"r",
	"RUBY":"rb",
	"RUST":"rs",
	"SCALA":"scala",
	"CSHARP":"cs"
};

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
	ace.require("document");
	// var doc = new Document(editor.getValue());

	editor.setTheme("ace/theme/chrome");
	editor.session.setMode("ace/mode/c_cpp");
	editor.getSession().setTabSize(indentSpaces);
	editorContent = editor.getValue();
	editor.setFontSize(13);
	editor.setOptions({
			useWrapMode: true,
			showPrintMargin: false,
			enableBasicAutocompletion: true,
			enableSnippets: true,
			enableLiveAutocompletion: true
		});

	var StatusBar = ace.require("ace/ext/statusbar").StatusBar;
	var statusBar = new StatusBar(editor, document.getElementById("editor-statusbar"));

	// No need to show warning when usr is authorized.
	$("#warning").hide();

	// Last saved code updatation function
	function update_lastSaved(text){
		$('#last_saved').html("Last Saved : " + text);
		return 0;
	} 

	// to remvove &ampd and other code from appearing in ace
	var convert = function(convert){
	    return $("<span/>", { html: convert }).text();
	};

	//  this is where I recieve all the json
	var lang_str = document.getElementById("myVar").innerHTML;
	var json = JSON.parse(lang_str);


	// Parsing of all the json and recienve data
	var code_id = json['code_id'];

	var code = (json['Info']['extra'][0]);
	var time = json['Info']['extra'][1];
	var run_count = json['Info']['extra'][2];
	var user_name = json['Info']['extra'][3];
	var clone_count = json['Info']['extra'][4];
	var code_lang = json['def_lang']


	// Populate Select language option.
	$.each(json, function(i, value) {
		if(i == "code_id") return true;
		if(i == "Info") return true;
		$('#lid').append($('<option>').text(value[0]).attr('value', i));
		// console.log(value[0] , i)
	    });

	// This is not working. Ihave to figure i out.
	$("#lid").val(code_lang);

	console.log("Code Lang : " + code_lang);

	// In case Name doesn't exists. Default in db is ""
	if(user_name == ""){
		$("#itm1").html("Click Here to Name the File!");
	}
	else $("#itm1").html(user_name);

	// function to show forkcount
	function show_forkcount(){
		$("#fork_text").val(' ' +clone_count);
	}

	// function to show runcounnt
	function show_runcount(){
		$('#run_count').html("Run Count : " + run_count);
	}

	// Show Run_Count by getting it from the dtaabase.
	show_runcount();
	show_forkcount();
	// Default Code to be shown In the ace Editor
	// changeSolutionBoxText();

	// If some code comes from database.
	if(code != ""){
		update_lastSaved(time);	
		editor.setValue(convert(code));
		// Edit 1.1 code was already highlighted when it was loaded. Corrected it.
		editor.clearSelection();
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
		document.getElementById("delete").disabled = true;
		document.getElementById("generate").disabled = true;
		document.getElementById("itm1").disabled = true;
	}


	

	// Default Code to be shown In the ace Editor
	if(codeEdited == false)
		changeSolutionBoxText();

	// Change Ace-editor code when language changes
	function changeSolutionBoxText(){
		var curr_lang = $('#lid').find('option:selected').val();
		editor.setValue(convert(json[curr_lang][1]));
		editor.clearSelection();
		return 0;
	}

	function show_response(text){

		if(text['run_status']['status'] == "AC"){
			$("#server_response").html(text['run_status']['output_html']);
			console.log("Showing Responses\n");
			$("#logId").html("Log Id : " + text['code_id']);
			$("#response").show();
			$("#res_Ctime").html(Date());
			$("#res_time").html(text['run_status']['time_used']);
			$("#res_memory").html(text['run_status']['memory_used']);
			$("#res_status").html(text['run_status']['status']);
			$("#res_statusDetail").html(text['run_status']['status_detail']);
		}
		else{
			console.log(text['compile_status']);
			$("#server_response").html(text['compile_status']);
			console.log("Showing Responses\n");
			$("#logId").html("Log Id : " + text['code_id']);
			$("#response").show();
			$("#res_Ctime").html(Date());
			$("#res_time").html("--");
			$("#res_memory").html("--");
			$("#res_status").html(text['run_status']['status']);
			$("#res_statusDetail").html(text['run_status']['status_detail']);
		}

	}

	// if (codeEdited == true) changeSolutionBoxText();
	$( "#response").hide();
	
	// On change of language when coding is not yest started.
	$('#lid').change(function(){
		if(codeEdited == false) changeSolutionBoxText();
		languageSelected =  $('#lid').find('option:selected').val();
		editor.getSession().setMode("ace/mode/" + languageSelected.toLowerCase());
	    });

	// Code related to checking any change in txt area.
	$('#solutionBox').bind('input propertychange', function() {
		console.log("A change is Noticed.\n");
	   	if(codeEdited == false){
	   		codeEdited = true;
	   	}

	});

	// editor.getSession().on('change', function(e) {
	// 	console.log(e.data);

	// 	editor.getSession().getDocument().applyDeltas(e);
	//     if ($(document.activeElement).closest("div").attr("id") == "editor") {
	//         console.log("Editor was changed by user typing or copy paste");
	//     } else {
	//         console.log("Editor was changed programmatically");
	//     }
	// })
	var x = 0;
	var queue = [];
	editor.on("change", function(e) {
	  	// if (editor.curOp && editor.curOp.command.name) console.log(e.data);
	  	// else console.log(e.data);
     	if(1) {
     		console.log(e.start + x);
     		queue.push(e);
     		x += 1;
      	}
	});
	
    var doc = editor.getSession().getDocument();
    $("#testing").click(function(){
    	console.log("testing\n");
    	// var doc = new Document(editor.getValue());
    	editor.getSession().setValue('');  //clear
    	// for(var currentDelta in myStoredArray) {
    		// editor.moveCursorToPosition(delta.range.start);
    		// while(x > 0){
    		var xx = queue.length;
	    	for (var i = 0; i < xx; i++) {
	    		if(i == xx - 1) continue;
	    	    doc.applyDeltas([queue[i]]);
	    	    console.log(i);
	    	    // var userInput = readline();
	    	}

    		// }
    	// }
    	// delta = myStoredArray[0].delta;
    	// editor.moveCursorToPosition(delta.range.start);
    });


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
    		run_count = run_count + 1; // In views also
			show_runcount();
			show_response(text);
			JSON.stringify(text);
			console.log(text);
			
		});
    });

    // Code checking the compilaion of the code
    $("#compile_button").click(function(){
    	$( "#response").hide();
    	lang = $( "#lid" ).val();
    	console.log(lang);
    	code = editor.getValue();
    	context = {code: code, lang: lang};
    	$.get('/CodeTable_app/compileCode/', context, function(text){
    		console.log(text);
    		$( "#response").show();
    		if(text['compile_status'] == "OK"){
				$("#logId").html("Log Id : " + text['code_id']);
	            $("#changed").html(text['code_id']);
	            $("#res_status").html(text['compile_status']);
	            $("#server_response").html("Compilation Successful\n");
	            $("#res_Ctime").html(Date());
	            $("#res_time").html("  --  ");
	            $("#res_memory").html("  --  ");
	            $("#res_statusDetail").html("Seccessful");
	        }
	        else{
	        	$("#logId").html("Log Id : " + text['code_id']);
	        	$("#server_response").html(text["compile_status"]);
	        	$("#res_status").html("  --  ");
	        	$("#res_time").html("  --  ");
	        	$("#res_memory").html("  --  ");
	        	$("#res_statusDetail").html("  --  ");
	        	$("#res_Ctime").html(Date());
	        }
		});
    });

    //  Save the code.
    $("#save_button").click(function(){
    	var sol_box = editor.getValue();
    	console.log("Source Code : " + sol_box);
    	data_passed = {code: sol_box, code_id: code_id, lang : $("#lid").val()};
    	console.log(data_passed);
    	$.get('/CodeTable_app/saveCode/', data_passed, function(text){
    			console.log("Callback Started in saving");
    			console.log('Time Nonw ', text);
    			update_lastSaved(text);

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

    	// var ext = 'py';
    	var ext = lang_to_ext[$( "#lid" ).val()];
    	console.log("ext 	" + ext);

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

    $("#fork").click(function(){
    	var sol_box = editor.getValue();
    	console.log("Source Code : " + sol_box);
    	data_passed = {code: sol_box, code_id: code_id};
    	$.get('/CodeTable_app/clone/', data_passed, function(url){
			console.log("Callback Started in chnaging name");
			console.log(url);
			var new_url = window.location.href;
			new_url = new_url.slice(0, -11);
			new_url = new_url + url;
			console.log(new_url);
			clone_count = clone_count + 1;
			show_forkcount();
			window.open(new_url);
	        if(1){;
	        } else {
	            $('body').html('Error');
	        }
		});
    });

	$("#delete").click(function(){
		data_passed = {code_id: code_id};
		$.get('/CodeTable_app/delete/', data_passed, function(){
			console.log("Callback Started in delete name");
			var new_url = window.location.href;
			new_url = new_url.slice(0, -11);
			// window.open(new_url);
			window.location = new_url;
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

// /////////////////// Experimients /////////////////////////////////////////////////////////////////

	editor.on('change', function() {
		this.handleEditor1Changed = function (e) {
	    var deltas = new Array();
	    deltas[0] = e.data;
	    console.log("Change event : -"+ deltas + " " + e);
		};
	});

});