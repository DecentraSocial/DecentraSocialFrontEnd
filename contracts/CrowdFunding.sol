// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.0;

contract CrowdFunding {

    struct Compaign{
        address owner;
        string title;
        string decription;
        uint256 target;
        uint256 deadline;
        uint256 amountCollected;
        address[] donators;
        uint256[] donations;
    }

    mapping(uint256 => Compaign) public compaigns;
    uint256 public numberOfCampaigns=0;


    function createCampaign(address _owner, string memory _title, string memory _description, uint256 _target, uint256 _deadline) public returns (uint256) {
        Compaign storage compaign=compaigns[numberOfCampaigns];

        require(compaign.deadline<block.timestamp,"the deadline should be the date on the future");

        compaign.owner=_owner;
        compaign.title=_title;
        compaign.decription=_description;
        compaign.target=_target;
        compaign.deadline=_deadline;
        compaign.amountCollected=0;

        numberOfCampaigns++;

        return numberOfCampaigns-1;
    }

    function donateToCompaign(uint256 _id) public payable{
        uint256 amount=msg.value;

        Compaign storage compaign=compaigns[_id];
        compaign.amountCollected+=amount;
        compaign.donators.push(msg.sender);
        compaign.donations.push(amount);

        if(compaign.amountCollected>=compaign.target){
            payable(compaign.owner).transfer(compaign.amountCollected);
        }
    }

    function getDonaters(uint256 _id) public view returns(address[] memory,uint256[] memory){
        Compaign storage compaign=compaigns[_id];
        return (compaign.donators,compaign.donations);
    }

    function getCompaigns() public view returns(Compaign[] memory){
        Compaign[] memory allCompaigns=new Compaign[](numberOfCampaigns);
        for(uint256 i=0;i<numberOfCampaigns;i++){
            allCompaigns[i]=compaigns[i];
        }
        return allCompaigns;
    }
}
