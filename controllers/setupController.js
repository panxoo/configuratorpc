const setupService = require('../services/setupService');


module.exports.setup = async (req,res) => {
    try {
        await setupService.setupInitialData();
        res.status(200).json({status: 200, message: 'true' });
    }
    catch (err) {
        console.error('Error setup:', err);
        return null;
    }
}