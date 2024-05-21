const {body, resultValidation} = require('express-validator')
const asyncHandler = require('express-async-handler')


exports.get_homepage = asyncHandler(
    (req, res, next)=>{
        res.render("homepage",
            {
                title: "Messages"
            }
        )
    }
)