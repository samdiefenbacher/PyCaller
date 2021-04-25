
const totalHistory = [];
const positionHistory = {};

function getDogeMarketPrice(){
    let fetch = 1;
    while (fetch === 1) {
        fetch = 0;
        setInterval(function(){ 
            eel.get_doge_price()(dogePriceCallBack = (result) => {
                let font_color = document.getElementById("doge_price");
                if (result > document.getElementById("doge_price").value){
                    font_color.style.color = "green";
                } else {
                    font_color.style.color = "red";
                }
                document.getElementById("doge_price").value = result;
            });
            fetch=1;
        }, 1000);
    }
}

function getDogeTotalOwned(){
    let fetch = 1;
    while (fetch === 1) {
        fetch = 0;
        setInterval(function(){ 
            eel.get_doge_total()(dogeTotalCallBack = (result) => {
                document.getElementById("doge_number_owned").value = String(result[0].quantity);
                document.getElementById("doge_value_owned").value = result[0].quantity * document.getElementById("doge_price").value;
            });
            fetch=1;
        }, 1000);
    }
}

// Buy/Sell crypto method
function call() {
    let fetch = 1;
    while (fetch === 1) {
        fetch = 0;
        setInterval(function(){ 
            console.log("Caller running");
            calculateCall();
            fetch=1;
        }, 1000);
    }
}

function calculateCall(){
    let buyBreakpoint = document.getElementById("doge_buy_breakpoint");
    let sellBreakpoint = document.getElementById("doge_sell_breakpoint");
    let currentDogePrice = document.getElementById("doge_price").value;


}

function getBuyingPower(){
    let fetch = 1;
    while (fetch === 1) {
        fetch = 0;
        setInterval(function(){ 
            eel.get_doge_buying_power()(dogeBuyPowerCallBack = (result) => {
                document.getElementById("rbh_buying_power").value = result;
            });
            fetch=1;
        }, 1000);
    }
}

function getPositionHistory(){
    eel.get_position_history()(dogePositionHistoryCallBack = (result) => {
        let lastPurchaseTotalPrice = result[0].cost_bases[0].direct_cost_basis;
        let lastPurchaseAmount = result[0].cost_bases[0].direct_quantity;

        positionHistory.index = totalHistory.length
        positionHistory.lastPurchaseCoinPrice = lastPurchaseTotalPrice / lastPurchaseAmount;
        positionHistory.lastPurchaseAmount = lastPurchaseAmount;
        positionHistory.lastPurchaseTotalPrice = lastPurchaseTotalPrice;
        totalHistory.push({index:positionHistory.index,
                           lastPurchaseCoinPrice:positionHistory.lastPurchaseCoinPrice,
                           lastPurchaseAmount:positionHistory.lastPurchaseAmount,
                           lastPurchaseTotalPrice:positionHistory.lastPurchaseTotalPrice
        });
        var table = new Tabulator('#table', {data:totalHistory,
                                            columns:[
                                                {title:"totalHistoryIndex #", field: "index"},
                                                {title:"Last Coin Purchase Price", field: "lastPurchaseCoinPrice"},
                                                {title:"Last Coin Purchase Quantity", field: "lastPurchaseAmount"},
                                                {title:"Last Coin Purchase Total Price", field: "lastPurchaseTotalPrice"}
                                            ],
                                            layout:"fitColumns",
                                        })
    });
}

eel.expose(buy);
function buy(){
    return 1;
}

eel.expose(sell);
function sell(){
    return 1;
}

function fetchStats(){
    getDogeMarketPrice();
    getDogeTotalOwned();
    getBuyingPower();

    if (totalHistory[0] == null){
        getPositionHistory();
    }

}