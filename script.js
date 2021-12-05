'use strict';
const btn =document.querySelector(".submit-btn");
const inputbox = document.querySelector(".inputbox");
const details= document.querySelector(".datacontianer");
btn.addEventListener('click',function(){
  if(inputbox.value!=""){
    const value = inputbox.value;
    console.log(value);
    details.innerHTML = "";    
    fetchApi(value);
    inputbox.value="";     
  } 
});

inputbox.addEventListener('keydown', function (event) {
  if(event.keyCode==13)
    btn.click();
});


function fetchApi(country){
  fetch(`https://restcountries.com/v3.1/name/${country}?fullText=true`)
  .then(res => res.json())
  .then(data => getCountryDetails(data[0]))
  .catch(err => {console.log("Error:", err);
  let err_msg = `<pre class= exception >country ${country} is not found</pre>` ;
  details.innerHTML = err_msg; 
})
}


function getCountryDetails(data) {
  console.log(data);
  //console.log(data.capital);
  let first = Object.keys(data.currencies);
  const html = `
    <article class=detailsbox>
    <img class="img" src="${data.flags.png}" />
    <div class="details">
      <pre class="countryName">Country      : ${data.name.common}</pre>
      <pre>Capital       : ${data.capital}</pre>
      <pre class="region">Region       : ${data.region}</pre>
      <pre class="languages">Languages : ${Object.values(data.languages)}</pre>
      <pre class="population">Population  : ${(+data.population / 1000000).toFixed(1)} M people</pre>
      <pre class="currency">Currency    : ${first}</pre>
    </div>
    </article>
  `;
    details.innerHTML = html;
    //details.insertAdjacentHTML('beforeend', html);
}

// details.addEventListener('click', function (e) {
//   const ele = e.target;
//   if (ele.classList.contains('countryName')) {
//       countriesContainer.innerHTML = '';
//       getCountryData(ele.textContent);
//   }
// })