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
            "default": true, // the sidome is a cube by default
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
    var bienvenue  = $(canvas).parents(".form").children(".bienvenue");
    $(canvas).parents(".form").children("input").val("");

    $(canvas).parents(".form").find(".questionHidden").val("62.5");
    $(canvas).parents(".form").find(".slider").val(50);

    //$(canvas).draggable( 'destroy' );
    $(canvas).unbind("click");
    $(canvas).parents(".form").find(".sidomeImageIns").append(canvas);
    $(remerciement).html("");
    $(remerciement).hide( "blind", 1000 );
    $(bienvenue).show( "clip", 2000 );
}

function getPerson(id) {
    "use strict";

    // returns a promises that fullfiled with the json object
    return $.ajax({
        type: "GET",
        url: "http://localhost:3000/persons/" + id,
        accept: "application/json"
    });
}

function getSidome(id) {
    "use strict";

    // returns a promises that fullfiled with the json object
    return $.ajax({
        type: "GET",
        url: "http://localhost:3000/sidomes/" + id,
        accept: "application/json"
    });
}

function postPerson(json) {
    "use strict";

    return $.ajax({
        type: "POST",
        url: "http://localhost:3000/persons",
        data: JSON.stringify(json),
        processData: false,
        contentType: "application/json"
    });
}

function postSidome(sidome) {
    "use strict";

    return $.ajax({
        type: "POST",
        url: "http://localhost:3000/sidomes",
        data: JSON.stringify(sidome),
        processData: false,
        contentType: "application/json"
    });
}

function putSidome(sidome) {
    "use strict";
    $.ajax({
        type: "PUT",
        url: "http://localhost:3000/sidomes",
        data: JSON.stringify(sidome),
        processData: false,
        contentType: "application/json"
    });
}

function getUser(input) {
    "use strict";

    tab.shuffle();

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
           
            $.each($(form).children(".formIns").children(".wrapperSliders").children(".sliderSection"),function(){
                var temp = $(this).children(".sliderSectionIns").children("input");
                var i = $(temp).attr("rel");
                $(this).children(".sliderSectionIns").children("input").attr("rel",tab[i]);
            });
            $(form).children(".bienvenue").hide( "blind", 1000 );
            $(form).children(".formIns").show( "clip", 3000 );
            $(form).val().sidome.id = input.value;

            // form.childNodes[7].childNodes[1].innerHTML += " " + prenom; // TODO BUG ICI

            getPerson(input.value)
                .then(function(json) {
                    //$(form).find(".welcome").find("h2").append(' ' + json.prenom);
                    postPerson(json).then(function() {

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
                    });
                });
            //console.log($(form).children("input"));
            $(form).children("input").val("");
            $(form).val().occupe = true;

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

        clearInterval($(a).parent().val().refreshIntervalId);
        putSidome($(a).parent().val().sidome);

        var canvasData = $(".keep-canvas1")[0].toDataURL("image/png");
        $.ajax({
            type: "POST",
            url: "http://localhost:3000/image" + $(a).parent().val().sidome.id,
            data: canvasData,
            processData: false,
            contentType: "application/"
        });

        a.hide( "blind", 1000 );

        var c = a.children(".sidomeImage").children('.sidomeImageIns').children('canvas');

        a.parents(".form").children(".remerciement").append('<div class="fleche"> <div class="haut"></div><div class="bas"></div> </div>');
        a.parents(".form").children(".remerciement").append(c);
        $(a.parents(".form").children(".remerciement")).show( "clip", 4000 );

        c.click(function(){
            $(this).parents(".remerciement").hide( "blind", 1000 );
            $(this).parents(".form").children(".bye-bye").show( "clip", 4000 );
           setTimeout(function(event) {
               reinitialisation(c);
            }, 10000);
        });
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