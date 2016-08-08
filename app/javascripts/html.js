

var generateVotersTable = function(data , element ){

    element.html("");
        //voterAddress , voter.weight , voter.voted , voter.delegate , voter.vote
    _.each(data , function(voter){

        theVoter = new Voter(voter);

        var voterFactory = new VoterStatementFactory(theVoter);
        var voterStatement = voterFactory.get();
        element.prepend( voterStatement.print() );

    });

}


VoterStringGenerator = function( voter ){

    if(this == window)
        throw new Error("this method needs a new() keyword when invoked");

    this.voter = voter;

    this.initialize();


}

VoterStringGenerator.prototype.initialize = function(){


        //estas condiciones deberian ir a las sub-clases ?
        this.voterClass = "default";

        if(this.voter.voted)
            this.voterClass = "voted";

        if(this.voter.delegated)
            this.voterClass = "delegated";

        //esto es de todas las clases.
        this.voterStringOpener = "<span href='#' class='collection-item " + this.voterClass + " ' data-address='" + this.voter.address +"'><span class='cool badge left weight' >" + this.voter.weight  +  "</span>";
        this.voterStringOpener += "<span>"+ this.voter.address + "</span>";

        //childs.
        this.delegateIconString = "";

        //childs: si no ha votado ni delegado se muestran todos, con la opción de votar. Si se ha votado,
        //se muestra el voto en rojo, con la opción de votar deshabilitado.
        //Si se ha delegado, se muestra el badge 'delegated' en amarillo.
        this.proposalsString = "";

        this.voterStringCloser = "</span>";
}

VoterStringGenerator.prototype.print = function(){

    return this.voterStringOpener + this.delegateIconString + this.proposalsString + this.voterStringCloser;
}


FreshVoterStringGenerator = function(voter){

    if(this == window)
        throw new Error("this method needs a new() keyword when invoked");

    this.voter = voter;
    this.initialize(); //get rid of this? Lo ideal sería ejecutar esto solo en el constructor del padre y no tener
    //que copiarlo en cada hijo.

    this.delegateIconString = "<i class='material-icons delegate'>settings_remote</i>";

    var that = this;
    _.each(ballotGlobals.ballotProposals , function(proposal  ){
        that.proposalsString += "<span class='badge cool proposal' data-proposal='" + proposal.index + "' data-address='" + that.voter.address + "'  > " + proposal.name + "</span>"; //TODO devería devolver el index del proposal desde el contrato para evitar
        //iterar por cada
    });

}



DelegatedVoterStringGenerator = function(voter){

    if(this == window)
        throw new Error("this method needs a new() keyword when invoked");

    this.voter = voter;
    this.initialize(); //get rid of this? Lo ideal sería ejecutar esto solo en el constructor del padre y no tener
    //que copiarlo en cada hijo.

    this.delegateIconString = "";


    this.proposalsString += "<span class='badge cool delegated'> " + "delegated" + "</span>"; //TODO add tooltip with the delegatee address


}

AlreadyVotedVoterStringGenerator = function(voter){

    if(this == window)
        throw new Error("this method needs a new() keyword when invoked");

    this.voter = voter;
    this.initialize();

    console.log(ballotGlobals.ballotProposals);
    this.proposalsString += "<span class='badge cool voted'>" + ballotGlobals.ballotProposals[voter.vote].name + "</span>"
}


FreshVoterStringGenerator.prototype             = Object.create(VoterStringGenerator.prototype);
DelegatedVoterStringGenerator.prototype         = Object.create(VoterStringGenerator.prototype);
AlreadyVotedVoterStringGenerator.prototype      = Object.create(VoterStringGenerator.prototype);

var VoterStatementFactory = function(voter){
    this.voter = voter;
}

VoterStatementFactory.prototype.get = function(){


    //work on progress
    var generic = new VoterStringGenerator(this.voter);
    var finalVoter = null;


    if(generic.voter.delegated)
        finalVoter = new DelegatedVoterStringGenerator(this.voter);
    else if (this.voter.voted)
        finalVoter = new AlreadyVotedVoterStringGenerator(this.voter);
    else
        finalVoter = new FreshVoterStringGenerator(this.voter);

    return finalVoter;
}


var printVotersData = function(data){
    //address, uint , bool ,address , uint

    log("Printing voters data: ");
    _.each(data , function(res){

        log("---");
        log("voter:")
        log("---");
        log("address: " +  res[0]);
        log("weight: " + toInteger(res[1]));
        log("voted: " + res[2]);
        log("delegated to: " + res[3]);
        log("Vote: " + toInteger(res[4]));
    });

}
