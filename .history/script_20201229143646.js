"use strict";

// put your own value below!

const searchURL = encodeURI("https://api.openbrewerydb.org/breweries");

 //new params
function formatQueryParams(params) {
   const queryItems = Object.keys(params)
     .map(key => `${key}=${params[key]}`)
   return queryItems.join('&');
 }

function displayResults(responseJson, maxResults) {
    
    // if there are previous results, remove them
    console.log(responseJson);
    $("#results-list").empty();

    // iterate through the data array
    for (let i = 0; i < responseJson.length; i++) {
    $("#results-list").append(`<li class="each-product-result">
    <h3 class="product-name">${responseJson[i].name}</h3>
    <p class="product-price">${responseJson[i].city}</p>
    <p class="product-description">${responseJson[i].website_url}</p>

    <br>

    </li>`
      )
  };
  
    //display the results section
    $("#results").removeClass("hidden");
}
function getBreweries(query, maxResults) {
    const params = {
        by_state: query,
        limit: maxResults,
        // encodeURI: searchURL,
    };
    const queryString = formatQueryParams(params);
    const url = searchURL + "?" + queryString;
    console.log(url);
    fetch(url)
        .then((response) => {
            if (response.ok) {
                return response.json();
            }
            throw new Error(response.statusText);
        })
        .then((responseJson) => displayResults(responseJson, maxResults))
        .catch((err) => {
            $("#error-message").text(`Something went wrong: ${err.message}`);
        });
}
function watchForm() {
    $("form").submit((event) => {
        event.preventDefault();
        let by_state = $("#by_state").val();
	// by_state = by_state.replace(/\s/g, '');
        const maxResults = $("#max-results").val();
        getBreweries(by_state, maxResults);
    });
}

$(watchForm);


