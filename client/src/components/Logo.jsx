import { useTheme } from "@emotion/react";

const Logo = () => {

    const theme = useTheme();

    const primary = theme.palette.primary.main;
    const neutral = theme.palette.neutral.main
  return (
    <svg
      width="200"
      zoomAndPan="magnify"
      viewBox="105 110 450 105"
      height="100"
      preserveAspectRatio="xMidYMid meet"
      version="1.0"
    >
      <defs>
        <clipPath id="f9f0d383e8">
          <path
            d="M 108.71875 107 L 156 107 L 156 219.9375 L 108.71875 219.9375 Z M 108.71875 107 "
            clipRule="nonzero"
          />
        </clipPath>
        <clipPath id="9e18285e72">
          <path
            d="M 219 107 L 266.21875 107 L 266.21875 219.9375 L 219 219.9375 Z M 219 107 "
            clipRule="nonzero"
          />
        </clipPath>
        <clipPath id="e252ef95a3">
          <path
            d="M 150 94.6875 L 225 94.6875 L 225 184 L 150 184 Z M 150 94.6875 "
            clipRule="nonzero"
          />
        </clipPath>
      </defs>
      <g clipPath="url(#f9f0d383e8)">
        <path
          fill={primary}
          d="M 142.328125 134.097656 C 145.464844 131.410156 147.507812 127.050781 147.507812 122.125 C 147.507812 113.957031 141.90625 107.339844 134.992188 107.339844 C 128.082031 107.339844 122.476562 113.957031 122.476562 122.125 C 122.476562 127.050781 124.519531 131.410156 127.65625 134.097656 C 116.742188 137.480469 108.765625 148.21875 108.765625 160.949219 L 108.765625 215.578125 C 108.765625 217.980469 110.707031 219.929688 113.109375 219.929688 C 115.503906 219.929688 117.449219 217.980469 117.449219 215.578125 L 117.449219 163.945312 C 117.449219 152.066406 125.304688 142.4375 134.992188 142.4375 C 141.53125 142.4375 147.230469 146.828125 150.25 153.332031 C 151.5625 149.96875 153.28125 146.773438 155.402344 143.808594 C 155.453125 143.738281 155.503906 143.671875 155.554688 143.601562 C 152.21875 139.113281 147.621094 135.738281 142.328125 134.097656 "
          fillOpacity="1"
          fillRule="nonzero"
        />
      </g>
      <g clipPath="url(#9e18285e72)">
        <path
          fill={primary}
          d="M 247.242188 134.097656 C 250.378906 131.410156 252.421875 127.050781 252.421875 122.125 C 252.421875 113.957031 246.816406 107.339844 239.902344 107.339844 C 232.992188 107.339844 227.386719 113.957031 227.386719 122.125 C 227.386719 127.050781 229.429688 131.410156 232.566406 134.097656 C 227.273438 135.738281 222.675781 139.113281 219.339844 143.601562 C 219.390625 143.671875 219.445312 143.738281 219.496094 143.808594 C 221.613281 146.773438 223.332031 149.96875 224.644531 153.332031 C 227.664062 146.828125 233.363281 142.4375 239.902344 142.4375 C 249.59375 142.4375 257.445312 152.066406 257.445312 163.945312 L 257.445312 215.578125 C 257.445312 217.980469 259.390625 219.929688 261.789062 219.929688 C 264.1875 219.929688 266.128906 217.980469 266.128906 215.578125 L 266.128906 160.949219 C 266.128906 148.21875 258.152344 137.480469 247.242188 134.097656 "
          fillOpacity="1"
          fillRule="nonzero"
        />
      </g>
      <g clipPath="url(#e252ef95a3)">
        <path
          fill={neutral}
          d="M 197.726562 132.183594 C 202.121094 128.417969 204.984375 122.3125 204.984375 115.40625 C 204.984375 103.96875 197.132812 94.695312 187.449219 94.695312 C 177.765625 94.695312 169.914062 103.96875 169.914062 115.40625 C 169.914062 122.3125 172.773438 128.417969 177.171875 132.183594 C 161.878906 136.925781 150.703125 151.96875 150.703125 169.804688 L 150.703125 178.691406 C 150.703125 181.09375 152.648438 183.042969 155.042969 183.042969 L 158.527344 183.042969 C 160.925781 183.042969 162.871094 181.09375 162.871094 178.691406 L 162.871094 174 C 162.871094 157.359375 173.875 143.871094 187.449219 143.871094 C 201.023438 143.871094 212.027344 157.359375 212.027344 174 L 212.027344 178.691406 C 212.027344 181.09375 213.972656 183.042969 216.371094 183.042969 L 219.851562 183.042969 C 222.25 183.042969 224.195312 181.09375 224.195312 178.691406 L 224.195312 169.804688 C 224.195312 151.96875 213.015625 136.925781 197.726562 132.183594 "
          fillOpacity="1"
          fillRule="nonzero"
        />
      </g>
    </svg>
  );
};

export default Logo;
