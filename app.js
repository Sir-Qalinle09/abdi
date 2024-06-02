const express = require('express');
const ejs = require('ejs');
const multer = require('multer');
const bodyParser = require('body-parser');
const path = require('path');
const db = require('./db'); // Correctly requiring the db module
const fileUpload = require('express-fileupload');
const moment = require('moment');
const app = express();

// Define routes

app.get('/',(req,res)=>{

    res.render('index')
})

app.get('/about',(req,res)=>{

    res.render('about')
})

app.get('/mission',(req,res)=>{
    res.render('mission')
})

app.get('/policy',(req,res)=>{

    res.render('policy')
})

app.get('/contact',(req,res)=>{

    res.render('contact')
})

app.get('/instructor',(req,res)=>{

    res.render('instructor')
})

app.get('/copyright', (req, res) => {
    res.render('copyright');
});

app.get('/privacy', (req, res) => {
    res.render('privacy');
});

app.get('/it', (req, res) => {
    res.render('it');
});

app.get('/course', (req, res) => {
    res.render('course');
});

app.get('/register', (req, res) => {
    res.render('register');
});


app.get('/term&condition', (req, res) => {
    res.render('term&condition');
});

app.get('/disclaimer', (req, res) => {
    res.render('disclaimer');
});

app.get('/sitemap', (req, res) => {
    res.render('sitemap');
});

app.get('/das',(req,res)=>{
res.render('das')
})

// app.get('/user_index',(req,res)=>{
// res.render('user_index')
// })

app.get('/login',(req,res)=>{
res.render('login')
})


//set views file
app.set('views',path.join(__dirname,'views'));

//set view engine
app.use(express.static('public'))
app.set('view engine', 'ejs');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(fileUpload());



// const storage = multer.diskStorage({
//     destination: './public/uploads/',
//     filename: (req, file, cb) => {
//         cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
//     }
// });

// const upload = multer({
//     storage: storage,
//     limits: { fileSize: 1000000 },
//     fileFilter: (req, file, cb) => {
//         checkFileType(file, cb);
//     }
// }).single('image');

// function checkFileType(file, cb) {
//     const filetypes = /jpeg|jpg|png|gif/;
//     const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
//     const mimetype = filetypes.test(file.mimetype);
//     if (extname && mimetype) {
//         return cb(null, true);
//     } else {
//         cb('Error: Images Only!');
//     }
// }


app.get('/table1',(req,res)=>{
    const db ="create table login (username varchar(30), password varchar(300))";
  db.query(db,(err)=>{
        if(err) throw err
        console.log("table created ")
    })
    res.send ("table has been crated")
})



app.get('/insert',(req,res)=>{
    const db ="insert into login value ('admin','1234')";
  db.query(db,(err)=>{
        if(err) throw err
        console.log("insert created ")
    })
    res.send ("inserted has been crated")
})





app.post('/form',(req,res)=>{
    const username= req.body.username;
    const password= req.body.password;
    const hel="select * from login where username = ? and password = ?";
  db.query(hel,[username , password],(err,result)=>{
        if(err){
            console.log("wrong password or username");
            return
        }
        if(result.length >0){
                res.redirect('das')
        }
        else{
            console.log("waa qalad passwordkaagau")
            res.render('login')
        }
    })
})


// app.get('/',(req, res) => {
//     // res.send('CRUD Operation using NodeJS / ExpressJS / MySQL');
//     let sql = "SELECT * FROM register";
//     let query = connection.query(sql, (err, rows) => {
//         if(err) throw err;
//         res.render('user_index', {
//             title : 'CRUD Operation using NodeJS / ExpressJS / MySQL',
//             users : rows
//         });
//     });
// });


// app.get('/edit',(req, res) => {
//     res.render('user_index', {
//         title : 'CRUD Operation using NodeJS / ExpressJS / MySQL'
//     });
// })

app.get('/add',(req, res) => {
    res.render('register', {
        title : 'CRUD Operation using NodeJS / ExpressJS / MySQL'
    });
});

app.post('/save',(req, res) => { 
    let data = {Name: req.body.Name, Gender: req.body.Gender, Phone: req.body.Phone, Courses: req.body.Courses, City: req.body.City, Address: req.body.Address, Email: req.body.Email, Date: req.body.Date};
    let sql = "INSERT INTO register SET ?";
    let query = db.query(sql, data,(err, results) => {
      if(err) throw err;
      res.redirect('/');
    });
    res.send("data insrted" )
});


app.get("/select",(req,res)=>{
    const hel = "select * from register";

  db.query(hel,(err,result)=>{
        if(err) {
            res.render('user_index',{users:''})
        }else{
            res.render('user_index',{users:result})
        }
    })

}) 



