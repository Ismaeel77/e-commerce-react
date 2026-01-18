function NotFound() {
  return (
    <>
      <section className="flex flex-col justify-center items-center h-screen">
        <img width={800} className="mx-auto" src="/src/assets/404Page.svg" alt="page not found"/>
        <p className="text-center text-7xl">Oops!, Page not found</p>
      </section>
    </>
  );
}

export default NotFound;
