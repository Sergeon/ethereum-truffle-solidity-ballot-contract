function clearBytes32(str){
    return str.replace(/\u0000/g, '');
}

function bytes32ToString( bytes32 ){

    return clearBytes32(web3.toAscii(bytes32) );
}

function toInteger( bigNumber){
    return parseInt(bigNumber.toString() );
}
