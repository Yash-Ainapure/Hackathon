const app = require('./app');
const postgres = require('postgres');
const dotenv = require('dotenv');
dotenv.config();

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server running on localhost port ${PORT}`);
});
