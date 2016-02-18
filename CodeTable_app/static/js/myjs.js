
 /* ***********************************************
  *    File Name : myjs.js file                   *
  *    Project Name : CodeTable                   *
  *    Written By : Aman Singh                    *
  * ***********************************************/


// Variable used to stop inserting default codes once user has edited the code 
var codeEdited = false;

// Useless function I think
function show_input() {
    $("#comment")
        .show();
}

// This function is used to redirect to a new code
// Invoked by New Code Button on the Navigation Bar
function new_code() {
    console.log("Entry Noted : ");
    var new_url = window.location.href;
    new_url = new_url.slice(0, -11);
    window.location = new_url;
}

// This function is responsiible for Chnaging the name of file.
// Manages all appearnce of buttons and textbox and everything.
function exchange(id) {
    var frmObj = document.getElementById(id);
    var toObj = document.getElementById(id + 'b');
    var b1 = document.getElementById('b1');
    toObj.style.width = frmObj.offsetWidth + 7 + 'px';
    frmObj.style.display = 'none';
    toObj.style.display = ' inline';
    // toObj.value=frmObj.innerHTML
    $('#itmb1')
        .show();
    $('#b1')
        .show();
    $('#lbl')
        .show();
    $('#email')
        .show();
    document.getElementById("itm1b")
        .focus();
}


// Convert Code Language to extension
var lang_to_ext = {
    "C": "c"
    , "CPP": "cpp"
    , "CSS": "css"
    , "HASKELL": "hs"
    , "JAVA": "java"
    , "JAVASCRIPT": "js"
    , "OBJECTIVEC": "m"
    , "PERL": "pl"
    , "CLOJURE": "clj"
    , "PHP": "php"
    , "PYTHON": "py"
    , "R": "r"
    , "RUBY": "rb"
    , "RUST": "rs"
    , "SCALA": "scala"
    , "CSHARP": "cs"
};


/* ***********************************************
 *                Jquery Code                    *
 * ***********************************************/

