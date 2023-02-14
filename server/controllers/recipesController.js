import Recipe from "../model/RecipeModel.js";
import User from "../model/UserModel.js";

//CREATE RECIPE
//@POST
//ROUTE : /recipes
export const createRecipe = async (req, res) => {
  try {
    const { userId, description, picturePath } = req.body;
    const user = await User.findById(userId);

    const newRecipe = new Recipe({
      userId,
      firstName: user.firstName,
      lastName: user.lastName,
      location: user.location,
      description,
      picturePath,
      userPicturePath: user.picturePath,
      likes: {},
      comment: [],
    });
    await newRecipe.save();
    const recipe = await Recipe.find();
    res.status(201).json(recipe);
  } catch (err) {
    res.status(409).json({ message: err.message });
  }
};

//GET FEED RECIPE
//@GET
//ROUTE : /
export const getFeedRecipes = async (req, res) => {
  try {
    const recipe = await Recipe.find();
    res.status(201).json(recipe);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};

//GET USER RECIPE
//@GET
//ROUTE : /:userId/recipes
export const getUserRecipes = async (req, res) => {
  try {
    const { userId } = req.params;
    const recipe = await Recipe.findById(userId);
    res.status(200).json(recipe);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};

//LIKE RECIPE
//@PATCH
//ROUTE : /:id/like
export const likeRecipe = async (req, res) => {
  try {
    const { id } = req.params;
    const { userId } = req.body;
    const recipe = await Recipe.findById(id);
    const isLiked = recipe.likes.get(userId);

    if(isLiked){
        recipe.likes.delete(userId);
    }else{
        recipe.likes.set(userId, true)
    }

    const updatedRecipe = await Recipe.findByIdAndUpdate(
        id,
        {likes: recipe.likes},
        {new: true}
    )
    res.status(200).json(updatedRecipe);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};
