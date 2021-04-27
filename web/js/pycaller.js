

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
            getPositionHistory();
            fetch=1;
        }, 1000);
    }
}

function stopcall(){
    window.location.reload();
}

// Buy/Sell crypto method
function call() {
    console.log("Started Py Caller");
    let fetch = 1;
    while (fetch === 1) {
        fetch = 0;
        setInterval(function(){ 
            console.log("Caller running");
            calculateCall();
            fetch=1;
        }, 20000);
    }
}

function calculateCall(){
    let buyBreakpoint = document.getElementById("doge_buy_breakpoint").value;
    let sellBreakpoint = document.getElementById("doge_sell_breakpoint").value;
    let currentDogePrice = document.getElementById("doge_price").value;

    if (currentDogePrice <= buyBreakpoint) {
        buy(document.getElementById("doge_buysell_quantity").value);
        console.log("But At: ",currentDogePrice, "Breakpoint: ",buyBreakpoint);
    }
    if (currentDogePrice >= sellBreakpoint) {
        sell(document.getElementById("doge_buysell_quantity").value);
        console.log("Sell At: ",currentDogePrice, "Breakpoint: ",sellBreakpoint);
    }else {
        console.log("No Buy/Sell: ",currentDogePrice);
    }
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
    eel.get_holdings_history()(dogePositionHistoryCallBack = (result) => {
        console.log(result);
        new Tabulator('#table', {data:result,
                                            columns:[
                                                {title:"State", field: "state"},
                                                {title:"Side", field: "side"},
                                                {title:"Avg Purchase Price", field: "average_price"},
                                                {title:"Quantiy Purchased", field: "quantity"},
                                                {title:"Total Purchase Price", field: "rounded_executed_notional"},
                                                {title:"Type", field: "type"}
                                            ],
                                            layout:"fitColumns",
                                        })
    });
}

function buy(amt){
    eel.buy(amt);
}

function sell(amt){
    eel.sell(amt);
}

function fetchStats(){
    getDogeMarketPrice();
    getDogeTotalOwned();
    getBuyingPower();
    getPositionHistory();
}