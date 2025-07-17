import Image from "next/image";

export default function PostHeader(props: { title: string, image: string }) {
  const { title, image } = props;
  return (
    <header>
      <h1>{title}</h1>
      <Image src={image} alt={title} width={300} height={150} />
     
    </header>
  );
}