# cryptocurrency-mining-profitability

This is an Information Visualisation project aiming to show the profitability of Bitcoin mining.

## How to

Since the app is only HTML, CSS and Javascript, you can simply open this link:

http://htmlpreview.github.io/?https://github.com/fakocher/cryptocurrency-mining-profitability/blob/master/index.html

## Choix des données

données historiques sur la difficulté et sur le prix du bitcoin

	ces données sont utilisées pour déterminer nos courbes de tendances. Elles ont été extraites de manière statique.
	
	Les données remontent au lancement du bitcoin, jusqu'à aujourd'hui. Notre set contient 16
	Les données remontent au lancement du bitcoin, jusqu'à aujourd'hui. Notre set contient 16
processeurs dédiés : Nous avons choisi quelques processeurs dédiés au minage et extrait leurs caractéristiques. 
prix de l'électricité : Cette valeur a été choisie de manière selon le prix actuel. 
prix du bitcoin : nous obtenons directement la dernière valeur du marché. 

## Intentions, message à transmettre

Expliquer comment se calcule la rentabtilité du minage.
Estimer la rentabilité du minage sur une longue période, si les paramètres suivent la tendance actuelle

## Représentation

la rentabilité actuelle du minage, en utilisant un processeur dédié.
2 graphiques montrant les courbes historiques de difficulté et de la valeur du bitcoin, ainsi que les courbes de tendances qui seront utilisées pour estimer la rentabilité.
2 graphiques montrant l'évolution de la rentabilité du minage, en francs suisse et en bitcoin, suivant les courbes de tendances.


## Présentation et interaction

présentation sous forme de page web, en utilisant différentes librairies javascript.

Les intéractions possibles sont : 

 -	formulaire permettant d'entrer des paramètres personnalisés.
 -	choix dans une liste de processeurs utilisés pour faire du minage.
 -	exprimer la rentabilité sous forme de bitcoin ou de francs suisses.
 -	mouseover pour voir les données des graphiques en détail. 

## Critique outil(s) utilisé(s)

Nous sommes contents de l'outil graphique ChartJS.

## Accessibilité

Le choix des couleurs a été adapté à un public daltonien.

## Améliorations possibles

- Ajouter la rentabilité d'autres crypto-monnaies pour comparer
- Ajouter des processeurs depuis une API
- Améliorer la performance des graphiques (quelques latences)
- Ajouter l'accessibilité pour les mal-voyants

## Sources

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

## JS & CSS Libraries

* http://www.chartjs.org/
* https://vuejs.org/
* https://semantic-ui.com/
* https://jquery.com/
* http://momentjs.com/
