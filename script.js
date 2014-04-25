$(document).ready(function() {

	var editIsOpen = false;

	// react to when form is submitted
	$("#add_item").click(function(event) {
    	event.preventDefault();
  	
    	// get values from form
		var first_name 	= $("#first_name").val();
		var last_name 	= $("#last_name").val();
		var age 		= $("#age").val();
		var profession	= $("#profession").val();

		// if there was input in the textfields we add it as an item
		if(first_name !== "" && last_name !== "" && age !== "" && profession !== "")
		{
			// empty the form
			$('#item_form').trigger("reset");

			// add element to list of items
			var item = "<div class=\"item\">" +
							"<div class=\"first_row\">" +
								"<span class=\"span_first_name\">" + first_name + "</span> " +
								"<span class=\"span_last_name\">" + last_name + "</span>" +
								"<a class=\"item_remove\" href=\"#\">Remove</a>"+
								"<a class=\"item_edit\" href=\"#\">Edit</a>"+
								"<a class=\"item_details\" href=\"#\">Details</a>" +
							"</div>"+
							"<div class=\"item_age_profession\">Age: "+age+" Profession: "+profession+"</div>"+
						"</div>";
			$( "#list_of_items" ).append( item );

			// set focus back in the textbox
			$( "#first_name" ).focus();
		}
    });

	// react to click on detail-button
	$('#list_of_items').on('click', '.item_details', function(event) {
	    // stop load of link
		event.preventDefault();

		if($(this).parent().parent().children( ".item_age_profession" ).is(":hidden"))
		{
			$(this).parent().parent().children( ".item_age_profession" ).slideDown("slow");
		}
		else
		{
			$(this).parent().parent().children( ".item_age_profession" ).slideUp( "slow", function() {
    			$(this).parent().parent().children( ".item_age_profession" ).hide();
  			});
		}
	});

	// remove parent of 'remove' link when link is clicked
	$('#list_of_items').on('click', '.item_remove', function(event) {
	    // stop load of link
		event.preventDefault();

		// animation
		$(this).parent().fadeOut( "slow", function() {
			// animation finished -> remove element
			$(this).remove();
		});
	});

	// replace item with form when user clicks edit
	$('#list_of_items').on('click', '.item_edit', function(event) {
	    // stop load of link
		event.preventDefault();

		if(!editIsOpen)
		{
			editIsOpen = true;
			// get values from span !!!!!!!!!!!!!!BUGG!!!!!!!!!!!!!!!!!!!!
			//var first_name = $( ".span_first_name" ).html();
			//var last_name = $( ".span_last_name" ).html();
			var first_name = $(this).parent().children( ".span_first_name" ).html();
			var last_name = $(this).parent().children( ".span_last_name" ).html();

			// create form as variable
			var edit_form = "<form class=\"form_edit\">"+
								"<p>"+
									"<label for=\"first_name\">First name: </label>"+
									"<input id=\"edit_first_name\" type=\"text\" name=\"first_name\" value=\""+first_name+"\"/>"+
								"</p><p>"+
									"<label for=\"last_name\">Last name: </label>"+
									"<input id=\"edit_last_name\" type=\"text\" name=\"last_name\" value=\""+last_name+"\"/>"+
								"</p><a id=\"save_item\" href=\"#\">Save</a></form>";

			// replace div with form
			$(this).parent().html(edit_form);
		}
	});

	// save form to item
	$('#list_of_items').on('click', '#save_item', function(event) {
	    // stop load of link
		event.preventDefault();

		// get values from form
		var edit_first_name = $( "#edit_first_name" ).val();
		var edit_last_name = $( "#edit_last_name" ).val();

		// if there was input in the textfields we add it as an item
		if(edit_first_name !== "" && edit_last_name !== "")
		{
			// add element to list of items
			var edit_item = "<span class=\"span_first_name\">" + edit_first_name + "</span> <span class=\"span_last_name\">" + edit_last_name + 
						"</span><a class=\"item_remove\" href=\"#\">Remove</a><a class=\"item_edit\" href=\"#\">Edit</a>";

			// replace form with div after animation
			$(this).parent().fadeOut( "slow", function() {
				// animation finished -> remove element
				$(this).parent().html(edit_item);
				editIsOpen = false;
			});
		}
	});
});