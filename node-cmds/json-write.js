import fs from 'fs/promises';
import path from 'path';

/**
* @author Brent Williams <functnal@gmail.com> (https://www.github.com/JustBarnt)
* @class JSONFileWrite
* @description Class finds, reads, and writes to specified json file.
*/

class JSONFileWrite
{
	/**
	* @constructor
	* @param {string} path file path.
	* @param {string} name of the file The power.
	*/
	
	constructor(pathTo, filename)
	{
		if(pathTo == undefined || filename == undefined)
			throw new FormatError(pathTo, filename);

		this.dir = path.dirname;
		this.pathTo = pathTo;
		this.filename = filename;
	}
}

/**
* @author Brent Williams <functnal@gmail.com> (https://www.github.com/JustBarnt)
* @class FormatError
* @description Creates a new error.
*/

class FormatError
{
	/**
	* @constructor
	* @param {string} path file path.
	* @param {string} name of the file.
	*/

	constructor(pathTo, filename)
	{
		this.codes = 
		{
			1: `${pathTo} is not a valid file path.`,
			2: `${filename} does not exist or cannot be located in specified directory.`
		}

		this.error = '';
		this.errorCode = 0;

		CallError(pathTo, filename);
	}

	/**
	* @method CallError
	* @param {string} path Relative path to the file.
	* @param {string} filename name of the file being looked for.
	*/
	
	CallError(path,filename)
	{
		if(path == undefined) 
			this.errorCode = 1;

		if(filename == undefined) 
			this.errorCode = 2;

		this.error = this.codes[this.errorCode];
		console.error(this.error);
	}
}