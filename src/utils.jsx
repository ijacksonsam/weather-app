const flagemojiToPNG = (flag) => {
  return (
    <img
      src={`https://flagcdn.com/48x36/${flag.toLowerCase()}.png`}
      alt="flag"
    />
  );
};

const API_KEY = "2d4c650292c84ef7ef1b01348fa8a426";

export { flagemojiToPNG, API_KEY };
