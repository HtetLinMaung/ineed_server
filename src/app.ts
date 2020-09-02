import express, { Request } from "express";
import mongoose from "mongoose";
import path from "path";
import multer, { FileFilterCallback } from "multer";
import { v4 } from "uuid";
import dotenv from "dotenv";
dotenv.config();

// middlewares
import error from "./middlewares/error";

// routes
import auth_route from "./routes/auth_route";

const app = express();
const PORT = process.env.PORT || 3000;

const fileStorage = multer.diskStorage({
  destination: (_req, _file, cb) => {
    cb(null, "images");
  },
  filename: (_req, file, cb) => {
    cb(null, `${v4()}_${file.originalname}`);
  },
});

const fileFilter = (_req: Request, file: any, cb: FileFilterCallback) => {
  if (
    file.mimetype === "image/png" ||
    file.mimetype === "image/jpg" ||
    file.mimetype === "image/jpeg"
  ) {
    cb(null, true);
  } else {
    cb(null, false);
  }
};

app.use(express.json());
app.use(multer({ storage: fileStorage, fileFilter }).single("profileImage"));
app.use(express.static(path.join(__dirname, "images")));
app.use("/api/auth/", auth_route);
app.use(error);

mongoose
  .connect(process.env.DATABASE || "", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    app.listen(PORT, () => console.log(`Server listening on PORT ${PORT}`));
  })
  .catch((err) => console.log(err));
