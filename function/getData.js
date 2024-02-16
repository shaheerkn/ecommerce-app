// functions/getData.js
exports.handler = async (event, context) => {
  try {
    // Your code here to fetch and process data
    const data = { message: "Hello from serverless function!" };

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
