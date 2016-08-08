var expect      = require('chai').expect;


var ballot = null;

var log = console.log;

function clearBytes32(str){
    return str.replace(/\u0000/g, '');
}

function toInteger( bigNumber){
    return parseInt(bigNumber.toString() );
}


contract("Ballot" , function(accounts){


    describe("new()" , function(){

        globalAccounts = accounts;


        var chairperson = null;
        var proposalsCount = null;
        var firstProposal = null;

        before(function(done){


            Ballot.new()
            .catch(function(e){
                console.log("error tras new() ");
                console.log(e);
            })
            .then(function(contract){
                ballot = contract;
                return ballot;
            })
            .catch(log)
            .then(function(){
                return ballot.initialize(["hard fork" , "soft fork" , "do nothing"]);
            })
            .catch(log)
            .then( function(){
                return ballot.chairperson();
            })
            .catch(log)
            .then(function(res){
                chairperson = res;
                return ballot.getProposal(0);
            })
            .catch(log)
            .then(function(res){
                firstProposal = res;
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
            expect( parseInt(proposalsCount.toString()) ).to.be.equal(3);
        })

    });



    describe("vote()" , function(){

        var first = null;

        before(function(done){

                ballot.giveRightToVote(accounts[1])
                .then(function(){
                    ballot.giveRightToVote(accounts[2])
                })
                .catch(log)
                .then(function(){
                    ballot.giveRightToVote(accounts[3])
                })
                .then(function(){
                    ballot.giveRightToVote(accounts[4])
                })
                .then(function(){
                    ballot.giveRightToVote(accounts[5])
                })
                .then(function(){
                    ballot.giveRightToVote(accounts[6])
                })
                .then(function(){
                    ballot.vote(0);
                    return ballot.getProposal(0);
                })
                .then(function(prop){
                    first = prop;
                })
                .catch(log)
                .then(done);

        });

        it("First proposal should have one vote" , function(){
            expect( toInteger(first[1]) ).to.be.equal(1)    ;
        });

    });


    describe("delegate()" , function(){

        var second = null;
        var thirdAccountWeight = -1;

        before(function(done){

                ballot.delegate(accounts[2] , {from : accounts[1]})
                .then(function(){
                    ballot.vote(1 , {from : accounts[2]});
                })
                .then(function(){
                    return ballot.getProposal(1);
                })
                .then(function(prop){
                    second = prop;
                    return ballot.getVoter(2);
                })
                .catch(log)
                .then(function(voter){
                    thirdAccountWeight = toInteger(voter[1]);
                })
                .then(done);

        });

        it("Second proposal now should have two votes" , function(){
            expect( toInteger(second[1]) ).to.be.equal(2)    ;
        });

        it("Third account should have 2 weight" , function(){
            expect(thirdAccountWeight).to.be.equal(2);
        });

    });

    describe("winningProposal() " , function(){

        it("soft fork would be the winning proposal" , function(){

            ballot.winningProposal()
            .catch(log)
            .then(function(w){
                expect(parseInt(w.toString() ) ).to.be.equal(1);
            })

        });

    });


    describe("retrieve voters data" , function(){

        var count = -1;

        var coinbaseVote = null;
        var coinbaseDelegatee = null;
        var coinbaseWeight = null;

        var secondVote = null;
        var secondDelegatee = null;
        var secondWeight = null;

        var thirdVote = null;
        var thirdDelegatee = null;
        var thirdWeight = null;

        before(function(done){

            ballot.votersCount()
            .catch(log)
            .then(function(c){
                count = parseInt(c.toString() );
            })
            .catch(log)
            .then(function(){
                //retrieving coinbase vote data
                return ballot.getVoter(0);
            })
            .catch(log)
            .then(function(v){
                //address, uint , bool ,address , uint
                //voterAddress , voter.weight , voter.voted , voter.delegate , voter.vote

                coinbaseWeight = parseInt(v[1].toString() );
                coinbaseVote = parseInt(v[4].toString());
                coinbaseDelegatee = parseInt(v[3].toString() );


                return ballot.getVoter(1);
            })
            .catch(log)
            .then(function(second){
                secondWeight = toInteger(second[1]);
                secondDelegatee = second[3];
                return ballot.getVoter(2);

            })
            .catch(log)
            .then(function(third){
                thirdWeight = toInteger(third[1]);
                thirdVote = toInteger(third[4]);

            })
            .catch(log)
            .then(done);

        });

        it("Number of voters should be 7" , function(){
            expect(count).to.be.equal(7);
        });

        it("coinbaseWeight should be 1" , function(){
            expect(coinbaseWeight).to.be.equal(1);
        });

        it("coinbase vote should be first proposal" , function(){
            expect(coinbaseVote).to.be.equal(0);
        });

        it("coinbase delegatee should be burn address " , function(){
            expect(coinbaseDelegatee).to.be.equal(0);
        });

        it("Second voter weight should be 1" , function(){
            expect(secondWeight).to.be.equal(1);
        });

        it("Second should've been delegate to the third account" , function(){
            expect(secondDelegatee).to.be.equal(accounts[2]);
        });

        it("third voter weigth should be 2" , function(){
            expect(thirdWeight).to.be.equal(2);
        });

        it("third voter vote should be 1 " , function(){
            expect(thirdVote).to.be.equal(1);
        })
    });


    describe("dynamic arrays of structs could be get by recursion" , function(){

        var votersData = [];
        var getNextVoterData = function(i , count ){

            if(i == (count) ){
                return ballot.getVoter(i)
                .catch(log)
                .then(function(data){
                    votersData.push(data)
                });
            }

            return ballot.getVoter(i)
            .catch(log)
            .then(function(data){
                votersData.push(data);

                return getNextVoterData(i + 1 , count );
            } );
        }

        before(function(done){

            ballot.votersCount()
            .catch(log)
            .then(function(c){
                return getNextVoterData( 0 , c - 1 )
            })
            .catch(log)
            .then(function(){
                done();
            });

        });



        it("VotersData should be filled" , function(){
            expect(votersData.length ).to.be.equal(7);
        });


    })

});
