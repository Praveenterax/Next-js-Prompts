import Feed from "@components/Feed";

const App = () => {
  return (
    <section className='w-full flex-center flex-col'>
      <h1 className='head_text text-center'>
        Discover & Share
        <br />
        <span className='orange_gradient text-center'>AI-powered Prompts</span>
      </h1>
      <p className='desc text-center'>Promptopia is an open-source AI prompting tool for modern world to discover, create and share creative prompts</p>

      {/* Feed */}

      <Feed />
    </section>
  )
}

export default App;