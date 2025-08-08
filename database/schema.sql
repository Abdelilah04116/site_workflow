-- Script SQL pour créer la table users dans Supabase
-- À exécuter dans l'éditeur SQL de Supabase

-- Créer la table users
CREATE TABLE IF NOT EXISTS users (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    email VARCHAR(255) UNIQUE NOT NULL,
    joined_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    last_visit TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    visit_count INTEGER DEFAULT 1,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Créer un index sur l'email pour les recherches rapides
CREATE INDEX IF NOT EXISTS idx_users_email ON users(email);

-- Créer un index sur joined_at pour le tri
CREATE INDEX IF NOT EXISTS idx_users_joined_at ON users(joined_at DESC);

-- Activer Row Level Security (RLS)
ALTER TABLE users ENABLE ROW LEVEL SECURITY;

-- Créer une politique pour permettre l'insertion et la mise à jour
CREATE POLICY "Users can insert and update their own data" ON users
    FOR ALL USING (true);

-- Créer une fonction pour mettre à jour updated_at automatiquement
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Créer un trigger pour mettre à jour updated_at
CREATE TRIGGER update_users_updated_at 
    BEFORE UPDATE ON users 
    FOR EACH ROW 
    EXECUTE FUNCTION update_updated_at_column();

-- Insérer quelques utilisateurs de test (optionnel)
-- INSERT INTO users (email) VALUES 
--     ('test1@example.com'),
--     ('test2@example.com'),
--     ('abdelilahourti@gmail.com');
