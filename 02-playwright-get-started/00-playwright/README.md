# Playwright

Il n'y a pas de mauvais choix. Ces frameworks ont une architecture différente, des capacités légèrement différentes.

## Playwright vs Cypress

### Playwright
* Légèrement plus rapide. Donc si vous avez un gros framework avec beaucoup de tests, cela peut donner un certain avantage dans l'exécution des tests.
* Prise en charge plusieurs langages : JavaScript, TypeScript (default), Python, Java et C Sharp.
* Prise en charge une exécution parallèle.
* Permet d'exécuter un test en parallèle à l'intérieur d'un seul fichier de spécification.
    
Exemple: Deux fichiers de tests où chaque fichier contient 50 tests. Dans Playwright, les tests sont exécutés dans plusieurs threads en parallèles. 
             Par exemple, dans n threads, alors que dans Cypress, les tests ne peuvent être exécutés que dans deux threads parallèles 

* Gère le multi-onglets
* S'adapte mieux aux iframes
* Supporte XPath out of the box

### Cypress
* Prise en charge plusieurs langages : TypeScript ou JavaScript
* Pour activer l'exécution parallèle, il faut utiliser soit un service de dashboardd payant, soit un plugin GitHub.
* Les tests ne peuvent être exécutés en parallèle que par fichier.
* Ne gère pas le multi-onglets
* Travailler aussi avec des iframes, mais parfois cela pourrait ne pas être aussi fluide qu'avec Playwright /!\
* Xpath selectors nécéssite des plugins
* Permet d'écrire des scripts plus rapidement grâce à la façon dont il est conçu => moins de lignes de code pour automatiser un certain scénario et, par conséquent, un scripting plus rapide des scénarios et une maintenance plus facile
* Dispose d'un mécanisme d'automatisation meilleur et plus direct
* Attente automatique: éléments soient visibles, cliquables, etc. est faitede manière plus transparente, ce qui rend les tests légèrement plus stables
* Documentation très claire
* Meilleur gestionnaire de test qui permet de revenir en arrière et d'analyser étape par étape la façon dont le test a été exécuté
* Dashboard Service (payant): donne la capacité d'exécution parallèle et fournit un rapport et un historique des exécutions des tests

