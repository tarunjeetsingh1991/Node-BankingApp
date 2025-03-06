const Client = require('../models/Client');

//create a client
exports.createClient = async(req,res) => {
  try
  {
    const{name,accountNumber} = req.body;
    const client = new Client({name,accountNumber});
    await client.save();
  }
  catch(err)
  {
    res.status(500).json({message: 'Server error',error:err.message});
  }
};

//get all clients
exports.getClients = async(req,res) => {
  try
  {
    const clients = await Client.find();
    res.status(200).json(clients);
  }
  catch(err)
  {
    res.status(500).json({message: 'Server error',error:err.message});
  }
};

//get client by id
exports.getClientById = async(req,res) => {
  try
  {
    const client = await Client.findById(req.params.id);
    if(!client)
    {
      return res.status(404).json({message:'Not found'});
    }
    res.status(200).json(client);
  }
  catch(err)
  {
    res.status(500).json({message: 'Server error',error:err.message});
  }
};

//update client
exports.updateClient = async(req,res) => {
  try
  {
    const{name,accountNumber,kycStatus} = req.body;
    const client = await Client.findByIdAndUpdate(
      req.params.id,
      {name,accountNumber,kycStatus},
      {new:true}
    );
    if(!client)
      {
        return res.status(404).json({message:'Not found'});
      }
    res.status(200).json({ message: 'Client updated successfully', client });
  }
  catch(err)
  {
    res.status(500).json({message: 'Server error',error:err.message});
  }
};

//delete a client
exports.deleteClient = async(req,res) => {
  try
  {
    const client = await Client.findByIdAndDelete(req.params.id);
    if(!client)
      {
        return res.status(404).json({message:'Not found'});
      }
    res.status(200).json({ message: 'Client deleted successfully' });
  }
  catch(err)
  {
    res.status(500).json({message: 'Server error',error:err.message});
  }
};

//deposit funds 
exports.depositFunds = async(req,res) => {
  try
  {
    const {amount} = req.body;
    if(amount <= 0)
    {
      return res.status(400).json({message:'Amount should be greater than 0'});
    }

    const client = await Client.findById(req.params.id);
    if (!client)
    {
      return res.status(404).json({ message: 'Client not found' });
    }

    client.accountBalance += amount;
    await client.save();
    res.status(200).json({ message: 'Deposit successful', accountBalance: client.accountBalance });
  }
  catch(err)
  {
    res.status(500).json({message: 'Server error',error:err.message});
  }
};

//withdraw funds
exports.withdrawFunds = async(req,res) => {
  try
  {
    const {amount} = req.body;
    if (amount <= 0) 
    {
      return res.status(400).json({ message: 'Withdrawal amount must be greater than zero' });
    }

    const client = await Client.findById(req.params.id);
    if (!client)
      {
        return res.status(404).json({ message: 'Client not found' });
      }
    if(amount > client.accountBalance)
    {
      return res.status(400).json({ message: 'Insufficient balance' });
    }
    client.accountBalance -= amount;
    await client.save();
    res.status(200).json({ message: 'Withdrawal successful', accountBalance: client.accountBalance });
  }
  catch(err)
  {
    res.status(500).json({message: 'Server error',error:err.message});
  }
};