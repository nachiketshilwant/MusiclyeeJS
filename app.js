//just variables
let aval;
let s;

//api key
const options = {
	method: 'GET',
	headers: {
		'X-RapidAPI-Key': ,
		'X-RapidAPI-Host': 
	}
};

//getting dom
let a=document.querySelector('#srch');
let ad=document.querySelector('.srh-bt');
let ly=document.querySelector('.ly');

//event listener
ad.addEventListener('click', search);
ly.addEventListener('click', lyrics);


//search son function
async function search(){
	aval=a.value.toLowerCase();
const url = `https://spotify23.p.rapidapi.com/search/?q=${aval}%3CREQUIRED%3E&type=multi&offset=0&limit=10&numberOfTopResults=5`;

try {
	//result of api
	let response = await fetch(url, options);
	let result = await response.text();
    result = JSON.parse(result)
	console.log(result);

	//calling dom
	let adt=document.querySelector('.adtl');  
	let abdtl=document.querySelector('.abdtl');
	let ig=document.querySelector('.ig');
	let lyr=document.querySelector(".lyr");


	//button activate
	ly.style.display="inline";

	//artist writing

	while(adt.firstChild) adt.removeChild(adt.firstChild);//remove all
	while(abdtl.firstChild) abdtl.removeChild(abdtl.firstChild);//remove all
	while(ig.firstChild) ig.removeChild(ig.firstChild);//remove all
	while(lyr.firstChild) lyr.removeChild(lyr.firstChild) //ermove all


	//adding img
	var img=document.createElement('img');
	img.setAttribute('alt','album logo');

	//adding album name 
	var h3a=document.createElement('h3');
	h3a.innerHTML="Album name : ";
	var dvab=document.createElement('div');
	abdtl.appendChild(h3a);
	abdtl.appendChild(dvab);

	//adding essential element artist
	var h3=document.createElement('h3');
	h3.innerHTML="Artists : ";
	var dv=document.createElement('div')
	adt.appendChild(h3);
	adt.appendChild(dv);
	adt.style.display="flex";

	//dtail from api
	for(let i in result.tracks.items){
	if(aval.includes(result.tracks.items[i].data.name.toLowerCase()) || result.tracks.items[i].data.name.toLowerCase().includes(aval) ){
		
		s=result.tracks.items[i].data.id; //trackID
		
		dvab.innerHTML=result.tracks.items[i].data.albumOfTrack.name;//album name
		
		img.setAttribute('src',result.tracks.items[i].data.albumOfTrack.coverArt.sources[0].url);//img
		ig.appendChild(img);
		
		for(let j in result.tracks.items[i].data.artists.items){
			var adtp=document.createElement('h4');
			adtp.innerHTML = result.tracks.items[i].data.artists.items[j].profile.name;//artist name
			dv.appendChild(adtp);
			}
		break;
	}
	else{
		s=result.tracks.items[0].data.id; //trackID
		
		dvab.innerHTML=result.tracks.items[0].data.albumOfTrack.name;//album name
		
		img.setAttribute('src',result.tracks.items[0].data.albumOfTrack.coverArt.sources[0].url);//img
		ig.appendChild(img);
		console.log(img);
		
		for(let j in result.tracks.items[0].data.artists.items){
			var adtp=document.createElement('h4');
			adtp.innerHTML = result.tracks.items[0].data.artists.items[j].profile.name;//artist name
			dv.appendChild(adtp);
			}
	}
	}
	
} catch (error) {
	console.error(error);
}

}


async function lyrics(){
	const turl = `https://spotify23.p.rapidapi.com/track_lyrics/?id=${s}`;
	try {
		let response = await fetch(turl, options);
		let result = await response.json();
		let ar=result.lyrics.lines

		//button inactivate
		ly.style.display="none";

		let lyr=document.querySelector(".lyr");
		while(lyr.firstChild) lyr.removeChild(lyr.firstChild)
		ar.forEach(e => {
			let a=document.createElement('p');
			a.innerHTML=e.words;
			lyr.appendChild(a);
		});
	} catch (error) {
		console.error(error);
	}
}
