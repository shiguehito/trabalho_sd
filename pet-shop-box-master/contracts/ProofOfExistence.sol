pragma solidity ^0.4.17;

contract ProofOfExistence {    
    address[16] public owner;
    bytes32[16] public hash_text;
    int id = -1;

    // Adopting a pet
    function registerDoc(string hash_t) public returns (uint) {
        uint docId = nextId();
        require(docId >= 0 && docId <= 15);

        owner[docId] = msg.sender;
        hash_text[docId] = keccak256(hash_t);
        
        return docId;
    }

    function nextId() private returns (uint) {
        id = id + 1;
        return uint(id);
    }

    function getId() public view returns (int) {
        return id;
    }
    // Retrieving the docs
    /*
    function getDocs() public view returns (string[16]) {
        return hash_text;
    }*/

    function compare(uint docId, string texto) public returns (bool) {
        return hash_text[docId] == keccak256(texto);
    }
}