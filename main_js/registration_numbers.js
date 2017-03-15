///////////////DECLARE VARIABLES///////////////////////
//button
var button = document.getElementById('addButton');
//textbox
var regNumber = document.getElementById('regNum');

//empty array
var regNumbersList = [];
var selectedREG = [];


//get list items
var list = document.querySelector('.list');
var list2 = document.querySelector('.list2');

//get and set the drop down element in variable
var dropDown = document.querySelector('select');

//////////////HANDLEBARS SETUP////////////////////////

//get the template
var source = document.getElementById('registrationList').innerHTML;

var sourceTown = document.getElementById('town').innerHTML;

//compile the template
var template = Handlebars.compile(source);
var templateTown = Handlebars.compile(sourceTown);


//////////////////BUTTON///////////////////////
button.addEventListener('click', function () {
    //check if textbox is empty or not
    if (regNumber.value === "") {
        //alert user
        alert('Input a Registration Number!');
    } else {
        //convert text to uppercase
        var text = regNumber.value;

        //push value entered to an array
        regNumbersList.push(text.toUpperCase());

        populateLists();
    }

}, false);

//populate list items
function populateLists() {
    for (var i = 0; i < regNumbersList.length; i++) {
        var listHTML = template({
            registration_number: regNumbersList[i]
        });

        var LI = listHTML;
    };
    list.innerHTML += LI;
}


dropDown.onchange = function () {
    //save the selected index's in a variable
    var town = dropDown.options[dropDown.selectedIndex];

    //Get the heading tag
    var searchedTown  = document.querySelector('.searchedTown');

    //store the dropDown text in object
    var towns = {'selectedTown':[{'city': town.text}]};

    //output the search results with selected town
    searchedTown.innerHTML = 'Showing search results for: ' + towns.selectedTown[0].city;

    //clear the ul innerHMTL element
    list2.innerHTML = "";

    //Loop through array of regNumbers
    for (var i = 0; i < regNumbersList.length; i++) {
        if (regNumbersList[i].startsWith(town.value)) {
            //create li
            var li = document.createElement('li');

            //add a id to the list item
            li.setAttribute("class", "townList");

            //add the list item with text inside it
            li.innerHTML = regNumbersList[i];

            //append list item to the ul tag
            list2.appendChild(li);
            //list2.innerHTML = list2.innerHTML + li;
        }
    }

   var content = list2.innerHTML;

if (content === "") {
    var p = document.createElement('p');
    var div = document.createElement('div');

    p.setAttribute("id", "invalidSearch");
    p.innerHTML ="No Registrations Found!"

    div.setAttribute("id", "imageNotFound");


    list2.appendChild(p);
    list2.appendChild(div);
}
}
