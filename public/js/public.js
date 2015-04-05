/*eslint-env jquery, browser */

Array.prototype.shuffle = function() {
    var s = [];
    while (this.length) s.push(this.splice(Math.random() * this.length, 1)[0]);
    while (s.length) this.push(s.pop());
    return this;
}

var tab = new Array(1, 2, 3, 4, 5, 6, 7, 8);


function getAttr(input, i)
{

    input.attributes[2].value = tab[i];
}

function initJSON(form, badge)
{
    "use strict";

    form.val(
    {
        "sidome": {
            "finish": false, // the sidome is a cube by default
            "visible": true,  // visibilty
            "id": badge,
            "color": {
                "r": 255,
                "g": 255,
                "b": 255
            },
            "nodes": {
                "node1": {
                    "x": -1.25,
                    "y": -1.25,
                    "z": 1.25
                },
                "node2": {
                    "x": 1.25,
                    "y":-1.25,
                    "z": 1.25
                },
                "node3": {
                    "x": 1.25,
                    "y": 1.25,
                    "z": 1.25
                },
                "node4": {
                    "x": -1.25,
                    "y": 1.25,
                    "z": 1.25
                },
                "node5": {
                    "x": 1.25,
                    "y": -1.25,
                    "z": -1.25
                },
                "node6": {
                    "x": -1.25,
                    "y": -1.25,
                    "z": -1.25
                },
                "node7": {
                    "x": -1.25,
                    "y": 1.25,
                    "z": -1.25
                },
                "node8": {
                    "x": 1.25,
                    "y": 1.25,
                    "z": -1.25
                }
            }
        }
    });
}

function reinitialisation(canvas)
{

    initJSON($(canvas).parents(".form"),"<NUMERO DE BADGE>");
    $(canvas).parents(".form").val().occupe = false;
    var remerciement = $(canvas).parents(".form").children(".bye-bye");
    var accueil  = $(canvas).parents(".form").children(".accueil");
    $(canvas).parents(".form").children("input").val("");
    $(canvas).parents(".form").children(".bienvenue").find(".username").html("");
    $(canvas).parents(".form").find(".questionHidden").val("62.5");
    $(canvas).parents(".form").find(".slider").val(50);

    $(remerciement).hide( "blind", 1000 );
    $(accueil).show( "fold", 1000 );
}

function checkSidome(sidome, form) {
    "use strict";

    var tableau = [];
    for(var i = 1; i < 9; i++){
        var node = $(form).val().sidome.nodes["node"+i];

        if(!(Math.abs(node.x) === 1.25 && Math.abs(node.y) === 1.25 && Math.abs(node.z) === 1.25))    tableau[tableau.length]=i;
    }
    console.log(tableau);
    var j = 1;
    while(tableau.length < 6){
        if( tableau.indexOf(j) === -1 )
            tableau[tableau.length] = j;
        j++;
    }
    /*for(var i = 1; i < 9; i++){
        console.log($($(form).children(".formIns").children(".wrapperSliders").children(".sliderSection")[i]).children(".sliderSectionIns").children("input"));
        $(input).parents(".form").val().sidome.nodes["node" + sliderRel].z
    }*/
    var i = 0;

    $.each($(form).children(".formIns").children(".wrapperSliders").children(".sliderSection"),function(){
        var temp = $(this).children(".sliderSectionIns").children("input");
        var val = Math.abs($(form).val().sidome.nodes["node" + tableau[i]].y) - 0.25;
        //var i = $(temp).attr("rel");
        /*console.log(i);
        console.log(tableau[i-1]);*/
        console.log($(temp).attr("rel"));
        console.log($(form).val().sidome.nodes["node" + tableau[i]].y);
        $(temp).val(val * 50);
        $(temp).attr("rel",tableau[i]);
        i += 1;
    });
}

