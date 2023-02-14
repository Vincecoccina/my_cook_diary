import express from "express";
import dotenv from "dotenv";
import bodyParser from "body-parser";
import helmet from "helmet";
import morgan from "morgan";
import multer from "multer";
import cors from "cors";
import path from "path";
import { fileURLToPath } from "url";
import connectDB from "./config/connectDB.js";
import authRoutes from "./routes/authRoutes.js";
import recipesRoutes from "./routes/recipesRoutes.js";
import usersRoutes from "./routes/usersRoutes.js"
import { register } from "./controllers/authController.js";
import { createRecipe } from "./controllers/recipesController.js";
import { verifyToken } from "./middleware/auth.js";
import User from "./model/UserModel.js";
import Recipe from "./model/RecipeModel.js";
import { users, posts } from "./data/index.js";

//CONGIGURATION
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config();
const app = express();
app.use(express.json());
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({policy: 'cross-origin'}));
app.use(morgan('common'));
app.use(bodyParser.json({limit: '30mb', extenced: true}));
app.use(bodyParser.urlencoded({limit: '30mb', extended: true}));
app.use(cors());
app.use("/assets", express.static(path.join(__dirname, 'public/assets')));

//FILES STORAGE
const storage = multer.diskStorage({
    destination: function(req, file, cb){
        cb(null, 'public/assets');
    },
    filename: function(res, file, cb){
        cb(null, file.originalname)
    }
});
const upload = multer({storage});

//ROUTES WITH FILES
app.post("/auth/register", upload.single("picture"), register);
app.post("/recipes", verifyToken, upload.single("picture"), createRecipe);

//ROUTES
app.use("/auth", authRoutes);
app.use("/users", usersRoutes);
app.use("/recipes", recipesRoutes);

//CONNECTION DATABASE
const PORT = process.env.PORT || 3001;
connectDB();
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
// User.insertMany(users);
// Recipe.insertMany(posts);
