# Boutique cache-climatiseurs — mise en service

Tout le code est écrit et compile. Il reste quatre réglages que je ne peux pas
faire à votre place : trois sont bloqués par les règles de sécurité de Shopify
(création de jetons d'accès et de webhooks), le quatrième dépend de votre
fournisseur.

Comptez une vingtaine de minutes pour les trois premiers. Le quatrième est le
seul qui conditionne l'automatisation complète des commandes.

---

## 1. Créer le jeton d'accès Storefront — indispensable

Sans ce jeton, la page Boutique s'affiche mais reste vide : c'est lui qui relie
votre site au catalogue Shopify.

Dans l'admin Shopify : **Paramètres → Applications et canaux de vente →
Développer des applications → Créer une application**.

Nommez-la par exemple « Site Groupe Obsidian ». Puis, dans l'onglet
**Configuration → API Storefront**, cochez au minimum :

- `unauthenticated_read_product_listings`
- `unauthenticated_read_product_inventory`
- `unauthenticated_write_checkouts`
- `unauthenticated_read_checkouts`

Enregistrez, puis **Installer l'application**. L'onglet **Identifiants API**
affiche alors le *jeton d'accès de l'API Storefront*. Copiez-le.

Dans Vercel, sur le projet du site : **Settings → Environment Variables**,
ajoutez pour Production, Preview et Development :

| Variable | Valeur |
|---|---|
| `SHOPIFY_STORE_DOMAIN` | `st59nh-ay.myshopify.com` |
| `SHOPIFY_STOREFRONT_TOKEN` | le jeton copié à l'étape précédente |

Redéployez. La boutique se remplit toute seule.

---

## 2. Vérifier les réglages de vente

Trois points à contrôler dans l'admin Shopify avant d'ouvrir :

**Paiements** — activez Shopify Payments (ou un autre prestataire) pour
encaisser par carte.

**Livraison** — les prix affichés sont livraison comprise. Créez un tarif
« Livraison offerte » à 0 € pour la France métropolitaine, sinon Shopify
ajoutera des frais au moment de payer.

**Taxes** — les prix enregistrés sont des prix TTC, identiques à ceux du
fabricant. Assurez-vous que Shopify est réglé sur « prix taxes incluses »
pour la France, sinon la TVA sera ajoutée une seconde fois.

---

## 3. Brancher le webhook de commande

C'est ce qui déclenche la transmission automatique au fabricant.

**Paramètres → Notifications → Webhooks → Créer un webhook**

| Champ | Valeur |
|---|---|
| Événement | Création de commande |
| Format | JSON |
| URL | `https://www.groupe-obsidian.com/api/shopify/commande` |
| Version | la plus récente |

Shopify affiche ensuite une **clé secrète de signature**. Copiez-la dans Vercel :

| Variable | Valeur |
|---|---|
| `SHOPIFY_WEBHOOK_SECRET` | la clé de signature affichée par Shopify |
| `COMMANDE_TO` | l'adresse qui reçoit les bons de commande |

Dès que c'est en place, chaque commande déclenche un bon de commande complet —
modèle, taille, pose, coloris, quantité, adresse de livraison du client final —
sans que vous ayez à faire quoi que ce soit.

---

## 4. Obtenir les accès API du fabricant — pour l'automatisation totale

C'est le seul point qui dépend d'eux, et le seul qui manque pour que le circuit
tourne sans vous.

Leur site tourne sous WooCommerce. Deux choses à leur demander :

**a) Des identifiants API WooCommerce** — une *consumer key* et un *consumer
secret* rattachés à votre compte pro. C'est deux clics chez eux
(*WooCommerce → Réglages → Avancé → API REST → Créer une clé*, permissions
lecture/écriture).

**b) Un mode de règlement sans carte** — paiement sur compte, virement à
réception de facture, ou provision prépayée. C'est indispensable : aucune
automatisation ne peut ni ne doit saisir votre carte bancaire à chaque commande.
Sans ce point, le circuit s'arrête forcément sur une validation manuelle de
votre part.

Une fois les deux obtenus, ajoutez dans Vercel :

| Variable | Valeur |
|---|---|
| `FOURNISSEUR_API_URL` | l'URL de base de leur API REST |
| `FOURNISSEUR_API_KEY` | la consumer key |
| `FOURNISSEUR_API_SECRET` | le consumer secret |
| `FOURNISSEUR_AUTO` | `1` |

**Laissez `FOURNISSEUR_AUTO` de côté au début.** Tant qu'elle n'est pas à `1`,
vous recevez le bon de commande formaté mais rien n'est envoyé chez eux : vous
passez la commande vous-même et vous vérifiez que la traduction des références
est juste. Une fois deux ou trois commandes validées ainsi, passez la variable
à `1` et le circuit devient entièrement automatique.

C'est volontaire : une automatisation qui engage de l'argent chez un
fournisseur mérite d'être vérifiée avant d'être lâchée.

---

## Ce qui a été mis en place

**Catalogue Shopify** — 46 produits, 423 variantes, photos hébergées sur le CDN
Shopify (aucun lien vers le site du fabricant, noms de fichiers neutralisés),
trois collections automatiques.

**Prix** — reconstitués depuis la grille publique du fabricant et vérifiés sur
trois paliers indépendamment. Vos prix pro sont exactement 85 % du prix public,
soit la marge de 15 % sur chaque vente.

| Palier | S | M | L | XL | XXL |
|---|---|---|---|---|---|
| A (10 modèles) | 349 € | 439 € | 549 € | 740 € | 929 € |
| B (13 modèles) | 369 € | 459 € | 619 € | 779 € | 969 € |
| C (17 modèles) | 399 € | 489 € | 639 € | 809 € | 999 € |

Coloris sur mesure : +180 € quelle que soit la taille. Caches intérieurs :
179 € à 229 €. Pièces détachées : 49 € à 119 €.

**Site** — le menu se réduit à deux entrées, *Le Groupe* et *Boutique*. La page
*Le Groupe* devient le sommaire de toute l'activité : huit cartes vers les pôles
existants, plus un renvoi vers la boutique. Rien n'a été supprimé, toutes les
pages restent en ligne et dans le plan du site.

**Boutique** — une page catalogue avec filtres par catégorie, une fiche par
modèle avec galerie, sélecteur de taille, de pose, de coloris et option sur
mesure, calcul du prix en direct, et bouton qui ouvre le paiement sécurisé
Shopify. Les choix qui ne changent pas le prix (coloris, pose, référence RAL)
voyagent en propriétés de ligne : ils apparaissent sur la commande et servent à
la production.

**Référencement** — métadonnées et mots-clés sur chaque fiche, données
structurées Schema.org pour les résultats Google enrichis, et les 46 fiches
ajoutées automatiquement au plan du site.

**Nom du fournisseur** — absent de toutes les pages, de toutes les descriptions
et de toutes les URL d'images.
