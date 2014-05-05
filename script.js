$(document).ready(function() {

	var editFormIsOpen = false;

	// react to link button is clicked
	$("#add_item").click(function(event) {
		event.preventDefault();

		// get values from form
		var first_name	= $("#first_name").val();
		var last_name	= $("#last_name").val();
		var age			= $("#age").val(); 
		var profession	= $("#profession").val(); 

		// add element to list of items if form contains input
		if(first_name !== "" && last_name !== "" && age !== "" && profession !== "")
		{
			//var item = "<div class=\"item\">" + first_name + " " + last_name + "</div>";
			var item = "<div class=\"item\">" + 
							"<div class=\"first_row\">" + 
								"<span class=\"span_first_name\">" + first_name + "</span> " + 
								"<span class=\"span_last_name\">" + last_name + "</span>" + 
								"<a class=\"item_remove\" href=\"#\">Remove</a>"+ 
								"<a class=\"item_edit\" href=\"#\">Edit</a>"+ 
								"<a class=\"item_details\" href=\"#\">Details</a>" + 
							"</div>"+ 
							"<div class=\"item_age_profession\">Age: <span class=\"span_age\">"+age+
								"</span> Profession: <span class=\"span_profession\">"+profession+"</span></div>"+ 
						"</div>";

			$("#list_of_items").append(item);

			// empty form
			$("#item_form").trigger("reset");

			// set focus to form again
			$("#first_name").focus();
		}
	});

	// react to click on detail-button
	$("#list_of_items").on("click", ".item_details", function(event) {
		event.preventDefault();

		var details = $(this).parent().parent().children(".item_age_profession");

		if(details.is(":hidden"))
		{
			// show
			details.slideDown("slow");
		}
		else
		{
			// hide
			details.slideUp("slow", function () {
				details.hide();
			});
		}
	});

	// remove parent of "remove" link when clicked
	$("#list_of_items").on("click", ".item_remove", function(event) {
		event.preventDefault();

		var item = $(this).parent().parent();

		item.fadeOut("slow", function() {
			item.remove();
		});
	});

	// replace item with edit form when user clicks edit button
	$("#list_of_items").on("click", ".item_edit", function(event) {
		event.preventDefault();

		if(!editFormIsOpen)
		{
			editFormIsOpen = true;

			// get values from item
			var item = $(this).parent().parent();

			var first_name 	= item.find(".span_first_name").html();
			var last_name 	= item.find(".span_last_name").html();
			var age 		= item.find(".span_age").html();
			var profession 	= item.find(".span_profession").html();

			// create edit form as variable
			var edit_form = "<form id=\"item_form\">" +
								"<p>" +
									"<label for=\"first_name\">First name: </label>"+
									"<input id=\"edit_first_name\" type=\"text\" name=\"first_name\" value=\""+first_name+"\" />"+
								"</p>"+
								"<p>"+
									"<label for=\"last_name\">Last name: </label>"+
									"<input id=\"edit_last_name\" type=\"text\" name=\"last_name\" value=\""+last_name+"\" />"+
								"</p>"+
								"<p>"+
									"<label for=\"age\">Age: </label>"+
									"<input id=\"edit_age\" type=\"number\" name=\"age\" value=\""+age+"\" />"+
								"</p>"+
								"<p>"+
									"<label for=\"profession\">Profession: </label>"+
									"<input id=\"edit_profession\" type=\"text\" name=\"profession\" value=\""+profession+"\" />"+
								"</p>"+
								"<a id=\"edit_save\" href=\"#\">Save</a>"+
							"</form>";

			// replace item content with edit form
			item.html(edit_form);
		}
	});

	// react to save link clicked
	$('#list_of_items').on('click', '#edit_save', function(event) {
		event.preventDefault();

		// get values from form
		var edit_first_name = $('#edit_first_name').val();
		var edit_last_name  = $('#edit_last_name').val();
		var edit_age 		= $('#edit_age').val();
		var edit_profession	= $('#edit_profession').val();

		// if there was input we add as an item
		if(edit_first_name !== "" && edit_last_name !== "" && edit_age !== "" && edit_profession !== "")
		{
			// add element to list of items
			var edit_item = "<div class=\"first_row\">" + 
								"<span class=\"span_first_name\">" + edit_first_name + "</span> " + 
								"<span class=\"span_last_name\">" + edit_last_name + "</span>" + 
								"<a class=\"item_remove\" href=\"#\">Remove</a>"+ 
								"<a class=\"item_edit\" href=\"#\">Edit</a>"+ 
								"<a class=\"item_details\" href=\"#\">Details</a>" + 
							"</div>"+ 
							"<div class=\"item_age_profession\">Age: <span class=\"span_age\">"+edit_age+
								"</span> Profession: <span class=\"span_profession\">"+edit_profession+"</span></div>";

			// replace edit form with div after animation
			$(this).parent().fadeOut('slow', function() {
				$(this).parent().html(edit_item);
				editFormIsOpen = false;
			});
		}
	});
});