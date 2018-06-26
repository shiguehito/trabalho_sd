pragma solidity ^0.4.17;

import "truffle/Assert.sol";
import "truffle/DeployedAddresses.sol";
import "../contracts/ProofOfExistence.sol";

contract TestProofOfExistence {
    ProofOfExistence poe = ProofOfExistence(DeployedAddresses.ProofOfExistence());
    // Testing the adopt() function
    function testRegisterDoc() public {
        uint returnedId = poe.registerDoc(8, "asdasd");

        uint expected = 8;

        Assert.equal(returnedId, expected, "ID 8 should be recorded.");
    }

    // Testing retrieval of a single pet's owner
    function testGetOwnerAddressByDocId() public {
        // Expected owner is this contract
        address expected = this;

        address owner = poe.owner(8);

        Assert.equal(owner, expected, "Owner of ID 8 should be recorded.");
    }
    // Testing retrieval of all pet owners
    function testGetOwnerAddressByDocIdInArray() public {
        // Expected owner is this contract
        address expected = this;

        // Store adopters in memory rather than contract's storage
        address[16] owners;
        bytes32[16] hashs;
        (owners, hashs) = poe.getDocs();

        Assert.equal(owners[8], expected, "Owner of ID 8 should be recorded.");
    }
}
