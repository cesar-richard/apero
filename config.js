var host = "HOST";
var port = "";

module.exports = {
    debug: true,
    host: host,
    port: port,
    listenPort : 80,
    facebook : {
        "api_key"      : "KEY",
        "api_secret"   : "SECRET",
        "callback_url" : "http://"+host+(port!=""?port:"")+port+"/auth/facebook/callback"
    },

    database : {
            host     : 'XXX',
            username : 'XXX',
            password : 'XXX',
            database : 'XXX'
    },

    init: function(){
        Array.prototype.findObjectByProp = function _findObjectByProp (prop, value) {
            for(var i = 0; i<this.length; i++){
                    if (this[i][prop] == value){
                            return this[i];
                    }
            }
            return null;
        };

        Array.prototype.extend = function _extendArray(array){
            if(typeof array == "undefined") throw new Error("Argument 1 (and only) must be an array");
            this.push.apply(this, array);
        };
    },
}

