const capitalize = (input: string) =>
  input.length ? `${input.charAt(0).toLocaleUpperCase()}${input.slice(1).toLocaleLowerCase()}` : input;

export default capitalize;