// Edit Functionality
app.get('/edit/:id', (req, res) => {
    const userId = req.params.id;
    const sql = "SELECT * FROM register WHERE id = ?";
  db.query(sql, userId, (err, result) => {
        if (err) throw err;
        res.render('user_edit', { user: result[0] });
    });
});

app.post('/update', (req, res) => {
    const userId = req.body.id;
    const updatedData = {
        Name: req.body.Name,
        Gender: req.body.Gender,
        Phone: req.body.Phone,
        Courses: req.body.Courses,
        City: req.body.City,
        Address: req.body.Address,
        Email: req.body.Email,
        Date: req.body.Date
    };
    const sql = "UPDATE register SET ? WHERE id = ?";
  db.query(sql, [updatedData, userId], (err, result) => {
        if (err) throw err;
        res.redirect('/select');
    });
});

// Delete Functionality
app.get('/delete/:id', (req, res) => {
    const userId = req.params.id;
    const sql = "DELETE FROM register WHERE id = ?";
  db.query(sql, userId, (err, result) => {
        if (err) throw err;
        res.redirect('/select');
    });
});



// app.get('/edit/:userId',(req, res) => {
//     const userId = req.params.userId;
//     let sql = `Select * from register where id = ${userId}`;
//     let query = connection.query(sql,(err, result) => {
//         if(err) throw err;
//         res.render('user_edit', {
//             title : 'CRUD Operation using NodeJS / ExpressJS / MySQL',
//             user : result[0]
//         });
//     });
// });


// app.post('/update',(req, res) => {
//     const userId = req.body.id;
//     let sql = "update register SET Name='"+req.body.Name+"',  Gender='"+req.body.Gender+"',  Phone='"+req.body.Phone+"',  Courses='"+req.body.Courses+"',  City='"+req.body.City+"', Address='"+req.body.Address+"', Email='"+req.body.email+"', Date='"+req.body.date+"',  where id ="+userId;
    
//     let query = connection.query(sql,(err, results) => {
//       if(err) throw err;
//       res.redirect('/');
//     });
// });


// app.get('/delete/:userId',(req, res) => {
//     const userId = req.params.userId;
//     let sql = `DELETE from register where id = ${userId}`;
//     let query = connection.query(sql,(err, result) => {
//         if(err) throw err;
//         res.redirect('/');
//     });
// });






// app.get('/it-courses', (req, res) => {
//     let sql = 'SELECT * FROM courses';
//   db.query(sql, (err, results) => {
//         if (err) throw err;
//         res.render('list-it-courses', {
//             courses: results
//         });
//     });
// });

// app.get('/add-it', (req, res) => {
//     res.render('add-it-courses');
// });

// app.post('/add-it', (req, res) => {
//     upload(req, res, (err) => {
//         if (err) {
//             res.render('add-it-courses', {
//                 msg: err
//             });
//         } else {
//             if (req.file == undefined) {
//                 res.render('add-it-courses', {
//                     msg: 'No file selected!'
//                 });
//             } else {
//                 const { name, description, post_date, close_date } = req.body;
//                 let image = `/uploads/${req.file.filename}`;

//                 let sql = 'INSERT INTO courses (name, description, post_date, close_date, image) VALUES (?, ?, ?, ?, ?)';
//                 let query = connection.format(sql, [name, description, post_date, close_date, image]);

//               db.query(query, (err, result) => {
//                     if (err) throw err;
//                     res.redirect('/it-courses');
//                 });
//             }
//         }
//     });
// });

// app.get('/view-it-courses', (req, res) => {
//     let sql = 'SELECT * FROM courses';
//   db.query(sql, (err, results) => {
//         if (err) throw err;
//         res.render('view-it-courses', {
//             courses: results
//         });
//     });
// });

// // Edit course route
// app.get('/edit/:id', (req, res) => {
//     const courseId = req.params.id;
//     let sql = 'SELECT * FROM courses WHERE id = ?';
//   db.query(sql, [courseId], (err, result) => {
//         if (err) throw err;
//         res.render('edit-it-course', { course: result[0] });
//     });
// });

// // Update course route
// app.post('/update/:id', (req, res) => {
//     const courseId = req.params.id;
//     const { name, description, post_date, close_date } = req.body;
//     let sql = 'UPDATE courses SET name = ?, description = ?, post_date = ?, close_date = ? WHERE id = ?';
//     let query = db.format(sql, [name, description, post_date, close_date, courseId]);
//   db.query(query, (err, result) => {
//         if (err) throw err;
//         res.redirect('/it-courses');
//     });
// });

// // Delete course route
// app.post('/delete/:id', (req, res) => {
//     const courseId = req.params.id;
//     let sql = 'DELETE FROM courses WHERE id = ?';
//   db.query(sql, [courseId], (err, result) => {
//         if (err) throw err;
//         res.redirect('/it-courses');
//     });
// });








