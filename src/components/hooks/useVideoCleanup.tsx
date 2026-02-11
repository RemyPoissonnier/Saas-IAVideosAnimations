import { useEffect } from "react";
import { 
  collection, 
  query, 
  where, 
  getDocs, 
  deleteDoc, 
  doc, 
  Timestamp 
} from "firebase/firestore";
// import { ref, deleteObject } from "firebase/storage";
import { db } from "./firebase"; // removed storage import

/**
 * Hook qui nettoie les vidéos expirées (expiresAt < maintenant)
 * pour l'utilisateur connecté.
 */
export const useVideoCleanup = (userId: string | undefined) => {
  useEffect(() => {
    if (!userId) return;

    const cleanupExpiredVideos = async () => {
      try {
        console.log("🧹 Cleanup: Vérification des vidéos expirées...");
        const now = Timestamp.now();
        
        // 1. Requête : trouver les générations expirées
        const generationsRef = collection(db, "users", userId, "generations");
        const q = query(generationsRef, where("expiresAt", "<", now));
        
        const snapshot = await getDocs(q);
        
        if (snapshot.empty) {
            console.log("🧹 Cleanup: Aucune vidéo expirée.");
            return;
        }

        console.log(`🧹 Cleanup: ${snapshot.size} vidéo(s) à supprimer.`);

        // 2. Suppression (Documents Firestore uniquement)
        const promises = snapshot.docs.map(async (docSnap) => {
          // const data = docSnap.data();
          
          // A. Suppression du fichier Storage (DÉSACTIVÉ)
          // On ne stocke plus sur Firebase Storage, donc rien à supprimer là-bas.
          /*
          if (data.videoUrl) {
            try {
              const fileRef = ref(storage, data.videoUrl);
              await deleteObject(fileRef);
              console.log(`🗑️ Fichier supprimé : ${data.videoUrl}`);
            } catch (storageErr) {
              console.warn("⚠️ Erreur suppression fichier (peut-être déjà supprimé) :", storageErr);
            }
          }
          */

          // B. Suppression du document Firestore
          await deleteDoc(doc(db, "users", userId, "generations", docSnap.id));
          console.log(`🗑️ Document supprimé : ${docSnap.id}`);
        });

        await Promise.all(promises);
        console.log("✅ Cleanup terminé.");

      } catch (err) {
        console.error("❌ Erreur lors du cleanup vidéo :", err);
      }
    };

    cleanupExpiredVideos();
  }, [userId]);
};
