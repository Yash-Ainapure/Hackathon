const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();


// Controller function to get the list of tables
async function getTables(req, res) {
  try {
    // Query to get the list of tables from the current schema
    const result = await prisma.$queryRaw` 
      SELECT table_name 
      FROM information_schema.tables 
      WHERE table_schema = 'public'
      ORDER BY table_name;
    `;

    const tables = result.map(row => row.table_name);
    res.status(200).json(tables);
  } catch (error) {
    console.error('Error fetching tables:', error);
    res.status(500).json({ error: 'Failed to fetch tables' });
  }
}

async function addUser(req, res) {
  try {
    const { name, email } = req.body;
    
    // Check if name or email is missing
    if (!name || !email) {
      return res.status(400).json({ error: 'Name and email are required' });
    }

    const user = await prisma.user.create({
      data: { name, email },
    });
    res.status(201).json(user);
  } catch (error) {
    console.error('Error adding user:', error);
    res.status(500).json({ error: 'Failed to add user'+error });
  }
}

async function getUsers(req, res) {
  try {
    const users = await prisma.user.findMany();
    res.status(200).json(users);
  } catch (error) {
    console.error('Error fetching users:', error);
    res.status(500).json({ error: 'Failed to fetch users' });
  }
}

module.exports = {
  getTables,
  addUser,
  getUsers,
};
