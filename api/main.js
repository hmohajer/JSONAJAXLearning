// https://api.nytimes.com/svc/books/v3/lists/names.json?api-key=XtMKOIpKgdsHrfGrxpzVgUgBufZHwgGt
//
// https://api.nytimes.com/svc/books/v3/lists.json?list=hardcover-fiction&api-key=XtMKOIpKgdsHrfGrxpzVgUgBufZHwgGt
//
// https://developer.nytimes.com/docs/books-product/1/routes/lists.json/get
//
// -----------------------------
// https://pastebin.com/doc_api
// ------------------
//
// https://quotesondesign.com/wp-json/wp/v2/posts/?orderby=rand
//
// -----------------------
//
// https://github.com/pprathameshmore/QuoteGarden
//
// https://quote-garden.herokuapp.com/api/v3/genres
// 
//یا چنتا جانر مرتبط رو خودت انتخاب کن و به صورت رندم از اونها یه کوت نشون بده مثلا ?genre=learning
// https://quote-garden.herokuapp.com/api/v3/quotes/random
//
//
// -----------------------------------------
//https://freegeoip.app/
//https://freegeoip.app/json/
// brought ip country, city, time zone , latitude $ longitude
//---------------------------------------------------------------
// https://api.telegram.org/bot1736835433:AAGziAhVeF77uywkN8RzQinH8zPhdDQGrlA/sendMessage?chat_id=@hhssbt&text=jigar



//##  BEGIN  ######  global variables  ##########################################################
const BOOKKEY = "XtMKOIpKgdsHrfGrxpzVgUgBufZHwgGt";
const BOTKEY = "1736835433:AAH05Lf0yaZwbJIhS45JkZ3L9a5s63EYGak";
const selectInput = $("#bookListName");
//##  BEGIN  ######  MAIN  ##########################################################
$(function () {

    //making a list of book genres and putting it inside select input (request from API)
    requestGenreList();   //temporarily disabled to make not too many request to server
    requestBookList(selectInput.val());

    //fetching a random quote from API and showing it on page
    randomQuote();

    //fetching the list of books and showing them in the page
    selectInput.on("change", function () {
        requestBookList(selectInput.val());
    });

    //sending message to website admin by user
    const sendMessageBtn = $("#send-message");
    sendMessageBtn.on("click", function () {
        const subject = $("#subjectInput").val();
        const commentText = $("#msgInput").val();
        const commenter = $("#nameInput").val();
        let message = subject + "\n";
        message += commentText + "\n";
        message += commenter + "\n";
        message += $("#emailInput").val() + "\n";
        message += $("#cityInput").val();
        sendMessage(encodeURI(message));
        // console.log($("#IsShowComment")[0].checked);
        // console.log($("#IsShowComment").val());
        if ($("#IsShowComment")[0].checked === true) {
            let comment = CommentItem(subject, commentText, commenter);
            $("#commentBox").append(comment);
        }
    });

    //calling ip API and get Geo information
    $("#contactBtn").on("click", function () {
        getGeoInfo();
        //sendMessage($("#subjectInput").val()+":"+$("#msgInput").val());
        // console.log("object");
    });
})
//##  END  ######  MAIN  ############################################################

//##begin#######################################################################
//get the different genre from API and put them inside <select> so user can choose between them
function requestGenreList() {
    let xhr = new XMLHttpRequest();
    xhr.open("GET", "https://api.nytimes.com/svc/books/v3/lists/names.json?api-key=" + BOOKKEY, true)
    xhr.responseType = "json";
    xhr.onload = function () {
        if (this.status == 200) {
            makeGenreOptions(this.response.results);
        }
    }
    xhr.send();
}
function makeGenreOptions(genres) {
    //name goes into select id="bookListName" 
    //option =>  text "list_name or display_name--- value "list_name_encoded"
    // let selectInput = $("#bookListName");
    genres.forEach(item => {
        let option = $("<option></option>");
        option.attr("value", item.list_name_encoded);
        option.text(item.list_name);//display_name
        selectInput.append(option);
    });
}
//##end#######################################################################


//##begin#######################################################################
//make a list of books from selected genre by user
function requestBookList(genre) {
    let xhr = new XMLHttpRequest();
    xhr.open("GET", "https://api.nytimes.com/svc/books/v3/lists.json?list=" + genre + "&api-key=" + BOOKKEY, true)
    xhr.responseType = "json";
    xhr.onload = function () {
        if (this.status == 200) {
            // makeBookList(this.response.results);
            makeBookList(this.response.results);
        }
    }
    xhr.send();
}

