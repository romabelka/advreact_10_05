import validator from 'email-validator'

export const formValidate = fields => {
	const { email, password } = fields
	console.log(fields)
	const errors = {}

	if (!email) errors.email = 'email is a required field'
	if (email && !validator.validate(email)) errors.email = 'invalid email'

	if (!password) errors.password = 'password is a required field'
	if (password && password.length < 8) errors.password = 'to short'

	return errors
}
