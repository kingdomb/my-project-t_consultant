const asyncHandler = require('express-async-handler');
const Goals = require('../models/goalsModel');
const Users = require('../models/usersModel');



// @desc    Get Document
// @route   GET /api/goals
// @access  Private
const getGoals = asyncHandler( async(req, res) => {
    let goals = await Goals.find({createdBy: req.user.id});
    res.status(200).json({
        status  :  true,
        message :  "Goals fetched successfully!",
        data    :  goals,
    })
})

// @desc    Create Document
// @route   POST /api/goals
// @access  Private
const setGoal = asyncHandler( async(req, res) => {
    if(!req.body.title){
        res.status(400)
        throw new Error('The title field is required to create a new goal.')
    }
    const goal = await Goals.create({
        createdBy : req.user.id,
        title : req.body.title
    })
    res.status(201).json({
        status: true,
        message: "Goal created successfully!",
        createdGoal: goal,
    });
})

// @desc    Update Document
// @route   PUT /api/goals/:id
// @access  Private
const updateGoal = asyncHandler( async(req, res) => {
    const goal = await Goals.findById(req.params.id);
    if(!goal){
        res.status(404)
        throw new Error(`No goal found with ID: ${req.params.id}`)
    }
    // Retrieve Foreign Key as User/Author
    const user = await Users.findById(req.user.id);
    // Check for Author
    if(!user){
        res.status(401)
        throw new Error('User not found!')
    }
    // Compare the Author
    if(goal.createdBy.toString() !== user.id){
        res.status(401)
        throw new Error('User not authorized!')
    }
    const updatedGoal = await Goals.findByIdAndUpdate(
        req.params.id, 
        { title: req.body.title }, 
        {new : true, runValidators: true}
    );
    res.status(200).json({
        status: true,
        message: "Goal updated successfully!",
        updatedGoal: updatedGoal,
    });
})

// @desc    Delete Document
// @route   DELETE /api/goals/:id
// @access  Private
const deleteGoal = asyncHandler( async(req, res) => {
    const goal = await Goals.findByIdAndDelete(
        req.params.id, 
        { returnDocument: 'before' }
    );
    if(!goal){
        res.status(404)
        throw new Error(`No goal found with ID: ${req.params.id}`)
    }
    // Retrieve Foreign Key as User/Author
    const user = await Users.findById(req.user.id);
    // Check for Author
    if(!user){
        res.status(401)
        throw new Error('User not found!')
    }
    // Compare the Author
    if(goal.createdBy.toString() !== user.id){
        res.status(401)
        throw new Error('User not authorized!')
    }
    res.status(200).json({
        status: true,
        message: "Goal deleted successfully!",
        id: req.params.id,
        deletedGoal: goal
    })
})

module.exports = {
    getGoals,
    setGoal,
    updateGoal,
    deleteGoal
}