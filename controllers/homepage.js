const {body, resultValidation} = require('express-validator')
const asyncHandler = require('express-async-handler')


exports.get_homepage = asyncHandler(
    async(req, res, next)=>{
        console.log(req.user)
        res.render("homepage",
            {
                title: "Messages",
                messages: undefined,
                user: req.user,
            }
        )
    }
)