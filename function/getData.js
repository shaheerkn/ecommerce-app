const fs = require('fs');
const path = require('path');

exports.handler = async (event, context) => {
  try {
    // Read the JSON file
    const dbFilePath = path.resolve(__dirname, 'data', 'db.json');
    const jsonData = fs.readFileSync(dbFilePath, 'utf-8');
    const data = JSON.parse(jsonData);

    return {
      statusCode: 200,
      body: JSON.stringify(data),
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ message: error.message }),
    };
  }
};