function getPersonExtern(badge) {
    "use strict";

    // returns a promises that fullfiled with the json object
    return $.ajax({
        type: "GET",
        url: "http://www.sido-event.com/inscriptions/sido_connecte/get/"+ badge + "/bypass",
        accept: "application/json"
    });

    // FOR TESTING PURPOSE ONLY, WAITING FOR THE SIDO PERSON API:
   /* return new Promise(function (resolve, reject) {
        var johndoe = {
            "id": badge,
            "civilite": "M.",
            "nom": md5(badge),
            "prenom": md5(md5(badge)),
            "twitter": "@" + md5(md5(badge)) + md5(badge),
            "email": md5(md5(md5(badge))) + "@mail.me",
            "company": md5(md5(md5(md5(md5(badge)))))
        };
        resolve(johndoe);
    });*/
}

function getPerson(id) {
    "use strict";

    // returns a promises that fullfiled with the json object
    return $.ajax({
        type: "GET",
        url: "http://sido.qze.fr:3001/persons/" + id,
        accept: "application/json"
    });
}

function getSidome(id) {
    "use strict";

    // returns a promises that fullfiled with the json object
    return $.ajax({
        type: "GET",
        url: "http://sido.qze.fr:3001/sidomes/" + id,
        accept: "application/json"
    });
}

function postPerson(json, badge) {
    "use strict";

    return $.ajax({
        type: "POST",
        url: "http://sido.qze.fr:3001/persons/" + badge,
        data: json,
        processData: false,
        contentType: "application/json"
    });
}

function postSidome(sidome) {
    "use strict";

    return $.ajax({
        type: "POST",
        url: "http://sido.qze.fr:3001/sidomes",
        data: JSON.stringify(sidome),
        processData: false,
        contentType: "application/json"
    });
}

function putSidome(sidome) {
    "use strict";
    $.ajax({
        type: "PUT",
        url: "http://sido.qze.fr:3001/sidomes",
        data: JSON.stringify(sidome),
        processData: false,
        contentType: "application/json"
    });
}

function testPOST() {
    "use strict";
    return $.ajax({
        type: "POST",
        url: "http://sido.qze.fr:4242/personsjson409",
        processData: false,
        contentType: "application/json"
    });
}

