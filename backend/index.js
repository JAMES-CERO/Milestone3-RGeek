// Modules and Globals
import express from "express";
import bodyParser from "body-parser";
import dotenv from "dotenv";
import cors from "cors";
import path from 'path';
import multer from "multer";
import morgan from "morgan";
import helmet from "helmet";
import { fileURLToPath } from 'url';
import authRoutes from "./routes/auth.js";
import userRoutes from "./routes/users.js";
import { register } from './controllers/auth.js';
import mongoose from "mongoose";
dotenv.config();

// Express Settings
const app = express();

//modules - package.json
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(cors());
app.use(express.json());
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin"}))
app.use(morgan("common"))
app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb",extended: true }));
app.use("/assets", express.static(path.join(__dirname, "public/assets")));

//FILE STORAGE 
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'public/assets');
  },
  fileName: function (req, file, cb) {
    cb(null, file.originalname)
  }
});
const upload = multer({storage});

// Routes & files - middleware
app.post("/auth/register", upload.single('picture'), register);

app.use("/auth", authRoutes);
app.use('/user', userRoutes);

//mongoose - mongodb

const PORT = process.env.PORT || 6001

mongoose.connect(process.env.MONGO_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => {
  app.listen(PORT, () => console.log(`Listening on ${PORT}`));
}).catch((err) => console.log(`${err} did not connect`));

  