app.get('/view-courses', (req, res) => {
    db.query('SELECT * FROM courses', (err, results) => {
        if (err) throw err;
        res.render('view-courses', { courses: results });
    });
});

app.get('/course/:id', (req, res) => {
    const courseId = req.params.id;
    db.query('SELECT * FROM courses WHERE id = ?', [courseId], (err, results) => {
        if (err) throw err;
        if (results.length > 0) {
            res.render('course_detail', { course: results[0] });
        } else {
            res.status(404).send('Course not found');
        }
    });
});

app.get('/add-course', (req, res) => {
    res.render('add-course');
});

app.post('/add-course', (req, res) => {
    const {
        title,
        description,
        price,
        post_date,
        close_date,
        instructor_name,
        rating,
        duration_weeks,
        what_you_learn
    } = req.body;
    const image = req.files.image;
    const instructor_image = req.files.instructor_image;

    const imagePath = path.join(__dirname, 'public', 'images', image.name);
    const instructorImagePath = path.join(__dirname, 'public', 'images', instructor_image.name);

    image.mv(imagePath, (err) => {
        if (err) return res.status(500).send(err);

        instructor_image.mv(instructorImagePath, (err) => {
            if (err) return res.status(500).send(err);

            // Format the dates
            const formattedPostDate = moment(post_date, 'YYYY-MM-DD').format('DD/MM/YYYY');
            const formattedCloseDate = moment(close_date, 'YYYY-MM-DD').format('DD/MM/YYYY');

            const sql = 'INSERT INTO courses (title, description, price, post_date, close_date, image, instructor_name, instructor_image, rating, duration_weeks, what_you_learn) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)';
            const values = [title, description, price, formattedPostDate, formattedCloseDate, image.name, instructor_name, instructor_image.name, rating, duration_weeks, what_you_learn];

            db.query(sql, values, (err, result) => {
                if (err) throw err;
                res.redirect('/view-courses');
            });
        });
    });
});



app.get('/view-courses-readonly', (req, res) => {
    db.query('SELECT * FROM courses', (err, results) => {
        if (err) throw err;
        res.render('view-courses-readonly', { courses: results });
    });
});




app.get('/edit-course/:id', (req, res) => {
    const courseId = req.params.id;
    db.query('SELECT * FROM courses WHERE id = ?', [courseId], (err, results) => {
        if (err) throw err;
        if (results.length > 0) {
            res.render('edit-course', { course: results[0] });
        } else {
            res.status(404).send('Course not found');
        }
    });
});

app.post('/edit-course/:id', (req, res) => {
    const courseId = req.params.id;
    const {
        title,
        description,
        price,
        post_date,
        close_date,
        instructor_name,
        rating,
        duration_weeks,
        what_you_learn
    } = req.body;
    const image = req.files?.image;
    const instructor_image = req.files?.instructor_image;

    let updateFields = {
        title,
        description,
        price,
        post_date,
        close_date,
        instructor_name,
        rating,
        duration_weeks,
        what_you_learn
    };

    const uploadAndSave = (fieldsToUpdate) => {
        let sql = 'UPDATE courses SET ? WHERE id = ?';
        db.query(sql, [fieldsToUpdate, courseId], (err, result) => {
            if (err) throw err;
            res.redirect('/view-courses');
        });
    };

    if (image) {
        const imagePath = path.join(__dirname, 'public', 'images', image.name);
        image.mv(imagePath, (err) => {
            if (err) return res.status(500).send(err);
            updateFields.image = image.name;
            if (instructor_image) {
                const instructorImagePath = path.join(__dirname, 'public', 'images', instructor_image.name);
                instructor_image.mv(instructorImagePath, (err) => {
                    if (err) return res.status(500).send(err);
                    updateFields.instructor_image = instructor_image.name;
                    uploadAndSave(updateFields);
                });
            } else {
                uploadAndSave(updateFields);
            }
        });
    } else {
        if (instructor_image) {
            const instructorImagePath = path.join(__dirname, 'public', 'images', instructor_image.name);
            instructor_image.mv(instructorImagePath, (err) => {
                if (err) return res.status(500).send(err);
                updateFields.instructor_image = instructor_image.name;
                uploadAndSave(updateFields);
            });
        } else {
            uploadAndSave(updateFields);
        }
    }
});

app.post('/delete-course/:id', (req, res) => {
    const courseId = req.params.id;
    db.query('DELETE FROM courses WHERE id = ?', [courseId], (err, result) => {
        if (err) throw err;
        res.redirect('/view-courses');
    });
});



// Server Listening
app.listen(3000, () => {
    console.log('Server is running at port 3000');
});