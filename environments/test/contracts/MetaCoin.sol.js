// Factory "morphs" into a Pudding class.
// The reasoning is that calling load in each context
// is cumbersome.

(function() {

  var contract_data = {
    abi: [{"constant":false,"inputs":[{"name":"addr","type":"address"}],"name":"getBalanceInEth","outputs":[{"name":"","type":"uint256"}],"type":"function"},{"constant":true,"inputs":[],"name":"owner","outputs":[{"name":"","type":"address"}],"type":"function"},{"constant":false,"inputs":[{"name":"receiver","type":"address"},{"name":"amount","type":"uint256"}],"name":"sendCoin","outputs":[{"name":"sufficient","type":"bool"}],"type":"function"},{"constant":false,"inputs":[{"name":"addr","type":"address"}],"name":"getBalance","outputs":[{"name":"","type":"uint256"}],"type":"function"},{"inputs":[],"type":"constructor"}],
    binary: "606060405260008054600160a060020a031916329081178255600160a060020a03168152600160205260409020612710905561017c8061003f6000396000f3606060405260e060020a60003504637bd703e8811461003c5780638da5cb5b1461006757806390b98a1114610079578063f8b2cb4f146100a8575b005b6100ce600435600073fb8baa2d29fd91366b0fc62d0010b5e668ea788a6396e4ee3d610137846100af565b6100e0600054600160a060020a031681565b6100ce60043560243533600160a060020a0316600090815260016020526040812054829010156100fd57610131565b6100ce6004355b600160a060020a0381166000908152600160205260409020545b919050565b60408051918252519081900360200190f35b60408051600160a060020a03929092168252519081900360200190f35b5033600160a060020a0390811660009081526001602081905260408083208054869003905592851682529190208054830190555b92915050565b60026040518360e060020a02815260040180838152602001828152602001925050506020604051808303818660325a03f4156100025750506040515191506100c9905056",
    unlinked_binary: "606060405260008054600160a060020a031916329081178255600160a060020a03168152600160205260409020612710905561017c8061003f6000396000f3606060405260e060020a60003504637bd703e8811461003c5780638da5cb5b1461006757806390b98a1114610079578063f8b2cb4f146100a8575b005b6100ce600435600073__ConvertLib____________________________6396e4ee3d610137846100af565b6100e0600054600160a060020a031681565b6100ce60043560243533600160a060020a0316600090815260016020526040812054829010156100fd57610131565b6100ce6004355b600160a060020a0381166000908152600160205260409020545b919050565b60408051918252519081900360200190f35b60408051600160a060020a03929092168252519081900360200190f35b5033600160a060020a0390811660009081526001602081905260408083208054869003905592851682529190208054830190555b92915050565b60026040518360e060020a02815260040180838152602001828152602001925050506020604051808303818660325a03f4156100025750506040515191506100c9905056",
    address: "0x5d39e8177af589f5cdf74cd227550dc4eb44b3d1",
    generated_with: "2.0.9",
    contract_name: "MetaCoin"
  };

  function Contract() {
    if (Contract.Pudding == null) {
      throw new Error("MetaCoin error: Please call load() first before creating new instance of this contract.");
    }

    Contract.Pudding.apply(this, arguments);
  };

  Contract.load = function(Pudding) {
    Contract.Pudding = Pudding;

    Pudding.whisk(contract_data, Contract);

    // Return itself for backwards compatibility.
    return Contract;
  }

  Contract.new = function() {
    if (Contract.Pudding == null) {
      throw new Error("MetaCoin error: Please call load() first before calling new().");
    }

    return Contract.Pudding.new.apply(Contract, arguments);
  };

  Contract.at = function() {
    if (Contract.Pudding == null) {
      throw new Error("MetaCoin error: Please call load() first before calling at().");
    }

    return Contract.Pudding.at.apply(Contract, arguments);
  };

  Contract.deployed = function() {
    if (Contract.Pudding == null) {
      throw new Error("MetaCoin error: Please call load() first before calling deployed().");
    }

    return Contract.Pudding.deployed.apply(Contract, arguments);
  };

  if (typeof module != "undefined" && typeof module.exports != "undefined") {
    module.exports = Contract;
  } else {
    // There will only be one version of Pudding in the browser,
    // and we can use that.
    window.MetaCoin = Contract;
  }

})();
