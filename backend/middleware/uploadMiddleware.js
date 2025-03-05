import multer from "multer";

//configure storage
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
    // cb(null, Date.now() + "-" + file.originalname);
  },
});

//file filter
const fileFilter = (req, file, cb) => {
  const allowedTypes = ["image/jpeg", "image/png", "image/jpg"];
  if (allowedTypes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(new Error("Only JPEG, PNG and JPG files are allowed."), false);
  }
  //   if (file.mimetype === "image/jpeg" || file.mimetype === "image/png") {
  //     cb(null, true);
  //   } else {
  //     cb(null, false);
  //   }
};

//configure upload
const upload = multer({ storage, fileFilter });

export default upload;
