import Button from "./ui/Button";

const LandingSection = () => {
  return (
    <div className="m-auto">
      <div className="flex flex-col items-center gap-5">
        {/* <img src="/logo.svg" alt="Logo" width={100}/> */}
        {/* <img src="/logo2.svg" alt="Logo" /> */}
        <h1 className="text-5xl font-extrabold">Audioroom</h1>
        <p className="text-xl">The space for creativity</p>
        <Button text="Start Exploring" path="/library" />
      </div>
    </div>
  );
};

export default LandingSection;
