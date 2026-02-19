import Image from "next/image";

export default function ProductCard({
  title,
  description,
  image,
}: {
  title: string;
  description: string;
  image: string;
}) {
  return (
    <div className="bg-white rounded-2xl shadow-md p-6 flex flex-col items-center">
      <Image src={image} alt={title} width={160} height={160} className="w-40 h-40 object-cover mb-4 rounded-lg" />
      <h3
        className="text-3xl font-semibold mb-12"
        style={{ color: "#565656" }} // <-- couleur personnalisée
      >{title}</h3>
      <p className="text-gray-600 text-sm">{description}</p>
    </div>
  );
}
