# gulp-sass-import
Define a default file to `@import` from a directory path. Incredibly useful for modular sass frameworks, where each module may have a collection of files.

Rather than call each file into the root sass file, we can import a default file from the directory instead, which itself references its sibling files in the module.

```
- main.scss
	| module1
		- _index.scss
		- _module.scss
		- _mixins.scss
		- _extends.scss
	| module2
		- _index.scss
		- _module.scss
		- _mixins.scss
		- _extends.scss

```
Here, we can import each `_index.scss` into `main.scss`, then call the sibling files from `_index.scss`, e.g `./module.scss`.

`Gulp-sass-import` helps define a placeholder in the import path to make things clearer.

```
// main.scss
@import '/module1/_index';
@import '/module2/_index';

// becomes
@import '/module1/';
@import '/module2/';
```
The trailing `/` indicates that this import is calling a directory. 


## Options
Accepts options for customising placeholder and default filename in sub-directory.

### Filename
The default filename to look for, defaults to `_index`.

### Marker
The sub-directory marker in the import path, defaults to `/`.


### Example
```javascript
var sassImport 	= require('gulp-sass-import'),
	sass 		= require('gulp-sass'),
    rename 		= require('gulp-rename');

gulp.task('sass', function()
{
	gulp.src('./style.scss'),   
		.pipe(sassImport({
			filename : '_file',
			marker : '/*'
		}))
		.pipe(sass())
		.pipe(rename('style.css'))
		.pipe(gulp.dest(./));
});

gulp.task('default', ['sass']);
```



