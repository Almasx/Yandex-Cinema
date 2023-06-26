import Image from "next/image";
import Fallback from "public/images/fallback.svg";

interface ReviewProps {
  id: string;
  name: string;
  rating: number;
  text: string;
}

const Review = ({ id, name, rating, text }: ReviewProps) => {
  return (
    <div className="flex gap-8 p-6 bg-white rounded-lg" key={id}>
      <Image src={Fallback} width={100} height={100} alt="lol" />
      <div className="flex flex-col gap-4 grow">
        <div className="flex justify-between leading-8">
          <span className="font-semibold">{name}</span>

          <div className="flex gap-2">
            Оценка: <span className="font-semibold">{rating}</span>
          </div>
        </div>
        <p>{text}</p>
      </div>
    </div>
  );
};

export default Review;
