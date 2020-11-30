class ValidationError extends Error {
	constructor(message) {
		super(message);
		this.name = "ValidationError";
	}
}

const assertIsUuid = target => {
	const regex = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-5][0-9a-f]{3}-[089ab][0-9a-f]{3}-[0-9a-f]{12}$/i

	if (!target || !target.match(regex)) {
		throw new ValidationError("Bad input");
	}
}

const assertIsBoolean = target => {
	return typeof target === 'boolean'
}

const assertIsDefinedString = target => {
	if (!target || (typeof target  !== 'string') || target.length < 1) {
		throw new ValidationError("Bad input");
	}
}

const assertIsAccessCode = target => {
	if (!target || (typeof target  !== 'string') || target.length !== 6) {
		throw new ValidationError("Bad input");
	}
}

module.exports.ValidationError = ValidationError;
module.exports.assertIsBoolean = assertIsBoolean;
module.exports.assertIsAccessCode = assertIsAccessCode;
module.exports.assertIsDefinedString = assertIsDefinedString;
module.exports.assertIsUuid = assertIsUuid;
