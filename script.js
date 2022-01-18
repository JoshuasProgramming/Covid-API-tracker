//let ur3 = "https://api.covid19api.com/countries";
//let url2 = "https://localcoviddata.com/covid19/v1/cases";

/**
 * Console.logs the entire Covid 19 api data
 */
let url = "https://services1.arcgis.com/0MSEUqKaxRlEPj5g/arcgis/rest/services/ncov_cases2_v1/FeatureServer/2/query?where=1%3D1&outFields=*&outSR=4326&f=json"

    fetch(url)
    .then(response => response.json())
    .then(data => console.log(data.features));

const container = document.getElementById('container_id');




/**
 * Function that grabs the data from the api and outputs it onto the screen
 */

function getData(){
    let country_name = document.getElementById('country_name');
    let country_name_value = country_name.value.trim();
    console.log(country_name_value)

    for(let x = 0; x < 195; x++){

        fetch(url)
        .then(response => response.json())
        .then(data => {

            if(country_name_value == data.features[x].attributes.Country_Region){
                let box = document.createElement('div');
                box.className = "death-box";
                box.append("Covid deaths in " + country_name_value + ": " + data.features[x].attributes.Deaths.toLocaleString('en-US'));
                container_id.append(box); 

                let box2 = document.createElement('div');
                box2.className = "cases-box";
                box2.append("Covid cases in " + country_name_value + ": " + data.features[x].attributes.Confirmed.toLocaleString('en-US'));
                container_id.append(box2); 

                let box3 = document.createElement('div');
                box3.className = "incident-box";
                box3.append("Incident Rate in " + country_name_value + ": " + data.features[x].attributes.Incident_Rate.toLocaleString('en-US'));
                container_id.append(box3);   
                
                let box4 = document.createElement('div');
                box4.className = "mortality-box";

                box4.append("Mortality Rate in " + country_name_value + ": " + data.features[x].attributes.Mortality_Rate.toFixed(1).toLocaleString('en-US'));
                container_id.append(box4);      
                
                let lat_value = data.features[x].attributes.Lat;
                let long_value = data.features[x].attributes.Long_;
                iniMap(lat_value, long_value);
            }
        }
    )};

    let delete_btn = document.createElement('div');
    delete_btn.innerHTML = "<button id='delete_btn' class='delete-btn'>Delete</button>";
    document.body.append(delete_btn);

    const delete_ = document.getElementById('delete_btn').addEventListener("click", (e)=>{
        let deaths = document.getElementsByClassName('death-box');
       
        for (var i = 0; i < deaths.length; i++) {
            deaths[i].classList.remove('death-box');
            deaths[i].innerHTML = "";
        }

    });

}



/**
 * Function that allows user to create a pdf of the data on the website
 */
function createPDF(){
    let downloadbtn = document.createElement('div');
    downloadbtn.innerHTML = "<button id='download_btn' class='download-btn'>Download</button>";
    document.body.append(downloadbtn);

    const download_btn = document.getElementById('download_btn').addEventListener("click", (e)=>{
        const container_id = document.getElementById('container_id');

        let options = {
            margin: [0,-2,0,-2], //top, left, buttom, right, 
            filename: 'Covid19Tracker.pdf', //creates the file name
            image: {type: 'jpeg', quality:0.98}, //set the type of file and quality
            html2canvas: {scale:2},
            jsPDF: {unit: 'in', format: 'letter', orientation: 'portrait'}
        }
    
        html2pdf().set(options).from(container_id).save(); //uploads the 'container_id' to the user's computer.

        document.body.removeChild(downloadbtn);
    });
}




/**
 * Event happens once the user presses the button with id of 'btn' within the HTML
 */

const btn = document.getElementById('btn').addEventListener("click", (e)=>{
    getData();
    createPDF();
});




/**
 * Function to create the Google Map
 */

function iniMap(lat_value,long_value){
    //Map options
    let options = {
        zoom:3,
        center:{lat:lat_value, lng:long_value}
    }

    //New map
    let map = new google.maps.Map(document.getElementById('map'), options);

    //Add marker
    let marker = new google.maps.Marker({
        position:{lat:lat_value, lng:long_value},
        map:map
    });
}
