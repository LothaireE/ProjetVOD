const apiUrl = `https://api.themoviedb.org/3/`;
const apiKey = `bb945102d3454234069393a2af12be06`;
var typing = false;
var timerTyping = null;
document.addEventListener("DOMContentLoaded", () => {
  document.addEventListener("click", () => {
    document.querySelector("#moviesList").style.display = "none";
  });

  document
    .querySelector(".basicAutoComplete")
    .addEventListener("click", (e) => {
      e.stopPropagation();
      if (document.querySelector("#moviesList").childNodes.length > 0) {
        document.querySelector("#moviesList").style.display = "block";
      }
    });

  document
    .querySelector(".basicAutoComplete")
    .addEventListener("keypress", (e) => {
      if (typing == false) {
        typing = true;
      } else {
        // sinon on supprime le précédent timer
        window.clearTimeout(timerTyping);
      }
      // dans tous les cas on lance un timer pour executer la recherche
      timerTyping = window.setTimeout(() => {
        typing = false;
        searchMovie(document.querySelector(".basicAutoComplete").value);
      }, 1000);
    });
});

function searchMovie(query) {
  if (query.length > 3) {
    fetch(
      `${apiUrl}search/movie?api_key=${apiKey}&language=fr-FR&page=1&include_adult=false&query=${query}`
    )
      .then((response) => response.json())
      .then((data) => {
        document.querySelector("#moviesList").innerHTML = "";
        data.results.forEach((result) => {
          let template = document.querySelector("#movieChoice");
          let clone = document.importNode(template.content, true);
          clone.querySelector("li span.title").textContent = result.title;
          clone.querySelector("li").dataset.idMovie = result.id;
          let image = `https://image.tmdb.org/t/p/w200${result.backdrop_path}`;
          if (result.backdrop_path == null) {
            image = "/images/no-photo.jpg";
          }
          clone.querySelector("li img").src = image;
          document.querySelector("#moviesList").appendChild(clone);
        });
        document.querySelector("#moviesList").style.display = "block";
        document.querySelectorAll("#moviesList li").forEach((li) => {
          li.addEventListener("click", (e) => {
            //console.log(e.currentTarget.dataset.idMovie);
            getDataMovie(e.currentTarget.dataset.idMovie);
          });
        });
      });
  }
}

function getDataMovie(idMovie) {
  Promise.all([
    // récupération du détaii du film
    fetch(`${apiUrl}movie/${idMovie}?api_key=${apiKey}&language=fr-FR`).then(
      (response) => response.json()
    ),
    // récupération des acteurs
    fetch(
      `${apiUrl}movie/${idMovie}/credits?api_key=${apiKey}&language=fr-FR`
    ).then((response) => response.json()),
    // récupération de l'affiche
  ]).then((data) => {
    let limitActors = 6;
    if (data[1].cast.length < 6) limitActors = data[1].cast.length;

    document.querySelector("#genre").value = data[0].genres
      .map((el) => el.name)
      .join(", ");
    document.querySelector("#title").value = data[0].title;
    document.querySelector(
      "#affiche"
    ).value = `https://image.tmdb.org/t/p/w200${data[0].poster_path}`;
    document.querySelector("#year").value = new Date(
      data[0].release_date
    ).getFullYear();
    document.querySelector("#synopsis").textContent = data[0].overview;
    document.querySelector("#id_tmdb").value = data[0].id;

    document.querySelector("#actors").value = data[1].cast
      .slice(0, limitActors)
      .map((el) => el.name)
      .join(", ");
    console.log(data[0]);
    console.log(data[1]);
  });
}
