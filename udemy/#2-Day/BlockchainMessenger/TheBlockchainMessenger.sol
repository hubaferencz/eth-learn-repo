//SPDX-License-Identifier: MIT

pragma solidity 0.8.15;

contract TheBlockchainMessenger {
    uint256 public messageCounter;

    address public owner;

    string public myMessage;

    constructor() {
        owner = msg.sender;
    }

    function sendMessage(string memory _myMessage) public {
        if (msg.sender == owner) {
            myMessage = _myMessage;
            messageCounter++;
        }
    }
}
