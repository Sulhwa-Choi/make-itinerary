const multer = require("multer");
const path = require("path");

// Multer 설정
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    //cb(null, "../../img"); // 이미지를 저장할 폴더 경로
    // 'C:\\Users\\sulhw\\Desktop\\NodeProject\\img\\image-1686127291976-349806286.jpg',
    cb(null, "public/img"); // 이미지를 저장할 폴더 경로
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});

const upload = multer({ storage: storage });

class ImageStorage {
    static saveImage(req, res) {
      upload.single("image")(req, res, function (err) {
        if (err instanceof multer.MulterError) {
          // 업로드 오류 처리
          return res.status(500).json({ error: "1 Error occurred while uploading the file." });
        } else if (err) {
          // 기타 오류 처리
          return res.status(500).json({ error: "2 Error occurred while uploading the file." });
        }
  
        // 파일 업로드 성공
        if (!req.file) {
          return res.status(400).json({ error: "No file uploaded." });
        }
  
        // 파일 저장 경로
        const filePath = req.file.path;
  
        // 추가적인 로직 수행
  
        return res.json({ success: true , filePath: req.file });
      });
    }
  }
  
  module.exports = ImageStorage;