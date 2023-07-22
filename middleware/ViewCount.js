let count = 0 ;

const viewCount = (req, res, next) =>{
    count++;
    console.log(count);
    // res.send("Tool Count")
    next();
}

module.exports = viewCount;