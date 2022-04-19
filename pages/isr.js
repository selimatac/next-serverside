// incremental static generation

export default function IncrementalStaticGeneration({ state }) {
  return (
    <div style={{display:'flex', flexWrap:'wrap', gap:"20px"}}>
      {state.map((e) => (
        <h2 key={e.id}>{e.id}-{e.name}</h2>
      ))}
    </div>
  );
}

// This function gets called at build time on server-side.
// It may be called again, on a serverless function, if
// revalidation is enabled and a new request comes in
export async function getStaticProps() {
  const res = await fetch('https://61bb28b9e943920017784ce6.mockapi.io/api/users'); // like https://github.com/api
  const state = await res.json();

  return {
    props: {
      state, // will be passed to the page component as props
    },

    // Next.js will attempt to re-generate the page:
    // - When a request comes in
    // - At most once every second
    revalidate: 90000, // In seconds
  };
}
