const strapiUrl = "http://localhost:1337";

const endPointArticles = "/api/livres?populate=*";

let articlesContainer = document.getElementById("articles");

/*
    Récupère la liste d'articles depuis Strapi
 */
async function loadArticles() {
  //  Javascript demande à Strapi de lui fournir le JSON des articles
  let response = await fetch(strapiUrl + endPointArticles);

  //  Si on a pu récupérer le JSON correctement
  if (response.ok) {
    //  Ici, on récupère le contenu au format JSON
    let json = await response.json();

    //  On boucle sur chacun des articles contenus dans le JSON
    for (let article of json.data) {
      console.log(article);

      let visuel = document.createElement("img");
      visuel.src = strapiUrl + article.attributes.Couverture.data.attributes.formats.medium.url;
      visuel.classList.add("visuel");
      articlesContainer.appendChild(visuel);

      let h1 = document.createElement("h1");
      h1.innerHTML = article.attributes.Titres;
      h1.classList.add("h1");
      articlesContainer.appendChild(h1);

      let Auteur = document.createElement("h2");
      Auteur.innerHTML = article.attributes.Auteur;
      Auteur.classList.add("Auteur");
      articlesContainer.appendChild(Auteur);
      /*
      let resume = document.createElement("p");
      resume.innerHTML = article.attributes.Resume;
      resume.classList.add("resume");
      articlesContainer.appendChild(resume);

      let avis = document.createElement("p");
      avis.innerHTML = article.attributes.avis;
      articlesContainer.appendChild(avis);
*/
      let note = document.createElement("p");
      note.innerHTML = article.attributes.note;
      note.classList.add("note");
      articlesContainer.appendChild(note);
    }

    //  Si on n'a pas pu récupérer le JSON pour n'importe quelle raison
  } else {
    alert("Erreur lors de la récuparation des articles : " + response.status);
  }
}

loadArticles();
