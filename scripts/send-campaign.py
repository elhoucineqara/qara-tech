import os
import smtplib
import time
from email.mime.multipart import MIMEMultipart
from email.mime.text import MIMEText

# --- CONFIGURATION ---
# Mettez DRY_RUN = False pour réellement envoyer les e-mails.
# Laissez True pour tester et voir la liste des destinataires dans la console.
DRY_RUN = True

# Informations de connexion SMTP (Exemple pour Gmail, Hostinger, Outlook, etc.)
SMTP_SERVER = "smtp.gmail.com"
SMTP_PORT = 587
SMTP_USER = "votre-adresse-email@gmail.com"
SMTP_PASSWORD = "votre-mot-de-passe-d-application"  # Utilisez un mot de passe d'application

# Expéditeur
SENDER_NAME = "El Houcine QARA"
SENDER_EMAIL = SMTP_USER

# Contenu de l'e-mail
SUBJECT = "L'Intelligence Artificielle dans l'Éducation : Révolution ou Évolution Assistée ? 🧠🎓"

HTML_CONTENT = """
<html>
<body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333333;">
    <p>Bonjour,</p>
    
    <p>L'essor fulgurant de l'Intelligence Artificielle (IA) redéfinit les contours de nombreux secteurs, et celui de l'éducation et de la formation professionnelle est en première ligne.</p>
    
    <p>Loin de remplacer l'humain, l'IA s'impose aujourd'hui comme un véritable copilote pédagogique, ouvrant la voie à des opportunités inédites mais aussi à des défis éthiques majeurs.</p>
    
    <p>Je viens de publier un article complet sur le sujet : <strong>"L'Intelligence Artificielle dans l'Éducation : Révolution ou Évolution Assistée ?"</strong></p>
    
    <p>Dans cet article, nous décryptons notamment :</p>
    <ul>
        <li><strong>La personnalisation de l'apprentissage</strong> : comment l'IA s'adapte au rythme de chaque apprenant en temps réel.</li>
        <li><strong>L'assistance aux formateurs et enseignants</strong> : la libération du temps administratif au profit de l'accompagnement humain.</li>
        <li><strong>Les défis éthiques</strong> : la confidentialité des données, l'équité d'accès et le développement de l'esprit critique.</li>
    </ul>
    
    <p>👉 <a href="https://qara.tech/blog/ai-and-education" style="color: #8b5cf6; font-weight: bold; text-decoration: none;">Lire l'article complet ici</a></p>
    
    <p>N'hésitez pas à me faire part de vos réflexions et retours d'expérience sur l'impact de ces technologies dans votre secteur.</p>
    
    <p>Bien cordialement,</p>
    
    <p><strong>El Houcine QARA</strong><br>
    Développeur Full Stack & Consultant Tech<br>
    <a href="https://qara.tech" style="color: #6366f1; text-decoration: none;">qara.tech</a></p>
</body>
</html>
"""

TEXT_CONTENT = """
Bonjour,

L'essor fulgurant de l'Intelligence Artificielle (IA) redéfinit les contours de nombreux secteurs, et celui de l'éducation et de la formation professionnelle est en première ligne.

Loin de remplacer l'humain, l'IA s'impose aujourd'hui comme un véritable copilote pédagogique, ouvrant la voie à des opportunités inédites mais aussi à des défis éthiques majeurs.

Je viens de publier un article complet sur le sujet : "L'Intelligence Artificielle dans l'Éducation : Révolution ou Évolution Assistée ?"

Dans cet article, nous décryptons notamment :
- La personnalisation de l'apprentissage : comment l'IA s'adapte au rythme de chaque apprenant en temps réel.
- L'assistance aux formateurs et enseignants : la libération du temps administratif au profit de l'accompagnement humain.
- Les défis éthiques : la confidentialité des données, l'équité d'accès et le développement de l'esprit critique.

👉 Lire l'article complet ici : https://qara.tech/blog/ai-and-education

N'hésitez pas à me faire part de vos réflexions et retours d'expérience sur l'impact de ces technologies dans votre secteur.

Bien cordialement,

El Houcine QARA
Développeur Full Stack & Consultant Tech
https://qara.tech
"""

def load_emails(file_path):
    emails = []
    if not os.path.exists(file_path):
        print(f"Erreur : Le fichier {file_path} n'existe pas.")
        return emails
        
    with open(file_path, 'r', encoding='utf-8') as f:
        for line in f:
            email = line.strip()
            if email and "@" in email:
                emails.append(email)
    return list(set(emails))  # Élimine les doublons éventuels

def send_emails():
    emails_file = "tous_les_emails_marocains.txt"
    destinations = load_emails(emails_file)
    
    print(f"Chargé {len(destinations)} e-mails uniques depuis {emails_file}.")
    
    if DRY_RUN:
        print("\n--- MODE SIMULATION (DRY_RUN = True) ---")
        print("Les e-mails suivants auraient reçu le message :")
        for idx, email in enumerate(destinations, 1):
            print(f"{idx}. {email}")
        print("\nPour envoyer réellement, modifiez DRY_RUN = False dans le script et configurez vos accès SMTP.")
        return

    # Connexion au serveur SMTP
    print(f"Connexion au serveur SMTP {SMTP_SERVER}:{SMTP_PORT}...")
    server = smtplib.SMTP(SMTP_SERVER, SMTP_PORT)
    server.starttls()
    server.login(SMTP_USER, SMTP_PASSWORD)
    print("Connexion réussie !")

    try:
        for idx, recipient in enumerate(destinations, 1):
            print(f"[{idx}/{len(destinations)}] Envoi à {recipient}...")
            
            # Création du message
            msg = MIMEMultipart('alternative')
            msg['Subject'] = SUBJECT
            msg['From'] = f"{SENDER_NAME} <{SENDER_EMAIL}>"
            msg['To'] = recipient
            
            # Attacher les versions texte et HTML
            msg.attach(MIMEText(TEXT_CONTENT, 'plain'))
            msg.attach(MIMEText(HTML_CONTENT, 'html'))
            
            # Envoi
            server.sendmail(SENDER_EMAIL, recipient, msg.as_string())
            
            # Petite pause pour éviter de se faire bloquer par le serveur (anti-spam)
            time.sleep(1.5)
            
        print("\nFélicitations, tous les e-mails ont été envoyés avec succès !")
    except Exception as e:
        print(f"Une erreur est survenue lors de l'envoi : {e}")
    finally:
        server.quit()
        print("Connexion SMTP fermée.")

if __name__ == "__main__":
    send_emails()
