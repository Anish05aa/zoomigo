// import multer from 'multer';

// const storage = multer.memoryStorage(); // important!

// const upload = multer({
//   storage,
//   limits: { fileSize: 5 * 1024 * 1024 }, // 5MB
//   fileFilter: (req, file, cb) => {
//     if (file.mimetype.startsWith("image/")) {
//       cb(null, true);
//     } else {
//       cb(new Error("Only image files are allowed!"), false);
//     }
//   }
// });

// export default upload;

import multer from 'multer';

const upload = multer({
  storage: multer.memoryStorage(), // Store file in memory
  limits: { fileSize: 5 * 1024 * 1024 } // 5MB limit
});

export default upload;