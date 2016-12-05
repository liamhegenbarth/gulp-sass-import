var through 	= require('through2'),
	gutil		= require('gulp-util'),
	PluginError = gutil.PluginError;

const PLUGIN_NAME = 'gulp-sass-import';


var transform = function transform(file, opts) 
{

	opts 			= opts || {};

	var filename 	= (opts.filename == null) ? '_index' : opts.filename,
		marker	 	= (opts.marker == null) ? '/' : opts.marker,

		sass		= file.toString('utf8'),

		regex 		= new RegExp('@import.+?\\' + marker + '[\'\"];', 'g');


	sass = sass.replace(regex, function(match) {

		var path 	= match.split(marker),
			end 	= path.pop();

			path 	= path.join('/');
			path 	= ( path.charAt(path.length - 1) === '/' ) ? path : path + '/';

		return path + filename + end;

	});

	sass = new Buffer(sass);

	return sass;

};


var sassImport = function sassImport(opts)
{

	var stream = through.obj(function(file, enc, cb) {
		
		if (file.isStream()) 
		{
			this.emit('error', new PluginError(PLUGIN_NAME, 'Streams not supported!'));
			return cb();
		}

		if (file.isBuffer()) 
		{
			file.contents = transform(file.contents, opts);
		}

		this.push(file);

		cb();

	});

	return stream;

};


module.exports = sassImport;
