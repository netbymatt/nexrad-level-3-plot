// null logger for options.logger = false
const nullLogger = {
	log: () => { },
	error: () => { },
};

// combine options and defaults
const combineOptions = (newOptions) => {
	let logger = newOptions?.logger ?? console;
	if (logger === false) logger = nullLogger;
	return {
		...newOptions, logger,
	};
};

export default combineOptions;
