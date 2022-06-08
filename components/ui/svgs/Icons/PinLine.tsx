import { SVGProps } from '.'

const PinLine = ({ colour, ...props }: SVGProps) => {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M10.828 1.95461L14.0453 5.17194C14.2507 5.37737 14.4043 5.62866 14.4935 5.9051C14.5828 6.18154 14.605 6.47522 14.5584 6.76194C14.5119 7.04867 14.3979 7.32023 14.2258 7.55425C14.0537 7.78827 13.8285 7.97804 13.5687 8.10794L10.322 9.73128C10.2049 9.78968 10.1154 9.89164 10.0727 10.0153L9.11267 12.7926C9.06654 12.9261 8.98723 13.0457 8.8822 13.1401C8.77716 13.2346 8.64985 13.3008 8.51221 13.3325C8.37457 13.3642 8.23113 13.3604 8.09535 13.3215C7.95957 13.2826 7.83592 13.2098 7.736 13.1099L5.66667 11.0406L2.70667 13.9999H2V13.2919L4.96 10.3333L2.89 8.26394C2.79 8.16404 2.71706 8.04034 2.67804 7.90448C2.63902 7.76862 2.6352 7.62507 2.66693 7.48733C2.69867 7.34958 2.76492 7.22218 2.85945 7.11709C2.95399 7.012 3.0737 6.93269 3.20733 6.88661L5.98467 5.92728C6.10831 5.88452 6.21026 5.79501 6.26867 5.67794L7.892 2.43128C8.02187 2.17134 8.21167 1.946 8.44575 1.77383C8.67982 1.60166 8.95147 1.4876 9.23829 1.44104C9.52511 1.39449 9.81889 1.41677 10.0954 1.50607C10.3719 1.59536 10.6232 1.7491 10.8287 1.95461H10.828ZM13.3387 5.87861L10.1213 2.66194C10.028 2.56854 9.91382 2.49866 9.78818 2.45804C9.66255 2.41743 9.52906 2.40725 9.39872 2.42834C9.26837 2.44944 9.14491 2.5012 9.0385 2.57937C8.93209 2.65754 8.84577 2.75987 8.78667 2.87794L7.16333 6.12528C6.98785 6.47597 6.68202 6.74399 6.31133 6.87194L3.78533 7.74528L8.25533 12.2146L9.12733 9.68928C9.25529 9.3186 9.52331 9.01276 9.874 8.83728L13.122 7.21328C13.2401 7.15424 13.3425 7.06797 13.4208 6.96159C13.499 6.85521 13.5508 6.73175 13.572 6.60141C13.5931 6.47106 13.583 6.33755 13.5425 6.21188C13.5019 6.08621 13.432 5.97199 13.3387 5.87861Z"
        fill={colour}
      />
    </svg>
  )
}

export default PinLine
