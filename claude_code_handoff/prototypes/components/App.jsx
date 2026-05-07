function App() {
  const [route, setRoute] = React.useState('home');
  React.useEffect(() => { window.scrollTo(0, 0); }, [route]);

  let page;
  if (route === 'home')      page = <Home setRoute={setRoute} />;
  else if (route === 'how')  page = <HowItWorks setRoute={setRoute} />;
  else if (route === 'styles') page = <Styles setRoute={setRoute} />;
  else if (route === 'quote')  page = <Quote setRoute={setRoute} />;
  else if (route === 'about')  page = <About setRoute={setRoute} />;
  else if (route === 'measure')    page = <Measure setRoute={setRoute} />;
  else if (route === 'worksheets') page = <Worksheets setRoute={setRoute} />;
  else if (route === 'safety')     page = <Safety setRoute={setRoute} />;
  else if (route === 'faq')        page = <FAQ setRoute={setRoute} />;
  else                          page = <Home setRoute={setRoute} />;

  return (
    <div data-screen-label={`Website · ${route}`}>
      <Header route={route} setRoute={setRoute} />
      {page}
      <Footer setRoute={setRoute} />
    </div>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(<App />);
