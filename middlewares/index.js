exports.isLoggedIn = (req,res,next) => {
    if (req.isAuthenticated()){
        next()
    }else{
        return res.redirect('/login')
    }
}

exports.isNotLoggedIn = (req,res,next) => {
    if (!req.isAuthenticated()){
        next()
    }else{
        return res.redirect('/')   
    }
}