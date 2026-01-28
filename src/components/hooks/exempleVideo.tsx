import type { ExampleVideo } from "../ResultExample";

// const returnData : ExampleVideo = (id : number) => {
//   const i18n : any = "prompt.exemple.description" + id
//   return {
//     id : id ,
//     data: {
//       "path16:9": `%PUBLIC_URL%/videos/Exemple${id}-169.mp4`.toString,
//       "path9:6": `%PUBLIC_URL%/videos/Exemple${id}-916.mp4`.toString,
//       dataInfo : {
//         title : "",
//         prompt : t(i18n),
//       },
//     },
//   }
// }

export const ExampleVideos: ExampleVideo[] = [
  {
    id: 1,
    // Utilisation d'une structure plus plate pour faciliter l'accès
    title: "Forest",
    prompt: "prompt.exemple.description1",
    // On stocke les chemins dans un objet pour un accès direct : paths['16:9']
    paths: {
      "16:9": "/videos/Exemple1-169.mp4",
      "9:16": "/videos/Exemple1-916.mp4",
    },
    thumbnail: "/images/Exemple1-169.png",
  },
];
