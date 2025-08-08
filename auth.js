// Système d'authentification WorkflowHub
class WorkflowHubAuth {
    constructor() {
        this.storageKey = 'workflowhub_user';
        this.user = this.getStoredUser();
        this.init();
    }

    // Initialisation du système
    init() {
        // Petit délai pour s'assurer que tout est chargé
        setTimeout(() => {
            if (!this.user) {
                this.showWelcomePopup();
            } else {
                this.updateUI();
            }
        }, 500);
    }

    // Afficher la popup de bienvenue
    showWelcomePopup() {
        const overlay = document.createElement('div');
        overlay.className = 'auth-overlay';
        overlay.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0, 0, 0, 0.8);
            backdrop-filter: blur(10px);
            z-index: 10000;
            display: flex;
            align-items: center;
            justify-content: center;
            animation: fadeIn 0.3s ease;
        `;

        const popup = document.createElement('div');
        popup.className = 'auth-popup';
        popup.style.cssText = `
            background: linear-gradient(135deg, #1e1e1e 0%, #2c2c2c 100%);
            border: 2px solid #00ff88;
            border-radius: 20px;
            padding: 3rem;
            max-width: 500px;
            width: 90%;
            text-align: center;
            box-shadow: 0 20px 60px rgba(0, 255, 136, 0.3);
            animation: slideInUp 0.5s ease;
            position: relative;
        `;

        popup.innerHTML = `
            <div class="auth-header">
                <div class="auth-logo" style="
                    font-size: 2.5rem;
                    font-weight: 800;
                    color: #00ff88;
                    margin-bottom: 1rem;
                    text-shadow: 0 0 20px rgba(0, 255, 136, 0.5);
                ">
                    <i class="fas fa-cogs"></i> WorkflowHub
                </div>
                <h2 style="
                    color: #ffffff;
                    font-size: 1.8rem;
                    margin-bottom: 0.5rem;
                    font-weight: 700;
                ">Bienvenue sur WorkflowHub</h2>
                <p style="
                    color: #b0b0b0;
                    font-size: 1.1rem;
                    margin-bottom: 2rem;
                    line-height: 1.6;
                ">La marketplace #1 pour les workflows d'automatisation no-code</p>
            </div>

            <div class="auth-form">
                <div class="form-group" style="margin-bottom: 1.5rem;">
                    <label for="auth-email" style="
                        display: block;
                        color: #e0e0e0;
                        font-weight: 600;
                        margin-bottom: 0.5rem;
                        text-align: left;
                    ">Votre adresse email</label>
                    <input type="email" id="auth-email" placeholder="exemple@email.com" style="
                        width: 100%;
                        padding: 1rem;
                        border: 2px solid #444444;
                        border-radius: 12px;
                        background: #2c2c2c;
                        color: #e0e0e0;
                        font-size: 1rem;
                        transition: all 0.3s ease;
                        box-sizing: border-box;
                    " onfocus="this.style.borderColor='#00ff88'; this.style.boxShadow='0 0 0 3px rgba(0, 255, 136, 0.1)'" onblur="this.style.borderColor='#444444'; this.style.boxShadow='none'">
                </div>

                <div class="auth-benefits" style="
                    background: rgba(51, 51, 51, 0.5);
                    border-radius: 12px;
                    padding: 1.5rem;
                    margin-bottom: 2rem;
                    text-align: left;
                ">
                    <h4 style="
                        color: #00ff88;
                        margin-bottom: 1rem;
                        font-size: 1.1rem;
                    ">🎯 Ce que vous obtenez :</h4>
                    <ul style="
                        color: #b0b0b0;
                        list-style: none;
                        padding: 0;
                        margin: 0;
                    ">
                        <li style="margin-bottom: 0.5rem;"><i class="fas fa-check" style="color: #00ff88; margin-right: 0.5rem;"></i> Accès à tous nos workflows</li>
                        <li style="margin-bottom: 0.5rem;"><i class="fas fa-check" style="color: #00ff88; margin-right: 0.5rem;"></i> Commandes personnalisées simplifiées</li>
                        <li style="margin-bottom: 0.5rem;"><i class="fas fa-check" style="color: #00ff88; margin-right: 0.5rem;"></i> Notifications des nouveautés</li>
                        <li><i class="fas fa-check" style="color: #00ff88; margin-right: 0.5rem;"></i> Support prioritaire</li>
                    </ul>
                </div>

                <button id="auth-submit" style="
                    background: linear-gradient(135deg, #00ff88 0%, #00cc66 100%);
                    color: #1e1e1e;
                    border: none;
                    padding: 1rem 2rem;
                    border-radius: 12px;
                    font-size: 1.1rem;
                    font-weight: 700;
                    cursor: pointer;
                    transition: all 0.3s ease;
                    width: 100%;
                    box-shadow: 0 4px 15px rgba(0, 255, 136, 0.3);
                " onmouseover="this.style.transform='translateY(-2px)'; this.style.boxShadow='0 6px 20px rgba(0, 255, 136, 0.5)'" onmouseout="this.style.transform='translateY(0)'; this.style.boxShadow='0 4px 15px rgba(0, 255, 136, 0.3)'">
                    <i class="fas fa-rocket"></i> Commencer l'aventure
                </button>

                <p style="
                    color: #888888;
                    font-size: 0.9rem;
                    margin-top: 1rem;
                    line-height: 1.4;
                ">En continuant, vous acceptez nos <a href="#" style="color: #00ff88; text-decoration: none;">conditions d'utilisation</a> et notre <a href="#" style="color: #00ff88; text-decoration: none;">politique de confidentialité</a>.</p>
            </div>
        `;

        overlay.appendChild(popup);
        document.body.appendChild(overlay);

        // Gestion de la soumission
        const submitBtn = document.getElementById('auth-submit');
        const emailInput = document.getElementById('auth-email');

        submitBtn.addEventListener('click', () => {
            const email = emailInput.value.trim();
            if (this.validateEmail(email)) {
                this.login(email);
                overlay.remove();
            } else {
                this.showError('Veuillez entrer une adresse email valide.');
            }
        });

        // Validation avec Enter
        emailInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                submitBtn.click();
            }
        });

        // Focus automatique
        setTimeout(() => emailInput.focus(), 100);
    }

    // Valider l'email
    validateEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }

    // Connexion de l'utilisateur
    login(email) {
        this.user = {
            email: email,
            joinedAt: new Date().toISOString(),
            lastVisit: new Date().toISOString()
        };
        this.saveUser();
        this.updateUI();
        this.showWelcomeMessage();
    }

    // Sauvegarder l'utilisateur
    saveUser() {
        localStorage.setItem(this.storageKey, JSON.stringify(this.user));
    }

    // Récupérer l'utilisateur stocké
    getStoredUser() {
        const stored = localStorage.getItem(this.storageKey);
        return stored ? JSON.parse(stored) : null;
    }

    // Mettre à jour l'interface
    updateUI() {
        if (this.user) {
            // Mettre à jour la dernière visite
            this.user.lastVisit = new Date().toISOString();
            this.saveUser();

            // Pré-remplir les champs email sur les formulaires
            this.fillEmailFields();

            // Afficher l'indicateur utilisateur
            this.showUserIndicator();
        }
    }

    // Afficher l'indicateur utilisateur
    showUserIndicator() {
        const indicator = document.getElementById('user-indicator');
        const userEmail = document.getElementById('user-email');
        
        if (indicator && userEmail) {
            const emailName = this.user.email.split('@')[0];
            userEmail.textContent = emailName;
            indicator.style.display = 'block';
        }
    }

    // Pré-remplir les champs email
    fillEmailFields() {
        const emailFields = document.querySelectorAll('input[type="email"]');
        emailFields.forEach(field => {
            if (!field.value && this.user.email) {
                field.value = this.user.email;
            }
        });
    }

    // Afficher un message de bienvenue
    showWelcomeMessage() {
        const message = document.createElement('div');
        message.className = 'welcome-message';
        message.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background: linear-gradient(135deg, #00ff88 0%, #00cc66 100%);
            color: #1e1e1e;
            padding: 1rem 1.5rem;
            border-radius: 12px;
            font-weight: 600;
            z-index: 10001;
            box-shadow: 0 4px 15px rgba(0, 255, 136, 0.3);
            animation: slideInRight 0.5s ease;
        `;
        message.innerHTML = `
            <i class="fas fa-check-circle"></i> Bienvenue ${this.user.email.split('@')[0]} !
        `;

        document.body.appendChild(message);

        // Supprimer après 3 secondes
        setTimeout(() => {
            message.style.animation = 'slideOutRight 0.5s ease';
            setTimeout(() => message.remove(), 500);
        }, 3000);
    }

    // Afficher une erreur
    showError(message) {
        const errorDiv = document.createElement('div');
        errorDiv.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background: #ff2d55;
            color: white;
            padding: 1rem 1.5rem;
            border-radius: 12px;
            font-weight: 600;
            z-index: 10001;
            animation: slideInRight 0.5s ease;
        `;
        errorDiv.innerHTML = `<i class="fas fa-exclamation-triangle"></i> ${message}`;

        document.body.appendChild(errorDiv);

        setTimeout(() => {
            errorDiv.style.animation = 'slideOutRight 0.5s ease';
            setTimeout(() => errorDiv.remove(), 500);
        }, 3000);
    }

    // Déconnexion
    logout() {
        localStorage.removeItem(this.storageKey);
        this.user = null;
        location.reload();
    }

    // Réinitialiser l'authentification (pour les tests)
    reset() {
        localStorage.removeItem(this.storageKey);
        this.user = null;
        location.reload();
    }

    // Obtenir l'email de l'utilisateur
    getUserEmail() {
        return this.user ? this.user.email : null;
    }

    // Vérifier si l'utilisateur est connecté
    isLoggedIn() {
        return this.user !== null;
    }
}

// Styles CSS pour les animations
const authStyles = document.createElement('style');
authStyles.textContent = `
    @keyframes fadeIn {
        from { opacity: 0; }
        to { opacity: 1; }
    }

    @keyframes slideInUp {
        from {
            opacity: 0;
            transform: translateY(30px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }

    @keyframes slideInRight {
        from {
            opacity: 0;
            transform: translateX(100%);
        }
        to {
            opacity: 1;
            transform: translateX(0);
        }
    }

    @keyframes slideOutRight {
        from {
            opacity: 1;
            transform: translateX(0);
        }
        to {
            opacity: 0;
            transform: translateX(100%);
        }
    }

    .auth-overlay {
        animation: fadeIn 0.3s ease;
    }

    .auth-popup {
        animation: slideInUp 0.5s ease;
    }

    .welcome-message {
        animation: slideInRight 0.5s ease;
    }
`;

document.head.appendChild(authStyles);

// Initialiser l'authentification au chargement de la page
let auth;

// Fonction d'initialisation
function initAuth() {
    if (!auth) {
        auth = new WorkflowHubAuth();
        window.WorkflowHubAuth = auth;
    }
}

// Initialiser quand le DOM est prêt
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initAuth);
} else {
    // Le DOM est déjà chargé
    initAuth();
}

// Initialiser aussi quand la page est complètement chargée
window.addEventListener('load', () => {
    if (!auth) {
        initAuth();
    }
});
