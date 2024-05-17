async function listArray(){
    const make = localStorage.getItem("make");
    const model = localStorage.getItem("model");
    const search = 'https://api.api-ninjas.com/v1/motorcycles?make=' + make + '&model=' + model;
    console.log(search);
    const searchResponse = await fetch(search,
        {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
              'X-API-Key' : 'QdylrlIxdw8BYgoZeBYBTA==9WwcYsf67dYeYjHc'
              }
            });
    const searchArray = await searchResponse.json();
    console.log(searchResponse);
    console.log(searchArray);

    const searchAlternatives = document.getElementById("searchAlternatives");
    const length = searchArray.length;

    for(let i = 0; i < length; i++)
    {
        var aquieredModel = searchArray[i].model;
        var aquieredMake = searchArray[i].make;

        const insert = 
            "<button class='list'><b>" + aquieredModel + "</b></button>";

        searchAlternatives.insertAdjacentHTML("beforeend", insert);
    }

    Click("list", searchArray);
}

function Click(list, searchArray){
    var listElements = document.getElementsByClassName(list);
    console.log(listElements);
    var i;

    for (i = 0; i < listElements.length; i++) {
        listElements[i].addEventListener("click", (e) => {
            //console.log(e);
            for(let i = 0; i < searchArray.length; i++)
            {
                if (searchArray[i].model == e.target.innerHTML)
                {
                    console.log(searchArray[i]);
                    Compare(searchArray[i]);
                }
            }
        });
    }   
}

function Compare(element){
    console.log(element);
    var make = element.make;
    var model = element.model;
    //GetArticle(make, model);
    ShowData(element);

    var x = document.getElementById("searchAlternatives");
    while(x.hasChildNodes()){
        x.removeChild(x.firstChild);
    }
}
//Flytta sökningen till index.

async function GetArticle(make, model){
    const url = 'https://motorcycle-specs-database.p.rapidapi.com/make/' + make + '/model/' + model;
    const options = await fetch(url,
        {
	        method: 'GET',
	        headers: {
		        'X-RapidAPI-Key': 'dea20cb046msh25066d4ef4691cep12bbe5jsn2d14bf2e1f30',
		        'X-RapidAPI-Host': 'motorcycle-specs-database.p.rapidapi.com'
            }
	    });

        const search = await options.json();
        var id = search[0].articleCompleteInfo.articleID;
        GetImage(id);
    };

async function GetImage(id){
    const url = 'https://motorcycle-specs-database.p.rapidapi.com/article/'+ id + '/image/link';
    const options = await fetch(url,
        {
	    method: 'GET',
	    headers: {
		    'X-RapidAPI-Key': 'dea20cb046msh25066d4ef4691cep12bbe5jsn2d14bf2e1f30',
		    'X-RapidAPI-Host': 'motorcycle-specs-database.p.rapidapi.com'
	    }
    });

    const search = await options.json();
    //var imageLink = search.imageName;
    var imageLink = "http://api-motorcycle.makingdatameaningful.com/files/bmw/2020/c-400-gt/bmw_2020_c-400-gt.jpeg";
    const imageHolder = document.getElementById("image");
    const insert = 
        "<img src=" + imageLink + ">";

    imageHolder.insertAdjacentHTML("beforeend", insert);
} 

async function ShowData(bike){
    var engine = bike.engine;
    console.log(engine);
    var fuelCon = bike.fuel_consumption;
    var power = bike.power;
    var make = bike.make;
    var model = bike.model;
    var number = "first";
    console.log(localStorage.getItem("second"));

    var imageLink = "http://api-motorcycle.makingdatameaningful.com/files/bmw/2020/c-400-gt/bmw_2020_c-400-gt.jpeg";

    try{
        number = localStorage.getItem("second");
    }
    catch(err){
        console.log("1");
    }

    if(number == "second"){
        document.getElementById("right").style.visibility = "visible";

        const makeAndModel = document.getElementById("makeAndModel");
        const insertHeader = 
            "<div class='makeSecond'>" + make + "</div>" + 
            "<div class='modelSecond'>" + model + "</div>";
    
        makeAndModel.insertAdjacentHTML("beforeend", insertHeader);
    
        const dataList = document.getElementById("infoListSecond");
        const insert = 
            "<div class='gridItemSecond4'>" + engine + "</div>" + 
            "<div class='gridItemSecond5'>" + fuelCon + "</div>" +
            "<div class='gridItemSecond6'>" + power + "</div>";
    
        dataList.insertAdjacentHTML("beforeend", insert);

        const imageHolder = document.getElementById("imageSecond");
        const insertSecondImage = 
        "<img src=" + imageLink + " width='400' height='300'>";

        imageHolder.insertAdjacentHTML("beforeend", insertSecondImage);

        document.getElementsByClassName("search-bar2").removeItem;
    }
   
    else{
        document.getElementById("left").style.visibility = "visible";

        const makeAndModel = document.getElementById("makeAndModel");
        const insertHeader = 
            "<div class='make'>" + make + "</div>" + 
            "<div class='model'>" + model + "</div>";
    
        makeAndModel.insertAdjacentHTML("beforeend", insertHeader);
    
        const dataList = document.getElementById("infoList");
        const insert = 
            "<div class='gridItem4'>" + engine + "</div>" + 
            "<div class='gridItem5'>" + fuelCon + "</div>" +
            "<div class='gridItem6'>" + power + "</div>";
            
    
        dataList.insertAdjacentHTML("beforeend", insert);

        const imageHolder = document.getElementById("image");
        const insertImage = 
        "<img src=" + imageLink + " width='400' height='300'>";

        imageHolder.insertAdjacentHTML("beforeend", insertImage);
    }
    localStorage.removeItem("second");
}

submitSecond.addEventListener('click', async function(){
    const makeAndModel = document.getElementById('search2').value;
    console.log(makeAndModel);

    const array = makeAndModel.split(" ")
    const make = array[0]
    const model = array[1]
    console.log(model);
    console.log(make);
    
    localStorage.setItem("make", make); 
    localStorage.setItem("model", model);
    localStorage.setItem("second", "second");
    listArray();

    console.log(localStorage.getItem("second"));
    console.log(localStorage.getItem("second"));
    //Fixa local storage med seccond
});