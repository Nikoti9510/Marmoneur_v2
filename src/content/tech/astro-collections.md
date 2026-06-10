---
title: "Les collections de contenus dans AstroJS"
description: "Utilisation des collections dans AstroJS sans passer par Glob, car visiblement Astro ne veut pas mettre sa documentation à jour."
pubDate: '2026-06-10'
tags: ["tech web astro"]
draft: false
---

La documentation d'AstroJS n'est pas à jour, son tutoriel non plus.
Voilà la manière correct d'importer du contenu dans une page (merci à [mangeshbide](https://mangeshbide.tech/) pour le tuto complet et précis : [mangeshbide.tech/blog/astro-content-collections-guide/](https://mangeshbide.tech/blog/astro-content-collections-guide/).)


## Définir une collection

Dans le fichier `src/content.config.ts` (ou `src/content/config.ts`), on définit la structure de la collection. Par défaut, toutes les collections doivent se trouver dans le dossier `src/content`, mais il est aussi possible de créer une collection dans un autre dossier, en associant un fichier `config.ts` dans celui-ci.

```typescript
import { defineCollection, z } from "astro:content";

const blog = defineCollection({
	type: "content",
	schema: z.object({
		title: z.string(),
		description: z.string(),
		pubDate: z.coerce.date(),
		updatedDate: z.coerce.date().optional(),
		tags: z.array(z.string()),
		draft: z.boolean().optional(),
	}),
})

export const collections = { blog };
```

> Le paramètre `schema` permet de définir une structure à respecter dans le frontmatter des éléments composants la collection. Plus d'information sur la documentation d'astro (à jour cette fois) sur le sujet : [docs.astro.build/en/guides/content-collections/#defining-the-collection-schema](https://docs.astro.build/en/guides/content-collections/#defining-the-collection-schema)

La collection a un nom identique au dossier présent dans `src/content` contenant les éléments à récupérer. Par exemple ici, pour le dossier `src/content/blog`, la collection doit être nommé `blog`. La casse doit être respecté. Il ne reste qu'a créer des éléments dans la collection, en ajoutant des fichiers `.md` (ou autres comme `.mdx`, `.JSON`, etc..) respectant la structure définit dans le schema. 


Dans le fichier `src/content/blog/test.md` :

```typescript
---
title: 'Markdown Style Guide'
description: 'Here is a sample of some basic Markdown syntax that can be used when writing Markdown content in Astro.'
pubDate: 'Jun 19 2024'
updatedDate: 'dec 22 2025'
tags: ["test"]
draft: false
---

Here is a sample of some basic Markdown syntax that can be used when writing Markdown content in Astro.

## Headings

The following HTML `<h1>`—`<h6>` elements represent six levels of section headings. `<h1>` is the highest section level while `<h6>` is the lowest.
```

## Importer une collection 

Il suffit ensuite d'importer la collection dans une page pour accéder aux contenus des éléments qui la compose. Par exemple, pour lister tout les posts présents dans la collection `blog` et rediriger vers chacuns d'eux : 

```js
---
import { getCollection } from "astro:content"; // Importation de l'utilitaire
const posts = await getCollection(blog, ({ data }) => { // Appel de la collection 
  return data.draft === false; // On ne retourne que les posts qui ne sont pas en draft
});
---

<main>
  {
    posts.map((post) => ( // On boucle sur chaque éléments de la collection et on récupère l'id (ici l'url) de chaque post
      <li>
        <a href={`posts/${post.id}`}>{post.data.title}</a>
      </li>
    ))
  }
</main>
```

## Créer des pages dynamiques 

Une fois la collection créé, il faut générer dynamiquement une page pour chaque éléments de la collection. Pour se faire, on fait appel à [getStaticPaths](https://docs.astro.build/en/reference/routing-reference/#getstaticpaths) de l'API d'Astro.

Dans le fichier `src/pages/blog/[id].astro` 
(Ici `[id]` entre crochet remplace l'url des éléments de la collection. On peut le remplacer par le nom que l'on souhaite (`[slug]` ou `[url]` sont communs), tant que celui ci est identique au `params` définit dans `getStaticpaths`. Et ouais, je fais des doubles paranthèses).

```js
---
import Post from "../../layouts/Post.astro"; // Appel d'un layout pour la mise en page de chaque éléments de la collection 
import { getCollection, render } from 'astro:content'; // Appel des utilitaires Astro

export async function getStaticPaths() { // Plus d'information ici : https://docs.astro.build/en/reference/routing-reference/#getstaticpaths
  const posts = await getCollection("blog"); // On récupère notre collection
  return posts.map((post) => ({
    params: { id: post.id }, 
    props: { post },
  }));
}

const { post } = Astro.props;
const { Content } = await post.render(); // Pour injecter le contenu dans le layout
---

<Post {...post.data /* On passe les données de chaque post dans la layout */ }>
	<Content />
</Post>
```

Dans le fichier de layout `Post`, il suffit de faire appel aux contenus des éléments de la collection pour récupérer les informations souhaitées :

`src/layouts/Post.astro` :
```js
---
...
--- 

<article>
  <h1>{title}</h1>
  <time>{pubDate}</time>
  <span>{tag}</span>
  <section>
    <slot />
  </section>   
</article>
```

Voilo.