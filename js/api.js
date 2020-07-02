var search = document.getElementById('input'),
    match = document.getElementById('list'),
    string = ''
    array = []

function ajaxGet(url, callback) {
  var req = new XMLHttpRequest();
  req.open("GET", url);
  req.addEventListener("load", function () {
    if (req.status >= 200 && req.status < 400) {
        callback(req.responseText);
    } else {
        console.error(req.status + " " + req.statusText + " " + url);
    }
  });
  req.addEventListener("error", function () {
      console.error("Erreur réseau avec l'URL " + url);
  });
  req.send(null);
}

ajaxGet('https://restcountries.eu/rest/v2/all', function(response){
  var data = JSON.parse(response)

  searchStates = async searchText => {
    let matches = await data.filter(state => {
      const regex = new RegExp(`^${searchText}`, 'gi')
      return state.name.match(regex) || state.capital.match(regex)
    })
    check(searchText,matches)
  }
});

check = (textCheked, arrayCheked) => {
  if(textCheked.length === 0 || arrayCheked.length === 0 ){
    arrayCheked = []
    match.innerHTML = ''
    console.log('AUCUNE VALEUR TROUVE')
  }
  outputHtml(arrayCheked)
}

voyelle = () => {
  let voyelle = ["A", "E", "I", "O", "U", "Y" ]
  return voyelle
}

outputHtml = matches => {
  array = voyelle()
  if(matches.length > 0 ){
    const html = matches.map(match => `
      <div class="search"> 
        <img src="${match.flag}" alt="">
        <p>la population de ${match.name} est de ${match.population} habitans</p>
        <p>sa capitale est ${match.capital}</p>
        <p>sa monnaie est ${string = array.includes(match.currencies[0].name.charAt(0).toUpperCase()) ? "l '" : "le "} ${match.currencies[0].name}</p>
        <p>Ce pays est situé en ${match.region}, plus précisément en ${match.subregion}</p>
      </div>
    `
  )
  match.innerHTML = html
  }
}
search.addEventListener('input', () => searchStates(search.value))