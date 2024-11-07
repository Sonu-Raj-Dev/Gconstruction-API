// services/userService.js
const { json } = require('express');
const Calender = require('../Models/CalnderModel');

exports.Create = async (Data) => {
  try {
    console.log("Request Data:", Data);
    
    // Check if `id` is present in the Data object
    if (Data._id) {
      // Update the existing company document
      const response = await Calender.findByIdAndUpdate(
        Data._id,  // Document ID for update
        Data,     // Updated data
        { new: true, upsert: true }  // Options to return the updated doc and insert if not found
      );

      console.log('Updated Calender Data:', response);
      return response;
      
    } else {
      // Insert a new company document
      const response = await Calender.create(Data);
      
      console.log('Inserted Calender:', response);
      return response;
    }
    
  } catch (err) {
    console.error('Error in Create/Update Calender:', err);  // Log the error
    throw err;  // Rethrow the error for upstream error handling
  }
};



exports.getCalenderData = async () => {
  try {
    const response = await Calender.find(); 
     // No callback here, just await the result
    console.log('Calender:', response);  // Logs the users
    return response;  
  } catch (err) {
    console.error('Error fetching Calender:', err);  // Log and handle any errors
    throw err;  // Rethrow the error for upstream error handling
  }
};