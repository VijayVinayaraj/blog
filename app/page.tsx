import { LinkItem } from './components/LinkItem';

import {getSortedPostsData} from '@/utils/htmlParser'

export default function Home() {
    const post = getSortedPostsData()
    
    return (
	<div>
	    {post.map((post) =>{
	    return <LinkItem key={post.id} id={post.id} title={post.title}/>})}
	</div>
    );
}
