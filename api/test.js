module.exports = async (req, res) => {
  // Autoriser les requêtes CORS
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  // Gérer les requêtes OPTIONS (preflight)
  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  try {
    // Vérifier les variables d'environnement
    const supabaseUrl = process.env.SUPABASE_URL;
    const supabaseKey = process.env.SUPABASE_ANON_KEY;

    const response = {
      success: true,
      message: 'Test API fonctionne',
      env: {
        hasSupabaseUrl: !!supabaseUrl,
        hasSupabaseKey: !!supabaseKey,
        supabaseUrl: supabaseUrl ? supabaseUrl.substring(0, 20) + '...' : 'Non défini',
        supabaseKey: supabaseKey ? supabaseKey.substring(0, 20) + '...' : 'Non défini'
      }
    };

    res.status(200).json(response);

  } catch (error) {
    console.error('Erreur API de test:', error);
    res.status(500).json({ 
      error: 'Erreur serveur',
      details: error.message 
    });
  }
};
