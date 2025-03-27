const express = require('express');
const cors = require('cors');
const {Web3} = require('web3');
const path = require('path');
const fs = require('fs');

// function to serialize BigInt
BigInt.prototype.toJSON = function(){
    return this.toString();
}

// Detailed logging function
function logError(message, error) {
    console.error(`[ERROR] ${message}`);
    console.error(error instanceof Error ? error.message : error);
}

// Blockchain connection details
const BLOCKCHAIN_URL = 'http://127.0.0.1:7545';
const CONTRACT_ADDRESS = '0x0fC5025C764cE34df352757e82f7B5c4Df39A836';

// Safely load contractABI
let contractABI;
try {
    const abiPath = path.join(__dirname, 'contractABI.json');
    if (fs.existsSync(abiPath)) {
        contractABI = JSON.parse(fs.readFileSync(abiPath, 'utf8'));
        console.log('ABI loaded successfully');
    } else {
        logError('contractABI.json file not found', new Error('File missing'));
        contractABI = []; 
    }
} catch (error) {
    logError('Error loading contractABI', error);
    contractABI = []; 
}

const app = express();

// Enable CORS and JSON parsing
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended: false}));


// Safely create Web3 instance
let web3;
let crowdfundingContract;

function initializeBlockchainConnection() {
    try {
        web3 = new Web3(new Web3.providers.HttpProvider(BLOCKCHAIN_URL));
        
        // Validate network connection
        web3.eth.net.getId()
            .then(networkId => {
                console.log(`Connected to network ID: ${networkId}`);
                
                // Create contract instance
                if (contractABI.length > 0) {
                    crowdfundingContract = new web3.eth.Contract(contractABI, CONTRACT_ADDRESS);
                    console.log('Contract instance created successfully');
                } else {
                    console.error('Cannot create contract instance: ABI is empty');
                }
            })
            .catch(error => {
                logError('Network connection failed', error);
                web3 = null;
                crowdfundingContract = null;
            });
    } catch (error) {
        logError('Error initializing Web3', error);
        web3 = null;
        crowdfundingContract = null;
    }
}

// Initialize blockchain connection
initializeBlockchainConnection();

// Middleware to check contract and web3 initialization
const checkContractInitialized = (req, res, next) => {
    if (!web3) {
        return res.status(500).json({ 
            success: false, 
            error: 'Web3 not initialized',
            details: `Attempted to connect to: ${BLOCKCHAIN_URL}`,
            action: 'Ensure Ganache is running and contract is deployed'
        });
    }
    
    if (!crowdfundingContract) {
        return res.status(500).json({ 
            success: false, 
            error: 'Contract not initialized',
            details: `Contract Address: ${CONTRACT_ADDRESS}`,
            action: 'Verify contract ABI and address'
        });
    }
    
    next();
};

// Diagnostic route to check blockchain connection
app.get('/blockchain-status', async (req, res) => {
    try {
        const networkId = await web3.eth.net.getId();
        const accounts = await web3.eth.getAccounts();
        
        res.json({
            success: true,
            networkId,
            connectedAccounts: accounts,
            contractAddress: CONTRACT_ADDRESS
        });
    } catch (error) {
        logError('Blockchain status check failed', error);
        res.status(500).json({ 
            success: false, 
            error: 'Failed to retrieve blockchain status',
            details: error.message
        });
    }
});

// API to create a campaign
app.post('/createCampaign', checkContractInitialized, async (req, res) => {
    try {
        const { title, description, goal, ownerAddress } = req.body;
        console.log('Create Campaign Request:', { title, description, goal, ownerAddress });
        
        // Convert goal to wei (assuming goal is in ETH)
        const goalInWei = web3.utils.toWei(goal.toString(), 'ether');
        
        const result = await crowdfundingContract.methods
            .createCampaign(title, description, goalInWei)
            .send({ from: ownerAddress });
        
        res.json({ 
            success: true, 
            result,
            message: 'Campaign created successfully' 
        });
    } catch (error) {
        logError('Campaign creation error', error);
        res.status(500).json({ 
            success: false, 
            error: 'Failed to create campaign',
            details: error.message
        });
    }
});

// API to get campaigns
app.get('/getCampaigns', checkContractInitialized, async (req, res) => {
    try {
        const campaignCount = await crowdfundingContract.methods.getCampaignsCount().call();
        const campaigns = [];

        for (let i = 0; i < campaignCount; i++) {
            const campaign = await crowdfundingContract.methods.campaigns(i).call();
            campaigns.push({
                title: campaign.title,
                description: campaign.description,
                goal: web3.utils.fromWei(campaign.goal, 'ether'),
                owner: campaign.owner
            });
        }

        res.json({ 
            success: true, 
            campaigns,
            count: campaignCount 
        });
    } catch (error) {
        logError('Get campaigns error', error);
        res.status(500).json({ 
            success: false, 
            error: 'Failed to retrieve campaigns',
            details: error.message
        });
    }
});

// Periodic connection check and reinitialization
setInterval(() => {
    if (!web3) {
        console.log('Attempting to reinitialize blockchain connection...');
        initializeBlockchainConnection();
    }
}, 30000); // Check every 30 seconds

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});