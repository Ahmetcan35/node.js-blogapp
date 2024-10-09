module.exports= (err,req, res, next) => {
    console.log("Loglama",err.message);//loglame=> winston veya  hata email yollama
    next(err);
}