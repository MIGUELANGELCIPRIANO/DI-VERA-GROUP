document.addEventListener('DOMContentLoaded', function () {
	const form = document.getElementById('contactForm')

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
				}
			})
			.catch((error) => console.error('Error:', error))
	})
})
