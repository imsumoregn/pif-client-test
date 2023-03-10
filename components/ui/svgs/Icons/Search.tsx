import { SVGProps } from '.';

const Search = ({ colour, ...props }: SVGProps) => {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M16.5731 18.6944C15.0076 19.8302 13.082 20.5 11 20.5C5.75329 20.5 1.5 16.2467 1.5 11C1.5 5.75329 5.75329 1.5 11 1.5C16.2467 1.5 20.5 5.75329 20.5 11C20.5 13.082 19.8302 15.0076 18.6944 16.5731L22.0607 19.9393C22.6464 20.5251 22.6464 21.4749 22.0607 22.0607C21.4749 22.6464 20.5251 22.6464 19.9393 22.0607L16.5731 18.6944ZM4.5 11C4.5 7.41015 7.41015 4.5 11 4.5C14.5899 4.5 17.5 7.41015 17.5 11C17.5 12.7393 16.8168 14.3191 15.7042 15.4856C15.6646 15.5178 15.6262 15.5524 15.5893 15.5893C15.5524 15.6263 15.5178 15.6646 15.4856 15.7042C14.3191 16.8168 12.7393 17.5 11 17.5C7.41015 17.5 4.5 14.5899 4.5 11Z"
        fill={colour}
      />
    </svg>
  );
};

export default Search;
