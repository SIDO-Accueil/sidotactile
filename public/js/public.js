/*eslint-env jquery, browser */

function initJSON(form, badge)
{
    "use strict";
	form.val(
    {
        "sidome": {
            "default": true, // the sidome is a cube by default
            "visible": true,  // visibilty
            "badge":  badge,
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
    $(formDiv).find(".questionHidden").val(50);
	$(formDiv).find(".slider").slider({value: 0});
}
