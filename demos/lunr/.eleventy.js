module.exports = function(eleventyConfig) {

	const english = new Intl.DateTimeFormat('en');

	eleventyConfig.addFilter("dtFormat", function(date) {
		return english.format(date);
	});

	eleventyConfig.addShortcode('excerpt', article => extractExcerpt(article));

};

// later in my .eleventy.js file...
// https://keepinguptodate.com/pages/2019/06/creating-blog-with-eleventy/
function extractExcerpt(article) {
	if (!article.hasOwnProperty('templateContent')) {
	  console.warn('Failed to extract excerpt: Document has no property "templateContent".');
	  return null;
	}
   
	let excerpt = null;
	const content = article.templateContent;

	// The start and end separators to try and match to extract the excerpt
	const separatorsList = [
	  { start: '<!-- Excerpt Start -->', end: '<!-- Excerpt End -->' },
	  { start: '<p>', end: '</p>' }
	];
   
	separatorsList.some(separators => {
	  const startPosition = content.indexOf(separators.start);
	  const endPosition = content.indexOf(separators.end);
   
	  if (startPosition !== -1 && endPosition !== -1) {
		excerpt = content.substring(startPosition + separators.start.length, endPosition).trim();
		return true; // Exit out of array loop on first match
	  }
	});

	//remove line breaks
	excerpt = excerpt.replace(/\n/g,'');
	return excerpt;
  }