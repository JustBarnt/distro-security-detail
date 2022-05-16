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
	
	//TODO: I know current pathTO is incorrect and will return a directory ending with node-cmds. 
	constructor(pathTo, filename)
	{
		if(pathTo == undefined || filename == undefined)
			throw new FormatError(pathTo, filename);

		this.pathTo = path.resolve(__dirname,'..');
		this.filename = filename;
		this.data;

		console.log(this.pathTo);
	}

	/**
	* @method WriteFile
	* @param {string} path path of to the file to write over.
	* @param {string} filename name of the file to write over.
	* @param {string} data data being overwritten.
	*/
	  
	WriteFile(path, filename, data)
	{
		//Check if filename was included with a slash or not, and add the slash for path.resolve
		if(!filename.includes('/')) filename.replace(/^/,'/');

		//Creating absolute path from path and filename parameters. EX: /foo/bar/foo.js
		let filePath = path.resolve(path, filename);

		fs.writeFile(filePath, JSON.stringify(data, null, 2), function writeToFile(err)
		{
			if(err) return console.log(err);
			console.log(JSON.stringify(data, null, 2));
			console.log(`Writing to ${filename}`);
		});
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

export { JSONFileWrite };