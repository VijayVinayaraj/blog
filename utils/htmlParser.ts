import path from "path";
import fs from 'fs'
import parse from 'html-react-parser'
import DOMPurify from 'isomorphic-dompurify'
import * as  cheerio from 'cheerio'


const postsDirectory = path.join(process.cwd(), 'content')
type BlogPost = {
	id: string,
	title: string,
	date: Date

}

type ContentHTML = JSX.Element | string | JSX.Element[]


export function getSortedPostsData() {
	// Get file names under /posts
	const fileNames = fs.readdirSync(postsDirectory);
	const allPostsData = fileNames.map((fileName) => {

		// Remove ".md" from file name to get id
		const id = fileName.replace(/\.html$/, '');

		// Read markdown file as string
		const fullPath = path.join(postsDirectory, fileName);
		const fileContents = fs.readFileSync(fullPath, 'utf8');
		const blogData = extractBlogData(fileContents)
		const blogPost: BlogPost = {
			id,
			title: blogData.title,
			date: blogData.date,

		}

		// Combine the data with the id
		return blogPost
	});
	// Sort posts by date
	return allPostsData.sort((a, b) => a.date < b.date ? 1 : -1);

}


function extractBlogData(fileContent: string) {
	const sanitizedHtml = DOMPurify.sanitize(fileContent, { USE_PROFILES: { html: true } })
	const $ = cheerio.load(sanitizedHtml)
	const content = parse( sanitizedHtml)


	const title = $('.title').text()
	const dateString = $('.date').text()


	const dateRegex = /\d{4}-\d{2}-\d{2}/;
	const extractedDate = dateString?.trim().match(dateRegex)
	let date: Date = new Date();
	if (extractedDate && extractedDate[0]) {
		date = new Date(extractedDate[0])
	}
	const blogPost = {
		title: title,
		date: date,
		content
	}
	return blogPost

}


export async function getPostData(id: string) {
	const fullPath = path.join(postsDirectory, `${id}.html`);
	const fileContents = fs.readFileSync(fullPath, 'utf8');

	const blogData = extractBlogData(fileContents)

	const blogPostWithHTML: BlogPost & { contentHtml: ContentHTML } = {
		id,
		title: blogData.title,
		date: blogData.date,
		contentHtml: blogData.content,
	}

	// Combine the data with the id
	return blogPostWithHTML
}
