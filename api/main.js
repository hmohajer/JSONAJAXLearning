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
// از این لینک لیست زانرها رو در بیار و به مشتری نشون بده که انتخاب کنه
//یا چنتا جانر مرتبط رو خودت انتخاب کن و به صورت رندم از اونها یه کوت نشون بده مثلا ?genre=learning
// https://quote-garden.herokuapp.com/api/v3/quotes/random
//
//مشتری بتونه که موضوع خاص رو هم انتخاب کنه و لیست کوت ها رو بیاره
//
// //
//
// -----------------------------------------
//https://freegeoip.app/
//https://freegeoip.app/json/
// brought ip country, city, time zone , latitude $ longitude
//---------------------------------------------------------------
// https://api.telegram.org/bot1736835433:AAGziAhVeF77uywkN8RzQinH8zPhdDQGrlA/sendMessage?chat_id=@hhssbt&text=jigar

const BOOKKEY = "XtMKOIpKgdsHrfGrxpzVgUgBufZHwgGt";
let selectInput = $("#bookListName");
$(function () {
    getBookGenreList();   //temprorily disabled to make not so much request to server
    randomQuote();
    let sendMessageBtn = $("#send-message");
    selectInput.on("change", function () {
        getBookList(selectInput.val());
    });

    // $("#send-message").on("click",function(){
    sendMessageBtn.on("click", function () {
        let message = $("#subjectInput").val() +"\n";
        message += $("#msgInput").val()+"\n";
        message += $("#nameInput").val()+"\n";
        message += $("#emailInput").val()+"\n";
        message += $("#cityInput").val();
        sendMessage(encodeURI(message));
        // console.log("object");
    });

    $("#contactBtn").on("click", function () {
        getGeoInfo();
        //sendMessage($("#subjectInput").val()+":"+$("#msgInput").val());
        // console.log("object");
    });
})
function getBookGenreList() {
    let xhr = new XMLHttpRequest();
    xhr.open("GET", "https://api.nytimes.com/svc/books/v3/lists/names.json?api-key=" + BOOKKEY, true)
    xhr.responseType = "json";
    xhr.onload = function () {
        if (this.status == 200) {
            makeBookGenreOption(this.response.results);
        }
    }
    xhr.send();
}

function makeBookGenreOption(genres) {
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

function getBookList(genre) {
    let xhr = new XMLHttpRequest();
    xhr.open("GET", "https://api.nytimes.com/svc/books/v3/lists.json?list=" + genre + "&api-key=" + BOOKKEY, true)
    xhr.responseType = "json";
    xhr.onload = function () {
        if (this.status == 200) {
            makeBookList(this.response.results);
        }
    }
    xhr.send();
}

function makeBookList(books) {
    // book list div id="bookList"
    // amazon_product_url 
    let bookList = $("#bookList");
    bookList.empty();
    books.forEach((book, index) => {
        // console.log(book);
        let divCol = $("<div class='col-md-6 col-lg-4 col-sm-6 mt-3'></div>");
        let card = $("<div class='card'></div>"); //style='max-width: 18rem;'
        let header = $("<div class='card-header w-100'></div>");

        let title = $("<h5 class='card-title'></h5>");
        let div = $("<div class='card-body'></div>");
        let author = $("<h6 class='card-subtitle mb-2 text-muted small'></h6>");
        let description = $("<p class='card-text small'></p>"); // class='small'
        let link = $("<a class='btn btn-outline-success d-block '></a>");
        // let img = $("<img style='display:block;'>"); 
        title.text(book.book_details[0].title);
        description.text(book.book_details[0].description);
        author.text(book.book_details[0].author);
        link.attr("href", book.amazon_product_url);
        link.text("on Amazon");
        header.text("Rank: " + book.rank + " on " + book.bestsellers_date);
        // img.attr("src","https://source.unsplash.com/random/20"+index+"x25"+index);
        // img.css("width","120px");
        // img.css("margin","auto");
        div.append(title, author, description, link); //img,
        // div.append(author);
        // div.append(description);
        // div.append(link);

        divCol.append(card);
        card.append(header, div);
        // divCol.append(img);
        bookList.append(divCol);
    });
}

// https://api.telegram.org/bot1736835433:AAGziAhVeF77uywkN8RzQinH8zPhdDQGrlA/getUpdates
//ba in link mitonam akharin kasi ke be bot payam dade ro bebinam va javab on ro bedam
//mishe behesh zaman bedam har 15saniye update ro check kone va akharin payami ke az man hast ro neshoon bede
function sendMessage(msg) {
    let xhr = new XMLHttpRequest();
    // let user = "@hhssbt";
    let user = "837230207";
    xhr.open("GET", "https://api.telegram.org/bot1736835433:AAGziAhVeF77uywkN8RzQinH8zPhdDQGrlA/sendMessage?chat_id=" + user + "&text=" + msg, true)
    xhr.responseType = "json";
    xhr.onreadystatechange = function () {
        // console.log(this.status);
        // console.log(this.readyState);
    }
    xhr.onload = function () {
        if (this.status == 200) {
            // console.log(this.response);
        }
    }
    xhr.send();
}
// $.get('https://www.amazon.com/dp/1789096499?tag=NYTBSREV-20&tag=NYTBSREV-20', function(data) {
//     var imgs = $('<div/>').html(data).find('#imgBlkFront');
//     imgs.each(function(i, img) {
//         console.log(img.src); // show a dialog containing the url of image
//     });
// });

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

function fillFormGeo(data) {
    $("#cityInput").val(data.city);
    $("#countryInput").val(data.country_name);
}

// function requestGet(url) {
//     let xhr = new XMLHttpRequest();
//     xhr.open("GET", url, true)
//     xhr.responseType = "json";
//     xhr.onload = function () {
//         if (this.status == 200) {
//             return this.response;
//             // console.log(this.response);
//         }
//     }
//     xhr.send();
// }
// function randomQuote(){
//     let response = requestGet("https://quote-garden.herokuapp.com/api/v3/quotes/random");
//     console.log(response);
// }

function randomQuote(url) {
    let xhr = new XMLHttpRequest();
    xhr.open("GET", "https://quote-garden.herokuapp.com/api/v3/quotes/random", true)
    xhr.responseType = "json";
    xhr.onload = function () {
        if (this.status == 200) {
            randomQuoteShow(this.response);
            // console.log(this.response);
        }
    }
    xhr.send();
}
function randomQuoteShow(quote){
    $("#quote").text(quote.data[0].quoteText);
    $("#quoteAuthor").text(quote.data[0].quoteAuthor);

}