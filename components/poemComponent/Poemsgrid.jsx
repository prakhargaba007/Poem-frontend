import Link from "next/link";

export default function PoemsGrid({ poems }) {
  return (
    <>
      <ul>
        {poems.map((data) => (
          <li key={data._id}>
            <Link href={`/books/${data._id}`}>{data.title}</Link>
          </li>
        ))}
      </ul>
    </>
  );
}
