 import multer from "multer";
 const storage=multer.memoryStorage();
 const ulpoad=multer({storage});
 export default ulpoad;