module.exports = (req, res) => {

    let email = ""
    let password = ""
    let name = ""
    let surname = ""
    let course = "" 
    let role = ""

    if (typeof data != "undefined") {
        email  = data.email;
        password = data.password
        name = data.name
        surname = data.surname
        course = data.course
        role = data.role
    }

    res.render('register',{
        errors: req.flash('validationErrors'),
        email: email,
        password: password,
        name: name,
        surname: surname,
        course: course,
        role: role
    })
}