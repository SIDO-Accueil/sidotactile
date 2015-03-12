/*eslint-env jquery, browser */

$(document).ready(function(){
    "use strict";

    $('input[type="range"]').change(function () {
        console.log($(this).val());
    });

    // INITIALISATION
    $(".form1").val(
    {
        "sidome": {
            "default": true, // the sidome is a cube by default
            "visible": true,  // visibilty
            "badge": "<NUMERO DE BADGE>",
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
                        "face1": 0,
                        "face2": 0,
                        "face3": 0,
                        "face4": 0
                    }
                },
                "node2": {
                    "x": 0,
                    "y": 0,
                    "z": 1,
                    "faces": {
                        "face1": 0,
                        "face2": 0,
                        "face3": 0,
                        "face4": 0
                    }
                },
                "node3": {
                    "x": 0,
                    "y": 1,
                    "z": 0,
                    "faces": {
                        "face1": 0,
                        "face2": 0,
                        "face3": 0,
                        "face4": 0
                    }
                },
                "node4": {
                    "x": 1,
                    "y": 0,
                    "z": 0,
                    "faces": {
                        "face1": 0,
                        "face2": 0,
                        "face3": 0,
                        "face4": 0
                    }
                },
                "node5": {
                    "x": 0,
                    "y": 0,
                    "z": -1,
                    "faces": {
                        "face1": 0,
                        "face2": 0,
                        "face3": 0,
                        "face4": 0
                    }
                },
                "node6": {
                    "x": 0,
                    "y": -1,
                    "z": 0,
                    "faces": {
                        "face1": 0,
                        "face2": 0,
                        "face3": 0,
                        "face4": 0
                    }
                }
            }
        }
    });

    // INITIALISATION
    $(".form2").val(
        {
            "sidome": {
                "default": true, // the sidome is a cube by default
                "visible": true,  // visibilty
                "badge": "<NUMERO DE BADGE>",
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
                            "face1": 0,
                            "face2": 0,
                            "face3": 0,
                            "face4": 0
                        }
                    },
                    "node2": {
                        "x": 0,
                        "y": 0,
                        "z": 1,
                        "faces": {
                            "face1": 0,
                            "face2": 0,
                            "face3": 0,
                            "face4": 0
                        }
                    },
                    "node3": {
                        "x": 0,
                        "y": 1,
                        "z": 0,
                        "faces": {
                            "face1": 0,
                            "face2": 0,
                            "face3": 0,
                            "face4": 0
                        }
                    },
                    "node4": {
                        "x": 1,
                        "y": 0,
                        "z": 0,
                        "faces": {
                            "face1": 0,
                            "face2": 0,
                            "face3": 0,
                            "face4": 0
                        }
                    },
                    "node5": {
                        "x": 0,
                        "y": 0,
                        "z": -1,
                        "faces": {
                            "face1": 0,
                            "face2": 0,
                            "face3": 0,
                            "face4": 0
                        }
                    },
                    "node6": {
                        "x": 0,
                        "y": -1,
                        "z": 0,
                        "faces": {
                            "face1": 0,
                            "face2": 0,
                            "face3": 0,
                            "face4": 0
                        }
                    }
                }
            }
        });

    // INITIALISATION
    $(".form3").val(
        {
            "sidome": {
                "default": true, // the sidome is a cube by default
                "visible": true,  // visibilty
                "badge": "<NUMERO DE BADGE>",
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
                            "face1": 0,
                            "face2": 0,
                            "face3": 0,
                            "face4": 0
                        }
                    },
                    "node2": {
                        "x": 0,
                        "y": 0,
                        "z": 1,
                        "faces": {
                            "face1": 0,
                            "face2": 0,
                            "face3": 0,
                            "face4": 0
                        }
                    },
                    "node3": {
                        "x": 0,
                        "y": 1,
                        "z": 0,
                        "faces": {
                            "face1": 0,
                            "face2": 0,
                            "face3": 0,
                            "face4": 0
                        }
                    },
                    "node4": {
                        "x": 1,
                        "y": 0,
                        "z": 0,
                        "faces": {
                            "face1": 0,
                            "face2": 0,
                            "face3": 0,
                            "face4": 0
                        }
                    },
                    "node5": {
                        "x": 0,
                        "y": 0,
                        "z": -1,
                        "faces": {
                            "face1": 0,
                            "face2": 0,
                            "face3": 0,
                            "face4": 0
                        }
                    },
                    "node6": {
                        "x": 0,
                        "y": -1,
                        "z": 0,
                        "faces": {
                            "face1": 0,
                            "face2": 0,
                            "face3": 0,
                            "face4": 0
                        }
                    }
                }
            }
        });


    //$(".form1").val({
    //    "v1": 50,
    //    "v2": 50,
    //    "v3": 50,
    //    "v4": 50,
    //    "v5": 50,
    //    "v6": 50
    //});
    //
    //$(".form2").val({
    //    "v1": 50,
    //    "v2": 50,
    //    "v3": 50,
    //    "v4": 50,
    //    "v5": 50,
    //    "v6": 50
    //});
    //
    //$(".form3").val({
    //    "v1": 50,
    //    "v2": 50,
    //    "v3": 50,
    //    "v4": 50,
    //    "v5": 50,
    //    "v6": 50
    //});


	// RESET THE FORM VALUES BECAUSE SOME BROWSERS USE CACHED VALUES
	$(".questionHidden").val(50);

	// SLIDER
	$(".slider").each(function(index, ele){
		$(ele).slider({
			min: -100,
			max: 100,
			slide: function(event, ui) {
				var valuePercentage = parseInt((ui.value + 100) / 2);
				var sliderRel = $(ele).attr("rel") + "";

                if (sliderRel === "1") {
                    $(ele).parents(".form").val().sidome.nodes["node" + sliderRel].x = valuePercentage / -50;
                } else if (sliderRel === "2") {
                    $(ele).parents(".form").val().sidome.nodes["node" + sliderRel].z = valuePercentage / 50;
                } else if (sliderRel === "3") {
                    $(ele).parents(".form").val().sidome.nodes["node" + sliderRel].y = valuePercentage / 50;
                } else if (sliderRel === "4") {
                    $(ele).parents(".form").val().sidome.nodes["node" + sliderRel].x = valuePercentage / 50;
                } else if (sliderRel === "5") {
                    $(ele).parents(".form").val().sidome.nodes["node" + sliderRel].z = valuePercentage / -50;
                } else if (sliderRel === "6") {
                    $(ele).parents(".form").val().sidome.nodes["node" + sliderRel].y = valuePercentage / -50;
                }
			},
			stop: function(event, ui) {
				var valuePercentage = parseInt((ui.value + 100) / 2);
				var sliderRel = $(ele).attr("rel") + "";
				$(ele).parents(".form").find("input[name=\"question" + sliderRel + "\"]").val(valuePercentage);
			}
		});
	});

	// BUTTONS
	$(".buttonRestart").click(function(){
		cleanForm($(this).parents(".form"));
	});
	$(".buttonStop").click(function(){
		// Not sure what to do here
	});

	// PROCESSING
	var processingInstances = [];
	$(".sidomeImage canvas").each(function(index, ele){
		processingInstances.push(new Processing(ele, drawPoly));
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

function drawPoly(processing) {
    "use strict";
    processing.draw = function() {
		// Some tests using processing, I dunno how to make the 3D (as the box) work
		// The reference is on http://processingjs.org/reference/

		processing.background(0);
		processing.fill(204, 102, 0);
		processing.stroke(255);
		processing.ellipse(100,70,60,60);
		processing.stroke(204, 102, 0);
		processing.rect(30, 20, 20, 20);
		processing.translate(58, 48, 0);
		processing.rotateY(0.5);
		processing.box(40);
	};
}
