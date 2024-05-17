/* const data = null;

const xhr = new XMLHttpRequest();
xhr.withCredentials = true;

xhr.addEventListener('readystatechange', function () {
	if (this.readyState === this.DONE) {
		console.log(this.responseText);
	}
});

xhr.open('GET', 'https://motorcycle-specs-database.p.rapidapi.com/article/1514/image/link');
xhr.setRequestHeader('X-RapidAPI-Key', 'dea20cb046msh25066d4ef4691cep12bbe5jsn2d14bf2e1f30');
xhr.setRequestHeader('X-RapidAPI-Host', 'motorcycle-specs-database.p.rapidapi.com');

xhr.send(data); */
submit.addEventListener('click', async function(){
    search()
    location.href = "compare.html";
});

/*document.getElementById("submit").onclick = function(){
    location.href = "compare.html";
}*/

async function search(){
    const makeAndModel = document.getElementById('search').value;
    console.log(makeAndModel);

    const array = makeAndModel.split(" ")
    const make = array[0]
    const model = array[1]
    console.log(model);
    console.log(make);

    
    localStorage.setItem("make", make); 
    localStorage.setItem("model", model);
}

