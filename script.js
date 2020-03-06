$(document).ready(function () {

    marvel_movie_list = null;

    var promise = new Promise(function (resolve, reject) {
        $.getJSON('marvel_movie.json', function (json) {
            marvel_movie_list = json['items'];
            resolve('Movie List')
        });
    });

    function fuzzyMatch(text, search) {
        search = search.replace(/\ /g, '').toLowerCase();
        var tokens = text.split('');
        var searchPosition = 0;
        $.each(tokens, function (i, textChar) {
            if (textChar.toLowerCase() == search[searchPosition]) {
                tokens[i] = '<strong style="color:red">' + textChar + '</strong>';
                searchPosition++;
                if (searchPosition >= search.length) {
                    return false;
                }
            }
        });
        if (searchPosition != search.length)
            return '';
        return tokens.join('');
    }

    function refreshSearch() {
        var search = $("#searchVal").val();
        var results = []

        $.each(marvel_movie_list, function (i, movie_list) {
            var result = fuzzyMatch(movie_list['title'], search);
            if (result) {
                results.push('<tr><td>' + i + '</td><td>' + result + '</td><td>' + movie_list['release_date'] + '</td></tr>');
            }
        });
        var resultHTML = results.join('\n');
        $("#movieList").html(resultHTML);
    }

    $(function () {
        promise.then(function (successMsg) {
            refreshSearch();
            $("#searchVal").keyup(refreshSearch);
        })
    })

});