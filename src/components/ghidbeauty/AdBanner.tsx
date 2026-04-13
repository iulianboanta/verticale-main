import bannerLeaderboard from "@/assets/banner-leaderboard.jpg";

interface Props {
  visible?: boolean;
}

const AdBanner = ({ visible = true }: Props) => {
  if (!visible) return null;

  return (
    <section className="py-4">
      <div className="container flex justify-center">
        <a href="#" className="block w-full max-w-[728px] overflow-hidden rounded-lg transition-shadow hover:shadow-md">
          <img
            src={bannerLeaderboard}
            alt="Glamour Studio - Rezervă Acum"
            className="h-[90px] w-full object-cover"
            loading="lazy"
            width={1456}
            height={512}
          />
        </a>
      </div>
    </section>
  );
};

export default AdBanner;
