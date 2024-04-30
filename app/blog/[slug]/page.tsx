import { getPostData, getSortedPostsData } from "@/utils/htmlParser";
import { notFound } from "next/navigation";

export function generateStaticParams() {
	const posts = getSortedPostsData()

	return posts.map((post) => ({
		slug: post.id
	}))
}



export default async function BlogPage({ params }: { params: { slug: string } }) {

	const allPosts = getSortedPostsData()
	if (allPosts.find((post) => post.id == params.slug) == null) {
		return notFound()
	}

	const blogContent = (await getPostData(params.slug)).contentHtml
	return (
		<div>
			{blogContent}
		</div>
	)
}
