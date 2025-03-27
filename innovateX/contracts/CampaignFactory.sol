// Solidity Smart Contract (Crowdfunding.sol)
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract Crowdfunding {
    struct Campaign {
        address payable owner;
        string title;
        string description;
        uint goal;
        uint raisedAmount;
        bool completed;
    }

    Campaign[] public campaigns;
    mapping(uint => mapping(address => uint)) public donations;

    event CampaignCreated(uint campaignId, string title, uint goal);
    event FundDonated(uint campaignId, address donor, uint amount);
    event FundsWithdrawn(uint campaignId);

    function createCampaign(
        string memory _title,
        string memory _description,
        uint _goal
    ) public {
        campaigns.push(
            Campaign({
                owner: payable(msg.sender),
                title: _title,
                description: _description,
                goal: _goal,
                raisedAmount: 0,
                completed: false
            })
        );
        emit CampaignCreated(campaigns.length - 1, _title, _goal);
    }

    function getCampaigns() public view returns (uint) {
        return campaigns.length;
    }

    function donateToCampaign(uint _campaignId) public payable {
        Campaign storage campaign = campaigns[_campaignId];
        require(!campaign.completed, "Campaign is completed");
        require(msg.value > 0, "Donation must be greater than zero");

        campaign.raisedAmount += msg.value;
        donations[_campaignId][msg.sender] += msg.value;

        emit FundDonated(_campaignId, msg.sender, msg.value);
    }

    function withdrawFunds(uint _campaignId) public {
        Campaign storage campaign = campaigns[_campaignId];
        require(msg.sender == campaign.owner, "Only owner can withdraw funds");
        require(
            campaign.raisedAmount >= campaign.goal,
            "Funding goal not reached"
        );
        require(!campaign.completed, "Funds already withdrawn");

        campaign.completed = true;
        campaign.owner.transfer(campaign.raisedAmount);

        emit FundsWithdrawn(_campaignId);
    }
}
