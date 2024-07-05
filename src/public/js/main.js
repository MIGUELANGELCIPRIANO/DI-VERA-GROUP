document.addEventListener('DOMContentLoaded', function () {
	const form = document.getElementById('contactForm')
	const submitButton = document.getElementById('submitButton')
	const spinner = document.getElementById('spinner')

	form.addEventListener('submit', function (event) {
		event.preventDefault()

		if (!form.checkValidity()) {
			form.classList.add('was-validated')
			return
		}

		const formData = new FormData(form)
		const data = {}
		formData.forEach((value, key) => {
			data[key] = value
		})

		submitButton.style.display = 'none'
		spinner.style.display = 'inline-block'

		fetch('/send-email', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(data),
		})
			.then((response) => {
				if (response.ok) {
					window.location.href = '/thanks.html'
				} else {
					console.error('Error:', response.statusText)
					submitButton.style.display = 'inline-block'
					spinner.style.display = 'none'
				}
			})
			.catch((error) => {
				console.error('Error:', error)
				submitButton.style.display = 'inline-block'
				spinner.style.display = 'none'
			})
	})
})
