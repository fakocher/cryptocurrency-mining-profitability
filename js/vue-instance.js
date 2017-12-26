/**
 * Vue.js application instance
 */
var vueApp = new Vue({

    /**
     * Vue DOM selector
     */
    el: '#app',

    /**
     * Vue model
     */
    data: {
        miner: 'antminers9', // GH/s
        hashRate: 14000, // GH/s
        difficulty: 1590896927258,
        bitcoinCHFPrice: 0, // CHF
        powerConsumption: 1375, // Watts
        electricityRate: 0.12, // CHF
        currency: 'chf', // 'bitcoin' of 'chf'
        hardwareCost: 2400, // CHF
        reward: 12.5,
        dailyProfit: 0, //CHF,
        difficultyPredictionType: 'none',
        bitcoinPredictionType: 'none',
        coinData: {},
        miningData: {},
        chart: null
    },

    /**
     * Vue watchers
     */
    watch: {
        miner: function (val, oldVal)
        {
            switch (val)
            {
                case 'antminers9':
                    this.hashRate = 14000;
                    this.powerConsumption = 1375
                    this.hardwareCost = 2500
                break;

                case 'antminers7':
                    this.hashRate = 4860;
                    this.powerConsumption = 1210
                    this.hardwareCost = 2000
                break;

                case 'avalon721':
                    this.hashRate = 6000;
                    this.powerConsumption = 900
                    this.hardwareCost = 900
                break;

                case 'avalon6':
                    this.hashRate = 3500;
                    this.powerConsumption = 1300
                    this.hardwareCost = 500
                break;
            }
        },
        difficultyPredictionType: function (val, oldVal)
        {
            this.updateGraph();
        },
        bitcoinPredictionType: function (val, oldVal)
        {
            this.updateGraph();
        },
        hashRate: function (val, oldVal)
        {
            this.updateGraph();
        },
        difficulty: function (val, oldVal)
        {
            this.updateGraph();
        },
        bitcoinCHFPrice: function (val, oldVal)
        {
            this.updateGraph();
        },
        powerConsumption: function (val, oldVal)
        {
            this.updateGraph();
        },
        electricityRate: function (val, oldVal)
        {
            this.updateGraph();
        },
        currency: function (val, oldVal)
        {
            this.updateGraph();
        },
        hardwareCost: function (val, oldVal)
        {
            this.updateGraph();
        }
    },

    /**
     * Vue methods
     */
    methods: {

        /**
         * Initialize the graph
         */
        initGraph: function ()
        {
            var ctx = document.getElementById('graph').getContext('2d');

            var config = {
                type: 'line',
                options: {
                    title:{
                        text: "Rentabilité du minage de Bitcoin",
                        display: true
                    },
                    scales: {
                        xAxes: [{
                            type: "time",
                            time: {
                                unit: 'month',
                                tooltipFormat: 'D MMM YYYY'
                            },
                            scaleLabel: {
                                display: false,
                                labelString: 'Date'
                            }
                        }, ],
                        yAxes: [{
                            scaleLabel: {
                                display: true
                            }
                        }]
                    },
                    elements: { 
                        point: { 
                            radius: 1 
                        } 
                    },
                    legend: {
                        display: false
                    },
                    tooltips: {
                        mode: 'index',
                        intersect: false
                    },
                    animation: {
                        duration: 500
                    }
                }
            };

            this.chart = new Chart(ctx, config);
        },

        /**
         * Update the graph
         */
        updateGraph: function ()
        {
            // Check if the chart is initialized
            if (this.chart)
            {
                var dates = []
                var data = [];
                var dataLinear = [];
                var dataPoly = [];
                var dataExp = [];
                var BTCPerDay = 24 / (this.difficulty * Math.pow(2, 32) / (this.hashRate * Math.pow(10, 9)) / 60 / 60) * this.reward;
                
                var electricityCHFCostPerDay = this.powerConsumption * this.electricityRate * 24 / 1000;
                this.dailyProfit = BTCPerDay * this.bitcoinCHFPrice - electricityCHFCostPerDay;
                var dailyBTCProfit = BTCPerDay - electricityCHFCostPerDay / this.bitcoinCHFPrice;
                
                var yLabel = 'Net worth (Bitcoin)';
                var labelling = false;
                
                var daysSinceBeginning = moment().diff('2009-01-03', 'days')/2;
                var estimatedDifficulty;
                var estimatedBTCPerDay;
                var estimatedDailyProfit;
                var estimatedDailyBTCProfit;
                var estimatedDailyProfitExp;
                
                for ( var i = 0 ; i <= 365 ; i += 7)
                {
                    dates.push(newDate(i));
                    
                    estimatedDifficulty = Math.pow(3.2622*Math.E,0.00789*(daysSinceBeginning+i/2));
                    estimatedBTCPerDay  = 24 / (estimatedDifficulty * Math.pow(2, 32) / (this.hashRate * Math.pow(10, 9)) / 60 / 60) * this.reward;
                    
                    estimatedDailyProfit = estimatedBTCPerDay * this.bitcoinCHFPrice - electricityCHFCostPerDay;
                    estimatedDailyProfitLinear = estimatedBTCPerDay * (13.3991 * (daysSinceBeginning+i/2) -2912.3) - electricityCHFCostPerDay;
                    estimatedDailyProfitPoly = estimatedBTCPerDay * (4e-6*Math.pow(daysSinceBeginning+i/2,3) - 0.0027*Math.pow(daysSinceBeginning+i/2,2) + 
                                            5.646*daysSinceBeginning+i/2 - 1000) - electricityCHFCostPerDay;
                    estimatedDailyProfitExp = estimatedBTCPerDay * (0.4061*Math.pow(Math.E,0.0066*(daysSinceBeginning+i/2))) - electricityCHFCostPerDay;
                    
                    estimatedDailyBTCProfit = estimatedBTCPerDay - electricityCHFCostPerDay / this.bitcoinCHFPrice
                    
                    switch (this.currency)
                    {
                        case 'bitcoin':
                            data.push(i * estimatedDailyBTCProfit - this.hardwareCost / this.bitcoinCHFPrice);
                            yLabel = 'Profit quotidien (Bitcoin)';
                            labelling = false;
                        break;

                        case 'chf':
                            data.push(i * estimatedDailyProfit - this.hardwareCost);
                            dataLinear.push(i * estimatedDailyProfitLinear - this.hardwareCost);
                            dataPoly.push(i * estimatedDailyProfitPoly - this.hardwareCost);
                            dataExp.push(i * estimatedDailyProfitExp - this.hardwareCost);
                            yLabel = 'Profit quotidien (CHF)';
                            labelling = true;
                        break;
                    }
                }

                function newDate(days) {
                    return moment().add(days, 'd').toDate();
                }

                function newDateString(days) {
                    return moment().add(days, 'd').format('LL');
                }

                function newTimestamp(days) {
                    return moment().add(days, 'd').unix();
                }

                this.chart.data.labels = dates;
                this.chart.data.datasets = [
                    {
                        label: "Prix BTC constant",
                        backgroundColor: 'rgb(230, 159, 0)',
                        borderColor: 'rgb(230, 159, 0)',
                        fill: false,
                        pointRadius: 0,
                        data: data
                    },
                    {
                        label: "Prix BTC  linéaire",
                        backgroundColor: 'rgb(86, 180, 233)',
                        borderColor: 'rgb(86, 180, 233)',
                        fill: false,
                        pointRadius: 0,
                        data: dataLinear
                    },
                    {
                        label: "Prix BTC polynomial",
                        backgroundColor: 'rgb(213, 94, 0)',
                        borderColor: 'rgb(213, 94, 0)',
                        fill: false,
                        pointRadius: 0,
                        data: dataPoly
                    },
                    {
                        label: "Prix BTC exponentiel",
                        backgroundColor: 'rgb(0, 114, 178)',
                        borderColor: 'rgb(0, 114, 178)',
                        fill: false,
                        pointRadius: 0,
                        data: dataExp
                    }
                ];

                this.chart.options.scales.yAxes[0].labelString = yLabel;
                this.chart.options.legend.display = labelling;

                this.chart.update();
            }
        },
    }
});