function getUser(input) {
    "use strict";

    

    if(input.value != "")
    {

        var form = null;

        if($(".form1").val().occupe == true) // Si c'est déjà occupé
        {
            if($(".form2").val().occupe == false)
            { // Si le second ne l'est pas
                form = $(".form2");
            }
        }
        else {
            form = $(".form1");
        }

        if(form != null){

            $(form).val().sidome.id = input.value;

            /*testPOST().then(function( data, textStatus, jqXHR ){
                console.log(data);
                console.log(textStatus);
                console.log(jqXHR.status);
            }).fail(function( jqXHR, textStatus, errorThrown ){
                console.log(JSON.parse(jqXHR.responseText));
                console.log(jqXHR);
                console.log(textStatus);
                console.log(errorThrown);
            });*/
            
            getPerson($(form).val().sidome.id).then(function(json, textStatus, jqXHR) {  // Réponse 200 ok   person already exists
                // we get his sidome
                console.log(json);
                console.log(jqXHR.status);
                console.log(jqXHR.status === 200);
                var user = json;
                var prenom = user.prenom;
                $(form).find(".username").html(prenom);
                getSidome($(form).val().sidome.id).then(function(si) {      //sidome already exists 200
                    $(form).val().sidome = si;

                    //$(form).children(".form").children(".formIns").find(".button .go").html("Modifier");

                    var refreshIntervalId = setInterval( function() {
                        putSidome(si);
                    }, 5000 );
                    $(form).val().refreshIntervalId = refreshIntervalId; // save the setInterval ID to break it when SEND button pressed

                    checkSidome($(form).val().sidome, $(form));

                    $(form).children("input").val("");
                    $(form).val().occupe = true;

                    $(form).children(".accueil").hide( "blind", 100 );
                    $(form).children(".bienvenue").show( "clip", 300 );

                }).fail(function(jqXHR, textStatus, errorThrown) {    // He doesn't have sidome
                    var sidome = $(form).val().sidome;
                    postSidome(sidome).then(function(){
                        var refreshIntervalId = setInterval( function() {
                            putSidome(sidome);
                        }, 5000 );
                        $(form).val().refreshIntervalId = refreshIntervalId; // save the setInterval ID to break it when SEND button pressed

                        tab.shuffle();
                        console.log(tab);
                        $.each($(form).children(".formIns").children(".wrapperSliders").children(".sliderSection"),function(){
                            var temp = $(this).children(".sliderSectionIns").children("input");
                            var i = $(temp).attr("rel");
                            $(this).children(".sliderSectionIns").children("input").attr("rel",tab[i]);
                        });

                        $(form).children("input").val("");
                        $(form).val().occupe = true;

                        $(form).children(".accueil").hide( "blind", 100 );
                        $(form).children(".bienvenue").show( "clip", 300 );

                    }).fail(function(jqXHR, textStatus, errorThrown) {  // Sidome already exists
                        if(errorThrown === "Not Found"){
                            console.log( "error" );
                        }
                        console(jqXHR)
                    });
                });

                /*postPerson(json).then(function() {

                    var sidome = $(form).val().sidome;
                    postSidome(sidome).then(function(){
                        var refreshIntervalId = setInterval( function() {
                            putSidome(sidome);
                        }, 5000 );
                        $(form).val().refreshIntervalId = refreshIntervalId; // save the setInterval ID to break it when SEND button pressed

                    }).fail(function() {
                        console.log( "error" );
                    });
                }).fail(function() {

                    // POST /persons failed, user already exist
                    var sidome = $(form).val().sidome;
                    postSidome(sidome).then(function(){
                        var refreshIntervalId = setInterval( function() {
                            putSidome(sidome);
                        }, 5000 );
                        $(form).val().refreshIntervalId = refreshIntervalId; // save the setInterval ID to break it when SEND button pressed
                    }).fail(function() {

                        // The sidome already exist
                        // we get it
                        getSidome(sidome.id).then(function(si) {
                            $(form).val().sidome = si;
                            var refreshIntervalId = setInterval( function() {
                                putSidome(si);
                            }, 5000 );
                            $(form).val().refreshIntervalId = refreshIntervalId; // save the setInterval ID to break it when SEND button pressed
                        });
                    });
                });*/
            }).fail(function(jqXHR, textStatus, errorThrown){  // Réponse 404 Not found on our database
                getPersonExtern($(form).val().sidome.id).then(function(person){       //Search in Sido database  - then 200 ok
                    var user = JSON.parse(person);
                    var prenom = user.prenom;
                    console.log(user);

                    $(form).find(".username").html(prenom);
                    console.log(prenom);
                    console.log( $(form).find(".username"));
                    postPerson(person, $(form).val().sidome.id).then(function() {        // Posts it in the base
                        var sidome = $(form).val().sidome;
                        postSidome(sidome).then(function(){     //Create a sidome
                            var refreshIntervalId = setInterval( function() {
                                putSidome(sidome);
                            }, 5000 );
                            $(form).val().refreshIntervalId = refreshIntervalId; // save the setInterval ID to break it when SEND button pressed

                            tab.shuffle();
                            console.log(tab);
                            $.each($(form).children(".formIns").children(".wrapperSliders").children(".sliderSection"),function(){
                                var temp = $(this).children(".sliderSectionIns").children("input");
                                var i = $(temp).attr("rel");
                                $(this).children(".sliderSectionIns").children("input").attr("rel",tab[i]);
                            });

                            $(form).children("input").val("");
                            $(form).val().occupe = true;

                            $(form).children(".accueil").hide( "blind", 100 );
                            $(form).children(".bienvenue").show( "clip", 300 );

                        }).fail(function(jqXHR, textStatus, errorThrown){     // Réponse 409 already exists ???
                            
                            if(jqXHR.status === 409){
                                getSidome($(form).val().sidome.id).then(function(si) {      //sidome already exists 200
                                    $(form).val().sidome = si;
                                    var refreshIntervalId = setInterval( function() {
                                        putSidome(si);
                                    }, 5000 );
                                    $(form).val().refreshIntervalId = refreshIntervalId; // save the setInterval ID to break it when SEND button pressed

                                    checkSidome($(form).val().sidome, $(form));

                                    $(form).children("input").val("");
                                    $(form).val().occupe = true;

                                    $(form).children(".accueil").hide( "blind", 100 );
                                    $(form).children(".bienvenue").show( "clip", 300 );

                                });
                            }
                            else if(jqXHR.status === 404){
                                console.log("Error");
                            }
                            /*$(form).val().sidome = si;

                            //$(form).children(".form").children(".formIns").find(".button .go").html("Modifier");

                            var refreshIntervalId = setInterval( function() {
                                putSidome(si);
                            }, 5000 );²²²²²²²²²²²²²²²²²²²²²²²²²²²²²²²²²²²²²²²²²²²²²²²²²²²²²²²²²²²²²²²²²²²²²²²²²²²²²²²²²²²²²²²²² ²²²
                            $(form).val().refreshIntervalId = refreshIntervalId; // save the setInterval ID to break it when SEND button pressed

                            checkSidome($(form).val().sidome);*/

                        });
                    }).fail(function(jqXHR, textStatus, errorThrown){     // Réponse  409 person already exists 
                        if(jqXHR.status === 409){
                            getSidome($(form).val().sidome.id).then(function(si) {      //sidome already exists 200
                                $(form).val().sidome = si;
                                var refreshIntervalId = setInterval( function() {
                                    putSidome(si);
                                }, 5000 );
                                $(form).val().refreshIntervalId = refreshIntervalId; // save the setInterval ID to break it when SEND button pressed

                                checkSidome($(form).val().sidome, $(form));

                                $(form).children("input").val("");
                                $(form).val().occupe = true;

                                $(form).children(".accueil").hide( "blind", 100 );
                                $(form).children(".bienvenue").show( "clip", 300 );

                            });
                        }
                        else if(jqXHR.status === 404){
                            console.log("Error");
                        }
                    });
                }).fail(function(jqXHR, textStatus, errorThrown){     // Réponse 404 not in their base 
                        
                });
            });
            
        }
        input.value = "";
    }
}

