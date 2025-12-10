// Regex pour mot de passe robuste : 
// Minimum eight characters, at least one letter and one number
export const PASSWORD_REGEX = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;

// Simulation d'un appel API pour vérifier si le compte existe
export const checkAccountExists = async (email: string, pseudo: string): Promise<boolean> => {
  // Simule un délai réseau de 800ms
  await new Promise((resolve) => setTimeout(resolve, 800));
  
  // ICI : Remplace par ton vrai appel API (ex: axios.post('/api/check-user', ...))
  const existingEmails = ['test@rpit.fr', 'admin@gmail.com'];
  const existingPseudos = ['admin', 'rpit'];
  
  return existingEmails.includes(email) || existingPseudos.includes(pseudo);
};