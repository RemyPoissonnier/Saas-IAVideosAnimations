// Regex pour mot de passe robuste : 
// This regex will enforce these rules:
// At least one upper case English letter, (?=.*?[A-Z])
// At least one lower case English letter, (?=.*?[a-z])
// At least one digit, (?=.*?[0-9])
// At least one special character, (?=.*?[#?!@$%^&*-])
// Minimum eight in length .{8,} (with the anchors)
export const PASSWORD_REGEX =/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/ ;

// Simulation d'un appel API pour vérifier si le compte existe
export const checkAccountExists = async (email: string, pseudo: string): Promise<boolean> => {
  // ICI : Remplace par ton vrai appel API (ex: axios.post('/api/check-user', ...))
  const existingEmails = ['test@rpit.fr', 'admin@gmail.com'];
  const existingPseudos = ['admin', 'rpit'];
  
  return existingEmails.includes(email) || existingPseudos.includes(pseudo);
};