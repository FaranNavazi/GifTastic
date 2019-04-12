$(document).ready(function() {
  $("button#add").on("click", function() {
    event.preventDefault();

    var newGif = $("#gif-input")
      .val()
      .trim();

    function renderButtons() {
      var a = $("<button>");
      a.attr("type", "button");
      a.addClass("gif btn btn-dark mr-2");
      a.attr("data-name", newGif);
      a.text(newGif);
      $("#buttons").append(a);
    }
    renderButtons();

    $("button.gif").on("click", function() {
      $("p").remove();
      $("img").remove();
      var person = $(this).attr("data-name");
      var queryURL =
        "https://api.giphy.com/v1/gifs/search?q=" +
        person +
        "&api_key=dc6zaTOxFJmzC&limit=10";

      $.ajax({
        url: queryURL,
        method: "GET"
      }).then(function(response) {
        var results = response.data;

        for (var i = 0; i < results.length; i++) {
          var gifDiv = $("<div>");
          gifDiv.addClass("float-left mr-4");

          var rating = results[i].rating;

          var p = $("<p>").text("Rating: " + rating);

          var personImage = $("<img>");
          personImage.attr("src", results[i].images.fixed_height.url);

          gifDiv.prepend(p);
          gifDiv.prepend(personImage);

          $("#gifs-appear-here").prepend(gifDiv);
        }
      });
    });
  });
});
