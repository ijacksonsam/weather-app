const flagemojiToPNG = (flag) => {
  return (
    <img
      src={`https://flagcdn.com/48x36/${flag.toLowerCase()}.png`}
      alt="flag"
    />
  );
};

export { flagemojiToPNG };
