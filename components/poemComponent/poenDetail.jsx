export default function PoemDetails({ poemDetail }) {
  //   console.log(poemDetail);
  poemDetail.content = poemDetail.content.replace(/\n/g, "<br />");
  return (
    <>
      <section className="poems">
        <h1>{poemDetail.title}</h1>
        <p
          dangerouslySetInnerHTML={{
            __html: poemDetail.content,
          }}
        ></p>
      </section>
    </>
  );
}