function componentToHex(c) {
    var hex = c.toString(16);
    return hex.length == 1 ? "0" + hex : hex;
}

function rgbToHex(r, g, b) {
    return "#" + componentToHex(r) + componentToHex(g) + componentToHex(b);
}

function reponseQuestion(input)
{
    var valuePercentage = $(input).val();
        var sliderRel = $(input).attr("rel");

        if (sliderRel === "1") {
            $(input).parents(".form").val().sidome.nodes["node" + sliderRel].x = (valuePercentage / -50)-0.25;
            $(input).parents(".form").val().sidome.nodes["node" + sliderRel].y = (valuePercentage / -50)-0.25;
            $(input).parents(".form").val().sidome.nodes["node" + sliderRel].z = (valuePercentage / 50)+0.25;

        } else if (sliderRel === "2") {
            $(input).parents(".form").val().sidome.nodes["node" + sliderRel].x = (valuePercentage / 50)+0.25;
            $(input).parents(".form").val().sidome.nodes["node" + sliderRel].y = (valuePercentage / -50)-0.25;
            $(input).parents(".form").val().sidome.nodes["node" + sliderRel].z = (valuePercentage / 50)+0.25;

        } else if (sliderRel === "3") {
            $(input).parents(".form").val().sidome.nodes["node" + sliderRel].x = (valuePercentage / 50)+0.25;
            $(input).parents(".form").val().sidome.nodes["node" + sliderRel].y = (valuePercentage / 50)+0.25;
            $(input).parents(".form").val().sidome.nodes["node" + sliderRel].z = (valuePercentage / 50)+0.25;

        } else if (sliderRel === "4") {
            $(input).parents(".form").val().sidome.nodes["node" + sliderRel].x = (valuePercentage / -50)-0.25;
            $(input).parents(".form").val().sidome.nodes["node" + sliderRel].y = (valuePercentage / 50)+0.25;
            $(input).parents(".form").val().sidome.nodes["node" + sliderRel].z = (valuePercentage / 50)+0.25;

        } else if (sliderRel === "5") {

            $(input).parents(".form").val().sidome.nodes["node" + sliderRel].x = (valuePercentage / 50)+0.25;
            $(input).parents(".form").val().sidome.nodes["node" + sliderRel].y = (valuePercentage / -50)-0.25;
            $(input).parents(".form").val().sidome.nodes["node" + sliderRel].z = (valuePercentage / -50)-0.25;

        } else if (sliderRel === "6") {
            $(input).parents(".form").val().sidome.nodes["node" + sliderRel].x = (valuePercentage / -50)-0.25;
            $(input).parents(".form").val().sidome.nodes["node" + sliderRel].y = (valuePercentage / -50)-0.25;
            $(input).parents(".form").val().sidome.nodes["node" + sliderRel].z = (valuePercentage / -50)-0.25;

        } else if (sliderRel === "7") {
            $(input).parents(".form").val().sidome.nodes["node" + sliderRel].x = (valuePercentage / -50)-0.25;
            $(input).parents(".form").val().sidome.nodes["node" + sliderRel].y = (valuePercentage /  50)+0.25;
            $(input).parents(".form").val().sidome.nodes["node" + sliderRel].z = (valuePercentage / -50)-0.25;

        } else if (sliderRel === "8") {
            $(input).parents(".form").val().sidome.nodes["node" + sliderRel].x = (valuePercentage / 50)+0.25;
            $(input).parents(".form").val().sidome.nodes["node" + sliderRel].y = (valuePercentage / 50)+0.25;
            $(input).parents(".form").val().sidome.nodes["node" + sliderRel].z = (valuePercentage / -50)-0.25;
        }
}

