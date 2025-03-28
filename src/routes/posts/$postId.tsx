import { createFileRoute, useParams, notFound, useNavigate } from '@tanstack/react-router'

export const Route = createFileRoute('/posts/$postId')({
  component: RouteComponent,
  loader: async ({ params }) => {
    if (params.postId === 'notFound') {
      throw notFound();
    }
    return {
      postId: params.postId
    };
  },
  notFoundComponent: () => <div>Not found</div>
})

function RouteComponent() {
  // const { postId } = useParams(); // may be undefined
  // const { postId } = Route.useParams();
  const { postId } = Route.useLoaderData();
  const navigate = useNavigate();
  const createSearch = (postString: string) => {

    const lastChar = Number(postString.slice(-1));
    const nextPost = lastChar + 1;
    return `post${nextPost > 3 ? 1 : nextPost}`;
  }

  return (<div><p>Hello {postId}!</p><button onClick={() => navigate({
    to: '/posts',
    search: { postId: createSearch(postId) }
  })}>Return to posts</button></div>);
}
