
var climateData={
                1:
                {
                    img:"img/thunder-main.jpg", 
                    imgIcon:"img/thunderstorms.png", 
                    pred:"Extremity", 
                    suggestion:"Extreme weather. Stay indoors and safe if possible ;)"
                },
                10:
                {
                    img:"img/rainy-main.jpg", 
                    imgIcon:"img/rain.png", 
                    pred:"Showers", 
                    suggestion:"Would recommend an umbrella, rain coat and water-proof make-up ;)"
                },
                15:
                {
                    img:"img/snow-main.jpg", 
                    imgIcon:"img/snow.png", 
                    pred:"Snow", 
                    suggestion:"Keep warm and stay cheerful!"
                },
                24:
                {
                    img:"img/windy-main.jpg", 
                    imgIcon:"img/windy.png", 
                    pred:"Windy", 
                    suggestion:"Time to feel the wind through your hair"
                },
                25:
                {
                    img:"img/cold-main.jpg", 
                    imgIcon:"img/cold.png", 
                    pred:"Cold", 
                    suggestion:"Keep warm and stay cheerful!"
                },
                30:
                {
                    img:"img/cloudy-main.jpg", 
                    imgIcon:"img/mostly-cloudy.png", 
                    pred:"Cloudy", 
                    suggestion:"It is going to be cloudy!"
                },
                32:
                {
                    img:"img/sunny.jpg", 
                    imgIcon:"img/sunny.png", 
                    pred:"Sunny", 
                    suggestion:"Time to show-off your awesome wardrobe!!"
                },



            }

function normalize(code){
    if(code<8){
        code=1;
    }
    else if(code<13){
        code=10;
    }
    else if(code<24){
        code=15;
    }
    else if(code<31){
        code=30;
        
    }
    else if(code=34){
        code=32;
    }
    return code;
}

function renderData(index,data){
//var name = data.name.substring(0, data.name.length - 4);
var predArray = data.query.results.channel.item.forecast;
var code=parseInt(predArray[index].code);


code = normalize(code);
var html = "\
        <div class='col-sm-3' style=''>\
            <div class='profile-circle' style='height:400px'>\
                    <img src="+climateData[code].img+"\
                         class='img-responsive center-block' alt='member'/>\
            </div>\
            <blockquote>\
                <ul style='list-style-type:none'>\
                    <li>Prediction:\
                        <img src="+climateData[code].imgIcon+">\
                    </li>\
                    <li>"+ predArray[index].text+"</li>\
                    <li>Day: "+predArray[index].day+"</li>\
                    <li>Date: "+predArray[index].date+"</li>\
                    <li>Max: "+predArray[index].high+"</li>\
                    <li>Min: "+predArray[index].low+"</li>\
                </ul>\
            </blockquote>\
        </div>";
return html;
}

var callbackFunction = function(data) {
    var predArray = data.query.results.channel.item.forecast;
    var code=parseInt(predArray[0].code);
    code = normalize(code);
    $("#first-image").attr('src', climateData[code].img);
    $("#first-icon").attr('src',climateData[code].imgIcon);
    $("#first-min").html(predArray[0].low);
    $("#first-max").html(predArray[0].high);
    $("#first-suggestion").html(climateData[code].suggestion);
    $("#first-day").html(predArray[0].day);
    $("#first-date").html(predArray[0].date);
    $("#first-pred").html(predArray[0].text);

    for(var i=1;i<5;i++){
        var html = renderData(i,data);
        $("#container1").append(html);
    }
};


var syncano = new Syncano({apiKey:'dacdfff0c1aa7eca64be2bf7402c2a2cec1b032f', instance:'climatechic'});

// Create empty connection
var connection = Syncano();
var success = function(instances) {
  console.log(instances);
};
var error = function(error) {
  console.log(error);
};

connection.Instance.please().list().then(success).catch(error);