function makeBookList(books) {
    const bookList = $("#bookList");
    bookList.empty();
    books.forEach(book => {

        // const divCol = $("<div class='col-md-6 col-lg-4 col-sm-6 mt-3'></div>");
        // const card = $("<div class='card'></div>"); //style='max-width: 18rem;'
        // const header = $("<div class='card-header w-100'></div>");

        // const title = $("<h5 class='card-title'></h5>");
        // const div = $("<div class='card-body'></div>");
        // const author = $("<h6 class='card-subtitle mb-2 text-muted small'></h6>");
        // const description = $("<p class='card-text small'></p>"); // class='small'
        // const link = $("<a class='btn btn-outline-success d-block '></a>");
        // let img = $("<img style='display:block;'>");
        // header.text("Rank: " + book.rank + " on " + book.bestsellers_date);
        // title.text(book.book_details[0].title);
        // description.text(book.book_details[0].description);
        // author.text(book.book_details[0].author);
        // link.attr("href", book.amazon_product_url);
        // link.text("on Amazon");
        // img.attr("src", "https://source.unsplash.com/random/20" + index + "x25" + index);
        // img.css("width", "120px");
        // img.css("margin", "auto");
        // div.append(title, author, description, link); //img,
        // divCol.append(card);
        // card.append(header, div);
        // // divCol.append(img);
        // bookList.append(divCol);

        //Better way
        const header = "Rank: " + book.rank + " on " + book.bestsellers_date;
        const title = book.book_details[0].title;
        const author = book.book_details[0].author;
        const description = book.book_details[0].description;
        const link = book.amazon_product_url;
        // const link = {
        //     url: book.amazon_product_url
        // };
        bookList.append(bookItem(header,title, author, description, link));
    });
}
//##end#######################################################################



//##  Upgrade later  #########  Idea  ########################################
// https://api.telegram.org/bot1736835433:AAH05Lf0yaZwbJIhS45JkZ3L9a5s63EYGak/getUpdates
// later upgrade: with this link I can see the people who sent message to bot and I can select one of them and send message to them
//or I can put an timer and every 15 sec it checks that if I send message to bot or not, If so showing that message on the page
//##end#######################################################################

//##begin#######################################################################
//send a message (consist of comment or message of user ) to site admin by Telegram API 
//if selected shows the comment on the page 
function sendMessage(msg) {
    let xhr = new XMLHttpRequest();
    // let user = "@hhssbt";
    let user = "-1001425778198";
    // let user = "837230207";
    xhr.open("GET", "https://api.telegram.org/bot" + BOTKEY + "/sendMessage?chat_id=" + user + "&text=" + msg, true)
    xhr.responseType = "json";
    xhr.onreadystatechange = function () {
        // console.log(this.status);
        // console.log(this.readyState);
    }
    xhr.onload = function () {
        if (this.status == 200) {
            // console.log("Message sent!");
        }
    }
    xhr.send();
}
//##end#######################################################################


//##  Upgrade later  #########  Idea  #########  NOT WORKING  ################
// $.get('https://www.amazon.com/dp/1789096499?tag=NYTBSREV-20&tag=NYTBSREV-20', function (data) {
//     var imgs = $('<div/>').html(data).find('#imgBlkFront');
//     imgs.each(function (i, img) {
//         console.log(img.src); // show a dialog containing the url of image
//     });
// });
//##end#######################################################################



//##begin#######################################################################
//get geo info of user from the API and fill the message form automat
function getGeoInfo() {
    let xhr = new XMLHttpRequest();
    xhr.open("GET", "https://freegeoip.app/json/", true)
    xhr.responseType = "json";
    xhr.onload = function () {
        if (this.status == 200) {
            fillFormGeo(this.response);
            // console.log(this.response);
        }
    }
    xhr.send();
}

//auto filling message fields
function fillFormGeo(data) {
    $("#cityInput").val(data.city);
    $("#countryInput").val(data.country_name);
}
//##end#######################################################################

//shows a random quote in learning field from API
function randomQuote() {
    let xhr = new XMLHttpRequest();
    xhr.open("GET", "https://quote-garden.herokuapp.com/api/v3/quotes/random?genre=learning", true)
    xhr.responseType = "json";
    xhr.onload = function () {
        if (this.status == 200) {
            randomQuoteShow(this.response);
            // console.log(this.response);
        }
    }
    xhr.send();
}
function randomQuoteShow(quote) {
    $("#quote").text(quote.data[0].quoteText);
    $("#quoteAuthor").text(quote.data[0].quoteAuthor);

}

//##################################################################
// Initialize and add the map
function initMap() {
    // The location 
    const pdpLocation = { lat: 52.1427, lng: 6.1961 };
    // The map, centered 
    const map = new google.maps.Map(document.querySelector("#map"), {
        zoom: 12,
        center: pdpLocation,
    });
    // The marker, positioned at 
    const marker = new google.maps.Marker({
        position: pdpLocation,
        map: map,
    });
}

//##  show comments #################################################
function CommentItem(subject, commentText, commenter) {
    return (`
        <li class="list-group-item list-group-item-secondary">
            <h6 id="commentSubject">${subject}</h6>
            <p id="commentText" class="m-0">${commentText}</p>
            <p id="name" class="text-end small m-0">${commenter}</p>
        </li>
    `);
}

//####  show book ###################################################
function bookItem(header,title, author, description, link) {
    return (`
        <div class="col-md-6 col-lg-4 col-sm-6 mt-3">
            <div class="card">
                <div class="card-header w-100">${header}</div>
                <div class="card-body">
                    <h5 class="card-title">${title}</h5>
                    <h6 class="card-subtitle mb-2 text-muted small">${author}</h6>
                    <p class="card-text small">${description}</p>
                    <a class="btn btn-outline-success d-block" href="${link}">on Amazon</a>
                </div>
            </div>
        </div>
    `);
}