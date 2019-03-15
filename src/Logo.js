import React from 'react';

const Logo = ({ scale, opacity, width, height }) => (
  <div className="logo">
    <svg style={{ transform: `scale(${scale})`, opacity: `${opacity}` }} className="potato-logo" role="presentation" width={width} height={height} viewBox="0 0 62 60" xmlns="http://www.w3.org/2000/svg">
      <g fill="none" fillRule="evenodd">
        <path className="potato-logo__bg" fill="#AD2B65" d="M45.645 1.708c.57.434 1.337 1.15 2.227 2.065.89.912 1.904 2.022 2.97 3.24 1.065 1.214 2.18 2.538 3.276 3.88 1.095 1.34 2.17 2.7 3.148 3.99.98 1.29 1.865 2.506 2.585 3.565.72 1.06 1.273 1.957 1.586 2.607.314.65.495 1.427.498 2.13.002.702-.1 1.732-.28 2.98-.18 1.246-.44 2.712-.752 4.282-.312 1.57-.676 3.25-1.066 4.92-.392 1.674-.808 3.342-1.227 4.895-.42 1.553-.838 2.99-1.23 4.203-.396 1.21-.765 2.197-1.082 2.846-.318.648-.827 1.27-1.394 1.707-.567.436-1.462.998-2.577 1.636-1.115.638-2.452 1.35-3.906 2.09-1.453.742-3.023 1.51-4.605 2.254-1.582.744-3.176 1.466-4.678 2.115-1.5.65-2.91 1.228-4.12 1.685-1.21.457-2.223.792-2.932.957-.71.165-1.525.165-2.236 0-.71-.165-1.723-.5-2.934-.957-1.21-.457-2.617-1.035-4.12-1.685-1.5-.65-3.095-1.37-4.677-2.115-1.582-.745-3.153-1.512-4.607-2.253-1.454-.74-2.79-1.453-3.906-2.09-1.115-.64-2.01-1.2-2.577-1.637-.567-.436-1.076-1.06-1.394-1.706-.317-.648-.686-1.634-1.08-2.845-.394-1.212-.813-2.65-1.23-4.203-.42-1.553-.836-3.22-1.228-4.894-.39-1.672-.754-3.35-1.066-4.92-.31-1.57-.57-3.037-.75-4.283-.18-1.248-.284-2.278-.282-2.98.003-.703.184-1.48.498-2.13.313-.65.866-1.548 1.586-2.607.72-1.06 1.604-2.276 2.584-3.566.98-1.288 2.053-2.648 3.148-3.99 1.095-1.34 2.212-2.665 3.277-3.88 1.065-1.217 2.078-2.327 2.97-3.24.89-.913 1.656-1.63 2.226-2.063.57-.435 1.304-.78 2.013-.95.71-.168 1.767-.31 3.058-.422C22.653.226 24.176.14 25.816.084 27.455.028 29.21 0 30.968 0c1.755 0 3.51.028 5.15.084 1.64.057 3.165.142 4.456.254 1.29.113 2.348.254 3.057.423.71.17 1.444.515 2.015.948"></path>
        <path className="potato-logo__fg" fill="#FFFFFF" d="M30.863 26.245c-.817 0-1.48-.648-1.48-1.446 0-.8.663-1.45 1.48-1.45s1.48.65 1.48 1.45c0 .797-.663 1.445-1.48 1.445m13.262 5.594c-.178-1.81-1.213-4.575-2.717-7.386-.44.653-1.186 1.09-2.046 1.09-1.36 0-2.462-1.078-2.462-2.406 0-1.26.995-2.283 2.257-2.386-.23-.336-.35-.488-.35-.488-2.405-3.337-4.193-6.24-7.85-6.162-4.263.09-7.82 1.225-8.987 4.522-1.28 3.608-1.287 9.26-1.75 13.067-.87 7.165 4.516 10.264 11.01 10.536l.443.013c6.384.115 13.156-3.224 12.452-10.4"></path>
      </g>
    </svg>
  </div>
);

export default Logo;
