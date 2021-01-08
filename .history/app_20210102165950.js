"use strict";

const searchURL = ("https://api.openbrewerydb.org/breweries");

 //format query params
function formatQueryParams(params) {
    //return object array with params
   const queryItems = Object.keys(params)
   //produce object map param string key
     .map(key => `${key}=${params[key]}`)
     //return array as string
   return queryItems.join('&');
 }

function displayResults(responseJson, maxResults) {
    
    // if there are previous results, remove them
    console.log(responseJson);
    $("#results-list").empty();

    // iterate through the data array
    // list brewery name, city, url
    for (let i = 0; i < responseJson.length; i++) {
    $("#results-list").append(`<li class="each-product-result">

    <h3 class="product-name">${responseJson[i].name}</h3>
    <p class="product-price">${responseJson[i].city}</p>
    <p>${responseJson[i].website_url}</p>
    <p>Brewery page: <a href=${responseJson[i].website_url}>${responseJson[i].website_url}</a></p><br>
    <p class="product-description">${responseJson[i].website_url}</p>
    <br>
    </li>`
      )
  };
    //display the results section
    $("#results").removeClass("hidden");
}

//getBreweries function
function getBreweries(query, maxResults) {
    //set API paramaters
    const params = {
        by_state: query,
        per_page: maxResults,
    };
    //declare queryString as formatQueryParams
    const queryString = formatQueryParams(params);
    //declare url to bind user input string to searchUrl
    const url = searchURL + "?" + queryString;
    console.log(url);
    //initiate fetch request using pure promise to get JSON object
    fetch(url)
    //check for resolved promise
        .then((response) => {
            // if response = true
            if (response.ok) {
                //return response object
                return response.json();
            }
            //raise exception to reject promise error and trigger .catch
            throw new Error(response.statusText);
        })
        .then((responseJson) => displayResults(responseJson, maxResults))
        //Catch any errors and return message
        .catch((err) => {
            $("#error-message").text(`Something went wrong: ${err.message}`);
        });
}

function watchForm() {
    // Bind an event handler to the “submit” JavaScript event
    $("form").submit((event) => {
        // If this method is called, the default action of the event will not be triggered.
        event.preventDefault();
        let by_state = $("#by_state").val();
	// by_state = by_state.replace(/\s/g, '');
        const maxResults = $("#max-results").val();
        getBreweries(by_state, maxResults);
    });
}

$(watchForm);


