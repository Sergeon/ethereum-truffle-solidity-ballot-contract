var expect      = require('chai').expect;

var log = console.log;

function clearBytes32(str){
    return str.replace(/\u0000/g, '');
}

function toInteger( bigNumber){
    return parseInt(bigNumber.toString() );
}


contract("Ballot" , function(accounts){
    var ballot = null;

    describe("new()" , function(){

        var chairperson = null;
        var proposalsCount = null;
        var firstProposal = null;

        before(function(done){

            Ballot.new(["hard fork" , "soft fork" , "do nothing"])
            .catch(log)
            .then(function(contract){
                ballot = contract;
            })
            .catch(log)
            .then( function(){
                return ballot.chairperson();
            })
            .catch(log)
            .then(function(response){
                chairperson = response;
                return ballot.getProposal(0);
            })
            .catch(log})
            .then(function(response){
                firstProposal = response;
                return ballot.proposalsCount();
            })
            .catch(log)
            .then(function(response){
                proposalsCount = response;
            })
            .then(done);

        });


        it("ballot should be set" , function(){
            expect(ballot).to.not.be.null;
        } );

        it("ballot chairperson should be coinbase" , function(){
            expect(chairperson).to.be.equal(accounts[0]);
        });

        it("ballot first proposal should be set" , function(){
            var ascii = web3.toAscii(firstProposal[0]);
            expect(clearBytes32(ascii)).to.be.equal("hard fork");
        });

        it("ballot proposals count should be 3" , function(){
            expect( toInteger(proposalsCount) ).to.be.equal(3);
        });


        describe("vote()" , function(){
            //ballot is available here.
        });

    });
