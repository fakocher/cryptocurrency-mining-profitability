# Rentabilité du minage de Bitcoin

Ce projet de Visualisation d'Information tente d'analyser la rentabilité du minage du Bitcoin.

##TODO ?
Impression ?
export ?
7 Mantra (schneiderman)
règles d'utilisabilité
sauver avec get

## Introduction

Dans le cadre du cours de visualisation de l'information, il nous a été demandé de proposer et de développer un projet de visualisation.

Pour notre projet, nous avons choisi de travailler avec les monnaies virtuelles, qui est un sujet très actuel. 
Plus précisément, en raison de la difficulté à trouver des informations sur le minage, nous avons choisi de centrer notre projet sur celui-ci.
Notre projet consiste alors à étudier la rentabilité du minage du Bitcoin, et de présenter ces résultats à un public d'amateurs, 
qui s'intéressent ou désirent se lancer dans le minage de monnaies virtuelles.

## Comment lancer l'application

Étant donné que l'application tourne avec HTML, CSS et Javascript, Vous pouvez simplement ouvrir `app.html` en local, ou le lien ci-dessous en ligne :

http://htmlpreview.github.io/?https://github.com/fakocher/cryptocurrency-mining-profitability/blob/master/app.html

## Choix des données

Nous avons besoin de plusieurs données pour notre projet. Nous n'avons pas pu trouver un endroit unique ou trouver ces données, et avons donc du
les récupérer de site différents. Le but initial était d'obtenir les données en temps réel, mais pour des raisons de temps et de simplicité, 
les valeurs historiques ont été chargées de manière statique et sauvées dans un fichier javascript.

### prix actuel du bitcoin

Nous obtenons directement la dernière valeur du marché depuis une API.

### données historiques sur la difficulté

Provenance : https://blockchain.info/fr/charts/market-price

Ces données sont nécessaire pour estimer des courbes de tendance, qui sont utilisées par notre application pour calculer la rentabilité du minage.
Nous avons pour cela déterminer 2 modèles de courbe qui semblait pouvoir suivre la tendance, une courbe polynomiale d'ordre 5, et une courbe exponentielle.

Les données remontent au lancement du bitcoin, jusque au moment du téléchargement. Pour améliorer notre application, il serait bien d'obtenir ces valeurs en temps réel. 
Cela nécessite par contre de pouvoir calculer les courbes de tendances à l'aide d'un algorithme, ce qui n'a pas été fait dans notre cas. 
Notre set contient 1636 points de données, un point chaque deux jours.

### données historiques sur le prix du marché

Provenance : https://blockchain.info/fr/charts/difficulty

Comme pour les données sur la difficulté, ces données sont aussi utilisées pour calculer les courbes de tendances. 
Nous avons de nouveau utilisé des courbes de tendances polynomiale et exponentielle, mais nous avons aussi ajouté une courbe linéaire. 
En effet, la courbe a énormément augmenté récemment suite à pic de popularité des monnaies virtuelles. La valeur du Bitcoin donc l'impression 
d'augmenter de manière exponentielle à ce jour, mais il paraît peu probable qu'elle continue ainsi.

Les données remontent aussi au lancement du Bitcoin, jusqu'au moment du téléchargement, et le set contient lui aussi 1636 points de données, un point chaque deux jours

### processeurs dédiés

Nous avons choisi quelques processeurs dédiés au minage et extrait leurs caractéristiques.

### prix de l'électricité

Cette valeur a été choisie de manière selon le prix actuel.

## Intentions, message à transmettre

Le but principal du projet est de montrer la rentabilité du minage des monnaies virtuelles sur le long terme. 

Ceci est une question très actuelle, du à l'augmentation de la popularité des monnaies virtuelles. 
Nous avons trouvé énormément de sites internet qui parlent de la valeur du Bitcoin, mais très peu parlent du minage.

Nos résultats sont peu concluants et le message que nous essayons de transmettre est qu'il n'est pas judicieux de 
commencer à miner, ou d'investir dans des processeurs de minages, car miner risque de ne plus être rentable d'ici peu.

Il faut cependant noter que notre travail comporte de nombreuses incertitudes et imprécisions, notamment à cause des estimations à long terme 
et parce que nous avons fixé certains paramêtres lors du calcul, comme par exemple le prix de l'électricité et le hashrate.

