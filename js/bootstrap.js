/**
 * JS bootstrap
 */
$('document').ready(function()
{
    $.when(
        // Get Bitcoin price
        $.get('https://min-api.cryptocompare.com/data/price?fsym=BTC&tsyms=CHF', function(response)
        {
            vueApp.bitcoinCHFPrice = response.CHF;
        }),

        // Get Mining equipment
        // $.get({
        //     url: 'https://www.cryptocompare.com/api/data/miningequipment/',
        //     success: function(response)
        //     {
        //         vueApp.coinData = response.coinData;
        //         vueApp.MiningData = response.MiningData;
        //     }
        // })
        
    ).then(function()
    {
        // Draw graph
        vueApp.initGraphs();
        vueApp.updateGraphs();

        // Hide loader
        $('.ui.dimmer').removeClass('active'); 
          
        // Initialize Semantic UI components
        $('.ui.checkbox').checkbox();
        $('.ui.dropdown').dropdown({
            onChange: function(value, text, $choice)
            {
                model = $(this).data('model');
                
                vueApp[model] = value;
            }
        });
    });
});