# Projet cubes - Application React (Front)

## Installation
Pour installer react modal, c'est `npm install react-modal`, `npm install --save react-modal``
Pour installer les dépendances, c'est `npm i`.
Pour lancer l'application, c'est `npm run start`.

### Fichier .env

TODO

## Organisation dossiers

- `types` : On y met tous les types dont on a besoin.
- `helpers` : C'est des fonctions/variables d'aide qu'on peut utiliser partout dans l'appli.
- `services` : Dans le dossier service, ça serait bien d'avoir un fichier pour chaque controller (person, intervenant, code, ...), un peu comme dans l'api. Dans chaque fichier, on y met nos requêtes.
- `pages & components`: Dans le dossier `page` on va avoir les fichiers principaux de chaque page, puis dedans on utilisera les components qui sont dans le dossier `components`.

## Comment fonctionne React

Pour les variables dans React on utilise les state, exemple :

```javascript
const [count, setCount] = useState<string>(5);
```

La variable const est la variable qui contient la valeur. Elle prend comme valeur par default la valeur entre les (). Ici, count = 5.
setCount est la fonction qui va permettre de modifier la valeur, d'habitude on aurait fait count = 10, la on fait setCount(10);

Pour le type, la variable count va prendre le type qui est entre les <>.
Attention, si on n'a pas de valeur par default (ce n'est pas une erreur), le type "undefined" va être ajouté automatiquement à celui que vous avez entre les <>.

Autre chose d'important, la fonction useEffect() : Elle permet de faire des actions à certains moments, exemple :

```javascript
useEffect(() => {
  console.log("Texte à afficher");
}, [variable1, variable2]);
```

Ici, le texte à afficher sera affiché au début de la page, puis à chaque fois que la variable1 ou la variable2 sera modifiée.

## React Router

Pour naviguer entre les pages, il faut utiliser le component Link.
Le router est défini dans le fichier `App.tsx`, il faut ajouter une route pour chaque page.

## Boostrap

Bootstrap est disponible dans toute l'application, il est ajouté dans le fichier `index.tsx`.

## Eslint & Prettier

Pour fix le code avec Prettier la commande est : `npm run prettier`.
