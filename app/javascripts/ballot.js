

var initializeBallot = function(ballot){

    return ballot.initialize(["soft fork" , "hard fork" , "do nothing"] , {from : account})

    .then(function(){
        return ballot.giveRightToVote( accounts[1] , { from : account} );
    })
    .catch(log)
    .then(function(){
        return ballot.giveRightToVote( accounts[2] , { from : account} )
    })

    .catch(log)
    .then(function(){
        return ballot.giveRightToVote( accounts[3] , { from : account} )
    })
    .catch(log)
    .then(function(){
        return ballot.giveRightToVote( accounts[4] , { from : account} )
    })
    .catch(log)
    .then(function(){
        return ballot.giveRightToVote( accounts[5] , { from : account} )
    })
    .then(function(){
        return ballot.delegate(accounts[2] , {from : accounts[1]});//TODO esto se tiene que ir cuando terminen las pruebas.
    })
    .catch(log)
    .then(function(){
        return ballot.giveRightToVote( accounts[6] , { from : account} )
    });


}


var renderVoters = function(  ){

    $("#voters-data-collection").html('');

    return ballotGlobals.ballotReader.getProposalsData()
    .catch(log)
    .then(function(proposals){
        ballotGlobals.ballotProposals = proposals; //this should be done on init(). If it should be done at all.
    })
    .then(
        ballotGlobals.ballotReader.getVotersData
    )
    .catch(log)
    .then(function(data){
        generateVotersTable(data , $("#voters-data-collection"));
    });

}



var initializeRenderProposals = function(reader){

    return ballotGlobals.ballotThenable.then(function(){
        return ballotGlobals.ballotReader.getProposalsData();
    })
    .catch(log)
    .then(function( res ){

        var i = 0;
        _.each(res , function(proposal){

            var root = $('.proposals-wrapper');
            root.append("<div class='proposal-data' data-index='" + i + "'></div>");
            root.find("div.proposal-data[data-index='" + i + "']").append("<span>" + proposal.name + ": </span>").append("<span class='proposal-votes'>" + proposal.votes + "</span>");
            log(proposal);
            i++;
        })
    })
}



var renderProposalsData = function(){

    ballotGlobals.ballotThenable.then(function(){
        return ballotGlobals.ballotReader.getProposalsData();
    })
    .catch(log)
    .then(function( res ){

        var i = 0;
        _.each(res , function(proposal){

            var root = $('.proposals-wrapper');
            root.find("div.proposal-data[data-index='" + i + "'] span.proposal-votes" ).html(proposal.votes);
            log(proposal);
            i++;
        })
    })
}

var sendVote = function( voterAddress , proposalIndex ){

    console.log("vamos a mirar voter address y proposal index en sendVote() ");

    log("voter address");
    log("type: " + typeof(voterAddress));
    log("value: " + voterAddress);
    log("/");
    log("proposalIndex");
    log("type: " + typeof(proposalIndex) );
    log("value: " + proposalIndex);

    console.log("Ahora vamos a ver si son iguales: ");
    console.log(account == voterAddress);

    console.log("account era " + account );

    var aux = ballotGlobals.ballotThenable.then(function(){

        ballotGlobals.ballot.vote( proposalIndex , {  from : voterAddress }  );
        return null;

    })
    .catch(log)

    .then(renderVoters)
    .catch(log)

    .then(function(){
        renderProposalsData();
        return null;
    });

    ballotGlobals.ballotThenable = aux;
}



var registerListeners = function(){

    $("body").on("click" , "span.proposal" , function(){

        console.log($(this));
        var address     = $(this).attr('data-address');
        var proposal    = $(this).attr('data-proposal');



        sendVote(address, proposal );

    });
}