## Représentation

Pour la

--> screenshot du graphique prédiction

Nous avons décidé de présenter nos prédictions en utilisant un graphique simple, sous forme de line chart, avec en abscisse le temps en mois, et en ordonnée la rentabilité.
Par rentabilité, nous entendons l'argent gagné ou perdu en minant du bitcoin. Nous avons choisi ce type de graphique car c'est le genre 
de graphique généralement utilisé pour représenter des prédictions. 

Nous avons choisi de représenter l'évolution de la rentabilité sur un an, et de diviser l'axe des abscisses en mois. 
L'axe des ordonnées change automatiquement en fonction des données et ne commence pas à une valeur fixe. En effet, nous nous intéressons 
plus à l'évolution et la forme de la courbe plutôt qu'à la fortune à un instant défini.

Plutôt que de montrer plusieurs courbes sur un graphique, avec les différentes courbes de tendance, nous avons choisi de laisser le choix à 
l'utilisateur quand au choix de la tendance, et nous avons ajouté deux graphiques montrant la forme de la courbe de tendance choisie, comparée aux historiques
de difficulté et du prix du marché du bitcoin.

Du à la taille du graphique, nous avons choisi de laisser une grille sur le graphique pour pouvoir se situer rapidement sur le graphique. 

La couleur de la courbe est adaptée à un public daltonien.

--> screenshot des graphiques historiques

Pour bien comprendre le graphique sur la rentabilité, il nous a semblé essentiel de montrer à l'utilisateur quelles courbes de tendances nous utilisons.
En effet, le calcul est complexe et dépent de beaucoup de paramêtres, et nous ne pouvions pas expliquer le fonctionnement de l'algorithme, sans écrire de longs textes techniques.
Nous avons donc décider d'ajouter deux graphiques montrant les historiques, et la courbe de tendance que l'utilisateur peut choisir. 
Ainsi, l'utilisateur peut comparer la courbe choisie avec l'historique, et choisir celle qui correspond le mieux à la réalité selon lui. 
Il peut aussi observer l'impact de la courbe en la comparant avec le graphique de rentabilité.

Nous avons choisi de présenter les données depuis le lancement du bitcoin, sans se préoccuper des détails des valeurs, car c'est de nouveau 
la forme de la courbe qui nous intéresse, et non pas les valeurs. L'axe des abscisses est divisé en année et l'axe des ordonnées est adapté aux courbes.

Nous avons de nouveau laisser la grille pour se situer et utilisé la même palette de couleur que pour le graphique précédent.

## Présentation et interaction

présentation sous forme de page web, en utilisant différentes librairies javascript.

### Formulaire

 -	formulaire permettant d'entrer des paramètres personnalisés.
 -	choix dans une liste de processeurs utilisés pour faire du minage.
 -	exprimer la rentabilité sous forme de bitcoin ou de francs suisses.
 -	mouseover pour voir les données des graphiques en détail. 

## Critique outil(s) utilisé(s)

Nous sommes contents de l'outil graphique ChartJS.

## Accessibilité

responsivness
Le choix des couleurs a été adapté à un public daltonien.

## Améliorations possibles

- Ajouter la rentabilité d'autres crypto-monnaies pour comparer
- Ajouter des processeurs depuis une API
- Améliorer la performance des graphiques (quelques latences)
- Ajouter l'accessibilité pour les mal-voyants

## Sources (données et informations)

* https://www.cryptocompare.com/api/
* https://www.cryptocompare.com/mining/calculator/btc
* https://bitcoin.stackexchange.com/questions/8568/equation-for-mining-profit
* https://bitcoinwisdom.com/bitcoin/difficulty
* https://blockchain.info/fr/charts/difficulty
* https://blockchain.info/fr/charts/market-price
* https://www.bitcoinmining.com/bitcoin-mining-hardware/
* https://en.bitcoin.it/wiki/Mining_hardware_comparison
* http://mkweb.bcgsc.ca/colorblind/
* http://www.romande-energie.ch/images/Files/prix-electricite/2017_prix-electricite_RE.pdf

## Bibliothèques JS & CSS

* http://www.chartjs.org/
* https://vuejs.org/
* https://semantic-ui.com/
* https://jquery.com/
* http://momentjs.com/
