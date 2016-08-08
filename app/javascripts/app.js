


//TODO export to common objects.
//
//the ballot contract Pudding object
var ballot          = null;
/*
*a Thenable reference to the ballot contract. Working from this instead than
*make calls directly to the ballot contract prevent race conditions and promises/
*callbacks hell and ensure that all the ballot operations are processed secuentially.
 */
var ballotThenable  = null;

/**
 * A module to read dynamic arrays of structs from the ballot contract.
 */
var ballotReader    = null;
/*
The proposals of the ballot.
 */
var ballotProposals = [];

function Voter( data ){

    this.address        = data[0];
    this.weight         = toInteger(data[1]);
    this.voted          = data[2];
    this.delegatee      = data[3];
    this.vote           = toInteger(data[4]);

    this.delegated      = toInteger(this.delegatee  ) == 0 ? false : true ;

}

/**
 * Initialize the accounts and the proposals
 * @param  string account the main address of the node
 * @return null
 */
var init = function(account){
/*

    $(".demo").css('background-color' , 'red');

    $("body").append("<div class='demo' style='width : 100px; height : 100px; background-color : black;'> </div>")

    $(".demo").css('background-color' , 'red');*/

    ballotGlobals.ballot = Ballot.deployed({from : account});


    ballotGlobals.ballotThenable = ballotGlobals.ballot.initiated()
    .catch(log)
    .then(function(i){

        if (!i){
            return initializeBallot(ballotGlobals.ballot);
        }
        return null;

    });


    ballotGlobals.ballotReader = BallotVotersReader(ballotGlobals.ballotThenable);

    /**
     *Actualize the reference to the ballotThenable on every call to it
     *is key. Unless it just provokes infinite recursive calls.
     *HEMOS VENIDO A JUGAR
     */
    ballotGlobals.ballotThenable = renderVoters(ballotGlobals.ballotReader);


    ballotGlobals.ballotThenable = initializeRenderProposals();

    registerListeners();

}




window.onload = function(){

    web3.eth.getAccounts(function(err, accs) {
        if (err != null) {
          alert("There was an error fetching your accounts.");
          return;
        }

        if (accs.length == 0) {
          alert("Couldn't get any accounts! Make sure your Ethereum client is configured correctly.");
          return;
        }

        accounts = accs;
        account = accounts[0];

        window.accounts = accounts;

        init(account);
    });
}
