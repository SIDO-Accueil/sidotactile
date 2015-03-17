/*eslint-env jquery, browser */

Array.prototype.shuffle = function() {
    var s = [];
    while (this.length) s.push(this.splice(Math.random() * this.length, 1)[0]);
    while (s.length) this.push(s.pop());
    return this;
}

var tab = new Array(1, 2, 3, 4, 5, 6, 7, 8);
//console.log(tab);

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

function getPerson(id) {
    "use strict";

    // returns a promises that fullfiled with the json object
    return $.ajax({
        type: "GET",
        url: "http://localhost:3000/persons/" + id,
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
    console.log(tab);

    if(input.value != "")
    {
        var form = input.parentNode;
        //console.log($(form).children(".formIns").children(".wrapperSliders").children(".sliderSection"));
        $.each($(form).children(".formIns").children(".wrapperSliders").children(".sliderSection"),function(){
            //console.log($(this).children(".sliderSectionIns").children("input"));
            var temp = $(this).children(".sliderSectionIns").children("input");
            var i = $(temp).attr("rel");
            $(this).children(".sliderSectionIns").children("input").attr("rel",tab[i]);
            //$(this).children(".sliderSectionIns").children("input").attr("rel") = 88;
            //console.log($(this).children(".sliderSectionIns").children("input").attr("rel"));
        });
        $(input.nextSibling.nextSibling).hide( "blind", 1000 );
        
        $(form.childNodes[7]).show( "clip", 3000 );
        form.value.sidome.id = input.value;

        console.log( $(form.childNodes[7]));
        var prenom = "John";
        // form.childNodes[7].childNodes[1].innerHTML += " " + prenom; // TODO BUG ICI

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

function componentToHex(c) {
    var hex = c.toString(16);
    return hex.length == 1 ? "0" + hex : hex;
}

function rgbToHex(r, g, b) {
    return "#" + componentToHex(r) + componentToHex(g) + componentToHex(b);
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

    });

	$("input[type=\"range\"]").change(function () {
        var valuePercentage = $(this).val();
        var sliderRel = $(this).attr("rel");

        if (sliderRel === "1") {
            $(this).parents(".form").val().sidome.nodes["node" + sliderRel].x = (valuePercentage / -50)-0.25;
            $(this).parents(".form").val().sidome.nodes["node" + sliderRel].y = (valuePercentage / -50)-0.25;
            $(this).parents(".form").val().sidome.nodes["node" + sliderRel].z = (valuePercentage / 50)+0.25;

        } else if (sliderRel === "2") {
            $(this).parents(".form").val().sidome.nodes["node" + sliderRel].x = (valuePercentage / 50)+0.25;
            $(this).parents(".form").val().sidome.nodes["node" + sliderRel].y = (valuePercentage / -50)-0.25;
            $(this).parents(".form").val().sidome.nodes["node" + sliderRel].z = (valuePercentage / 50)+0.25;

        } else if (sliderRel === "3") {
            $(this).parents(".form").val().sidome.nodes["node" + sliderRel].x = (valuePercentage / 50)+0.25;
            $(this).parents(".form").val().sidome.nodes["node" + sliderRel].y = (valuePercentage / 50)+0.25;
            $(this).parents(".form").val().sidome.nodes["node" + sliderRel].z = (valuePercentage / 50)+0.25;

        } else if (sliderRel === "4") {
            $(this).parents(".form").val().sidome.nodes["node" + sliderRel].x = (valuePercentage / -50)-0.25;
            $(this).parents(".form").val().sidome.nodes["node" + sliderRel].y = (valuePercentage / 50)+0.25;
            $(this).parents(".form").val().sidome.nodes["node" + sliderRel].z = (valuePercentage / 50)+0.25;

        } else if (sliderRel === "5") {

            $(this).parents(".form").val().sidome.nodes["node" + sliderRel].x = (valuePercentage / 50)+0.25;
            $(this).parents(".form").val().sidome.nodes["node" + sliderRel].y = (valuePercentage / -50)-0.25;
            $(this).parents(".form").val().sidome.nodes["node" + sliderRel].z = (valuePercentage / -50)-0.25;

        } else if (sliderRel === "6") {
            $(this).parents(".form").val().sidome.nodes["node" + sliderRel].x = (valuePercentage / -50)-0.25;
            $(this).parents(".form").val().sidome.nodes["node" + sliderRel].y = (valuePercentage / -50)-0.25;
            $(this).parents(".form").val().sidome.nodes["node" + sliderRel].z = (valuePercentage / -50)-0.25;

        } else if (sliderRel === "7") {
            $(this).parents(".form").val().sidome.nodes["node" + sliderRel].x = (valuePercentage / -50)-0.25;
            $(this).parents(".form").val().sidome.nodes["node" + sliderRel].y = (valuePercentage /  50)+0.25;
            $(this).parents(".form").val().sidome.nodes["node" + sliderRel].z = (valuePercentage / -50)-0.25;

        } else if (sliderRel === "8") {
            $(this).parents(".form").val().sidome.nodes["node" + sliderRel].x = (valuePercentage / 50)+0.25;
            $(this).parents(".form").val().sidome.nodes["node" + sliderRel].y = (valuePercentage / 50)+0.25;
            $(this).parents(".form").val().sidome.nodes["node" + sliderRel].z = (valuePercentage / -50)-0.25;
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

        a.hide( "blind", 1000 );

        //a.css("display","none");
        //a.parents(".form").children(".remerciement").css("display","block");
        var c = a.children(".sidomeImage").children('.sidomeImageIns').children('canvas');

        a.parents(".form").children(".remerciement").append('<div class="fleche"> <div class="haut"></div><div class="bas"></div> </div>');
        a.parents(".form").children(".remerciement").append(c);
        a.parents(".form").children(".remerciement").append("<h1><p>Merci de votre participation !</p> <p>Un mail contenant votre sidome vous sera envoyé.</p> <p>Envoyez votre Sidôme dans la Sidosphère ! </p></h1><h1>Bonne journée au SIDO!</h1>");
        $(a.parents(".form").children(".remerciement")).show( "clip", 4000 );

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
	
    $(formDiv).find(".questionHidden").val("50");
	$(formDiv).find(".slider").val(50);

}