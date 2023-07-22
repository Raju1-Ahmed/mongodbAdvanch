const { ObjectId } = require("mongodb");
const viewCount = require("../middleware/viewCount");
const { connectToServer, getDb } = require("../utils/dbConnect");
// const { connectToServer, getDb } = require('./db');

// const { getDb } = require("../utils/dbConnect");


module.exports.getAllTools  = async (req, res, next) => {
  try {
    // await connectToServer(); 
    const db = getDb();
    //cursor => toArray(), forEach()
    const tool = await db 
    .collection("product")
    .find()
    // .project({_id: 0}) //আইডি ব্যতীত বাকি সব কিছু দেখাবে
    // .skip(+page * limit)
    // .limit(+limit)
    .toArray()
    res.status(200).json({success: true, data: tool})
  } catch (error) {
    next(error);
  }
}

// Handler function for posting tools
module.exports.postTools = async (req, res, next) => {
    try {
        await connectToServer(); // Establish the MongoDB connection
        const db = getDb(); // Retrieve the database connection

        // Now you can use the `db` object to perform database operations, such as collection insertion
        const tool = req.body;
        const result = await db.collection('product').insertOne(tool);
        console.log("Result:", result);
        if (!result.insertedId) {
            res.status(400).send({ status: false, error: "something went wrong!" })
        }
        res.send({success: true, message: `Tool added with id: ${result.insertedId}`})
    } catch (error) {
        console.error("Error:", error);
    }
};

module.exports.getAllToolsDetails = async (req, res, next) => {
    try {
      // await connectToServer();
      const db = getDb();
      const { id } = req.params;
      if(!ObjectId.isValid(id)){
        return res.status(400).json({success: false, error: "Your ID is not valid..."})
      }
    //   console.log('This is id:', id);
      const tool = await db.collection("product").findOne({ _id: new ObjectId(id) }); // Use the 'new' keyword with ObjectId
      
      if(!tool){
        return res.status(400).json({ success: false, error: "Could't find product with this ID.."})
      }

      res.status(200).json({ success: true, data: tool });
    } catch (error) {
      next(error);
    }
  };

module.exports.updateTools = async (req, res, next) => {
    try {
      // await connectToServer();
      const db = getDb();
      const { id } = req.params;
      if(!ObjectId.isValid(id)){
        return res.status(400).json({success: false, error: "Your ID is not valid..."})
      }
    //   console.log('This is id:', id);
      const tool = await db.collection("product").updateOne({ _id: new ObjectId(id) }, {$set: req.body}); // Use the 'new' keyword with ObjectId
      
      if(!tool.modifiedCount){
        return res.status(400).json({ success: false, error: "Could't update the product..."})
      }

      res.status(200).json({ success: true, message: "successfully update the product" });
    } catch (error) {
      next(error);
    }
  };



module.exports.deleteTools = async (req, res, next) => {
    try {
      // await connectToServer();
      const db = getDb();
      const { id } = req.params;
      if(!ObjectId.isValid(id)){
        return res.status(400).json({success: false, error: "Your ID is not valid..."})
      }
    //   console.log('This is id:', id);
      const tool = await db.collection("product").deleteOne({ _id: new ObjectId(id) }); // Use the 'new' keyword with ObjectId
      
      if(!tool.deletedCount){
        return res.status(400).json({ success: false, error: "Could't update the product..."})
      }

      res.status(200).json({ success: true, message: "successfully Deleted the product" });
    } catch (error) {
      next(error);
    }
  };

// module.exports.deleteTools = (req, res) => {
//     const { id } = req.params;
//     const filter = { _id: id };
//     result = tools.filter(tool => tool.id !== Number(id))
//     res.send(result);
// }