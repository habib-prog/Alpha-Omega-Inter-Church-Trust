import { Link, useNavigate } from "react-router";
import { FaArrowLeft } from "react-icons/fa";

const ComingSoon = () => {
  const navigate = useNavigate();

  const handleReturn = () => {
    if (window.history.length > 1) {
      navigate(-1);
      return;
    }

    navigate("/");
  };

  return (
    <section className="min-h-[70vh] bg-[#FAF8F3] px-4 py-32 text-[#4A3F35]">
      <div className="container flex flex-col items-center text-center">
        <p className="text-sm font-bold uppercase tracking-[0.2em] text-[#E87461]">
          Alpha Omega
        </p>
        <h1 className="mt-4 text-4xl font-bold sm:text-6xl">Coming Soon</h1>
        <p className="mt-5 max-w-xl text-base leading-7 text-[#6E625A] sm:text-lg">
          Our story page is being prepared. Please check back soon.
        </p>
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <button
            type="button"
            onClick={handleReturn}
            className="inline-flex items-center gap-2 rounded-full bg-[#E87461] px-6 py-3 font-semibold text-white transition hover:bg-[#D66350]"
          >
            <FaArrowLeft /> Return
          </button>
          <Link
            to="/"
            className="inline-flex items-center rounded-full border border-[#E7DED3] px-6 py-3 font-semibold text-[#4A3F35] transition hover:border-[#E87461] hover:text-[#E87461]"
          >
            Home
          </Link>
        </div>
      </div>
    </section>
  );
};

export default ComingSoon;
