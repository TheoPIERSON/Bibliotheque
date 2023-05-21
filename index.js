const strapiUrl = "http://localhost:1337";

const endPointArticles = "/api/articles?populate=*";

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
      visuel.src = strapiUrl + article.attributes.Images.data.attributes.formats.medium.url;
      articlesContainer.appendChild(visuel);

      let h1 = document.createElement("h1");
      h1.innerHTML = article.attributes.Titres;
      articlesContainer.appendChild(h1);

      let resume = document.createElement("p");
      resume.innerHTML = article.attributes.Resume;
      articlesContainer.appendChild(resume);
    }

    //  Si on n'a pas pu récupérer le JSON pour n'importe quelle raison
  } else {
    alert("Erreur lors de la récuparation des articles : " + response.status);
  }
}

loadArticles();
