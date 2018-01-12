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
        difficultyPredictionType: 'exponential',
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
            this.updateGraphs();
        },
        bitcoinPredictionType: function (val, oldVal)
        {
            this.updateGraphs();
        },
        hashRate: function (val, oldVal)
        {
            this.updateGraphs();
        },
        difficulty: function (val, oldVal)
        {
            this.updateGraphs();
        },
        bitcoinCHFPrice: function (val, oldVal)
        {
            this.updateGraphs();
        },
        powerConsumption: function (val, oldVal)
        {
            this.updateGraphs();
        },
        electricityRate: function (val, oldVal)
        {
            this.updateGraphs();
        },
        currency: function (val, oldVal)
        {
            this.updateGraphs();
        },
        hardwareCost: function (val, oldVal)
        {
            this.updateGraphs();
        }
    },

    /**
     * Vue methods
     */
    methods: {

        /**
         * Initialize the graph
         */
		initValueHistoryGraph: function()
		{
			var ctx = document.getElementById('bitcoinHistoryGraph').getContext('2d');
			var config = {
				type: 'line',
				options: {
					title:{
						text: "Historique de la valeure du Bitcoin (CHF)",
						display: true
					},
					scales: {
						xAxes: [{
							type: "time",
							time: {
								unit:'year',
								tooltipFormat: 'D MMM YYYY'
							},
							scaleLabel: {
								display: false,
								labelString: 'Time'
							}
						}, ],
						yAxes: [{
							scaleLabel: {
								display: true,
								labelString: 'Valeur (CHF)'
							}
						}]
					},
					elements: { 
						point: { 
							radius: 1
						} 
					},
					tooltips: {
						mode: 'index',
						intersect: false
					},
					legend: {
						display: false
					},
					animation: {
						duration: 500
					}
				}
			}
			this.bitcoinValueChart = new Chart(ctx,config);
		},
		initDifficultyHistoryGraph: function()
		{
			var ctx = document.getElementById('difficultyHistoryGraph').getContext('2d');
			var config = {
				type: 'line',
				options: {
					title:{
						text: "Historique de la difficulté de minage du Bitcoin",
						display: true
					},
					scales: {
						xAxes: [{
							type: "time",
							time: {
								unit:'year',
								tooltipFormat: 'D MMM YYYY'
							},
							scaleLabel: {
								display: false,
								labelString: 'Time'
							}
						}, ],
						yAxes: [{
							scaleLabel: {
								display: true,
								labelString: 'difficulté ( milliards )'
							},
							ticks: {
								callback: function(value, index, values) {
								return value/10e9;
								}
							}
						}]
					},
					elements: { 
						point: { 
							radius: 1 
						} 
					},
					tooltips: {
						mode: 'index',
						intersect: false
					},
					legend: {
						display: false
					},
					animation: {
						duration: 500
					}
				}
			}

			this.difficultyChart = new Chart(ctx,config);
		},
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
		initGraphs: function()
		{
			 this.initGraph();
			 this.initValueHistoryGraph();
			 this.initDifficultyHistoryGraph();
		},
        /**
         * Calculate coins mined per day
         */
        getCoinPerDay: function()
        {
            return 24 / (this.difficulty * Math.pow(2, 32) / (this.hashRate * Math.pow(10, 9)) / 60 / 60) * this.reward;
        },

        /**
         * Update the graph
         */
		updateDifficultyGraph: function()
		{
			if(this.difficultyChart)
			{
				var dates = [];
				var data = difficultyData;
				var selectedDataset;
				
				var trendLine = [];
				var trendLinePoly = [];
				
				for( var i = 0 ; i <= 1636 ; i++)
				{
					dates.push(newDate(i));
					trendLine.push(Math.pow(3.2622*Math.E,0.00789*i));
					trendLinePoly.push(0.0032*Math.pow(i,5) - 10.947*Math.pow(i,4) +
											13661*Math.pow(i,3) - 7e+6*Math.pow(i,2) + 
											1e+9*i - 6e+10)
				}
				function newDate(days) {
					return moment("20090103", "YYYYMMDD").add(2 * days, 'd').toDate();
				}
				switch (this.difficultyPredictionType)
				{
					
					case 'polynomial':
						selectedDataset = trendLinePoly;
					break;

					case 'exponential':
						selectedDataset = trendLine;
					break;

					case 'none':
					default:
						selectedDataset = null;
					break;
				}
				this.difficultyChart.data.labels = dates;
                this.difficultyChart.data.datasets = [
                    {
                        label: "Historique",
                        backgroundColor: 'rgb(213, 94, 0)',
                        borderColor: 'rgb(213, 94, 0)',
                        fill: false,
                        pointRadius: 0,
                        data: data
                    },
					{
						label: "Tendance",
                        backgroundColor: 'rgb(0, 114, 178)',
                        borderColor: 'rgb(0, 114, 178)',
                        fill: false,
                        pointRadius: 0,
                        data: selectedDataset
					}
                ];

				this.difficultyChart.options.legend.display = true;
                this.difficultyChart.update();
			}
			
		},
		updateBitcoinGraph: function()
		{
			if(this.bitcoinValueChart)
			{
				var dates = [];
				var data = bitcoinValueData;
				
				var trendLine = [];
				var trendLinePoly = [];
				var trendLineExp = [];
				
				for( var i = 0 ; i <= 1636 ; i++)
				{
					dates.push(newDate(i));
					trendLine.push(13.3991 * i -2912.3);
					trendLinePoly.push(4e-6*Math.pow(i,3) - 0.0027*Math.pow(i,2) + 
											5.646*i - 1000);
					trendLineExp.push(0.4061*Math.pow(Math.E,0.0066*i));
				}
				function newDate(days) {
					return moment("20090103", "YYYYMMDD").add(2 * days, 'd').toDate();
				}
				switch (this.bitcoinPredictionType)
				{
					case 'linear':
						selectedDataset = trendLine;
					break;
					case 'polynomial':
						selectedDataset = trendLinePoly;
					break;

					case 'exponential':
						selectedDataset = trendLineExp;
					break;
					case 'none':
					default:
						selectedDataset = null;
					break;
				}
				this.bitcoinValueChart.data.labels = dates;
                this.bitcoinValueChart.data.datasets = [
                    {
                        label: "Historique",
                        backgroundColor: '#FFECC6',
                        borderColor: 'rgb(230, 159, 0)',
                        fill: true,
                        pointRadius: 0,
                        data: data
                    },
					{
						label: "Tendance",
                        backgroundColor: 'rgb(0, 114, 178)',
                        borderColor: 'rgb(0, 114, 178)',
                        fill: false,
                        pointRadius: 0,
                        data: selectedDataset
					}
                ];

				this.bitcoinValueChart.options.legend.display = true;
                this.bitcoinValueChart.update();
			}
		},
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
                var yLabel = null;
				var labelling = true;

                var coinsPerDay = this.getCoinPerDay();
                var electricityCHFCostPerDay = this.powerConsumption * this.electricityRate * 24 / 1000;
                var dailyCHFProfit = coinsPerDay * this.bitcoinCHFPrice - electricityCHFCostPerDay;
                var dailyBTCProfit = coinsPerDay - electricityCHFCostPerDay / this.bitcoinCHFPrice;
                
                switch (this.currency)
                {
                    case 'bitcoin':
                        yLabel = 'Profit (Bitcoin)';
                        labelling = false;
                    break;

                    case 'chf':
                        yLabel = 'Profit (CHF)';
                        labelling = false;
                    break;
                }
                
                var daysSinceBeginning = moment().diff('2009-01-03', 'days')/2;
                var estimatedDifficulty;
                var estimatedBTCPerDay;
                var estimatedDailyProfit;
                var estimatedDailyBTCProfit;
                var estimatedDailyProfitExp;
                
                for ( var i = 0 ; i <= 365 ; i += 7)
                {
                    dates.push(newDate(i));
					
                    switch(this.difficultyPredictionType)
					{
						case 'polynomial':
							estimatedDifficulty = 0.0032*Math.pow(daysSinceBeginning+i/2,5) - 10.947*Math.pow(daysSinceBeginning+i/2,4) + 13661*Math.pow(daysSinceBeginning+i/2,3) - 7e+6*Math.pow(daysSinceBeginning+i/2,2) + 1e+9*(daysSinceBeginning+i/2) - 6e+10; 
						break;

						case 'exponential':
							estimatedDifficulty = Math.pow(3.2622*Math.E,0.00789*(daysSinceBeginning+i/2));
						break;

						case 'none':
						default:
							estimatedDifficulty = this.difficulty;
						break;
					}
					
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
                        break;

                        case 'chf':
                            switch (this.bitcoinPredictionType)
                            {
                                case 'linear':
                                    data.push(i * estimatedDailyProfitLinear - this.hardwareCost);
                                break;

                                case 'polynomial':
                                    data.push(i * estimatedDailyProfitPoly - this.hardwareCost);
                                break;

                                case 'exponential':
                                    data.push(i * estimatedDailyProfitExp - this.hardwareCost);
                                break;

                                case 'none':
                                default:
                                    data.push(i * estimatedDailyProfit - this.hardwareCost);
                                break;
                            }
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
                        label: "Prix BTC",
                        backgroundColor: '#FFECC6',
                        borderColor: 'rgb(230, 159, 0)',
                        fill: true,
                        pointRadius: 0,
                        data: data
                    }
                ];

				this.chart.options.scales.yAxes[0].scaleLabel.labelString = yLabel;
                this.chart.options.legend.display = labelling;

                this.chart.update();
            }
        },
		updateGraphs: function()
		{
			this.updateGraph();
			this.updateDifficultyGraph();
			this.updateBitcoinGraph();
		},
    }
});