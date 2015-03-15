/*eslint-env jquery, browser */

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
                    "x": -1,
                    "y": 0,
                    "z": 0,
                    "faces": {       // each faces on where the node is needed
                        "face1": 1,
                        "face2": 4,
                        "face3": 7,
                        "face4": 8
                    }
                },
                "node2": {
                    "x": 0,
                    "y": 0,
                    "z": 1,
                    "faces": {
                        "face1": 1,
                        "face2": 2,
                        "face3": 5,
                        "face4": 7
                    }
                },
                "node3": {
                    "x": 0,
                    "y": 1,
                    "z": 0,
                    "faces": {
                        "face1": 1,
                        "face2": 2,
                        "face3": 3,
                        "face4": 4
                    }
                },
                "node4": {
                    "x": 1,
                    "y": 0,
                    "z": 0,
                    "faces": {
                        "face1": 2,
                        "face2": 3,
                        "face3": 5,
                        "face4": 6
                    }
                },
                "node5": {
                    "x": 0,
                    "y": 0,
                    "z": -1,
                    "faces": {
                        "face1": 3,
                        "face2": 4,
                        "face3": 6,
                        "face4": 8
                    }
                },
                "node6": {
                    "x": 0,
                    "y": -1,
                    "z": 0,
                    "faces": {
                        "face1": 5,
                        "face2": 6,
                        "face3": 7,
                        "face4": 8
                    }
                }
            }
        }
    });
}

function getPerson(id) {
    "use strict";

    // returns a promises that fullfiled with the json object
    return $.ajax({
        type: "GET",
        url: "http://vps.schrodingerscat.ovh:3000/persons/" + id,
        accept: "application/json"
    });
}

function postPerson(json) {
    "use strict";

    return $.ajax({
        type: "POST",
        url: "http://vps.schrodingerscat.ovh:3000/persons",
        data: JSON.stringify(json),
        processData: false,
        contentType: "application/json"
    });
}

function postSidome(sidome) {
    "use strict";

    return $.ajax({
        type: "POST",
        url: "http://vps.schrodingerscat.ovh:3000/sidomes",
        data: JSON.stringify(sidome),
        processData: false,
        contentType: "application/json"
    });
}

function putSidome(sidome) {
    "use strict";
    $.ajax({
        type: "PUT",
        url: "http://vps.schrodingerscat.ovh:3000/sidomes",
        data: JSON.stringify(sidome),
        processData: false,
        contentType: "application/json"
    });
}

function getUser(input) {
    "use strict";
    if(input.value != "")
    {
        input.nextSibling.nextSibling.style.display = "none";

        var form = input.parentNode;

        $(form.childNodes[7]).show( "clip", 500 );
        form.value.sidome.id = input.value;

        var prenom = "John";
        form.childNodes[7].childNodes[1].innerHTML += " " + prenom;

        getPerson(input.value)
            .then(function(json) {

                postPerson(json).then(function() {

                    var sidome = form.value.sidome;
                    postSidome(sidome).then(function(){
                        var refreshIntervalId = setInterval( function() {
                            putSidome(sidome);
                        }, 5000 );
                        form.value.refreshIntervalId = refreshIntervalId; // save the setInterval ID to break it when SEND button pressed
                    });
                });
            });
    }
}

$(document).ready(function(){
    "use strict";

	$(".form").each(function(){
		initJSON($(this), "<NUMERO DE BADGE>");
	});

	// RESET THE FORM VALUES BECAUSE SOME BROWSERS USE CACHED VALUES
	$(".questionHidden").val(50);

    $("input[type=\"range\"]").on("touchmove", function() {
        var valuePercentage = $(this).val();
        var sliderRel = $(this).attr("rel");

        console.log($(this).parents(".form"));
        if (sliderRel === "1") {
            $(this).parents(".form").val().sidome.nodes["node" + sliderRel].x = valuePercentage / -50;
        } else if (sliderRel === "2") {
            $(this).parents(".form").val().sidome.nodes["node" + sliderRel].z = valuePercentage / 50;
        } else if (sliderRel === "3") {
            $(this).parents(".form").val().sidome.nodes["node" + sliderRel].y = valuePercentage / 50;
        } else if (sliderRel === "4") {
            $(this).parents(".form").val().sidome.nodes["node" + sliderRel].x = valuePercentage / 50;
        } else if (sliderRel === "5") {
            $(this).parents(".form").val().sidome.nodes["node" + sliderRel].z = valuePercentage / -50;
        } else if (sliderRel === "6") {
            $(this).parents(".form").val().sidome.nodes["node" + sliderRel].y = valuePercentage / -50;
        }
    });

	$("input[type=\"range\"]").change(function () {
        var valuePercentage = $(this).val();
        var sliderRel = $(this).attr("rel");
        console.log($(this).parents(".form").val());
        console.log($(".form1").val());
        if (sliderRel === "1") {
            $(this).parents(".form").val().sidome.nodes["node" + sliderRel].x = valuePercentage / -50;
        } else if (sliderRel === "2") {
            $(this).parents(".form").val().sidome.nodes["node" + sliderRel].z = valuePercentage / 50;
        } else if (sliderRel === "3") {
            $(this).parents(".form").val().sidome.nodes["node" + sliderRel].y = valuePercentage / 50;
        } else if (sliderRel === "4") {
            $(this).parents(".form").val().sidome.nodes["node" + sliderRel].x = valuePercentage / 50;
        } else if (sliderRel === "5") {
            $(this).parents(".form").val().sidome.nodes["node" + sliderRel].z = valuePercentage / -50;
        } else if (sliderRel === "6") {
            $(this).parents(".form").val().sidome.nodes["node" + sliderRel].y = valuePercentage / -50;
        }
    });
	
	// BUTTONS
	$(".buttonRestart").click(function(){
		cleanForm($(this).parents(".form"));
	});

	$(".buttonStop").click(function(){
		// Not sure what to do here
        var a = $(this).parents(".formIns");

        clearInterval($(a).parent().val().refreshIntervalId);
        putSidome($(a).parent().val().sidome);

        //console.log(a);
        a.css("display","none");
        //console.log(a.parents(".form"));
        a.parents(".form").children(".remerciement").css("display","block");
        var c = a.children(".sidomeImage").children('.sidomeImageIns').children('canvas');
        //console.log(c);

        a.parents(".form").children(".remerciement").append('<div class="fleche"> <div class="haut"></div><div class="bas"></div> </div>');
        a.parents(".form").children(".remerciement").append(c);
        a.parents(".form").children(".remerciement").append("<h1><p>Merci de votre participation !</p> <p>Un mail contenant votre sidome vous sera envoyé.</p> <p>Envoyez votre sidome dans la Sidosphère ! </p></h1>");


        c.draggable();
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
    console.log($(formDiv).find(".questionHidden"));
    $(formDiv).find(".questionHidden").val("50");
	$(formDiv).find(".slider").val(50);
    console.log($(formDiv).find(".slider"));
}