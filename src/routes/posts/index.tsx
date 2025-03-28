import { createFileRoute, Link } from '@tanstack/react-router'

export const Route = createFileRoute('/posts/')({
  component: RouteComponent,
  validateSearch: (search) => {
    return {
      postId: search.postId as string || ''
    }
  },
  loaderDeps: ({ search }) => {
    const { postId } = search;
    return {
      deepsValidatedId: postId
    }
  },
  loader: async ({ deps }) => {
    const { deepsValidatedId } = deps;
    await new Promise(resolve => setTimeout(resolve, 5000));
    const posts = ['post1', 'post2', 'post3'];

    return posts.filter(post => {
      return post === deepsValidatedId;
    });
  },
  preload: false,
  pendingComponent: () => <div>Loading...</div>,
  staleTime: 10_000,
  onCatch: (match) => {
    console.log('onCatch', match);
  },
  onEnter: (match) => {
    console.log('onEnter', match);
  },
  onLeave: (match) => {
    console.log('onLeave', match);
  },
})

function RouteComponent() {
  const loadedPosts = Route.useLoaderData();
  const { postId } = Route.useSearch();

  return (<div>
    {loadedPosts.map((post, index) => <Link to='/posts/$postId' params={{
      postId: post // 'notFound'
    }} key={index}>{post}</Link>)}
    {postId !== 'post2' && <h3><b>'Posts' link don't have active class</b></h3>}
  </div>)
}
