// const db = require('./models');

// db.user.findOne({
//     where: { email: 'john@gmail.com' }
// })
// .then(userData => {
//     // name, email
// })

// add function
function callAnotherFunc () {
    // return another function

    function hello(name) {
        console.log(`Hello ${name}`);

        function goodbye() {
            console.log('goodbye');
        }

        return goodbye;
    }

    return hello;
}

callAnotherFunc()('Rome')();