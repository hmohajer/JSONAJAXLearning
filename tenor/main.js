

// $(".container").attr();

$(function(){ ///ready function
    function searchRequest(searchQuery){
        let xhr = new XMLHttpRequest();

        xhr.open("GET", "https://g.tenor.com/v1/search?q="+searchQuery+"&key=4LW63LS2Q7PK");//+searchQuery
        xhr.onreadystatechange = function(){
            // console.log(xhr.readyState);
            if(xhr.readyState === 4 && xhr.status === 200){
                let response = JSON.parse(xhr.responseText);
                // xhr.responseType="json";
                // let responseData = xhr.response; 
                // for (let i=0; i< 37;i++){
                response.results.forEach((element,i) => {
                    showResult(element,i%4);
                });
                // }
            }
        };
        xhr.send();
    }

    $("#searchBtn").on("click",function(){
        for (let i = 0; i < 4; i++) {
            $("#result"+i).html("");
        }
        let query = $("#searchQuery").val();
        // console.log(query);
        searchRequest(query);
    });
    
    
});

function showResult(data,column){

    result = $("#result"+column)
    // console.log(result);
    let url = data.media[0].gif.url;
    let img = document.createElement("img");
    img.setAttribute("src",url);
    img.className = "w-100";
    $("img").css("margin-bottom","20px")
    // console.log("object");
    result.append(img);
    
}