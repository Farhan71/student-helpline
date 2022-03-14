const router = require("express").Router();
const User = require("../models/User");
const bcrypt = require("bcrypt");
const sendEmail = require("../utils/sendEmail")

//REGISTER
router.put("/register/:id", async (req, res) => {
  try {
    // const user = await User.findOne({ _id: req.params.id });
    await User.updateOne({ _id: req.params.id}, { $set:{verified: true }});
    res.status(200).send({ message: "Email verified successfully" })
  } catch (err) {
    res.status(500).json(err);
  }
});

router.post ("/register/verifyOTP", async (req, res) => {
	try {
		// let user = await User.findOne({ email: req.body.email });
		// if (user)
		// 	return res
		// 		.status(409)
		// 		.send({ message: "User with given email already Exist!" });

        const salt = await bcrypt.genSalt(10);
        const hashedPass = await bcrypt.hash(req.body.password, salt);
        const randomNumber = Math.floor(100000 + Math.random() * 900000)
        const newUser = new User({
          username: req.body.username,
          email: req.body.email,
          contact: req.body.contact,
          studentId: req.body.studentId,
          password: hashedPass,
          bloodGroup: req.body.bloodGroup,
          isDonor: req.body.isDonor,
          isEntrepreneur: req.body.isEntrepreneur,
          isReporter: req.body.isReporter,
          otp: randomNumber
        });
    
        const saveduser = await newUser.save();
        // res.status(200).write(JSON.stringify(saveduser));
        res.status(200).json(saveduser);

		const message = `YOUR OTP NUMBER IS ${randomNumber}`
		await sendEmail(req.body.email, "Verify Email", message);
				res
					.status(201)
					
	} catch (error) {
		console.log(error);
		res.status(500).send({ message: "Internal Server Error" });
	}
})

//LOGIN
router.post("/login", async (req, res) => {
  try {
    // const user = await User.findOne({ email: req.body.email});

    // const user = await User.findOne({ $and: [ { email: req.body.email}, { verified: "true"} ] })
   const user = await User.findOne({ $and: [  { verified: "true"} , { email: req.body.email}] })
    !user && res.status(400).json("Wrong credentials!"); 

    const validated = await bcrypt.compare(req.body.password, user.password);
    !validated && res.status(400).json("Wrong credentials!");

    const { password, ...others } = user._doc;
    // const token = user.generateAuthToken();
    res.status(200).json(others);
    // res.status(200).send({ data: token, message: "logged in successfully" });
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