// Invoke these js functions only after document is loaded.
$(document)
    .ready(function () {

        // Define the indentation used in editor
        var indentSpaces = 4;

        // Function to read a cookie directly from js
        // Used in generating read and write url.
        function readCookie(name) {
            var nameEQ = name + "=";
            var ca = document.cookie.split(';');
            for (var i = 0; i < ca.length; i++) {
                var c = ca[i];
                while (c.charAt(0) == ' ') c = c.substring(1, c.length);
                if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length, c.length);
            }
            return null;
        }

        // Setting up the ace editor
        
        var editor = ace.edit("editor");
        ace.require("document");
        ace.require("ace/ext/language_tools");

        // Experimenting with CodePlay  
        // var doc = new Document(editor.getValue());

        editor.setTheme("ace/theme/chrome");
        editor.session.setMode("ace/mode/c_cpp");
        editor.getSession()
            .setTabSize(indentSpaces);
        editorContent = editor.getValue();
        editor.setFontSize(13);
        editor.setOptions({
            showPrintMargin: false, 
            enableBasicAutocompletion: true, 
            enableSnippets: true, 
            enableLiveAutocompletion: true
        });


        // Setting up the status bar
        var StatusBar = ace.require("ace/ext/statusbar")
            .StatusBar;
        var statusBar = new StatusBar(editor, document.getElementById("editor-statusbar"));

        // No need to show warning when usr is authorized.
        // $("#warning").hide();

        // Last saved code updatation on browserfunction
        function update_lastSaved(text) {
            $('#last_saved')
                .html("Last Saved : " + text);
        }

        //  Two things here:- 
        // 1. I needed the function to be global since it was being called by index.html
        // 2. Editor was to be used so it has to be document ready. 
        // So the function was made global.
        window.onFileSelected = function(event) {
            var selectedFile = event.target.files[0];
            var reader = new FileReader();

            var result = document.getElementById("result");

            reader.onload = function(event) {
                console.log(event.target.result);
                editor.setValue(event.target.result);
                editor.clearSelection();            

                codeEdited = true;
            };
          reader.readAsText(selectedFile);
        }

        // Change Ace-editor code to default lang_code when language changes
        function changeSolutionBoxText() {
            var curr_lang = $('#lid')
                .find('option:selected')
                .val();
            editor.setValue(convert(json[curr_lang][1]));
            editor.clearSelection();
            return 0;
        }

        function generate_rwurl() {
            var key = readCookie('key');
            var url = (window.location.href);
            url = url.substring(0, url.length - 1) + key;
            console.log(url);
            $("#p2")
                .html("Read and Write " + url);
        }

        // to remvove &ampd and other code from appearing in ace
        var convert = function (convert) {
            return $("<span/>", {
                    html: convert
                })
                .text();
        };

        //  this is where I recieve all the json
        var lang_str = document.getElementById("myVar")
            .innerHTML;
        var json = JSON.parse(lang_str);


        // Parsing of all the json and recienve data
        var code_id = json['code_id'];
        var code = (json['Info']['extra'][0]);
        var time = json['Info']['extra'][1];
        var run_count = json['Info']['extra'][2];
        var user_name = json['Info']['extra'][3];
        var clone_count = json['Info']['extra'][4];
        var code_lang = json['def_lang']
        var auth = json["Info"]["auth"];


        // Populate Select language option.
        $.each(json, function (i, value) {
            if (i == "code_id") return true;
            if (i == "Info") return true;
            $('#lid')
                .append($('<option>')
                    .text(value[0])
                    .attr('value', i));
        });

        // In case Name doesn't exists. Default in db is ""
        if (user_name == "") {
            $("#itm1")
                .html("Click Here to Name the File!");
        } else $("#itm1")
            .html(user_name);

        // If some code comes from database.
        if (code != "") {
            update_lastSaved(time);
            editor.setValue(convert(code));
            // Edit 1.1 code was already highlighted when it was loaded. Corrected it.
            editor.clearSelection();
            codeEdited = true;
        }


        // function to show forkcount
        function show_forkcount() {
            $("#fork_text")
                .val(' ' + clone_count);
        }

        // function to show runcounnt
        function show_runcount() {
            $('#run_count')
                .html("Run Count : " + run_count);
        }

        // Show Run_Count by getting it from the database.
        show_runcount();
        show_forkcount();

        // Response should not appear unless there is one.
        $("#response").hide();

        // This checks db for language and if any, sets it.
        $("#lid").val(code_lang);

        if (auth == false) {

            // If someone is not authorized, he must not be able to tamper the code.
            editor.setReadOnly(1);
            $("#warning")
                .show();
            document.getElementById("save_button")
                .disabled = true;
            document.getElementById("generate")
                .disabled = true;
            document.getElementById("lid")
                .disabled = true;
            document.getElementById("delete")
                .disabled = true;
            document.getElementById("generate")
                .disabled = true;
            document.getElementById("itm1")
                .disabled = true;
        }

        // Default Code to be shown In the ace Editor
        if (codeEdited == false)
            changeSolutionBoxText();

        // When you click on run_button. Used to show user code Output
        function show_response(text) {

            // If code runs fine.
            if (text['run_status']['status'] == "AC") {
                $("#server_response")
                    .html(text['run_status']['output_html']);
                console.log("Showing Responses\n");
                $("#logId")
                    .html("Log Id : " + text['code_id']);
                $("#response")
                    .show();
                $("#res_Ctime")
                    .html(Date());
                $("#res_time")
                    .html(text['run_status']['time_used']);
                $("#res_memory")
                    .html(text['run_status']['memory_used']);
                $("#res_status")
                    .html(text['run_status']['status']);
                $("#res_statusDetail")
                    .html(text['run_status']['status_detail']);

            // If code has errors.
            } else {
                console.log(text['compile_status']);
                $("#server_response")
                    .html(text['compile_status']);
                console.log("Showing Responses\n");
                $("#logId")
                    .html("Log Id : " + text['code_id']);
                $("#response")
                    .show();
                $("#res_Ctime")
                    .html(Date());
                $("#res_time")
                    .html("--");
                $("#res_memory")
                    .html("--");
                $("#res_status")
                    .html(text['run_status']['status']);
                $("#res_statusDetail")
                    .html(text['run_status']['status_detail']);
            }
        }

        // On change of language when coding is not yest started.
        $('#lid')
            .change(function () {
                if (codeEdited == false) changeSolutionBoxText();
                languageSelected = $('#lid')
                    .find('option:selected').val();
                // Setting the mode of editor accordingly onchange of editor.
                editor.getSession()
                    .setMode("ace/mode/" + languageSelected.toLowerCase());
        });

//  //  Model code for writing codeplay. Keep it commented.
        // editor.getSession().on('change', function(e) {
        // 	console.log(e.data);

        // 	editor.getSession().getDocument().applyDeltas(e);
        //     if ($(document.activeElement).closest("div").attr("id") == "editor") {
        //         console.log("Editor was changed by user typing or copy paste");
        //     } else {
        //         console.log("Editor was changed programmatically");
        //     }
        // })

        // var x = 0;
        // var queue = [];
        // editor.on("change", function (e) {
        //     // if (editor.curOp && editor.curOp.command.name) console.log(e.data);
        //     // else console.log(e.data);
        //     if (1) {
        //         console.log(e.start + x);
        //         queue.push(e);
        //         x += 1;
        //     }
        // });

        // var doc = editor.getSession()
        //     .getDocument();
        // $("#testing")
        //     .click(function () {
        //         console.log("testing\n");
        //         // var doc = new Document(editor.getValue());
        //         editor.getSession()
        //             .setValue(''); //clear
        //         // for(var currentDelta in myStoredArray) {
        //         // editor.moveCursorToPosition(delta.range.start);
        //         // while(x > 0){
        //         var xx = queue.length;
        //         for (var i = 0; i < xx; i++) {
        //             if (i == xx - 1) continue;
        //             doc.applyDeltas([queue[i]]);
        //             console.log(i);
        //             // var userInput = readline();
        //         }

        //         // }
        //         // }
        //         // delta = myStoredArray[0].delta;
        //         // editor.moveCursorToPosition(delta.range.start);
        //     });


        // On clinking running button.
        $("#run_button")
            .click(function () {
                $("#response")
                    .hide();
                lang = $("#lid")
                    .val();
                input = document.getElementById("comment")
                    .value;
                console.log(lang);
                code = editor.getValue();
                console.log("Input: " + input);
                context = {
                    code: code
                    , lang: lang
                    , input: input
                    , code_id: code_id
                };
                $.get('/CodeTable_app/runCode/', context, function (text) {
                    run_count = run_count + 1; // In views also
                    show_runcount();
                    show_response(text);
                    JSON.stringify(text);
                    console.log(text);

                });
            });

        // Code checking the compilaion of the code
        $("#compile_button")
            .click(function () {
                $("#response")
                    .hide();
                lang = $("#lid")
                    .val();
                console.log(lang);
                code = editor.getValue();
                context = {
                    code: code
                    , lang: lang
                };
                $.get('/CodeTable_app/compileCode/', context, function (text) {
                    console.log(text);
                    $("#response")
                        .show();
                    if (text['compile_status'] == "OK") {
                        $("#logId")
                            .html("Log Id : " + text['code_id']);
                        $("#changed")
                            .html(text['code_id']);
                        $("#res_status")
                            .html(text['compile_status']);
                        $("#server_response")
                            .html("Compilation Successful\n");
                        $("#res_Ctime")
                            .html(Date());
                        $("#res_time")
                            .html("  --  ");
                        $("#res_memory")
                            .html("  --  ");
                        $("#res_statusDetail")
                            .html("Successful");
                    } else {
                        $("#logId")
                            .html("Log Id : " + text['code_id']);
                        $("#server_response")
                            .html(text["compile_status"]);
                        $("#res_status")
                            .html("  --  ");
                        $("#res_time")
                            .html("  --  ");
                        $("#res_memory")
                            .html("  --  ");
                        $("#res_statusDetail")
                            .html("  --  ");
                        $("#res_Ctime")
                            .html(Date());
                    }
                });
            });

        //  Save the code.
        $("#save_button")
            .click(function () {
                var sol_box = editor.getValue();
                console.log("Source Code : " + sol_box);
                data_passed = {
                    code: sol_box
                    , code_id: code_id
                    , lang: $("#lid")
                        .val()
                };
                console.log(data_passed);
                $.get('/CodeTable_app/saveCode/', data_passed, function (text) {
                    console.log("Callback Started in saving");
                    console.log('Time Nonw ', text);
                    update_lastSaved(text);

                });
            });

        // Function to download code.
        function downloadFile(filename, text, lang) {

            // var ext = 'py';
            var ext = lang_to_ext[$("#lid")
                .val()];
            console.log("ext 	" + ext);

            var element = document.createElement('a');
            element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(text));
            element.setAttribute('download', filename + '.' + ext);

            element.style.display = 'none';
            document.body.appendChild(element);

            element.click();

            document.body.removeChild(element);
        }

        $("#download-code")
            .click(function () {
                downloadFile("code", editor.getValue(), '');

            });

        //  Gemerate the code sharing URL
        $("#generate")
            .click(function () {
                $('#p1').hide();
                $('#p2').hide();
                console.log("Hello World!");
                if (document.getElementById('ch1')
                    .checked) {
                    $('#p1').show();
                    $("#p1")
                        .html("Read Only " + window.location.href);
                }
                if (document.getElementById('ch2')
                    .checked) {
                    $('#p2').show();
                    generate_rwurl();
                }
            });

        // Update name function
        $("#b1")
            .click(function () {
                if( !$("#itm1b").val() ) {
                          $("#itm1b").parents('p').addClass('warning');
                          console.log("Error!\n");
                    }

                else{    
                $("#b1")
                    .hide();
                $("#itm1b")
                    .hide();
                var req = $("#itm1b")
                    .val();
                $("#itm1")
                    .html(req);
                $("#itm1")
                    .show();
                data_passed = {
                    code_id: code_id
                    , name: req
                };
                $.get('/CodeTable_app/update_name/', data_passed, function () {
                    // update_lastSaved(text);
                    if (1) {;
                    } else {
                        $('body')
                            .html('Error');
                    }
                });
            }
            });

        // Code Fork button click
        $("#fork")
            .click(function () {
                var sol_box = editor.getValue();
                data_passed = {
                    code: sol_box
                    , code_id: code_id
                };
                $.get('/CodeTable_app/clone/', data_passed, function (url) {
                    var new_url = window.location.href;
                    new_url = new_url.slice(0, -11);
                    new_url = new_url + url;
                    console.log(new_url);
                    clone_count = clone_count + 1;
                    show_forkcount();
                    window.open(new_url);
                });
            });

        // On clicking delete button
        $("#delete")
            .click(function () {
                data_passed = {
                    code_id: code_id
                };
                $.get('/CodeTable_app/delete/', data_passed, function () {
                    var new_url = window.location.href;
                    new_url = new_url.slice(0, -11);
                    window.location = new_url;
                    if (1) {;
                    } else {
                        $('body')
                            .html('Error');
                    }
                });
            });

        $("#comment")
            .hide();
        $('#itmb1')
            .hide();
        $('#b1')
            .hide();
        $('#lbl')
            .hide();
        $('#email')
            .hide();

        // /////////////////// Experiments /////////////////////////////////////////////////////////////////

        // editor.on('change', function () {
        //     this.handleEditor1Changed = function (e) {
        //         var deltas = new Array();
        //         deltas[0] = e.data;
        //         console.log("Change event : -" + deltas + " " + e);
        //     };
        // });

    });
