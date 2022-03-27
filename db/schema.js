const mongoose = require('mongoose')
const jwt = require('jsonwebtoken')
const rutineSchema = new mongoose.Schema({
    name: {
        type: String,
    },
    password: {
        type: String,

    },
    date: {
        type: Date,
        default: new Date()
    },
    topic: [
        {
            topic: {
                type: String,
            },
            status: {
                type: String,
            }
        }
    ],
    resume: [
        {
            resume: {
                type: String,
            }
        }
    ],
    rutine: [
        {
            s1: {
                type: String,
            },
            s2: {
                type: String,
            },
            s3: {
                type: String,
            },
            s4: {
                type: String,
            },
            m1: {
                type: String,
            },
            m2: {
                type: String,
            },
            m3: {
                type: String,
            },
            m4: {
                type: String,
            },
            t1: {
                type: String,
            },
            t2: {
                type: String,
            },
            t3: {
                type: String,
            },
            t4: {
                type: String,
            },
            w1: {
                type: String,
            },
            w2: {
                type: String,
            },
            w3: {
                type: String,
            },
            w4: {
                type: String,
            },
            th1: {
                type: String,
            },
            th2: {
                type: String,
            },
            th3: {
                type: String,
            },
            th4: {
                type: String,
            },
            f1: {
                type: String,
            },
            f2: {
                type: String,
            },
            f3: {
                type: String,
            },
            f4: {
                type: String,
            },
            st1: {
                type: String,
            },
            st2: {
                type: String,
            },
            st3: {
                type: String,
            },
            st4: {
                type: String,
            },
        }
    ],

    tokens: [
        {
            token: {
                type: Array,

            }
        }
    ]
})

// i will do it later
// rutineSchema.pre("save", async function (next) ){

//     if (this.isModified('password')) {
//         this.password = await bycrypt.hash(this.pass, 12)
//     }
// }

rutineSchema.methods.generateAuthToken = async function () {
    try {
        console.log("message from login auth token -> generateAuthToken")

        let token = jwt.sign({ _id: this._id }, process.env.SECRET_KEY)

        this.tokens = this.tokens.concat({ token: token })

        await this.save()
        return token

    } catch (error) {
        return "bad request for generateAuthToken"
    }
}

rutineSchema.methods.setTopic = async function (topic, done) {
    try {
        this.topic = this.topic.concat({ topic: topic, status: done })
        await this.save()
        return this.topic

    } catch (error) {
        return "error from set topic"
    }
}


// set resume
rutineSchema.methods.setResume = async function (resume) {
    try {
        this.resume = this.resume.concat({ resume: resume })
        await this.save()
        return this.resume
    } catch (error) {
        return "error from set resume"
    }
}

// set return
rutineSchema.methods.setRutine = async function (
    s1, m1, t1, w1, th1, f1, st1,
    s2, m2, t2, w2, th2, f2, st2,
    s3, m3, t3, w3, th3, f3, st3,
    s4, m4, t4, w4, th4, f4, st4) {
    try {

        this.rutine = this.rutine.concat({
            s1: s1, m1: m1, t1: t1, w1: w1, th1: th1, f1: f1, st1: st1,
            s2: s2, m2: m2, t2: t2, w2: w2, th2: th2, f2: f2, st2: st2,
            s3: s3, m3: m3, t3: t3, w3: w3, th3: th3, f3: f3, st3: st3,
            s4: s4, m4: m4, t4: t4, w4: w4, th4: th4, f4: f4, st4: st4,
        })

        await this.save()

        return this.rutine

    } catch (error) {

        console.log("schema set rutine error " + error.message)

    }
}


// delete topic
rutineSchema.methods.deleteTopic = async function (index) {
    try {
        // console.log("delete topic " + index)

        this.topic = this.topic.filter((elem, id) => index != elem._id)

        await this.save()

        return this.topic


    } catch (error) {
        console.log("error from schema to delete topic " + error.message)
    }
}
// set status topic
rutineSchema.methods.updateStatus = async function (elem, index) {
    try {
        // console.log("delete topic " + index)

        // this.topic = this.topic.concat({ status: "Completed", topic: elem })

        // await this.save()

        // this.topic = this.topic.filter((elem, id) => elem._id !== index)
        // this.save()

        // return this.topic


    } catch (error) {
        console.log("error from schema to delete topic " + error.message)
    }
}

const rutineModel = new mongoose.model("rutineModel", rutineSchema)

module.exports = rutineModel