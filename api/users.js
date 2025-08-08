import { createClient } from '@supabase/supabase-js';

// Configuration Supabase
const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_ANON_KEY;

const supabase = createClient(supabaseUrl, supabaseKey);

export default async function handler(req, res) {
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
    if (req.method === 'POST') {
      // Créer un nouvel utilisateur
      const { email } = req.body;

      if (!email) {
        return res.status(400).json({ error: 'Email requis' });
      }

      // Vérifier si l'utilisateur existe déjà
      const { data: existingUser } = await supabase
        .from('users')
        .select('*')
        .eq('email', email)
        .single();

      if (existingUser) {
        // Mettre à jour la dernière visite
        const { data, error } = await supabase
          .from('users')
          .update({ 
            last_visit: new Date().toISOString(),
            visit_count: existingUser.visit_count + 1
          })
          .eq('email', email)
          .select()
          .single();

        if (error) throw error;

        return res.status(200).json({ 
          success: true, 
          user: data,
          message: 'Utilisateur mis à jour'
        });
      }

      // Créer un nouvel utilisateur
      const { data, error } = await supabase
        .from('users')
        .insert([
          {
            email: email,
            joined_at: new Date().toISOString(),
            last_visit: new Date().toISOString(),
            visit_count: 1
          }
        ])
        .select()
        .single();

      if (error) throw error;

      return res.status(201).json({ 
        success: true, 
        user: data,
        message: 'Utilisateur créé'
      });

    } else if (req.method === 'GET') {
      // Récupérer tous les utilisateurs (pour l'admin)
      const { data, error } = await supabase
        .from('users')
        .select('*')
        .order('joined_at', { ascending: false });

      if (error) throw error;

      return res.status(200).json({ 
        success: true, 
        users: data 
      });

    } else {
      return res.status(405).json({ error: 'Méthode non autorisée' });
    }

  } catch (error) {
    console.error('Erreur API:', error);
    return res.status(500).json({ 
      error: 'Erreur serveur',
      details: error.message 
    });
  }
}