$(document).ready(function(){
    "use strict";

    setInterval( function() { $(".input_userid").focus(); }, 200 );

    $(document).on('contextmenu', 'body', function(e)
    {
        e.preventDefault();
        return false;
    });

    $(".form").each(function(){
        
        initJSON($(this), "<NUMERO DE BADGE>");
        $(this).val().occupe = false;
    });

    // RESET THE FORM VALUES BECAUSE SOME BROWSERS USE CACHED VALUES
    $(".questionHidden").val(50);

    $("input[type=\"range\"]").on("touchmove", function() {
        reponseQuestion(this);
    });

    $("input[type=\"range\"]").change(function () {
        reponseQuestion(this);
    });

    // BUTTONS
    $(".go").click(function(){
        var form = $(this).parents(".form");
        $(form).children(".bienvenue").hide( "blind", 1000 );
        $(form).children(".formIns").show( "clip", 3000 );
    });

    $(".buttonStop").click(function(){
        // Not sure what to do here
        var a = $(this).parents(".formIns");
        var canvas = $(a).parents(".form").children(".remerciement").children(".keep-canvas");

        clearInterval($(a).parent().val().refreshIntervalId);
        putSidome($(a).parent().val().sidome);

        a.hide( "blind", 1000 );

        $(a.parents(".form").children(".remerciement")).show( "clip", 4000 );

    });

    // FORM SUBMIT
    $(".formSite").submit(function(evt){
        evt.stopImmediatePropagation();
        $.post($(this).attr("action"), $(this).serialize(), function(response){

        });
        return false;
    });

});

$(window).load(function() {
    "use strict";
});

$(window).resize(function() {
    "use strict";
});

function cleanForm(formDiv) {
    "use strict";
    
    $(formDiv).find(".questionHidden").val("62.5");
    $(formDiv).find(".slider").val(50);
    initJSON(formDiv, $(formDiv).val().sidome.id);
    console.log($(formDiv).val().sidome);
}