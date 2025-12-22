// Dans ton composant CreateVideo.tsx
import { useAuth } from '../context/AuthContext';

export function CreateVideo() {
  const { currentUser, userProfile } = useAuth(); // Pour avoir l'ID et le solde

  const handleGenerate = async () => {
    const prompt = "Un chat qui danse sur la lune";
    
    // Petite vérif visuelle avant d'appeler le serveur
    if ((userProfile?.wallet_balance || 0) < 10) {
      alert("Il vous faut 10 jetons !");
      return;
    }

    try {
      const response = await fetch('http://localhost:3000/api/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          userId: currentUser?.uid, // On envoie l'ID
          prompt: prompt
        })
      });

      const data = await response.json();

      if (!response.ok) {
        alert(data.error); // Affiche "Pas assez de jetons" ou erreur serveur
      } else {
        console.log("Vidéo générée :", data);
        // Firebase va mettre à jour ton solde tout seul grâce au onSnapshot de l'étape précédente !
      }

    } catch (err) {
      console.error(err);
    }
  };

  return (
    <button onClick={handleGenerate}>
      Générer (10 Jetons)
    </button>
  );
}