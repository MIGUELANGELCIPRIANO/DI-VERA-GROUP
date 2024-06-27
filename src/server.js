const express = require('express')
const morgan = require('morgan')
const path = require('path')
const nodemailer = require('nodemailer')
require('dotenv').config()

const app = express()
const { EMAIL_USER, EMAIL_PASS, EMAIL_TO, PORT } = process.env

app.set('appName', 'DI-VERA GROUP')
app.use(morgan('dev'))
app.use(express.urlencoded({ extended: true }))
app.use(express.json())

app.post('/send-email', async (req, res) => {
	const { name, email, message } = req.body

	let transporter = nodemailer.createTransport({
		service: 'gmail',
		auth: {
			user: `${EMAIL_USER}`,
			pass: `${EMAIL_PASS}`,
		},
	})

	let mailOptions = {
		from: `${EMAIL_USER}`,
		to: `${EMAIL_TO}`,
		subject: `Message from ${name}`,
		text: `Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`,
	}

	try {
		await transporter.sendMail(mailOptions)
		res.redirect('/thanks.html')
	} catch (error) {
		console.error('Error sending mail:', error)
		res.status(500).send('Error sending mail')
	}
})

app.use(express.static(path.join(__dirname, 'public')))

app.listen(PORT)
console.log(`${app.get('appName')} server listening on port ${PORT}`)
