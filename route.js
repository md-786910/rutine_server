const express = require('express');
const router = express.Router()
const fetch = require('node-fetch');
const rutineModel = require("./db/schema")

const isAuthenticated = require("./isAuthenticate/isAuth")

router.get("/", (req, res) => {
    res.send("hi my server rutine Handler")
})

router.get('/get', (req, res) => {
    res.status(200).send("hi router")
})

/*--------------GET REQUEST---------------------------------------*/
// check user authenticate or not
router.get('/checkAuth', isAuthenticated, async (req, res, next) => {
    try {
        // console.log(isAuthenticated)
        res.status(200).send(req.rootUser)
        // next()
    } catch (error) {
        res.status(404).send({ msg: "user not authenticated" })
    }
})


/*-----------------------POST REQUEST------------------------------------------ */
// user register
router.post("/register", async (req, res) => {
    try {
        const { name, password } = req.body
        console.log(name, password)

        if (!name || !password) {
            res.status(406).send({ msg: "Not Acceptable" })

        } else {
            const checkPassword = await rutineModel.findOne({ password: password })

            if ((checkPassword)) {

                res.status(208).send({ msg: "password already in use" })
            }
            else {
                const createNewModel = new rutineModel({ name, password })
                const data = await createNewModel.save();
                // console.log(data)
                res.status(200).send({ msg: "user registered successfully" })
            }
        }
    } catch (error) {
        res.status(500).send({ msg: " Internal Server Error" })

    }
})


// login user
router.post('/login', async (req, res) => {
    try {
        const { password } = req.body
        // console.log(req.cookies.jwt)
        if (password) {
            const checkUser = await rutineModel.findOne({ password: password });

            // set cookies
            const token = await checkUser.generateAuthToken();
            console.log(typeof token)

            res.cookie("jwToken", token, {
                expires: new Date(Date.now() + 225892000000),
                sameSite: 'strict',
                httpOnly: true
            })

            res.status(200).send({ msg: "user login successfully" })
        }
        else {
            res.status(401).send({ msg: "unauthenticated user" })
        }
    } catch (error) {
        res.status(500).send({ msg: " Internal Server Error" })
    }
})


/*----------------------------------------------Add topic and show honours---------------------------*/
router.post('/set_topic', async (req, res) => {
    try {

        const { done, topic } = req.body
        // console.log(req.body)
        const password = 123
        const userExist = await rutineModel.findOne({ password: password });

        if (userExist) {
            const saveTopic = await userExist.setTopic(topic, done)
            res.status(200).send(saveTopic)
        }
        else {
            res.status(500).send({ msg: " Internal Server Error" })

        }

    } catch (error) {
        res.status(500).send({ msg: " Internal Server Error", err: error })

    }
})

router.get('/get_topic', async (req, res) => {
    try {

        const password = 123
        // const userExist = await rutineModel.find({ id: req.userId });
        const userExist = await rutineModel.find({ password: password });
        res.status(200).send(userExist)

    } catch (error) {
        res.status(500).send({ msg: " Internal Server Error", })

    }
})

/*------------------------------get github user api------------------------------------------*/

router.get("/github_user", async (req, res) => {
    // console.log(req.userId)
    const response = await fetch("https://api.github.com/users/md-786910")
    const data = await response.json()
    console.log(data)
    res.status(200).json(data)

})

/*-----------------------------------resume upload-------------------------------------*/
router.post("/resume_uplaod", async (req, res) => {
    try {

        const { resume } = req.body
        const password = 123
        // if(re)
        const userExists = await rutineModel.findOne({ password })

        const resumeUplaod = await userExists.setResume(resume)

        res.status(200).send({ msg: " Resume upload successfully" })

    } catch (error) {
        res.status(500).send({ msg: " Internal Server Error", err: error })

    }
})

/*----------------------get resume---------------------------------------------*/
router.get("/get_resume", async (req, res) => {
    const password = 123

    const resume = await rutineModel.findOne({ password })

    res.status(200).send(resume.resume)
})


/*--------------------------post rutine data-------------------------------------*/
router.post("/set_rutine", async (req, res) => {
    try {
        // console.log("hello world")
        const {
            s1, m1, t1, w1, th1, f1, st1,
            s2, m2, t2, w2, th2, f2, st2,
            s3, m3, t3, w3, th3, f3, st3,
            s4, m4, t4, w4, th4, f4, st4,
        } = req.body


        const password = 123

        const userExists = await rutineModel.findOne({ password: password })

        const rutineSave = await userExists.setRutine(
            s1, m1, t1, w1, th1, f1, st1,
            s2, m2, t2, w2, th2, f2, st2,
            s3, m3, t3, w3, th3, f3, st3,
            s4, m4, t4, w4, th4, f4, st4)

        // console.log(rutineSave)


        res.status(200).send({ msg: " rutine upload successfully" })

    } catch (error) {
        res.status(500).send({ msg: " Internal Server Error", err: error })

    }
})


/* ------------send rutine data --------------------*/
router.get('/rutine_data', async function (req, res) {

    try {
        const password = 123

        const userExists = await rutineModel.findOne({ password: password })

        const rutineData = userExists.rutine

        res.status(200).send(rutineData)
    } catch (error) {
        res.status(500).send({ msg: " Internal Server Error", err: error })

    }


})


/*----------------delete topic --------------------------*/
router.post("/deleteTopic", async (req, res, next) => {
    try {

        const { index } = req.body


        const password = 123

        const userExists = await rutineModel.findOne({ password: password })

        const topDelete = await userExists.deleteTopic(index)



        res.status(200).send({ msg: "topic deleted successfully" })



    } catch (error) {

        res.status(500).send({ msg: " Internal Server Error", err: error })
    }
})


/* --------------------update statis topic -------------------------*/

router.post("/updateStatusTopic", async (req, res) => {
    try {

        const password = 123
        const { elem, index } = req.body


        // const userExists = await rutineModel.findOne({ password: password })
        rutineModel.updateOne(
            { name: "John" },
            { $addToSet: { topic: ["New York", "Texas", "Detroit"] } },
            function (err, result) {
                if (err) {
                    res.send(err);
                } else {
                    res.send(result);
                }
            }
        );

        // console.log(result);
        // const updateSt = await userExists.updateStatus(elem, index)

        // console.log(updateSt)
        res.status(200).send({ msg: "topic status updated successfully" })


    } catch (error) {

        res.status(500).send({ msg: " Internal Server Error", err: error })
    }
})

module.exports = router