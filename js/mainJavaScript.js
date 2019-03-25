$(document).ready(function () {

    if (sessionStorage.getItem("list")) {

        var searchResult = JSON.parse(sessionStorage.getItem("list"));

        //Collecting information from URL and running "for" loop. search result carries over with sesionStorage
        $.getJSON("http://www.flickr.com/services/feeds/photos_public.gne?tags=" + searchResult + "&format=json&jsoncallback=?", function (data) {

            console.log(data);

            //Looping out result on page with float styling
            $.each(data.items, function (index, value) {

                console.log(value.media.m);

                $("<div class='image_frame_float'><img src='" + value.media.m + "' alt='" + value.title + "'></div>").appendTo("#float_container");
                return index < 8;
            });

            //Dialog box for float page sessionStorage
            $(".image_frame_float").on("click", function () {

                $("#dialog").empty();

                var source = $(this).children().first().attr("src");
                var description = $(this).children().first().attr("alt");

                $("<img>").attr("src", source).attr("alt", description).appendTo("#dialog");
                $("<p>").text(description).appendTo("#dialog");

                $("#dialog").dialog();
            });

            //Looping out on page with flexbox styling
            $.each(data.items, function (index, value) {

                console.log(value.media.m);

                $("<div class='image_frame_flex'><img src='" + value.media.m + "' alt='" + value.title + "'></div>").appendTo("#flex_container");
                return index < 8;
            });

            //Dialog box for float page sessionStorage
            $(".image_frame_flex").on("click", function () {

                $("#dialog").empty();

                var source = $(this).children().first().attr("src");
                var description = $(this).children().first().attr("alt");

                $("<img>").attr("src", source).attr("alt", description).appendTo("#dialog");
                $("<p>").text(description).appendTo("#dialog");

                $("#dialog").dialog();
            });

        });
    }

    //Type in free choice search word
    $("#search").keypress(function (event) {

        var searchResult = $("#search").val().trim();

        if (event.which == 13) {

            if (searchResult === "") {

                alert("No search key word found");
                $("#search").focus();
                return;
            }

            //console.log(searchResult);

            //Empty previous search and search result
            $("#search").val('');

            $("#float_container").html('');

            $("#flex_container").html('');


            //Collecting information from URL and running "for" loop
            $.getJSON("http://www.flickr.com/services/feeds/photos_public.gne?tags=" + searchResult + "&format=json&jsoncallback=?", function (data) {
                console.log(data);

                sessionStorage.setItem("list", JSON.stringify(searchResult));

                //Looping out result on page with float styling
                $.each(data.items, function (index, value) {

                    console.log(value.media.m);

                    $("<div class='image_frame_float'><img src='" + value.media.m + "' alt='" + value.title + "'>").appendTo("#float_container");
                    return index < 8;
                });

                //Dialog box for float page
                $(".image_frame_float").on("click", function () {

                    $("#dialog").empty();

                    var source = $(this).children().first().attr("src");
                    var description = $(this).children().first().attr("alt");

                    $("<img>").attr("src", source).attr("alt", description).appendTo("#dialog");
                    $("<p>").text(description).appendTo("#dialog");

                    $("#dialog").dialog();
                });

                //Looping out on page with flexbox styling
                $.each(data.items, function (index, value) {

                    console.log(value.media.m);

                    $("<div class='image_frame_flex'><img src='" + value.media.m + "' alt='" + value.title + "'></div>").appendTo("#flex_container");
                    return index < 8;
                });

                //Dialog box for float page
                $(".image_frame_flex").on("click", function () {

                    $("#dialog").empty();

                    var source = $(this).children().first().attr("src");
                    var description = $(this).children().first().attr("alt");

                    $("<img>").attr("src", source).attr("alt", description).appendTo("#dialog");
                    $("<p>").text(description).appendTo("#dialog");

                    $("#dialog").dialog();
                });

            });

        }

    });

});