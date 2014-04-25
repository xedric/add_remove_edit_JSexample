$(document).ready(function() {

	// react to when form is submitted
	$( "#item_form" ).submit(function( event ) {
		// stop form from being sent
		event.preventDefault();

		// get values from form
		var first_name = $( "#first_name" ).val();
		var last_name = $( "#last_name" ).val();

		// if there was input in the textfields we add it as an item
		if(first_name !== "" && last_name !== "")
		{
			// empty the form
			$('#item_form').trigger("reset");

			// add element to list of items
			var item = "<div class=\"item\"><span class=\"first_name\">" + first_name + "</span> <span class=\"last_name\">" + last_name + 
				"</span><form class=\"item_remove\"><input type=\"submit\" value=\"Remove\" /></form>" + 
				"<form class=\"item_edit\"><input type=\"submit\" value=\"Edit\" /></form>" + 
				"</div>";
			$( "#list_of_items" ).append( item );

			// set focus back in the textbox
			$( "#first_name" ).focus();
		}

		$( ".item_remove" ).submit(function( event ) {
			// stop form from being sent
			event.preventDefault();

			// animation
			$(this).parent().fadeOut( "slow", function() {
				// animation finished -> remove element
				$(this).remove();
			});
		});

		$( ".item_edit" ).submit(function( event ) {
			// stop form from being sent
			event.preventDefault();

			// create form as variable
			var edit_form = "<form class=\"form_edit\">"+
								"<p>"+
									"<label for=\"first_name\">First name: </label>"+
									"<input id=\"edit_first_name\" type=\"text\" name=\"first_name\" value=\""+first_name+"\"/>"+
								"</p><p>"+
									"<label for=\"last_name\">Last name: </label>"+
									"<input id=\"edit_last_name\" type=\"text\" name=\"last_name\" value=\""+last_name+"\"/>"+
								"</p><input type=\"submit\" value=\"Save\" /></form>";

			// replace div with form
			$(this).parent().html(edit_form);

			$( ".form_edit" ).submit(function( event ) {
				// stop form from being sent
				event.preventDefault();

				// get values from form
				var edit_first_name = $( "#edit_first_name" ).val();
				var edit_last_name = $( "#edit_last_name" ).val();

				// if there was input in the textfields we add it as an item
				if(edit_first_name !== "" && edit_last_name !== "")
				{
					// add element to list of items
					var edit_item = "<div class=\"item\"><span class=\"first_name\">" + edit_first_name + "</span> <span class=\"last_name\">" + edit_last_name + 
						"</span><form class=\"item_remove\"><input type=\"submit\" value=\"Remove\" /></form>" + 
						"<form class=\"item_edit\"><input type=\"submit\" value=\"Edit\" /></form>" + 
						"</div>";
					// replace form with div
					$(this).parent().html(edit_item);
				}
			});
		});
	});
});



/*

<span class="inputname">
    Project Images:
    <a href="#" class="add_project_file">
        <img src="images/add_small.gif" border="0" />
    </a>
</span>

<ul class="project_images">
    <li><input name="upload_project_images[]" type="file" /></li>
</ul>

-----------------------

// Add new input with associated 'remove' link when 'add' button is clicked.
$('.add_project_file').click(function(e) {
    e.preventDefault();

    $(".project_images").append(
        '<li>'
      + '<input name="upload_project_images[]" type="file" class="new_project_image" /> '
      + '<a href="#" class="remove_project_file" border="2"><img src="images/delete.gif" /></a>'
      + '</li>');
});

// Remove parent of 'remove' link when link is clicked.
$('.project_images').on('click', '.remove_project_file', function(e) {
    e.preventDefault();

    $(this).parent().remove();
});


*/
