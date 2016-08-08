
/**
 *Gets all data from dynamic array throught recursive calls.
 * This is pretty tricky due to all the whole Promises mess.
 * TODO refactor to a module that gets generic dinamic arrays
 *without repeating code.
 *TODO get rid of thenable passed by parameter?
 *
 * @return Array
 */
var BallotVotersReader = function( ballotThenable ){





    var getVotersData = function(){

        var votersData = [];

        var _getNextVoterData = function(i , count ){

            if(i == (count) ){
                return ballotThenable.then(function(){
                    return ballotGlobals.ballot.getVoter(i)
                })
                .then(function(data){
                    votersData.push(data)
                });
            }

            return ballotGlobals.ballot.getVoter(i)
            .then(function(data){
                votersData.push(data);

                return _getNextVoterData(i + 1 , count );
            } );
        }



        return ballotThenable.then(function(){
            return ballotGlobals.ballot.votersCount();
        })
        .then(function(c){
            return _getNextVoterData( 0 , c - 1 );
        })
        .then(function(){
            return votersData;
        });


    }//get voters data


    var getProposalsData = function(){

        var proposalsData = [];
        
        var _getNextProposal = function( i , count ){

            if(i == (count) ){
                return ballotThenable.then(function(){
                    return ballotGlobals.ballot.getProposal(i)
                })
                .then(function(data){
                    proposalsData.push({ 'name' : bytes32ToString(data[0]) , 'votes' : toInteger(data[1]) , 'index' : i });
                });
            }
            else{
                return ballotGlobals.ballot.getProposal(i)
                .then(function(data){
                    proposalsData.push({ 'name' : bytes32ToString(data[0]) , 'votes' : toInteger(data[1]) , 'index' : i });

                    return _getNextProposal(i + 1 , count );
                } );
            }
        }

        return ballotThenable.then(function(){
            return ballotGlobals.ballot.proposalsCount();
        })
        .catch(log)
        .then(function(c){
            return _getNextProposal(0 , c - 1 );
        })
        .catch(log)
        .then(function(){
            return proposalsData;
        } );
    }//getProposalsData

    return{
        getVotersData : getVotersData,
        getProposalsData : getProposalsData
    }

}
